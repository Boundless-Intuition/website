// ── Device fingerprinting ────────────────────────────────────────────────────
// Builds a probabilistic device identifier from hardware and software traits
// that survive cookie clearing and private windows.
//
// Two layers, deliberately:
//   1. A stored id in localStorage - exact, stable, cheap to read.
//   2. A computed fingerprint hash - the fallback when storage is blocked,
//      cleared or partitioned. Weaker, but it is what keeps a visitor
//      recognisable across a cookie wipe.
//
// The hash is built only from the STABLE bank below. Traits that change with
// window size, battery, or network are collected for analysis but kept out of
// the identity hash, because an id that changes when someone resizes a window
// is not an id.
//
// Cost control: everything here runs once, after first paint, off the critical
// path. Nothing in this module may block rendering.
//
// Disclosed in `/legal` §04. Keep that section in step with what this collects.

const STORAGE_KEY = "bi_vid";
const HASH_VERSION = 3;

// ── Trait collection ─────────────────────────────────────────────────────────

export interface DeviceTraits {
  // Stable bank - feeds the identity hash.
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

  // Volatile bank - reported, never hashed.
  viewport: string;
  dpr: number;
  connection: string;
  reducedMotion: boolean;
  colorScheme: string;
  storageBlocked: boolean;
}

function safe<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

/**
 * Canvas raster hash. The same drawing commands rasterise differently across
 * GPU, driver and font stack, which is what makes this discriminating.
 *
 * Drawn twice on purpose. Browsers with anti-fingerprinting on (Brave, Firefox
 * RFP, Tor) inject per-call noise, so the two passes disagree - that
 * disagreement is itself the useful signal, and we return "unstable" rather
 * than a hash that would differ on every page load and pollute the id space.
 */
function canvasTrait(): string {
  return safe(() => {
    const draw = () => {
      const c = document.createElement("canvas");
      c.width = 240;
      c.height = 60;
      const ctx = c.getContext("2d");
      if (!ctx) return "";
      ctx.textBaseline = "top";
      ctx.font = "14px 'Arial'";
      ctx.fillStyle = "#f60";
      ctx.fillRect(0, 0, 120, 30);
      ctx.fillStyle = "#069";
      ctx.fillText("BI ✓ verification éñ中", 2, 15);
      ctx.fillStyle = "rgba(102, 200, 0, 0.7)";
      ctx.fillText("BI ✓ verification éñ中", 4, 20);
      ctx.globalCompositeOperation = "multiply";
      ctx.beginPath();
      ctx.arc(50, 30, 20, 0, Math.PI * 2, true);
      ctx.fill();
      return c.toDataURL();
    };
    const a = draw();
    if (!a) return "none";
    if (a !== draw()) return "unstable";
    // Hashed before it leaves the browser. The raw data URL is a base64 PNG
    // running to several thousand characters - it blew past the payload schema
    // cap and helped push the digest over the 64KB `sendBeacon` limit, so the
    // whole thing was being dropped silently.
    //
    // Nothing is lost: this value is only ever compared for equality, both in
    // the identity hash and in the fuzzy match, and a hash compares identically.
    // It also means the rendered image itself is never transmitted or stored.
    return hash(a);
  }, "error");
}

/** GPU vendor/renderer. Software renderers here are a strong headless tell. */
function webglTrait(): { renderer: string; params: string } {
  return safe(
    () => {
      const c = document.createElement("canvas");
      const gl = (c.getContext("webgl2") ??
        c.getContext("webgl")) as WebGLRenderingContext | null;
      if (!gl) return { renderer: "none", params: "none" };

      const dbg = gl.getExtension("WEBGL_debug_renderer_info");
      const renderer = dbg
        ? `${String(gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL))}/${String(
            gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL),
          )}`
        : "masked";

      // Shader precision and limits are far harder to spoof coherently than the
      // vendor string, which every stealth plugin patches first.
      const vert = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT);
      const frag = gl.getShaderPrecisionFormat(
        gl.FRAGMENT_SHADER,
        gl.HIGH_FLOAT,
      );
      const params = [
        gl.getParameter(gl.MAX_TEXTURE_SIZE),
        gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
        gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
        gl.getParameter(gl.MAX_VARYING_VECTORS),
        vert ? `${vert.rangeMin},${vert.rangeMax},${vert.precision}` : "x",
        frag ? `${frag.rangeMin},${frag.rangeMax},${frag.precision}` : "x",
        (gl.getSupportedExtensions() ?? []).sort().join(","),
      ].join("|");

      return { renderer, params };
    },
    { renderer: "error", params: "error" },
  );
}

