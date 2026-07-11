const STEPS = [
  {
    n: "01",
    title: "The model answers",
    body: "A copilot, agent, or model returns an answer, a decision, or an action. It is fluent and fast - and, on its own, impossible to trust. Today, this is where every system stops.",
  },
  {
    n: "02",
    title: "The domain is formalized - once",
    body: "Your rules, standards, and policies are compiled into machine-checkable formal objects. This is done a single time, up front. It is the asset that makes every later answer verifiable.",
  },
  {
    n: "03",
    title: "The answer becomes a claim",
    body: "Each answer is translated into a precise logical statement about what it asserts or does - a claim a theorem prover can reason about, stripped of the ambiguity of natural language.",
  },
  {
    n: "04",
    title: "The prover checks it",
    body: "A theorem prover checks the claim against the formalized rules. It either proves the answer conforms - or returns a concrete counterexample, a witness to exactly how it fails.",
  },
  {
    n: "05",
    title: "Only proven answers ship",
    body: "Verified answers proceed, carrying a signed, reproducible certificate. Refuted answers are blocked before they reach production, with the precise reason attached.",
  },
];

function Node({
  tag,
  title,
  sub,
  variant = "default",
}: {
  tag: string;
  title: string;
  sub: string;
  variant?: "default" | "engine" | "verdict";
}) {
  const engine = variant === "engine";
  const verdict = variant === "verdict";
  return (
    <div
      className={`flex min-w-0 flex-1 flex-col gap-2 rounded-sm border p-5 ${
        engine
          ? "border-transparent bg-ink text-ink-foreground"
          : "border-border bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div
        className={`font-mono text-[9.5px] uppercase tracking-[0.18em] ${
          engine ? "text-white/40" : "text-muted-foreground"
        }`}
      >
        {tag}
      </div>
      <div
        className={`font-display text-[15px] font-medium tracking-tight ${
          engine
            ? "text-white"
            : verdict
              ? "text-[oklch(0.48_0.09_220)] dark:text-[oklch(0.78_0.09_220)]"
              : "text-foreground"
        }`}
      >
        {title}
      </div>
      <div
        className={`font-mono text-[11px] leading-snug ${
          engine ? "text-white/50" : "text-muted-foreground"
        }`}
      >
        {sub}
      </div>
    </div>
  );
}

function Arrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <div
      aria-hidden
      className={`flex shrink-0 items-center justify-center text-foreground/40 ${
        vertical ? "h-6 w-full" : "w-6"
      }`}
    >
      {vertical ? "↓" : "→"}
    </div>
  );
}

export function VerificationMethod() {
  return (
    <section
      id="method"
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
              <span className="text-foreground/70">§ II</span>
              <span className="text-muted-foreground/50">·</span>
              <span>Method</span>
            </div>
            <h2 className="font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]">
              How an AI answer becomes a proof.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
            We do not grade the model, fine-tune it, or ask it to check itself.
            We sit a proof engine between the AI and production, and let nothing
            through that cannot be verified against your rules.
          </p>
        </div>

        {/* Pipeline diagram */}
        <div className="mb-20 rounded-sm border border-border bg-muted/30 p-6 lg:p-8">
          {/* horizontal on lg+ */}
          <div className="hidden items-stretch gap-3 lg:flex">
            <div className="flex min-w-0 flex-[1.4] flex-col gap-3">
              <Node
                tag="AI output"
                title="The answer"
                sub='"administer 45 mg…"'
              />
              <Node
                tag="Formalized domain"
                title="The rules"
                sub="compiled, machine-checkable"
              />
            </div>
            <Arrow />
            <Node
              tag="Proof engine"
              title="Theorem prover"
              sub="checks claim ⊨ rules"
              variant="engine"
            />
            <Arrow />
            <Node
              tag="Result"
              title="Verified · certified"
              sub="or refuted, with a witness"
              variant="verdict"
            />
          </div>

          {/* vertical on mobile */}
          <div className="flex flex-col lg:hidden">
            <Node
              tag="AI output"
              title="The answer"
              sub='"administer 45 mg…"'
            />
            <Arrow vertical />
            <Node
              tag="Formalized domain"
              title="The rules"
              sub="compiled, machine-checkable"
            />
            <Arrow vertical />
            <Node
              tag="Proof engine"
              title="Theorem prover"
              sub="checks claim ⊨ rules"
              variant="engine"
            />
            <Arrow vertical />
            <Node
              tag="Result"
              title="Verified · certified"
              sub="or refuted, with a witness"
              variant="verdict"
            />
          </div>
        </div>

        {/* Step breakdown */}
        <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="flex flex-col gap-4 bg-background p-6 lg:p-7"
            >
              <span className="font-mono text-[11px] tracking-[0.14em] text-foreground/50">
                {s.n}
              </span>
              <h3 className="font-display text-[16px] font-medium leading-[1.2] tracking-tight text-foreground">
                {s.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-[64ch] text-[15px] leading-relaxed text-muted-foreground">
          The model proposes; the prover disposes. Verification is not another
          model second-guessing the first - it is mathematics, checking a fluent
          answer against rules that were written down long before the question
          was asked.
        </p>
      </div>
    </section>
  );
}
