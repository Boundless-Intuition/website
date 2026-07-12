import { useMemo } from "react";
import type { EngineFactory, Tint } from "./engine";
import { asciiScan } from "./engines";
import {
  claimMorph,
  proofSearch,
  ruleLattice,
  shipGate,
  tokenStream,
} from "./methodEngines";
import { useDomainCanvas } from "./useDomainCanvas";

// Same convention as DomainVisual: light values run darker + saturated so
// they read on pale vellum; dark values run bright.
const t = (light: Tint["light"], dark: Tint["dark"]): Tint => ({ light, dark });

const CYAN = t([0.52, 0.15, 215], [0.8, 0.13, 210]);
const GREEN = t([0.53, 0.17, 152], [0.81, 0.2, 150]);
const RED = t([0.55, 0.21, 25], [0.72, 0.23, 25]);
const TEAL = t([0.54, 0.13, 195], [0.82, 0.13, 195]);
const MAGENTA = t([0.55, 0.21, 330], [0.78, 0.19, 330]);
const AMBER = t([0.58, 0.16, 78], [0.82, 0.17, 82]);
const AZURE = t([0.5, 0.15, 255], [0.78, 0.13, 250]);
const INDIGO = t([0.45, 0.19, 295], [0.76, 0.15, 295]);
const VIOLET = t([0.56, 0.2, 322], [0.83, 0.16, 322]);

/** One full-card live visual per Method step (01–05). */
const VISUALS: EngineFactory[] = [
  // 01 · The model answers — token streams typing with burning carets
  tokenStream({ tint: VIOLET, hot: MAGENTA }),
  // 02 · The domain is formalized — chaos compiling into a rule lattice
  ruleLattice({ chaos: AMBER, ord: TEAL }),
  // 03 · The answer becomes a claim — a translation lens over prose
  claimMorph({ prose: INDIGO, logic: AMBER }),
  // 04 · The prover checks it — a live proof search lighting the derivation
  proofSearch({ tint: AZURE, ok: GREEN, bad: RED }),
  // 05 · Only proven answers ship — a checkpoint gate certifying answers
  shipGate({ tint: CYAN, ok: GREEN, bad: RED }),
];

export function MethodVisual({ index }: { index: number }) {
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

// A quiet ASCII verification field behind the pipeline diagram — the same
// language as the Security panel, dialed down so the nodes stay the subject.
const pipelineMake = asciiScan({
  tint: CYAN,
  verified: GREEN,
  cell: 15,
  speed: 0.35,
});

export function PipelineBackdrop() {
  const { canvasRef, pointerTargetRef } = useDomainCanvas(pipelineMake);
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
