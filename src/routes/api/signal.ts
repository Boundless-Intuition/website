import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

// ── Engagement relay ─────────────────────────────────────────────────────────
// Receives the anonymous engagement payloads that `@/lib/analytics` emits from
// the browser and forwards them to ntfy.sh. The topic and token stay here on
// the server, exactly like the Buttondown key in `@/lib/waitlist`.
//
// Two payload shapes:
//   { kind: "event" }  a single high-signal action, pushed straight through
//   { kind: "digest" } the end-of-visit summary, sent once by a closing beacon
//
// This is a public endpoint that fans out to a third-party service, so it is
// deliberately paranoid: same-origin only, strict schema, bot-filtered, and
// rate-limited per IP. It always answers 204 and never throws - a rejected
// payload must look exactly like an accepted one from the browser's side, and
// a failure here must never surface to the visitor.

const STR = z.string().max(200);

const ATTRIBUTION = {
  referrer: z.string().max(300).optional(),
  utm_source: z.string().max(100).optional(),
  utm_medium: z.string().max(100).optional(),
  utm_campaign: z.string().max(100).optional(),
};

// Mirrors the non-digest tiers in `@/lib/analytics`. Digest-tier event names are
// intentionally absent: they are only ever meant to arrive folded into a digest.
// `waitlist_subscribed` is absent: that one is announced server-side from
// `@/lib/waitlist` and never travels through this relay.
const PUSHED_EVENTS = [
  "booking_opened",
  "contact_mailto",
  "render_error",
  "outbound_playground",
  "outbound_social",
  "post_shared",
  "narration_play",
] as const;

type PushedEvent = (typeof PUSHED_EVENTS)[number];

const ALERT_EVENTS: ReadonlySet<string> = new Set<PushedEvent>([
  "booking_opened",
  "contact_mailto",
]);

const QUIET_EVENTS: ReadonlySet<string> = new Set<PushedEvent>([
  "outbound_playground",
  "outbound_social",
  "post_shared",
  "narration_play",
]);

const EventPayload = z.object({
  kind: z.literal("event"),
  event: z.enum(PUSHED_EVENTS),
  props: z
    .record(z.union([z.string().max(200), z.number(), z.boolean(), z.null()]))
    .default({}),
  path: STR,
  ...ATTRIBUTION,
});

// ── Profile / behaviour blocks ───────────────────────────────────────────────
// Mirrors `VisitorProfile` in `@/lib/analytics`, `BehaviorSummary` and
// `BehaviorTrace` in `@/lib/behavior`. All optional: the fingerprint probes are
// async and a fast bounce can flush the digest before they resolve.

const STORE = z.enum(["cookie", "localStorage", "sessionStorage", "indexedDB"]);

const ProfileSchema = z.object({
  id: z.string().max(64),
  source: z.string().max(20),
  stability: z.string().max(10),
  found: z.array(STORE).max(4),
  restored: z.array(STORE).max(4),
  // Optional: the client sheds this first when a digest would exceed the 64KB
  // beacon budget. A rejected payload here costs the WHOLE digest, not just the
  // profile, so these bounds are deliberately generous - the canvas is hashed
  // client-side now, but the font list and WebGL extension list are still long.
  traits: z
    .record(z.union([z.string().max(8000), z.number(), z.boolean()]))
    .optional(),
});

const BehaviorSchema = z.record(z.number());

// Tuples are [x, y, t] / [velocity, accel, t] / [dwell, flight, class].
const Triple = z.tuple([z.number(), z.number(), z.number()]);

const TraceSchema = z.object({
  pointer: z.array(Triple).max(600),
  scroll: z.array(Triple).max(300),
  keys: z.array(Triple).max(400),
  clicks: z
    .array(
      z.object({
        x: z.number(),
        y: z.number(),
        t: z.number(),
        target: z.string().max(80),
        trusted: z.boolean(),
        inert: z.boolean(),
      }),
    )
    .max(120),
  timeline: z
    .array(
      z.object({
        t: z.number(),
        kind: z.enum(["route", "visible", "hidden", "focus", "blur"]),
        detail: z.string().max(200),
      }),
    )
    .max(100),
});

