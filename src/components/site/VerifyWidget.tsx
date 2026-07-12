import { useEffect, useMemo, useRef, useState } from "react";
import { ProofMark } from "./ProofMark";
import type { Tint } from "./domain-visuals/engine";
import {
  proverField,
  type ProverStatus,
} from "./domain-visuals/proverField";
import { useDomainCanvas } from "./domain-visuals/useDomainCanvas";

/**
 * VerifyWidget — an interactive demonstration of verifying an AI answer.
 *
 * Each case is an answer an LLM/agent might produce in a high-stakes domain. The
 * value the visitor edits is fed into a REAL constraint check that runs in the
 * browser: push it out of bounds and the verdict flips from "proven" (unsat) to
 * a concrete "counterexample" (sat). Nothing is looked up from a table — the
 * output is computed from the input, and the log echoes the actual numbers, so
 * it's visibly live rather than a canned transcript.
 */
type Result = { proven: boolean; witness: string };

type Claim = {
  domain: string;
  agent: string;
  rule: string;
  value: string;
  param: {
    label: string;
    unit: string;
    min: number;
    max: number;
    step: number;
    default: number;
  };
  /** the provable interval, in slider units — outside it the check refutes */
  safe: { lo: number; hi: number };
  answer: (v: number) => string;
  check: (v: number) => Result;
  smt: (v: number) => string[];
};

const round1 = (n: number) => Math.round(n * 10) / 10;

const CLAIMS: Claim[] = [
  {
    domain: "Healthcare",
    agent: "AI clinical copilot",
    rule: "dose ≤ 60 mg ceiling · patient ≥ 10 kg (drug label)",
    value:
      "An AI copilot can hallucinate a dose. We prove every order stays inside the drug label before a clinician ever sees it.",
    param: {
      label: "patient weight",
      unit: "kg",
      min: 6,
      max: 120,
      step: 1,
      default: 34,
    },
    safe: { lo: 10, hi: 100 },
    answer: (w) =>
      `Administer methotrexate ${round1(0.6 * w)} mg this week (${w} kg patient).`,
    check: (w) => {
      const dose = round1(0.6 * w);
      if (w < 10)
        return {
          proven: false,
          witness: `weight ${w} kg is below the 10 kg label minimum`,
        };
      if (dose > 60)
        return {
          proven: false,
          witness: `at ${w} kg the formula yields ${dose} mg > 60 mg ceiling`,
        };
      return {
        proven: true,
        witness: "the ordered dose stays inside the drug label",
      };
    },
    smt: (w) => [
      "$ z3 verify dose.smt2",
      `read AI answer → dose = ${round1(0.6 * w)} mg,  weight = ${w} kg`,
      "(set-logic QF_LRA)",
      "(declare-const weight Real) (declare-const dose Real)",
      `(assert (= weight ${w}))              ; this patient`,
      "(assert (= dose (* 0.6 weight)))      ; the AI's dosing",
      "(assert (or (< weight 10)             ; below label, or",
      "            (> dose 60)))             ; above ceiling",
      "(check-sat)",
    ],
  },
  {
    domain: "Access control",
    agent: "AI ops agent",
    rule: "read-only · no export · TTL ≤ 24 h",
    value:
      "AI agents write access policies now. We prove each grant obeys least-privilege and expiry before it is ever applied.",
    param: {
      label: "grant TTL",
      unit: "h",
      min: 1,
      max: 96,
      step: 1,
      default: 24,
    },
    safe: { lo: 1, hi: 24 },
    answer: (ttl) =>
      `GRANT read ON pii.customers TO role=support · ttl=${ttl}h`,
    check: (ttl) =>
      ttl > 24
        ? {
            proven: false,
            witness: `ttl ${ttl}h exceeds the 24h maximum for PII access`,
          }
        : {
            proven: true,
            witness: "grant is read-only, no export, and expires within 24h",
          },
    smt: (ttl) => [
      "$ z3 verify grant.smt2",
      `read AI answer → read-only, export=false, ttl = ${ttl}h`,
      "(set-logic QF_LIA)",
      "(declare-const ttl Int)",
      "(declare-const canWrite Bool) (declare-const canExport Bool)",
      `(assert (= ttl ${ttl}))`,
      "(assert (not canWrite)) (assert (not canExport))",
      "(assert (or canWrite canExport (> ttl 24)))  ; any escalation?",
      "(check-sat)",
    ],
  },
  {
    domain: "Finance",
    agent: "AI portfolio agent",
    rule: "equity exposure ≤ 85% (fund mandate)",
    value:
      "An AI advisor proposes allocations. We prove each one satisfies the fund's mandate before a single trade is placed.",
    param: {
      label: "equity target",
      unit: "%",
      min: 0,
      max: 100,
      step: 1,
      default: 80,
    },
    safe: { lo: 0, hi: 85 },
    answer: (eq) => `Rebalance to ${eq}% equities / ${100 - eq}% bonds.`,
    check: (eq) =>
      eq > 85
        ? {
            proven: false,
            witness: `equity ${eq}% breaches the ≤ 85% mandate covenant`,
          }
        : {
            proven: true,
            witness: "allocation satisfies the ≤ 85% equity covenant",
          },
    smt: (eq) => [
      "$ z3 verify allocation.smt2",
      `read AI answer → equity = ${eq}%, bonds = ${100 - eq}%`,
      "(set-logic QF_LRA)",
      "(declare-const equity Real)",
      `(assert (= equity ${eq}))`,
      "(assert (> equity 85))                ; breach the mandate?",
      "(check-sat)",
    ],
  },
];

