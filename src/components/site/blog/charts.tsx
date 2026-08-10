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
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// Shared theme-aware series colours, drawn from the house four (see
// docs/visual-system.md): saturated ultramarine, ivory, lantern ochre, warm
// skin. `theme` entries resolve to real light/dark values via ui/chart's
// ChartStyle (a <style> block scoped to each chart's data-chart id), so these
// stay in sync with the site's dark-mode toggle without extra plumbing.
//
// The series are separated by lightness and by family rather than by scattering
// hues around the wheel, and the assignment carries meaning: BONE is a result
// nothing has been done to, ULTRA is the field it is measured against, and
// LANTERN is the accent — reserved for the verified outcome, because on this
// site the warm light is what falls on the thing that has been checked. Read a
// chart and the brightest, warmest series is always the proved one.

/** Unlit. Baselines, and the model on its own. */
const BONE = { light: "oklch(0.56 0.03 90)", dark: "oklch(0.88 0.02 92)" };
/** The field. Verified runs, and the kernel. */
const ULTRA = { light: "oklch(0.45 0.16 266)", dark: "oklch(0.72 0.14 266)" };
/** The lantern, and the site accent. Reserved for the best verified outcome. */
const LANTERN = { light: "oklch(0.58 0.14 74)", dark: "oklch(0.82 0.13 82)" };
/** Warm skin. A third peer category, where three must be told apart. */
const SKIN = { light: "oklch(0.64 0.09 52)", dark: "oklch(0.82 0.08 56)" };
/** Held back toward the page. Reference series and uncontested cases. */
const DIM = { light: "oklch(0.7 0.015 250)", dark: "oklch(0.5 0.015 250)" };

