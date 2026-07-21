/**
 * MethodStepFigures — an elaborate animated figure per Method step (01–05).
 *
 * Each dramatizes its step: a model "speaking" a fluent stream, rules compiling
 * into a lattice under a scanline, an answer distilling into an abstract logical
 * claim, a proof search whose solution path lights up to ∎ (with a red
 * counterexample), and a gate where verified answers ship and refuted ones bounce.
 * Structure is drawn in the faint blueprint foreground (currentColor); the live
 * beats use the accent with a glow. Pure CSS motion; reduced-motion safe.
 */
const ACC = "oklch(0.72 0.13 176)";
const WARN = "oklch(0.72 0.16 45)";
const MONO = { fontFamily: "var(--font-mono)" };

// 01 · a glowing model core radiates ripples and drives an equalizer stream.
function ModelAnswers() {
  const bars = [50, 62, 74, 86, 98, 110, 122, 134, 146];
  const heights = [12, 22, 16, 26, 18, 24, 14, 20, 15];
  return (
    <svg viewBox="0 0 170 80" className="h-full w-full" aria-hidden>
      {[0, 0.8, 1.6].map((d, i) => (
        <circle
          key={i}
          className="mb-ripple"
          style={{ animationDelay: `${d}s` }}
          cx="26"
          cy="40"
          r="9"
          fill="none"
          stroke={ACC}
          strokeWidth="1.2"
        />
      ))}
      <circle className="pf-glow" cx="26" cy="40" r="5" fill={ACC} />
      {bars.map((x, i) => (
        <rect
          key={i}
          className="mb-eq"
          style={{ animationDelay: `${(i * 0.11).toFixed(2)}s` }}
          x={x}
          y={54 - heights[i]}
          width="6"
          height={heights[i]}
          rx="2"
          fill="currentColor"
          fillOpacity="0.7"
        />
      ))}
      <text
        x="50"
        y="70"
        fontSize="8.5"
        fill="currentColor"
        fillOpacity="0.5"
        style={MONO}
      >
        generating…
      </text>
    </svg>
  );
}

// 02 · a scanline sweeps and compiles raw rules into a glowing logic lattice.
function Lattice() {
  const cols = [36, 86, 136];
  const rows = [22, 42, 60];
  const nodes = cols.flatMap((x) => rows.map((y) => ({ x, y })));
  const edges: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
  // horizontal + vertical mesh
  rows.forEach((y) => {
    edges.push({ x1: cols[0], y1: y, x2: cols[1], y2: y });
    edges.push({ x1: cols[1], y1: y, x2: cols[2], y2: y });
  });
  cols.forEach((x) => {
    edges.push({ x1: x, y1: rows[0], x2: x, y2: rows[1] });
    edges.push({ x1: x, y1: rows[1], x2: x, y2: rows[2] });
  });
  const delay = (x: number) => Math.max(0, ((x - 24) / 120) * 2.4);
  const reveal = (x: number) => ({
    animationDuration: "3.2s",
    animationDelay: `${delay(x).toFixed(2)}s`,
  });
  return (
    <svg viewBox="0 0 170 80" className="h-full w-full" aria-hidden>
      <g stroke={ACC} strokeWidth="1.1" fill="none">
        {edges.map((e, i) => (
          <line
            key={i}
            className="vg-cell"
            style={reveal((e.x1 + e.x2) / 2)}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            strokeOpacity="0.5"
          />
        ))}
      </g>
      {nodes.map((n, i) => (
        <rect
          key={i}
          className="vg-cell pf-glow"
          style={reveal(n.x)}
          x={n.x - 3}
          y={n.y - 3}
          width="6"
          height="6"
          rx="1"
          fill={ACC}
        />
      ))}
      {/* scanline */}
      <rect
        className="mb-scan pf-glow"
        x="20"
        y="12"
        width="2.5"
        height="56"
        fill={ACC}
      />
      <text
        x="12"
        y="76"
        fontSize="8.5"
        fill="currentColor"
        fillOpacity="0.5"
        style={MONO}
      >
        compiled once
      </text>
    </svg>
  );
}

// 03 · prose noise dissolves; an abstract logical claim assembles and locks in.
function Claim() {
  // Ambiguous input, scattered across the top, dissolving.
  const noise: Array<[number, number]> = [
    [40, 15],
    [66, 12],
    [92, 17],
    [116, 13],
    [54, 24],
    [104, 25],
  ];
  // Evenly spaced, centred formula (viewBox centre x = 85).
  const toks = [
    { t: "∀x", x: 40 },
    { t: "P(x)", x: 69 },
    { t: "→", x: 96 },
    { t: "Q(x)", x: 122 },
  ];
  return (
    <svg viewBox="0 0 170 80" className="h-full w-full" aria-hidden>
      {noise.map(([x, y], i) => (
        <rect
          key={i}
          className="vg-cell"
          style={{ animationDelay: `${(i * 0.25).toFixed(2)}s` }}
          x={x}
          y={y}
          width="13"
          height="3.5"
          rx="1.75"
          fill="currentColor"
          fillOpacity="0.25"
        />
      ))}
      {toks.map((tk, i) => (
        <g
          key={i}
          className="mb-pop pf-glow"
          style={{ animationDelay: `${(0.3 + i * 0.45).toFixed(2)}s` }}
        >
          <text
            x={tk.x}
            y="49"
            textAnchor="middle"
            fontSize="13"
            fill={ACC}
            style={MONO}
          >
            {tk.t}
          </text>
        </g>
      ))}
      <text
        x="85"
        y="70"
        textAnchor="middle"
        fontSize="8.5"
        fill="currentColor"
        fillOpacity="0.5"
        style={MONO}
      >
        precise claim
      </text>
    </svg>
  );
}

