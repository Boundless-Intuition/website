/**
 * Blog engines — the hero backdrop for the blog index. A flowing scalar
 * field rendered as coarse pixel blocks through an ordered Bayer dither:
 * retro-compute waves that breathe and drift. Mouse-reactive (the cursor is
 * a gravity well that bends and brightens the field around itself) and
 * allocation-light per frame — colors are quantized to a small ramp so
 * fillStyle strings are built once per frame, not once per cell.
 */
import {
  type Engine,
  type EngineFactory,
  type Tint,
  field,
  mix,
  oklcha,
  smoothstep,
  tone,
} from "./engine";

// 8×8 ordered-dither threshold matrix, normalized to 0..1.
const BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
].map((row) => row.map((v) => (v + 0.5) / 64));

export function ditherField(opts: {
  tint: Tint;
  /** color of the wave crests */
  hot: Tint;
  /** CSS px per pixel block */
  cell?: number;
  speed?: number;
}): EngineFactory {
  const cell = opts.cell ?? 11;
  const speed = opts.speed ?? 1;
  const LEVELS = 8;
  return (): Engine => {
    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;
    return {
      resize(w, h) {
        W = w;
        H = h;
        cols = Math.ceil(w / cell);
        rows = Math.ceil(h / cell);
      },
      frame(ctx, env) {
        const { t, palette, pointer, hover, still } = env;
        const base = tone(palette, opts.tint);
        const hot = tone(palette, opts.hot);

        // quantized shade ramp, low swell → bright crest
        const low = mix(palette.dim, base, 0.55);
        const ramp: string[] = [];
        for (let i = 0; i < LEVELS; i++) {
          const k = i / (LEVELS - 1);
          ramp.push(
            oklcha(mix(low, hot, k * k), 0.2 + k * 0.62 + (hover ? 0.06 : 0)),
          );
        }

        const px = pointer.x * W;
        const py = pointer.y * H;
        const tt = still ? 0 : t * speed;

        for (let ry = 0; ry < rows; ry++) {
          const y = ry * cell;
          const fy0 = ry * 0.21 - tt * 0.04;
          const thRow = BAYER[ry & 7];
          for (let cx = 0; cx < cols; cx++) {
            const x = cx * cell;
            let fx = cx * 0.13 + tt * 0.11;
            let fy = fy0;

            // the cursor is a gravity well: the waves bend around it and
            // the field brightens toward it
            let g = 0;
            if (pointer.active) {
              const dx = x + cell / 2 - px;
              const dy = y + cell / 2 - py;
              const d = Math.hypot(dx, dy) + 1e-4;
              g = smoothstep(190, 10, d);
              fx += (dx / d) * g * 1.35;
              fy += (dy / d) * g * 1.35;
            }

            // two octaves of the shared field, breathing slowly
            let v =
              0.5 +
              0.5 * field(fx, fy, tt * 0.5) +
              0.24 * field(fx * 2.3 + 5, fy * 2.1 - 3, tt * 0.85);
            v = v * 0.78 + g * 0.5;

            if (v <= thRow[cx & 7]) continue;
            const li = Math.min(LEVELS - 1, Math.max(0, (v * LEVELS) | 0));
            ctx.fillStyle = ramp[li];
            ctx.fillRect(x, y, cell - 1, cell - 1);
          }
        }
      },
    };
  };
}
