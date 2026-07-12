/**
 * The generative engines behind the domain panels — one bespoke visual per
 * field, each with its own vibrant two-tone palette so the section reads as a
 * spectrum rather than a single accent. All are mouse-reactive and autoplay,
 * draw in CSS pixels (the hook has scaled the context for DPR), and avoid
 * per-frame allocation.
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
// 01 · Security & Compliance — live ASCII field under a verification scan
// ===========================================================================

export function asciiScan(opts: {
  tint: Tint;
  verified: Tint;
  /** when set, hidden anomalies are planted in the field — the beam exposes
   *  them as red ✗ marks that slowly sink back into the noise */
  alert?: Tint;
  ramp?: string;
  cell?: number;
  speed?: number;
}): EngineFactory {
  const ramp = opts.ramp ?? " ·:-=+*#⊨✓";
  const cell = opts.cell ?? 13;
  const speed = opts.speed ?? 0.5;
  const scale = 0.06;

  return (): Engine => {
    let cols = 0;
    let rows = 0;
    let cw = cell;
    let ch = cell;
    let fontPx = cell;
    return {
      resize(w, h) {
        cols = Math.max(1, Math.floor(w / cell));
        rows = Math.max(1, Math.floor(h / cell));
        cw = w / cols;
        ch = h / rows;
        fontPx = Math.min(cw, ch) * 1.04;
      },
      frame(ctx, env) {
        const { t, palette, pointer, hover, still, w } = env;
        const base = tone(palette, opts.tint);
        const ok = tone(palette, opts.verified);
        const bad = opts.alert ? tone(palette, opts.alert) : null;
        ctx.font = `${fontPx.toFixed(1)}px "JetBrains Mono", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // the scan bar sweeps L→R with a pause between passes
        const cyc = (t * 0.22) % 1.7;
        const sxN = cyc; // >1 means off-screen (the pause)
        const sx = sxN * w;

        const fx = pointer.active ? pointer.x : 0.5;
        const fy = pointer.active ? pointer.y : 0.5;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            let v = field(c * cw * scale, r * ch * scale, still ? 1.2 : t * speed);
            v = v * 0.5 + 0.5;

            const cx = (c + 0.5) * cw;
            const scanD = Math.abs(cx - sx);
            const scanned = smoothstep(cell * 3.4, 0, scanD);

            // planted policy violations — invisible in the noise until the
            // beam sweeps over them, then exposed as a red ✗ that fades
            if (bad && (((c * 92821) ^ (r * 68917)) & 0x7fffffff) % 37 === 0) {
              const fresh =
                sx > cx ? clamp(1 - (sx - cx) / (w * 0.55), 0, 1) : 0;
              if (fresh > 0.03) {
                const drawX = () => {
                  ctx.fillStyle = oklcha(bad, 0.3 + fresh * 0.7);
                  ctx.fillText("✗", cx, (r + 0.5) * ch);
                };
                if (fresh > 0.75) glow(ctx, oklcha(bad, 0.9), 8, drawX);
                else drawX();
                continue;
              }
            }

            const nx = c / cols;
            const ny = r / rows;
            const focus =
              smoothstep(0.4, 0, Math.hypot(nx - fx, ny - fy)) *
              (pointer.active ? 0.85 : 0);

            let i = clamp(v * 0.7 + focus + scanned * 0.55, 0, 1);
            let gi = Math.floor(i * (ramp.length - 1));
            if (scanned > 0.55) gi = ramp.length - 1; // resolves to ✓ under the beam
            const g = ramp[gi];
            if (g === " ") continue;

            const col =
              scanned > 0.15 ? mix(base, ok, scanned) : mix(palette.dim, base, i);
            const alpha = 0.16 + i * 0.66 + scanned * 0.3;
            ctx.fillStyle = oklcha(col, clamp(alpha, 0, 1));
            ctx.fillText(g, cx, (r + 0.5) * ch);
          }
        }

        // the leading edge of the beam
        if (sxN <= 1 && !still) {
          ctx.strokeStyle = oklcha(ok, 0.5);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(sx, 0);
          ctx.lineTo(sx, env.h);
          ctx.stroke();
        }
      },
    };
  };
}

// ===========================================================================
// 02 · Healthcare & Clinical Safety — an ECG monitor
// ===========================================================================

function ecgWave(u: number): number {
  const bump = (c: number, w: number) => Math.exp(-((u - c) ** 2) / (2 * w * w));
  return (
    bump(0.14, 0.03) * 0.18 -
    bump(0.19, 0.012) * 0.22 +
    bump(0.215, 0.011) * 1.0 -
    bump(0.245, 0.014) * 0.34 +
    bump(0.38, 0.05) * 0.3
  );
}

export function ecgMonitor(opts: {
  tint: Tint;
  /** color of the safety envelope + breach counterexamples */
  alert?: Tint;
  speed?: number;
}): EngineFactory {
  const speed = opts.speed ?? 1;
  return (): Engine => {
    let W = 0;
    let H = 0;
    return {
      resize(w, h) {
        W = w;
        H = h;
      },
      frame(ctx, env) {
        const { t, palette, pointer, hover, still } = env;
        const col = tone(palette, opts.tint);
        const warn = opts.alert ? tone(palette, opts.alert) : col;
        const y0 = H * 0.58;
        const amp = H * 0.3;
        const beats = 2.3;
        // the cursor drives the heart rate — glide right to stress the signal
        const stress = pointer.active ? 0.6 + pointer.x * 1.7 : hover ? 1.6 : 1;
        const rate = stress * speed * 0.5;
        const step = 2;
        const glowCol = oklcha(col, 0.9);

        // ECG paper
        const grid = Math.max(12, Math.round(H / 14));
        ctx.lineWidth = 1;
        for (let x = 0; x <= W; x += grid) {
          ctx.strokeStyle = oklcha(col, (x / grid) % 5 === 0 ? 0.1 : 0.04);
          ctx.beginPath();
          ctx.moveTo(x + 0.5, 0);
          ctx.lineTo(x + 0.5, H);
          ctx.stroke();
        }
        for (let y = 0; y <= H; y += grid) {
          ctx.strokeStyle = oklcha(col, (y / grid) % 5 === 0 ? 0.1 : 0.04);
          ctx.beginPath();
          ctx.moveTo(0, y + 0.5);
          ctx.lineTo(W, y + 0.5);
          ctx.stroke();
        }

        const phaseOf = (x: number) =>
          (x / W) * beats + (still ? 0.2 : t * rate);
        // every seventh beat spikes out of the verified envelope
        const ampMul = (bi: number) => (((bi % 7) + 7) % 7 === 3 ? 1.5 : 1);
        const sampleY = (x: number) => {
          const ph = phaseOf(x);
          const u = ph - Math.floor(ph);
          const jitter = field(x * 0.02, 0, t * 2) * 0.02;
          return y0 - amp * ampMul(Math.floor(ph)) * (ecgWave(u) + jitter);
        };

        // baseline
        ctx.strokeStyle = oklcha(col, 0.12);
        ctx.beginPath();
        ctx.moveTo(0, y0);
        ctx.lineTo(W, y0);
        ctx.stroke();

        // the verified safety envelope — beats must stay inside it
        const envTop = y0 - amp * 1.12;
        const envBot = y0 + amp * 0.3;
        ctx.fillStyle = oklcha(warn, 0.05);
        ctx.fillRect(0, envTop, W, envBot - envTop);
        ctx.setLineDash([4, 5]);
        ctx.strokeStyle = oklcha(warn, 0.5);
        ctx.beginPath();
        ctx.moveTo(0, envTop);
        ctx.lineTo(W, envTop);
        ctx.moveTo(0, envBot);
        ctx.lineTo(W, envBot);
        ctx.stroke();
        ctx.setLineDash([]);

        // the trace: a soft wide glow pass, then a crisp line
        glow(ctx, glowCol, 10, () => {
          ctx.strokeStyle = oklcha(col, 0.85);
          ctx.lineWidth = 1.7;
          ctx.beginPath();
          for (let x = 0; x <= W; x += step) {
            const y = sampleY(x);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        });

        // overdraw any excursion beyond the envelope in the alert color and
        // mark the worst point with a counterexample ✗
        let minY = Infinity;
        let minX = 0;
        ctx.strokeStyle = oklcha(warn, 0.95);
        ctx.lineWidth = 1.9;
        ctx.beginPath();
        let pen = false;
        for (let x = 0; x <= W; x += step) {
          const y = sampleY(x);
          if (y < minY) {
            minY = y;
            minX = x;
          }
          if (y < envTop) {
            if (!pen) {
              ctx.moveTo(x, y);
              pen = true;
            } else ctx.lineTo(x, y);
          } else pen = false;
        }
        ctx.stroke();
        ctx.lineWidth = 1;
        if (minY < envTop - 2) {
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          glow(ctx, oklcha(warn, 0.9), 8, () => {
            ctx.fillStyle = oklcha(warn, 1);
            ctx.fillText("✗", minX, Math.max(8, minY - 10));
          });
        }

        // leading pulse dot at the right edge
        if (!still) {
          const y = sampleY(W - 1);
          glow(ctx, glowCol, 14, () => {
            ctx.fillStyle = oklcha(col, 1);
            ctx.beginPath();
            ctx.arc(W - 3, y, 3, 0, TAU);
            ctx.fill();
          });
        }

        // cursor crosshair
        if (pointer.active) {
          const px = pointer.x * W;
          ctx.strokeStyle = oklcha(col, 0.3);
          ctx.setLineDash([2, 4]);
          ctx.beginPath();
          ctx.moveTo(px, 0);
          ctx.lineTo(px, H);
          ctx.stroke();
          ctx.setLineDash([]);
          const y = sampleY(px);
          ctx.fillStyle = oklcha(col, 0.9);
          ctx.beginPath();
          ctx.arc(px, y, 2.4, 0, TAU);
          ctx.fill();
        }
      },
    };
  };
}

// ===========================================================================
// 03 · Clinical Trials & Protocols — a rotating DNA double-helix
// ===========================================================================

export function dnaHelix(opts: {
  strand: Tint;
  pairA: Tint;
  pairB: Tint;
  /** color of flagged mutation pairs */
  flag?: Tint;
  speed?: number;
}): EngineFactory {
  const speed = opts.speed ?? 1;
  const LETTERS = ["A", "T", "C", "G"];
  const COMP = ["T", "A", "G", "C"];
  return (): Engine => {
    let W = 0;
    let H = 0;
    return {
      resize(w, h) {
        W = w;
        H = h;
      },
      frame(ctx, env) {
        const { t, palette, pointer, hover, still } = env;
        const midY = H / 2;
        const amp = H * 0.3;
        const k = (Math.PI * 2 * 2.2) / W; // ~2.2 turns across
        const spin = (still ? 0.6 : t) * speed * 1.4 * (hover ? 1.5 : 1);
        const strandCol = tone(palette, opts.strand);
        const cA = tone(palette, opts.pairA);
        const cB = tone(palette, opts.pairB);
        const flag = opts.flag ? tone(palette, opts.flag) : cB;
        const px = pointer.x * W;

        // the cursor is a replication fork — it unzips the helix so the
        // sequence can be read base by base
        const unzip = (x: number) =>
          pointer.active ? smoothstep(120, 24, Math.abs(x - px)) : 0;
        const gap = amp * 0.85;

        const yRaw = (x: number, off: number) =>
          midY + amp * Math.sin(x * k + spin + off);
        const yOf = (x: number, off: number) => {
          const u = unzip(x);
          const target = off === 0 ? midY - gap : midY + gap;
          return yRaw(x, off) * (1 - u) + target * u;
        };
        const depthOf = (x: number, off: number) => Math.cos(x * k + spin + off);

        // two strands
        for (const off of [0, Math.PI]) {
          ctx.beginPath();
          for (let x = 0; x <= W; x += 4) {
            const y = yOf(x, off);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = oklcha(strandCol, 0.55);
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }

        // base-pair rungs + nucleotide nodes
        const rungGap = 16;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (let x = rungGap / 2; x < W; x += rungGap) {
          const u = unzip(x);
          const y1 = yOf(x, 0);
          const y2 = yOf(x, Math.PI);
          const d1 = depthOf(x, 0); // >0 = front
          const pi = Math.floor(x / rungGap);
          const bi = (pi ^ (pi >> 2)) % 4; // which base lives here
          const mut = pi % 11 === 4; // a flagged mutation pair
          const pairCol = mut ? flag : pi % 2 === 0 ? cA : cB;
          const front = (d1 + 1) / 2; // 0..1

          if (u < 0.5) {
            // intact rung
            ctx.strokeStyle = oklcha(pairCol, (0.25 + front * 0.55) * (1 - u));
            ctx.lineWidth = 1 + front * 1.4;
            ctx.beginPath();
            ctx.moveTo(x, y1);
            ctx.lineTo(x, y2);
            ctx.stroke();
          } else {
            // broken pair — two stubs, and the bases become readable
            const stub = 7;
            ctx.strokeStyle = oklcha(pairCol, 0.7);
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(x, y1);
            ctx.lineTo(x, y1 + stub);
            ctx.moveTo(x, y2);
            ctx.lineTo(x, y2 - stub);
            ctx.stroke();
            const la = (u - 0.5) * 2;
            ctx.font = '10px "JetBrains Mono", monospace';
            ctx.fillStyle = oklcha(mut ? flag : pairCol, la);
            ctx.fillText(LETTERS[bi], x, y1 + stub + 8);
            ctx.fillText(COMP[bi], x, y2 - stub - 8);
          }

          for (const [y, near] of [
            [y1, d1 > 0],
            [y2, d1 <= 0],
          ] as const) {
            const r = near ? 2.6 : 1.4;
            ctx.fillStyle = oklcha(strandCol, near ? 0.95 : 0.4);
            ctx.beginPath();
            ctx.arc(x, y, r, 0, TAU);
            ctx.fill();
          }

          // mutation pairs pulse a lock-on ring even while zipped
          if (mut) {
            const pl = still ? 0.5 : 0.5 + 0.5 * Math.sin(t * 3 + pi);
            ctx.strokeStyle = oklcha(flag, 0.25 + pl * 0.45);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(x, (y1 + y2) / 2, 4 + pl * 3, 0, TAU);
            ctx.stroke();
          }
        }
      },
    };
  };
}

// ===========================================================================
// 04 · Network & Infrastructure — a living datacenter mesh + a firewall that
//      intercepts inbound threats. The topology is a spring network that warps
//      around the cursor; cyan data packets stream along the links; red threat
//      tracers fly in from outside and detonate at the firewall. Move the
//      cursor to shove the mesh aside and to steer where the attacks aim.
// ===========================================================================

type MNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hx: number; // home (rest) position
  hy: number;
  pulse: number; // lights up when traffic passes through
};
type Link = { a: number; b: number; rest: number };
type Flow = { link: number; p: number; sp: number; dir: number };
type Threat = { on: boolean; x: number; y: number; vx: number; vy: number };
type Spark = {
  on: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
};
type Hit = { on: boolean; y: number; age: number };

export function dataFlowNet(opts: {
  tint: Tint;
  packet: Tint;
  threat: Tint;
  density?: number;
}): EngineFactory {
  const density = opts.density ?? 1;
  const THREATS = 16;
  const SPARKS = 120;
  const HITS = 20;

  return (): Engine => {
    let W = 0;
    let H = 0;
    let nodes: MNode[] = [];
    let links: Link[] = [];
    let adj: number[][] = [];
    let flows: Flow[] = [];
    let ax: number[] = [];
    let ay: number[] = [];
    const threats: Threat[] = [];
    const sparks: Spark[] = [];
    const hits: Hit[] = [];
    let fwFlash = 0;
    let spawnAcc = 0;
    let seeded = false;
    let r = rng(41);

    const freeThreat = () => threats.find((t) => !t.on);
    const freeSpark = () => sparks.find((s) => !s.on);
    const freeHit = () => hits.find((h) => !h.on);

    const seed = () => {
      r = rng(41);
      const count = clamp(Math.round((W * H) / 10000 * density), 14, 32);
      nodes = [];
      for (let k = 0; k < count; k++) {
        const x = (0.08 + r() * 0.84) * W;
        const y = (0.14 + r() * 0.72) * H;
        nodes.push({ x, y, vx: 0, vy: 0, hx: x, hy: y, pulse: 0 });
      }
      ax = new Array(count).fill(0);
      ay = new Array(count).fill(0);

      // topology: wire each node to its 2–3 nearest neighbours
      links = [];
      adj = nodes.map(() => [] as number[]);
      const seen = new Set<string>();
      const order: Array<[number, number]> = [];
      for (let i = 0; i < count; i++) {
        order.length = 0;
        for (let j = 0; j < count; j++) {
          if (j === i) continue;
          order.push([
            j,
            Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y),
          ]);
        }
        order.sort((p, q) => p[1] - q[1]);
        const take = 2 + (r() < 0.35 ? 1 : 0);
        for (let s = 0; s < take && s < order.length; s++) {
          const j = order[s][0];
          const key = i < j ? `${i}:${j}` : `${j}:${i}`;
          if (seen.has(key)) continue;
          seen.add(key);
          const li = links.length;
          links.push({ a: i, b: j, rest: order[s][1] });
          adj[i].push(li);
          adj[j].push(li);
        }
      }

      flows = [];
      const nFlow = Math.min(links.length, Math.round(count * 0.9));
      for (let k = 0; k < nFlow; k++) {
        flows.push({
          link: Math.floor(r() * links.length),
          p: r(),
          sp: 0.35 + r() * 0.5,
          dir: r() < 0.5 ? 1 : -1,
        });
      }

      threats.length = 0;
      for (let k = 0; k < THREATS; k++)
        threats.push({ on: false, x: 0, y: 0, vx: 0, vy: 0 });
      sparks.length = 0;
      for (let k = 0; k < SPARKS; k++)
        sparks.push({ on: false, x: 0, y: 0, vx: 0, vy: 0, age: 0, life: 0 });
      hits.length = 0;
      for (let k = 0; k < HITS; k++) hits.push({ on: false, y: 0, age: 0 });

      fwFlash = 0;
      spawnAcc = 0;
      seeded = true;
    };

    return {
      resize(w, h) {
        W = w;
        H = h;
        seed();
      },
      frame(ctx, env) {
        if (!seeded) seed();
        const { dt, palette, pointer, hover, still } = env;
        const edge = tone(palette, opts.tint);
        const pkt = tone(palette, opts.packet);
        const bad = tone(palette, opts.threat);
        const cx = W * 0.5;
        const px = pointer.x * W;
        const py = pointer.y * H;
        const step = Math.min(0.033, dt);

        // ---- physics: the mesh warps around the cursor -------------------
        if (!still) {
          for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            let fx = (n.hx - n.x) * 3.4; // spring back home
            let fy = (n.hy - n.y) * 3.4;
            if (pointer.active) {
              const dx = n.x - px;
              const dy = n.y - py;
              const d = Math.hypot(dx, dy);
              const R = 155;
              if (d < R && d > 0.01) {
                const f = 1 - d / R;
                const s = 2300 * f * f; // shove the mesh aside
                fx += (dx / d) * s;
                fy += (dy / d) * s;
              }
            }
            // short-range repulsion so nodes don't collapse together
            for (let j = 0; j < nodes.length; j++) {
              if (j === i) continue;
              const m = nodes[j];
              const dx = n.x - m.x;
              const dy = n.y - m.y;
              const d2 = dx * dx + dy * dy;
              if (d2 < 62 * 62 && d2 > 0.01) {
                const d = Math.sqrt(d2);
                const s = (1 - d / 62) * 420;
                fx += (dx / d) * s;
                fy += (dy / d) * s;
              }
            }
            ax[i] = fx;
            ay[i] = fy;
          }
          // link springs pull connected nodes toward their rest length
          for (const L of links) {
            const a = nodes[L.a];
            const b = nodes[L.b];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const d = Math.hypot(dx, dy) || 0.01;
            const f = (d - L.rest) * 9 * 0.5;
            const ux = dx / d;
            const uy = dy / d;
            ax[L.a] += ux * f;
            ay[L.a] += uy * f;
            ax[L.b] -= ux * f;
            ay[L.b] -= uy * f;
          }
          // integrate (heavy damping keeps the spring net stable)
          for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            n.vx = (n.vx + ax[i] * step) * 0.9;
            n.vy = (n.vy + ay[i] * step) * 0.9;
            const sp = Math.hypot(n.vx, n.vy);
            if (sp > 520) {
              n.vx = (n.vx / sp) * 520;
              n.vy = (n.vy / sp) * 520;
            }
            n.x = clamp(n.x + n.vx * step, 2, W - 2);
            n.y = clamp(n.y + n.vy * step, 2, H - 2);
            n.pulse = Math.max(0, n.pulse - step * 2.2);
          }
        }

        // ---- links (glow + tint as they stretch) -------------------------
        ctx.lineWidth = 1;
        for (const L of links) {
          const a = nodes[L.a];
          const b = nodes[L.b];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          const stretch = clamp((d - L.rest) / (L.rest + 1), 0, 1);
          const col = stretch > 0.25 ? mix(edge, pkt, stretch) : edge;
          ctx.strokeStyle = oklcha(
            col,
            0.16 + stretch * 0.42 + (hover ? 0.08 : 0),
          );
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        // ---- firewall ----------------------------------------------------
        const fwA = 0.3 + fwFlash * 0.55;
        const drawFw = () => {
          ctx.setLineDash([2, 6]);
          ctx.strokeStyle = oklcha(pkt, fwA);
          ctx.lineWidth = 1 + fwFlash * 1.6;
          ctx.beginPath();
          ctx.moveTo(cx, H * 0.04);
          ctx.lineTo(cx, H * 0.96);
          ctx.stroke();
          ctx.setLineDash([]);
        };
        if (fwFlash > 0.05) glow(ctx, oklcha(pkt, 0.85), 10, drawFw);
        else drawFw();
        if (!still) fwFlash = Math.max(0, fwFlash - step * 2.4);

        // ---- legit traffic streaming along the links ---------------------
        for (const pk of flows) {
          const L = links[pk.link];
          if (!L) continue;
          const a = nodes[L.a];
          const b = nodes[L.b];
          if (!still) pk.p += pk.sp * step * pk.dir;
          if (pk.p >= 1 || pk.p <= 0) {
            const at = pk.p >= 1 ? L.b : L.a;
            nodes[at].pulse = 1; // arriving traffic lights the node
            const opt = adj[at];
            const nl = opt.length ? opt[Math.floor(r() * opt.length)] : pk.link;
            pk.link = nl;
            const NL = links[nl];
            if (NL.a === at) {
              pk.dir = 1;
              pk.p = 0;
            } else {
              pk.dir = -1;
              pk.p = 1;
            }
            continue;
          }
          const x = a.x + (b.x - a.x) * pk.p;
          const y = a.y + (b.y - a.y) * pk.p;
          const tp = pk.p - 0.14 * pk.dir;
          const txp = a.x + (b.x - a.x) * tp;
          const typ = a.y + (b.y - a.y) * tp;
          ctx.strokeStyle = oklcha(pkt, 0.5);
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(txp, typ);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.fillStyle = oklcha(pkt, 0.95);
          ctx.beginPath();
          ctx.arc(x, y, 1.8, 0, TAU);
          ctx.fill();
        }

        // ---- nodes -------------------------------------------------------
        for (const n of nodes) {
          const pr = 2 + n.pulse * 3.2;
          if (n.pulse > 0.05) {
            glow(ctx, oklcha(pkt, 0.8), 8, () => {
              ctx.fillStyle = oklcha(mix(edge, pkt, n.pulse), 0.92);
              ctx.beginPath();
              ctx.arc(n.x, n.y, pr, 0, TAU);
              ctx.fill();
            });
          } else {
            ctx.fillStyle = oklcha(edge, 0.75);
            ctx.beginPath();
            ctx.arc(n.x, n.y, pr, 0, TAU);
            ctx.fill();
          }
        }

        // ---- spawn + fly inbound threats ---------------------------------
        if (!still) {
          spawnAcc += step;
          const rate = hover ? 0.32 : 0.62;
          while (spawnAcc > rate) {
            spawnAcc -= rate;
            const th = freeThreat();
            if (th) {
              th.on = true;
              th.x = -10;
              th.y = (0.12 + r() * 0.76) * H;
              const tx = W * (0.72 + r() * 0.26);
              const ty = pointer.active ? py : (0.12 + r() * 0.76) * H;
              const dx = tx - th.x;
              const dy = ty - th.y;
              const d = Math.hypot(dx, dy) || 1;
              const sp = 150 + r() * 120;
              th.vx = (dx / d) * sp;
              th.vy = (dy / d) * sp;
            }
          }
        }
        for (const th of threats) {
          if (!th.on) continue;
          if (!still) {
            th.x += th.vx * step;
            th.y += th.vy * step;
          }
          if (th.x >= cx) {
            // intercepted — detonate at the firewall
            th.on = false;
            fwFlash = 1;
            const hit = freeHit();
            if (hit) {
              hit.on = true;
              hit.y = th.y;
              hit.age = 0;
            }
            for (let s = 0; s < 12; s++) {
              const sk = freeSpark();
              if (!sk) break;
              const ang = r() * TAU;
              const spd = 60 + r() * 190;
              sk.on = true;
              sk.x = cx;
              sk.y = th.y;
              sk.vx = Math.cos(ang) * spd - 40; // repelled back to the left
              sk.vy = Math.sin(ang) * spd;
              sk.age = 0;
              sk.life = 0.35 + r() * 0.35;
            }
            continue;
          }
          if (th.x > W + 20 || th.y < -20 || th.y > H + 20) {
            th.on = false;
            continue;
          }
          glow(ctx, oklcha(bad, 0.9), 8, () => {
            ctx.strokeStyle = oklcha(bad, 0.9);
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(th.x - th.vx * 0.03, th.y - th.vy * 0.03);
            ctx.lineTo(th.x, th.y);
            ctx.stroke();
            ctx.fillStyle = oklcha(bad, 1);
            ctx.beginPath();
            ctx.arc(th.x, th.y, 2.2, 0, TAU);
            ctx.fill();
          });
        }

        // ---- firewall impact rings ---------------------------------------
        for (const hit of hits) {
          if (!hit.on) continue;
          if (!still) hit.age += step;
          const life = 0.6;
          if (hit.age > life) {
            hit.on = false;
            continue;
          }
          const p = hit.age / life;
          ctx.strokeStyle = oklcha(pkt, (1 - p) * 0.8);
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(cx, hit.y, 2 + p * 16, 0, TAU);
          ctx.stroke();
        }

        // ---- burst sparks ------------------------------------------------
        for (const sk of sparks) {
          if (!sk.on) continue;
          if (!still) {
            sk.x += sk.vx * step;
            sk.y += sk.vy * step;
            sk.vx *= 0.92;
            sk.vy *= 0.92;
            sk.age += step;
          }
          if (sk.age > sk.life) {
            sk.on = false;
            continue;
          }
          const a = 1 - sk.age / sk.life;
          ctx.fillStyle = oklcha(bad, a);
          ctx.beginPath();
          ctx.arc(sk.x, sk.y, 1.6 * a + 0.5, 0, TAU);
          ctx.fill();
        }

        // ---- cursor force field ------------------------------------------
        if (pointer.active && !still) {
          ctx.strokeStyle = oklcha(pkt, 0.22);
          ctx.setLineDash([2, 5]);
          ctx.beginPath();
          ctx.arc(px, py, 26, 0, TAU);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      },
    };
  };
}

// ===========================================================================
// 05 · Finance & Risk — a scrolling candlestick chart under a limit
// ===========================================================================

type Candle = { o: number; h: number; l: number; c: number; v: number };

export function candlestick(opts: {
  up: Tint;
  down: Tint;
  limit: Tint;
  speed?: number;
}): EngineFactory {
  const speed = opts.speed ?? 1;
  return (): Engine => {
    let W = 0;
    let H = 0;
    let candles: Candle[] = [];
    let n = 0;
    let last = 50;
    let r = rng(3);
    let lastT = 0;
    let seeded = false;

    const next = (): Candle => {
      const o = last;
      const drift = (r() - 0.48) * 9;
      const c = clamp(o + drift, 8, 92);
      const h = Math.max(o, c) + r() * 5;
      const l = Math.min(o, c) - r() * 5;
      last = c;
      return { o, h, l, c, v: 0.25 + r() * 0.75 };
    };

    const seed = () => {
      r = rng(3);
      last = 50;
      const pitch = 13;
      n = clamp(Math.floor(W / pitch), 6, 40);
      candles = [];
      for (let i = 0; i < n + 1; i++) candles.push(next());
      seeded = true;
      lastT = 0;
    };

    return {
      resize(w, h) {
        W = w;
        H = h;
        seed();
      },
      frame(ctx, env) {
        if (!seeded) seed();
        const { t, palette, pointer, hover, still } = env;
        const up = tone(palette, opts.up);
        const down = tone(palette, opts.down);
        const lim = tone(palette, opts.limit);

        const interval = (hover ? 0.5 : 0.85) / speed;
        if (lastT === 0) lastT = t;
        let guard = 0;
        while (!still && t - lastT > interval && guard++ < 4) {
          candles.shift();
          candles.push(next());
          lastT += interval;
        }
        const frac = still ? 0 : clamp((t - lastT) / interval, 0, 1);

        // price range across the visible window
        let min = Infinity;
        let max = -Infinity;
        for (const cd of candles) {
          if (cd.l < min) min = cd.l;
          if (cd.h > max) max = cd.h;
        }
        const pad = 10;
        const range = Math.max(1, max - min);
        const yOf = (p: number) => pad + ((max - p) / range) * (H - 2 * pad);
        const pitch = W / n;
        const bw = Math.max(3, pitch * 0.55);

        // risk limit line (near the top of the window) — it flares while any
        // recent candle is in breach
        const limitP = max - range * 0.12;
        const ly = yOf(limitP);
        let inBreach = false;
        for (let i = Math.max(0, candles.length - 3); i < candles.length; i++)
          if (candles[i].h > limitP) inBreach = true;
        const drawLimit = () => {
          ctx.setLineDash([4, 5]);
          ctx.strokeStyle = oklcha(lim, inBreach ? 0.9 : 0.6);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, ly);
          ctx.lineTo(W, ly);
          ctx.stroke();
          ctx.setLineDash([]);
        };
        if (inBreach) glow(ctx, oklcha(lim, 0.8), 8, drawLimit);
        else drawLimit();

        for (let i = 0; i < candles.length; i++) {
          const cd = candles[i];
          const x = i * pitch - frac * pitch + pitch / 2;
          if (x < -bw || x > W + bw) continue;
          const bull = cd.c >= cd.o;
          const breach = cd.h > limitP;
          const col = breach ? lim : bull ? up : down;
          // wick
          ctx.strokeStyle = oklcha(col, 0.8);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, yOf(cd.h));
          ctx.lineTo(x, yOf(cd.l));
          ctx.stroke();
          // body
          const yo = yOf(cd.o);
          const yc = yOf(cd.c);
          const top = Math.min(yo, yc);
          const bh = Math.max(1.5, Math.abs(yc - yo));
          const draw = () => {
            ctx.fillStyle = oklcha(col, breach ? 0.95 : 0.8);
            ctx.fillRect(x - bw / 2, top, bw, bh);
          };
          if (breach) glow(ctx, oklcha(lim, 0.9), 8, draw);
          else draw();
          // the counterexample marker over a breaching candle
          if (breach) {
            ctx.font = '10px "JetBrains Mono", monospace';
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = oklcha(lim, 0.95);
            ctx.fillText("✗", x, yOf(cd.h) - 9);
          }
          // volume footprint along the bottom
          const vh = cd.v * H * 0.1;
          ctx.fillStyle = oklcha(bull ? up : down, 0.3);
          ctx.fillRect(x - bw / 2, H - 3 - vh, bw, vh);
        }

        // 5-period moving average — the mandate's expected trajectory
        ctx.strokeStyle = oklcha(palette.dim, 0.55);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        let started = false;
        for (let i = 4; i < candles.length; i++) {
          let sum = 0;
          for (let j = i - 4; j <= i; j++) sum += candles[j].c;
          const x = i * pitch - frac * pitch + pitch / 2;
          const y = yOf(sum / 5);
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // cursor crosshair + an inspection bracket on the candle underneath
        if (pointer.active) {
          const hi = Math.round((pointer.x * W + frac * pitch) / pitch - 0.5);
          if (hi >= 0 && hi < candles.length) {
            const cd = candles[hi];
            const x = hi * pitch - frac * pitch + pitch / 2;
            const yT = yOf(cd.h) - 5;
            const yB = yOf(cd.l) + 5;
            ctx.strokeStyle = oklcha(lim, 0.75);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x - bw, yT);
            ctx.lineTo(x + bw, yT);
            ctx.moveTo(x - bw, yB);
            ctx.lineTo(x + bw, yB);
            ctx.stroke();
          }
          ctx.strokeStyle = oklcha(palette.dim, 0.4);
          ctx.setLineDash([2, 4]);
          ctx.beginPath();
          ctx.moveTo(pointer.x * W, 0);
          ctx.lineTo(pointer.x * W, H);
          ctx.moveTo(0, pointer.y * H);
          ctx.lineTo(W, pointer.y * H);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      },
    };
  };
}

// ===========================================================================
// 06 · Legal & Regulatory — citation arcs cross-referencing provisions
// ===========================================================================

type Arc = {
  a: number;
  b: number;
  phase: number;
  dur: number;
  conflict: boolean;
};

export function citationArcs(opts: {
  tint: Tint;
  accent: Tint;
  /** color of conflicting cross-references */
  conflict?: Tint;
  speed?: number;
}): EngineFactory {
  const speed = opts.speed ?? 1;
  return (): Engine => {
    let W = 0;
    let H = 0;
    let left: number[] = [];
    let right: number[] = [];
    let leftLabels: string[] = [];
    let rightLabels: string[] = [];
    let arcs: Arc[] = [];
    let seeded = false;

    const seed = () => {
      const r = rng(11);
      const nSide = 6;
      left = [];
      right = [];
      leftLabels = [];
      rightLabels = [];
      for (let i = 0; i < nSide; i++) {
        left.push(H * (0.12 + (0.76 * i) / (nSide - 1)));
        right.push(H * (0.12 + (0.76 * i) / (nSide - 1)));
        leftLabels.push(`§ ${i + 2}.${1 + ((i * 7) % 9)}`);
        rightLabels.push(`art. ${i + 4}(${1 + (i % 4)})`);
      }
      arcs = [];
      for (let i = 0; i < 11; i++) {
        arcs.push({
          a: Math.floor(r() * nSide),
          b: Math.floor(r() * nSide),
          phase: r(),
          dur: 2.2 + r() * 2.5,
          conflict: r() < 0.24,
        });
      }
      seeded = true;
    };

    return {
      resize(w, h) {
        W = w;
        H = h;
        seed();
      },
      frame(ctx, env) {
        if (!seeded) seed();
        const { dt, palette, pointer, hover, still } = env;
        const base = tone(palette, opts.tint);
        const acc = tone(palette, opts.accent);
        const bad = opts.conflict ? tone(palette, opts.conflict) : acc;
        const lx = W * 0.16;
        const rx = W * 0.84;
        const px = pointer.x * W;
        const py = pointer.y * H;

        // which provision is the cursor interrogating?
        let hlSide = -1;
        let hlIdx = -1;
        if (pointer.active) {
          let bd = 52;
          for (let i = 0; i < left.length; i++) {
            const d = Math.hypot(px - lx, py - left[i]);
            if (d < bd) {
              bd = d;
              hlSide = 0;
              hlIdx = i;
            }
          }
          for (let i = 0; i < right.length; i++) {
            const d = Math.hypot(px - rx, py - right[i]);
            if (d < bd) {
              bd = d;
              hlSide = 1;
              hlIdx = i;
            }
          }
        }
        const anyHl = hlIdx >= 0;

        // provision ticks + citations to statute / regulation labels
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.textBaseline = "middle";
        for (let i = 0; i < left.length; i++) {
          const y = left[i];
          const hl = hlSide === 0 && hlIdx === i;
          ctx.strokeStyle = oklcha(base, hl ? 0.9 : 0.4);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(lx - 8, y);
          ctx.lineTo(lx, y);
          ctx.stroke();
          ctx.fillStyle = oklcha(base, hl ? 1 : 0.7);
          ctx.beginPath();
          ctx.arc(lx, y, hl ? 3 : 2, 0, TAU);
          ctx.fill();
          ctx.textAlign = "right";
          ctx.fillStyle = oklcha(base, hl ? 0.95 : 0.45);
          ctx.fillText(leftLabels[i], lx - 12, y);
        }
        for (let i = 0; i < right.length; i++) {
          const y = right[i];
          const hl = hlSide === 1 && hlIdx === i;
          ctx.strokeStyle = oklcha(base, hl ? 0.9 : 0.4);
          ctx.beginPath();
          ctx.moveTo(rx, y);
          ctx.lineTo(rx + 8, y);
          ctx.stroke();
          ctx.fillStyle = oklcha(base, hl ? 1 : 0.7);
          ctx.beginPath();
          ctx.arc(rx, y, hl ? 3 : 2, 0, TAU);
          ctx.fill();
          ctx.textAlign = "left";
          ctx.fillStyle = oklcha(base, hl ? 0.95 : 0.45);
          ctx.fillText(rightLabels[i], rx + 12, y);
        }

        const bez = (u: number, p0: number, p1: number, p2: number) =>
          (1 - u) * (1 - u) * p0 + 2 * (1 - u) * u * p1 + u * u * p2;

        ctx.textAlign = "center";
        for (const arc of arcs) {
          if (!still) arc.phase += (dt / arc.dur) * speed;
          const u = arc.phase % 1;
          const y1 = left[arc.a];
          const y2 = right[arc.b];
          const cx = W * 0.5 + (still ? 0 : Math.sin(arc.phase) * 12);
          const cyc = (y1 + y2) / 2 + (y1 - y2) * 0.15;
          const col = arc.conflict ? bad : acc;

          // interrogation: arcs touching the hovered provision surge,
          // everything else recedes
          const touched =
            (hlSide === 0 && arc.a === hlIdx) ||
            (hlSide === 1 && arc.b === hlIdx);
          const baseA = anyHl ? (touched ? 0.55 : 0.05) : 0.14;

          ctx.strokeStyle = oklcha(arc.conflict ? bad : base, baseA);
          ctx.lineWidth = touched ? 1.4 : 1;
          if (arc.conflict) ctx.setLineDash([3, 4]);
          ctx.beginPath();
          ctx.moveTo(lx, y1);
          ctx.quadraticCurveTo(cx, cyc, rx, y2);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.lineWidth = 1;

          // a comet tracing the citation
          const steps = 6;
          for (let s = 0; s < steps; s++) {
            const uu = u - s * 0.02;
            if (uu < 0 || uu > 1) continue;
            const x = bez(uu, lx, cx, rx);
            const y = bez(uu, y1, cyc, y2);
            const a =
              (1 - s / steps) *
              (0.5 + (hover ? 0.3 : 0) + (touched ? 0.2 : 0));
            ctx.fillStyle = oklcha(col, a);
            ctx.beginPath();
            ctx.arc(x, y, 1.8 - s * 0.15, 0, TAU);
            ctx.fill();
          }
          // arrival: a conflict lands as an ✗, a clean citation as a flash
          if (u > 0.96) {
            if (arc.conflict) {
              ctx.font = '10px "JetBrains Mono", monospace';
              ctx.fillStyle = oklcha(bad, 1);
              ctx.fillText("✗", rx - 9, y2 - 9);
              ctx.font = '9px "JetBrains Mono", monospace';
            } else {
              glow(ctx, oklcha(acc, 0.9), 8, () => {
                ctx.fillStyle = oklcha(acc, 1);
                ctx.beginPath();
                ctx.arc(rx, y2, 3, 0, TAU);
                ctx.fill();
              });
            }
          }
        }
      },
    };
  };
}

// ===========================================================================
// 07 · Data Protection & Privacy — binary rain masking into redaction blocks
// ===========================================================================

export function redactionRain(opts: {
  tint: Tint;
  mask: Tint;
  cell?: number;
  speed?: number;
}): EngineFactory {
  const cell = opts.cell ?? 14;
  const speed = opts.speed ?? 1;

  return (): Engine => {
    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;
    let heads: number[] = [];
    let spd: number[] = [];
    let fontPx = cell;

    const seed = () => {
      const r = rng(23);
      cols = Math.max(1, Math.floor(W / cell));
      rows = Math.max(1, Math.floor(H / cell));
      fontPx = cell * 0.92;
      heads = [];
      spd = [];
      for (let c = 0; c < cols; c++) {
        heads.push(-r() * rows);
        spd.push(4 + r() * 6);
      }
    };

    const hash = (c: number, row: number) =>
      ((c * 73856093) ^ (row * 19349663)) >>> 0;

    // the "raw values" readable under the authorized-access lens
    const HEXSET = "a7f39ce04b81d265";

    return {
      resize(w, h) {
        W = w;
        H = h;
        seed();
      },
      frame(ctx, env) {
        const { t, dt, palette, pointer, still } = env;
        const green = tone(palette, opts.tint);
        const mask = tone(palette, opts.mask);
        ctx.font = `${fontPx.toFixed(1)}px "JetBrains Mono", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const cw = W / cols;
        const ch = H / rows;
        const trail = 9;
        const px = pointer.x * W;
        const py = pointer.y * H;

        for (let c = 0; c < cols; c++) {
          if (!still) {
            heads[c] += spd[c] * speed * dt;
            if (heads[c] - trail > rows) heads[c] = -2;
          } else {
            heads[c] = (c % 5) + rows * 0.4;
          }
          const head = heads[c];
          for (let k = 0; k < trail; k++) {
            const row = Math.floor(head) - k;
            if (row < 0 || row >= rows) continue;
            const x = (c + 0.5) * cw;
            const y = (row + 0.5) * ch;
            const bright = 1 - k / trail;

            // is this a redacted (PII) cell?
            const redacted = hash(c, row) % 4 === 0;
            // the cursor reveals raw values within its radius
            const revealed =
              pointer.active && Math.hypot(x - px, y - py) < 70;

            if (redacted && !revealed) {
              ctx.fillStyle = oklcha(mask, 0.25 + bright * 0.6);
              const s = cw * 0.62;
              ctx.fillRect(x - s / 2, y - ch * 0.34, s, ch * 0.62);
            } else if (redacted) {
              // authorized view — the raw value, readable only in the lens
              const raw = HEXSET[hash(c, row) % HEXSET.length];
              const drawRaw = () => {
                ctx.fillStyle = oklcha(mask, 0.5 + bright * 0.5);
                ctx.fillText(raw, x, y);
              };
              if (k === 0) glow(ctx, oklcha(mask, 0.8), 6, drawRaw);
              else drawRaw();
            } else {
              const digit = (hash(c, row + Math.floor(t * 6)) & 1).toString();
              const col = k === 0 ? green : green;
              const a = k === 0 ? 1 : 0.15 + bright * 0.55;
              if (k === 0)
                glow(ctx, oklcha(green, 0.8), 6, () => {
                  ctx.fillStyle = oklcha(col, 1);
                  ctx.fillText(digit, x, y);
                });
              else {
                ctx.fillStyle = oklcha(col, a);
                ctx.fillText(digit, x, y);
              }
            }
          }
        }

        // the authorized-access lens
        if (pointer.active) {
          ctx.strokeStyle = oklcha(mask, 0.55);
          ctx.setLineDash([3, 6]);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(px, py, 70, 0, TAU);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      },
    };
  };
}

// ===========================================================================
// 08 · Export Control & Sanctions — a radar sweep screening entities
// ===========================================================================

type Blip = { r: number; ang: number; drift: number; flagged: boolean };

export function radarSweep(opts: {
  tint: Tint;
  flag: Tint;
  speed?: number;
}): EngineFactory {
  const speed = opts.speed ?? 1;
  return (): Engine => {
    let W = 0;
    let H = 0;
    let cx = 0;
    let cy = 0;
    let maxR = 0;
    let blips: Blip[] = [];

    const seed = () => {
      const r = rng(29);
      cx = W / 2;
      cy = H / 2;
      maxR = Math.min(W, H) * 0.46;
      blips = [];
      for (let i = 0; i < 9; i++) {
        blips.push({
          r: (0.25 + r() * 0.72) * maxR,
          ang: r() * TAU,
          drift: (r() - 0.5) * 0.14,
          flagged: r() < 0.3,
        });
      }
    };

    return {
      resize(w, h) {
        W = w;
        H = h;
        seed();
      },
      frame(ctx, env) {
        const { t, dt, palette, pointer, hover, still } = env;
        const green = tone(palette, opts.tint);
        const red = tone(palette, opts.flag);
        const sweep = (still ? 0.7 : t * (hover ? 1.5 : 1) * speed) % TAU;

        // range rings + crosshair
        ctx.strokeStyle = oklcha(green, 0.18);
        ctx.lineWidth = 1;
        for (let i = 1; i <= 3; i++) {
          ctx.beginPath();
          ctx.arc(cx, cy, (maxR * i) / 3, 0, TAU);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(cx - maxR, cy);
        ctx.lineTo(cx + maxR, cy);
        ctx.moveTo(cx, cy - maxR);
        ctx.lineTo(cx, cy + maxR);
        ctx.stroke();

        // bearing ticks around the rim
        for (let i = 0; i < 36; i++) {
          const a = (TAU * i) / 36;
          const major = i % 9 === 0;
          const r1 = maxR - (major ? 9 : 4);
          ctx.strokeStyle = oklcha(green, major ? 0.4 : 0.2);
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
          ctx.lineTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
          ctx.stroke();
        }

        // trailing sweep wedge (conic gradient)
        if (!still && typeof ctx.createConicGradient === "function") {
          const g = ctx.createConicGradient(sweep - 0.9, cx, cy);
          g.addColorStop(0, oklcha(green, 0));
          g.addColorStop(0.82, oklcha(green, 0));
          g.addColorStop(0.99, oklcha(green, 0.28));
          g.addColorStop(1, oklcha(green, 0.4));
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, maxR, 0, TAU);
          ctx.fill();
        }

        // sweep line
        glow(ctx, oklcha(green, 0.8), 8, () => {
          ctx.strokeStyle = oklcha(green, 0.85);
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(sweep) * maxR, cy + Math.sin(sweep) * maxR);
          ctx.stroke();
        });

        // blips: entities drift slowly and brighten as the beam passes
        for (const b of blips) {
          if (!still) b.ang += b.drift * dt;
          let d = sweep - b.ang;
          d = ((d % TAU) + TAU) % TAU; // 0..TAU since last pass
          const lit = still ? 0.7 : Math.exp(-d * 2.2);
          const x = cx + Math.cos(b.ang) * b.r;
          const y = cy + Math.sin(b.ang) * b.r;
          const col = b.flagged ? red : green;
          const a = 0.15 + lit * 0.85;
          if (lit > 0.25) {
            glow(ctx, oklcha(col, a), b.flagged ? 12 : 7, () => {
              ctx.fillStyle = oklcha(col, a);
              ctx.beginPath();
              ctx.arc(x, y, b.flagged ? 3 : 2.2, 0, TAU);
              ctx.fill();
            });
          } else {
            ctx.fillStyle = oklcha(col, a);
            ctx.beginPath();
            ctx.arc(x, y, b.flagged ? 3 : 2.2, 0, TAU);
            ctx.fill();
          }
          // verdicts: flagged entities lock on with an ✗, cleared get a ✓
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          if (b.flagged && lit > 0.4) {
            ctx.strokeStyle = oklcha(red, lit * 0.7);
            ctx.beginPath();
            ctx.arc(x, y, 5 + (1 - lit) * 6, 0, TAU);
            ctx.stroke();
            ctx.fillStyle = oklcha(red, lit);
            ctx.fillText("✗", x + 9, y - 9);
          } else if (!b.flagged && lit > 0.35 && lit < 0.95) {
            ctx.fillStyle = oklcha(green, lit * 0.8);
            ctx.fillText("✓", x + 8, y - 8);
          }
        }

        // cursor interrogation reticle — hover an entity to inspect it
        if (pointer.active) {
          const rpx = pointer.x * W;
          const rpy = pointer.y * H;
          ctx.strokeStyle = oklcha(green, 0.25);
          ctx.setLineDash([3, 5]);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(rpx, rpy);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.strokeStyle = oklcha(green, 0.6);
          ctx.beginPath();
          ctx.arc(rpx, rpy, 9, 0, TAU);
          ctx.stroke();
          // lock onto the nearest entity
          let bi = -1;
          let bd = 46;
          for (let i = 0; i < blips.length; i++) {
            const bx = cx + Math.cos(blips[i].ang) * blips[i].r;
            const by = cy + Math.sin(blips[i].ang) * blips[i].r;
            const dd = Math.hypot(bx - rpx, by - rpy);
            if (dd < bd) {
              bd = dd;
              bi = i;
            }
          }
          if (bi >= 0) {
            const b = blips[bi];
            const bx = cx + Math.cos(b.ang) * b.r;
            const by = cy + Math.sin(b.ang) * b.r;
            const col = b.flagged ? red : green;
            glow(ctx, oklcha(col, 0.9), 8, () => {
              ctx.strokeStyle = oklcha(col, 0.95);
              ctx.strokeRect(bx - 8, by - 8, 16, 16);
            });
            ctx.strokeStyle = oklcha(col, 0.5);
            ctx.beginPath();
            ctx.moveTo(rpx, rpy);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      },
    };
  };
}