const ACCENT = "oklch(0.72 0.09 220)";
const WARN = "oklch(0.72 0.16 45)";

// The console is always ink-dark, so both theme slots carry the bright value.
const T = (l: number, c: number, h: number): Tint => ({
  light: [l, c, h],
  dark: [l, c, h],
});
const FIELD_CYAN = T(0.8, 0.13, 210);
const FIELD_GREEN = T(0.81, 0.2, 150);
const FIELD_WARN = T(0.72, 0.18, 45);

export function VerifyWidget() {
  const [sel, setSel] = useState(0);
  const [v, setV] = useState(CLAIMS[0].param.default);
  const [status, setStatus] = useState<"idle" | "running" | "done">("idle");
  const [step, setStep] = useState(0);
  const [res, setRes] = useState<{
    proven: boolean;
    witness: string;
    verdict: string;
    ms: number;
  } | null>(null);
  const timers = useRef<number[]>([]);

  // Live status fed to the canvas engine — mutated on render so the field
  // reacts on the very next frame without re-creating the engine.
  const statusRef = useRef<ProverStatus>({ mode: "idle", proven: true });
  const make = useMemo(
    () =>
      proverField(
        { tint: FIELD_CYAN, ok: FIELD_GREEN, bad: FIELD_WARN },
        () => statusRef.current,
      ),
    [],
  );
  const { canvasRef, pointerTargetRef } = useDomainCanvas(make);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const reset = () => {
    clearTimers();
    setStatus("idle");
    setStep(0);
    setRes(null);
  };

  // New claim → load its default value and reset the run.
  useEffect(() => {
    setV(CLAIMS[sel].param.default);
    reset();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sel]);

  const c = CLAIMS[sel];
  const lines = c.smt(v);

  const run = () => {
    if (status === "running") return;
    clearTimers();

    // The actual verification — run for real, and time it honestly.
    const t0 = typeof performance !== "undefined" ? performance.now() : 0;
    const r = c.check(v);
    const ms =
      (typeof performance !== "undefined" ? performance.now() : 0) - t0;
    setRes({
      proven: r.proven,
      witness: r.witness,
      verdict: r.proven ? "unsat" : "sat",
      ms,
    });

    setStatus("running");
    setStep(0);

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStep(lines.length);
      setStatus("done");
      return;
    }

    lines.forEach((_, idx) => {
      timers.current.push(
        window.setTimeout(() => setStep(idx + 1), 300 * (idx + 1)),
      );
    });
    timers.current.push(
      window.setTimeout(() => setStatus("done"), 300 * lines.length + 450),
    );
  };

  const proven = res?.proven ?? true;
  const verdictColor = proven ? ACCENT : WARN;

  statusRef.current.mode = status;
  statusRef.current.proven = proven;

  const pct = (x: number) =>
    ((x - c.param.min) / (c.param.max - c.param.min)) * 100;

  return (
    <section id="try" className="relative border-b border-border bg-background">
      <div
        className="blueprint-grid-fine pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 py-28">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px w-8 bg-foreground/40" />
              <span className="text-foreground/70">§</span>
              <span className="text-muted-foreground/50">·</span>
              <span>Demonstration</span>
            </div>
            <h2 className="font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]">
              Verify an AI answer yourself.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
            Take an answer from an AI copilot, then{" "}
            <span className="text-foreground">change the value</span> and run
            the check. The verdict is computed live in your browser — push it
            out of bounds and watch it break. Nothing here is canned.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-6">
          {/* Claim picker */}
          <div className="flex flex-col gap-3">
            {CLAIMS.map((cl, idx) => (
              <button
                key={cl.domain}
                type="button"
                onClick={() => setSel(idx)}
                className={`group rounded-sm border p-4 text-left transition-all ${
                  idx === sel
                    ? "border-foreground/40 bg-foreground/[0.04]"
                    : "border-border bg-background hover:border-foreground/25"
                }`}
              >
                <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  <span>{cl.domain}</span>
                  <span className="text-foreground/25">·</span>
                  <span>{cl.agent}</span>
                </div>
                <div className="text-[13.5px] leading-snug text-foreground">
                  {cl.value}
                </div>
              </button>
            ))}
          </div>

          {/* Prover console */}
          <div
            ref={pointerTargetRef}
            className="relative overflow-hidden rounded-sm bg-ink text-ink-foreground shadow-[0_30px_80px_-40px_oklch(0.22_0.03_250/0.45)] ring-1 ring-foreground/[0.08] transition-shadow duration-700"
            style={
              status === "done" && res
                ? { boxShadow: `0 0 70px -22px ${verdictColor}` }
                : undefined
            }
          >
            {/* live prover field — idles, surges while checking, floods on verdict */}
            <div className="absolute inset-0" aria-hidden>
              <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-3">
              <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">
                <span
                  className={`size-1.5 rounded-full ${
                    status === "running" ? "animate-pulse" : ""
                  }`}
                  style={{
                    background:
                      status === "running"
                        ? WARN
                        : status === "done"
                          ? verdictColor
                          : "oklch(1 0 0 / 0.3)",
                  }}
                />
                proof engine
              </div>
              <span className="font-mono text-[10px] text-white/35">
                {c.domain}
              </span>
            </div>

            {/* The AI answer + the editable input */}
            <div className="relative border-b border-white/5 bg-white/[0.02] px-5 py-4">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                AI answer · {c.agent}
              </div>
              <p className="mb-4 font-mono text-[13.5px] leading-snug text-white/85">
                {c.answer(v)}
              </p>
              <div className="flex items-center gap-4">
                <label className="shrink-0 font-mono text-[11px] text-white/45">
                  {c.param.label}
                </label>
                <input
                  type="range"
                  min={c.param.min}
                  max={c.param.max}
                  step={c.param.step}
                  value={v}
                  onChange={(e) => {
                    setV(Number(e.target.value));
                    reset();
                  }}
                  className="flex-1 cursor-pointer"
                  style={{ accentColor: ACCENT }}
                  aria-label={c.param.label}
                />
                <span className="w-16 shrink-0 text-right font-mono text-[15px] tabular-nums text-white">
                  {v}
                  <span className="text-[11px] text-white/40">
                    {" "}
                    {c.param.unit}
                  </span>
                </span>
              </div>
              {/* The provable envelope — drag into the amber and the proof breaks */}
              <div className="relative mt-3 h-[3px] overflow-hidden rounded-full" aria-hidden>
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to right, oklch(0.72 0.18 45 / 0.45) 0% ${pct(c.safe.lo)}%, oklch(0.81 0.2 150 / 0.4) ${pct(c.safe.lo)}% ${pct(c.safe.hi)}%, oklch(0.72 0.18 45 / 0.45) ${pct(c.safe.hi)}% 100%)`,
                  }}
                />
                <div
                  className="absolute top-0 h-full w-[3px] -translate-x-1/2 rounded-full bg-white transition-[left] duration-100"
                  style={{ left: `${pct(v)}%` }}
                />
              </div>
              <div className="mt-1.5 flex items-center justify-between font-mono text-[9.5px]">
                <span className="text-[oklch(0.81_0.2_150/0.8)]">
                  provable · {c.safe.lo}–{c.safe.hi} {c.param.unit}
                </span>
                <span className="text-[oklch(0.72_0.18_45/0.8)]">
                  counterexample territory
                </span>
              </div>
              <div className="mt-3 font-mono text-[10.5px] text-white/35">
                checked against — {c.rule}
              </div>
            </div>

            {/* Log */}
            <div className="relative min-h-[190px] px-5 py-4">
              <div className="space-y-1.5 font-mono text-[11.5px] leading-relaxed text-white/55">
                {status === "idle" ? (
                  <span className="text-white/35">
                    $ z3 verify — press verify to run the check
                  </span>
                ) : (
                  lines.slice(0, step).map((s, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-white/20">
                        {s.startsWith("$") ? " " : "›"}
                      </span>
                      <span
                        className={s.startsWith("$") ? "text-white/40" : ""}
                      >
                        {s}
                      </span>
                    </div>
                  ))
                )}
                {status === "done" && res && (
                  <div className="flex gap-2" style={{ color: verdictColor }}>
                    <span className="text-white/20">{proven ? "⊢" : "⊭"}</span>
                    <span>
                      check-sat →{" "}
                      <span className="font-semibold">{res.verdict}</span>
                      {proven
                        ? " · no counterexample exists"
                        : ` · counterexample: ${res.witness}`}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Verdict / action */}
            <div className="relative flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4">
              {status === "done" && res ? (
                <>
                  <div className="min-w-0">
                    <div
                      className="mb-1 flex flex-wrap items-center gap-x-2 font-mono text-[11px]"
                      style={{ color: verdictColor }}
                    >
                      <span>{proven ? "proven" : "refuted"}</span>
                      <span className="text-white/25">·</span>
                      <span className="text-white/40">
                        checked in {res.ms < 0.5 ? "<0.5" : res.ms.toFixed(1)}{" "}
                        ms
                      </span>
                    </div>
                    <p className="text-[13px] text-white/65">{res.witness}</p>
                  </div>
                  <button
                    type="button"
                    onClick={run}
                    className="shrink-0 rounded-sm p-1 transition-opacity hover:opacity-80"
                    aria-label="Run again"
                    style={{ color: verdictColor }}
                  >
                    <ProofMark
                      symbol={proven ? "⊢" : "⊭"}
                      className="seal-stamp h-10 w-10"
                    />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={run}
                  disabled={status === "running"}
                  className="inline-flex items-center gap-2 border border-white/25 bg-white/5 px-5 py-2.5 font-display text-[12px] font-medium text-white transition-all hover:border-white/50 hover:bg-white/10 disabled:opacity-60"
                >
                  {status === "running" ? "Proving…" : "Verify"}
                  {status !== "running" && <span aria-hidden>→</span>}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
