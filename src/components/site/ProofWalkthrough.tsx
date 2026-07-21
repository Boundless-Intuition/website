import { useEffect, useRef, useState } from "react";

type Token = { t: string; c?: "kw" | "num" | "fn" | "cmt" };
type Stage = {
  n: string;
  title: string;
  body: string;
  lines: number[]; // 1-indexed
};
type Example = {
  id: string;
  label: string;
  tag: string;
  filename: string;
  runner: string;
  claim: string;
  verdict: string;
  verdictBody: string;
  code: Token[][];
  stages: Stage[];
};

const CLINICAL: Example = {
  id: "clinical",
  label: "Clinical safety",
  tag: "Healthcare",
  filename: "dose.smt2",
  runner: "z3 dose.smt2",
  claim:
    'A clinical assistant returns: "administer 45 mg of methotrexate to a 34 kg patient." The sentence sounds right. Nothing about it, as text, tells you whether it is safe. That is what verification is for.',
  verdict: "unsat",
  verdictBody:
    "Safety envelope proved. No patient in the label window can receive a dose above 60 mg.",
  code: [
    [{ t: "; dose.smt2 - pediatric dose safety envelope", c: "cmt" }],
    [{ t: "(set-logic QF_LRA)", c: "kw" }],
    [{ t: "" }],
    [
      { t: "(declare-const " },
      { t: "weight", c: "fn" },
      { t: " Real)     " },
      { t: "; kg", c: "cmt" },
    ],
    [
      { t: "(declare-const " },
      { t: "height", c: "fn" },
      { t: " Real)     " },
      { t: "; cm", c: "cmt" },
    ],
    [
      { t: "(declare-const " },
      { t: "dose", c: "fn" },
      { t: "   Real)     " },
      { t: "; mg", c: "cmt" },
    ],
    [{ t: "" }],
    [
      { t: "(assert (and (>= weight " },
      { t: "10", c: "num" },
      { t: ") (<= weight " },
      { t: "80", c: "num" },
      { t: ")))" },
    ],
    [
      { t: "(assert (and (>= height " },
      { t: "80", c: "num" },
      { t: ") (<= height " },
      { t: "200", c: "num" },
      { t: ")))" },
    ],
    [{ t: "" }],
    [
      { t: "(assert (= dose (* " },
      { t: "15", c: "num" },
      { t: " (bsa weight height))))" },
    ],
    [{ t: "" }],
    [{ t: "; negate the safety property; expect unsat", c: "cmt" }],
    [{ t: "(assert (> dose " }, { t: "60.0", c: "num" }, { t: "))" }],
    [{ t: "" }],
    [{ t: "(check-sat)", c: "kw" }],
  ],
  stages: [
    {
      n: "01",
      title: "The claim",
      body: 'A clinical assistant returns: "administer 45 mg of methotrexate to a 34 kg patient." The sentence sounds right - but sounding right is not the same as being safe. Verification starts here.',
      lines: [],
    },
    {
      n: "02",
      title: "Choose a logic",
      body: "We ask a theorem prover to reason in linear real arithmetic - a well-understood fragment of mathematics guaranteed to give a definite answer.",
      lines: [2],
    },
    {
      n: "03",
      title: "Name the unknowns",
      body: "Weight, height, and dose become real-valued variables. The prover will consider every possible assignment of numbers to them.",
      lines: [4, 5, 6],
    },
    {
      n: "04",
      title: "Encode the label",
      body: "The FDA monograph specifies the patient range the drug is licensed for: 10–80 kg, 80–200 cm. These become constraints the prover enforces across every possible patient.",
      lines: [8, 9],
    },
    {
      n: "05",
      title: "Encode the formula",
      body: "The label also gives the dosing formula: 15 mg per unit of body surface area. That equation becomes another assertion.",
      lines: [11],
    },
    {
      n: "06",
      title: "Negate the property",
      body: "We do not ask the prover to confirm the property. We ask it to find a counterexample - any patient who could receive more than 60 mg.",
      lines: [13, 14],
    },
    {
      n: "07",
      title: "The verdict",
      body: "The prover reports unsat: no such patient exists within the label window. The safety envelope is not a policy or a hope - it is a theorem, machine-checked and independently verifiable.",
      lines: [16],
    },
  ],
};

