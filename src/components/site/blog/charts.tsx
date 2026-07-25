import { useState, type ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ReferenceLine,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// Shared theme-aware series colors. `theme` entries resolve to real light/dark
// values via ui/chart's ChartStyle (a <style> block scoped to each chart's
// data-chart id) so these stay in sync with the site's dark-mode toggle
// without any extra plumbing here.
const AMBER = { light: "oklch(0.58 0.16 40)", dark: "oklch(0.75 0.15 45)" };
const NEUTRAL = { light: "oklch(0.55 0.02 250)", dark: "oklch(0.65 0.02 250)" };

// Airline-post palette: one hue per model tier, held constant across every
// figure so a reader can carry the colour from one chart to the next.
const SALMON = { light: "oklch(0.6 0.17 38)", dark: "oklch(0.74 0.15 42)" };
const PERIWINKLE = { light: "oklch(0.5 0.15 266)", dark: "oklch(0.73 0.13 268)" };
const BLUSH = { light: "oklch(0.59 0.13 350)", dark: "oklch(0.8 0.1 350)" };
const PALE_BLUE = { light: "oklch(0.64 0.09 250)", dark: "oklch(0.87 0.06 245)" };

const tooltipCursor = { fill: "var(--muted)", opacity: 0.4 };

// Axis treatment shared by the airline figures: a single hairline rule per
// axis, no grid, monospaced tabular ticks.
const AXIS = {
  tickLine: false as const,
  axisLine: { stroke: "var(--border)" },
  tick: { fontSize: 11, className: "font-mono" },
};

// ChartTooltipContent's `formatter` prop replaces its entire row markup, not
// a recharts-style [value, label] tuple - render the row ourselves so name
// and value stay visually separated.
function tooltipRow(label: ReactNode, value: ReactNode) {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-medium tabular-nums text-foreground">{value}</span>
    </div>
  );
}

// Chart title and axis unit sit above the plot rather than inside it, so the
// figure reads as a titled exhibit instead of a bare set of axes.
function ChartFrame({
  title,
  unit,
  children,
}: {
  title: string;
  unit?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h4 className="font-display text-[15px] font-semibold tracking-tight text-foreground">
        {title}
      </h4>
      {unit && (
        <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
          {unit}
        </p>
      )}
      <div className="mt-4">{children}</div>
    </div>
  );
}

