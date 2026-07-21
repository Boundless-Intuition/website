/**
 * ProcessFlow — the animated "how it works" pipeline for the Engage page.
 *
 * Four stages on a single track — rules in → formalize → prove on every change →
 * certify. A glowing packet travels the track and each stage's halo flashes as it
 * passes, so the whole diagram reads as one continuous run. Structure is drawn in
 * the faint blueprint foreground; the packet and stage flashes use the accent.
 * Pure CSS motion (pf-* classes); freezes gracefully under reduced motion.
 */
const ACC = "oklch(0.72 0.13 176)";
const MONO = { fontFamily: "var(--font-mono)" };

const STAGES = [
  { cx: 120, n: "01", label: "rules in" },
  { cx: 340, n: "02", label: "formalize" },
  { cx: 560, n: "03", label: "prove / change" },
  { cx: 780, n: "04", label: "certify" },
];
// Flash delays roughly track the packet's arrival at each stage.
const FLASH_DELAY = [0.3, 1.9, 3.6, 5.3];

function StageIcon({ index, cx }: { index: number; cx: number }) {
  if (index === 0) {
    // incoming documents
    return (
      <g
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.3"
      >
        <rect
          x={cx - 20}
          y={28}
          width="26"
          height="34"
          rx="2"
          strokeOpacity="0.28"
        />
        <rect
          x={cx - 10}
          y={34}
          width="26"
          height="34"
          rx="2"
          fill="var(--background)"
        />
        <line x1={cx - 4} y1={44} x2={cx + 12} y2={44} strokeOpacity="0.4" />
        <line x1={cx - 4} y1={51} x2={cx + 12} y2={51} strokeOpacity="0.4" />
        <line x1={cx - 4} y1={58} x2={cx + 6} y2={58} strokeOpacity="0.4" />
      </g>
    );
  }
  if (index === 1) {
    // natural language compiled to a formal object
    return (
      <g>
        <rect
          x={cx - 30}
          y={30}
          width="60"
          height="38"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1.3"
        />
        <text
          x={cx}
          y={54}
          textAnchor="middle"
          fontSize="15"
          fill={ACC}
          style={MONO}
        >
          ∀x· ⊢
        </text>
      </g>
    );
  }
  if (index === 2) {
    // commits, each proved
    return (
      <g>
        <line
          x1={cx - 26}
          y1={48}
          x2={cx + 26}
          y2={48}
          stroke="currentColor"
          strokeOpacity="0.35"
        />
        {[-26, 0, 26].map((dx, i) => (
          <g key={i}>
            <circle
              cx={cx + dx}
              cy={48}
              r="4"
              fill="currentColor"
              fillOpacity="0.5"
            />
            <path
              d={`M${cx + dx - 3} ${34} l2.5 3 5 -6`}
              fill="none"
              stroke={ACC}
              strokeWidth="1.5"
            />
          </g>
        ))}
      </g>
    );
  }
  // signed certificate
  return (
    <g>
      <rect
        x={cx - 22}
        y={28}
        width="44"
        height="42"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.3"
      />
      <line
        x1={cx - 14}
        y1={38}
        x2={cx + 6}
        y2={38}
        stroke="currentColor"
        strokeOpacity="0.4"
      />
      <line
        x1={cx - 14}
        y1={45}
        x2={cx + 2}
        y2={45}
        stroke="currentColor"
        strokeOpacity="0.4"
      />
      <rect x={cx - 3} y={54} width="9" height="9" rx="1.5" fill={ACC} />
      <circle
        cx={cx + 14}
        cy={60}
        r="8"
        fill="none"
        stroke={ACC}
        strokeOpacity="0.7"
      />
      <path
        d={`M${cx + 10} 60 l2.5 3 5 -6`}
        fill="none"
        stroke={ACC}
        strokeWidth="1.5"
      />
    </g>
  );
}

export function ProcessFlow() {
  return (
    <svg
      viewBox="0 0 900 150"
      className="h-full w-full text-foreground"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {/* track */}
      <line
        x1="90"
        y1="85"
        x2="810"
        y2="85"
        stroke="currentColor"
        strokeOpacity="0.22"
      />

      {STAGES.map((s, i) => (
        <g key={s.n}>
          {/* connector tick from icon down to the node */}
          <line
            x1={s.cx}
            y1={70}
            x2={s.cx}
            y2={79}
            stroke="currentColor"
            strokeOpacity="0.25"
          />
          <StageIcon index={i} cx={s.cx} />

          {/* node + flashing halo */}
          <circle
            className="pf-flash pf-glow"
            style={{ animationDelay: `${FLASH_DELAY[i]}s` }}
            cx={s.cx}
            cy={85}
            r="14"
            fill="none"
            stroke={ACC}
            strokeWidth="1.5"
          />
          <circle
            cx={s.cx}
            cy={85}
            r="5"
            fill="currentColor"
            fillOpacity="0.55"
          />

          {/* label */}
          <text
            x={s.cx}
            y={118}
            textAnchor="middle"
            fontSize="10.5"
            fill="currentColor"
            fillOpacity="0.55"
            style={MONO}
          >
            {s.label}
          </text>
          <text
            x={s.cx}
            y={134}
            textAnchor="middle"
            fontSize="9"
            fill={ACC}
            fillOpacity="0.7"
            style={MONO}
          >
            {s.n}
          </text>
        </g>
      ))}

      {/* the glowing packet running the whole pipeline */}
      <g className="pf-packet pf-glow">
        <circle cx="90" cy="85" r="5.5" fill={ACC} />
        <circle
          cx="90"
          cy="85"
          r="10"
          fill="none"
          stroke={ACC}
          strokeOpacity="0.5"
        />
      </g>
    </svg>
  );
}
