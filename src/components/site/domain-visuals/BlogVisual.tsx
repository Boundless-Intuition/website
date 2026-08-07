import type { Tint } from "./engine";
import { halftonePlume } from "./blogEngines";
import { useDomainCanvas } from "./useDomainCanvas";

// Same convention as DomainVisual: light values run darker + saturated so
// they read on pale vellum; dark values run bright.
const t = (light: Tint["light"], dark: Tint["dark"]): Tint => ({ light, dark });

// The house palette (docs/visual-system.md): saturated ultramarine, ivory
// white, warm ochre-gold. Nothing else. Light mode has to invert the grain —
// ivory is invisible on vellum — so the dots are drawn in ultramarine ink and
// the field thins to a wash.
const GRAIN = t([0.44, 0.16, 266], [0.94, 0.018, 92]); // ultramarine / ivory
const GLINT = t([0.6, 0.14, 74], [0.85, 0.13, 82]); // the single warm light
const WASH = t([0.42, 0.19, 266], [0.4, 0.21, 266]); // the field

// The blog masthead — a halftone plume leaving the lower right and spending
// itself across the page, so the field empties toward the upper left where the
// headline sits. `intensity` is the one knob over the whole plate: raise it for
// more presence, drop it for less.
const heroMake = halftonePlume({
  grain: GRAIN,
  glint: GLINT,
  wash: WASH,
  cell: 9,
  dot: 3,
  speed: 0.45,
  intensity: 0.62,
  density: 0.85,
  // off the right edge and a little above the floor, so the stream enters
  // across the whole right side rather than hugging the bottom corner
  source: { x: 1.06, y: 0.86 },
  reach: 1,
  curve: 0.07,
  spread: 0.09,
  flare: 0.34,
  washAlpha: { light: 0.06, dark: 0.26 },
});

export function BlogHeroBackdrop() {
  const { canvasRef, pointerTargetRef } = useDomainCanvas(heroMake);
  return (
    <div
      ref={pointerTargetRef}
      className="pointer-events-auto absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