// Verdict red, deliberately outside the house four. A wrong answer has to read
// as wrong, and it has to stay clearly apart from LANTERN — which now means
// verified, so reaching for a warm tone here would say the opposite of what is
// meant. One value, where two had drifted apart (0.55 and 0.58).
const NEGATIVE = "oklch(0.57 0.18 25)";
const NEGATIVE_LINE = "oklch(0.57 0.18 25 / 0.4)";
const NEGATIVE_FILL = "oklch(0.57 0.18 25 / 0.08)";

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
      <span className="font-mono font-medium tabular-nums text-foreground">
        {value}
      </span>
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
          <span className="text-[12.5px] text-foreground/80">
            {config[key].label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Fig 2 (fluency) — accuracy of all nine arms, grouped by model tier  */
/* ------------------------------------------------------------------ */

const accuracyConfig: ChartConfig = {
  baseline: { label: "Baseline", theme: BONE },
  verified: { label: "Verified", theme: ULTRA },
  loop: { label: "Verified + loop", theme: LANTERN },
};

const accuracyData = [
  { label: "Opus 4.8", baseline: 54, verified: 100, loop: 100 },
  { label: "Fable 5", baseline: 61, verified: 100, loop: 100 },
  { label: "Haiku 4.5", baseline: 3, verified: 82, loop: 85 },
];

export function AccuracyByArmChart() {
  return (
    <ChartFrame
      title="Accuracy by arm"
      unit="Correct answers out of 100 RuleArena cases"
    >
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
              <ChartTooltipContent
                formatter={(value, name) => tooltipRow(name, `${value}%`)}
              />
            }
          />
          <ChartLegend
            verticalAlign="top"
            content={
              <DotLegend
                config={accuracyConfig}
                keys={["baseline", "verified", "loop"]}
              />
            }
          />
          <Bar
            dataKey="baseline"
            fill="var(--color-baseline)"
            radius={[2, 2, 0, 0]}
          />
          <Bar
            dataKey="verified"
            fill="var(--color-verified)"
            radius={[2, 2, 0, 0]}
          />
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
  opus: { label: "Claude Opus 4.8", theme: BONE },
  fable: { label: "Claude Fable 5", theme: ULTRA },
  haiku: { label: "Claude Haiku 4.5", theme: SKIN },
};

// Ordered by cost so each tier's path reads left to right.
const opusArms = [
  { cost: 1.32, acc: 100.0, perCorrect: 0.013, arm: "Opus 4.8 · verified" },
  {
    cost: 4.44,
    acc: 100.0,
    perCorrect: 0.044,
    arm: "Opus 4.8 · verified + loop",
  },
  { cost: 18.08, acc: 54.0, perCorrect: 0.335, arm: "Opus 4.8 · baseline" },
];
const fableArms = [
  { cost: 3.63, acc: 100.0, perCorrect: 0.036, arm: "Fable 5 · verified" },
  {
    cost: 11.44,
    acc: 100.0,
    perCorrect: 0.114,
    arm: "Fable 5 · verified + loop",
  },
  { cost: 16.92, acc: 61.0, perCorrect: 0.277, arm: "Fable 5 · baseline" },
];
const haikuArms = [
  { cost: 0.22, acc: 82.0, perCorrect: 0.003, arm: "Haiku 4.5 · verified" },
  {
    cost: 1.1,
    acc: 85.0,
    perCorrect: 0.013,
    arm: "Haiku 4.5 · verified + loop",
  },
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
    <ChartFrame
      title="Cost against accuracy"
      unit="Cost per 100-case run, log scale"
    >
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
          <ChartTooltip
            content={<ParetoTooltip />}
            cursor={{ strokeDasharray: "3 3" }}
          />
          <ChartLegend
            verticalAlign="top"
            content={
              <DotLegend
                config={paretoConfig}
                keys={["opus", "fable", "haiku"]}
              />
            }
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
/* Tax code — cost per correct answer against accuracy, six arms       */
/* ------------------------------------------------------------------ */

const taxConfig: ChartConfig = {
  baseline: { label: "Baseline", theme: BONE },
  verified: { label: "Verified", theme: ULTRA },
  loop: { label: "Verified + loop", theme: LANTERN },
};

// Each point carries its own label offset and text anchor. The two frontier
// arms sit ~2% apart on the log axis, so they are separated vertically (one
// label above, one below) rather than horizontally, and the leftmost arm
// labels to its right so the text doesn't run off the plot.
//
// These offsets are in pixels and only clear each other once the plot is wide
// enough, so the in-plot labels are hidden below `md` and the key underneath
// the chart takes over.
const taxBaselineArms = [
  {
    cost: 0.0119,
    acc: 62.0,
    series: "baseline",
    arm: "Cheap · baseline",
    label: "cheap baseline",
    lx: 0,
    ly: -14,
    anchor: "middle",
  },
  {
    cost: 0.0185,
    acc: 98.9,
    series: "baseline",
    arm: "Frontier · baseline",
    label: "frontier baseline",
    lx: 0,
    ly: 22,
    anchor: "middle",
  },
];
const taxVerifiedArms = [
  {
    cost: 0.00094,
    acc: 98.9,
    series: "verified",
    arm: "Cheap · verified",
    label: "cheap verified",
    lx: 12,
    ly: 4,
    anchor: "start",
  },
  {
    cost: 0.0059,
    acc: 100,
    series: "verified",
    arm: "Frontier · verified",
    label: "frontier verified",
    lx: 12,
    ly: 4,
    anchor: "start",
  },
];
const taxLoopArms = [
  {
    cost: 0.0044,
    acc: 100,
    series: "loop",
    arm: "Cheap · verified + loop",
    label: "cheap loop",
    lx: -12,
    ly: 4,
    anchor: "end",
  },
  {
    cost: 0.02,
    acc: 100,
    series: "loop",
    arm: "Frontier · verified + loop",
    label: "frontier loop",
    lx: 0,
    ly: -14,
    anchor: "middle",
  },
];

// Cheapest arm first, so the key reads along the x axis.
const taxKeyRows = [
  ...taxBaselineArms,
  ...taxVerifiedArms,
  ...taxLoopArms,
].sort((a, b) => a.cost - b.cost);

const fmtCost = (c: number) => `$${c.toFixed(c < 0.001 ? 5 : 4)}`;
const fmtAcc = (a: number) => `${a.toFixed(a % 1 === 0 ? 0 : 1)}%`;

function TaxDot(props: any) {
  const { cx, cy, payload, fill } = props;
  if (cx == null || cy == null) return null;
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={6.5}
        fill={fill}
        stroke="var(--background)"
        strokeWidth={1.5}
      />
      <text
        x={cx + payload.lx}
        y={cy + payload.ly}
        textAnchor={payload.anchor}
        fontSize={10}
        className="font-mono [display:none] md:[display:inline]"
        fill="var(--muted-foreground)"
      >
        {payload.label}
      </text>
    </g>
  );
}

function TaxTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-sm border border-border bg-background px-3 py-2 text-xs shadow-lg">
      <div className="font-medium text-foreground">{p.arm}</div>
      <div className="mt-1.5 space-y-0.5 font-mono text-[11px] tabular-nums text-muted-foreground">
        <div>{fmtAcc(p.acc)} correct</div>
        <div>{fmtCost(p.cost)} per correct answer</div>
      </div>
    </div>
  );
}

