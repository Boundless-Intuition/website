// Push notifications via ntfy.sh.
//
// Two things live here:
//   1. `sendNtfy` - the generic publisher, shared with the `/api/signal` route
//      that relays client-side engagement events.
//   2. The arrival ping - a quiet heads-up on a first-time visitor's first
//      page. Dedupe is cookie-based: no bi_seen cookie -> notify + set cookie.
//
// Configured entirely through env vars; without NTFY_TOPIC everything here is
// a no-op.
//
//   NTFY_TOPIC           required to send anything at all
//   NTFY_TOPIC_FIREHOSE  optional; low-signal traffic (arrival pings, quiet
//                        events, visit digests) goes here instead, so the main
//                        topic stays worth an alert tone. Falls back to
//                        NTFY_TOPIC when unset.
//   NTFY_TOKEN           optional bearer token. Worth setting: on ntfy.sh a
//                        guessable topic is world-readable *and* world-writable.
//   NTFY_SERVER          optional self-hosted server; defaults to ntfy.sh.

import { isbot } from "isbot";

const SEEN_COOKIE = "bi_seen";
const SEEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // re-notify for the same browser after 30 days

/** ntfy treats bodies over 4096 bytes as attachments; stay well clear. */
const MAX_BODY = 3500;

function getEnv(env: unknown, key: string): string | undefined {
  const binding = (env as Record<string, unknown> | null | undefined)?.[key];
  if (typeof binding === "string" && binding.length > 0) return binding;
  const fromProcess =
    typeof process !== "undefined" ? process.env?.[key] : undefined;
  return fromProcess && fromProcess.length > 0 ? fromProcess : undefined;
}

// Vercel URI-encodes geo header values (e.g. "San%20Francisco").
function geoHeader(request: Request, name: string): string | undefined {
  const value = request.headers.get(name);
  if (!value) return undefined;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/** True when the request comes from a crawler, scraper or uptime monitor. */
export function isBotRequest(request: Request): boolean {
  const ua = request.headers.get("user-agent");
  return !ua || isbot(ua);
}

// ── Visitor context ──────────────────────────────────────────────────────────

export interface VisitorContext {
  place: string;
  timezone?: string;
  client: string;
}

/** Coarse device/OS/browser, rather than dumping a raw user-agent string. */
function describeClient(ua: string): string {
  if (!ua) return "unknown client";

  const os = /Windows/.test(ua)
    ? "Windows"
    : /iPhone|iPad|iPod/.test(ua)
      ? "iOS"
      : /Mac OS X/.test(ua)
        ? "macOS"
        : /Android/.test(ua)
          ? "Android"
          : /Linux/.test(ua)
            ? "Linux"
            : "unknown OS";

  // Order matters: Edge and Chrome both claim Safari, Edge also claims Chrome.
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /OPR\//.test(ua)
      ? "Opera"
      : /Firefox\//.test(ua)
        ? "Firefox"
        : /Chrome\//.test(ua)
          ? "Chrome"
          : /Safari\//.test(ua)
            ? "Safari"
            : "unknown browser";

  const form = /Mobile|iPhone|iPod|Android.*Mobile/.test(ua)
    ? "mobile"
    : /iPad|Tablet/.test(ua)
      ? "tablet"
      : "desktop";

  return `${os} · ${browser} · ${form}`;
}

/** Everything Vercel's edge already knows about the requester, formatted. */
export function visitorContext(request: Request): VisitorContext {
  const city = geoHeader(request, "x-vercel-ip-city");
  const region = geoHeader(request, "x-vercel-ip-country-region");
  const country = request.headers.get("x-vercel-ip-country");
  const continent = request.headers.get("x-vercel-ip-continent");

  const place =
    [city, region, country].filter(Boolean).join(", ") ||
    continent ||
    "unknown location";

  return {
    place,
    timezone: request.headers.get("x-vercel-ip-timezone") ?? undefined,
    client: describeClient(request.headers.get("user-agent") ?? ""),
  };
}

// ── Publisher ────────────────────────────────────────────────────────────────

export interface NtfyMessage {
  title: string;
  body: string;
  /** ntfy priority, 1 (silent) to 5 (urgent). Defaults to 3. */
  priority?: 1 | 2 | 3 | 4 | 5;
  tags?: string[];
  /** Send to NTFY_TOPIC_FIREHOSE instead of the main topic. */
  firehose?: boolean;
}

/**
 * Publish one notification. Never throws and never rejects - a failed ping must
 * not break a page render or a form submission.
 *
 * Uses ntfy's JSON publishing format rather than its `Title`/`Priority` headers.
 * HTTP header values are ByteStrings, so a header-based title throws outright on
 * any character above U+00FF and silently mangles Latin-1 ones - which for us
 * means every em dash, and every visitor from Zürich or São Paulo. The JSON body
 * is UTF-8 and has neither problem.
 */
export async function sendNtfy(
  message: NtfyMessage,
  env: unknown,
): Promise<void> {
  const main = getEnv(env, "NTFY_TOPIC");
  if (!main) return;

  const topic = message.firehose
    ? (getEnv(env, "NTFY_TOPIC_FIREHOSE") ?? main)
    : main;
  const server = getEnv(env, "NTFY_SERVER") ?? "https://ntfy.sh";
  const token = getEnv(env, "NTFY_TOKEN");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    await fetch(server, {
      method: "POST",
      headers,
      body: JSON.stringify({
        topic,
        title: message.title.slice(0, 200),
        message: message.body.slice(0, MAX_BODY),
        priority: message.priority ?? 3,
        tags: message.tags ?? [],
        markdown: true,
      }),
      signal: AbortSignal.timeout(2000),
    });
  } catch (error) {
    console.warn("ntfy notification failed", error);
  }
}

