import type { Tint } from "./engine";
import { ditherField } from "./blogEngines";
import { useDomainCanvas } from "./useDomainCanvas";

// Same convention as DomainVisual: light values run darker + saturated so
// they read on pale vellum; dark values run bright.
const t = (light: Tint["light"], dark: Tint["dark"]): Tint => ({ light, dark });

const SKY = t([0.57, 0.14, 180], [0.86, 0.13, 178]);
const TEAL = t([0.52, 0.12, 174], [0.8, 0.12, 174]);

// The blog hero backdrop — Bayer-dithered pixel waves drifting across the
// section; the cursor is a gravity well that bends and brightens the field.
// Kept in the pale teal accent family and dimmed by the wrapper.
const heroMake = ditherField({ tint: TEAL, hot: SKY, cell: 11, speed: 0.6 });

export function BlogHeroBackdrop() {
  const { canvasRef, pointerTargetRef } = useDomainCanvas(heroMake);
  return (
    <div
      ref={pointerTargetRef}
      className="pointer-events-auto absolute inset-0 overflow-hidden opacity-40"
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