// Rendered as recharts' legend content so it sits inside the ChartContainer
// and can read the scoped --color-* variables ChartStyle emits.
function DotLegend({ config, keys }: { config: ChartConfig; keys: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-2 pb-5 pl-1">
      {keys.map((key) => (
        <div key={key} className="flex items-center gap-2">
          <span
            className="size-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: `var(--color-${key})` }}
          />
          <span className="text-[12.5px] text-foreground/80">{config[key].label}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Fig 2 (fluency) — accuracy of all nine arms, grouped by model tier  */
/* ------------------------------------------------------------------ */

const accuracyConfig: ChartConfig = {
  baseline: { label: "Baseline", theme: SALMON },
  verified: { label: "Verified", theme: PERIWINKLE },
  loop: { label: "Verified + loop", theme: PALE_BLUE },
};

const accuracyData = [
  { label: "Opus 4.8", baseline: 54, verified: 100, loop: 100 },
  { label: "Fable 5", baseline: 61, verified: 100, loop: 100 },
  { label: "Haiku 4.5", baseline: 3, verified: 82, loop: 85 },
];

export function AccuracyByArmChart() {
  return (
    <ChartFrame title="Accuracy by arm" unit="Correct answers out of 100 RuleArena cases">
      <ChartContainer config={accuracyConfig} className="aspect-[16/10] w-full">
        <BarChart
          data={accuracyData}
          barCategoryGap="30%"
          maxBarSize={44}
          margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="label" {...AXIS} />
          <YAxis
            {...AXIS}
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(v) => `${v}%`}
            width={46}
          />
          <ChartTooltip
            cursor={tooltipCursor}
            content={
              <ChartTooltipContent formatter={(value, name) => tooltipRow(name, `${value}%`)} />
            }
          />
          <ChartLegend
            verticalAlign="top"
            content={
              <DotLegend config={accuracyConfig} keys={["baseline", "verified", "loop"]} />
            }
          />
          <Bar dataKey="baseline" fill="var(--color-baseline)" radius={[2, 2, 0, 0]} />
          <Bar dataKey="verified" fill="var(--color-verified)" radius={[2, 2, 0, 0]} />
          <Bar dataKey="loop" fill="var(--color-loop)" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </ChartFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Fig 3 (fluency) — cost against accuracy, one connected path per     */
/* model tier, cost on a log scale                                     */
/* ------------------------------------------------------------------ */

const paretoConfig: ChartConfig = {
  opus: { label: "Claude Opus 4.8", theme: SALMON },
  fable: { label: "Claude Fable 5", theme: PERIWINKLE },
  haiku: { label: "Claude Haiku 4.5", theme: BLUSH },
};

// Ordered by cost so each tier's path reads left to right.
const opusArms = [
  { cost: 1.32, acc: 100.0, perCorrect: 0.013, arm: "Opus 4.8 · verified" },
  { cost: 4.44, acc: 100.0, perCorrect: 0.044, arm: "Opus 4.8 · verified + loop" },
  { cost: 18.08, acc: 54.0, perCorrect: 0.335, arm: "Opus 4.8 · baseline" },
];
const fableArms = [
  { cost: 3.63, acc: 100.0, perCorrect: 0.036, arm: "Fable 5 · verified" },
  { cost: 11.44, acc: 100.0, perCorrect: 0.114, arm: "Fable 5 · verified + loop" },
  { cost: 16.92, acc: 61.0, perCorrect: 0.277, arm: "Fable 5 · baseline" },
];
const haikuArms = [
  { cost: 0.22, acc: 82.0, perCorrect: 0.003, arm: "Haiku 4.5 · verified" },
  { cost: 1.1, acc: 85.0, perCorrect: 0.013, arm: "Haiku 4.5 · verified + loop" },
  { cost: 2.05, acc: 3.0, perCorrect: 0.682, arm: "Haiku 4.5 · baseline" },
];

function ParetoTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-sm border border-border bg-background px-3 py-2 text-xs shadow-lg">
      <div className="font-medium text-foreground">{p.arm}</div>
      <div className="mt-1.5 space-y-0.5 font-mono text-[11px] tabular-nums text-muted-foreground">
        <div>{p.acc}% correct</div>
        <div>${p.cost.toFixed(2)} per run</div>
        <div>${p.perCorrect.toFixed(3)} per correct answer</div>
      </div>
    </div>
  );
}

export function CostAccuracyParetoChart() {
  return (
    <ChartFrame title="Cost against accuracy" unit="Cost per 100-case run, log scale">
      <ChartContainer config={paretoConfig} className="aspect-[16/11] w-full">
        <ScatterChart margin={{ top: 12, right: 20, left: 0, bottom: 4 }}>
          <XAxis
            {...AXIS}
            type="number"
            dataKey="cost"
            scale="log"
            domain={[0.15, 26]}
            ticks={[0.25, 1, 4, 16]}
            tickFormatter={(v) => `$${v}`}
          />
          <YAxis
            {...AXIS}
            type="number"
            dataKey="acc"
            // Headroom above 100% so the markers sitting on the ceiling are
            // drawn whole rather than clipped by the plot edge.
            domain={[0, 106]}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(v) => `${v}%`}
            width={46}
          />
          <ZAxis range={[72, 72]} />
          <ChartTooltip content={<ParetoTooltip />} cursor={{ strokeDasharray: "3 3" }} />
          <ChartLegend
            verticalAlign="top"
            content={<DotLegend config={paretoConfig} keys={["opus", "fable", "haiku"]} />}
          />
          <Scatter
            name="Claude Opus 4.8"
            data={opusArms}
            fill="var(--color-opus)"
            line={{ stroke: "var(--color-opus)", strokeWidth: 1.5 }}
          />
          <Scatter
            name="Claude Fable 5"
            data={fableArms}
            fill="var(--color-fable)"
            line={{ stroke: "var(--color-fable)", strokeWidth: 1.5 }}
          />
          <Scatter
            name="Claude Haiku 4.5"
            data={haikuArms}
            fill="var(--color-haiku)"
            line={{ stroke: "var(--color-haiku)", strokeWidth: 1.5 }}
          />
        </ScatterChart>
      </ChartContainer>
    </ChartFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Fig 4 (fluency) — latency by arm, stacked model + kernel time       */
/* ------------------------------------------------------------------ */

const latencyConfig: ChartConfig = {
  llm: { label: "Model", theme: SALMON },
  kernel: { label: "Kernel", theme: PERIWINKLE },
};

const latencyData = [
  { label: "Opus 4.8 · baseline", llm: 68.08, kernel: 0 },
  { label: "Opus 4.8 · verified", llm: 3.32, kernel: 2.78 },
  { label: "Fable 5 · baseline", llm: 25.91, kernel: 0 },
  { label: "Fable 5 · verified", llm: 7.59, kernel: 3.75 },
  { label: "Haiku 4.5 · baseline", llm: 23.75, kernel: 0 },
  { label: "Haiku 4.5 · verified", llm: 1.92, kernel: 3.63 },
];

export function LatencyByArmChart() {
  return (
    <ChartFrame title="Latency by arm" unit="Mean seconds per answer">
      <ChartContainer config={latencyConfig} className="aspect-[16/10] w-full">
        <BarChart
          data={latencyData}
          layout="vertical"
          barCategoryGap="22%"
          maxBarSize={26}
          margin={{ top: 4, right: 20, left: 8, bottom: 0 }}
        >
          <XAxis {...AXIS} type="number" ticks={[0, 20, 40, 60]} tickFormatter={(v) => `${v}s`} />
          <YAxis {...AXIS} type="category" dataKey="label" width={150} />
          <ChartTooltip
            cursor={tooltipCursor}
            content={
              <ChartTooltipContent formatter={(value, name) => tooltipRow(name, `${value}s`)} />
            }
          />
          <ChartLegend
            verticalAlign="top"
            content={<DotLegend config={latencyConfig} keys={["llm", "kernel"]} />}
          />
          <Bar dataKey="llm" stackId="t" fill="var(--color-llm)" radius={[0, 0, 0, 0]} />
          <Bar dataKey="kernel" stackId="t" fill="var(--color-kernel)" radius={[0, 2, 2, 0]} />
        </BarChart>
      </ChartContainer>
    </ChartFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Fig 2 (diagnosis) — baseline vs verified across seven metrics       */
/* ------------------------------------------------------------------ */

const radarConfig: ChartConfig = {
  baseline: { label: "Baseline (LLM only)", theme: AMBER },
  verified: { label: "Verified (Lean)", color: "var(--accent)" },
};

const radarData = [
  { metric: "Verdict accuracy", baseline: 96.8, verified: 100 },
  { metric: "Sensitivity", baseline: 90, verified: 100 },
  { metric: "Specificity", baseline: 100, verified: 100 },
  { metric: "Mimic accuracy", baseline: 90, verified: 100 },
  { metric: "Boundary / arithmetic", baseline: 100, verified: 100 },
  { metric: "Entry-gate", baseline: 100, verified: 100 },
  { metric: "Run-to-run consistency", baseline: 98, verified: 100 },
];

export function HeadlineMetricsRadar() {
  return (
    <ChartContainer config={radarConfig} className="mx-auto aspect-square max-h-[380px] w-full">
      <RadarChart data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" fontSize={11} />
        <PolarRadiusAxis domain={[80, 100]} tickFormatter={(v) => `${v}%`} fontSize={10} />
        <ChartTooltip
          content={<ChartTooltipContent formatter={(value, name) => tooltipRow(name, `${value}%`)} />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Radar
          name="Baseline (LLM only)"
          dataKey="baseline"
          stroke="var(--color-baseline)"
          fill="var(--color-baseline)"
          fillOpacity={0.22}
        />
        <Radar
          name="Verified (Lean)"
          dataKey="verified"
          stroke="var(--color-verified)"
          fill="var(--color-verified)"
          fillOpacity={0.12}
        />
      </RadarChart>
    </ChartContainer>
  );
}

/* ------------------------------------------------------------------ */
/* Fig 3 (diagnosis) — baseline accuracy by case category               */
/* ------------------------------------------------------------------ */

const categoryConfig: ChartConfig = {
  clear: { label: "Structural / clear cases", theme: NEUTRAL },
  mimic: { label: "Mimic cases", theme: AMBER },
};

const categoryData = [
  { label: "Clear SLE", n: 10, acc: 100, kind: "clear" },
  { label: "Sub-threshold", n: 7, acc: 100, kind: "clear" },
  { label: "ANA-negative", n: 6, acc: 100, kind: "clear" },
  { label: "Boundary / arithmetic", n: 11, acc: 100, kind: "clear" },
  { label: "Drug-induced mimic", n: 8, acc: 92.5, kind: "mimic" },
  { label: "Infection mimic", n: 8, acc: 87.5, kind: "mimic" },
];

export function CategoryAccuracyChart() {
  return (
    <ChartContainer config={categoryConfig} className="aspect-[16/12] w-full">
      <BarChart data={categoryData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={10.5} interval={0} />
        <YAxis
          tickLine={false}
          axisLine={false}
          domain={[80, 100]}
          tickFormatter={(v) => `${v}%`}
          width={46}
          fontSize={12}
        />
        <ReferenceLine
          y={100}
          stroke="var(--accent)"
          strokeDasharray="4 4"
          label={{ value: "Verified · 100% across all categories", position: "insideTopLeft", fontSize: 10.5, fill: "var(--accent)" }}
        />
        <ChartTooltip
          cursor={tooltipCursor}
          content={
            <ChartTooltipContent
              hideIndicator
              formatter={(value, _name, item) =>
                tooltipRow("Baseline accuracy", `${value}% (n=${item.payload.n})`)
              }
            />
          }
        />
        <Bar dataKey="acc" radius={[3, 3, 0, 0]}>
          {categoryData.map((d) => (
            <Cell key={d.label} fill={d.kind === "mimic" ? "var(--color-mimic)" : "var(--color-clear)"} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

/* ------------------------------------------------------------------ */
/* Fig 4 (diagnosis) — confusion matrices, baseline vs verified         */
/* ------------------------------------------------------------------ */

function MatrixCell({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "good" | "bad" | "neutral";
}) {
  const [hover, setHover] = useState(false);
  const toneClasses =
    tone === "bad"
      ? "border-[var(--chart-negative)]/50 bg-[var(--chart-negative)]/10"
      : tone === "good"
        ? "border-accent/40 bg-accent/10"
        : "border-border bg-muted/20";
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative flex flex-1 flex-col items-center justify-center gap-1 border p-3 text-center transition-transform ${toneClasses} ${hover ? "scale-[1.03]" : ""}`}
      style={{ "--chart-negative": "oklch(0.55 0.18 25)" } as React.CSSProperties}
    >
      <span className="font-display text-[22px] font-medium leading-none text-foreground">{value}</span>
      <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function ConfusionMatrix({
  title,
  tp,
  fn,
  fp,
  tn,
}: {
  title: string;
  tp: number;
  fn: number;
  fp: number;
  tn: number;
}) {
  return (
    <div className="flex-1">
      <div className="mb-2 text-center font-display text-[13px] font-medium text-foreground">
        {title}
      </div>
      <div className="flex flex-col gap-px overflow-hidden rounded-sm border border-border bg-border">
        <div className="flex gap-px">
          <MatrixCell label="True positive" value={tp} tone="good" />
          <MatrixCell label="False negative" value={fn} tone={fn > 0 ? "bad" : "neutral"} />
        </div>
        <div className="flex gap-px">
          <MatrixCell label="False positive" value={fp} tone={fp > 0 ? "bad" : "neutral"} />
          <MatrixCell label="True negative" value={tn} tone="good" />
        </div>
      </div>
    </div>
  );
}

export function ConfusionMatrixFigure() {
  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:gap-6">
      <ConfusionMatrix title="Baseline (LLM only)" tp={18} fn={2} fp={0} tn={30} />
      <ConfusionMatrix title="Verified (autoformalization + Lean)" tp={20} fn={0} fp={0} tn={30} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Fig 5 (diagnosis) — per-run verdicts on the two hardest cases        */
/* ------------------------------------------------------------------ */

const runScoreConfig: ChartConfig = {
  score: { label: "Baseline score", color: "var(--muted-foreground)" },
};

const caseAData = [
  { run: "Run 1", score: 10, verdict: "negative" },
  { run: "Run 2", score: 16, verdict: "positive" },
  { run: "Run 3", score: 16, verdict: "positive" },
  { run: "Run 4", score: 10, verdict: "negative" },
  { run: "Run 5", score: 10, verdict: "negative" },
];

function CaseADot(props: any) {
  const { cx, cy, payload } = props;
  const correct = payload.verdict === "positive";
  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill={correct ? "var(--accent)" : "oklch(0.58 0.18 25)"}
      stroke="var(--background)"
      strokeWidth={2}
    />
  );
}

function CaseATooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  const correct = p.verdict === "positive";
  return (
    <div className="rounded-sm border border-border bg-background px-3 py-2 text-xs shadow-lg">
      <div className="font-medium text-foreground">{p.run} · score {p.score}</div>
      <div className={`mt-1 font-mono text-[11px] ${correct ? "text-accent" : ""}`} style={!correct ? { color: "oklch(0.58 0.18 25)" } : undefined}>
        verdict: {p.verdict} {correct ? "(correct)" : "(wrong — this is genuine lupus)"}
      </div>
    </div>
  );
}

export function RunVerdictFigure() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-display text-[13px] font-medium text-foreground">
            Case A · hydralazine + anti-dsDNA (genuine lupus)
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Verified: positive, all 5 runs
          </span>
        </div>
        <ChartContainer config={runScoreConfig} className="aspect-[16/7] w-full">
          <LineChart data={caseAData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="run" tickLine={false} axisLine={false} fontSize={11} padding={{ left: 16, right: 16 }} />
            <YAxis domain={[0, 20]} tickLine={false} axisLine={false} width={28} fontSize={11} />
            <ReferenceLine
              y={10}
              stroke="var(--muted-foreground)"
              strokeDasharray="4 4"
              label={{ value: "classification threshold", position: "insideTopRight", fontSize: 10, fill: "var(--muted-foreground)" }}
            />
            <ChartTooltip content={<CaseATooltip />} cursor={{ strokeDasharray: "3 3" }} />
            <Line
              dataKey="score"
              stroke="var(--muted-foreground)"
              strokeWidth={1.5}
              isAnimationActive={false}
              dot={<CaseADot />}
              activeDot={<CaseADot />}
            />
          </LineChart>
        </ChartContainer>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-display text-[13px] font-medium text-foreground">
            Case B · treated HIV + anti-dsDNA (genuine lupus)
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Verified: positive, all 5 runs
          </span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {["Run 1", "Run 2", "Run 3", "Run 4", "Run 5"].map((run) => (
            <div
              key={run}
              className="flex flex-col items-center gap-1.5 rounded-sm border p-2.5 text-center"
              style={{ borderColor: "oklch(0.58 0.18 25 / 0.4)", background: "oklch(0.58 0.18 25 / 0.08)" }}
            >
              <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted-foreground">
                {run}
              </span>
              <span className="text-[12px] font-medium" style={{ color: "oklch(0.58 0.18 25)" }}>
                Negative
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[12px] text-muted-foreground">
          Consistent this time, and consistently wrong — a stable derivation, not a drifting one.
        </p>
      </div>
    </div>
  );
}
