import { ProductivityFigure } from "./ProductivityFigures";

const PENALTIES = [
  {
    figure: "€20M · 4%",
    label: "GDPR",
    body: "The maximum fine is €20 million or 4% of global annual turnover - whichever is greater. A single unlawful data flow, or one hallucinated disclosure of personal data, is enough to trigger it.",
  },
  {
    figure: "$2M / yr",
    label: "HIPAA",
    body: "Per-violation annual caps on mishandled health data - before the mandatory breach notifications, the OCR investigation, and the class action that follows a leak.",
  },
  {
    figure: "Personal",
    label: "SOX · SEC",
    body: "Executives personally attest to their controls. A materially wrong AI-generated disclosure is not just a corporate fine - it is individual, criminal-adjacent liability.",
  },
  {
    figure: "Precedent",
    label: "Litigation",
    body: "A fabricated citation, an unsafe instruction, a discriminatory decision - once a wrong answer reaches a customer, the cost is discovery, settlement, and case law written against you.",
  },
];

const STAKES = [
  {
    tag: "Healthcare",
    head: "Measured in lives",
    body: "A wrong dose is not a bug ticket. Verification proves the safety envelope holds for every patient in the label window - before the answer ever reaches a clinician.",
  },
  {
    tag: "Finance",
    head: "Measured in mandates",
    body: "A breached covenant or a misfiled disclosure costs fines, restitution, and trust - orders of magnitude beyond the price of proving the trade admissible first.",
  },
  {
    tag: "Security",
    head: "Measured in breaches",
    body: "One over-permissioned grant is an incident waiting to happen. Catching it at proof time is free; catching it in a forensic report is not.",
  },
];

const EFFICIENCY = [
  {
    head: "Fewer model calls",
    body: "Teams paper over unreliability with brute force - retries, self-consistency sampling, ensembles, LLM-as-judge chains - burning tokens to average out errors that never fully vanish. One verified answer replaces a fistful of speculative ones. A proof is deterministic and cacheable; it does not need to be re-rolled.",
  },
  {
    head: "Errors die before they ship",
    body: "A mistake is cheap at proof time and ruinous in production. No rollbacks, no post-hoc audits, no war rooms. Verification deletes the expensive tail of a wrong answer - everything that happens after it escapes.",
  },
  {
    head: "Auditable by construction",
    body: "Every certified answer arrives with its proof attached. The evidence your auditors ask for is a by-product of running the system, not a quarterly scramble.",
  },
];

const PRODUCTIVITY = [
  {
    n: "01",
    head: "Ship at the speed of CI",
    body: "Manual review is the throttle on every AI feature. When correctness is proved automatically, teams merge and deploy without a compliance queue in the critical path.",
  },
  {
    n: "02",
    head: "Engineers build, not babysit",
    body: "No brittle test suites chasing edge cases, no hand-tuned guardrail prompts. The rules are formalized once; the prover covers every case, forever.",
  },
  {
    n: "03",
    head: "Audits in minutes, not quarters",
    body: "Certification becomes a query against signed proofs. Re-certifying after a change is automatic - the evidence regenerates itself.",
  },
  {
    n: "04",
    head: "Automate the high-stakes work",
    body: "Once answers are provably safe, the decisions that were too risky to hand to AI - the ones that actually move the business - can finally be automated.",
  },
];

const ACCENT = "text-[oklch(0.48_0.09_220)] dark:text-[oklch(0.78_0.09_220)]";

function Divider({ label }: { label: string }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export function VerificationValue() {
  return (
    <section
      id="value"
      className="relative border-b border-border bg-background"
    >
      <div
        className="blueprint-grid-fine absolute inset-0 opacity-40"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 py-28">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px w-8 bg-foreground/40" />
              <span className="text-foreground/70">§ IV</span>
              <span className="text-muted-foreground/50">·</span>
              <span>Value</span>
            </div>
            <h2 className="font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]">
              Cheaper than being wrong.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
            Compliance is already one of the largest line items in a regulated
            business - and a single hallucinated answer can turn it into a
            lawsuit. Verification is a fixed, modest cost set against an
            open-ended one.
          </p>
        </div>

        {/* Penalties / exposure */}
        <div className="mb-20">
          <Divider label="The price of a wrong answer" />
          <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {PENALTIES.map((p) => (
              <div
                key={p.label}
                className="flex flex-col gap-3 bg-background p-6 lg:p-7"
              >
                <span className="font-display text-[26px] font-light leading-none tracking-tight text-foreground md:text-[30px]">
                  {p.figure}
                </span>
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.18em] ${ACCENT}`}
                >
                  {p.label}
                </span>
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-[70ch] text-[14px] leading-relaxed text-muted-foreground">
            And that is before the standing cost of staying compliant: the
            reviewers, the outside counsel, the audit consultants, the quarterly
            evidence-gathering. Formal verification turns that recurring manual
            tax into a check that runs itself.
          </p>
        </div>

        {/* Stakes + waste, two columns */}
        <div className="mb-20">
          <Divider label="Where the cost lands" />
          <div className="grid gap-px border border-border bg-border lg:grid-cols-2">
            {/* The downside cost */}
            <div className="bg-background p-8 lg:p-10">
              <div className="mb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                The cost of a wrong answer
              </div>
              <div className="flex flex-col divide-y divide-border">
                {STAKES.map((s) => (
                  <div
                    key={s.tag}
                    className="flex flex-col gap-2 py-5 first:pt-0 last:pb-0"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.16em] ${ACCENT}`}
                      >
                        {s.tag}
                      </span>
                      <h3 className="font-display text-[17px] font-medium tracking-tight text-foreground">
                        {s.head}
                      </h3>
                    </div>
                    <p className="text-[14px] leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* The efficiency cost */}
            <div className="bg-background p-8 lg:p-10">
              <div className="mb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                The cost of guessing around it
              </div>
              <div className="flex flex-col divide-y divide-border">
                {EFFICIENCY.map((e) => (
                  <div
                    key={e.head}
                    className="flex flex-col gap-2 py-5 first:pt-0 last:pb-0"
                  >
                    <h3 className="font-display text-[17px] font-medium tracking-tight text-foreground">
                      {e.head}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-muted-foreground">
                      {e.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Productivity upside */}
        <div>
          <Divider label="And it makes teams faster" />
          <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {PRODUCTIVITY.map((p, idx) => (
              <div
                key={p.n}
                className="flex flex-col gap-4 bg-background p-6 lg:p-7"
              >
                <div
                  className={`h-[70px] border-b border-border/60 pb-2 ${ACCENT}`}
                  aria-hidden
                >
                  <ProductivityFigure index={idx} />
                </div>
                <span className="font-mono text-[11px] tracking-[0.14em] text-foreground/50">
                  {p.n}
                </span>
                <h3 className="font-display text-[16px] font-medium leading-[1.2] tracking-tight text-foreground">
                  {p.head}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-14 max-w-[66ch] text-[15px] leading-relaxed text-muted-foreground">
          A proof runs once and holds forever. Set against the penalties it
          averts, the tokens spent second-guessing a model, and the audits it
          pre-empts, the verification layer is not a cost center - it is the
          cheapest insurance in the stack, and it makes everything downstream of
          it faster.
        </p>
      </div>
    </section>
  );
}