// 04 · a search tree expands; the solution path lights up to ∎, one branch refuted.
function SearchTree() {
  const tree = [
    "M85 12 L50 36",
    "M85 12 L120 36",
    "M50 36 L32 60",
    "M50 36 L66 60",
    "M120 36 L104 60",
    "M120 36 L138 60",
  ];
  return (
    <svg viewBox="0 0 170 80" className="h-full w-full" aria-hidden>
      {/* faint explored tree */}
      <g fill="none" stroke="currentColor" strokeWidth="1.1">
        {tree.map((d, i) => (
          <path
            key={i}
            className="pl-prove"
            pathLength={1}
            d={d}
            strokeOpacity="0.35"
            style={{
              animationDuration: "2.8s",
              animationDelay: `${(0.2 + i * 0.18).toFixed(2)}s`,
            }}
          />
        ))}
      </g>
      {/* winning path traces bright, after the search */}
      <path
        className="pl-prove pf-glow"
        pathLength={1}
        d="M85 12 L50 36 L66 60"
        fill="none"
        stroke={ACC}
        strokeWidth="1.9"
        style={{ animationDuration: "2.8s", animationDelay: "1.5s" }}
      />
      <circle cx="85" cy="12" r="3.5" fill="currentColor" fillOpacity="0.7" />
      <circle className="vg-pulse" cx="50" cy="36" r="3" fill="currentColor" />
      <circle
        className="vg-pulse"
        style={{ animationDelay: "0.4s" }}
        cx="120"
        cy="36"
        r="3"
        fill="currentColor"
      />
      <circle cx="32" cy="60" r="2.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="104" cy="60" r="2.5" fill="currentColor" fillOpacity="0.3" />
      {/* proven leaf → ∎ */}
      <g className="vg-check pf-glow">
        <rect x="61" y="55" width="10" height="10" rx="1.5" fill={ACC} />
      </g>
      {/* refuted leaf → counterexample */}
      <g className="vg-check">
        <path
          d="M133 56 l9 9 M142 56 l-9 9"
          stroke={WARN}
          strokeWidth="1.5"
          fill="none"
        />
      </g>
      <text
        x="12"
        y="76"
        fontSize="8.5"
        fill="currentColor"
        fillOpacity="0.5"
        style={MONO}
      >
        search → ∎
      </text>
    </svg>
  );
}

// 05 · a gate — a stream of verified certificates ships; the refuted one bounces.
function ShipGate() {
  return (
    <svg viewBox="0 0 170 80" className="h-full w-full" aria-hidden>
      <line
        x1="94"
        y1="8"
        x2="94"
        y2="54"
        stroke={ACC}
        strokeOpacity="0.5"
        strokeDasharray="3 4"
      />
      {/* a stream of verified certificates glides through */}
      {[0, 1.1, 2.2].map((d, i) => (
        <g
          key={i}
          className="mb-ship pf-glow"
          style={{ animationDelay: `${d}s` }}
        >
          <g transform="translate(8,16)">
            <rect
              x="0"
              y="0"
              width="16"
              height="12"
              rx="2"
              fill="none"
              stroke={ACC}
              strokeWidth="1.2"
            />
            <path
              d="M4 6 l3 3 6 -7"
              fill="none"
              stroke={ACC}
              strokeWidth="1.4"
            />
          </g>
        </g>
      ))}
      {/* refuted answer bounces off the gate */}
      <g className="mb-bounce" style={{ animationDelay: "0.5s" }}>
        <g transform="translate(42,46)">
          <rect
            x="0"
            y="0"
            width="14"
            height="12"
            rx="2"
            fill="none"
            stroke={WARN}
            strokeWidth="1.2"
          />
          <path d="M3 3 l8 6 M11 3 l-8 6" stroke={WARN} strokeWidth="1.3" />
        </g>
      </g>
      <text
        x="116"
        y="26"
        fontSize="8.5"
        fill={ACC}
        fillOpacity="0.85"
        style={MONO}
      >
        ships
      </text>
      <text
        x="12"
        y="74"
        fontSize="8.5"
        fill={WARN}
        fillOpacity="0.85"
        style={MONO}
      >
        blocked
      </text>
    </svg>
  );
}

const FIGURES = [ModelAnswers, Lattice, Claim, SearchTree, ShipGate];

export function MethodStepFigure({ index }: { index: number }) {
  const Figure = FIGURES[index % FIGURES.length];
  return <Figure />;
}
