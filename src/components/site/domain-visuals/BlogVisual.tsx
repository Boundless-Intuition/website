import type { Tint } from "./engine";
import { ditherField } from "./blogEngines";
import { useDomainCanvas } from "./useDomainCanvas";

// Same convention as DomainVisual: light values run darker + saturated so
// they read on pale vellum; dark values run bright.
const t = (light: Tint["light"], dark: Tint["dark"]): Tint => ({ light, dark });

const SKY = t([0.55, 0.16, 208], [0.85, 0.14, 205]);
const AZURE = t([0.5, 0.15, 255], [0.78, 0.13, 250]);

// The blog hero backdrop — Bayer-dithered pixel waves drifting across the
// section; the cursor is a gravity well that bends and brightens the field.
// Kept in the quiet brand blues and dimmed by the wrapper, matching Engage.
const heroMake = ditherField({ tint: AZURE, hot: SKY, cell: 11, speed: 0.6 });

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
