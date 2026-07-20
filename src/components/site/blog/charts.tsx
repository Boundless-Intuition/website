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
const TEAL = { light: "oklch(0.44 0.1 165)", dark: "oklch(0.7 0.12 165)" };
const NEUTRAL = { light: "oklch(0.55 0.02 250)", dark: "oklch(0.65 0.02 250)" };
const NEGATIVE = { light: "oklch(0.55 0.18 25)", dark: "oklch(0.7 0.16 25)" };

const tooltipCursor = { fill: "var(--muted)", opacity: 0.4 };

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

/* ------------------------------------------------------------------ */
/* Fig 2 (fluent) — headline accuracy, unaided vs behind-the-kernel   */
/* ------------------------------------------------------------------ */

const headlineAccuracyConfig: ChartConfig = {
  unaided: { label: "Unaided", theme: AMBER },
  kernel: { label: "Behind the kernel", color: "var(--accent)" },
};

const headlineAccuracyData = [
  { label: "Claude Opus 4.8", unaided: 54, kernel: 100 },
  { label: "Claude Fable 5", unaided: 61, kernel: 100 },
];

export function HeadlineAccuracyChart() {
  return (
    <ChartContainer config={headlineAccuracyConfig} className="aspect-[16/10] w-full">
      <BarChart data={headlineAccuracyData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis
          tickLine={false}
          axisLine={false}
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
          width={40}
          fontSize={12}
        />
        <ChartTooltip
          cursor={tooltipCursor}
          content={<ChartTooltipContent formatter={(value, name) => tooltipRow(name, `${value}%`)} />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="unaided" fill="var(--color-unaided)" radius={[3, 3, 0, 0]} />
        <Bar dataKey="kernel" fill="var(--color-kernel)" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}

/* ------------------------------------------------------------------ */
/* Fig 3 (fluent) — cost vs accuracy, all nine arms, log-scale cost   */
/* ------------------------------------------------------------------ */

const paretoConfig: ChartConfig = {
  opus: { label: "Claude Opus 4.8", theme: AMBER },
  fable: { label: "Claude Fable 5", theme: TEAL },
  haiku: { label: "Claude Haiku 4.5", theme: NEUTRAL },
};

const opusArms = [
  { cost: 18.08, acc: 54.0, arm: "Opus 4.8 · unaided" },
  { cost: 1.32, acc: 100.0, arm: "Opus 4.8 · verified" },
  { cost: 4.44, acc: 100.0, arm: "Opus 4.8 · verified + self-consistency" },
];
const fableArms = [
  { cost: 16.92, acc: 61.0, arm: "Fable 5 · unaided" },
  { cost: 3.63, acc: 100.0, arm: "Fable 5 · verified" },
  { cost: 11.44, acc: 100.0, arm: "Fable 5 · verified + self-consistency" },
];
const haikuArms = [
  { cost: 2.05, acc: 3.0, arm: "Haiku 4.5 · unaided" },
  { cost: 0.22, acc: 82.0, arm: "Haiku 4.5 · verified" },
  { cost: 1.1, acc: 85.0, arm: "Haiku 4.5 · verified + self-consistency" },
];

function ParetoTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-sm border border-border bg-background px-3 py-2 text-xs shadow-lg">
      <div className="font-medium text-foreground">{p.arm}</div>
      <div className="mt-1 flex gap-3 font-mono text-[11px] text-muted-foreground">
        <span>${p.cost.toFixed(2)}/run</span>
        <span>{p.acc}% correct</span>
      </div>
    </div>
  );
}

export function CostAccuracyParetoChart() {
  return (
    <ChartContainer config={paretoConfig} className="aspect-[16/11] w-full">
      <ScatterChart margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="cost"
          scale="log"
          domain={[0.15, 22]}
          tickFormatter={(v) => `$${v}`}
          tickLine={false}
          axisLine={false}
          fontSize={12}
          label={{ value: "Cost per full run (log scale)", position: "insideBottom", offset: -2, fontSize: 11 }}
        />
        <YAxis
          type="number"
          dataKey="acc"
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
          tickLine={false}
          axisLine={false}
          width={40}
          fontSize={12}
        />
        <ChartTooltip content={<ParetoTooltip />} cursor={{ strokeDasharray: "3 3" }} />
        {/* Scatter doesn't report a dataKey ChartLegendContent can match back
            to paretoConfig, so the legend is rendered directly from it. */}
        <ChartLegend
          content={() => (
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3 text-xs">
              {(["opus", "fable", "haiku"] as const).map((key) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 shrink-0 rounded-[2px]"
                    style={{ backgroundColor: `var(--color-${key})` }}
                  />
                  <span className="text-muted-foreground">{paretoConfig[key].label}</span>
                </div>
              ))}
            </div>
          )}
        />
        <Scatter name="Claude Opus 4.8" data={opusArms} fill="var(--color-opus)" />
        <Scatter name="Claude Fable 5" data={fableArms} fill="var(--color-fable)" />
        <Scatter name="Claude Haiku 4.5" data={haikuArms} fill="var(--color-haiku)" />
      </ScatterChart>
    </ChartContainer>
  );
}

