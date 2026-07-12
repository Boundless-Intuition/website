import { useMemo } from "react";
import type { EngineFactory, Tint } from "./engine";
import {
  asciiScan,
  candlestick,
  citationArcs,
  dataFlowNet,
  dnaHelix,
  ecgMonitor,
  radarSweep,
  redactionRain,
} from "./engines";
import { useDomainCanvas } from "./useDomainCanvas";

// Per-domain vibrant palettes. Light values run darker + saturated so they
// read on pale vellum; dark values run bright. Hue-spread across the wheel so
// the eight panels read as a spectrum.
const t = (light: Tint["light"], dark: Tint["dark"]): Tint => ({ light, dark });

const CYAN = t([0.52, 0.15, 215], [0.8, 0.13, 210]);
const GREEN = t([0.53, 0.17, 152], [0.81, 0.2, 150]);
const RED = t([0.55, 0.21, 25], [0.72, 0.23, 25]);
const TEAL = t([0.54, 0.13, 195], [0.82, 0.13, 195]);
const MAGENTA = t([0.55, 0.21, 330], [0.78, 0.19, 330]);
const AMBER = t([0.58, 0.16, 78], [0.82, 0.17, 82]);
const AZURE = t([0.5, 0.15, 255], [0.78, 0.13, 250]);
const SKY = t([0.55, 0.16, 208], [0.85, 0.14, 205]);
const INDIGO = t([0.45, 0.19, 295], [0.76, 0.15, 295]);
const VIOLET = t([0.56, 0.2, 322], [0.83, 0.16, 322]);

/**
 * One live visual per domain. Each entry picks a generative engine + params so
 * every panel reads as its own subject while sharing the same drawing code.
 *
 * `video` is optional: drop an MP4/WebM into /public and set it here to switch
 * a domain to a looping film clip (the "hybrid" option) — the canvas engine
 * still renders underneath as the fallback until the file loads.
 */
type Visual = {
  make: EngineFactory;
  /** optional looping video source, e.g. "/domains/finance.webm" */
  video?: string;
};

const VISUALS: Visual[] = [
  // 01 · Security & Compliance — live ASCII field under a verification scan
  { make: asciiScan({ tint: CYAN, verified: GREEN, speed: 0.5 }) },
  // 02 · Healthcare & Clinical Safety — an ECG heart monitor
  { make: ecgMonitor({ tint: RED, speed: 1 }) },
  // 03 · Clinical Trials & Protocols — a rotating DNA double-helix
  { make: dnaHelix({ strand: TEAL, pairA: MAGENTA, pairB: AMBER, speed: 1 }) },
  // 04 · Network & Infrastructure — packets flowing across a firewall
  { make: dataFlowNet({ tint: AZURE, packet: SKY, density: 1, link: 96 }) },
  // 05 · Finance & Risk — a candlestick chart under a risk limit
  { make: candlestick({ up: GREEN, down: RED, limit: AMBER, speed: 1 }) },
  // 06 · Legal & Regulatory — citation arcs cross-referencing provisions
  { make: citationArcs({ tint: INDIGO, accent: VIOLET, speed: 1 }) },
  // 07 · Data Protection & Privacy — binary rain masking into redaction blocks
  { make: redactionRain({ tint: GREEN, mask: AMBER, cell: 14, speed: 1 }) },
  // 08 · Export Control & Sanctions — a radar sweep screening entities
  { make: radarSweep({ tint: AMBER, flag: RED, speed: 1 }) },
];

export function DomainVisual({ index }: { index: number }) {
  const visual = VISUALS[index % VISUALS.length];
  const make = useMemo(() => visual.make, [visual]);
  const { canvasRef, pointerTargetRef } = useDomainCanvas(make);

  return (
    <div
      ref={pointerTargetRef}
      className="pointer-events-auto absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {visual.video ? (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          src={visual.video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      )}
    </div>
  );
}
