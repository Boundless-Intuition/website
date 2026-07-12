import { useMemo } from "react";
import type { EngineFactory, Tint } from "./engine";
import { asciiFlow } from "./methodEngines";
import { useDomainCanvas } from "./useDomainCanvas";

const t = (light: Tint["light"], dark: Tint["dark"]): Tint => ({ light, dark });

// Accent blue field, bright sky-cyan gust highlights, green ✓ — this section
// stays calm; the seeds keep the four boxes from moving in lockstep.
const AZURE = t([0.5, 0.15, 255], [0.78, 0.13, 250]);
const SKY = t([0.55, 0.16, 208], [0.85, 0.14, 205]);
const GREEN = t([0.53, 0.17, 152], [0.81, 0.2, 150]);

const VISUALS: EngineFactory[] = [0, 1, 2, 3].map((i) =>
  asciiFlow({ tint: AZURE, hot: SKY, ok: GREEN, seed: 31 + i * 47 }),
);

/**
 * ASCII slipstream background for the "makes teams faster" boxes — the
 * Security panel's glyph language, redirected into a rightward wind field.
 */
export function ValueBoxVisual({ index }: { index: number }) {
  const make = useMemo(() => VISUALS[index % VISUALS.length], [index]);
  const { canvasRef, pointerTargetRef } = useDomainCanvas(make);

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
