import { Link } from "@tanstack/react-router";
import { DomainFigure } from "./DomainFigures";

const ACCENT = "text-[oklch(0.48_0.09_220)] dark:text-[oklch(0.78_0.09_220)]";

const DOMAINS = [
  {
    n: "01",
    title: "Security & Compliance",
    body: "Access-control policies, firewall rulesets, and organizational handbooks verified against compliance standards. Conflicts between policy-as-written and policy-as-enforced are surfaced automatically.",
  },
  {
    n: "02",
    title: "Healthcare & Clinical Safety",
    body: "Dosing protocols, device specifications, and safety envelopes checked against regulatory requirements. Every critical parameter is verified - units, ranges, and boundary conditions included.",
  },
  {
    n: "03",
    title: "Clinical Trials & Protocols",
    body: "Eligibility criteria, contraindication logic, and dosing rules verified against peer-reviewed guidelines. Ambiguities in the protocol are identified before they affect patient outcomes.",
  },
  {
    n: "04",
    title: "Network & Infrastructure",
    body: "Firewall rulesets, segmentation policies, and infrastructure configurations verified against PCI-DSS, IEC 62443, and internal security baselines. Changes are proved safe before deployment.",
  },
  {
    n: "05",
    title: "Finance & Risk",
    body: "Solvency covenants, exposure limits, and margin invariants verified against mandate requirements. Violations are surfaced as concrete counterexamples, not post-hoc audit findings.",
  },
  {
    n: "06",
    title: "Legal & Regulatory",
    body: "Statutory text, regulatory obligations, and operational rules verified for internal consistency. Every derivation is traceable back to the source provision.",
  },
  {
    n: "07",
    title: "Data Protection & Privacy",
    body: "Processing records, data-transfer mechanisms, and lawful-basis logic verified against GDPR and regional frameworks. Compliance is proved, not merely asserted.",
  },
  {
    n: "08",
    title: "Export Control & Sanctions",
    body: "Classification determinations and dual-use assessments verified against current control lists. Every decision carries a machine-checkable derivation.",
  },
];

export function DomainGrid() {
  return (
    <section id="domains" className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 pt-28">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px w-8 bg-foreground/40" />
              <span className="text-foreground/70">§ III</span>
              <span className="text-muted-foreground/50">·</span>
              <span>Domains</span>
            </div>
            <h2 className="font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]">
              Wherever the rules are written down.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
            The same verification pipeline serves any domain governed by written
            rules - standards, statutes, protocols, or policy. Eight active
            fronts. One method.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl border-t border-border">
        <div className="grid grid-cols-1 border-l border-border md:grid-cols-2 lg:grid-cols-4">
          {DOMAINS.map((d, i) => (
            <Link
              key={d.n}
              to="/engage"
              className="group relative flex flex-col gap-5 border-b border-r border-border p-8 transition-colors hover:bg-muted/60"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] tracking-[0.14em] text-foreground/60">
                  {d.n}
                </span>
                <span
                  aria-hidden
                  className="text-[11px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                >
                  ↗
                </span>
              </div>
              <div
                className={`h-16 opacity-80 transition-opacity group-hover:opacity-100 ${ACCENT}`}
                aria-hidden
              >
                <DomainFigure index={i} />
              </div>
              <h3 className="font-display text-[19px] font-medium leading-[1.2] tracking-tight text-foreground">
                {d.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-muted-foreground">
                {d.body}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
