/**
 * Blog engines — the masthead field for the blog index, drawn in the house
 * visual system (see docs/visual-system.md): a coarse 1-bit halftone of
 * hard-edged squares over a soft ultramarine field.
 *
 * The behaviour is *plume*. A dense stream of grains leaves a source just off
 * the lower-right corner and travels up and to the left, widening and thinning
 * as it goes, breaking out of its lattice into separate grains until nothing
 * is left but a scatter over the headline. Emission, time, dispersal — and it
 * empties toward the upper left on its own, which is the house rule and also
 * exactly where the copy sits.
 *
 * The motion is filaments scrolling *downstream* through the stream rather
 * than grains flying about: the halftone stays snapped to its lattice near the
 * source, so it reads as flow rather than as sparks.
 *
 * Other rules kept: hard-edged squares (no anti-aliasing, no glow, no bloom),
 * four colours only, scattered grains spiking to warm ochre-gold on their own
 * timer like mica in sand, and a single short prism smear lying along one
 * segment of the stream and nowhere else.
 *
 * The cursor is the lantern: grains near it warm toward gold and thicken.
 *
 * Allocation-light per frame — colours are quantized into a small ramp so
 * fillStyle strings are built once per frame rather than once per grain, and
 * cells outside the stream bail out before touching the noise field.
 */
import {
  type Engine,
  type EngineFactory,
  type Oklch,
  type Tint,
  field,
  mix,
  oklcha,
  smoothstep,
  tone,
} from "./engine";

/** brightness steps within one warmth tier */
const LEVELS = 5;
/** cold grain → ochre-gold, in four steps so warming reads as a fade */
const WARMTHS = 4;

/** unit vector the stream travels along: up and to the left, mostly lateral */
const DIR_X = -0.945;
const DIR_Y = -0.327;
/** its perpendicular, for measuring across the stream */
const PERP_X = 0.327;
const PERP_Y = -0.945;

/**
 * Prism dispersion, gold → rose → violet → blue, written as a monotonically
 * falling sequence (negative angles are legal in CSS) so interpolating between
 * stops never sweeps through green. The palette has no green in it anywhere.
 */
const PRISM_HUES = [82, 52, 24, 2, -22, -46, -68, -88];
/** length of the one smear, as a fraction of the stream's reach */
const PRISM_HALF = 0.05;
const PRISM_SPAN = 11;

/**
 * One cheap stable hash per cell. The caller bit-slices the result for
 * presence, jitter and glint phase so the inner loop only hashes once:
 * bits 0-10 presence, 11-20 glint phase, 21-26 jitter x, 27-31 jitter y.
 */
function hash2(x: number, y: number): number {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return (h ^ (h >>> 16)) >>> 0;
}

