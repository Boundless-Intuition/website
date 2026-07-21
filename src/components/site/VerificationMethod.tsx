import {
  MethodVisual,
  PipelineBackdrop,
} from "./domain-visuals/MethodVisual";

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

const ACC = "oklch(0.72 0.13 170)";

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
        className={`flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.18em] ${
          engine ? "text-white/40" : "text-muted-foreground"
        }`}
      >
        {engine && (
          <span
            aria-hidden
            className="vg-pulse inline-block size-1.5 shrink-0 rounded-full"
            style={{ background: ACC }}
          />
        )}
        {tag}
      </div>
      <div
        className={`flex items-center gap-1.5 font-display text-[15px] font-medium tracking-tight ${
          engine
            ? "text-white"
            : verdict
              ? "text-[oklch(0.48_0.11_170)] dark:text-[oklch(0.78_0.13_170)]"
              : "text-foreground"
        }`}
      >
        {verdict && (
          <span className="vg-check" aria-hidden>
            ✓
          </span>
        )}
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

function Arrow({
  vertical = false,
  delay = 0,
}: {
  vertical?: boolean;
  delay?: number;
}) {
  const style = { animationDelay: `${delay}s` };
  if (vertical) {
    return (
      <div
        aria-hidden
        className="flex h-8 w-full shrink-0 items-center justify-center text-foreground/40"
      >
        <svg viewBox="0 0 14 44" className="h-8 w-3.5">
          <line
            x1="7"
            y1="3"
            x2="7"
            y2="33"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1.2"
          />
          <path
            d="M3 32 l4 7 4 -7"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.55"
            strokeWidth="1.2"
          />
          <circle
            className="mf-dot-y pf-glow"
            cx="7"
            cy="3"
            r="2.6"
            fill={ACC}
            style={style}
          />
        </svg>
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className="flex w-10 shrink-0 items-center justify-center text-foreground/40"
    >
      <svg viewBox="0 0 44 14" className="h-3.5 w-10">
        <line
          x1="2"
          y1="7"
          x2="34"
          y2="7"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.2"
        />
        <path
          d="M33 3 l7 4 -7 4"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="1.2"
        />
        <circle
          className="mf-dot-x pf-glow"
          cx="2"
          cy="7"
          r="2.6"
          fill={ACC}
          style={style}
        />
      </svg>
    </div>
  );
}

export function VerificationMethod() {
  return (
    <section
      id="method"
      className="relative bg-background"
    >
      <div className="relative mx-auto max-w-7xl px-6 py-28">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
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
        <div className="relative mb-20 overflow-hidden rounded-sm border border-border bg-muted/30 p-6 lg:p-8">
          {/* live ASCII verification field behind the diagram */}
          <PipelineBackdrop />
          {/* horizontal on lg+ */}
          <div className="pointer-events-none relative hidden items-stretch gap-3 lg:flex">
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
            <Arrow delay={1.3} />
            <Node
              tag="Result"
              title="Verified · certified"
              sub="or refuted, with a witness"
              variant="verdict"
            />
          </div>

          {/* vertical on mobile */}
          <div className="pointer-events-none relative flex flex-col lg:hidden">
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
            <Arrow vertical delay={0.9} />
            <Node
              tag="Proof engine"
              title="Theorem prover"
              sub="checks claim ⊨ rules"
              variant="engine"
            />
            <Arrow vertical delay={1.8} />
            <Node
              tag="Result"
              title="Verified · certified"
              sub="or refuted, with a witness"
              variant="verdict"
            />
          </div>
        </div>

        {/* Step breakdown — each card runs its live visual as a full-bleed
            background, with the copy floating on a scrim at the bottom */}
        <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="group relative flex min-h-[400px] flex-col overflow-hidden bg-[oklch(0.9_0.012_90)] dark:bg-[oklch(0.08_0.009_250)]"
            >
              <MethodVisual index={i} />
              {/* legibility scrims — solid enough that copy reads over the
                  busiest frames */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background/60 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[78%] bg-gradient-to-t from-background via-background/90 to-transparent" />
              {/* copy — the zone is a fixed share of the card so every title
                  starts on the same line across all five boxes */}
              <div className="pointer-events-none relative flex h-full flex-col p-6 lg:p-7">
                <span className="font-mono text-[11px] tracking-[0.14em] text-foreground/60">
                  {s.n}
                </span>
                <div className="mt-auto flex min-h-[58%] flex-col gap-3">
                  <h3 className="min-h-[2.4em] font-display text-[16px] font-medium leading-[1.2] tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </div>
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