/* ------------------------------------------------------------------ */
/* Fig 4 (fluent) — latency by arm, stacked LLM + kernel time          */
/* ------------------------------------------------------------------ */

const latencyConfig: ChartConfig = {
  llm: { label: "Model reasoning", theme: AMBER },
  kernel: { label: "Kernel", color: "var(--accent)" },
};

const latencyData = [
  { label: "Opus 4.8 · unaided", llm: 68.08, kernel: 0 },
  { label: "Opus 4.8 · verified", llm: 3.32, kernel: 2.78 },
  { label: "Fable 5 · unaided", llm: 25.91, kernel: 0 },
  { label: "Fable 5 · verified", llm: 7.59, kernel: 3.75 },
  { label: "Haiku 4.5 · unaided", llm: 23.75, kernel: 0 },
  { label: "Haiku 4.5 · verified", llm: 1.92, kernel: 3.63 },
];

export function LatencyByArmChart() {
  return (
    <ChartContainer config={latencyConfig} className="aspect-[16/13] w-full">
      <BarChart
        data={latencyData}
        layout="vertical"
        margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
      >
        <CartesianGrid horizontal={false} />
        <XAxis
          type="number"
          tickFormatter={(v) => `${v}s`}
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <YAxis
          type="category"
          dataKey="label"
          tickLine={false}
          axisLine={false}
          width={130}
          fontSize={11}
        />
        <ChartTooltip
          cursor={tooltipCursor}
          content={<ChartTooltipContent formatter={(value, name) => tooltipRow(name, `${value}s`)} />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="llm" stackId="t" fill="var(--color-llm)" radius={[0, 0, 0, 0]} />
        <Bar dataKey="kernel" stackId="t" fill="var(--color-kernel)" radius={[0, 3, 3, 0]} />
      </BarChart>
    </ChartContainer>
  );
}

/* ------------------------------------------------------------------ */
/* Fig 5 (fluent) — bag count has no relationship to failure           */
/* ------------------------------------------------------------------ */
/* The source data is the two reported aggregates (mean bag count on   */
/* wrong vs. right cases, and the Pearson r) — not a fabricated        */
/* per-case scatter. */

const bagCountConfig: ChartConfig = {
  wrong: { label: "Cases got wrong", theme: NEGATIVE },
  right: { label: "Cases got right", color: "var(--accent)" },
};

const bagCountData = [
  { label: "Claude Opus 4.8", wrong: 9.78, wrongN: 46, right: 9.91, rightN: 54 },
  { label: "Claude Fable 5", wrong: 9.87, wrongN: 39, right: 9.84, rightN: 61 },
];

export function BagCountAggregateChart() {
  return (
    <ChartContainer config={bagCountConfig} className="aspect-[16/10] w-full">
      <BarChart data={bagCountData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis
          tickLine={false}
          axisLine={false}
          domain={[0, 12]}
          tickCount={5}
          width={30}
          fontSize={12}
        />
        <ChartTooltip
          cursor={tooltipCursor}
          content={
            <ChartTooltipContent
              formatter={(value, name, item) => {
                const n = item.dataKey === "wrong" ? item.payload.wrongN : item.payload.rightN;
                return tooltipRow(name, `${value} avg (n=${n})`);
              }}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="wrong" fill="var(--color-wrong)" radius={[3, 3, 0, 0]} />
        <Bar dataKey="right" fill="var(--color-right)" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}

/* ------------------------------------------------------------------ */
/* Fig 6 (fluent) — failure rate by number of complimentary slots (K)  */
/* ------------------------------------------------------------------ */

const kSlotsConfig: ChartConfig = {
  opus: { label: "Claude Opus 4.8", theme: AMBER },
  fable: { label: "Claude Fable 5", theme: TEAL },
};

const kSlotsData = [
  { label: "K = 0", opus: 0, opusFrac: "0 of 23", fable: 0, fableFrac: "0 of 23" },
  { label: "K = 1", opus: 92.3, opusFrac: "12 of 13", fable: 61.5, fableFrac: "8 of 13" },
  { label: "K = 2", opus: 62.5, opusFrac: "30 of 48", fable: 56.3, fableFrac: "27 of 48" },
  { label: "K = 3", opus: 25.0, opusFrac: "4 of 16", fable: 25.0, fableFrac: "4 of 16" },
];

export function FailureByKChart() {
  return (
    <ChartContainer config={kSlotsConfig} className="aspect-[16/10] w-full">
      <BarChart data={kSlotsData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis
          tickLine={false}
          axisLine={false}
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
          width={40}
          fontSize={12}
        />
        <ChartTooltip
          cursor={tooltipCursor}
          content={
            <ChartTooltipContent
              formatter={(value, name, item) => {
                const frac = item.dataKey === "opus" ? item.payload.opusFrac : item.payload.fableFrac;
                return tooltipRow(name, `${frac} failed`);
              }}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="opus" fill="var(--color-opus)" radius={[3, 3, 0, 0]} />
        <Bar dataKey="fable" fill="var(--color-fable)" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}

/* ------------------------------------------------------------------ */
/* Fig 7 (fluent) — failure rate by cabin class                        */
/* ------------------------------------------------------------------ */

const cabinConfig: ChartConfig = {
  opus: { label: "Claude Opus 4.8", theme: AMBER },
  fable: { label: "Claude Fable 5", theme: TEAL },
};

const cabinData = [
  { label: "Basic Economy", opus: 0, opusFrac: "0 of 14", fable: 0, fableFrac: "0 of 14" },
  { label: "Main Cabin", opus: 41.2, opusFrac: "7 of 17", fable: 17.6, fableFrac: "3 of 17" },
  { label: "First", opus: 25.0, opusFrac: "5 of 20", fable: 35.0, fableFrac: "7 of 20" },
  { label: "Business", opus: 52.0, opusFrac: "13 of 25", fable: 28.0, fableFrac: "7 of 25" },
  { label: "Premium Economy", opus: 78.6, opusFrac: "11 of 14", fable: 85.7, fableFrac: "12 of 14" },
  { label: "Main Plus", opus: 100.0, opusFrac: "10 of 10", fable: 100.0, fableFrac: "10 of 10" },
];

export function FailureByCabinClassChart() {
  return (
    <ChartContainer config={cabinConfig} className="aspect-[16/14] w-full">
      <BarChart
        data={cabinData}
        layout="vertical"
        margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
      >
        <CartesianGrid horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <YAxis
          type="category"
          dataKey="label"
          tickLine={false}
          axisLine={false}
          width={110}
          fontSize={11}
        />
        <ChartTooltip
          cursor={tooltipCursor}
          content={
            <ChartTooltipContent
              formatter={(value, name, item) => {
                const frac = item.dataKey === "opus" ? item.payload.opusFrac : item.payload.fableFrac;
                return tooltipRow(name, `${frac} failed`);
              }}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="opus" fill="var(--color-opus)" radius={[0, 3, 3, 0]} />
        <Bar dataKey="fable" fill="var(--color-fable)" radius={[0, 3, 3, 0]} />
      </BarChart>
    </ChartContainer>
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
      <BarChart data={categoryData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={10.5} interval={0} />
        <YAxis
          tickLine={false}
          axisLine={false}
          domain={[80, 100]}
          tickFormatter={(v) => `${v}%`}
          width={40}
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
