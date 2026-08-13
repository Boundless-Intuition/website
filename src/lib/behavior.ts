// ── Behavioural capture ──────────────────────────────────────────────────────
// Micro-behaviour: pointer path, scroll dynamics, keystroke cadence, click
// targets and the session timeline.
//
// What this records and what it deliberately does not:
//   - Keystrokes are recorded as TIMING ONLY - dwell (down to up), flight (up
//     to next down) and a coarse key class. The character itself is never read.
//     Cadence is the timing distribution; the content is not part of it, and
//     the only text input on this site is the waitlist email field.
//   - Pointer positions are sampled on a fixed interval rather than per event,
//     so this is a movement trace, not a pixel-perfect replay.
//
// Buffers are capped. `navigator.sendBeacon` refuses payloads over ~64KB and
// silently returns false, which would lose the whole digest - the caps below
// keep a long session comfortably under that.
//
// Disclosed in `/legal` §04. Keep that section in step with what this collects.

const SAMPLE_MS = 100;

const CAP = {
  pointer: 600, // 60s of movement at the sample rate
  scroll: 300,
  keys: 400,
  clicks: 120,
  timeline: 100,
} as const;

// ── Buffers ──────────────────────────────────────────────────────────────────

/** [x, y, t] - t is ms since capture start. Tuples, not objects: ~4x smaller. */
type PointerSample = [number, number, number];

/** [velocity px/s, acceleration px/s², t] */
type ScrollSample = [number, number, number];

/** [dwellMs, flightMs, class] - class is one of KEY_CLASS below. */
type KeySample = [number, number, number];

interface ClickSample {
  x: number;
  y: number;
  t: number;
  target: string;
  /** False when the click was dispatched by script rather than by a device. */
  trusted: boolean;
  /** True when the element has no native affordance - the heatmap signal. */
  inert: boolean;
}

interface TimelineEntry {
  t: number;
  kind: "route" | "visible" | "hidden" | "focus" | "blur";
  detail: string;
}

const KEY_CLASS = {
  printable: 0,
  backspace: 1,
  navigation: 2,
  modifier: 3,
  other: 4,
} as const;

interface BehaviorState {
  startedAt: number;
  pointer: PointerSample[];
  scroll: ScrollSample[];
  keys: KeySample[];
  clicks: ClickSample[];
  timeline: TimelineEntry[];
  /** Fraction of pointer events carrying sub-pixel coordinates. */
  subPixelHits: number;
  pointerEvents: number;
  /** Pointer events whose isTrusted was false - synthetic input. */
  untrustedEvents: number;
  maxScrollDepth: number;
  activeMs: number;
}

let state: BehaviorState | undefined;
let started = false;

function now(): number {
  return state ? Math.round(performance.now() - state.startedAt) : 0;
}

function push<T>(buffer: T[], value: T, cap: number) {
  if (buffer.length >= cap) return;
  buffer.push(value);
}

// ── Element description ──────────────────────────────────────────────────────

const INTERACTIVE = new Set([
  "A",
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "SUMMARY",
  "LABEL",
]);

/**
 * A short, stable description of what was clicked. Tag plus id plus the first
 * class, which is enough to aggregate a heatmap without serialising a DOM path
 * that would balloon the payload.
 */
function describeTarget(el: Element): string {
  const tag = el.tagName.toLowerCase();
  const id = el.id ? `#${el.id}` : "";
  const cls = el.classList.length > 0 ? `.${el.classList[0]}` : "";
  return `${tag}${id}${cls}`.slice(0, 80);
}

/** True when nothing about the element invites a click - the useful heatmap case. */
function isInert(el: Element): boolean {
  if (INTERACTIVE.has(el.tagName)) return false;
  if (el.closest("a,button,input,select,textarea,[role='button'],[onclick]"))
    return false;
  return true;
}

function classifyKey(key: string): number {
  if (key === "Backspace" || key === "Delete") return KEY_CLASS.backspace;
  if (
    key.startsWith("Arrow") ||
    key === "Home" ||
    key === "End" ||
    key === "Tab"
  )
    return KEY_CLASS.navigation;
  if (key === "Shift" || key === "Control" || key === "Alt" || key === "Meta")
    return KEY_CLASS.modifier;
  // Single-character keys are the printable ones. We branch on LENGTH, never on
  // the character - the value itself is not read or stored.
  if (key.length === 1) return KEY_CLASS.printable;
  return KEY_CLASS.other;
}