/**
 * Audio stack fingerprint via OfflineAudioContext. Rendered offline so it is
 * silent and needs no user gesture; the float output differs by platform audio
 * implementation.
 */
async function audioTrait(): Promise<string> {
  try {
    const Ctor =
      window.OfflineAudioContext ??
      (
        window as unknown as {
          webkitOfflineAudioContext?: typeof OfflineAudioContext;
        }
      ).webkitOfflineAudioContext;
    if (!Ctor) return "none";

    const ctx = new Ctor(1, 5000, 44100);
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = 10000;

    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -50;
    comp.knee.value = 40;
    comp.ratio.value = 12;
    comp.attack.value = 0;
    comp.release.value = 0.25;

    osc.connect(comp);
    comp.connect(ctx.destination);
    osc.start(0);

    const buffer = await ctx.startRendering();
    const data = buffer.getChannelData(0);
    let sum = 0;
    for (let i = 4500; i < 5000; i++) sum += Math.abs(data[i]);
    return sum.toFixed(8);
  } catch {
    return "error";
  }
}

// Chosen to straddle the platform font stacks: presence/absence of these
// discriminates macOS vs Windows vs Linux vs mobile well, and headless Chrome
// on a bare container ships almost none of them.
const FONT_PROBES = [
  "Arial",
  "Helvetica Neue",
  "Times New Roman",
  "Courier New",
  "Georgia",
  "Segoe UI",
  "Calibri",
  "Cambria",
  "Consolas",
  "Tahoma",
  "Verdana",
  "Menlo",
  "Monaco",
  "SF Pro Text",
  "Optima",
  "Futura",
  "Gill Sans",
  "Ubuntu",
  "Cantarell",
  "DejaVu Sans",
  "Liberation Sans",
  "Noto Sans",
  "Roboto",
  "Droid Sans",
  "MS Gothic",
  "SimSun",
  "Malgun Gothic",
];

/** Font probing by text-width delta against three baseline generics. */
function fontsTrait(): string {
  return safe(() => {
    const base = ["monospace", "sans-serif", "serif"];
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    if (!ctx) return "none";

    const probe = "mmmmmmmmmmlli中文";
    const widths = new Map<string, number>();
    for (const b of base) {
      ctx.font = `72px ${b}`;
      widths.set(b, ctx.measureText(probe).width);
    }

    const present: string[] = [];
    for (const font of FONT_PROBES) {
      for (const b of base) {
        ctx.font = `72px '${font}', ${b}`;
        if (ctx.measureText(probe).width !== widths.get(b)) {
          present.push(font);
          break;
        }
      }
    }
    return present.join(",");
  }, "error");
}

/**
 * Media device topology - how many cameras, mics and speakers exist. Labels are
 * gated behind a permission we never ask for, so this reads counts only. A
 * desktop browser reporting zero of everything is unusual for a real machine.
 */
async function mediaDevicesTrait(): Promise<string> {
  try {
    if (!navigator.mediaDevices?.enumerateDevices) return "none";
    const devices = await navigator.mediaDevices.enumerateDevices();
    const count = (kind: string) =>
      devices.filter((d) => d.kind === kind).length;
    return `${count("audioinput")}/${count("audiooutput")}/${count("videoinput")}`;
  } catch {
    return "error";
  }
}

/** Client-side view of the connection; the server view lives in `./network.server`. */
function connectionTrait(): string {
  return safe(() => {
    const c = (
      navigator as unknown as {
        connection?: {
          effectiveType?: string;
          downlink?: number;
          rtt?: number;
          saveData?: boolean;
        };
      }
    ).connection;
    if (!c) return "unknown";
    return [
      c.effectiveType ?? "?",
      c.downlink ?? "?",
      c.rtt ?? "?",
      c.saveData ? "save" : "full",
    ].join("/");
  }, "error");
}

function storageBlocked(): boolean {
  return safe(() => {
    const probe = "__bi_probe__";
    localStorage.setItem(probe, "1");
    localStorage.removeItem(probe);
    return false;
  }, true);
}

