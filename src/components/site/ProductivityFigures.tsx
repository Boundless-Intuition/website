/**
 * ProductivityFigures — a small looping line-figure per "faster" value box.
 *
 * Each acts out its claim in the blueprint/accent style (single currentColor,
 * thin strokes). Motion is pure CSS (classes defined in styles.css) and freezes
 * to a sensible static state under prefers-reduced-motion.
 */
const MONO = { fontFamily: "var(--font-mono)" };

// 01 · a token races commit → ci → ship, ending in a flag.
function CiPipeline() {
  const stops = [18, 70, 122, 174];
  return (
    <svg viewBox="0 0 220 80" className="h-full w-auto" aria-hidden>
      <line
        x1="18"
        y1="44"
        x2="174"
        y2="44"
        stroke="currentColor"
        strokeOpacity="0.3"
      />
      {stops.map((x, i) => (
        <circle
          key={i}
          className="vg-pulse"
          style={{ animationDelay: `${(i * 0.5).toFixed(2)}s` }}
          cx={x}
          cy="44"
          r="3.5"
          fill="currentColor"
        />
      ))}
      <g className="vg-token">
        <circle cx="18" cy="44" r="5" fill="currentColor" />
        <circle
          cx="18"
          cy="44"
          r="9"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.5"
        />
      </g>
      <g className="vg-check">
        <path d="M188 26 v24" stroke="currentColor" strokeWidth="1.4" />
        <path d="M188 27 l14 5 -14 5 z" fill="currentColor" />
      </g>
      <text
        x="18"
        y="66"
        fontSize="8"
        fill="currentColor"
        fillOpacity="0.5"
        style={MONO}
      >
        commit → ci → ship
      </text>
    </svg>
  );
}

// 02 · a grid of cases, each resolving to ✓, sweeping forever.
function CasesGrid() {
  const cols = [20, 70, 120, 170];
  const rows = [12, 34, 56];
  return (
    <svg viewBox="0 0 220 80" className="h-full w-auto" aria-hidden>
      {rows.map((y, r) =>
        cols.map((x, c) => {
          const idx = r * 4 + c;
          return (
            <g key={idx}>
              <rect
                x={x}
                y={y}
                width="40"
                height="16"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.22"
              />
              <path
                className="vg-cell"
                style={{
                  animationDelay: `${(c * 0.28 + r * 0.5).toFixed(2)}s`,
                }}
                d={`M${x + 14} ${y + 8} l3 4 6 -8`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </g>
          );
        }),
      )}
    </svg>
  );
}

// 03 · an audit bar fills instantly, then a signed ✓ lands.
function AuditBar() {
  return (
    <svg viewBox="0 0 220 80" className="h-full w-auto" aria-hidden>
      <text
        x="18"
        y="26"
        fontSize="8"
        fill="currentColor"
        fillOpacity="0.5"
        style={MONO}
      >
        query signed proofs
      </text>
      <rect
        x="18"
        y="36"
        width="150"
        height="10"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.3"
      />
      <rect
        className="vg-barfill"
        x="18"
        y="36"
        width="150"
        height="10"
        rx="5"
        fill="currentColor"
        fillOpacity="0.85"
      />
      <g className="vg-check">
        <circle
          cx="192"
          cy="41"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.5"
        />
        <path
          d="M187 41 l3.5 4 7 -9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </g>
    </svg>
  );
}

// 04 · a risk gauge sweeps out of the risk arc and settles in the safe zone.
function RiskGauge() {
  return (
    <svg viewBox="0 0 220 80" className="h-full w-auto" aria-hidden>
      {/* risk half (left) and safe half (right) of the arc */}
      <path
        d="M56 70 A54 54 0 0 1 110 16"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.22"
      />
      <path
        d="M110 16 A54 54 0 0 1 164 70"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.45"
      />
      {/* safe check target */}
      <g className="vg-check">
        <path
          d="M150 40 l3.5 4 7 -9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </g>
      {/* needle, pivoting at bottom-centre */}
      <path
        className="vg-needle"
        d="M107 70 L110 26 L113 70 Z"
        fill="currentColor"
      />
      <circle cx="110" cy="70" r="4" fill="currentColor" />
      <text
        x="44"
        y="78"
        fontSize="7.5"
        fill="currentColor"
        fillOpacity="0.4"
        style={MONO}
      >
        risk
      </text>
      <text
        x="150"
        y="78"
        fontSize="7.5"
        fill="currentColor"
        fillOpacity="0.4"
        style={MONO}
      >
        safe
      </text>
    </svg>
  );
}

const FIGURES = [CiPipeline, CasesGrid, AuditBar, RiskGauge];

export function ProductivityFigure({ index }: { index: number }) {
  const Figure = FIGURES[index % FIGURES.length];
  return <Figure />;
}
