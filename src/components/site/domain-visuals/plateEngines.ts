/**
 * Live halftone drawn onto a painted plate.
 *
 * The rule both engines follow: the painting is never taken apart. An earlier
 * version dissolved a third of a plate into drifting grain, which read as an
 * effect applied over the picture rather than as the picture — stone does not
 * wander, and §7 is explicit that the water is mirror-flat and still. So each
 * engine animates only what its plate already depicts moving, and nothing else.
 *
 * Both draw per §10's rules for the animated halftone: grains snap to a fixed
 * 3px lattice, stay 2–3px hard squares, and a fraction spike warm on their own
 * timer. Under prefers-reduced-motion `useDomainCanvas` draws a single still
 * frame, which leaves a complete, motionless figure rather than an empty one.
 *
 * Positions are given in SOURCE-IMAGE coordinates and mapped through the same
 * cover-fit crop used to draw the plate, so the drawn element stays locked to
 * the painted one at every box aspect ratio. That mapping is what makes the
 * animation belong to the image instead of floating over it.
 */
import {
  type Engine,
  type EngineFactory,
  type Tint,
  oklcha,
  rng,
  smoothstep,
  tone,
} from "./engine";

/** §10: grains snap to a fixed lattice so the halftone stays 1-bit, not soft. */
const LATTICE = 3;
const snap = (v: number) => Math.round(v / LATTICE) * LATTICE;

type Crop = { sx: number; sy: number; sw: number; sh: number };

/**
 * The crop `drawImage` uses to cover a box — and the basis for the mapping.
 *
 * `focus` anchors what survives the crop, 0..1 on each axis, centred by
 * default. A 3:2 plate in a wide band loses a third of its height, and centring
 * that loss takes the top off the subject; the anchor is how a plate keeps the
 * thing it is a picture of.
 */
function coverFit(
  el: HTMLImageElement,
  w: number,
  h: number,
  focusX = 0.5,
  focusY = 0.5,
): Crop {
  const ia = el.naturalWidth / el.naturalHeight;
  const ba = w / h;
  if (ia > ba) {
    const sh = el.naturalHeight;
    const sw = sh * ba;
    return { sx: (el.naturalWidth - sw) * focusX, sy: 0, sw, sh };
  }
  const sw = el.naturalWidth;
  const sh = sw / ba;
  return { sx: 0, sy: (el.naturalHeight - sh) * focusY, sw, sh };
}

type Drop = {
  /** 0..1 down the fall */
  p: number;
  /** fall rate, varied so the stream never pulses in step */
  v: number;
  seed: number;
  /** 2 or 3 px, per §10 */
  size: number;
  glints: boolean;
};

/**
 * Water leaving stone: §4's Plume — "dense at its source, scattering into
 * separate grains as it travels" — falling from a spout to the waterline and
 * mirrored beneath it, since the plate paints a still surface and the fall owes
 * it a reflection.
 */
