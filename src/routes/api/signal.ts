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
  "engage_submitted",
  "contact_mailto",
  "demo_run",
  "render_error",
  "outbound_playground",
  "post_shared",
  "narration_play",
] as const;

type PushedEvent = (typeof PUSHED_EVENTS)[number];

const ALERT_EVENTS: ReadonlySet<string> = new Set<PushedEvent>([
  "engage_submitted",
  "contact_mailto",
]);

const QUIET_EVENTS: ReadonlySet<string> = new Set<PushedEvent>([
  "outbound_playground",
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

const DigestPayload = z.object({
  kind: z.literal("digest"),
  entryPath: STR,
  exitPath: STR,
  dwellSeconds: z.number().int().min(0).max(86_400),
  sections: z.array(z.string().max(40)).max(20),
  sectionsTotal: z.number().int().min(0).max(50),
  demoRuns: z.array(z.string().max(60)).max(30),
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
    case "engage_submitted":
      return "Engage form submitted - their mail client is open";
    case "contact_mailto":
      return `Contact email opened (from ${props.from ?? "unknown"})`;
    case "demo_run":
      return `Demo run: ${props.domain} ${props.proven === false ? "✗ refuted" : "✓ proved"}`;
    case "render_error":
      return `Client render error: ${props.message ?? "unknown"}`;
    case "outbound_playground":
      return `Clicked through to the playground (from ${props.from ?? "unknown"})`;
    case "post_shared":
      return `Shared "${props.slug}" (${props.method})`;
    case "narration_play":
      return `Playing narration for "${props.slug}" (${props.source})`;
    default:
      return event;
  }
}

// ── Handler ──────────────────────────────────────────────────────────────────

async function handle(request: Request): Promise<Response> {
  // Uniform response: never let a caller distinguish accepted from rejected.
  const ok = new Response(null, { status: 204 });

  try {
    if (!isSameOrigin(request)) return ok;

    // Loaded lazily so this server-only module never enters the client graph.
    const { isBotRequest, sendNtfy, visitorContext } =
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
    if (data.demoRuns.length > 0) {
      lines.push(
        `**Demo** ${data.demoRuns.length} run${data.demoRuns.length === 1 ? "" : "s"} — ${data.demoRuns.join(", ")}`,
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

    lines.push(`**Client** ${client}`);

    await sendNtfy(
      {
        title: `Visit · ${place} · ${formatDwell(data.dwellSeconds)}`,
        body: lines.join("\n"),
        priority: 2,
        tags: ["footprints"],
        firehose: true,
      },
      undefined,
    );

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
