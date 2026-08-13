// ── Network and contextual data ──────────────────────────────────────────────
// Everything the edge already knows about a request: address, geolocation,
// network operator, and a deep parse of the user-agent.
//
// Server-only by the `.server.ts` convention in CLAUDE.md - never import this
// from a component, or the UA table ships to the browser.
//
// Vercel URI-encodes its geo header values ("San%20Francisco"), so every read
// goes through `header()` rather than `request.headers.get` directly.

export interface NetworkContext {
  ip: string;
  ipSource: string;
  /** Every hop in the forwarded chain, client first. */
  forwardedChain: string[];
  geo: GeoContext;
  agent: AgentContext;
  /** Autonomous system, when the platform reports it. */
  asn?: string;
  asOrg?: string;
}

export interface GeoContext {
  city?: string;
  region?: string;
  country?: string;
  continent?: string;
  latitude?: string;
  longitude?: string;
  timezone?: string;
  /** Formatted "City, Region, Country" for notification bodies. */
  place: string;
}

export interface AgentContext {
  raw: string;
  browser: string;
  browserVersion: string;
  engine: string;
  os: string;
  osVersion: string;
  device: string;
  form: "desktop" | "mobile" | "tablet" | "unknown";
  /** From Client Hints, when the browser sends them. More trustworthy than UA. */
  hintedPlatform?: string;
  hintedMobile?: boolean;
  hintedModel?: string;
}

function header(request: Request, name: string): string | undefined {
  const value = request.headers.get(name);
  if (!value) return undefined;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

// ── Address ──────────────────────────────────────────────────────────────────

// Order matters: the platform's own header is authoritative because it cannot
// be spoofed by the client, whereas `x-forwarded-for` is caller-supplied and
// only trustworthy in its final hop. We take the first entry for the client
// address but keep the whole chain for proxy analysis.
const IP_HEADERS = [
  "x-vercel-forwarded-for",
  "x-real-ip",
  "cf-connecting-ip",
  "x-forwarded-for",
] as const;

function parseChain(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function resolveIp(request: Request): {
  ip: string;
  ipSource: string;
  forwardedChain: string[];
} {
  const forwardedChain = parseChain(
    request.headers.get("x-forwarded-for") ?? undefined,
  );

  for (const name of IP_HEADERS) {
    const raw = request.headers.get(name);
    if (!raw) continue;
    const first = parseChain(raw)[0];
    if (first) return { ip: first, ipSource: name, forwardedChain };
  }

  return { ip: "unknown", ipSource: "none", forwardedChain };
}

// ── Geolocation ──────────────────────────────────────────────────────────────

function resolveGeo(request: Request): GeoContext {
  const city = header(request, "x-vercel-ip-city");
  const region = header(request, "x-vercel-ip-country-region");
  const country = header(request, "x-vercel-ip-country");
  const continent = header(request, "x-vercel-ip-continent");

  return {
    city,
    region,
    country,
    continent,
    latitude: header(request, "x-vercel-ip-latitude"),
    longitude: header(request, "x-vercel-ip-longitude"),
    timezone: header(request, "x-vercel-ip-timezone"),
    place:
      [city, region, country].filter(Boolean).join(", ") ||
      continent ||
      "unknown location",
  };
}

// ── User agent ───────────────────────────────────────────────────────────────

// Ordered: the later entries in each table claim to be the earlier ones. Edge
// claims Chrome and Safari, Chrome claims Safari, Opera claims Chrome.
const BROWSERS: Array<[string, RegExp]> = [
  ["Edge", /Edg(?:e|A|iOS)?\/([\d.]+)/],
  ["Opera", /OPR\/([\d.]+)/],
  ["Samsung Internet", /SamsungBrowser\/([\d.]+)/],
  ["Firefox", /(?:Firefox|FxiOS)\/([\d.]+)/],
  ["Chrome", /(?:Chrome|CriOS)\/([\d.]+)/],
  ["Safari", /Version\/([\d.]+).*Safari/],
];

const OSES: Array<[string, RegExp]> = [
  ["iOS", /(?:iPhone )?OS ([\d_]+)/],
  ["macOS", /Mac OS X ([\d_]+)/],
  ["Android", /Android ([\d.]+)/],
  ["Windows", /Windows NT ([\d.]+)/],
  ["ChromeOS", /CrOS \w+ ([\d.]+)/],
  ["Linux", /(Linux)/],
];

// Windows NT numbers do not match the marketing name at all past 6.0.
const WINDOWS_NAMES: Record<string, string> = {
  "10.0": "10/11",
  "6.3": "8.1",
  "6.2": "8",
  "6.1": "7",
};

function matchTable(
  ua: string,
  table: Array<[string, RegExp]>,
): { name: string; version: string } {
  for (const [name, pattern] of table) {
    const found = pattern.exec(ua);
    if (found) return { name, version: (found[1] ?? "").replace(/_/g, ".") };
  }
  return { name: "unknown", version: "" };
}

/** Device model, where the UA carries one. Android and Samsung are the useful cases. */
function deviceModel(ua: string): string {
  if (/iPhone/.test(ua)) return "iPhone";
  if (/iPad/.test(ua)) return "iPad";
  const android = /Android [\d.]+;\s*([^;)]+?)(?:\s+Build|[;)])/.exec(ua);
  if (android) return android[1].trim();
  return "unknown";
}

