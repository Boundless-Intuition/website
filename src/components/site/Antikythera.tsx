import type { CSSProperties } from "react";

/**
 * Antikythera — the hero centerpiece: a train of meshing gears turning in exact
 * ratio, after the ~2,000-year-old Greek "computer". Pitch radii are set so each
 * pair of gears is tangent, rotation periods are proportional to tooth count
 * (ω ∝ 1/n) and directions alternate down the train, so it meshes correctly. A
 * graduated dial ring turns slowly behind it. Pure CSS motion; reduced-motion
 * safe (gears freeze). Colour comes from the parent's text colour.
 */
const ACC = "oklch(0.72 0.13 176)";

function Gear({
  cx,
  cy,
  n,
  dir,
  dur,
}: {
  cx: number;
  cy: number;
  n: number;
  dir: "gear-cw" | "gear-ccw";
  dur: number;
}) {
  const p = 2 * n; // pitch radius (constant module → gears mesh)
  const toothH = 6;
  const toothW = ((2 * Math.PI * p) / n) * 0.5;
  return (
    <g className={dir} style={{ "--dur": `${dur}s` } as CSSProperties}>
      {Array.from({ length: n }).map((_, i) => (
        <rect
          key={i}
          x={cx - toothW / 2}
          y={cy - (p + toothH)}
          width={toothW}
          height={toothH}
          rx="0.8"
          fill="currentColor"
          fillOpacity="0.5"
          transform={`rotate(${(i * 360) / n} ${cx} ${cy})`}
        />
      ))}
      <circle
        cx={cx}
        cy={cy}
        r={p}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.55"
      />
      <circle
        cx={cx}
        cy={cy}
        r={p * 0.8}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeOpacity="0.3"
      />
      {Array.from({ length: 5 }).map((_, i) => {
        const a = ((i * 360) / 5) * (Math.PI / 180);
        return (
          <line
            key={i}
            x1={cx + Math.cos(a) * p * 0.24}
            y1={cy + Math.sin(a) * p * 0.24}
            x2={cx + Math.cos(a) * p * 0.78}
            y2={cy + Math.sin(a) * p * 0.78}
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.28"
          />
        );
      })}
      <circle
        cx={cx}
        cy={cy}
        r={p * 0.24}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <circle cx={cx} cy={cy} r="2.6" fill={ACC} fillOpacity="0.75" />
    </g>
  );
}

export function Antikythera({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label="A meshing gear train, after the Antikythera mechanism"
    >
      {/* outer frame */}
      <circle
        cx="200"
        cy="200"
        r="190"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.22"
      />

      {/* graduated dial, turning slowly */}
      <g className="gear-ccw" style={{ "--dur": "150s" } as CSSProperties}>
        <circle
          cx="200"
          cy="200"
          r="176"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeOpacity="0.2"
        />
        {Array.from({ length: 72 }).map((_, i) => {
          const major = i % 6 === 0;
          return (
            <line
              key={i}
              x1="200"
              y1={major ? 12 : 16}
              x2="200"
              y2="23"
              stroke="currentColor"
              strokeWidth={major ? 1 : 0.6}
              strokeOpacity={major ? 0.4 : 0.2}
              transform={`rotate(${i * 5} 200 200)`}
            />
          );
        })}
      </g>

      {/* fixed index marker */}
      <path d="M200 4 l5 11 -10 0 z" fill={ACC} fillOpacity="0.85" />

      {/* the gear train — tangent, meshing, exact ratios */}
      <Gear cx={200} cy={210} n={40} dir="gear-cw" dur={30} />
      <Gear cx={76} cy={165} n={26} dir="gear-ccw" dur={19.5} />
      <Gear cx={288.9} cy={135.4} n={18} dir="gear-ccw" dur={13.5} />
      <Gear cx={344.3} cy={167.4} n={14} dir="gear-cw" dur={10.5} />
    </svg>
  );
}