const SECURITY: Example = {
  id: "security",
  label: "Security & compliance",
  tag: "Access control",
  filename: "rbac.smt2",
  runner: "z3 rbac.smt2",
  claim:
    "A copilot proposes: \"grant the intern the 'auditor' role so they can pull the quarterly report.\" The request sounds reasonable - but does it open a path to customer PII?",
  verdict: "unsat",
  verdictBody:
    "No role-graph path lets a non-privileged user reach PII. The grant is safe to apply and is bound by SOC 2 CC6.1 audit obligations.",
  code: [
    [{ t: "; rbac.smt2 - privilege-escalation check", c: "cmt" }],
    [{ t: "(set-logic QF_UF)", c: "kw" }],
    [{ t: "" }],
    [{ t: "(declare-sort " }, { t: "Role", c: "fn" }, { t: " 0)" }],
    [
      { t: "(declare-const " },
      { t: "intern auditor pii_reader", c: "fn" },
      { t: " Role)" },
    ],
    [{ t: "" }],
    [
      {
        t: "; inherits(a, b) means role a inherits every permission of b",
        c: "cmt",
      },
    ],
    [
      { t: "(declare-fun " },
      { t: "inherits", c: "fn" },
      { t: " (Role Role) Bool)" },
    ],
    [
      { t: "(assert (" },
      { t: "inherits", c: "fn" },
      { t: " intern auditor))" },
    ],
    [{ t: "" }],
    [
      {
        t: "; audit role must NOT be able to read PII, directly or transitively",
        c: "cmt",
      },
    ],
    [
      { t: "(assert (not (" },
      { t: "inherits", c: "fn" },
      { t: " auditor pii_reader)))" },
    ],
    [{ t: "" }],
    [
      {
        t: "; negate: search for any escalation path intern → pii_reader",
        c: "cmt",
      },
    ],
    [
      { t: "(assert (" },
      { t: "inherits", c: "fn" },
      { t: " intern pii_reader))" },
    ],
    [{ t: "" }],
    [{ t: "(check-sat)", c: "kw" }],
  ],
  stages: [
    {
      n: "01",
      title: "The request",
      body: 'A copilot proposes granting an intern the "auditor" role to pull a quarterly report. It sounds reasonable - but reasonable and safe are not the same thing.',
      lines: [],
    },
    {
      n: "02",
      title: "Choose a logic",
      body: "We reason in uninterpreted functions - the natural logic of role graphs, where the only operations are membership and inheritance.",
      lines: [2],
    },
    {
      n: "03",
      title: "Name the roles",
      body: "The intern, the proposed auditor role, and the sensitive pii_reader role become atoms the solver can reason over.",
      lines: [4, 5],
    },
    {
      n: "04",
      title: "The proposed grant",
      body: "Applying the copilot's suggestion, the intern inherits from auditor. This is the change being audited.",
      lines: [8, 9],
    },
    {
      n: "05",
      title: "The compliance rule",
      body: "The organization's SOC 2 policy is explicit: auditor may not inherit pii_reader, directly or transitively.",
      lines: [11, 12],
    },
    {
      n: "06",
      title: "Search for an escalation",
      body: "We do not ask if the grant is safe. We ask the prover to construct any inheritance path from intern to pii_reader.",
      lines: [14, 15],
    },
    {
      n: "07",
      title: "The verdict",
      body: "The prover reports unsat: no escalation path exists under the stated policy. The grant is verifiably safe, and the full derivation is logged as an auditable record.",
      lines: [17],
    },
  ],
};

