import { useEffect, useState } from "react";
import { ProofMark } from "./ProofMark";

type Check = { label: string; detail: string; state: "pass" | "pending" };
type Case = {
  domain: string;
  prompt: string;
  answer: string;
  checks: Check[];
  verdict: string;
  hash: string;
};

const CASES: Case[] = [
  {
    domain: "Healthcare · Clinical Safety",
    prompt:
      "Prescribe methotrexate for a 34 kg pediatric patient with juvenile arthritis.",
    answer: "15 mg / m² weekly, oral. Recommended for weight ≥ 10 kg.",
    checks: [
      {
        label: "Unit check",
        detail: "dose unit = mg/m²/week ✓",
        state: "pass",
      },
      {
        label: "Safety range",
        detail: "computed dose ≤ 60 mg ceiling",
        state: "pass",
      },
      {
        label: "Missing data",
        detail: "no unmeasured values assumed",
        state: "pass",
      },
    ],
    verdict: "Verified. Dose is within the safety envelope for this patient.",
    hash: "z3://0x8f2c…a41e",
  },
  {
    domain: "Security · Access Control",
    prompt: "Grant the auditor role read access to the customer PII table.",
    answer: "Scoped read on pii.customers, expires in 24h, audit-logged.",
    checks: [
      {
        label: "Least privilege",
        detail: "no write, no export granted",
        state: "pass",
      },
      {
        label: "Escalation path",
        detail: "no transitive path to PII",
        state: "pass",
      },
      { label: "SOC 2 CC6.1", detail: "audit trail attached", state: "pass" },
    ],
    verdict: "Verified. No policy violation. Audit record archived.",
    hash: "smt://0x3d17…b902",
  },
  {
    domain: "Finance · Risk",
    prompt: "Rebalance the fund to 80% equities, 20% bonds.",
    answer: "Executes in 3 trades. Post-trade VaR₉₅ = 4.2%.",
    checks: [
      {
        label: "Mandate",
        detail: "equity ≤ 85% covenant satisfied",
        state: "pass",
      },
      { label: "Margin", detail: "maintenance ≥ 1.4× minimum", state: "pass" },
      {
        label: "Concentration",
        detail: "no single issuer > 5%",
        state: "pass",
      },
    ],
    verdict: "Verified. Trade set is admissible under mandate.",
    hash: "smt://0xa10b…7c44",
  },
];

export function TrustPanel() {
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<0 | 1 | 2>(0); // 0 idle, 1 checking, 2 verified
  const [paused, setPaused] = useState(false);

  // Reveal animation for the current case.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setPhase(2);
      return;
    }
    setPhase(0);
    const t1 = window.setTimeout(() => setPhase(1), 400);
    const t2 = window.setTimeout(() => setPhase(2), 1800);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [i]);

  // Auto-advance - slower cadence, and paused while the visitor hovers to read.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || paused) return;
    const t = window.setTimeout(
      () => setI((n) => (n + 1) % CASES.length),
      13000,
    );
    return () => window.clearTimeout(t);
  }, [i, paused]);

  const c = CASES[i];
  const visibleChecks = phase === 0 ? 0 : phase === 1 ? 1 : c.checks.length;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="relative rounded-sm bg-ink text-ink-foreground shadow-[0_30px_80px_-40px_oklch(0.22_0.03_250/0.45)] ring-1 ring-foreground/[0.08]"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">
          <span className="size-1.5 rounded-full bg-[oklch(0.72_0.13_170)]" />
          verification ledger
        </div>
        <div className="flex gap-1">
          {CASES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Case ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-1 w-6 rounded-full transition-colors ${
                idx === i ? "bg-white/70" : "bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Domain tag */}
      <div className="border-b border-white/5 px-5 pt-4">
        <div className="font-display text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.72_0.13_170)]">
          {c.domain}
        </div>
      </div>

      {/* Claim */}
      <div className="border-b border-white/5 px-5 py-4">
        <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
          Prompt
        </div>
        <p className="text-[14.5px] leading-snug text-white/85">{c.prompt}</p>
        <div className="mt-4 mb-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
          Model answer
        </div>
        <p className="text-[14.5px] italic leading-snug text-white/70">
          "{c.answer}"
        </p>
      </div>

      {/* Checks */}
      <div className="px-5 py-4">
        <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
          <span>Checks against machine-readable rules</span>
          <span className="tabular-nums text-white/50">
            {Math.min(visibleChecks, c.checks.length)
              .toString()
              .padStart(2, "0")}{" "}
            / {c.checks.length.toString().padStart(2, "0")}
          </span>
        </div>
        <ul className="space-y-2">
          {c.checks.map((check, ci) => {
            const shown = ci < visibleChecks;
            return (
              <li
                key={ci}
                className={`flex items-start gap-3 rounded-sm border border-white/5 bg-white/[0.02] px-3 py-2.5 transition-all duration-500 ${
                  shown
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-1"
                }`}
              >
                <span
                  className={`mt-1 grid size-4 shrink-0 place-items-center rounded-full text-[10px] ${
                    shown
                      ? "bg-[oklch(0.72_0.13_170)]/20 text-[oklch(0.82_0.14_170)]"
                      : "bg-white/10 text-white/40"
                  }`}
                  aria-hidden
                >
                  ✓
                </span>
                <div className="flex-1">
                  <div className="font-display text-[12.5px] font-medium text-white/90">
                    {check.label}
                  </div>
                  <div className="font-mono text-[11px] text-white/50">
                    {check.detail}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Verdict */}
      <div
        className={`flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4 transition-opacity duration-500 ${
          phase === 2 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2 font-mono text-[11px] text-[oklch(0.72_0.13_170)]">
            <span>proven</span>
            <span className="text-white/25">·</span>
            <span className="tabular-nums text-white/35">{c.hash}</span>
          </div>
          <p className="text-[13px] text-white/65">{c.verdict}</p>
        </div>
        {phase === 2 && (
          <ProofMark
            key={i}
            className="seal-stamp h-9 w-9 shrink-0 text-[oklch(0.72_0.13_170)]"
          />
        )}
      </div>
    </div>
  );
}
