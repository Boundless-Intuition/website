export function Astrolabe({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g style={{ animation: "slow-spin 240s linear infinite", transformOrigin: "200px 200px" }}>
        <circle cx="200" cy="200" r="188" fill="none" stroke="currentColor" strokeOpacity="0.4" />
        <circle cx="200" cy="200" r="176" fill="none" stroke="currentColor" strokeOpacity="0.18" />
        {Array.from({ length: 72 }).map((_, i) => {
          const a = (i * 5 * Math.PI) / 180;
          const long = i % 6 === 0;
          const r2 = long ? 164 : 172;
          return (
            <line
              key={i}
              x1={200 + Math.cos(a) * 176}
              y1={200 + Math.sin(a) * 176}
              x2={200 + Math.cos(a) * r2}
              y2={200 + Math.sin(a) * r2}
              stroke="currentColor"
              strokeOpacity={long ? 0.45 : 0.2}
            />
          );
        })}
      </g>
      <g style={{ animation: "rev-spin 160s linear infinite", transformOrigin: "200px 200px" }}>
        <circle cx="200" cy="200" r="128" fill="none" stroke="currentColor" strokeOpacity="0.3" />
        <circle cx="200" cy="200" r="96" fill="none" stroke="currentColor" strokeOpacity="0.2" />
        <line x1="12" y1="200" x2="388" y2="200" stroke="currentColor" strokeOpacity="0.14" />
        <line x1="200" y1="12" x2="200" y2="388" stroke="currentColor" strokeOpacity="0.14" />
        <line x1="60" y1="60" x2="340" y2="340" stroke="currentColor" strokeOpacity="0.08" />
        <line x1="340" y1="60" x2="60" y2="340" stroke="currentColor" strokeOpacity="0.08" />
      </g>
      <circle cx="200" cy="200" r="62" fill="none" stroke="currentColor" strokeOpacity="0.5" />
      <circle cx="200" cy="200" r="3.5" fill="currentColor" opacity="0.7" />
    </svg>
  );
}
