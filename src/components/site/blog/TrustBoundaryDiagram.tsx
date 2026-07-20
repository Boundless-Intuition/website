import { useState } from "react";

interface Step {
  title: string;
  detail: string;
}

function StepChip({
  step,
  active,
  onHover,
  tone,
}: {
  step: Step;
  active: boolean;
  onHover: () => void;
  tone: "amber" | "accent";
}) {
  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onFocus={onHover}
      className={`rounded-sm border px-3 py-2 text-left font-display text-[13px] font-medium transition-colors ${
        active
          ? tone === "accent"
            ? "border-accent bg-accent/10 text-foreground"
            : "border-foreground/50 bg-foreground/5 text-foreground"
          : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
      }`}
    >
      {step.title}
    </button>
  );
}

// An architecture figure with no numeric data behind it - rendered as a
// hoverable/focusable step diagram instead of a static box, so "interactive"
// still means something even where there's no chart to draw.
export function TrustBoundaryDiagram({
  probabilistic,
  verified,
}: {
  probabilistic: Step[];
  verified: Step[];
}) {
  const [active, setActive] = useState<{ zone: "prob" | "verified"; index: number } | null>(null);
  const activeStep = active ? (active.zone === "prob" ? probabilistic : verified)[active.index] : null;

  return (
    <div>
      <div className="rounded-sm border border-dashed border-foreground/30 bg-muted/10 p-4">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Probabilistic — the model
        </div>
        <div className="flex flex-wrap gap-3">
          {probabilistic.map((step, i) => (
            <StepChip
              key={step.title}
              step={step}
              tone="amber"
              active={active?.zone === "prob" && active.index === i}
              onHover={() => setActive({ zone: "prob", index: i })}
            />
          ))}
        </div>
      </div>

      <div className="relative my-3 flex items-center gap-3">
        <span className="h-0 flex-1 border-t border-dashed border-foreground/30" aria-hidden />
        <span className="relative z-10 bg-background px-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground">
          trust boundary
        </span>
        <span className="h-0 flex-1 border-t border-dashed border-foreground/30" aria-hidden />
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-accent"
        />
      </div>

      <div className="rounded-sm border border-border bg-muted/20 p-4">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
          Verified — deterministic
        </div>
        <div className="flex flex-wrap gap-3">
          {verified.map((step, i) => (
            <StepChip
              key={step.title}
              step={step}
              tone="accent"
              active={active?.zone === "verified" && active.index === i}
              onHover={() => setActive({ zone: "verified", index: i })}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 min-h-[3.6em] rounded-sm border border-border bg-background px-4 py-3 text-[13.5px] leading-relaxed text-foreground/85">
        {activeStep ? activeStep.detail : "Hover or focus a step above to read what it does."}
      </div>
    </div>
  );
}