// Fixed id so ChartStyle's `--color-*` variables reach the key below the plot
// as well as the chart itself - the key sits outside ChartContainer, which
// scopes those variables to its own `data-chart` element.
const TAX_CHART_ID = "chart-tax-arms";

export function TaxCostAccuracyChart() {
  return (
    <ChartFrame
      title="Cost against accuracy"
      unit="Cost per correct answer (USD, log scale)"
    >
      <div data-chart={TAX_CHART_ID}>
        <ChartStyle id={TAX_CHART_ID} config={taxConfig} />
        <ChartContainer config={taxConfig} className="aspect-[16/11] w-full">
          <ScatterChart margin={{ top: 20, right: 24, left: 0, bottom: 4 }}>
            <XAxis
              {...AXIS}
              type="number"
              dataKey="cost"
              scale="log"
              domain={[0.0006, 0.03]}
              ticks={[0.001, 0.003, 0.01, 0.03]}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              {...AXIS}
              type="number"
              dataKey="acc"
              // Truncated at 55% - every arm except the cheap baseline sits in
              // the top few points, so a zero-based axis would flatten them
              // into one line. Headroom above 100% keeps the ceiling markers
              // and their labels inside the plot.
              domain={[55, 108]}
              ticks={[60, 70, 80, 90, 100]}
              tickFormatter={(v) => `${v}%`}
              width={46}
            />
            <ZAxis range={[72, 72]} />
            <ChartTooltip
              content={<TaxTooltip />}
              cursor={{ strokeDasharray: "3 3" }}
            />
            <ChartLegend
              verticalAlign="top"
              content={
                <DotLegend
                  config={taxConfig}
                  keys={["baseline", "verified", "loop"]}
                />
              }
            />
            <Scatter
              name="Baseline"
              data={taxBaselineArms}
              fill="var(--color-baseline)"
              shape={<TaxDot />}
            />
            <Scatter
              name="Verified"
              data={taxVerifiedArms}
              fill="var(--color-verified)"
              shape={<TaxDot />}
            />
            <Scatter
              name="Verified + loop"
              data={taxLoopArms}
              fill="var(--color-loop)"
              shape={<TaxDot />}
            />
          </ScatterChart>
        </ChartContainer>

        {/* Narrow screens: the in-plot labels are hidden, so name each arm
            here instead. */}
        <dl className="mt-4 space-y-1.5 border-t border-border pt-4 md:hidden">
          {taxKeyRows.map((r) => (
            <div key={r.arm} className="flex items-baseline gap-2.5">
              <span
                aria-hidden
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: `var(--color-${r.series})` }}
              />
              <dt className="flex-1 text-[12.5px] leading-snug text-foreground/80">
                {r.arm}
              </dt>
              <dd className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
                {fmtAcc(r.acc)} · {fmtCost(r.cost)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </ChartFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Fig 4 (fluency) — latency by arm, stacked model + kernel time       */
/* ------------------------------------------------------------------ */

const latencyConfig: ChartConfig = {
  llm: { label: "Model", theme: BONE },
  kernel: { label: "Kernel", theme: ULTRA },
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
          <XAxis
            {...AXIS}
            type="number"
            ticks={[0, 20, 40, 60]}
            tickFormatter={(v) => `${v}s`}
          />
          <YAxis {...AXIS} type="category" dataKey="label" width={150} />
          <ChartTooltip
            cursor={tooltipCursor}
            content={
              <ChartTooltipContent
                formatter={(value, name) => tooltipRow(name, `${value}s`)}
              />
            }
          />
          <ChartLegend
            verticalAlign="top"
            content={
              <DotLegend config={latencyConfig} keys={["llm", "kernel"]} />
            }
          />
          <Bar
            dataKey="llm"
            stackId="t"
            fill="var(--color-llm)"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="kernel"
            stackId="t"
            fill="var(--color-kernel)"
            radius={[0, 2, 2, 0]}
          />
        </BarChart>
      </ChartContainer>
    </ChartFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Fig 2 (diagnosis) — baseline vs verified across seven metrics       */
/* ------------------------------------------------------------------ */

const radarConfig: ChartConfig = {
  baseline: { label: "Baseline (LLM only)", theme: BONE },
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
    <ChartContainer
      config={radarConfig}
      className="mx-auto aspect-square max-h-[380px] w-full"
    >
      <RadarChart data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" fontSize={11} />
        <PolarRadiusAxis
          domain={[80, 100]}
          tickFormatter={(v) => `${v}%`}
          fontSize={10}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => tooltipRow(name, `${value}%`)}
            />
          }
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
  clear: { label: "Structural / clear cases", theme: DIM },
  mimic: { label: "Mimic cases", theme: SKIN },
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
      <BarChart
        data={categoryData}
        margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          fontSize={10.5}
          interval={0}
        />
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
          label={{
            value: "Verified · 100% across all categories",
            position: "insideTopLeft",
            fontSize: 10.5,
            fill: "var(--accent)",
          }}
        />
        <ChartTooltip
          cursor={tooltipCursor}
          content={
            <ChartTooltipContent
              hideIndicator
              formatter={(value, _name, item) =>
                tooltipRow(
                  "Baseline accuracy",
                  `${value}% (n=${item.payload.n})`,
                )
              }
            />
          }
        />
        <Bar dataKey="acc" radius={[3, 3, 0, 0]}>
          {categoryData.map((d) => (
            <Cell
              key={d.label}
              fill={
                d.kind === "mimic" ? "var(--color-mimic)" : "var(--color-clear)"
              }
            />
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
      style={{ "--chart-negative": NEGATIVE } as React.CSSProperties}
    >
      <span className="font-display text-[22px] font-medium leading-none text-foreground">
        {value}
      </span>
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
          <MatrixCell
            label="False negative"
            value={fn}
            tone={fn > 0 ? "bad" : "neutral"}
          />
        </div>
        <div className="flex gap-px">
          <MatrixCell
            label="False positive"
            value={fp}
            tone={fp > 0 ? "bad" : "neutral"}
          />
          <MatrixCell label="True negative" value={tn} tone="good" />
        </div>
      </div>
    </div>
  );
}

export function ConfusionMatrixFigure() {
  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:gap-6">
      <ConfusionMatrix
        title="Baseline (LLM only)"
        tp={18}
        fn={2}
        fp={0}
        tn={30}
      />
      <ConfusionMatrix
        title="Verified (autoformalization + Lean)"
        tp={20}
        fn={0}
        fp={0}
        tn={30}
      />
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
      fill={correct ? "var(--accent)" : NEGATIVE}
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
      <div className="font-medium text-foreground">
        {p.run} · score {p.score}
      </div>
      <div
        className={`mt-1 font-mono text-[11px] ${correct ? "text-accent" : ""}`}
        style={!correct ? { color: NEGATIVE } : undefined}
      >
        verdict: {p.verdict}{" "}
        {correct ? "(correct)" : "(wrong — this is genuine lupus)"}
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
        <ChartContainer
          config={runScoreConfig}
          className="aspect-[16/7] w-full"
        >
          <LineChart
            data={caseAData}
            margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="run"
              tickLine={false}
              axisLine={false}
              fontSize={11}
              padding={{ left: 16, right: 16 }}
            />
            <YAxis
              domain={[0, 20]}
              tickLine={false}
              axisLine={false}
              width={28}
              fontSize={11}
            />
            <ReferenceLine
              y={10}
              stroke="var(--muted-foreground)"
              strokeDasharray="4 4"
              label={{
                value: "classification threshold",
                position: "insideTopRight",
                fontSize: 10,
                fill: "var(--muted-foreground)",
              }}
            />
            <ChartTooltip
              content={<CaseATooltip />}
              cursor={{ strokeDasharray: "3 3" }}
            />
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
              style={{
                borderColor: NEGATIVE_LINE,
                background: NEGATIVE_FILL,
              }}
            >
              <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted-foreground">
                {run}
              </span>
              <span
                className="text-[12px] font-medium"
                style={{ color: NEGATIVE }}
              >
                Negative
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[12px] text-muted-foreground">
          Consistent this time, and consistently wrong — a stable derivation,
          not a drifting one.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Fig 1 (IMO 2026) — total proving time across all six problems       */
/* ------------------------------------------------------------------ */

// All three systems cleared the same six formalizations, so the only thing
// separating them is how long it took. LANTERN stays on our own run, per the
// series note at the top of this file.
const imoTotalConfig: ChartConfig = {
  total: { label: "Total proving time", theme: LANTERN },
};

// Hours, so the axis reads in the same unit the post quotes.
const imoTotalData = [
  { label: "Dirac (ours)", total: 7.302, display: "7h 18m", ours: true },
  { label: "Pramaana Hardy", total: 8.95, display: "8h 57m", ours: false },
  {
    label: "Axiom AxiomProver",
    total: 24.933,
    display: "24h 56m",
    ours: false,
  },
];

export function ImoTotalTimeChart() {
  return (
    <ChartFrame
      title="Total proving time"
      unit="Hours to prove all six problems"
    >
      <ChartContainer config={imoTotalConfig} className="aspect-[16/9] w-full">
        <BarChart
          data={imoTotalData}
          layout="vertical"
          barCategoryGap="26%"
          maxBarSize={34}
          margin={{ top: 4, right: 20, left: 8, bottom: 0 }}
        >
          <XAxis
            {...AXIS}
            type="number"
            domain={[0, 25]}
            ticks={[0, 5, 10, 15, 20, 25]}
            tickFormatter={(v) => `${v}h`}
          />
          <YAxis {...AXIS} type="category" dataKey="label" width={150} />
          <ChartTooltip
            cursor={tooltipCursor}
            content={
              <ChartTooltipContent
                formatter={(_value, name, item) =>
                  tooltipRow(name, item.payload.display)
                }
              />
            }
          />
          <Bar dataKey="total" radius={[0, 2, 2, 0]}>
            {imoTotalData.map((d) => (
              <Cell
                key={d.label}
                fill={d.ours ? "var(--color-total)" : "var(--muted-foreground)"}
                fillOpacity={d.ours ? 1 : 0.45}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Fig 2 (IMO 2026) — proving time per problem, all three systems      */
/* ------------------------------------------------------------------ */

const imoProblemConfig: ChartConfig = {
  dirac: { label: "Dirac (ours)", theme: LANTERN },
  hardy: { label: "Pramaana Hardy", theme: ULTRA },
  axiom: { label: "Axiom AxiomProver", theme: BONE },
};

// Hours again. The axis is linear on purpose: Q1/Q4/Q5 really are slivers next
// to Q3, and flattening that onto a log scale would hide the whole point -
// the margin lives at the hard end of the paper, not across it evenly.
const imoProblemData = [
  { label: "Q1", dirac: 0.485, hardy: 0.341, axiom: 0.4 },
  { label: "Q2", dirac: 1.338, hardy: 2.883, axiom: 6 },
  { label: "Q3", dirac: 2.174, hardy: 3.067, axiom: 14.483 },
  { label: "Q4", dirac: 0.266, hardy: 0.272, axiom: 0.65 },
  { label: "Q5", dirac: 0.303, hardy: 0.519, axiom: 1.083 },
  { label: "Q6", dirac: 2.735, hardy: 1.867, axiom: 2.317 },
];

// 2.174 -> "2h 10m". Minutes alone read badly past an hour, and the source
// tables quote mixed units.
function formatHours(value: number): string {
  const totalMinutes = Math.round(value * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return h === 0 ? `${m}m` : `${h}h ${m.toString().padStart(2, "0")}m`;
}

export function ImoTimeByProblemChart() {
  return (
    <ChartFrame title="Proving time by problem" unit="Hours per problem">
      <ChartContainer
        config={imoProblemConfig}
        className="aspect-[16/10] w-full"
      >
        <BarChart
          data={imoProblemData}
          barCategoryGap="28%"
          maxBarSize={30}
          margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="label" {...AXIS} />
          <YAxis
            {...AXIS}
            domain={[0, 15]}
            ticks={[0, 3, 6, 9, 12, 15]}
            tickFormatter={(v) => `${v}h`}
            width={40}
          />
          <ChartTooltip
            cursor={tooltipCursor}
            content={
              <ChartTooltipContent
                formatter={(value, name) =>
                  tooltipRow(name, formatHours(Number(value)))
                }
              />
            }
          />
          <ChartLegend
            verticalAlign="top"
            content={
              <DotLegend
                config={imoProblemConfig}
                keys={["dirac", "hardy", "axiom"]}
              />
            }
          />
          <Bar
            dataKey="dirac"
            fill="var(--color-dirac)"
            radius={[2, 2, 0, 0]}
          />
          <Bar
            dataKey="hardy"
            fill="var(--color-hardy)"
            radius={[2, 2, 0, 0]}
          />
          <Bar
            dataKey="axiom"
            fill="var(--color-axiom)"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </ChartFrame>
  );
}