// ── Capture ──────────────────────────────────────────────────────────────────

/**
 * Start capturing. Idempotent, and safe to call before hydration finishes.
 * Every listener is passive where it can be, so none of this can delay scroll
 * or input handling.
 */
export function startBehaviorCapture(): () => void {
  if (typeof window === "undefined" || started) return () => {};
  started = true;

  state = {
    startedAt: performance.now(),
    pointer: [],
    scroll: [],
    keys: [],
    clicks: [],
    timeline: [],
    subPixelHits: 0,
    pointerEvents: 0,
    untrustedEvents: 0,
    maxScrollDepth: 0,
    activeMs: 0,
  };
  const s = state;

  // ── Pointer ──
  // Latest position is held here and sampled on the interval, rather than
  // pushing per event: a trackpad fires pointermove at up to 1000Hz.
  let lastX = 0;
  let lastY = 0;
  let moved = false;

  const onPointerMove = (e: PointerEvent) => {
    lastX = e.clientX;
    lastY = e.clientY;
    moved = true;
    s.pointerEvents += 1;
    if (!e.isTrusted) s.untrustedEvents += 1;
    // Real pointing devices produce fractional coordinates on scaled displays
    // and with smooth trackpad deltas. CDP's Input.dispatchMouseEvent produces
    // whole integers, so this ratio separates driven browsers from people.
    if (!Number.isInteger(e.clientX) || !Number.isInteger(e.clientY))
      s.subPixelHits += 1;
  };

  const sampler = window.setInterval(() => {
    if (!moved) return;
    moved = false;
    push(s.pointer, [Math.round(lastX), Math.round(lastY), now()], CAP.pointer);
  }, SAMPLE_MS);

  // ── Scroll ──
  let lastScrollY = window.scrollY;
  let lastScrollT = performance.now();
  let lastVelocity = 0;

  const onScroll = () => {
    const t = performance.now();
    const dt = (t - lastScrollT) / 1000;
    if (dt < 0.016) return; // one frame; below this the velocity is noise

    const dy = window.scrollY - lastScrollY;
    const velocity = dy / dt;
    const acceleration = (velocity - lastVelocity) / dt;

    push(
      s.scroll,
      [Math.round(velocity), Math.round(acceleration), now()],
      CAP.scroll,
    );

    const docHeight = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    const depth = Math.min(100, Math.round((window.scrollY / docHeight) * 100));
    if (depth > s.maxScrollDepth) s.maxScrollDepth = depth;

    lastScrollY = window.scrollY;
    lastScrollT = t;
    lastVelocity = velocity;
  };

  // ── Keystroke dynamics ──
  // `down` holds the press time per physical key so dwell can be closed out on
  // keyup. Keyed by `e.code` (the physical key) rather than `e.key`, so the
  // character never has to be retained even transiently.
  const down = new Map<string, number>();
  let lastUpAt = 0;

  const onKeyDown = (e: KeyboardEvent) => {
    if (!down.has(e.code)) down.set(e.code, performance.now());
  };

  const onKeyUp = (e: KeyboardEvent) => {
    const pressedAt = down.get(e.code);
    if (pressedAt === undefined) return;
    down.delete(e.code);

    const t = performance.now();
    const dwell = Math.round(t - pressedAt);
    const flight = lastUpAt === 0 ? 0 : Math.round(pressedAt - lastUpAt);
    lastUpAt = t;

    push(s.keys, [dwell, flight, classifyKey(e.key)], CAP.keys);
  };

  // ── Clicks ──
  const onClick = (e: MouseEvent) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    push(
      s.clicks,
      {
        x: Math.round(e.clientX),
        y: Math.round(e.clientY),
        t: now(),
        target: describeTarget(target),
        trusted: e.isTrusted,
        inert: isInert(target),
      },
      CAP.clicks,
    );
  };

  // ── Timeline ──
  const mark = (kind: TimelineEntry["kind"], detail = "") =>
    push(s.timeline, { t: now(), kind, detail }, CAP.timeline);

  const onVisibility = () =>
    mark(document.visibilityState === "hidden" ? "hidden" : "visible");
  const onFocus = () => mark("focus");
  const onBlur = () => mark("blur");

  mark("route", window.location.pathname);

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", onKeyDown, { passive: true });
  window.addEventListener("keyup", onKeyUp, { passive: true });
  window.addEventListener("click", onClick, { passive: true, capture: true });
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("focus", onFocus);
  window.addEventListener("blur", onBlur);

  return () => {
    window.clearInterval(sampler);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("click", onClick, { capture: true });
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("focus", onFocus);
    window.removeEventListener("blur", onBlur);
    started = false;
  };
}