function resolveAgent(request: Request): AgentContext {
  const raw = request.headers.get("user-agent") ?? "";
  const browser = matchTable(raw, BROWSERS);
  const os = matchTable(raw, OSES);

  const osVersion =
    os.name === "Windows"
      ? (WINDOWS_NAMES[os.version] ?? os.version)
      : os.version;

  const engine = /Gecko\/|rv:/.test(raw)
    ? "Gecko"
    : /AppleWebKit/.test(raw)
      ? /Chrome|Edg|OPR/.test(raw)
        ? "Blink"
        : "WebKit"
      : "unknown";

  const form: AgentContext["form"] = /iPad|Tablet/.test(raw)
    ? "tablet"
    : /Mobile|iPhone|iPod/.test(raw)
      ? "mobile"
      : raw
        ? "desktop"
        : "unknown";

  // Client Hints are set by the browser itself rather than assembled from a
  // legacy string, so where present they beat the UA parse above.
  const hintedPlatform = header(request, "sec-ch-ua-platform")?.replace(
    /"/g,
    "",
  );
  const hintedMobileRaw = request.headers.get("sec-ch-ua-mobile");
  const hintedModel = header(request, "sec-ch-ua-model")?.replace(/"/g, "");

  return {
    raw,
    browser: browser.name,
    browserVersion: browser.version,
    engine,
    os: os.name,
    osVersion,
    device: hintedModel || deviceModel(raw),
    form,
    hintedPlatform: hintedPlatform || undefined,
    hintedMobile: hintedMobileRaw ? hintedMobileRaw === "?1" : undefined,
    hintedModel: hintedModel || undefined,
  };
}

// ── Entry point ──────────────────────────────────────────────────────────────

export function networkContext(request: Request): NetworkContext {
  const { ip, ipSource, forwardedChain } = resolveIp(request);

  return {
    ip,
    ipSource,
    forwardedChain,
    geo: resolveGeo(request),
    agent: resolveAgent(request),
    asn: request.headers.get("x-vercel-ip-as-number") ?? undefined,
    asOrg: header(request, "x-vercel-ip-as-organization"),
  };
}

// ── Derived signals ──────────────────────────────────────────────────────────

export interface NetworkAnomalies {
  /** The edge saw a different country than the browser's own timezone implies. */
  timezoneMismatch: boolean;
  /** More than one proxy hop before us. */
  proxied: boolean;
  /** UA says one platform, Client Hints say another. */
  platformMismatch: boolean;
  /** UA claims mobile, Client Hints disagree, or vice versa. */
  formMismatch: boolean;
}

/**
 * Cross-checks between what the network says and what the browser says about
 * itself. A VPN produces a timezone mismatch; a patched user-agent produces a
 * platform or form mismatch, because stealth tooling routinely rewrites the UA
 * string and forgets the Client Hints beside it.
 *
 * `clientTimezone` is the IANA zone reported by `./fingerprint`.
 */
export function networkAnomalies(
  ctx: NetworkContext,
  clientTimezone?: string,
): NetworkAnomalies {
  const { geo, agent } = ctx;

  const timezoneMismatch = Boolean(
    clientTimezone && geo.timezone && clientTimezone !== geo.timezone,
  );

  const platformMismatch = Boolean(
    agent.hintedPlatform &&
    agent.os !== "unknown" &&
    !agent.hintedPlatform.toLowerCase().includes(agent.os.toLowerCase()) &&
    // "macOS" hints as "macOS", but Windows hints as "Windows" against an
    // os.name of "Windows" - only flag genuinely disjoint pairs.
    !(agent.os === "ChromeOS" && agent.hintedPlatform === "Chrome OS"),
  );

  const formMismatch = Boolean(
    agent.hintedMobile !== undefined &&
    agent.hintedMobile !== (agent.form === "mobile"),
  );

  return {
    timezoneMismatch,
    proxied: ctx.forwardedChain.length > 1,
    platformMismatch,
    formMismatch,
  };
}
