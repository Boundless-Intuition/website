import { useEffect, useRef, type RefObject } from "react";
import { PlateFilm } from "./PlateFilm";

/**
 * A plate that moves as a picture rather than as a field of grain.
 *
 * The halftone engines animate what a plate depicts — falling water, a signal
 * leaving an instrument. This does the opposite and animates the plate itself:
 * a very slow drift, plus a little parallax under the cursor. Nothing is drawn
 * on top, so it can never read as an effect laid over a painting.
 *
 * Three nested elements on purpose. The parallax is a transform on the outer
 * wrapper and the drift is a CSS keyframe on the inner one — put both on the
 * same element and the second silently replaces the first. The drift sits on a
 * wrapper rather than on the image so that a plate with a film over it (see
 * `film`) has both layers travelling on one animation: on two elements they
 * would be two clocks, and the cross-fade between them would slide.
 */
export function PlateDrift({
  src,
  /** optional lighter raster of the *same* frame and crop, served below sm */
  mobileSrc,
  /** object-position for the crop, e.g. "50% 34%" */
  focus = "50% 50%",
  /** how far the plate travels under the cursor, in px */
  strength = 16,
  /**
   * Asset base for a moving version of this same plate, e.g. "/lab-plate".
   * The film is laid over the still and cross-fades in once it plays; `src`
   * must therefore be the film's own first frame, not a different treatment of
   * the painting, or the hand-off shows. See PlateFilm for what it costs.
   */
  film,
  /**
   * Whether the plate moves at all. Turn it OFF when a canvas engine is drawing
   * over the plate onto a painted feature of it — the drift is a 1.05–1.11 scale
   * and the parallax a translate, and a canvas laid on top has neither, so the
   * painted spout walks away from the drawn water. The engines cannot simply
   * ride inside the drifting wrapper either: §10 wants hard 2–3px grain on a
   * fixed lattice, and a transform would resample it soft.
   */
  drift = true,
  /**
   * Element to read the pointer from. A full-bleed plate sits behind its
   * section's copy, so without this the half of the band people read is dead
   * to it.
   */
  pointerTarget,
}: {
  src: string;
  mobileSrc?: string;
  focus?: string;
  strength?: number;
  film?: string;
  drift?: boolean;
  pointerTarget?: RefObject<HTMLElement | null>;
}) {
  const selfRef = useRef<HTMLDivElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !drift) return;
    const layer = layerRef.current;
    const target = pointerTarget?.current ?? selfRef.current;
    if (!layer || !target) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    // Eased toward the cursor rather than pinned to it: the plate is heavy,
    // and following exactly makes a large image feel stuck to the mouse.
    const step = () => {
      raf = 0;
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;
      layer.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.08 || Math.abs(ty - cy) > 0.08) {
        raf = window.requestAnimationFrame(step);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (reduce.matches) return;
      const r = target.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      // Against the cursor, which is what reads as depth: the picture leans
      // away as you approach it.
      tx = ((e.clientX - r.left) / r.width - 0.5) * -strength;
      ty = ((e.clientY - r.top) / r.height - 0.5) * -strength;
      if (!raf) raf = window.requestAnimationFrame(step);
    };

    const settle = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = window.requestAnimationFrame(step);
    };

    target.addEventListener("pointermove", onMove);
    target.addEventListener("pointerleave", settle);
    reduce.addEventListener("change", settle);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerleave", settle);
      reduce.removeEventListener("change", settle);
    };
  }, [drift, pointerTarget, strength]);

  return (
    <div ref={selfRef} className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* Bled past the edges so the parallax can never expose a border — and
          held flush when nothing moves, or a still plate would be cropped by
          the bleed for no reason. */}
      <div
        ref={layerRef}
        className={
          drift ? "absolute -inset-8 will-change-transform" : "absolute inset-0"
        }
      >
        <div
          className={
            drift ? "plate-drift absolute inset-0" : "absolute inset-0"
          }
        >
          {/* One <picture> so a plate that ships a small pair can hand phones
              the lighter file. The breakpoint is the site's `sm`, and it must
              stay in step with PlateFilm's — otherwise a phone can end up
              dissolving the desktop film onto the mobile still. */}
          <picture>
            {mobileSrc ? (
              <source media="(max-width: 639.98px)" srcSet={mobileSrc} />
            ) : null}
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
              style={{ objectPosition: focus }}
            />
          </picture>
          {/* Same crop as the still, so the cross-fade is a dissolve and not a
              cut to a differently framed picture. */}
          {film ? (
            <PlateFilm
              base={film}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: focus }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