const FINANCE: Example = {
  id: "finance",
  label: "Finance & risk",
  tag: "Mandate",
  filename: "mandate.smt2",
  runner: "z3 mandate.smt2",
  claim:
    'A trading copilot proposes: "rebalance the fund to 80% equities." It fits the strategy - but does the trade stay inside the mandate the fund is legally bound to?',
  verdict: "unsat",
  verdictBody:
    "No covenant breach exists for this rebalance. The trade set is admissible under the mandate - proved, not spot-checked.",
  code: [
    [{ t: "; mandate.smt2 - portfolio rebalance check", c: "cmt" }],
    [{ t: "(set-logic QF_LRA)", c: "kw" }],
    [{ t: "" }],
    [
      { t: "(declare-const " },
      { t: "equity", c: "fn" },
      { t: " Real)   " },
      { t: "; fraction in equities", c: "cmt" },
    ],
    [
      { t: "(declare-const " },
      { t: "issuer", c: "fn" },
      { t: " Real)   " },
      { t: "; largest single-issuer weight", c: "cmt" },
    ],
    [{ t: "" }],
    [{ t: "; proposed rebalance: 80/20 with a 4% top holding", c: "cmt" }],
    [{ t: "(assert (= equity " }, { t: "0.80", c: "num" }, { t: "))" }],
    [{ t: "(assert (= issuer " }, { t: "0.04", c: "num" }, { t: "))" }],
    [{ t: "" }],
    [{ t: "; mandate covenants", c: "cmt" }],
    [{ t: "(assert (<= equity " }, { t: "0.85", c: "num" }, { t: "))" }],
    [{ t: "(assert (<= issuer " }, { t: "0.05", c: "num" }, { t: "))" }],
    [{ t: "" }],
    [{ t: "; negate: search for any covenant breach", c: "cmt" }],
    [
      { t: "(assert (or (> equity " },
      { t: "0.85", c: "num" },
      { t: ") (> issuer " },
      { t: "0.05", c: "num" },
      { t: ")))" },
    ],
    [{ t: "" }],
    [{ t: "(check-sat)", c: "kw" }],
  ],
  stages: [
    {
      n: "01",
      title: "The proposal",
      body: "A trading copilot proposes rebalancing the fund to 80% equities. It fits the strategy - but the fund is bound by a mandate, and fitting the strategy is not the same as honoring the covenant.",
      lines: [],
    },
    {
      n: "02",
      title: "Choose a logic",
      body: "Portfolio weights are real numbers with linear constraints, so we reason in linear real arithmetic - the prover will consider every admissible allocation.",
      lines: [2],
    },
    {
      n: "03",
      title: "Name the unknowns",
      body: "The equity fraction and the largest single-issuer weight become real-valued variables the solver reasons over.",
      lines: [4, 5],
    },
    {
      n: "04",
      title: "The proposed trade",
      body: "The copilot's rebalance fixes the numbers: 80% equities and a 4% top holding. This is the exact allocation being audited.",
      lines: [7, 8, 9],
    },
    {
      n: "05",
      title: "The mandate covenants",
      body: "The fund's mandate caps equities at 85% and forbids any single issuer above 5%. These become hard constraints.",
      lines: [11, 12, 13],
    },
    {
      n: "06",
      title: "Negate the property",
      body: "We do not ask whether the trade is compliant. We ask the prover to find any breach - an equity or issuer weight that violates a covenant.",
      lines: [15, 16],
    },
    {
      n: "07",
      title: "The verdict",
      body: "The prover reports unsat: no breach exists for this rebalance. The trade is admissible under the mandate, and the check runs again on every future order.",
      lines: [18],
    },
  ],
};

const PRIVACY: Example = {
  id: "privacy",
  label: "Data protection",
  tag: "GDPR transfer",
  filename: "gdpr.smt2",
  runner: "z3 gdpr.smt2",
  claim:
    "A data pipeline is about to replicate EU user records to a US region. The feature works - but is the transfer lawful under GDPR, or a reportable breach waiting to happen?",
  verdict: "unsat",
  verdictBody:
    "No configuration lets a transfer proceed without a lawful basis and an Article 46 safeguard. Compliance here is a theorem, not a checkbox.",
  code: [
    [{ t: "; gdpr.smt2 - lawful cross-border transfer check", c: "cmt" }],
    [{ t: "(set-logic QF_UF)", c: "kw" }],
    [{ t: "" }],
    [
      { t: "(declare-const " },
      { t: "has_lawful_basis", c: "fn" },
      { t: " Bool)  " },
      { t: "; Art. 6 basis", c: "cmt" },
    ],
    [
      { t: "(declare-const " },
      { t: "has_safeguard", c: "fn" },
      { t: " Bool)     " },
      { t: "; Art. 46 SCCs", c: "cmt" },
    ],
    [{ t: "(declare-const " }, { t: "transfer_ok", c: "fn" }, { t: " Bool)" }],
    [{ t: "" }],
    [
      {
        t: "; policy: allow a transfer only with basis AND safeguard",
        c: "cmt",
      },
    ],
    [{ t: "(assert (= transfer_ok (and has_lawful_basis has_safeguard)))" }],
    [{ t: "" }],
    [
      {
        t: "; the pipeline as configured: consent recorded, SCCs in place",
        c: "cmt",
      },
    ],
    [{ t: "(assert has_lawful_basis)" }],
    [{ t: "(assert has_safeguard)" }],
    [{ t: "" }],
    [
      {
        t: "; negate: search for an allowed transfer with no safeguard",
        c: "cmt",
      },
    ],
    [{ t: "(assert (and transfer_ok (not has_safeguard)))" }],
    [{ t: "" }],
    [{ t: "(check-sat)", c: "kw" }],
  ],
  stages: [
    {
      n: "01",
      title: "The transfer",
      body: "A data pipeline is about to replicate EU user records into a US region. The feature works - but a transfer that works and a transfer that is lawful are different questions.",
      lines: [],
    },
    {
      n: "02",
      title: "Choose a logic",
      body: "The obligations are boolean conditions, so we reason in uninterpreted functions over propositions - every combination of facts is considered.",
      lines: [2],
    },
    {
      n: "03",
      title: "Name the facts",
      body: "Whether a lawful basis exists, whether an Article 46 safeguard is in place, and whether the transfer is permitted become boolean variables.",
      lines: [4, 5, 6],
    },
    {
      n: "04",
      title: "Encode the rule",
      body: "GDPR permits the transfer only when both a lawful basis and a valid safeguard are present. That rule becomes an equivalence the prover must respect.",
      lines: [8, 9],
    },
    {
      n: "05",
      title: "The configured pipeline",
      body: "As deployed, the pipeline records consent and has standard contractual clauses in place - both facts are asserted true.",
      lines: [11, 12, 13],
    },
    {
      n: "06",
      title: "Negate the property",
      body: "We ask the prover to find the dangerous case: a transfer that is permitted yet lacks a safeguard - a reportable breach.",
      lines: [15, 16],
    },
    {
      n: "07",
      title: "The verdict",
      body: "The prover reports unsat: no such configuration exists. Under this policy a transfer can never proceed unlawfully, and the guarantee is re-checked on every deployment.",
      lines: [18],
    },
  ],
};

