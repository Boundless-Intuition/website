/**
 * DomainFigures — a small figure per domain box, each tied to its subject.
 *
 * Blueprint/accent line-art (single currentColor). The static structure reads as
 * the domain; a looping accent motion reads as "being verified". Pure CSS motion
 * (vg-* / pl-prove classes in styles.css); freezes gracefully under
 * prefers-reduced-motion.
 */
const MONO = { fontFamily: "var(--font-mono)" };

// 01 · Security & Compliance — a shield with a resolving check.
function Shield() {
  return (
    <svg viewBox="0 0 200 72" className="h-full w-auto" aria-hidden>
      <path
        d="M40 8 L64 16 V36 C64 50 54 58 40 64 C26 58 16 50 16 36 V16 Z"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1.3"
      />
      <path
        className="vg-check"
        d="M30 35 l7 8 14 -17"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <text
        x="82"
        y="34"
        fontSize="8.5"
        fill="currentColor"
        fillOpacity="0.5"
        style={MONO}
      >
        policy ⊨
      </text>
      <text
        x="82"
        y="46"
        fontSize="8.5"
        fill="currentColor"
        fillOpacity="0.5"
        style={MONO}
      >
        standard
      </text>
    </svg>
  );
}

// 02 · Healthcare & Clinical Safety — an ECG trace sweeping across.
function Ecg() {
  return (
    <svg viewBox="0 0 200 72" className="h-full w-auto" aria-hidden>
      <line
        x1="14"
        y1="40"
        x2="186"
        y2="40"
        stroke="currentColor"
        strokeOpacity="0.22"
      />
      <path
        className="pl-prove"
        pathLength={1}
        d="M14 40 H58 l6 0 l5 -22 l7 42 l6 -32 l5 12 H186"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        style={{ animationDuration: "3s" }}
      />
    </svg>
  );
}

// 03 · Clinical Trials & Protocols — an eligibility checklist ticking.
function Checklist() {
  const rows = [16, 36, 56];
  return (
    <svg viewBox="0 0 200 72" className="h-full w-auto" aria-hidden>
      {rows.map((y, i) => (
        <g key={i}>
          <rect
            x="16"
            y={y - 8}
            width="14"
            height="14"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.3"
          />
          <path
            className="vg-cell"
            style={{ animationDelay: `${(i * 0.6).toFixed(2)}s` }}
            d={`M19 ${y - 1} l3 4 6 -8`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <line
            x1="40"
            y1={y}
            x2={132 - i * 18}
            y2={y}
            stroke="currentColor"
            strokeOpacity="0.3"
          />
        </g>
      ))}
    </svg>
  );
}

// 04 · Network & Infrastructure — a packet crossing a firewall boundary.
function Network() {
  const nodes: Array<[number, number]> = [
    [24, 20],
    [24, 52],
    [52, 36],
  ];
  return (
    <svg viewBox="0 0 200 72" className="h-full w-auto" aria-hidden>
      <line
        x1="24"
        y1="20"
        x2="52"
        y2="36"
        stroke="currentColor"
        strokeOpacity="0.3"
      />
      <line
        x1="24"
        y1="52"
        x2="52"
        y2="36"
        stroke="currentColor"
        strokeOpacity="0.3"
      />
      <line
        x1="52"
        y1="36"
        x2="150"
        y2="36"
        stroke="currentColor"
        strokeOpacity="0.3"
      />
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          className="vg-pulse"
          style={{ animationDelay: `${(i * 0.5).toFixed(2)}s` }}
          cx={x}
          cy={y}
          r="3.5"
          fill="currentColor"
        />
      ))}
      {/* firewall */}
      <line
        x1="100"
        y1="12"
        x2="100"
        y2="60"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeDasharray="3 4"
      />
      <circle cx="150" cy="36" r="3.5" fill="currentColor" fillOpacity="0.6" />
      {/* packet crossing */}
      <g className="vg-token">
        <circle cx="52" cy="36" r="3.5" fill="currentColor" />
      </g>
      <g className="vg-check">
        <path
          d="M92 36 l3 4 7 -9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </g>
    </svg>
  );
}

// 05 · Finance & Risk — bars rising, held under a covenant limit.
function RiskBars() {
  const bars: Array<[number, number]> = [
    [26, 34],
    [50, 26],
    [74, 40],
    [98, 30],
    [122, 44],
  ];
  return (
    <svg viewBox="0 0 200 72" className="h-full w-auto" aria-hidden>
      <line
        x1="14"
        y1="64"
        x2="150"
        y2="64"
        stroke="currentColor"
        strokeOpacity="0.3"
      />
      <line
        x1="14"
        y1="20"
        x2="150"
        y2="20"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeDasharray="3 3"
      />
      <text
        x="154"
        y="23"
        fontSize="7.5"
        fill="currentColor"
        fillOpacity="0.5"
        style={MONO}
      >
        limit
      </text>
      {bars.map(([x, top], i) => (
        <rect
          key={i}
          className="vg-barrise"
          style={{ animationDelay: `${(i * 0.22).toFixed(2)}s` }}
          x={x}
          y={top}
          width="14"
          height={64 - top}
          fill="currentColor"
          fillOpacity="0.7"
        />
      ))}
    </svg>
  );
}

