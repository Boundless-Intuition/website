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
        const y0 = H * 0.6;
        const amp = H * 0.34;
        const beats = 2.3;
        const rate = (hover ? 1.7 : 1) * speed * 0.5;
        const step = 2;
        const glowCol = oklcha(col, 0.9);

        const sampleY = (x: number) => {
          const phase = (x / W) * beats + (still ? 0.2 : t * rate);
          const u = phase - Math.floor(phase);
          const jitter = field(x * 0.02, 0, t * 2) * 0.02;
          return y0 - amp * (ecgWave(u) + jitter);
        };

        // baseline
        ctx.strokeStyle = oklcha(col, 0.12);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y0);
        ctx.lineTo(W, y0);
        ctx.stroke();

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
        const midY = H / 2;
        const amp = H * 0.3;
        const k = (Math.PI * 2 * 2.2) / W; // ~2.2 turns across
        const spin = (still ? 0.6 : t) * speed * 1.4 * (hover ? 1.5 : 1);
        const tilt = pointer.active ? (pointer.y - 0.5) * 0.6 : 0;
        const strandCol = tone(palette, opts.strand);
        const cA = tone(palette, opts.pairA);
        const cB = tone(palette, opts.pairB);

        const yOf = (x: number, off: number) =>
          midY + amp * Math.sin(x * k + spin + off) * (1 - tilt * (x / W - 0.5));
        const depthOf = (x: number, off: number) => Math.cos(x * k + spin + off);

        // two strands
        for (const off of [0, Math.PI]) {
          ctx.beginPath();
          for (let x = 0; x <= W; x += 5) {
            const y = yOf(x, off);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = oklcha(strandCol, 0.5);
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }

        // base-pair rungs + nucleotide nodes
        const rungGap = 16;
        for (let x = rungGap / 2; x < W; x += rungGap) {
          const y1 = yOf(x, 0);
          const y2 = yOf(x, Math.PI);
          const d1 = depthOf(x, 0); // >0 = front
          const pairCol = Math.floor(x / rungGap) % 2 === 0 ? cA : cB;
          const front = (d1 + 1) / 2; // 0..1
          ctx.strokeStyle = oklcha(pairCol, 0.25 + front * 0.55);
          ctx.lineWidth = 1 + front * 1.4;
          ctx.beginPath();
          ctx.moveTo(x, y1);
          ctx.lineTo(x, y2);
          ctx.stroke();

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
        }
      },
    };
  };
}

// ===========================================================================
// 04 · Network & Infrastructure — packets flowing across a firewall boundary
// ===========================================================================

type Node = { x: number; y: number; vx: number; vy: number };
type Packet = { a: number; b: number; p: number; sp: number; side: number };
type Flash = { x: number; y: number; age: number };

