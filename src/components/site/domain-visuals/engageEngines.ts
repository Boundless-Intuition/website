/**
 * Engage-page engines — the client journey dramatized in the same live-ASCII
 * canvas language as the Method and Domain panels. Rules stream in and stack
 * into a corpus (01), commits cross a standing prover beam (03), and a signed
 * certificate types itself out and gets sealed (04). Step 02 reuses the
 * ruleLattice compiler from the Method section with its own tints.
 *
 * These render as full-card backgrounds, so the brightest action concentrates
 * in the upper half where the copy scrim is thinnest. All are mouse-reactive
 * and allocation-free per frame.
 */
import {
  type Engine,
  type EngineFactory,
  type Tint,
  field,
  mix,
  oklcha,
  rng,
  smoothstep,
  tone,
} from "./engine";

const TAU = Math.PI * 2;
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

/** Run `fn` with a glow set on the context, then restore. Use sparingly. */
function glow(
  ctx: CanvasRenderingContext2D,
  color: string,
  blur: number,
  fn: () => void,
) {
  ctx.save();
  ctx.shadowBlur = blur;
  ctx.shadowColor = color;
  fn();
  ctx.restore();
}

// ===========================================================================
// 01 · Share your rules — document pages glide in from the left and slot into
// a growing corpus stack, each landing bumping the tally with a ✓ pulse.
// The cursor bends the incoming flight paths; hovering speeds delivery.
// ===========================================================================

export function ruleIngest(opts: {
  tint: Tint;
  hot: Tint;
  ok: Tint;
  speed?: number;
}): EngineFactory {
  const speed = opts.speed ?? 1;
  const N = 6;
  return (): Engine => {
    type Doc = {
      x: number;
      y: number;
      y0: number;
      sp: number;
      ph: number;
      seed: number;
    };
    let W = 0;
    let H = 0;
    const docs: Doc[] = [];
    const r = rng(4111);
    let pulse = 0; // stack landing pulse
    let count = 217; // running corpus tally

    const respawn = (d: Doc, offscreen: boolean) => {
      d.x = offscreen ? -40 - r() * W * 0.9 : r() * W * 0.5;
      d.y0 = (0.1 + r() * 0.5) * H;
      d.y = d.y0;
      d.sp = 46 + r() * 34;
      d.ph = r() * TAU;
      d.seed = (r() * 4096) | 0;
    };

    return {
      resize(w, h) {
        W = w;
        H = h;
        if (docs.length === 0) {
          for (let i = 0; i < N; i++) {
            const d: Doc = { x: 0, y: 0, y0: 0, sp: 0, ph: 0, seed: 0 };
            respawn(d, i > 0);
            docs.push(d);
          }
        }
      },
      frame(ctx, env) {
        const { t, dt, palette, pointer, hover, still } = env;
        const base = tone(palette, opts.tint);
        const hot = tone(palette, opts.hot);
        const okc = tone(palette, opts.ok);
        const sx = W * 0.72; // where the corpus stands
        const sy = H * 0.3;
        pulse *= Math.exp(-dt * 3);

        // sparse mote field for depth
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const mc = Math.max(4, Math.floor(W / 44));
        const mr = Math.max(3, Math.floor(H / 46));
        for (let gy = 0; gy < mr; gy++) {
          for (let gx = 0; gx < mc; gx++) {
            const v = field(gx * 0.7, gy * 0.8, t * 0.3) * 0.5 + 0.5;
            if (v < 0.6) continue;
            ctx.fillStyle = oklcha(palette.dim, 0.05 + v * 0.09);
            ctx.fillText("·", ((gx + 0.5) / mc) * W, ((gy + 0.5) / mr) * H);
          }
        }

        // the corpus stack (deepest layer first)
        ctx.lineWidth = 1;
        for (let i = 4; i >= 0; i--) {
          const ox = sx - 26 + i * 2.5;
          const oy = sy - 34 + i * 3;
          ctx.fillStyle = oklcha(palette.bg, 0.88);
          ctx.fillRect(ox, oy, 52, 68);
          ctx.strokeStyle = oklcha(
            base,
            clamp(0.55 - i * 0.09 + pulse * 0.3, 0, 1),
          );
          ctx.strokeRect(ox, oy, 52, 68);
        }
        // ruled lines + § on the top page
        ctx.strokeStyle = oklcha(mix(palette.dim, base, 0.6), 0.5);
        ctx.beginPath();
        for (let k = 0; k < 4; k++) {
          const ly = sy - 34 + 22 + k * 11;
          ctx.moveTo(sx - 18, ly);
          ctx.lineTo(sx + (k === 3 ? 4 : 18), ly);
        }
        ctx.stroke();
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.fillStyle = oklcha(hot, 0.85);
        ctx.fillText("§", sx - 16, sy - 22);
        // the tally
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = oklcha(mix(palette.dim, base, 0.7), 0.8);
        ctx.fillText(`rules · ${count}`, sx, sy + 48);
        // landing pulse — ✓ and an expanding ring off the stack
        if (pulse > 0.04) {
          glow(ctx, oklcha(okc, 0.8), 8, () => {
            ctx.fillStyle = oklcha(okc, pulse);
            ctx.fillText("✓", sx + 34, sy - 40);
          });
          const rr = (1 - pulse) * 30;
          ctx.strokeStyle = oklcha(okc, pulse * 0.6);
          ctx.beginPath();
          ctx.arc(sx, sy, 40 + rr, 0, TAU);
          ctx.stroke();
        }

        // incoming documents
        for (const d of docs) {
          const prog = clamp((d.x + 40) / Math.max(1, sx - 40), 0, 1);
          if (!still) {
            let ty = d.y0 + Math.sin(t * 1.1 + d.ph) * 22 * (1 - prog);
            if (pointer.active) ty += (pointer.y * H - ty) * 0.35 * (1 - prog);
            ty += (sy - ty) * smoothstep(0.55, 1, prog);
            d.y += (ty - d.y) * clamp(dt * 4, 0, 1);
            d.x += d.sp * speed * (hover ? 1.5 : 1) * dt;
            if (d.x >= sx - 32) {
              count++;
              pulse = 1;
              respawn(d, true);
            }
          }
          if (d.x < -30) continue;
          const a = clamp(0.3 + prog * 0.55, 0, 1);
          // motion tail
          ctx.strokeStyle = oklcha(base, 0.15 + prog * 0.12);
          ctx.beginPath();
          ctx.moveTo(d.x - 32, d.y);
          ctx.lineTo(d.x - 15, d.y);
          ctx.stroke();
          // the page
          ctx.fillStyle = oklcha(palette.bg, 0.82);
          ctx.fillRect(d.x - 11, d.y - 14, 22, 28);
          ctx.strokeStyle = oklcha(base, a);
          ctx.strokeRect(d.x - 11, d.y - 14, 22, 28);
          ctx.strokeStyle = oklcha(mix(palette.dim, base, 0.5), a * 0.7);
          ctx.beginPath();
          for (let k = 0; k < 3; k++) {
            const ly = d.y - 4 + k * 6;
            ctx.moveTo(d.x - 6, ly);
            ctx.lineTo(d.x + (k === 2 ? 1 : 7), ly);
          }
          ctx.stroke();
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.fillStyle = oklcha(hot, a);
          ctx.fillText("§", d.x - 5, d.y - 9);
        }
      },
    };
  };
}

