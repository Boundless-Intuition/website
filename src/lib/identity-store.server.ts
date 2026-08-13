// ── Identity store ───────────────────────────────────────────────────────────
// The server half of the identifier: fuzzy matching a fingerprint against
// previously seen devices, and persisting visits.
//
// Why fuzzy. The client hash in `./fingerprint` is exact, so a Chrome update
// bumps the UA string and the visitor becomes a new person. Matching component
// by component and scoring the agreement survives that: one changed component
// out of fifteen still resolves to the same device.
//
// Server-only by the `.server.ts` convention in CLAUDE.md.
//
// Requires DATABASE_URL (Neon, via the Vercel marketplace integration). Every
// export degrades to a no-op when it is unset, so the site runs unchanged
// locally and the analytics relay never fails because storage is missing.

import { neon } from "@neondatabase/serverless";

type Sql = ReturnType<typeof neon>;

let client: Sql | null | undefined;

function db(): Sql | null {
  if (client !== undefined) return client;
  const url = process.env.DATABASE_URL;
  client = url ? neon(url) : null;
  return client;
}

// ── Matching ─────────────────────────────────────────────────────────────────

/**
 * Component weights, by how much each one actually narrows the field.
 *
 * Canvas, WebGL parameters and the audio signature carry the most entropy and
 * are the hardest to change by accident. Core count and colour depth carry
 * almost none - millions of machines report 8 and 24 - so they only break ties.
 */
const WEIGHTS = {
  canvas: 4,
  webgl_params: 4,
  audio: 4,
  fonts: 3,
  webgl: 3,
  screen: 2,
  media_devices: 2,
  ua: 2,
  timezone: 1,
  languages: 1,
  platform: 1,
  cores: 1,
  memory: 1,
  touch_points: 1,
  color_depth: 1,
} as const;

const TOTAL_WEIGHT = Object.values(WEIGHTS).reduce((a, b) => a + b, 0); // 31

/**
 * How much agreement counts as the same device. 23/31 is a little over 70%:
 * high enough that two different machines from the same corporate image do not
 * collide, low enough to absorb a browser update plus a font install.
 */
const MATCH_THRESHOLD = 23;

export interface TraitVector {
  ua: string;
  platform: string;
  languages: string;
  timezone: string;
  cores: number;
  memory: number;
  touchPoints: number;
  colorDepth: number;
  screen: string;
  canvas: string;
  webgl: string;
  webglParams: string;
  audio: string;
  fonts: string;
  mediaDevices: string;
}

/** Values that mean "this browser refused to answer" and must never join a match. */
const OPAQUE = new Set(["unstable", "masked", "error", "none", ""]);

export interface MatchResult {
  visitorId: string;
  deviceId: number;
  /** 0-1 share of the weighted components that agreed. */
  confidence: number;
  matched: boolean;
}

/**
 * Find the device this trait vector most likely belongs to, else record it.
 *
 * `stability` gates the whole thing. A browser that randomises canvas and masks
 * WebGL produces a vector whose high-entropy components are all the same
 * literal placeholder, so every such visitor would score identically against
 * every other one and get merged into a single fictional device. Those are
 * stored but never matched - see the note in `/legal` §05 about anti-
 * fingerprinting browsers landing in one bucket by design.
 */
export async function resolveDevice(
  traits: TraitVector,
  clientId: string,
  stability: string,
): Promise<MatchResult | undefined> {
  const sql = db();
  if (!sql) return undefined;

  try {
    if (stability !== "high") {
      const inserted = await insertDevice(sql, traits, clientId);
      return inserted
        ? {
            visitorId: clientId,
            deviceId: inserted,
            confidence: 0,
            matched: false,
          }
        : undefined;
    }

    // Prefilter on the high-entropy components, then score the survivors. The
    // partial indexes in 001_identity.sql cover exactly this predicate.
    const rows = (await sql`
      select
        id, visitor_id,
        (case when canvas       = ${traits.canvas}       then ${WEIGHTS.canvas}        else 0 end) +
        (case when webgl_params = ${traits.webglParams}  then ${WEIGHTS.webgl_params}  else 0 end) +
        (case when audio        = ${traits.audio}        then ${WEIGHTS.audio}         else 0 end) +
        (case when fonts        = ${traits.fonts}        then ${WEIGHTS.fonts}         else 0 end) +
        (case when webgl        = ${traits.webgl}        then ${WEIGHTS.webgl}         else 0 end) +
        (case when screen       = ${traits.screen}       then ${WEIGHTS.screen}        else 0 end) +
        (case when media_devices= ${traits.mediaDevices} then ${WEIGHTS.media_devices} else 0 end) +
        (case when ua           = ${traits.ua}           then ${WEIGHTS.ua}            else 0 end) +
        (case when timezone     = ${traits.timezone}     then ${WEIGHTS.timezone}      else 0 end) +
        (case when languages    = ${traits.languages}    then ${WEIGHTS.languages}     else 0 end) +
        (case when platform     = ${traits.platform}     then ${WEIGHTS.platform}      else 0 end) +
        (case when cores        = ${traits.cores}        then ${WEIGHTS.cores}         else 0 end) +
        (case when memory       = ${traits.memory}       then ${WEIGHTS.memory}        else 0 end) +
        (case when touch_points = ${traits.touchPoints}  then ${WEIGHTS.touch_points}  else 0 end) +
        (case when color_depth  = ${traits.colorDepth}   then ${WEIGHTS.color_depth}   else 0 end)
        as score
      from device
      where canvas = ${traits.canvas}
         or webgl_params = ${traits.webglParams}
         or audio = ${traits.audio}
         or fonts = ${traits.fonts}
      order by score desc
      limit 1
    `) as Array<{ id: number; visitor_id: string; score: number }>;

    const best = rows[0];
    if (best && best.score >= MATCH_THRESHOLD) {
      await sql`
        update device
        set last_seen = now(), hits = hits + 1
        where id = ${best.id}
      `;
      return {
        visitorId: best.visitor_id,
        deviceId: best.id,
        confidence: Number((best.score / TOTAL_WEIGHT).toFixed(2)),
        matched: true,
      };
    }

    const inserted = await insertDevice(sql, traits, clientId);
    return inserted
      ? {
          visitorId: clientId,
          deviceId: inserted,
          confidence: best ? Number((best.score / TOTAL_WEIGHT).toFixed(2)) : 0,
          matched: false,
        }
      : undefined;
  } catch (error) {
    console.warn("device resolve failed", error);
    return undefined;
  }
}