// ── Arrival ping ─────────────────────────────────────────────────────────────

/** True for a real person's first full-page visit: GET for HTML, non-bot UA, no seen-cookie. */
export function isFirstDocumentVisit(request: Request): boolean {
  if (request.method !== "GET") return false;
  const accept = request.headers.get("accept") ?? "";
  if (!accept.includes("text/html")) return false;
  if (isBotRequest(request)) return false;
  const cookies = request.headers.get("cookie") ?? "";
  return !cookies.includes(`${SEEN_COOKIE}=`);
}

/** Returns a copy of the response with the dedupe cookie appended. */
export function withSeenCookie(response: Response): Response {
  const res = new Response(response.body, response);
  res.headers.append(
    "set-cookie",
    `${SEEN_COOKIE}=1; Max-Age=${SEEN_MAX_AGE_SECONDS}; Path=/; SameSite=Lax; HttpOnly; Secure`,
  );
  return res;
}

/**
 * Fire the arrival notification. Deliberately quiet: at this point we know only
 * that someone showed up. The end-of-visit digest sent from `/api/signal` is the
 * one that carries what they actually did, so this is really just the fallback
 * for visitors whose closing beacon never fires.
 */
export async function notifyVisit(
  request: Request,
  env: unknown,
): Promise<void> {
  const url = new URL(request.url);
  const { place, timezone, client } = visitorContext(request);
  const referrer = request.headers.get("referer") ?? "direct";

  // Loaded here rather than at module scope so this file stays importable from
  // `src/server.ts` without dragging the UA tables in on every cold start.
  const { networkContext } = await import("./network.server");
  const net = networkContext(request);

  const body = [
    `**Landed on** \`${url.pathname}\``,
    `**From** ${place}${timezone ? ` (${timezone})` : ""}`,
    `**IP** ${net.ip}${net.asOrg ? ` · ${net.asOrg}` : ""}`,
    `**Referrer** ${referrer}`,
    `**Agent** ${net.agent.browser} ${net.agent.browserVersion} · ${net.agent.os} ${net.agent.osVersion}${net.agent.device !== "unknown" ? ` · ${net.agent.device}` : ""}`,
    `**Client** ${client}`,
  ].join("\n");

  await sendNtfy(
    {
      title: `Arrival: ${place}`,
      body,
      priority: 1,
      tags: ["eyes"],
      firehose: true,
    },
    env,
  );
}