export function dataFlowNet(opts: {
  tint: Tint;
  packet: Tint;
  density?: number;
  link?: number;
}): EngineFactory {
  const density = opts.density ?? 1;
  const link = opts.link ?? 96;

  return (): Engine => {
    let W = 0;
    let H = 0;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    const flashes: Flash[] = [];
    let seeded = false;
    let r = rng(1);

    const neighbor = (i: number, notB: number): number => {
      let best = -1;
      let bestD = link;
      for (let j = 0; j < nodes.length; j++) {
        if (j === i || j === notB) continue;
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d < bestD && r() < 0.7) {
          best = j;
          bestD = d;
        }
      }
      return best === -1 ? (i + 1) % nodes.length : best;
    };

    const seed = () => {
      r = rng(7);
      const count = clamp(Math.round((W * H) / 9000 * density), 12, 40);
      nodes = [];
      for (let k = 0; k < count; k++) {
        nodes.push({
          x: r() * W,
          y: r() * H,
          vx: (r() - 0.5) * 22,
          vy: (r() - 0.5) * 22,
        });
      }
      packets = [];
      for (let k = 0; k < Math.min(10, count); k++) {
        const a = Math.floor(r() * count);
        const b = neighbor(a, -1);
        packets.push({ a, b, p: r(), sp: 0.5 + r() * 0.7, side: 0 });
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
        const edge = tone(palette, opts.tint);
        const pkt = tone(palette, opts.packet);
        const bx = W * 0.5;
        const px = pointer.x * W;
        const py = pointer.y * H;

        if (!still) {
          for (const n of nodes) {
            n.x += n.vx * dt;
            n.y += n.vy * dt;
            if (pointer.active) {
              const dx = px - n.x;
              const dy = py - n.y;
              const d = Math.hypot(dx, dy);
              if (d < 120 && d > 1) {
                const f = (1 - d / 120) * 24;
                n.vx += (dx / d) * f * dt;
                n.vy += (dy / d) * f * dt;
              }
            }
            const s = Math.hypot(n.vx, n.vy);
            if (s > 26) {
              n.vx = (n.vx / s) * 26;
              n.vy = (n.vy / s) * 26;
            }
            if (n.x < 0) n.x += W;
            else if (n.x > W) n.x -= W;
            if (n.y < 0) n.y += H;
            else if (n.y > H) n.y -= H;
          }
        }

        // edges
        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d > link) continue;
            ctx.strokeStyle = oklcha(edge, (1 - d / link) * (hover ? 0.4 : 0.26));
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // firewall boundary
        ctx.setLineDash([3, 5]);
        ctx.strokeStyle = oklcha(pkt, 0.45);
        ctx.beginPath();
        ctx.moveTo(bx, H * 0.06);
        ctx.lineTo(bx, H * 0.94);
        ctx.stroke();
        ctx.setLineDash([]);

        // packets travelling along links
        for (const pk of packets) {
          const a = nodes[pk.a];
          const b = nodes[pk.b];
          if (!still) pk.p += pk.sp * dt;
          if (pk.p >= 1) {
            pk.p = 0;
            pk.a = pk.b;
            pk.b = neighbor(pk.a, pk.a);
          }
          const x = a.x + (b.x - a.x) * pk.p;
          const y = a.y + (b.y - a.y) * pk.p;
          const side = x < bx ? -1 : 1;
          if (side !== pk.side && pk.side !== 0 && !still) {
            flashes.push({ x: bx, y, age: 0 });
            if (flashes.length > 20) flashes.shift();
          }
          pk.side = side;
          glow(ctx, oklcha(pkt, 0.9), 8, () => {
            ctx.fillStyle = oklcha(pkt, 1);
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, TAU);
            ctx.fill();
          });
        }

        // nodes
        for (const n of nodes) {
          ctx.fillStyle = oklcha(edge, 0.7);
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.8, 0, TAU);
          ctx.fill();
        }

        // boundary-crossing flashes
        for (let k = flashes.length - 1; k >= 0; k--) {
          const f = flashes[k];
          f.age += dt;
          if (f.age > 0.8) {
            flashes.splice(k, 1);
            continue;
          }
          const p = f.age / 0.8;
          ctx.strokeStyle = oklcha(pkt, (1 - p) * 0.7);
          ctx.beginPath();
          ctx.arc(f.x, f.y, 2 + p * 11, 0, TAU);
          ctx.stroke();
        }
      },
    };
  };
}

// ===========================================================================
// 05 · Finance & Risk — a scrolling candlestick chart under a limit
// ===========================================================================

