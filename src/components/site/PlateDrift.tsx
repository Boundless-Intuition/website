import { useEffect, useRef, type RefObject } from "react";

/**
 * A plate that moves as a picture rather than as a field of grain.
 *
 * The halftone engines animate what a plate depicts — falling water, a signal
 * leaving an instrument. This does the opposite and animates the plate itself:
 * a very slow drift, plus a little parallax under the cursor. Nothing is drawn
 * on top, so it can never read as an effect laid over a painting.
 *
 * Two nested elements on purpose. The drift is a CSS keyframe on the image and
 * the parallax is a transform on the wrapper — put both on one element and the
 * second silently replaces the first.
 */
export function PlateDrift({
  src,
  /** object-position for the crop, e.g. "50% 34%" */
  focus = "50% 50%",
  /** how far the plate travels under the cursor, in px */
  strength = 16,
  /**
   * Element to read the pointer from. A full-bleed plate sits behind its
   * section's copy, so without this the half of the band people read is dead
   * to it.
   */
  pointerTarget,
}: {
  src: string;
  focus?: string;
  strength?: number;
  pointerTarget?: RefObject<HTMLElement | null>;
}) {
  const selfRef = useRef<HTMLDivElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
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
  }, [pointerTarget, strength]);

  return (
    <div ref={selfRef} className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* Bled past the edges so the parallax can never expose a border. */}
      <div ref={layerRef} className="absolute -inset-8 will-change-transform">
        <img
          src={src}
          alt=""
          className="plate-drift h-full w-full object-cover"
          style={{ objectPosition: focus }}
        />
      </div>
    </div>
  );
}
