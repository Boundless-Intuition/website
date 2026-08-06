import { Link } from "@tanstack/react-router";
import { DomainVisual } from "./domain-visuals/DomainVisual";

const DOMAINS = [
  {
    n: "01",
    title: "Security & Compliance",
    body: "Access-control policies, firewall rulesets, and handbooks verified against compliance standards. Gaps between policy-as-written and policy-as-enforced surface automatically.",
  },
  {
    n: "02",
    title: "Healthcare & Clinical Safety",
    body: "Dosing protocols, device specifications, and safety envelopes checked against regulatory requirements, including units, ranges, and boundary conditions.",
  },
  {
    n: "03",
    title: "Clinical Trials & Protocols",
    body: "Eligibility criteria, contraindication logic, and dosing rules verified against peer-reviewed guidelines. Protocol ambiguities surface before they reach patients.",
  },
  {
    n: "04",
    title: "Network & Infrastructure",
    body: "Rulesets, segmentation policies, and configurations verified against PCI-DSS, IEC 62443, and internal baselines. Changes are proved safe before deployment.",
  },
  {
    n: "05",
    title: "Finance & Risk",
    body: "Solvency covenants, exposure limits, and margin invariants verified against the mandate. Violations arrive as concrete counterexamples, not audit findings.",
  },
  {
    n: "06",
    title: "Legal & Regulatory",
    body: "Statutory text, regulatory obligations, and operational rules verified for internal consistency. Every derivation traces back to its source provision.",
  },
  {
    n: "07",
    title: "Data Protection & Privacy",
    body: "Processing records, transfer mechanisms, and lawful-basis logic verified against GDPR and regional frameworks. Compliance is proved, not asserted.",
  },
  {
    n: "08",
    title: "Export Control & Sanctions",
    body: "Classification determinations and dual-use assessments verified against current control lists. Every decision carries a machine-checkable derivation.",
  },
];

export function DomainGrid() {
  return (
    <section
      id="domains"
      className="relative border-b border-border bg-background"
    >
      <div className="relative mx-auto max-w-shell px-6 lg:px-10 pt-28">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]">
              Wherever the rules are written down.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
            One pipeline serves any domain governed by written rules: standards,
            statutes, protocols, policy. Eight fronts, one method.
          </p>
        </div>
      </div>

      <div className="relative mx-auto max-w-shell border-t border-border">
        <div className="grid grid-cols-1 border-l border-border md:grid-cols-2">
          {DOMAINS.map((d, i) => (
            <Link
              key={d.n}
              to="/engage"
              className="group relative flex min-h-[440px] flex-col overflow-hidden border-b border-r border-border bg-[oklch(0.9_0.012_90)] dark:bg-[oklch(0.08_0.009_250)]"
            >
              {/* Live visual — full-bleed card background */}
              <DomainVisual index={i} />
              {/* legibility scrims */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-background/60 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-background via-background/88 to-transparent" />
              {/* Copy — a fixed share of the card so titles align across cards */}
              <div className="pointer-events-none relative flex h-full flex-col p-8">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-foreground/70">
                    {d.n}
                  </span>
                  <span
                    aria-hidden
                    className="text-[12px] text-foreground/60 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    ↗
                  </span>
                </div>
                <div className="mt-auto flex min-h-[34%] flex-col gap-3">
                  <h3 className="font-display text-[20px] font-medium leading-[1.2] tracking-tight text-foreground">
                    {d.title}
                  </h3>
                  <p className="max-w-[56ch] text-[14px] leading-relaxed text-muted-foreground">
                    {d.body}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