/** Collects the full trait vector. Runs once per page load. */
export async function collectTraits(): Promise<DeviceTraits> {
  const gl = webglTrait();
  const [audio, mediaDevices] = await Promise.all([
    audioTrait(),
    mediaDevicesTrait(),
  ]);

  return {
    ua: safe(() => navigator.userAgent, ""),
    platform: safe(
      () =>
        (navigator as unknown as { userAgentData?: { platform?: string } })
          .userAgentData?.platform ?? navigator.platform,
      "",
    ),
    languages: safe(() => (navigator.languages ?? []).join(","), ""),
    timezone: safe(
      () => Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
      "",
    ),
    cores: safe(() => navigator.hardwareConcurrency ?? 0, 0),
    memory: safe(
      () =>
        (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 0,
      0,
    ),
    touchPoints: safe(() => navigator.maxTouchPoints ?? 0, 0),
    colorDepth: safe(() => screen.colorDepth, 0),
    screen: safe(() => `${screen.width}x${screen.height}`, ""),
    canvas: canvasTrait(),
    webgl: gl.renderer,
    webglParams: gl.params,
    audio,
    fonts: fontsTrait(),
    mediaDevices,

    viewport: safe(() => `${window.innerWidth}x${window.innerHeight}`, ""),
    dpr: safe(() => window.devicePixelRatio, 1),
    connection: connectionTrait(),
    reducedMotion: safe(
      () => matchMedia("(prefers-reduced-motion: reduce)").matches,
      false,
    ),
    colorScheme: safe(
      () =>
        matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
      "",
    ),
    storageBlocked: storageBlocked(),
  };
}

// ── Identity ─────────────────────────────────────────────────────────────────

/** FNV-1a, then widened with a second pass so the id has 64 bits of room. */
function hash(input: string): string {
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < input.length; i++) {
    const c = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193) >>> 0;
    h2 = Math.imul(h2 + c, 0x85ebca6b) >>> 0;
  }
  return h1.toString(16).padStart(8, "0") + h2.toString(16).padStart(8, "0");
}

/**
 * The hashed subset. Volatile traits are excluded so the id survives a window
 * resize, a network change and a theme switch.
 *
 * `canvas: "unstable"` collapses every anti-fingerprinting browser onto one
 * shared bucket rather than giving each page load a fresh id. Those visitors
 * are deliberately not identifiable here; see `stability` below.
 */
function identityInput(t: DeviceTraits): string {
  return [
    HASH_VERSION,
    t.ua,
    t.platform,
    t.languages,
    t.timezone,
    t.cores,
    t.memory,
    t.touchPoints,
    t.colorDepth,
    t.screen,
    t.canvas,
    t.webgl,
    t.webglParams,
    t.audio,
    t.fonts,
    t.mediaDevices,
  ].join("~");
}

export type IdSource = "stored" | "computed";
export type Stability = "high" | "low";

export interface VisitorIdentity {
  /** 64-bit hex id. Survives a cookie clear when `source` is "computed". */
  id: string;
  source: IdSource;
  /**
   * "low" when the browser randomises fingerprinting surfaces. The id will not
   * survive the session and must not be read as a returning visitor - every
   * Brave and Firefox-RFP visitor lands in the same bucket by construction.
   */
  stability: Stability;
  traits: DeviceTraits;
}

let cached: VisitorIdentity | undefined;

/**
 * Resolve the visitor identity.
 *
 * Storage first because it is exact. When storage is unavailable the computed
 * hash stands in, which is the whole point of the fallback: a cleared cookie
 * jar does not reset the id.
 */
export async function resolveIdentity(): Promise<VisitorIdentity | undefined> {
  if (typeof window === "undefined") return undefined;
  if (cached) return cached;

  const traits = await collectTraits();
  const computed = hash(identityInput(traits));
  const stability: Stability =
    traits.canvas === "unstable" || traits.webgl === "masked" ? "low" : "high";

  if (!traits.storageBlocked) {
    const existing = safe(() => localStorage.getItem(STORAGE_KEY), null);
    if (existing) {
      cached = { id: existing, source: "stored", stability, traits };
      return cached;
    }
    safe(() => localStorage.setItem(STORAGE_KEY, computed), undefined);
  }

  cached = { id: computed, source: "computed", stability, traits };
  return cached;
}