type Candle = { o: number; h: number; l: number; c: number };

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
      return { o, h, l, c };
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

        // risk limit line (near the top of the window)
        const limitP = max - range * 0.12;
        const ly = yOf(limitP);
        ctx.setLineDash([4, 5]);
        ctx.strokeStyle = oklcha(lim, 0.6);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, ly);
        ctx.lineTo(W, ly);
        ctx.stroke();
        ctx.setLineDash([]);

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
        }

        // cursor crosshair
        if (pointer.active) {
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

type Arc = { a: number; b: number; phase: number; dur: number };

export function citationArcs(opts: {
  tint: Tint;
  accent: Tint;
  speed?: number;
}): EngineFactory {
  const speed = opts.speed ?? 1;
  return (): Engine => {
    let W = 0;
    let H = 0;
    let left: number[] = [];
    let right: number[] = [];
    let arcs: Arc[] = [];
    let seeded = false;

    const seed = () => {
      const r = rng(11);
      const nSide = 6;
      left = [];
      right = [];
      for (let i = 0; i < nSide; i++) {
        left.push(H * (0.12 + (0.76 * i) / (nSide - 1)));
        right.push(H * (0.12 + (0.76 * i) / (nSide - 1)));
      }
      arcs = [];
      for (let i = 0; i < 9; i++) {
        arcs.push({
          a: Math.floor(r() * nSide),
          b: Math.floor(r() * nSide),
          phase: r(),
          dur: 2.2 + r() * 2.5,
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
        const lx = W * 0.15;
        const rx = W * 0.85;
        const px = pointer.x * W;
        const py = pointer.y * H;

        // provision ticks
        for (const y of left) {
          ctx.strokeStyle = oklcha(base, 0.4);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(lx - 8, y);
          ctx.lineTo(lx, y);
          ctx.stroke();
          ctx.fillStyle = oklcha(base, 0.7);
          ctx.beginPath();
          ctx.arc(lx, y, 2, 0, TAU);
          ctx.fill();
        }
        for (const y of right) {
          ctx.strokeStyle = oklcha(base, 0.4);
          ctx.beginPath();
          ctx.moveTo(rx, y);
          ctx.lineTo(rx + 8, y);
          ctx.stroke();
          ctx.fillStyle = oklcha(base, 0.7);
          ctx.beginPath();
          ctx.arc(rx, y, 2, 0, TAU);
          ctx.fill();
        }

        const bez = (u: number, p0: number, p1: number, p2: number) =>
          (1 - u) * (1 - u) * p0 + 2 * (1 - u) * u * p1 + u * u * p2;

        for (const arc of arcs) {
          if (!still) arc.phase += dt / arc.dur;
          const u = arc.phase % 1;
          const y1 = left[arc.a];
          const y2 = right[arc.b];
          const cx = W * 0.5 + (still ? 0 : Math.sin(arc.phase) * 12);
          const cyc = (y1 + y2) / 2 + (y1 - y2) * 0.15;

          // faint full arc
          const near =
            pointer.active &&
            Math.hypot(px - cx, py - cyc) < 90
              ? 0.4
              : 0;
          ctx.strokeStyle = oklcha(base, 0.14 + near);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(lx, y1);
          ctx.quadraticCurveTo(cx, cyc, rx, y2);
          ctx.stroke();

          // a comet tracing the citation
          const steps = 6;
          for (let s = 0; s < steps; s++) {
            const uu = u - s * 0.02;
            if (uu < 0 || uu > 1) continue;
            const x = bez(uu, lx, cx, rx);
            const y = bez(uu, y1, cyc, y2);
            const a = (1 - s / steps) * (0.5 + (hover ? 0.3 : 0));
            ctx.fillStyle = oklcha(acc, a);
            ctx.beginPath();
            ctx.arc(x, y, 1.8 - s * 0.15, 0, TAU);
            ctx.fill();
          }
          // arrival flash on the target node
          if (u > 0.96) {
            glow(ctx, oklcha(acc, 0.9), 8, () => {
              ctx.fillStyle = oklcha(acc, 1);
              ctx.beginPath();
              ctx.arc(rx, y2, 3, 0, TAU);
              ctx.fill();
            });
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
      },
    };
  };
}

// ===========================================================================
// 08 · Export Control & Sanctions — a radar sweep screening entities
// ===========================================================================

type Blip = { r: number; ang: number; flagged: boolean };

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
        const { t, palette, hover, still } = env;
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

        // blips: brighten just after the beam passes, then fade
        for (const b of blips) {
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
          // flagged entities get a lock-on ring
          if (b.flagged && lit > 0.4) {
            ctx.strokeStyle = oklcha(red, lit * 0.7);
            ctx.beginPath();
            ctx.arc(x, y, 5 + (1 - lit) * 6, 0, TAU);
            ctx.stroke();
          }
        }
      },
    };
  };
}
