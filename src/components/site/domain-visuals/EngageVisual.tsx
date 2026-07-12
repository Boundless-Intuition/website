import { useMemo } from "react";
import type { EngineFactory, Tint } from "./engine";
import { commitProofs, ruleIngest, sealCert } from "./engageEngines";
import { asciiFlow, claimMorph, ruleLattice } from "./methodEngines";
import { useDomainCanvas } from "./useDomainCanvas";

// Same convention as DomainVisual: light values run darker + saturated so
// they read on pale vellum; dark values run bright.
const t = (light: Tint["light"], dark: Tint["dark"]): Tint => ({ light, dark });

const CYAN = t([0.52, 0.15, 215], [0.8, 0.13, 210]);
const SKY = t([0.55, 0.16, 208], [0.85, 0.14, 205]);
const GREEN = t([0.53, 0.17, 152], [0.81, 0.2, 150]);
const RED = t([0.55, 0.21, 25], [0.72, 0.23, 25]);
const TEAL = t([0.54, 0.13, 195], [0.82, 0.13, 195]);
const AMBER = t([0.58, 0.16, 78], [0.82, 0.17, 82]);
const AZURE = t([0.5, 0.15, 255], [0.78, 0.13, 250]);
const INDIGO = t([0.45, 0.19, 295], [0.76, 0.15, 295]);
const VIOLET = t([0.56, 0.2, 322], [0.83, 0.16, 322]);

/** One full-card live visual per Engage process step (01–04). */
const VISUALS: EngineFactory[] = [
  // 01 · Share your rules — documents streaming into a growing corpus
  ruleIngest({ tint: TEAL, hot: AMBER, ok: GREEN }),
  // 02 · We formalize them — chaos compiling into a rule lattice
  ruleLattice({ chaos: VIOLET, ord: CYAN }),
  // 03 · Proofs run on every change — commit lanes crossing a prover beam
  commitProofs({ tint: AZURE, ok: GREEN, bad: RED }),
  // 04 · You get verifiable guarantees — a certificate typed out and sealed
  sealCert({ tint: INDIGO, hot: VIOLET, seal: GREEN }),
];

export function EngageStepVisual({ index }: { index: number }) {
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

// The hero backdrop — the translation lens roaming over prose, resolving it
// into logic. "Bring us your rules" made literal; the cursor IS the lens.
// Kept in the quiet brand blues and dimmed by the wrapper.
const heroMake = claimMorph({ prose: AZURE, logic: SKY, cell: 21, speed: 0.7 });

export function EngageHeroBackdrop() {
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

// A directional ASCII slipstream behind the AI → gate → production diagram —
// the field streams the same way the answers do.
const gateMake = asciiFlow({
  tint: CYAN,
  hot: SKY,
  ok: GREEN,
  seed: 211,
  speed: 0.8,
});

export function GateFlowBackdrop() {
  const { canvasRef, pointerTargetRef } = useDomainCanvas(gateMake);
  return (
    <div
      ref={pointerTargetRef}
      className="pointer-events-auto absolute inset-0 overflow-hidden opacity-60"
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