// ===========================================================================
// 03 · Proofs run on every change — commit lanes scroll under a standing
// prover beam; every commit that crosses it is checked on the spot, earning a
// ✓ (or a blocking ✗). The cursor interrogates commits to reveal their hash;
// hovering speeds the merge queue up.
// ===========================================================================

export function commitProofs(opts: {
  tint: Tint;
  ok: Tint;
  bad: Tint;
  speed?: number;
}): EngineFactory {
  const speed = opts.speed ?? 1;
  const LANES = 3;
  const PER = 5;
  const HEXC = "0123456789abcdef";
  const DASH: number[] = [5, 6];
  const NODASH: number[] = [];
  return (): Engine => {
    type C = {
      lane: number;
      x: number;
      seed: number;
      st: 0 | 1 | 2; // pending | proven | refuted
      fl: number;
    };
    let W = 0;
    let H = 0;
    const cs: C[] = [];
    const r = rng(9020);
    let bp = 0; // beam pulse

    return {
      resize(w, h) {
        W = w;
        H = h;
        if (cs.length === 0) {
          for (let ln = 0; ln < LANES; ln++) {
            for (let i = 0; i < PER; i++) {
              cs.push({
                lane: ln,
                x: ((i + r() * 0.7) / PER) * w * 1.5,
                seed: (r() * 4096) | 0,
                st: 0,
                fl: 0,
              });
            }
          }
        }
      },
      frame(ctx, env) {
        const { dt, palette, pointer, hover, still } = env;
        const base = tone(palette, opts.tint);
        const okc = tone(palette, opts.ok);
        const bad = tone(palette, opts.bad);
        const bx = W * 0.58;
        const laneY = (ln: number) => H * (0.16 + ln * 0.17);
        const v = 30 * speed * (hover ? 1.7 : 1);
        bp *= Math.exp(-dt * 3.5);

        // lanes
        ctx.lineWidth = 1;
        ctx.strokeStyle = oklcha(palette.dim, 0.16);
        ctx.beginPath();
        for (let ln = 0; ln < LANES; ln++) {
          const y = laneY(ln);
          ctx.moveTo(8, y);
          ctx.lineTo(W - 8, y);
        }
        ctx.stroke();

        // the prover beam — every change crosses it
        glow(ctx, oklcha(base, 0.8), 7 + bp * 12, () => {
          ctx.strokeStyle = oklcha(mix(base, okc, bp), 0.45 + bp * 0.5);
          ctx.setLineDash(DASH);
          ctx.beginPath();
          ctx.moveTo(bx, H * 0.06);
          ctx.lineTo(bx, H * 0.6);
          ctx.stroke();
          ctx.setLineDash(NODASH);
        });
        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = oklcha(base, 0.75);
        ctx.fillText("⊢", bx, H * 0.66);

        const px = pointer.x * W;
        const py = pointer.y * H;
        ctx.font = '11px "JetBrains Mono", monospace';
        for (const c of cs) {
          const y = laneY(c.lane);
          if (!still) {
            c.x -= v * dt;
            if (c.x < -24) {
              c.x = W + 20 + r() * 140;
              c.seed = (r() * 4096) | 0;
              c.st = 0;
              c.fl = 0;
            }
            if (c.st === 0 && c.x <= bx) {
              c.st = c.seed % 6 === 3 ? 2 : 1;
              c.fl = 1;
              bp = 1;
            }
            c.fl *= Math.exp(-dt * 1.8);
          } else if (c.st === 0 && c.x <= bx) {
            // sensible snapshot under reduced motion
            c.st = c.seed % 6 === 3 ? 2 : 1;
          }

          const near = pointer.active
            ? smoothstep(46, 0, Math.hypot(c.x - px, y - py))
            : 0;

          if (c.st === 2) {
            // refuted — hollow commit, blocked from merging
            ctx.strokeStyle = oklcha(bad, 0.85);
            ctx.beginPath();
            ctx.arc(c.x, y, 3, 0, TAU);
            ctx.stroke();
            ctx.fillStyle = oklcha(bad, clamp(0.5 + c.fl * 0.5, 0, 1));
            ctx.fillText("✗", c.x, y - 13);
          } else if (c.st === 1) {
            ctx.fillStyle = oklcha(mix(base, okc, 0.75), 0.9);
            ctx.beginPath();
            ctx.arc(c.x, y, 2.8, 0, TAU);
            ctx.fill();
            ctx.fillStyle = oklcha(okc, clamp(0.4 + c.fl * 0.6 + near * 0.3, 0, 1));
            ctx.fillText("✓", c.x, y - 13);
            if (c.fl > 0.05) {
              ctx.strokeStyle = oklcha(okc, c.fl * 0.7);
              ctx.beginPath();
              ctx.arc(c.x, y, 5 + (1 - c.fl) * 14, 0, TAU);
              ctx.stroke();
            }
          } else {
            ctx.fillStyle = oklcha(mix(palette.dim, base, 0.6), 0.8);
            ctx.beginPath();
            ctx.arc(c.x, y, 2.6, 0, TAU);
            ctx.fill();
          }

          // cursor interrogation — reveal the commit hash
          if (near > 0.45) {
            ctx.fillStyle = oklcha(base, near);
            ctx.fillText(
              `#${HEXC[c.seed & 15]}${HEXC[(c.seed >> 4) & 15]}${HEXC[(c.seed >> 8) & 15]}`,
              c.x,
              y + 15,
            );
          }
        }
      },
    };
  };
}

