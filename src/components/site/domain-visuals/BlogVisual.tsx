import type { Tint } from "./engine";
import { ditherField } from "./blogEngines";
import { useDomainCanvas } from "./useDomainCanvas";

// Same convention as DomainVisual: light values run darker + saturated so
// they read on pale vellum; dark values run bright.
const t = (light: Tint["light"], dark: Tint["dark"]): Tint => ({ light, dark });

const SKY = t([0.58, 0.15, 174], [0.86, 0.14, 172]);
const TEAL = t([0.53, 0.13, 168], [0.8, 0.13, 168]);

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
