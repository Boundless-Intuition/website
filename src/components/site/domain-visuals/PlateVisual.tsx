import type { RefObject } from "react";
import type { Tint } from "./engine";
import { plateEmission, platePour } from "./plateEngines";
import { useDomainCanvas } from "./useDomainCanvas";

// House convention for canvas tints: light values run darker + saturated so
// they read on pale vellum; dark values run bright.
const t = (light: Tint["light"], dark: Tint["dark"]): Tint => ({ light, dark });

// The house pair, same as BlogVisual's live plume, so every halftone surface on
// the site is the same ink at the same temperature.
const GRAIN = t([0.44, 0.16, 266], [0.94, 0.018, 92]); // ultramarine / ivory
const GLINT = t([0.6, 0.14, 74], [0.85, 0.13, 82]); // the single warm light

// Measured off aqueduct-procession: the water leaves the broken end of the
// arcade just under the walkway, and meets the lake a little above the arches'
// midpoint. Source-image coordinates, not canvas ones — the engine maps them
// through the cover crop so the stream stays on the painted spout whatever the
// section's aspect ratio turns out to be.
//
// 2200/940 is the film's raster; the still poster (1800x770) and the original
// plate are the same framing to within a thousandth, so one aspect covers all
// three. As with the lab below, this MUST match what ThesisBand renders.
const pourMake = platePour({
  sourceAspect: 2200 / 940,
  grain: GRAIN,
  glint: GLINT,
  source: { x: 0.512, y: 0.262 },
  waterline: 0.585,
  spread: 0.012,
  count: 260,
  speed: 1,
});

// Laid over the lab plate, which is a CSS object-cover still with an object-cover
// film over it so the pair can drift together. The aspect and focus here MUST
// match what Origin renders, or the plume slides off the sphere it is supposed
// to be leaving — 3:2 covers the still, the film and the source painting alike.
const labPlumeMake = plateEmission({
  sourceAspect: 1536 / 1024,
  focus: { x: 0.5, y: 0.34 },
  grain: GRAIN,
  glint: GLINT,
  // Centred on the armillary sphere, matching the concentric rings the plate
  // already paints around it.
  origin: { x: 0.69, y: 0.32 },
  // born just clear of the bronze, so grain leaves the instrument's own edge
  inner: 0.205,
  reach: 0.66,
  // left through overhead: the three figures stand below and right of the
  // sphere, and a full circle would lay grain across their faces
  arc: { from: 156, to: 292 },
  bands: 4,
  count: 300,
  speed: 1,
  intensity: 0.85,
});

type Props = {
  /** Read the pointer from here — normally the whole section. See useDomainCanvas. */
  pointerTarget?: RefObject<HTMLElement | null>;
};

/**
 * The live pour over the aqueduct plate — see platePour.
 *
 * Currently unused: the thesis band's plate became a film, which paints its own
 * falling water, and a drawn stream over a moving painted one was one stream too
 * many. Kept because re-adding it is a single line in ThesisBand, and because it
 * is the only place §12's lantern reads on that plate. Pointer-transparent for
 * the same reason LabPlumeOverlay is: the statement over it has a link in it.
 */
export function PlatePourOverlay({ pointerTarget }: Props) {
  const { canvasRef } = useDomainCanvas(pourMake, pointerTarget);
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

/**
 * The emission over the lab plate — see plateEmission. Pointer-transparent,
 * because the plate beneath it drifts on the same section's pointer and the
 * copy above it has links; this layer only draws.
 */
export function LabPlumeOverlay({ pointerTarget }: Props) {
  const { canvasRef } = useDomainCanvas(labPlumeMake, pointerTarget);
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