// ===========================================================================
// 04 · You get verifiable guarantees — a certificate writes itself out as
// lines of hash, then the seal slams down: rotating-notch ring, ✓, expanding
// impact rings, ∎ QED. The cursor parallaxes the seal and re-hashes the
// digest under it.
// ===========================================================================

export function sealCert(opts: {
  tint: Tint;
  hot: Tint;
  seal: Tint;
  speed?: number;
}): EngineFactory {
  const HEX = "89abcdef01234567";
  const speed = opts.speed ?? 1;
  return (): Engine => {
    let W = 0;
    let H = 0;
    let gen = 0;
    let prev = 0;
    return {
      resize(w, h) {
        W = w;
        H = h;
      },
      frame(ctx, env) {
        const { t, palette, pointer, hover, still } = env;
        const base = tone(palette, opts.tint);
        const hot = tone(palette, opts.hot);
        const seal = tone(palette, opts.seal);
        const T = 7.5 / speed;
        const tau = still ? 4.2 : t % T;
        if (tau < prev) gen++;
        prev = tau;
        // whole certificate fades at the end of the cycle, then re-issues
        const fade = 1 - smoothstep(T - 0.7, T - 0.05, tau);

        const lines = 6;
        const lh = Math.min(22, (H * 0.48) / lines);
        const cw = 10;
        const cols = Math.max(8, Math.floor((W - 36) / cw));
        const px = pointer.x * W;
        const py = pointer.y * H;

        // the certificate body — hash lines typing themselves out
        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const cps = 34 * (hover ? 1.3 : 1); // chars per second
        for (let li = 0; li < lines; li++) {
          const y = 22 + li * lh;
          const head = still ? cols : clamp((tau - li * 0.28) * cps, 0, cols);
          for (let c = 0; c < cols; c++) {
            if (c >= head) break;
            const x = 18 + (c + 0.5) * cw;
            const near = pointer.active
              ? smoothstep(60, 0, Math.hypot(x - px, y - py))
              : 0;
            let gi = (gen * 131 + li * 37 + c * 11) & 1023;
            if (near > 0.3) gi += (t * 20) | 0; // live re-hash under the cursor
            const ch = c % 9 === 4 ? "·" : HEX[gi & 15];
            const fresh = clamp(1 - (head - c) * 0.08, 0, 1);
            ctx.fillStyle = oklcha(
              mix(mix(palette.dim, base, 0.5 + near * 0.4), hot, fresh),
              (0.2 + fresh * 0.62 + near * 0.25) * fade,
            );
            ctx.fillText(ch, x, y);
          }
        }

        // the seal
        const stampT = lines * 0.28 + 1.2;
        if (tau >= stampT - 0.3) {
          const drop = clamp((tau - (stampT - 0.3)) / 0.3, 0, 1);
          const sc = 1 + (1 - drop) * 1.5; // slams down from above
          const aS = drop * fade;
          const cx = W * 0.64 + (pointer.x - 0.5) * (pointer.active ? 12 : 0);
          const cy = H * 0.3 + (pointer.y - 0.5) * (pointer.active ? 9 : 0);

          glow(ctx, oklcha(seal, 0.8), 10, () => {
            ctx.strokeStyle = oklcha(seal, 0.85 * aS);
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(cx, cy, 24 * sc, 0, TAU);
            ctx.stroke();
            ctx.lineWidth = 1;
          });
          ctx.strokeStyle = oklcha(seal, 0.45 * aS);
          ctx.beginPath();
          ctx.arc(cx, cy, 30 * sc, 0, TAU);
          ctx.stroke();
          // rotating notches on the outer ring
          const rot = still ? 0.6 : t * 0.5;
          ctx.strokeStyle = oklcha(seal, 0.6 * aS);
          ctx.beginPath();
          for (let k = 0; k < 12; k++) {
            const an = rot + (k / 12) * TAU;
            ctx.moveTo(cx + Math.cos(an) * 30 * sc, cy + Math.sin(an) * 30 * sc);
            ctx.lineTo(cx + Math.cos(an) * 34 * sc, cy + Math.sin(an) * 34 * sc);
          }
          ctx.stroke();
          // the mark
          ctx.font = '16px "JetBrains Mono", monospace';
          ctx.fillStyle = oklcha(seal, aS);
          ctx.fillText("✓", cx, cy - 4);
          ctx.font = '8px "JetBrains Mono", monospace';
          ctx.fillStyle = oklcha(seal, 0.85 * aS);
          ctx.fillText("∎ QED", cx, cy + 11);
          // impact rings
          const since = tau - stampT;
          if (since > 0 && since < 0.9) {
            const p = since / 0.9;
            ctx.strokeStyle = oklcha(seal, (1 - p) * 0.7 * fade);
            ctx.beginPath();
            ctx.arc(cx, cy, 36 + p * 30, 0, TAU);
            ctx.stroke();
          }
        }
      },
    };
  };
}
