// Sends a push notification via ntfy.sh for first-time visitors.
// Dedupe is cookie-based: no bi_seen cookie -> notify + set cookie.
// Configured entirely through env vars; without NTFY_TOPIC this is a no-op.

const SEEN_COOKIE = "bi_seen";
const SEEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // re-notify for the same browser after 30 days

const BOT_UA =
  /bot|crawl|spider|slurp|preview|scan|monitor|lighthouse|pagespeed|headless|curl|wget|python-requests|node-fetch|go-http-client|vercel-screenshot/i;

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

/** True for a real person's first full-page visit: GET for HTML, non-bot UA, no seen-cookie. */
export function isFirstDocumentVisit(request: Request): boolean {
  if (request.method !== "GET") return false;
  const accept = request.headers.get("accept") ?? "";
  if (!accept.includes("text/html")) return false;
  const ua = request.headers.get("user-agent") ?? "";
  if (!ua || BOT_UA.test(ua)) return false;
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

/** Fire the ntfy.sh notification. Never throws - a failed ping must not break the page. */
export async function notifyVisit(
  request: Request,
  env: unknown,
): Promise<void> {
  const topic = getEnv(env, "NTFY_TOPIC");
  if (!topic) return;
  const server = getEnv(env, "NTFY_SERVER") ?? "https://ntfy.sh";

  const url = new URL(request.url);
  const city = geoHeader(request, "x-vercel-ip-city") ?? "Unknown city";
  const region = geoHeader(request, "x-vercel-ip-country-region");
  const country = request.headers.get("x-vercel-ip-country") ?? "?";
  const referrer = request.headers.get("referer") ?? "direct";
  const ua = request.headers.get("user-agent") ?? "";

  const body = [
    `Page: ${url.pathname}`,
    `From: ${[city, region, country].filter(Boolean).join(", ")}`,
    `Referrer: ${referrer}`,
    `UA: ${ua.slice(0, 140)}`,
  ].join("\n");

  try {
    await fetch(`${server}/${encodeURIComponent(topic)}`, {
      method: "POST",
      headers: {
        Title: `New visitor: ${city}, ${country}`,
        Tags: "eyes",
      },
      body,
      signal: AbortSignal.timeout(2000),
    });
  } catch (error) {
    console.warn("ntfy visit notification failed", error);
  }
}
