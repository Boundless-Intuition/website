/**
 * Shared types + palette for the live domain visuals.
 *
 * Every domain panel is a real-time <canvas> animation ("engine"). Engines are
 * pure state machines: created once, resized on demand, and asked to draw one
 * frame at a time. The useDomainCanvas hook owns the DOM/timing concerns
 * (DPR, resize, visibility, reduced-motion, pointer) so engines stay portable.
 */

/** An OKLCH triple [L, C, H]. Kept in sync with src/styles.css. */
export type Oklch = readonly [number, number, number];

export type Palette = {
  isDark: boolean;
  /** page background behind the panel */
  bg: Oklch;
  /** primary ink (foreground) */
  ink: Oklch;
  /** dimmed ink (muted-foreground) */
  dim: Oklch;
  /** the signature verification blue accent */
  accent: Oklch;
};

const LIGHT: Palette = {
  isDark: false,
  bg: [0.965, 0.008, 90],
  ink: [0.2, 0.03, 250],
  dim: [0.36, 0.025, 250],
  accent: [0.46, 0.11, 220],
};

const DARK: Palette = {
  isDark: true,
  bg: [0.19, 0.015, 250],
  ink: [0.94, 0.012, 90],
  dim: [0.72, 0.02, 90],
  accent: [0.78, 0.09, 220],
};

export function readPalette(): Palette {
  if (typeof document === "undefined") return LIGHT;
  return document.documentElement.classList.contains("dark") ? DARK : LIGHT;
}

/** Build an `oklch(L C H / a)` string, clamping alpha. */
export function oklcha([l, c, h]: Oklch, a = 1): string {
  const alpha = a < 0 ? 0 : a > 1 ? 1 : a;
  return `oklch(${l} ${c} ${h} / ${alpha})`;
}

/** Mix two OKLCH colors by t in [0,1] (naive per-channel; fine for accents). */
export function mix(a: Oklch, b: Oklch, t: number): Oklch {
  const k = t < 0 ? 0 : t > 1 ? 1 : t;
  return [
    a[0] + (b[0] - a[0]) * k,
    a[1] + (b[1] - a[1]) * k,
    a[2] + (b[2] - a[2]) * k,
  ];
}

export type Pointer = {
  /** normalized 0..1 within the canvas; (0.5,0.5) when idle */
  x: number;
  y: number;
  /** true while the cursor is actually over the panel */
  active: boolean;
};

export type FrameEnv = {
  /** CSS pixels (already accounts for DPR on the context transform) */
  w: number;
  h: number;
  /** seconds since the engine started, monotonic */
  t: number;
  /** seconds since last frame, clamped */
  dt: number;
  pointer: Pointer;
  palette: Palette;
  /** true when the card is hovered (drives intensity ramps) */
  hover: boolean;
  /** true on the single frame drawn under prefers-reduced-motion */
  still: boolean;
};

export type Engine = {
  resize(w: number, h: number): void;
  frame(ctx: CanvasRenderingContext2D, env: FrameEnv): void;
};

export type EngineFactory = () => Engine;

/**
 * A per-domain vibrant color pair. Light-mode values run darker + more
 * saturated so they read on the pale vellum background; dark-mode values run
 * bright. Engines resolve the right one with `tone()`.
 */
export type Tint = { light: Oklch; dark: Oklch };

export function tone(p: Palette, t: Tint): Oklch {
  return p.isDark ? t.dark : t.light;
}

/** mulberry32 — tiny deterministic PRNG for stable, non-jittery layouts. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Smooth 0..1 ramp. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Cheap, deterministic value-noise-ish scalar field built from layered sines.
 * Not true Perlin, but smooth, seamless enough, and allocation-free — ideal
 * for driving ASCII intensity and flow directions across many canvases.
 */
export function field(x: number, y: number, t: number): number {
  const a =
    Math.sin(x * 1.7 + t * 0.7) * Math.cos(y * 1.3 - t * 0.5) +
    Math.sin((x + y) * 0.9 - t * 0.9) +
    Math.sin(x * 0.4 - y * 1.1 + t * 0.35) * 0.8;
  return a / 2.8; // roughly -1..1
}