/** Records a client-side route change into the session timeline. */
export function markRoute(path: string) {
  if (!state) return;
  push(state.timeline, { t: now(), kind: "route", detail: path }, CAP.timeline);
}

// ── Derived metrics ──────────────────────────────────────────────────────────

function mean(xs: number[]): number {
  return xs.length === 0 ? 0 : xs.reduce((a, b) => a + b, 0) / xs.length;
}

function stdev(xs: number[]): number {
  if (xs.length < 2) return 0;
  const m = mean(xs);
  return Math.sqrt(mean(xs.map((x) => (x - m) ** 2)));
}

/**
 * Straightness: total path length over start-to-end distance. A person's
 * pointer wanders, giving a ratio well above 1. A programmatic move from A to B
 * lands very close to 1, which is one of the stronger automation tells here.
 */
function straightness(path: PointerSample[]): number {
  if (path.length < 3) return 0;
  let travelled = 0;
  for (let i = 1; i < path.length; i++) {
    travelled += Math.hypot(
      path[i][0] - path[i - 1][0],
      path[i][1] - path[i - 1][1],
    );
  }
  const direct = Math.hypot(
    path[path.length - 1][0] - path[0][0],
    path[path.length - 1][1] - path[0][1],
  );
  return direct < 1 ? 0 : Number((travelled / direct).toFixed(2));
}

export interface BehaviorSummary {
  durationMs: number;
  pointerSamples: number;
  pointerStraightness: number;
  /** 0-1. Near zero on a desktop pointer is a synthetic-input signal. */
  subPixelRatio: number;
  untrustedEvents: number;
  scrollSamples: number;
  maxScrollDepth: number;
  scrollVelocityMean: number;
  scrollVelocityStdev: number;
  keyCount: number;
  dwellMean: number;
  dwellStdev: number;
  flightMean: number;
  flightStdev: number;
  clickCount: number;
  inertClicks: number;
  untrustedClicks: number;
  routes: number;
}

/** The aggregate view - what the digest carries when the raw trace is not needed. */
export function summarize(): BehaviorSummary | undefined {
  if (!state) return undefined;
  const s = state;

  const dwell = s.keys.map((k) => k[0]);
  const flight = s.keys.filter((k) => k[1] > 0).map((k) => k[1]);
  const velocities = s.scroll.map((v) => Math.abs(v[0]));

  const round = (n: number) => Number(n.toFixed(2));

  return {
    durationMs: now(),
    pointerSamples: s.pointer.length,
    pointerStraightness: straightness(s.pointer),
    subPixelRatio:
      s.pointerEvents === 0 ? 0 : round(s.subPixelHits / s.pointerEvents),
    untrustedEvents: s.untrustedEvents,
    scrollSamples: s.scroll.length,
    maxScrollDepth: s.maxScrollDepth,
    scrollVelocityMean: round(mean(velocities)),
    scrollVelocityStdev: round(stdev(velocities)),
    keyCount: s.keys.length,
    dwellMean: round(mean(dwell)),
    dwellStdev: round(stdev(dwell)),
    flightMean: round(mean(flight)),
    flightStdev: round(stdev(flight)),
    clickCount: s.clicks.length,
    inertClicks: s.clicks.filter((c) => c.inert).length,
    untrustedClicks: s.clicks.filter((c) => !c.trusted).length,
    routes: s.timeline.filter((e) => e.kind === "route").length,
  };
}

export interface BehaviorTrace {
  pointer: PointerSample[];
  scroll: ScrollSample[];
  keys: KeySample[];
  clicks: ClickSample[];
  timeline: TimelineEntry[];
}

/** The raw buffers, for the heatmap and replay-style analysis. */
export function trace(): BehaviorTrace | undefined {
  if (!state) return undefined;
  return {
    pointer: state.pointer,
    scroll: state.scroll,
    keys: state.keys,
    clicks: state.clicks,
    timeline: state.timeline,
  };
}
