const LINEAGE = [
  { k: "Lineage", v: "CERN" },
  { k: "Discipline", v: "Formal verification" },
  { k: "Standard", v: "Proof, not test" },
  { k: "Seat", v: "Meyrin · Geneva" },
];

export function Origin() {
  return (
    <section id="lab" className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 pt-28 pb-20 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-8 bg-foreground/40" />
            <span className="text-foreground/70">§ VI</span>
            <span className="text-muted-foreground/50">·</span>
            <span>Lab</span>
          </div>
          <h2 className="mb-8 max-w-[18ch] font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]">
            Built at the edge of what's verifiable.
          </h2>
          <div className="max-w-[56ch] space-y-5 text-[16px] leading-[1.65] text-foreground/80">
            <p>
              Founded in 2026 by research software and computing engineers
              - where systems must be correct, not just tested. We bring
              the engineering discipline of building mission-critical research
              infrastructure to artificial intelligence: no result without a check,
              no claim without a derivation.
            </p>
            <p className="text-muted-foreground">
              The lab operates from Meyrin, on the western edge of Geneva,
              within the gravitational field of the world's largest research
              computing infrastructure. We build tools that hold AI to the same
              standard we hold our own systems.
            </p>
          </div>
        </div>

        <div className="lg:pl-12">
          <dl className="border-y border-border font-mono text-[12px]">
            {[
              ["Founded", "2026"],
              ["Lineage", "CERN · Geneva"],
              ["Coordinates", "46.2330° N · 6.0557° E"],
              ["Address", "Route de Meyrin\n1217 Meyrin, Switzerland"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-4 border-b border-border py-4 last:border-b-0"
              >
                <dt className="uppercase tracking-[0.2em] text-muted-foreground">
                  {k}
                </dt>
                <dd className="whitespace-pre-line text-right text-foreground">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <a
              href="mailto:research@boundlessintuition.com"
              className="group inline-flex items-center gap-3 border-b border-foreground/40 pb-1 font-display text-[13px] font-medium text-foreground transition-colors hover:border-foreground"
            >
              research@boundlessintuition.com
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Research lineage - a quiet trust signal, not a logo wall */}
      <div className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Research lineage
          </span>
          <div className="grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-4">
            {LINEAGE.map((item) => (
              <div key={item.k} className="flex flex-col gap-1">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground/70">
                  {item.k}
                </span>
                <span className="font-display text-[13px] font-medium tracking-tight text-foreground">
                  {item.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
