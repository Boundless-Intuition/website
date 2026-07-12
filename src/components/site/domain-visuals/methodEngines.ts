/**
 * Method-step engines — five ASCII-native visuals dramatizing the pipeline
 * steps (01–05). Unlike the domain panels these render as full-card
 * backgrounds, so they stay glyph-based (the "live ASCII" language of the
 * Security panel) and concentrate their brightest action in the upper half
 * where the copy scrim is thinnest. All are mouse-reactive and allocation-free
 * per frame.
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
// 01 · The model answers — token streams typing themselves out, line by line,
// each with a burning caret. The cursor is an attention head: rows near it
// generate faster and hotter, and glyphs under it re-sample live.
// ===========================================================================

export function tokenStream(opts: {
  tint: Tint;
  hot: Tint;
  speed?: number;
}): EngineFactory {
  const GLYPHS = "aenotirsl dhcum.,;·—+=<>/";
  const speed = opts.speed ?? 1;
  return (): Engine => {
    type Row = { head: number; sp: number; y: number; seed: number; gen: number };
    let rows: Row[] = [];
    let cols = 0;
    const cw = 9.5;
    let W = 0;
    let H = 0;
    return {
      resize(w, h) {
        W = w;
        H = h;
        const lh = 20;
        cols = Math.max(6, Math.floor((w - 28) / cw));
        const n = Math.max(3, Math.floor((h - 24) / lh));
        const r = rng(1013);
        rows = [];
        for (let i = 0; i < n; i++) {
          rows.push({
            head: r() * cols * 1.4 - cols * 0.2,
            sp: 7 + r() * 10,
            y: 16 + (i + 0.5) * lh,
            seed: Math.floor(r() * 4096),
            gen: 0,
          });
        }
      },
      frame(ctx, env) {
        const { t, dt, palette, pointer, hover, still } = env;
        const base = tone(palette, opts.tint);
        const hot = tone(palette, opts.hot);
        ctx.font = '13px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const px = pointer.x * W;
        const py = pointer.y * H;

        for (let ri = 0; ri < rows.length; ri++) {
          const row = rows[ri];
          const near = pointer.active
            ? smoothstep(70, 0, Math.abs(row.y - py))
            : 0;
          if (!still) {
            row.head +=
              row.sp * speed * (1 + near * 2.4 + (hover ? 0.35 : 0)) * dt;
            if (row.head > cols + 8) {
              row.head = -3 - ((row.seed >> 4) % 6);
              row.gen++;
            }
          } else if (row.head < 4) {
            row.head = cols * 0.6;
          }
          const head = row.head;

          for (let c = 0; c < cols; c++) {
            const x = 16 + (c + 0.5) * cw;
            if (c > head) {
              // ghost of tokens not yet sampled
              const g = field(c * 0.35, ri * 0.9, t * 0.5) * 0.5 + 0.5;
              if (g > 0.62) {
                ctx.fillStyle = oklcha(palette.dim, 0.1 + g * 0.08);
                ctx.fillText("·", x, row.y);
              }
              continue;
            }
            const back = head - c;
            // freshly-typed chars burn bright, then settle
            const fresh = clamp(1.15 - back * 0.05, 0, 1);
            let gi = (row.seed + c * 31 + row.gen * 97) % GLYPHS.length;
            // the cursor re-samples nearby tokens
            if (pointer.active && Math.abs(x - px) < 34 && near > 0.3) {
              gi = (gi + ((t * 22) | 0)) % GLYPHS.length;
            }
            const ch = GLYPHS[gi];
            if (ch === " ") continue;
            const emph = clamp(fresh + near * 0.5, 0, 1);
            ctx.fillStyle = oklcha(
              mix(mix(palette.dim, base, 0.45 + near * 0.4), hot, fresh * fresh),
              0.3 + emph * 0.62,
            );
            ctx.fillText(ch, x, row.y);
          }

          // the caret
          if (head >= 0 && head <= cols) {
            const cx = 16 + (head + 0.5) * cw;
            const blink = still ? 1 : 0.55 + 0.45 * Math.sin(t * 9 + ri);
            glow(ctx, oklcha(hot, 0.9), 10, () => {
              ctx.fillStyle = oklcha(hot, 0.5 + blink * 0.45);
              ctx.fillRect(cx - cw * 0.4, row.y - 8, cw * 0.8, 16);
            });
          }
        }
      },
    };
  };
}

// ===========================================================================
// 02 · The domain is formalized — a compile front sweeps across a cloud of
// raw drifting glyphs; everything behind it snaps into a rigid rule lattice.
// Drag the cursor to scrub the front yourself.
// ===========================================================================

export function ruleLattice(opts: {
  chaos: Tint;
  ord: Tint;
  speed?: number;
}): EngineFactory {
  const ORD = "∀∧→§⊢=¶≤";
  const RAW = "kxq?~zjw%&";
  const speed = opts.speed ?? 1;
  return (): Engine => {
    type P = { lx: number; ly: number; o: number; seed: number };
    let ps: P[] = [];
    let gcols = 0;
    let grows = 0;
    let W = 0;
    let H = 0;
    const DASH: number[] = [5, 7];
    const NODASH: number[] = [];
    return {
      resize(w, h) {
        W = w;
        H = h;
        const cell = Math.max(26, Math.sqrt((w * h) / 150));
        gcols = Math.max(3, Math.round(w / cell));
        grows = Math.max(3, Math.round(h / cell));
        const r = rng(77);
        ps = [];
        for (let gy = 0; gy < grows; gy++)
          for (let gx = 0; gx < gcols; gx++)
            ps.push({
              lx: ((gx + 0.5) / gcols) * w,
              ly: ((gy + 0.5) / grows) * h,
              o: 0,
              seed: Math.floor(r() * 4096),
            });
      },
      frame(ctx, env) {
        const { t, dt, palette, pointer, still } = env;
        const raw = tone(palette, opts.chaos);
        const ord = tone(palette, opts.ord);
        const fxN = pointer.active
          ? clamp(pointer.x, 0.05, 0.95)
          : 0.5 + 0.4 * Math.sin(t * 0.4 * speed);
        const fx = fxN * W;

        for (const p of ps) {
          const tgt = p.lx < fx ? 1 : 0;
          p.o = still ? tgt : p.o + (tgt - p.o) * clamp(dt * 3, 0, 1);
        }

        // lattice links between settled neighbours
        ctx.lineWidth = 1;
        for (let gy = 0; gy < grows; gy++) {
          for (let gx = 0; gx < gcols; gx++) {
            const i = gy * gcols + gx;
            const a = ps[i];
            if (a.o < 0.6) continue;
            if (gx + 1 < gcols) {
              const b = ps[i + 1];
              if (b.o >= 0.6) {
                ctx.strokeStyle = oklcha(ord, 0.05 + 0.14 * Math.min(a.o, b.o));
                ctx.beginPath();
                ctx.moveTo(a.lx, a.ly);
                ctx.lineTo(b.lx, b.ly);
                ctx.stroke();
              }
            }
            if (gy + 1 < grows) {
              const b = ps[i + gcols];
              if (b.o >= 0.6) {
                ctx.strokeStyle = oklcha(ord, 0.05 + 0.14 * Math.min(a.o, b.o));
                ctx.beginPath();
                ctx.moveTo(a.lx, a.ly);
                ctx.lineTo(b.lx, b.ly);
                ctx.stroke();
              }
            }
          }
        }

        // glyphs — chaotic drift collapses to the lattice as o → 1
        ctx.font = '13px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (const p of ps) {
          const wob = 1 - p.o;
          const dx = field(p.lx * 0.013, p.ly * 0.017 + p.seed, t * 0.7) * 34 * wob;
          const dy =
            field(p.ly * 0.015 + 9, p.lx * 0.011 - p.seed, t * 0.62) * 30 * wob;
          const scr = p.o > 0.25 && p.o < 0.75; // mid-morph scramble
          const set = p.o >= 0.75 || scr ? ORD : RAW;
          const gi = scr
            ? (p.seed + ((t * 18) | 0)) % set.length
            : p.seed % set.length;
          ctx.fillStyle = oklcha(
            mix(raw, ord, p.o),
            clamp(0.3 + p.o * 0.55 + wob * 0.15, 0, 1),
          );
          ctx.fillText(set[gi], p.lx + dx, p.ly + dy);
        }

        // the compile front
        glow(ctx, oklcha(ord, 0.8), 9, () => {
          ctx.strokeStyle = oklcha(ord, 0.65);
          ctx.setLineDash(DASH);
          ctx.beginPath();
          ctx.moveTo(fx, 4);
          ctx.lineTo(fx, H - 4);
          ctx.stroke();
          ctx.setLineDash(NODASH);
        });
      },
    };
  };
}

// ===========================================================================
// 03 · The answer becomes a claim — a translation lens roams over prose;
// inside it every character resolves into formal logic, with a scramble band
// at the boundary where meaning is mid-decode. The cursor IS the lens.
// ===========================================================================

export function claimMorph(opts: {
  prose: Tint;
  logic: Tint;
  speed?: number;
}): EngineFactory {
  const PROSE = "the answer said to give. ";
  const LOGIC = "∀∃¬∧∨→⊨λ⊢:=()";
  const cell = 16;
  const speed = opts.speed ?? 1;
  return (): Engine => {
    let cols = 0;
    let rows = 0;
    let cw = cell;
    let ch = cell;
    let W = 0;
    let H = 0;
    return {
      resize(w, h) {
        W = w;
        H = h;
        cols = Math.max(1, Math.floor(w / cell));
        rows = Math.max(1, Math.floor(h / cell));
        cw = w / cols;
        ch = h / rows;
      },
      frame(ctx, env) {
        const { t, palette, pointer, still } = env;
        const pro = tone(palette, opts.prose);
        const log = tone(palette, opts.logic);
        ctx.font = '13px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const lt = still ? 0 : t * speed;
        const lx =
          (pointer.active ? pointer.x : 0.5 + 0.34 * Math.sin(lt * 0.5)) * W;
        const ly =
          (pointer.active ? pointer.y : 0.42 + 0.28 * Math.cos(lt * 0.37)) * H;
        const R = Math.min(W, H) * 0.4 * (1 + 0.06 * Math.sin(lt * 1.7));

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = (c + 0.5) * cw;
            const y = (r + 0.5) * ch;
            const d = Math.hypot(x - lx, y - ly);
            const s = smoothstep(R, R * 0.45, d); // 1 at the lens core
            const hsh = c * 7 + r * 13 + ((c * c + r) % 5);
            let g: string;
            if (s > 0.72) {
              g = LOGIC[hsh % LOGIC.length];
            } else if (s > 0.2) {
              // the decode band — glyphs flicker between alphabets
              g = LOGIC[(hsh + ((t * 16) | 0)) % LOGIC.length];
            } else {
              g = PROSE[(hsh + ((t * 1.2) | 0)) % PROSE.length];
            }
            if (g === " ") continue;
            const shimmer = field(c * 0.4, r * 0.5, t * 0.6) * 0.5 + 0.5;
            ctx.fillStyle = oklcha(
              mix(pro, log, s),
              clamp(0.14 + shimmer * 0.2 + s * 0.62, 0, 1),
            );
            ctx.fillText(g, x, y);
          }
        }

        // the lens itself
        glow(ctx, oklcha(log, 0.7), 8, () => {
          ctx.strokeStyle = oklcha(log, 0.4);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(lx, ly, R, 0, TAU);
          ctx.stroke();
        });
        // crosshair ticks
        ctx.strokeStyle = oklcha(log, 0.6);
        ctx.beginPath();
        ctx.moveTo(lx - R - 5, ly);
        ctx.lineTo(lx - R + 5, ly);
        ctx.moveTo(lx + R - 5, ly);
        ctx.lineTo(lx + R + 5, ly);
        ctx.moveTo(lx, ly - R - 5);
        ctx.lineTo(lx, ly - R + 5);
        ctx.moveTo(lx, ly + R - 5);
        ctx.lineTo(lx, ly + R + 5);
        ctx.stroke();
      },
    };
  };
}

// ===========================================================================
// 04 · The prover checks it — a proof-search tree explored edge by edge.
// Dead branches flash a red ✗; when the search reaches the final leaf the
// whole winning derivation ignites green and the ∎ is certified with rings.
// The cursor tilts the tree in parallax and spotlights nearby nodes.
// ===========================================================================

export function proofSearch(opts: {
  tint: Tint;
  ok: Tint;
  bad: Tint;
  speed?: number;
}): EngineFactory {
  const speed = opts.speed ?? 1;
  const LEVELS = 3; // levels of edges; nodes live on tiers 0..LEVELS
  const INT = "∧∨→";
  return (): Engine => {
    type N = { x: number; y: number; lv: number; g: string };
    type E = { a: number; b: number; k: number; onPath: boolean; leafEnd: boolean };
    let nodes: N[] = [];
    let edges: E[] = [];
    let W = 0;
    let H = 0;
    return {
      resize(w, h) {
        W = w;
        H = h;
        nodes = [];
        edges = [];
        const xPad = 22;
        const yPad = Math.max(18, h * 0.09);
        for (let lv = 0; lv <= LEVELS; lv++) {
          const n = 1 << lv;
          for (let i = 0; i < n; i++) {
            const isLeaf = lv === LEVELS;
            const isSol = isLeaf && i === n - 1;
            nodes.push({
              x: xPad + ((w - 2 * xPad) * lv) / LEVELS,
              y: yPad + (h - 2 * yPad) * ((i + 0.5) / n),
              lv,
              g:
                lv === 0
                  ? "⊢"
                  : isSol
                    ? "∎"
                    : isLeaf
                      ? "⊥"
                      : INT[(lv * 5 + i * 3) % INT.length],
            });
          }
        }
        // DFS edge order from the root, left child first, so the right-most
        // path — the winning derivation — resolves last.
        let k = 0;
        const off = (lv: number) => (1 << lv) - 1;
        const walk = (lv: number, i: number) => {
          if (lv === LEVELS) return;
          for (let c = 0; c < 2; c++) {
            const ci = i * 2 + c;
            edges.push({
              a: off(lv) + i,
              b: off(lv + 1) + ci,
              k: k++,
              onPath: i === (1 << lv) - 1 && ci === (1 << (lv + 1)) - 1,
              leafEnd: lv + 1 === LEVELS,
            });
            walk(lv + 1, ci);
          }
        };
        walk(0, 0);
      },
      frame(ctx, env) {
        const { t, palette, pointer, still } = env;
        const base = tone(palette, opts.tint);
        const ok = tone(palette, opts.ok);
        const bad = tone(palette, opts.bad);
        const eDur = 0.42 / speed;
        const nE = edges.length;
        const tAll = nE * eDur;
        const total = tAll + 2.4;
        const tau = still ? tAll + 0.6 : t % total;
        const holding = tau >= tAll;
        const proven = holding ? smoothstep(0, 0.4, tau - tAll) : 0;

        // pointer parallax — deeper tiers shift more
        const dxk = (pointer.x - 0.5) * (pointer.active ? 16 : 6);
        const dyk = (pointer.y - 0.5) * (pointer.active ? 12 : 4);
        const nx = (n: N) => n.x + dxk * (n.lv / LEVELS);
        const ny = (n: N) => n.y + dyk * (n.lv / LEVELS);

        ctx.lineWidth = 1;
        for (const e of edges) {
          const A = nodes[e.a];
          const B = nodes[e.b];
          const t0 = e.k * eDur;
          const prog = clamp((tau - t0) / eDur, 0, 1);
          const ax = nx(A);
          const ay = ny(A);
          const bx = nx(B);
          const by = ny(B);
          // faint scaffold
          ctx.strokeStyle = oklcha(palette.dim, 0.14);
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
          if (prog <= 0) continue;

          if (e.onPath && proven > 0) {
            glow(ctx, oklcha(ok, 0.8), 8, () => {
              ctx.strokeStyle = oklcha(ok, 0.9 * proven);
              ctx.lineWidth = 1.6;
              ctx.beginPath();
              ctx.moveTo(ax, ay);
              ctx.lineTo(bx, by);
              ctx.stroke();
              ctx.lineWidth = 1;
            });
          } else {
            ctx.strokeStyle = oklcha(base, e.onPath ? 0.5 : 0.26);
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(ax + (bx - ax) * prog, ay + (by - ay) * prog);
            ctx.stroke();
          }

          // dead-end flash on refuted leaves
          if (e.leafEnd && !e.onPath) {
            const since = tau - (t0 + eDur);
            if (since > 0 && since < 0.6) {
              const f = 1 - since / 0.6;
              glow(ctx, oklcha(bad, 0.8), 8, () => {
                ctx.fillStyle = oklcha(bad, f * 0.95);
                ctx.font = '11px "JetBrains Mono", monospace';
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("✗", bx + 9, by);
              });
            }
          }
        }

        // nodes
        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (const n of nodes) {
          const x = nx(n);
          const y = ny(n);
          const isSol = n.g === "∎";
          const near = pointer.active
            ? smoothstep(60, 0, Math.hypot(x - pointer.x * W, y - pointer.y * H))
            : 0;
          const a = clamp(0.45 + near * 0.5 + (isSol ? proven * 0.55 : 0), 0, 1);
          if (isSol && proven > 0) {
            glow(ctx, oklcha(ok, 0.9), 12, () => {
              ctx.fillStyle = oklcha(ok, a);
              ctx.fillText(n.g, x, y);
            });
            // expanding certification ring
            const rr = ((tau - tAll) % 1.2) * 26;
            ctx.strokeStyle = oklcha(ok, clamp(0.5 - rr / 60, 0, 1));
            ctx.beginPath();
            ctx.arc(x, y, 6 + rr, 0, TAU);
            ctx.stroke();
          } else {
            ctx.fillStyle = oklcha(mix(palette.dim, base, 0.5 + near * 0.5), a);
            ctx.fillText(n.g, x, y);
          }
        }

        // the search walker
        if (!holding && !still) {
          const k = Math.min(nE - 1, Math.floor(tau / eDur));
          const e = edges[k];
          const prog = clamp((tau - k * eDur) / eDur, 0, 1);
          const A = nodes[e.a];
          const B = nodes[e.b];
          const x = nx(A) + (nx(B) - nx(A)) * prog;
          const y = ny(A) + (ny(B) - ny(A)) * prog;
          glow(ctx, oklcha(base, 0.9), 10, () => {
            ctx.fillStyle = oklcha(base, 0.95);
            ctx.beginPath();
            ctx.arc(x, y, 2.6, 0, TAU);
            ctx.fill();
          });
        }
      },
    };
  };
}

// ===========================================================================
// 05 · Only proven answers ship — answer glyphs fly toward a checkpoint gate.
// Verified ones cross with a ✓ ring and travel on inside a certificate box;
// refuted ones flash ✗ and fall out of the pipeline. The cursor steers the
// incoming stream; hovering speeds up shipping.
// ===========================================================================

export function shipGate(opts: {
  tint: Tint;
  ok: Tint;
  bad: Tint;
  speed?: number;
}): EngineFactory {
  const GLYPHS = "≈∑αβ∆πΩµ√≠";
  const speed = opts.speed ?? 1;
  const N = 16;
  return (): Engine => {
    type A = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      ph: number;
      gi: number;
      ok: boolean;
      st: 0 | 1 | 2; // flying | shipped | refuted
      fl: number; // flash intensity
    };
    let W = 0;
    let H = 0;
    const agents: A[] = [];
    const r = rng(3301);
    let gp = 0; // gate pulse

    const respawn = (a: A, offscreen: boolean) => {
      a.x = offscreen ? -14 - r() * 120 : r() * W * 0.5;
      a.y = (0.12 + r() * 0.76) * H;
      a.vx = 46 + r() * 42;
      a.vy = 0;
      a.ph = r() * TAU;
      a.gi = Math.floor(r() * GLYPHS.length);
      a.ok = r() < 0.7;
      a.st = 0;
      a.fl = 0;
    };

    return {
      resize(w, h) {
        W = w;
        H = h;
        if (agents.length === 0) {
          for (let i = 0; i < N; i++) {
            const a: A = {
              x: 0,
              y: 0,
              vx: 0,
              vy: 0,
              ph: 0,
              gi: 0,
              ok: true,
              st: 0,
              fl: 0,
            };
            respawn(a, false);
            agents.push(a);
          }
        }
      },
      frame(ctx, env) {
        const { t, dt, palette, pointer, hover, still } = env;
        const base = tone(palette, opts.tint);
        const okc = tone(palette, opts.ok);
        const bad = tone(palette, opts.bad);
        const gx = W * 0.62;
        gp *= Math.exp(-dt * 3.2);

        ctx.font = '14px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (const a of agents) {
          if (!still) {
            if (a.st === 0) {
              const ty = pointer.active ? pointer.y * H : a.y;
              a.y += ((ty - a.y) * 1.6 + Math.cos(t * 1.4 + a.ph) * 18) * dt;
              a.x += a.vx * speed * (hover ? 1.45 : 1) * dt;
              if (a.x >= gx) {
                a.st = a.ok ? 1 : 2;
                a.fl = 1;
                gp = 1;
                if (!a.ok) a.vy = -70;
              }
            } else if (a.st === 1) {
              a.x += a.vx * 1.25 * speed * dt;
              a.fl *= Math.exp(-dt * 2.2);
              if (a.x > W + 24) respawn(a, true);
            } else {
              a.vy += 780 * dt;
              a.y += a.vy * dt;
              a.x += a.vx * 0.18 * dt;
              a.fl *= Math.exp(-dt * 1.4);
              if (a.y > H + 24) respawn(a, true);
            }
          }

          const g = GLYPHS[a.gi];
          if (a.st === 0) {
            ctx.fillStyle = oklcha(mix(palette.dim, base, 0.7), 0.85);
            ctx.fillText(g, a.x, a.y);
            // motion tail
            ctx.strokeStyle = oklcha(base, 0.25);
            ctx.beginPath();
            ctx.moveTo(a.x - 22, a.y);
            ctx.lineTo(a.x - 9, a.y);
            ctx.stroke();
          } else if (a.st === 1) {
            glow(ctx, oklcha(okc, 0.7), a.fl * 10, () => {
              ctx.fillStyle = oklcha(okc, 0.95);
              ctx.fillText(g, a.x, a.y);
            });
            // the certificate
            ctx.strokeStyle = oklcha(okc, 0.55);
            ctx.strokeRect(a.x - 8, a.y - 9, 16, 18);
            if (a.fl > 0.04) {
              const rr = (1 - a.fl) * 22;
              ctx.strokeStyle = oklcha(okc, a.fl * 0.8);
              ctx.beginPath();
              ctx.arc(a.x, a.y, 10 + rr, 0, TAU);
              ctx.stroke();
              ctx.fillStyle = oklcha(okc, a.fl);
              ctx.fillText("✓", a.x + 14, a.y - 12);
            }
          } else {
            ctx.fillStyle = oklcha(bad, clamp(0.25 + a.fl * 0.75, 0, 1));
            ctx.fillText(g, a.x, a.y);
            if (a.fl > 0.4) {
              ctx.fillStyle = oklcha(bad, a.fl);
              ctx.fillText("✗", a.x + 12, a.y - 12);
            }
          }
        }

        // the gate
        glow(ctx, oklcha(base, 0.8), 6 + gp * 14, () => {
          ctx.strokeStyle = oklcha(mix(base, okc, gp), 0.5 + gp * 0.5);
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(gx, 6);
          ctx.lineTo(gx, H - 6);
          ctx.stroke();
          ctx.lineWidth = 1;
        });
        // checkpoint ticks
        ctx.fillStyle = oklcha(base, 0.5);
        ctx.font = '9px "JetBrains Mono", monospace';
        for (let y = 14; y < H - 8; y += 26) ctx.fillText("›", gx + 6, y);
      },
    };
  };
}