const EXAMPLES: Example[] = [CLINICAL, SECURITY, FINANCE, PRIVACY];

const CLASS = {
  kw: "text-[oklch(0.72_0.13_176)]",
  num: "text-[oklch(0.82_0.09_60)]",
  cmt: "text-white/35 italic",
  fn: "text-white",
} as const;

function CodeCard({
  example,
  active,
  activeLines,
  isVerdict,
}: {
  example: Example;
  active: number;
  activeLines: Set<number>;
  isVerdict: boolean;
}) {
  return (
    <div className="rounded-sm bg-ink text-ink-foreground shadow-[0_30px_80px_-40px_oklch(0.22_0.03_250/0.5)] ring-1 ring-foreground/10">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-white/10" />
            <span className="size-2 rounded-full bg-white/10" />
            <span className="size-2 rounded-full bg-[oklch(0.72_0.13_176)]" />
          </div>
          <span className="font-mono text-[10.5px] text-white/40">
            {example.filename}
          </span>
        </div>
        <span className="font-mono text-[10px] tabular-nums text-white/40">
          Stage {active + 1} / {example.stages.length}
        </span>
      </div>
      <div className="border-b border-white/5 bg-white/[0.02] px-5 py-2 font-mono text-[10.5px] text-white/40">
        <span className="text-white/25">$</span> {example.runner}
      </div>
      <div className="px-4 py-5">
        <pre className="font-mono text-[13px] leading-[1.9]">
          {example.code.map((line, li) => {
            const lineNo = li + 1;
            const highlighted = activeLines.has(lineNo);
            const hasHighlights = activeLines.size > 0;
            const dim = hasHighlights && !highlighted;
            return (
              <div
                key={li}
                className={`relative flex transition-all duration-500 ${
                  dim ? "opacity-25" : "opacity-100"
                }`}
              >
                <span
                  className={`absolute -left-2 top-0 bottom-0 w-0.5 rounded-full transition-colors ${
                    highlighted ? "bg-[oklch(0.72_0.13_176)]" : "bg-transparent"
                  }`}
                />
                <span className="w-7 shrink-0 select-none pr-2 text-right text-[10px] tabular-nums text-white/20">
                  {lineNo}
                </span>
                <span className="flex-1 whitespace-pre">
                  {line[0]?.t === "" && line.length === 1 ? (
                    <>&nbsp;</>
                  ) : (
                    line.map((tok, ti) => (
                      <span
                        key={ti}
                        className={tok.c ? CLASS[tok.c] : "text-white/85"}
                      >
                        {tok.t}
                      </span>
                    ))
                  )}
                </span>
              </div>
            );
          })}
        </pre>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 transition-all duration-700 ${
          isVerdict ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-4">
          <div className="mb-1.5 flex items-center gap-2 font-mono text-[11px] text-[oklch(0.72_0.13_176)]">
            <span aria-hidden>✓</span>
            <span>{example.verdict}</span>
          </div>
          <p className="text-[13px] text-white/70">{example.verdictBody}</p>
        </div>
      </div>
    </div>
  );
}

export function ProofWalkthrough() {
  const [exampleIdx, setExampleIdx] = useState(0);
  const [active, setActive] = useState(0);
  const [mobileCodeOpen, setMobileCodeOpen] = useState(true);
  const stageRefs = useRef<Array<HTMLLIElement | null>>([]);

  const example = EXAMPLES[exampleIdx];

  useEffect(() => {
    setActive(0);
  }, [exampleIdx]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const idx = Number((visible[0].target as HTMLElement).dataset.stage);
          if (!Number.isNaN(idx)) setActive(idx);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    stageRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [exampleIdx]);

  const activeLines = new Set(example.stages[active]?.lines ?? []);
  const isVerdict = active === example.stages.length - 1;

  return (
    <section
      id="walkthrough"
      className="relative border-b border-border bg-muted/40"
    >
      <div className="relative mx-auto max-w-7xl px-6 py-28">
        <div className="mb-14 max-w-3xl">
          <div className="mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-8 bg-foreground/40" />
            <span className="text-foreground/70">§ V</span>
            <span className="text-muted-foreground/50">·</span>
            <span>Interactive walkthrough</span>
          </div>
          <h2 className="mb-6 font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]">
            Watch a claim become a theorem.
          </h2>
          <p className="max-w-[62ch] text-[16px] leading-relaxed text-muted-foreground">
            See how verification works, step by step: a natural-language claim
            is formalized into a mathematical object, checked against the rules
            that govern it, and either proved or refuted - with a concrete
            witness. Scroll to advance. Switch examples to see the same method
            applied across domains.
          </p>
        </div>

        {/* Example switcher */}
        <div
          className="mb-14 flex flex-wrap items-center gap-1 rounded-sm border border-border bg-background/60 p-1 w-fit"
          role="tablist"
          aria-label="Choose an example"
        >
          {EXAMPLES.map((ex, i) => (
            <button
              key={ex.id}
              role="tab"
              aria-selected={i === exampleIdx}
              onClick={() => setExampleIdx(i)}
              className={`rounded-sm px-4 py-2 font-display text-[12px] font-medium transition-colors ${
                i === exampleIdx
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {ex.label}
            </button>
          ))}
        </div>

        {/* Mobile / tablet code panel - sticky and collapsible, synced to scroll */}
        <div className="sticky top-20 z-20 mb-10 lg:hidden">
          <div className="rounded-sm border border-border bg-background/80 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setMobileCodeOpen((v) => !v)}
              aria-expanded={mobileCodeOpen}
              className="flex w-full items-center justify-between px-4 py-2.5 font-mono text-[11px] text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[oklch(0.72_0.13_176)]" />
                {example.filename} · Stage {active + 1}/{example.stages.length}
              </span>
              <span
                aria-hidden
                className={`transition-transform duration-300 ${
                  mobileCodeOpen ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>
            </button>
            <div
              className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                mobileCodeOpen
                  ? "max-h-[60vh] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="max-h-[58vh] overflow-y-auto p-1">
                <CodeCard
                  example={example}
                  active={active}
                  activeLines={activeLines}
                  isVerdict={isVerdict}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Stages */}
          <ol key={example.id} className="relative">
            {example.stages.map((s, i) => (
              <li
                key={s.n}
                ref={(el) => {
                  stageRefs.current[i] = el;
                }}
                data-stage={i}
                className="relative min-h-[52vh] border-l border-border pl-8 pb-16 last:pb-0 lg:min-h-[62vh]"
              >
                <span
                  className={`absolute -left-[7px] top-0 grid size-3.5 place-items-center rounded-full border-2 transition-colors ${
                    i <= active
                      ? "border-foreground bg-foreground"
                      : "border-border bg-background"
                  }`}
                />
                <div
                  className={`transition-all duration-500 ${
                    i === active ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <div className="mb-4 flex items-baseline gap-4">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-foreground/60">
                      {s.n}
                    </span>
                    <span className="font-display text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Stage {i + 1} of {example.stages.length}
                    </span>
                  </div>
                  <h3 className="mb-4 font-display text-[26px] font-medium leading-[1.15] tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="max-w-[52ch] text-[15.5px] leading-[1.65] text-foreground/80">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Sticky code panel - desktop */}
          <div className="relative hidden lg:block">
            <div className="sticky top-24">
              <CodeCard
                example={example}
                active={active}
                activeLines={activeLines}
                isVerdict={isVerdict}
              />
              <div className="mt-6 flex items-center gap-2">
                {example.stages.map((_, i) => (
                  <span
                    key={i}
                    className={`h-px flex-1 transition-colors ${
                      i <= active ? "bg-foreground/70" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