export function platePour(opts: {
  src: string;
  grain: Tint;
  glint: Tint;
  /** where the water leaves the stone, in source-image coords (0..1) */
  source: { x: number; y: number };
  /** the water surface, in source-image y */
  waterline: number;
  /** how far the stream fans out by the time it lands, in source-image x */
  spread?: number;
  count?: number;
  speed?: number;
}): EngineFactory {
  const spread = opts.spread ?? 0.012;
  const count = opts.count ?? 260;
  const speed = opts.speed ?? 1;

  return (): Engine => {
    let W = 0;
    let H = 0;
    let img: HTMLImageElement | null = null;
    let crop: Crop = { sx: 0, sy: 0, sw: 0, sh: 0 };

    const r = rng(9137);
    const drops: Drop[] = [];
    for (let i = 0; i < count; i++) {
      drops.push({
        // seeded across the whole fall so the stream is complete on frame one
        p: r(),
        v: 0.22 + r() * 0.16,
        seed: r(),
        size: r() < 0.62 ? 2 : 3,
        glints: r() < 0.08,
      });
    }

    if (typeof Image !== "undefined") {
      const el = new Image();
      el.decoding = "async";
      el.onload = () => {
        img = el;
        if (W > 0) crop = coverFit(el, W, H);
      };
      el.src = opts.src;
    }

    return {
      resize(w, h) {
        W = w;
        H = h;
        if (img) crop = coverFit(img, w, h);
      },

      frame(ctx, env) {
        const { t, dt, w, h, palette, pointer, still } = env;
        const { sx, sy, sw, sh } = crop;
        if (img) ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
        if (!img || sw === 0) return;

        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        const toX = (nx: number) => ((nx * iw - sx) / sw) * w;
        const toY = (ny: number) => ((ny * ih - sy) / sh) * h;

        const grain = tone(palette, opts.grain);
        const warm = tone(palette, opts.glint);
        const fall = opts.waterline - opts.source.y;

        // §12: the cursor is the lantern. Where it is held, the falling water
        // catches its light; the draught of it also pulls the stream a little
        // off plumb, more the further the water has already fallen.
        const lantern = pointer.active && !still;
        const lx = pointer.x * w;
        const ly = pointer.y * h;
        const REACH = Math.min(w, h) * 0.42;
        const draught = lantern ? (pointer.x - 0.5) * 0.014 : 0;

        for (let pass = 0; pass < 2; pass++) {
          // pass 0: the stream. pass 1: the few grains catching the lantern.
          ctx.fillStyle = pass === 0 ? oklcha(grain, 0.85) : oklcha(warm, 0.95);

          for (let i = 0; i < drops.length; i++) {
            const d = drops[i];
            if (pass === 0) {
              if (!still) {
                d.p += d.v * speed * dt;
                if (d.p > 1) d.p -= 1;
              }
            } else if (!d.glints) {
              continue;
            }

            const p = d.p;
            const fan = spread * p * p;
            const wob = Math.sin(d.seed * 6.283 + p * 4.1) * fan;
            const nx = opts.source.x + wob + draught * p * p;
            const ny = opts.source.y + fall * p;

            const a = smoothstep(0, 0.05, p) * (1 - smoothstep(0.86, 1, p));
            if (a <= 0.02) continue;

            if (pass === 1) {
              const spike = Math.sin(t * 2.1 + d.seed * 19.7);
              if (spike < 0.9) continue;
            }

            const x = snap(toX(nx));
            const y = snap(toY(ny));
            const s = d.size;

            ctx.globalAlpha = pass === 0 ? a : a * 0.9;
            ctx.fillRect(x, y, s, s);

            const ry = toY(2 * opts.waterline - ny);
            if (ry < h) {
              ctx.globalAlpha = a * 0.26;
              ctx.fillRect(x, snap(ry), s, s);
            }
          }
        }

        // The lantern pass: grains inside its reach are struck warm, brightest
        // right under the cursor. Drawn over the stream rather than instead of
        // it, so the water keeps its own body and only gains the light.
        if (lantern) {
          ctx.fillStyle = oklcha(warm, 1);
          for (let i = 0; i < drops.length; i++) {
            const d = drops[i];
            const p = d.p;
            const fan = spread * p * p;
            const wob = Math.sin(d.seed * 6.283 + p * 4.1) * fan;
            const x = snap(toX(opts.source.x + wob + draught * p * p));
            const y = snap(toY(opts.source.y + fall * p));
            const near = 1 - Math.hypot(x - lx, y - ly) / REACH;
            if (near <= 0.02) continue;
            const a = smoothstep(0, 0.05, p) * (1 - smoothstep(0.86, 1, p));
            if (a <= 0.02) continue;
            ctx.globalAlpha = a * near * near * 0.95;
            ctx.fillRect(x, y, d.size, d.size);
          }
        }
        ctx.globalAlpha = 1;
      },
    };
  };
}

type Mote = {
  /** angle it leaves on, fixed — grain travels straight out */
  ang: number;
  /** which wavefront it belongs to */
  band: number;
  /** small offset so the front is a grainy edge, not a drawn line */
  jitter: number;
  seed: number;
  size: number;
};

/**
 * Emission drawn *over* a plate that something else is rendering.
 *
 * Unlike the engine above, this never draws the picture — the lab plate is a
 * CSS `object-cover` image so that it can drift and parallax, and this only
 * lays grain on top of it. It therefore has to reproduce that crop rather than
 * own it: given the plate's natural aspect and its `object-position`, the same
 * mapping falls out. Feed it the wrong aspect or focus and the emission stops
 * lining up with the instrument it is supposed to be leaving.
 *
 * Grain is born at the instrument's own edge and travels straight out, in
 * periodic wavefronts — §4's Rings, "spreading outward and thinning", carried
 * by a Plume's worth of individual grains rather than drawn as arcs. A stream
 * that began somewhere out in open sky read as arriving from nowhere; this
 * leaves the sphere, which is the only place on this plate anything could.
 *
 * The cursor sets the ink: ivory in the open field, struck to lantern ochre
 * where it is held, decided per grain so the boundary is dithered.
 */
