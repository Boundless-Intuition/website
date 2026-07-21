import { useEffect, useState } from "react";

type Token = { t: string; c?: "kw" | "num" | "cmt" | "fn" };
type Line = { toks: Token[]; note?: string };
type Artifact = {
  id: string;
  label: string;
  runner: string;
  title: string;
  summary: string;
  lines: Line[];
  verdict: string;
  verdictPlain: string;
};

const A: Artifact[] = [
  {
    id: "smt",
    label: "Z3 · SMT-LIB",
    runner: "z3 dose.smt2",
    title: "Pediatric dose safety",
    summary:
      "A theorem prover searches every possible patient in the drug label window for a dose that could exceed the ceiling. If it finds none, the ceiling is proven.",
    lines: [
      { toks: [{ t: "(set-logic QF_LRA)", c: "kw" }], note: "Work in linear real arithmetic - decidable and complete." },
      { toks: [{ t: "(declare-const " }, { t: "weight", c: "fn" }, { t: " Real)" }], note: "The unknowns the prover will vary over." },
      { toks: [{ t: "(declare-const " }, { t: "height", c: "fn" }, { t: " Real)" }] },
      { toks: [{ t: "(declare-const " }, { t: "dose", c: "fn" }, { t: " Real)" }] },
      { toks: [{ t: "(assert (and (>= weight " }, { t: "10", c: "num" }, { t: ") (<= weight " }, { t: "80", c: "num" }, { t: ")))" }], note: "Weight lies inside the label: 10–80 kg." },
      { toks: [{ t: "(assert (and (>= height " }, { t: "80", c: "num" }, { t: ") (<= height " }, { t: "200", c: "num" }, { t: ")))" }], note: "Height lies inside the label: 80–200 cm." },
      { toks: [{ t: "(assert (= dose (* " }, { t: "15", c: "num" }, { t: " (bsa weight height))))" }], note: "Dose is fixed by the clinical formula." },
      { toks: [{ t: "(assert (> dose " }, { t: "60.0", c: "num" }, { t: "))" }], note: "Assume the opposite of safety - a dose above the ceiling." },
      { toks: [{ t: "(check-sat)", c: "kw" }], note: "If no such patient can exist, the prover returns unsat." },
    ],
    verdict: "unsat",
    verdictPlain: "No patient in the label window can receive an unsafe dose.",
  },
  {
    id: "lean",
    label: "Lean 4",
    runner: "lake env lean Monotone.lean",
    title: "Ranking monotonicity",
    summary:
      "A short machine-checked proof that raising relevance never lowers the ranker's score. Once accepted, no future edit of the ranker can break the property silently.",
    lines: [
      { toks: [{ t: "def ", c: "kw" }, { t: "score", c: "fn" }, { t: " (relevance quality : " }, { t: "Nat", c: "kw" }, { t: ") : " }, { t: "Nat", c: "kw" }, { t: " :=" }], note: "Define what a score is, in exact terms." },
      { toks: [{ t: "  " }, { t: "3", c: "num" }, { t: " * relevance + " }, { t: "2", c: "num" }, { t: " * quality" }] },
      { toks: [{ t: "" }] },
      { toks: [{ t: "theorem ", c: "kw" }, { t: "score_monotone", c: "fn" }, { t: " (r q d : " }, { t: "Nat", c: "kw" }, { t: ") :" }], note: "State the property: raising relevance by d never hurts." },
      { toks: [{ t: "    " }, { t: "score", c: "fn" }, { t: " r q ≤ " }, { t: "score", c: "fn" }, { t: " (r + d) q := " }, { t: "by", c: "kw" }] },
      { toks: [{ t: "  " }, { t: "unfold", c: "kw" }, { t: " score; " }, { t: "omega", c: "kw" }], note: "Lean discharges the arithmetic; the theorem is now a certificate." },
    ],
    verdict: "0 errors  ·  theorem accepted",
    verdictPlain: "Monotonicity is now a machine-checked invariant, not a hope.",
  },
  {
    id: "hyp",
    label: "Python · Hypothesis",
    runner: "pytest test_normalize.py",
    title: "Normalizer idempotence",
    summary:
      "The identifier normalizer is run against ten thousand adversarial inputs. If two applications ever differ from one, the test shrinks the failure to a minimal example.",
    lines: [
      { toks: [{ t: "from ", c: "kw" }, { t: "hypothesis " }, { t: "import ", c: "kw" }, { t: "given, strategies " }, { t: "as ", c: "kw" }, { t: "st" }] },
      { toks: [{ t: "from ", c: "kw" }, { t: "bi.normalize " }, { t: "import ", c: "kw" }, { t: "normalize" }] },
      { toks: [{ t: "" }] },
      { toks: [{ t: "@given(st.text(min_size=" }, { t: "1", c: "num" }, { t: ", max_size=" }, { t: "64", c: "num" }, { t: "))" }], note: "Draw arbitrary strings - the hostile witness generator." },
      { toks: [{ t: "def ", c: "kw" }, { t: "test_idempotent", c: "fn" }, { t: "(s: " }, { t: "str", c: "kw" }, { t: ") -> " }, { t: "None", c: "kw" }, { t: ":" }] },
      { toks: [{ t: "    " }, { t: "assert ", c: "kw" }, { t: "normalize(normalize(s)) == normalize(s)" }], note: "Applying normalize twice must equal applying it once." },
    ],
    verdict: "1 passed  ·  10,000 examples  ·  0 shrinks",
    verdictPlain: "No adversarial input broke the invariant across ten thousand attempts.",
  },
];

