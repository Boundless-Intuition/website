/**
 * ProofField — the hero's living background.
 *
 * A full-bleed constellation of axiom / lemma nodes whose edges continuously
 * "prove": they draw themselves in, hold, and fade, while a few nodes resolve
 * to ∎ (Q.E.D.). Two parallax layers drift gently in opposite directions.
 *
 * All layout is fixed (no randomness → no SSR/hydration mismatch) and all motion
 * is CSS-driven, so there's no per-frame JS. Honors prefers-reduced-motion.
 */
type Node = { x: number; y: number; qed?: boolean };

// Back layer — smaller, fainter, drifts down-left.
const BACK: Node[] = [
  { x: 760, y: 240 },
  { x: 900, y: 120 },
  { x: 1050, y: 260 },
  { x: 820, y: 430, qed: true },
  { x: 980, y: 480 },
  { x: 1120, y: 420 },
  { x: 700, y: 560 },
  { x: 900, y: 620 },
  { x: 1140, y: 120 },
];
const BACK_EDGES: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [0, 3],
  [2, 5],
  [3, 4],
  [4, 5],
  [0, 6],
  [3, 6],
  [6, 7],
  [4, 7],
  [1, 8],
  [2, 8],
];

// Front layer — larger, more present, drifts up-right.
const FRONT: Node[] = [
  { x: 120, y: 130 },
  { x: 300, y: 90 },
  { x: 470, y: 200, qed: true },
  { x: 250, y: 300 },
  { x: 90, y: 430 },
  { x: 520, y: 420 },
  { x: 360, y: 520 },
  { x: 180, y: 600 },
  { x: 620, y: 120 },
];
const FRONT_EDGES: Array<[number, number]> = [
  [0, 1],
  [1, 3],
  [0, 3],
  [3, 4],
  [1, 2],
  [2, 5],
  [3, 5],
  [5, 6],
  [4, 7],
  [6, 7],
  [1, 8],
  [2, 8],
];

function Layer({
  nodes,
  edges,
  driftClass,
  dotR,
  edgeWidth,
  edgeOpacity,
}: {
  nodes: Node[];
  edges: Array<[number, number]>;
  driftClass: string;
  dotR: number;
  edgeWidth: number;
  edgeOpacity: number;
}) {
  return (
    <g className={driftClass}>
      {/* Edges */}
      <g stroke="currentColor" fill="none">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            className="pl-prove"
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            pathLength={1}
            strokeWidth={edgeWidth}
            strokeOpacity={edgeOpacity}
            style={{ animationDelay: `${(i * 0.73).toFixed(2)}s` }}
          />
        ))}
      </g>
      {/* Nodes */}
      {nodes.map((n, i) =>
        n.qed ? (
          <rect
            key={i}
            className="pl-qed"
            x={n.x - 6}
            y={n.y - 6}
            width={12}
            height={12}
            rx={1.5}
            fill="currentColor"
            style={{ animationDelay: `${(i * 0.9).toFixed(2)}s` }}
          />
        ) : (
          <g
            key={i}
            className="pl-dot"
            style={{ animationDelay: `${(i * 0.5).toFixed(2)}s` }}
          >
            <circle cx={n.x} cy={n.y} r={dotR} fill="currentColor" />
            <circle
              cx={n.x}
              cy={n.y}
              r={dotR + 6}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.4}
              strokeWidth={0.75}
            />
          </g>
        ),
      )}
    </g>
  );
}

export function ProofField({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 680"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <Layer
        nodes={BACK}
        edges={BACK_EDGES}
        driftClass="pl-drift-a"
        dotR={2.5}
        edgeWidth={0.75}
        edgeOpacity={0.4}
      />
      <Layer
        nodes={FRONT}
        edges={FRONT_EDGES}
        driftClass="pl-drift-b"
        dotR={3.5}
        edgeWidth={1}
        edgeOpacity={0.6}
      />
    </svg>
  );
}