export function plateEmission(opts: {
  /** natural aspect (w / h) of the plate this sits over */
  sourceAspect: number;
  /** the plate's object-position, 0..1 on each axis */
  focus?: { x?: number; y?: number };
  grain: Tint;
  glint: Tint;
  /** the instrument it leaves, in source-image coords */
  origin: { x: number; y: number };
  /** where grain is born — set to clear the instrument itself */
  inner: number;
  /** where it has spent itself */
  reach: number;
  /** the open sector, in degrees, y measured downward (180 = left, 270 = up) */
  arc: { from: number; to: number };
  /** how many wavefronts are in the air at once */
  bands?: number;
  count?: number;
  speed?: number;
  intensity?: number;
}): EngineFactory {
  const bands = opts.bands ?? 4;
  const count = opts.count ?? 300;
  const speed = opts.speed ?? 1;
  const intensity = opts.intensity ?? 1;
  const focusX = opts.focus?.x ?? 0.5;
  const focusY = opts.focus?.y ?? 0.5;
  const a0 = (opts.arc.from * Math.PI) / 180;
  const a1 = (opts.arc.to * Math.PI) / 180;

  return (): Engine => {
    const r = rng(7331);
    const motes: Mote[] = [];
    for (let i = 0; i < count; i++) {
      motes.push({
        ang: a0 + (a1 - a0) * r(),
        band: i % bands,
        jitter: (r() - 0.5) * 0.11,
        seed: r(),
        size: r() < 0.74 ? 2 : 3,
      });
    }

    return {
      resize() {},

      frame(ctx, env) {
        const { t, w, h, palette, pointer, still } = env;
        if (w === 0 || h === 0) return;

        // The same crop `object-fit: cover` performs, in normalized terms.
        const ia = opts.sourceAspect;
        const ba = w / h;
        let toX: (n: number) => number;
        let toY: (n: number) => number;
        if (ia > ba) {
          const vis = ba / ia;
          const off = (1 - vis) * focusX;
          toX = (n) => ((n - off) / vis) * w;
          toY = (n) => n * h;
        } else {
          const vis = ia / ba;
          const off = (1 - vis) * focusY;
          toX = (n) => n * w;
          toY = (n) => ((n - off) / vis) * h;
        }

        const pale = tone(palette, opts.grain);
        const warm = tone(palette, opts.glint);
        const lit = pointer.active && !still;
        const lx = pointer.x * w;
        const ly = pointer.y * h;
        const REACH = Math.min(w, h) * 0.38;

        // normalized x and y span different pixel counts, so y is corrected or
        // the wavefronts come out as ellipses
        const yk = ia;
        const span = opts.reach - opts.inner;
        // one wavefront crosses in ~11s at speed 1
        const clock = still ? 0.42 : t * 0.09 * speed;

        for (let i = 0; i < motes.length; i++) {
          const m = motes[i];
          let p = (clock + m.band / bands + m.jitter) % 1;
          if (p < 0) p += 1;

          const rad = opts.inner + span * p;
          // a little tangential drift as it travels, so the front softens into
          // a scatter instead of staying a rigid ring
          const ang = m.ang + Math.sin(m.seed * 6.283) * 0.09 * p;
          const nx = opts.origin.x + Math.cos(ang) * rad;
          const ny = opts.origin.y + Math.sin(ang) * rad * yk;
          const px = toX(nx);
          const py = toY(ny);
          if (px < -8 || px > w + 8 || py < -8 || py > h + 8) continue;

          // leaves the instrument already formed, thins as it widens; and eases
          // off at both lips so the sector ends in air, not at a border
          const lip =
            smoothstep(a0, a0 + 0.3, ang) * (1 - smoothstep(a1 - 0.3, a1, ang));
          const a =
            smoothstep(0, 0.06, p) *
            (1 - smoothstep(0.45, 1, p)) *
            lip *
            intensity;
          if (a <= 0.02) continue;

          const near = lit
            ? Math.max(0, 1 - Math.hypot(px - lx, py - ly) / REACH)
            : 0;
          ctx.fillStyle = near > 0.28 ? oklcha(warm, 0.95) : oklcha(pale, 0.88);
          ctx.globalAlpha = a * (1 + near * near * 0.9);
          ctx.fillRect(snap(px), snap(py), m.size, m.size);
        }
        ctx.globalAlpha = 1;
      },
    };
  };
}
