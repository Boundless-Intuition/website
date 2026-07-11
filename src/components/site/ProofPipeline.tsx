const STEPS = [
  {
    mark: "I",
    myth: "The Utterance",
    modern: "Claim",
    body: '"Administer 45 mg of methotrexate to a 34 kg patient."',
    caption:
      "Natural language from the model. Fluent, plausible, unaudited - the point at which every current system stops.",
    kind: "prose" as const,
  },
  {
    mark: "II",
    myth: "The Law",
    modern: "Rule",
    body: `(assert (=> (< weight 40)
  (<= dose
      (* 15 (bsa weight height)))))`,
    caption:
      "The FDA label, compiled into an SMT constraint. Not a suggestion; a mechanical predicate.",
    kind: "code" as const,
  },
  {
    mark: "III",
    myth: "The Ordeal",
    modern: "Proof",
    body: `status : sat  (counterexample)
weight  = 34.0
height  = 138.0
dose_ok ≤ 37.4  <  45.0`,
    caption:
      "The prover returns a witness: this patient exists, and the utterance overshoots the label by 7.6 mg. The claim is rejected, signed, and archived.",
    kind: "verdict" as const,
  },
];

export function ProofPipeline() {
  return (
    <section id="rite" className="relative border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-28">
        {/* Preamble */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            <span className="h-px w-8 bg-accent" />
            <span className="text-accent">Canto III</span>
            <span className="text-muted-foreground/50">·</span>
            <span>The Rite of Verification</span>
          </div>
          <h2 className="mb-6 font-serif text-4xl italic leading-[1.05] text-foreground md:text-[3.4rem]">
            Three artefacts. One ordeal.
          </h2>
          <p className="mx-auto max-w-[58ch] font-body text-[16.5px] leading-relaxed text-muted-foreground">
            Every answer the lab certifies is measured against three objects: what
            the model said, what the domain requires, and a checkable proof that
            the two agree. If the third does not exist, the answer does not
            leave the temple.
          </p>
        </div>

        {/* Triptych */}
        <div className="grid grid-cols-1 border border-border md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div
              key={s.mark}
              className={`relative flex flex-col p-8 md:p-10 ${
                i < STEPS.length - 1 ? "border-b border-border md:border-b-0 md:border-r" : ""
              } ${i === 1 ? "bg-[oklch(0.72_0.11_72/0.03)]" : ""}`}
            >
              <div className="mb-8 flex items-baseline justify-between">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-[22px] leading-none text-accent">
                    {s.mark}
                  </span>
                  <span className="font-serif text-[20px] italic text-foreground">
                    {s.myth}
                  </span>
                </div>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-muted-foreground">
                  {s.modern}
                </span>
              </div>

              {s.kind === "prose" && (
                <blockquote className="mb-6 border-l border-accent/40 pl-4 font-serif text-[18px] italic leading-snug text-foreground/90">
                  {s.body}
                </blockquote>
              )}

              {s.kind === "code" && (
                <pre className="mb-6 whitespace-pre-wrap rounded-sm border border-border bg-ink px-4 py-3 font-mono text-[11.5px] leading-relaxed text-ink-foreground/90">
                  {s.body}
                </pre>
              )}

              {s.kind === "verdict" && (
                <pre className="mb-6 whitespace-pre-wrap rounded-sm border border-accent/30 bg-[oklch(0.72_0.11_72/0.06)] px-4 py-3 font-mono text-[11.5px] leading-relaxed text-foreground">
                  <span className="text-accent">{s.body.split("\n")[0]}</span>
                  {"\n" + s.body.split("\n").slice(1).join("\n")}
                </pre>
              )}

              <p className="mt-auto font-body text-[13.5px] leading-relaxed text-muted-foreground">
                {s.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Coda */}
        <p className="mx-auto mt-14 max-w-2xl text-center font-serif text-[16px] italic text-muted-foreground">
          "Nothing enters the record without a proof, or a witness against it."
        </p>
      </div>
    </section>
  );
}