// 06 · Legal & Regulatory — scales settling into balance.
function Scales() {
  return (
    <svg viewBox="0 0 200 72" className="h-full w-auto" aria-hidden>
      <line
        x1="60"
        y1="16"
        x2="60"
        y2="58"
        stroke="currentColor"
        strokeOpacity="0.5"
      />
      <path d="M48 58 h24" stroke="currentColor" strokeOpacity="0.5" />
      <g className="vg-balance">
        <line
          x1="32"
          y1="20"
          x2="88"
          y2="20"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M32 20 v6 M26 26 a6 4 0 0 0 12 0"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.6"
        />
        <path
          d="M88 20 v6 M82 26 a6 4 0 0 0 12 0"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.6"
        />
      </g>
      <circle cx="60" cy="20" r="2.5" fill="currentColor" />
      <text
        x="106"
        y="38"
        fontSize="8.5"
        fill="currentColor"
        fillOpacity="0.5"
        style={MONO}
      >
        consistent
      </text>
    </svg>
  );
}

// 07 · Data Protection & Privacy — a record whose PII fields mask to dots.
function Redaction() {
  const rows = [22, 38, 54];
  const dots = [56, 66, 76, 86, 96, 106];
  return (
    <svg viewBox="0 0 200 72" className="h-full w-auto" aria-hidden>
      <rect
        x="16"
        y="10"
        width="120"
        height="52"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
      />
      {rows.map((y, i) => (
        <g key={i}>
          {/* field label */}
          <rect
            x="26"
            y={y - 2.5}
            width="18"
            height="5"
            rx="2"
            fill="currentColor"
            fillOpacity="0.3"
          />
          {/* raw value, faint underneath */}
          <rect
            x="54"
            y={y - 2.5}
            width="56"
            height="5"
            rx="2"
            fill="currentColor"
            fillOpacity="0.12"
          />
          {/* masking dots sweeping in over the value */}
          {dots.map((x, di) => (
            <circle
              key={di}
              className="vg-cell"
              style={{ animationDelay: `${(i * 0.5 + di * 0.08).toFixed(2)}s` }}
              cx={x}
              cy={y}
              r="2.2"
              fill="currentColor"
            />
          ))}
        </g>
      ))}
      <text
        x="146"
        y="34"
        fontSize="8.5"
        fill="currentColor"
        fillOpacity="0.5"
        style={MONO}
      >
        PII
      </text>
      <text
        x="146"
        y="46"
        fontSize="8.5"
        fill="currentColor"
        fillOpacity="0.5"
        style={MONO}
      >
        masked
      </text>
    </svg>
  );
}

// 08 · Export Control & Sanctions — an item routed to permit ✓ vs control ✗.
function Classification() {
  return (
    <svg viewBox="0 0 200 72" className="h-full w-auto" aria-hidden>
      {/* incoming item */}
      <line
        x1="14"
        y1="36"
        x2="50"
        y2="36"
        stroke="currentColor"
        strokeOpacity="0.3"
      />
      <circle className="vg-pulse" cx="20" cy="36" r="3" fill="currentColor" />
      {/* decision node (diamond) */}
      <path
        d="M60 26 L70 36 L60 46 L50 36 Z"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.3"
      />
      {/* branches forming */}
      <path
        className="pl-prove"
        pathLength={1}
        d="M70 36 L108 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        style={{ animationDuration: "3s" }}
      />
      <path
        className="pl-prove"
        pathLength={1}
        d="M70 36 L108 54"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.4"
        style={{ animationDuration: "3s", animationDelay: "0.4s" }}
      />
      {/* permit ✓ */}
      <g className="vg-check">
        <path
          d="M112 14 l3 4 7 -9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </g>
      {/* control ✗ (faint) */}
      <path
        d="M112 50 l8 8 M120 50 l-8 8"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1.4"
      />
      <text
        x="126"
        y="20"
        fontSize="8"
        fill="currentColor"
        fillOpacity="0.5"
        style={MONO}
      >
        permit
      </text>
      <text
        x="126"
        y="60"
        fontSize="8"
        fill="currentColor"
        fillOpacity="0.35"
        style={MONO}
      >
        control
      </text>
    </svg>
  );
}

const FIGURES = [
  Shield,
  Ecg,
  Checklist,
  Network,
  RiskBars,
  Scales,
  Redaction,
  Classification,
];

export function DomainFigure({ index }: { index: number }) {
  const Figure = FIGURES[index % FIGURES.length];
  return <Figure />;
}