const CLASS: Record<NonNullable<Token["c"]>, string> = {
  kw: "text-[oklch(0.72_0.13_170)]",
  num: "text-[oklch(0.82_0.09_60)]",
  cmt: "text-white/35 italic",
  fn: "text-white",
};

export function ArtifactViewer() {
  const [i, setI] = useState(0);
  const art = A[i];

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % A.length), 11000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative rounded-sm bg-ink text-ink-foreground shadow-[0_30px_80px_-40px_oklch(0.22_0.03_250/0.4)] ring-1 ring-foreground/[0.08]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex gap-1">
          {A.map((a, idx) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setI(idx)}
              className={`rounded-sm px-2.5 py-1 font-display text-[11px] font-medium transition-colors ${
                idx === i ? "bg-white/10 text-white" : "text-white/40 hover:text-white/75"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
        <span className="font-mono text-[10px] tabular-nums text-white/40">
          {String(i + 1).padStart(2, "0")} / {String(A.length).padStart(2, "0")}
        </span>
      </div>

      <div className="border-b border-white/5 bg-white/[0.02] px-5 py-4">
        <div className="mb-2 font-display text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[oklch(0.72_0.13_170)]">
          {art.title}
        </div>
        <p className="text-[14px] leading-snug text-white/85">{art.summary}</p>
      </div>

      <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-5 py-2 font-mono text-[10.5px] text-white/40">
        <span>
          <span className="text-white/25">$</span> {art.runner}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr]">
        <div className="max-h-[340px] overflow-hidden px-5 py-5 md:border-r md:border-white/5">
          <pre className="font-mono text-[12.5px] leading-[1.85]">
            {art.lines.map((line, li) => (
              <div key={li} className="flex">
                <span className="w-7 shrink-0 select-none pr-2 text-right text-[10px] tabular-nums text-white/20">
                  {li + 1}
                </span>
                <span className="flex-1 whitespace-pre">
                  {line.toks.length === 0 || line.toks[0].t === "" ? (
                    <>&nbsp;</>
                  ) : (
                    line.toks.map((tok, ti) => (
                      <span key={ti} className={tok.c ? CLASS[tok.c] : "text-white/85"}>
                        {tok.t}
                      </span>
                    ))
                  )}
                </span>
              </div>
            ))}
          </pre>
        </div>
        <div className="hidden max-h-[340px] overflow-hidden bg-white/[0.015] px-5 py-5 md:block">
          <div className="mb-3 font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
            Reading
          </div>
          <ol className="space-y-2.5">
            {art.lines
              .map((l, li) => ({ note: l.note, li: li + 1 }))
              .filter((x) => x.note)
              .map((x) => (
                <li key={x.li} className="flex gap-3 text-[13px] leading-snug text-white/75">
                  <span className="mt-[3px] w-6 shrink-0 font-mono text-[10px] text-[oklch(0.72_0.13_170)]">
                    {String(x.li).padStart(2, "0")}
                  </span>
                  <span>{x.note}</span>
                </li>
              ))}
          </ol>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-4">
        <div className="mb-1.5 flex items-center gap-2 font-mono text-[11px] text-[oklch(0.72_0.13_170)]">
          <span aria-hidden>✓</span>
          <span>{art.verdict}</span>
        </div>
        <p className="text-[13px] text-white/60">{art.verdictPlain}</p>
      </div>
    </div>
  );
}
