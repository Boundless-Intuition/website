/**
 * proverField — the live backdrop inside the VerifyWidget's prover console.
 *
 * Unlike the other engines this one is state-reactive: the widget hands it a
 * getter for the current run status and the field responds. Idle, it breathes
 * as a dim glyph haze. While a check runs, a scan beam sweeps the console and
 * the field surges. On a verdict the whole field re-tints — green with ✓s
 * raining through the bright cells when the property is proved, warn-orange
 * with ✗s when a counterexample is found — and ripple rings mark the moment.
 *
 * The console is always ink-dark, so callers pass Tints with identical
 * light/dark values. Alphas stay low: the log text sits directly on top.
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

const TAU = Math.PI * 2;
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

export type ProverStatus = {
  mode: "idle" | "running" | "done";
  proven: boolean;
};

export function proverField(
  opts: { tint: Tint; ok: Tint; bad: Tint; cell?: number },
  status: () => ProverStatus,
): EngineFactory {
  const RAMP = " ·:∴+⊢";
  const cell = opts.cell ?? 17;
  return (): Engine => {
    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;
    let cw = cell;
    let chh = cell;
    let energy = 0.3; // eased field intensity
    let vm = 0; // eased verdict mix (0 = neutral, 1 = tinted by verdict)
    let bt = 0; // beam sweep progress
    let doneAge = 9; // seconds since the verdict landed
    let prevMode: ProverStatus["mode"] = "idle";

    return {
      resize(w, h) {
        W = w;
        H = h;
        cols = Math.max(1, Math.floor(w / cell));
        rows = Math.max(1, Math.floor(h / cell));
        cw = w / cols;
        chh = h / rows;
      },
      frame(ctx, env) {
        const { t, dt, palette, pointer, still } = env;
        const s = status();
        if (s.mode !== prevMode) {
          if (s.mode === "done") doneAge = 0;
          prevMode = s.mode;
        }
        const target =
          s.mode === "running" ? 0.8 : s.mode === "done" ? 0.55 : 0.3;
        energy += (target - energy) * clamp(dt * 3, 0, 1);
        vm += ((s.mode === "done" ? 1 : 0) - vm) * clamp(dt * 2.5, 0, 1);
        if (!still) {
          if (s.mode === "running") bt = (bt + dt / 1.15) % 1;
          if (s.mode === "done") doneAge += dt;
        }

        const base = tone(palette, opts.tint);
        const vcol = tone(palette, s.proven ? opts.ok : opts.bad);
        const beamX = bt * (W + 80) - 40;
        const px = pointer.x * W;
        const py = pointer.y * H;

        ctx.font = `${(Math.min(cw, chh) * 0.8).toFixed(1)}px "JetBrains Mono", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (let rw = 0; rw < rows; rw++) {
          for (let c = 0; c < cols; c++) {
            const x = (c + 0.5) * cw;
            const y = (rw + 0.5) * chh;
            const n = field(c * 0.33, rw * 0.5, t * 0.5) * 0.5 + 0.5;
            const beam =
              s.mode === "running"
                ? smoothstep(55, 0, Math.abs(x - beamX)) * 0.75
                : 0;
            const near = pointer.active
              ? smoothstep(90, 0, Math.hypot(x - px, y - py)) * 0.45
              : 0;
            const i = clamp(n * energy + beam * 0.55 + near, 0, 1);
            const col = mix(base, vcol, vm);
            // verdict rain — the brightest cells certify (or refute) themselves
            if (vm > 0.5 && i > 0.74) {
              ctx.fillStyle = oklcha(vcol, 0.1 + i * 0.3);
              ctx.fillText(s.proven ? "✓" : "✗", x, y);
              continue;
            }
            const g = RAMP[Math.floor(i * (RAMP.length - 1))];
            if (g === " ") continue;
            ctx.fillStyle = oklcha(col, 0.04 + i * 0.2);
            ctx.fillText(g, x, y);
          }
        }

        // the scan beam
        if (s.mode === "running") {
          ctx.save();
          ctx.shadowBlur = 9;
          ctx.shadowColor = oklcha(base, 0.7);
          ctx.strokeStyle = oklcha(base, 0.38);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(beamX, 0);
          ctx.lineTo(beamX, H);
          ctx.stroke();
          ctx.restore();
        }

        // verdict ripples — two rings racing out from the console heart
        if (doneAge < 1.4) {
          const cx = W * 0.5;
          const cy = H * 0.45;
          const maxR = Math.hypot(W, H) * 0.5;
          ctx.lineWidth = 1;
          for (let k = 0; k < 2; k++) {
            const p = clamp(doneAge / 1.4 - k * 0.12, 0, 1);
            if (p <= 0) continue;
            ctx.strokeStyle = oklcha(vcol, (1 - p) * 0.5);
            ctx.beginPath();
            ctx.arc(cx, cy, p * maxR, 0, TAU);
            ctx.stroke();
          }
        }
      },
    };
  };
}
