/**
 * ProofMark — the small verification glyph (replaces the wax seal).
 *
 * Default is ⊢, the logician's turnstile: "⊢ φ" reads "φ is provable". A quiet,
 * precise mark of a discharged proof. Swap `symbol` for another (∎, ⊨, ∴, Q.E.D.)
 * if you want a different note. Size and colour come from `className`.
 */
export function ProofMark({
  className = "",
  symbol = "⊢",
}: {
  className?: string;
  symbol?: string;
}) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle
        cx="20"
        cy="20"
        r="18.5"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.5"
      />
      <text
        x="20"
        y="21"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="19"
        fill="currentColor"
        style={{ fontFamily: "var(--font-mono)", fontWeight: 500 }}
      >
        {symbol}
      </text>
    </svg>
  );
}