const DigestPayload = z.object({
  kind: z.literal("digest"),
  profile: ProfileSchema.optional(),
  behavior: BehaviorSchema.optional(),
  trace: TraceSchema.optional(),
  /** Set by the client when the trace was shed to fit the beacon budget. */
  traceDropped: z.boolean().optional(),
  entryPath: STR,
  exitPath: STR,
  dwellSeconds: z.number().int().min(0).max(86_400),
  sections: z.array(z.string().max(40)).max(20),
  sectionsTotal: z.number().int().min(0).max(50),
  postProgress: z.record(z.number().min(0).max(100)),
  narrated: z.array(z.string().max(120)).max(20),
  shared: z.array(z.string().max(120)).max(20),
  notFound: z.array(STR).max(20),
  ...ATTRIBUTION,
});

const Payload = z.discriminatedUnion("kind", [EventPayload, DigestPayload]);

/** The acquisition fields both payload shapes carry. */
interface Attribution {
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

// ── Abuse guards ─────────────────────────────────────────────────────────────

const WINDOW_MS = 5 * 60 * 1000;
const MAX_PER_WINDOW = 40;

// Best-effort only: Vercel runs many function instances, so this throttles the
// ordinary case rather than a determined attacker. The strict schema and the
// same-origin check are the real limits on what can be pushed.
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    // Opportunistic sweep so the map can't grow without bound.
    if (hits.size > 5000) {
      for (const [key, value] of hits)
        if (now > value.resetAt) hits.delete(key);
    }
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const host = request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// ── Formatting ───────────────────────────────────────────────────────────────

function formatDwell(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s === 0 ? `${m}m` : `${m}m ${s}s`;
}

function attributionLines(data: Attribution): string[] {
  const lines: string[] = [];
  if (data.referrer) lines.push(`**Referrer** ${data.referrer}`);
  const campaign = [data.utm_source, data.utm_medium, data.utm_campaign]
    .filter(Boolean)
    .join(" / ");
  if (campaign) lines.push(`**Campaign** ${campaign}`);
  return lines;
}

function describeEvent(data: z.infer<typeof EventPayload>): string {
  const { event, props } = data;
  switch (event) {
    case "booking_opened":
      return "Booking page opened - they are picking a slot";
    case "contact_mailto":
      return `Contact email opened (from ${props.from ?? "unknown"})`;
    case "render_error":
      return `Client render error: ${props.message ?? "unknown"}`;
    case "outbound_playground":
      return `Clicked through to the playground (from ${props.from ?? "unknown"})`;
    case "outbound_social":
      return `Clicked through to ${props.network ?? "a social profile"}`;
    case "post_shared":
      return `Shared "${props.slug}" (${props.method})`;
    case "narration_play":
      return `Playing narration for "${props.slug}" (${props.source})`;
    default:
      return event;
  }
}

// ── Visit classification ─────────────────────────────────────────────────────

type VisitLevel = "automation" | "returning" | "ordinary";

interface Verdict {
  level: VisitLevel;
  priority: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  reasons: string[];
}

/**
 * Decide how loudly a visit should arrive.
 *
 * Two independent strong signals are required before calling something
 * automation, because each one alone has a real false-positive story: an
 * accessibility tool dispatches untrusted events, and a very short pointer
 * path is straight by arithmetic rather than by intent.
 *
 * Deliberately not used here: the sub-pixel ratio. Touch events carry integer
 * coordinates natively, so every phone would score as synthetic. It is recorded
 * and shown in the body, but it must not drive an alert without a
 * `touchPoints === 0` gate.
 */
function classifyVisit(
  flags: string[],
  behavior: Record<string, number> | undefined,
  recognised: boolean,
): Verdict {
  const strong: string[] = [];
  const weak: string[] = [];

  if (behavior) {
    if (behavior.untrustedEvents > 0 || behavior.untrustedClicks > 0)
      strong.push("synthetic input events");

    // A programmatic move from A to B travels the direct distance, so the ratio
    // sits at 1.00. Anything below 1.05 over a path long enough to have wandered
    // is not a hand on a mouse.
    if (
      behavior.pointerSamples >= 10 &&
      behavior.pointerStraightness > 0 &&
      behavior.pointerStraightness < 1.05
    )
      strong.push(`pointer path straightness ${behavior.pointerStraightness}`);

    // Real fingers vary. A zero standard deviation across more than a handful
    // of keystrokes means the intervals were generated, not typed.
    if (behavior.keyCount > 5 && behavior.dwellStdev === 0)
      strong.push("zero variance in keystroke timing");
  }

  for (const flag of flags) {
    if (flag.includes("mismatch")) weak.push(flag);
  }

  if (strong.length >= 2 || (strong.length === 1 && weak.length >= 1)) {
    return {
      level: "automation",
      priority: 4,
      tags: ["robot"],
      reasons: [...strong, ...weak],
    };
  }

  if (recognised) {
    return {
      level: "returning",
      priority: 3,
      tags: ["repeat"],
      reasons: strong.length > 0 ? strong : [],
    };
  }

  return {
    level: "ordinary",
    priority: 2,
    tags: ["footprints"],
    reasons: strong,
  };
}

// ── Handler ──────────────────────────────────────────────────────────────────

async function handle(request: Request): Promise<Response> {
  // Uniform response: never let a caller distinguish accepted from rejected.
  const ok = new Response(null, { status: 204 });

  try {
    if (!isSameOrigin(request)) return ok;

    // Loaded lazily so this server-only module never enters the client graph.
    const { isBotRequest, sendNtfy, sendNtfyFile, visitorContext } =
      await import("@/lib/visit-notify.server");

    if (isBotRequest(request)) return ok;

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    if (rateLimited(ip)) return ok;

    const raw: unknown = await request.json();
    const parsed = Payload.safeParse(raw);
    if (!parsed.success) return ok;

    const data = parsed.data;
    const { place, timezone, client } = visitorContext(request);

    if (data.kind === "event") {
      const alert = ALERT_EVENTS.has(data.event);
      const quiet = QUIET_EVENTS.has(data.event);

      const body = [
        describeEvent(data),
        "",
        `**Where** ${place}${timezone ? ` (${timezone})` : ""}`,
        `**Page** \`${data.path}\``,
        ...attributionLines(data),
        `**Client** ${client}`,
      ].join("\n");

      await sendNtfy(
        {
          title: alert ? `${place} — high intent` : place,
          body,
          priority: alert ? 4 : quiet ? 1 : 3,
          tags: alert ? ["tada"] : quiet ? ["speech_balloon"] : ["mag"],
          firehose: quiet,
        },
        undefined,
      );

      return ok;
    }

    // ── Digest ──
    const { networkContext, networkAnomalies } =
      await import("@/lib/network.server");
    const net = networkContext(request);
    const anomalies = networkAnomalies(
      net,
      typeof data.profile?.traits?.timezone === "string"
        ? data.profile.traits.timezone
        : undefined,
    );

    const lines: string[] = [];
    const path =
      data.entryPath === data.exitPath
        ? `\`${data.entryPath}\``
        : `\`${data.entryPath}\` → \`${data.exitPath}\``;

    lines.push(`**Path** ${path}`);
    lines.push(...attributionLines(data));

    if (data.sections.length > 0) {
      lines.push(
        `**Sections** ${data.sections.join(" → ")} (${data.sections.length}/${data.sectionsTotal})`,
      );
    }
    const reading = Object.entries(data.postProgress).map(
      ([slug, pct]) => `${slug} ${pct}%`,
    );
    if (reading.length > 0) lines.push(`**Blog** ${reading.join(", ")}`);
    if (data.narrated.length > 0)
      lines.push(`**Narration** ${data.narrated.join(", ")}`);
    if (data.shared.length > 0)
      lines.push(`**Shared** ${data.shared.join(", ")}`);
    if (data.notFound.length > 0)
      lines.push(`**404s** ${data.notFound.join(", ")}`);

    // ── Identity ──
    if (data.profile) {
      const p = data.profile;
      const returning = p.found.length > 0;
      lines.push(
        `**Visitor** \`${p.id}\` (${returning ? "returning" : "new"}, ${p.source}, ${p.stability} confidence)`,
      );
      if (p.restored.length > 0)
        lines.push(`**Re-seeded** ${p.restored.join(", ")}`);
      const t = p.traits;
      if (t) {
        lines.push(
          `**Device** ${t.screen} @${t.dpr}x · ${t.cores}c/${t.memory}gb · ${t.webgl}`,
        );
      } else {
        lines.push("**Device** traits shed to fit the beacon size budget");
      }
    }

    // ── Behaviour ──
    if (data.behavior) {
      const b = data.behavior;
      lines.push(
        `**Behaviour** ${b.pointerSamples} pointer samples, straightness ${b.pointerStraightness}, sub-pixel ${b.subPixelRatio}`,
      );
      if (b.keyCount > 0)
        lines.push(
          `**Typing** ${b.keyCount} keys · dwell ${b.dwellMean}±${b.dwellStdev}ms · flight ${b.flightMean}±${b.flightStdev}ms`,
        );
      if (b.clickCount > 0)
        lines.push(
          `**Clicks** ${b.clickCount} (${b.inertClicks} on non-interactive)`,
        );
    }

    // ── Network ──
    lines.push(`**IP** ${net.ip} (via ${net.ipSource})`);
    if (net.asOrg) lines.push(`**Network** ${net.asOrg} (AS${net.asn ?? "?"})`);
    if (net.geo.latitude && net.geo.longitude)
      lines.push(`**Coords** ${net.geo.latitude}, ${net.geo.longitude}`);
    lines.push(
      `**Agent** ${net.agent.browser} ${net.agent.browserVersion} · ${net.agent.os} ${net.agent.osVersion} · ${net.agent.device}`,
    );

    const flags = [
      anomalies.timezoneMismatch && "timezone/geo mismatch (VPN?)",
      anomalies.proxied && `proxied (${net.forwardedChain.length} hops)`,
      anomalies.platformMismatch && "UA/client-hint platform mismatch",
      anomalies.formMismatch && "UA/client-hint form mismatch",
      data.behavior?.untrustedEvents ? "synthetic pointer events" : undefined,
      data.behavior?.untrustedClicks ? "synthetic clicks" : undefined,
    ].filter(Boolean) as string[];
    if (flags.length > 0) lines.push(`**Flags** ${flags.join(" · ")}`);

    // ── Persistence ──
    // Hoisted out of the block below so the notification routing can see it.
    let recognised = false;
    // Server-side matching runs before the notification is composed so the
    // push can say "returning" on the strength of the fuzzy match rather than
    // just the client's own storage, which a cleared browser would have lost.
    // Needs the component vector: without traits there is nothing to match on,
    // so a trait-shed digest is reported but not stored as a device.
    if (data.profile?.traits) {
      const { resolveDevice, recordVisit } =
        await import("@/lib/identity-store.server");
      const t = data.profile.traits;
      const vector = {
        ua: String(t.ua ?? ""),
        platform: String(t.platform ?? ""),
        languages: String(t.languages ?? ""),
        timezone: String(t.timezone ?? ""),
        cores: Number(t.cores ?? 0),
        memory: Number(t.memory ?? 0),
        touchPoints: Number(t.touchPoints ?? 0),
        colorDepth: Number(t.colorDepth ?? 0),
        screen: String(t.screen ?? ""),
        canvas: String(t.canvas ?? ""),
        webgl: String(t.webgl ?? ""),
        webglParams: String(t.webglParams ?? ""),
        audio: String(t.audio ?? ""),
        fonts: String(t.fonts ?? ""),
        mediaDevices: String(t.mediaDevices ?? ""),
      };

      const match = await resolveDevice(
        vector,
        data.profile.id,
        data.profile.stability,
      );

      if (match?.matched) {
        recognised = true;
        lines.push(
          `**Recognised** device seen before at ${Math.round(match.confidence * 100)}% component agreement`,
        );
      }

      await recordVisit({
        deviceId: match?.deviceId,
        visitorId: match?.visitorId ?? data.profile.id,
        entryPath: data.entryPath,
        exitPath: data.exitPath,
        dwellSeconds: data.dwellSeconds,
        ip: net.ip,
        country: net.geo.country,
        city: net.geo.city,
        asn: net.asn,
        asOrg: net.asOrg,
        behavior: data.behavior,
        flags,
        trace: data.trace,
      });
    }

    lines.push(`**Client** ${client}`);

    // ── Routing ──
    // Without this every visit lands on the firehose at priority 2 and the
    // interesting ones are indistinguishable from the rest. Automation is the
    // thing worth an alert tone; a recognised returning device is worth reading
    // now; everything else stays quiet.
    const verdict = classifyVisit(flags, data.behavior, recognised);

    await sendNtfy(
      {
        title:
          verdict.level === "automation"
            ? `Automation · ${place}`
            : verdict.level === "returning"
              ? `Return visit · ${place} · ${formatDwell(data.dwellSeconds)}`
              : `Visit · ${place} · ${formatDwell(data.dwellSeconds)}`,
        body:
          verdict.reasons.length > 0
            ? [`**Why** ${verdict.reasons.join(" · ")}`, ...lines].join("\n")
            : lines.join("\n"),
        priority: verdict.priority,
        tags: verdict.tags,
        firehose: verdict.level === "ordinary",
      },
      undefined,
    );

    // ── Full record ──
    // The summary above is capped at 3500 bytes, so it carries a GPU string but
    // not the canvas hash, the font list or the trace. This sends the complete
    // record as an attachment on the same topic.
    //
    // Opt-in via NTFY_FULL_DIGEST because it is a fair amount of data per
    // visit, and because ntfy.sh counts attachments against a 100MB per-visitor
    // budget that these would otherwise consume quickly.
    if (process.env.NTFY_FULL_DIGEST) {
      const record = {
        recordedAt: new Date().toISOString(),
        verdict: verdict.level,
        reasons: verdict.reasons,
        flags,
        visit: {
          entryPath: data.entryPath,
          exitPath: data.exitPath,
          dwellSeconds: data.dwellSeconds,
          sections: data.sections,
          postProgress: data.postProgress,
          notFound: data.notFound,
          referrer: data.referrer,
          utm_source: data.utm_source,
          utm_medium: data.utm_medium,
          utm_campaign: data.utm_campaign,
        },
        // The full component vector, uncut - canvas hash, webglParams, the
        // whole font list, the audio signature.
        profile: data.profile,
        behavior: data.behavior,
        network: {
          ip: net.ip,
          ipSource: net.ipSource,
          forwardedChain: net.forwardedChain,
          geo: net.geo,
          asn: net.asn,
          asOrg: net.asOrg,
          agent: net.agent,
          anomalies,
        },
        trace: data.trace,
      };

      await sendNtfyFile(
        {
          filename: `digest-${data.profile?.id ?? "anon"}.json`,
          title: `Full record ${data.profile?.id ?? "anon"}`,
          body: JSON.stringify(record, null, 2),
          priority: 1,
          tags: ["card_index"],
          firehose: verdict.level === "ordinary",
        },
        undefined,
      );
    }

    return ok;
  } catch (error) {
    console.warn("signal relay failed", error);
    return ok;
  }
}

export const Route = createFileRoute("/api/signal")({
  server: {
    handlers: {
      POST: ({ request }) => handle(request),
    },
  },
});