async function insertDevice(
  sql: Sql,
  t: TraitVector,
  visitorId: string,
): Promise<number | undefined> {
  const rows = (await sql`
    insert into device (
      visitor_id, ua, platform, languages, timezone, cores, memory,
      touch_points, color_depth, screen, canvas, webgl, webgl_params,
      audio, fonts, media_devices
    ) values (
      ${visitorId}, ${t.ua}, ${t.platform}, ${t.languages}, ${t.timezone},
      ${t.cores}, ${t.memory}, ${t.touchPoints}, ${t.colorDepth}, ${t.screen},
      ${nullIfOpaque(t.canvas)}, ${t.webgl}, ${t.webglParams},
      ${nullIfOpaque(t.audio)}, ${t.fonts}, ${t.mediaDevices}
    )
    returning id
  `) as Array<{ id: number }>;
  return rows[0]?.id;
}

// Opaque placeholders are stored as NULL so they can never satisfy an equality
// prefilter: in SQL, NULL = NULL is unknown, not true. This is what stops every
// Brave visitor collapsing onto one row.
function nullIfOpaque(value: string): string | null {
  return OPAQUE.has(value) ? null : value;
}

// ── Visit persistence ────────────────────────────────────────────────────────

export interface VisitRecord {
  deviceId?: number;
  visitorId: string;
  entryPath: string;
  exitPath: string;
  dwellSeconds: number;
  ip?: string;
  country?: string;
  city?: string;
  asn?: string;
  asOrg?: string;
  behavior?: Record<string, number>;
  flags: string[];
  trace?: unknown;
}

/**
 * Write one visit. This is the sink the raw trace previously lacked - before
 * this existed the pointer path and keystroke timings were collected, validated
 * and then dropped, because an ntfy message body caps out at 4096 bytes.
 */
export async function recordVisit(v: VisitRecord): Promise<void> {
  const sql = db();
  if (!sql) return;

  const b = v.behavior ?? {};

  try {
    await sql`
      insert into visit (
        device_id, visitor_id, entry_path, exit_path, dwell_secs,
        ip, country, city, asn, as_org,
        pointer_samples, pointer_straightness, sub_pixel_ratio,
        key_count, dwell_mean, flight_mean, click_count, inert_clicks,
        flags, trace
      ) values (
        ${v.deviceId ?? null}, ${v.visitorId}, ${v.entryPath}, ${v.exitPath},
        ${v.dwellSeconds},
        ${isIp(v.ip) ? v.ip : null}, ${v.country ?? null}, ${v.city ?? null},
        ${v.asn ?? null}, ${v.asOrg ?? null},
        ${b.pointerSamples ?? null}, ${b.pointerStraightness ?? null},
        ${b.subPixelRatio ?? null}, ${b.keyCount ?? null},
        ${b.dwellMean ?? null}, ${b.flightMean ?? null},
        ${b.clickCount ?? null}, ${b.inertClicks ?? null},
        ${v.flags}, ${v.trace ? JSON.stringify(v.trace) : null}
      )
    `;
  } catch (error) {
    console.warn("visit insert failed", error);
  }
}

// The column is `inet`; Postgres rejects the literal "unknown" that
// `networkContext` returns when no address header was present.
function isIp(value: string | undefined): boolean {
  if (!value || value === "unknown") return false;
  return /^[0-9a-fA-F.:]+$/.test(value);
}

// ── Erasure ──────────────────────────────────────────────────────────────────

/** Drops everything held against an identifier. Backs the §05 deletion promise. */
export async function forgetVisitor(visitorId: string): Promise<number> {
  const sql = db();
  if (!sql) return 0;
  try {
    const rows = (await sql`
      with dropped as (
        delete from device where visitor_id = ${visitorId} returning 1
      )
      select count(*)::int as n from dropped
    `) as Array<{ n: number }>;
    return rows[0]?.n ?? 0;
  } catch (error) {
    console.warn("forget failed", error);
    return 0;
  }
}