export function halftonePlume(opts: {
  /** the grains — ivory on ink, ultramarine on vellum */
  grain: Tint;
  /** what a glinting grain warms to */
  glint: Tint;
  /** the soft field the stream sits on */
  wash: Tint;
  /** lattice pitch in CSS px; widened on small screens */
  cell?: number;
  /** side of the hard-edged square, in CSS px */
  dot?: number;
  speed?: number;
  /**
   * One knob over the whole plate's presence: scales every grain, the glint,
   * the prism and the field together. Turn this down first.
   */
  intensity?: number;
  /** fill of the stream at its source, 0..1 */
  density?: number;
  /** where the stream leaves from, in fractions of the canvas */
  source?: { x: number; y: number };
  /** how far it reaches before it is spent, as a multiple of the width */
  reach?: number;
  /** how far it bows sideways on the way, as a fraction of the width */
  curve?: number;
  /** half-width of the stream at its source, as a fraction of the width */
  spread?: number;
  /** how much wider it gets by the end of its reach, same units */
  flare?: number;
  /** peak alpha of the field, at the source, per theme */
  washAlpha?: { light: number; dark: number };
}): EngineFactory {
  const cellBase = opts.cell ?? 9;
  const dotBase = opts.dot ?? 3;
  const speed = opts.speed ?? 1;
  const intensity = opts.intensity ?? 1;
  const density = opts.density ?? 0.72;
  const source = opts.source ?? { x: 0.9, y: 1.06 };
  const reach = opts.reach ?? 1.15;
  const curve = opts.curve ?? 0.06;
  const spread = opts.spread ?? 0.09;
  const flare = opts.flare ?? 0.34;
  const washAlpha = opts.washAlpha ?? { light: 0.06, dark: 0.26 };

  return (): Engine => {
    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;
    let cell = cellBase;
    let dot = dotBase;

    // ramp[warmth][level], rebuilt once per frame
    const ink: string[][] = Array.from({ length: WARMTHS }, () =>
      new Array<string>(LEVELS).fill(""),
    );
    const prism = new Array<string>(PRISM_SPAN).fill("");

    return {
      resize(w, h) {
        W = w;
        H = h;
        // phones carry this at DPR 1.5 alongside the rest of the page; a
        // wider pitch keeps the grain count roughly flat across breakpoints
        cell = w < 640 ? cellBase + 3 : cellBase;
        dot = w < 640 ? dotBase + 1 : dotBase;
        // one extra row/col so scattered grains still cover the far edges
        cols = Math.ceil(w / cell) + 1;
        rows = Math.ceil(h / cell) + 1;
      },

      frame(ctx, env) {
        const { t, palette, pointer, still } = env;
        const tt = still ? 0 : t * speed;

        const sx = W * source.x;
        const sy = H * source.y;
        const reachPx = W * reach;
        const curvePx = W * curve;

        // --- the field, laid along the stream ---------------------------
        // Strongest at the source and gone well before the headline, so the
        // copy sits on plain page background.
        const washTone = tone(palette, opts.wash);
        const wa =
          (palette.isDark ? washAlpha.dark : washAlpha.light) * intensity;
        const g = ctx.createLinearGradient(
          sx,
          sy,
          sx + DIR_X * reachPx,
          sy + DIR_Y * reachPx,
        );
        g.addColorStop(0, oklcha(washTone, wa));
        g.addColorStop(0.45, oklcha(washTone, wa * 0.6));
        g.addColorStop(1, oklcha(washTone, 0));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);

        // --- quantized colour ramps -------------------------------------
        const grainTone = tone(palette, opts.grain);
        const glintTone = tone(palette, opts.glint);
        for (let w = 0; w < WARMTHS; w++) {
          const c = mix(grainTone, glintTone, w / (WARMTHS - 1));
          for (let l = 0; l < LEVELS; l++) {
            // deliberately faint: the stream is texture behind a headline,
            // not a light source. The bottom step is near-invisible so grains
            // crossing the presence threshold fade in instead of popping.
            const a = (0.05 + (l / (LEVELS - 1)) * 0.27) * intensity;
            ink[w][l] = oklcha(c, a);
          }
        }

        const prismL = palette.isDark ? 0.78 : 0.5;
        for (let i = 0; i < PRISM_SPAN; i++) {
          const f = (i / (PRISM_SPAN - 1)) * (PRISM_HUES.length - 1);
          const i0 = Math.floor(f);
          const i1 = Math.min(PRISM_HUES.length - 1, i0 + 1);
          const hue =
            PRISM_HUES[i0] + (PRISM_HUES[i1] - PRISM_HUES[i0]) * (f - i0);
          prism[i] = oklcha([prismL, 0.13, hue] as Oklch, 0.34 * intensity);
        }

        // The smear fires once, part way along the stream, and drifts.
        const prismAt = 0.44 + Math.sin(tt * 0.07) * 0.035;

        // the whole tail swings slowly, so the stream never sits still even
        // where the grains themselves are locked to the lattice
        const sway = Math.sin(tt * 0.13) * curvePx * 0.6;

        // --- grains -------------------------------------------------------
        const px = pointer.x * W;
        const py = pointer.y * H;

        for (let ry = 0; ry < rows; ry++) {
          const y0 = ry * cell;
          const dy = y0 - sy;

          for (let cx = 0; cx < cols; cx++) {
            const x0 = cx * cell;
            const dx = x0 - sx;

            // plume coordinates: s downstream from the source, n across it
            const s = dx * DIR_X + dy * DIR_Y;
            if (s < 0) continue;
            const u = s / reachPx;
            if (u > 1) continue;

            // the stream bows sideways as it travels, widens, and sways
            const n = dx * PERP_X + dy * PERP_Y - curvePx * u * u - sway * u;
            const lat = Math.abs(n) / (W * (spread + flare * u));
            if (lat > 1.15) continue;

            // dense at the source, spent by the time it crosses the page
            let d =
              density *
              (1 - smoothstep(0.05, 1, u)) *
              (1 - smoothstep(0.25, 1.05, lat));
            if (d <= 0.004) continue;

            // filaments scrolling downstream, plus slower gusts riding along
            // with them — the source feeds the stream in puffs, not evenly
            const turb = field(s * 0.011 - tt * 1.15, n * 0.022, tt * 0.18);
            const gust = Math.sin(u * 6.5 - tt * 0.85);
            d *= (0.34 + 1.22 * (0.5 + 0.5 * turb)) * (0.8 + 0.3 * gust);

            // the cursor is the lantern — it warms and thickens the stream
            let lamp = 0;
            if (pointer.active) {
              lamp = smoothstep(180, 24, Math.hypot(x0 - px, y0 - py));
              d += lamp * 0.28;
            }

            const h = hash2(cx, ry);
            const presence = (h & 2047) / 2048;

            // Downstream of the source each grain runs a short leg along the
            // flow and fades in and out across it, so the loop never shows
            // and the stream reads as travelling rather than shimmering in
            // place. Near the source grains stay locked to the lattice.
            const loose = smoothstep(0.06, 0.82, u);
            let seg = 0;
            if (loose > 0.02) {
              const ph = (hash2(ry, cx) & 1023) / 1024 + tt * 0.34;
              seg = ph - Math.floor(ph);
              d *= 0.32 + 0.68 * Math.sin(seg * Math.PI);
            }

            if (d <= presence) continue;

            // a gentle ramp, so most grains sit mid-scale and drift through
            // the levels rather than snapping between on and off
            let level = ((d - presence) * 2.6 * LEVELS) | 0;
            if (level > LEVELS - 1) level = LEVELS - 1;

            // ~3% of grains are catching the light at any instant — mica in
            // sand. A smooth spike rather than a hard pop.
            const phase = ((h >>> 11) & 1023) / 1024 + tt * 0.055;
            const gf = phase - Math.floor(phase);
            const glint =
              gf > 0.97 ? Math.sin(((gf - 0.97) / 0.03) * Math.PI) : 0;

            const warm = glint > lamp ? glint : lamp;
            let warmth = (warm * WARMTHS) | 0;
            if (warmth > WARMTHS - 1) warmth = WARMTHS - 1;
            if (glint > 0.5 && level < LEVELS - 1) level += 1;

            // scattered off the lattice and carried downstream along its leg.
            // Rounded so edges stay hard whatever the offset.
            let x = x0;
            let y = y0;
            if (loose > 0.02) {
              const jx = ((h >>> 21) & 63) / 64 - 0.5;
              const jy = ((h >>> 27) & 31) / 32 - 0.5;
              const amp = loose * cell * 1.15;
              const run = seg * cell * 3.4 * loose;
              x = Math.round(x0 + jx * amp + DIR_X * run);
              y = Math.round(y0 + jy * amp + DIR_Y * run);
            }

            const pd = u - prismAt;
            if (
              pd > -PRISM_HALF &&
              pd < PRISM_HALF &&
              Math.abs(n) < cell * 1.6
            ) {
              let pi =
                (((pd + PRISM_HALF) / (PRISM_HALF * 2)) * PRISM_SPAN) | 0;
              if (pi > PRISM_SPAN - 1) pi = PRISM_SPAN - 1;
              ctx.fillStyle = prism[pi];
            } else {
              ctx.fillStyle = ink[warmth][level];
            }
            ctx.fillRect(x, y, dot, dot);
          }
        }
      },
    };
  };
}
