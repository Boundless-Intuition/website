import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { TopBar } from "@/components/site/TopBar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Lead, P } from "@/components/site/blog/prose";
import {
  AccuracyByArmChart,
  HeadlineMetricsRadar,
  TaxCostAccuracyChart,
} from "@/components/site/blog/charts";

/**
 * The shareable overview - an unlisted one-pager carrying the same content as
 * the "Boundless Intuition" PDF that gets sent to investors, so a link can go
 * out in place of an attachment.
 *
 * It wears the site's own TopBar and SiteFooter, laid out exactly as the
 * landing page does (transparent bar, hero pulled up under it with -mt-16).
 * Nothing anywhere else on the site links here, and the route sets
 * `noindex, nofollow` so it stays out of search results.
 */

const PLAYGROUND = "https://playground.boundlessintuition.com/";

/**
 * Publication date shown in the byline. Static on purpose - this is when the
 * overview was last revised, not when the page happens to be rendered. Bump it
 * whenever the numbers or domains change.
 */
const PUBLISHED = "Jul 30, 2026";

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

function ResourceRow({
  label,
  href,
  children,
  internal,
}: {
  label: string;
  href: string;
  children: ReactNode;
  internal?: boolean;
}) {
  const className =
    "font-display text-[14.5px] font-medium text-foreground underline decoration-accent/50 decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent";

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:w-[9.5rem]">
        {label}
      </span>
      {internal ? (
        <Link to={href} className={className}>
          {children}
        </Link>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
          <span aria-hidden className="ml-1 text-[11px]">
            ↗
          </span>
        </a>
      )}
    </div>
  );
}

/** The links block that follows the aviation and clinical work. */
function ResourcePanel({
  studyHref,
  studyLabel,
  playgroundSection,
}: {
  studyHref: string;
  studyLabel: string;
  playgroundSection: string;
}) {
  return (
    <div className="mb-6 rounded-[10px] bg-muted/45 p-5 md:px-7 md:py-6 dark:bg-muted/60">
      <div className="space-y-3.5">
        <ResourceRow label="In-depth study" href={studyHref} internal>
          {studyLabel}
        </ResourceRow>
        <ResourceRow label="Live playground" href={PLAYGROUND}>
          Try it under {playgroundSection}
        </ResourceRow>
      </div>
    </div>
  );
}

/**
 * A numbered benchmark section. The hierarchy is carried by type alone - the
 * index sits as a hairline-ruled column beside the title rather than behind a
 * coloured rule, so nothing competes with the figures below.
 */
function Benchmark({
  index,
  title,
  domain,
  children,
}: {
  index: string;
  title: string;
  domain: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-20 first-of-type:mt-12">
      <header className="mb-7">
        <div className="flex items-baseline gap-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="text-foreground/45">{index}</span>
          <span aria-hidden className="h-px w-6 bg-border" />
          <span>{domain}</span>
        </div>
        <h3 className="mt-3 font-display text-[27px] font-light leading-[1.15] tracking-[-0.02em] text-foreground md:text-[32px]">
          {title}
        </h3>
      </header>
      {children}
    </section>
  );
}

/**
 * Figures on this page are plates rather than bordered cards: a soft panel
 * holds the chart, and the caption sits underneath on the page itself. The
 * blog's own <Figure> is left alone - nine figures across the two posts
 * depend on its boxed treatment.
 */
function Plate({
  n,
  caption,
  children,
}: {
  n: number;
  caption: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure className="mb-8">
      <div className="rounded-[10px] bg-muted/45 px-4 py-6 md:px-7 md:py-8 dark:bg-muted/60">
        {children}
      </div>
      <figcaption className="mt-3.5 flex gap-3 px-1 text-[13px] leading-relaxed text-muted-foreground">
        <span className="mt-[3px] shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">
          Fig {n}
        </span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

/** Indented corpus callout, matching the PDF's blockquoted result lines. */
function Corpus({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-5 border-l border-border pl-5">
      <div className="mb-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
      <p className="text-[16px] leading-[1.75] text-foreground/85">
        {children}
      </p>
    </div>
  );
}

/**
 * Headline number under a hairline rule. Ruled rather than boxed - the page
 * already carries plates for the figures, and a fifth bordered grid on top of
 * those read as clutter.
 */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-border pt-4">
      <div className="font-display text-[28px] font-light leading-none tracking-[-0.02em] text-foreground">
        {value}
      </div>
      <div className="mt-2.5 text-[12.5px] leading-snug text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function OverviewPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />

      <main>
        {/* Masthead - the hero art runs full bleed and up under the header,
            then dissolves into the page background above the introduction. */}
        {/* Height tracks the viewport so the band never swallows a short
            laptop screen, with a floor that keeps the arch readable. */}
        <section className="relative -mt-16 flex min-h-[clamp(440px,62vh,560px)] flex-col justify-end overflow-hidden md:min-h-[clamp(540px,72vh,760px)]">
          <div aria-hidden className="absolute inset-0">
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet="/overview-hero-mobile.webp"
              />
              <img
                src="/overview-hero.webp"
                alt=""
                className="blog-cover-img h-full w-full object-cover object-center opacity-95 dark:opacity-80"
              />
            </picture>
            {/* Only a light overall wash - the art carries the top of the
                band, and the copy is protected by the bottom ramp instead. */}
            <div className="absolute inset-0 bg-background/15 dark:bg-background/25" />
            {/* Keeps the transparent header legible over the art. */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background via-background/65 to-transparent" />
            {/* The copy sits in this ramp, which also dissolves the band into
                the introduction rather than ending on a hard edge. */}
            <div className="absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-background via-background/88 to-transparent" />
          </div>

          <div className="relative mx-auto w-full max-w-3xl px-6 pb-20 md:pb-24">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground">
              Overview · Domains &amp; Benchmarks
            </div>
            <h1 className="mt-5 font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.025em] text-foreground md:text-[3.6rem]">
              Boundless Intuition
            </h1>
            <p className="mt-4 font-display text-[19px] font-light italic text-muted-foreground md:text-[21px]">
              The AI you can Trust
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="mx-auto max-w-3xl px-6">
          <div className="max-w-[68ch]">
            <Lead>
              Boundless Intuition builds the verification layer for AI. We turn
              a company's policies, regulations, and domain's expert knowledge
              into machine-checkable logic, then verify every high-stakes AI
              action/output before it is trusted or executed.
            </Lead>
            <P>
              When an AI agent tries to perform a consequential action, such as
              approving a tax filing, calculating a clinical dosage, authorizing
              a payment, or changing a firewall rule.
            </P>
            <P>
              Our formal verification engine either produces a mathematical
              proof that the action satisfies the required rules or blocks it.
              Instead of asking companies to trust AI because it sounds
              confident, we give them machine-checkable proof that its decisions
              are correct, auditable, and compliant.
            </P>
            <P>
              Our long-term vision is to become the foundational layer for
              verified intelligence in high-stakes / mission-critical domains.
            </P>
          </div>

          {/* Headline numbers, drawn from the benchmark sections below */}
          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-9 md:grid-cols-4 md:gap-x-10">
            <Stat
              value="100%"
              label="Verified accuracy on RuleArena aviation"
            />
            <Stat value="14×" label="Lower inference cost on aviation" />
            <Stat value="100%" label="Verified accuracy on MedCalc-Bench" />
            <Stat value="8.5×" label="Lower cost per correct answer on tax" />
          </div>
        </section>

        {/* Domains & Benchmarks */}
        <section className="mx-auto max-w-3xl px-6 pt-20 pb-16">
          <h2 className="font-display text-[13px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Domains &amp; Benchmarks
          </h2>
          <div className="mt-4 h-px w-full bg-border" aria-hidden />

          <Benchmark
            index="01"
            domain="Aviation Verification"
            title="RuleArena"
          >
            <div className="max-w-[68ch]">
              <P>
                We evaluate whether separating semantic extraction from
                deterministic execution improves correctness on RuleArena, an
                open evaluation benchmark for rule-guided reasoning, using its
                airline baggage fee domain.
              </P>
              <P>
                Our pipeline of formalizers, a checker and a formal layer,
                improves frontier-model accuracy from 54% and 61% to 100%, while
                reducing inference cost by approximately{" "}
                <strong className="font-semibold text-foreground">14×</strong>{" "}
                and latency by a factor of{" "}
                <strong className="font-semibold text-foreground">11×</strong>.
              </P>
            </div>

            <Plate
              n={1}
              caption="Accuracy of every arm on the 100 RuleArena airline cases. Verification lifts both frontier tiers to a perfect score, and carries the budget tier from 3% to 82%."
            >
              <AccuracyByArmChart />
            </Plate>

            <ResourcePanel
              studyHref="/blog/fluency-is-not-correctness"
              studyLabel="Fluency Is Not Correctness"
              playgroundSection="aviation"
            />
          </Benchmark>

          <Benchmark
            index="02"
            domain="Clinical Verification"
            title="MedCalc-Bench"
          >
            <div className="max-w-[68ch]">
              <P>
                Our pipeline increased raw accuracy from 61-79% across all four
                Claude tiers to 100% at 29 ms at marginal cost per question.
              </P>
              <P>
                Our audit even found bugs in MedCalc-Bench's own ground truth
                (wrong methadone conversion factors; 5 of 12 "impossible"
                questions have debatable labels).
              </P>
              <P>
                Fable 5 (the most expensive model) scored below Sonnet and Opus;
                resampling flips only 11.7% of wrong answers. Errors are
                systematic.
              </P>
            </div>

            <Plate
              n={2}
              caption="Baseline against verified across seven clinical metrics. The verified arm reaches the ceiling on every axis; the baseline gives ground on sensitivity, mimic accuracy, and run-to-run consistency."
            >
              <HeadlineMetricsRadar />
            </Plate>

            <ResourcePanel
              studyHref="/blog/a-diagnosis-should-be-a-proof-not-a-probability"
              studyLabel="A Diagnosis Should Be a Proof, Not a Probability"
              playgroundSection="clinical medicine"
            />
          </Benchmark>

          <Benchmark
            index="03"
            domain="Statutory Verification"
            title="Tax code (Catala kernels, FR + US statutes)"
          >
            <div className="max-w-[68ch]">
              <P>
                We improved the performance of the non-frontier &amp; open
                source models equivalent to that of frontier models with our
                pipeline.
              </P>

              <Corpus label="Easy-case corpus">
                Our verification pipeline enables a cheap, non-frontier model to
                match frontier-model accuracy at{" "}
                <strong className="font-semibold text-foreground">
                  8.5× lower cost per correct answer
                </strong>
                , while reducing output tokens by{" "}
                <strong className="font-semibold text-foreground">
                  10 to 16×
                </strong>
                .
              </Corpus>

              <Corpus label="Hard-case French corpus">
                On the hard-case French corpus, frontier-model accuracy drops to{" "}
                <strong className="font-semibold text-foreground">83.7%</strong>
                , while cheap non-frontier models fall to{" "}
                <strong className="font-semibold text-foreground">45.6%</strong>
                . Our verification pipeline restores frontier-model accuracy to{" "}
                <strong className="font-semibold text-foreground">100%</strong>{" "}
                and, with iterative verification, also brings the cheap
                non-frontier model to{" "}
                <strong className="font-semibold text-foreground">100%</strong>,
                achieving this at{" "}
                <strong className="font-semibold text-foreground">
                  4× lower cost
                </strong>{" "}
                than the frontier-model baseline.
              </Corpus>
            </div>

            <Plate
              n={3}
              caption="Cost per correct answer against accuracy. Verification (blue) and iterative verification (green) dominate the unaided baselines (red): every verified arm is both cheaper and more accurate than the frontier baseline."
            >
              <TaxCostAccuracyChart />
            </Plate>
          </Benchmark>

          {/* Work in flight. Deliberately unnumbered - it sits alongside the
              three benchmarks rather than claiming to be a fourth result. */}
          <section className="mt-20">
            <header className="mb-7">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                Ongoing research
              </div>
              <h3 className="mt-3 font-display text-[27px] font-light leading-[1.15] tracking-[-0.02em] text-foreground md:text-[32px]">
                Domains in progress
              </h3>
            </header>
            <div className="max-w-[68ch]">
              <P>
                The three domains above are the ones we have taken far enough to
                report. The same pipeline is now being applied to other areas
                whose rules are already close to a formal specification -
                security control systems, where access and firewall policy is
                written as rules long before anyone writes code, and payment
                authorization, where every control has to be auditable
                regardless.
              </P>
              <P>
                That work is earlier than what is on this page, so we are not
                putting numbers to it yet. A domain gets published when it
                clears the same bar as the three above: a kernel checked by hand
                against the source rules, a full run across the benchmark, and
                every figure generated from that run's logged data. Early
                results are promising, and we will keep adding them here as they
                land.
              </P>
            </div>
          </section>

          {/* Byline */}
          <div className="mt-16 flex flex-col gap-1.5 border-t border-border pt-6 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span className="text-foreground/70">Team Boundless Intuition</span>
            <span>{PUBLISHED}</span>
          </div>
        </section>

        {/* Closing band - bookends the masthead, but cut from the foot of the
            frame (arch bases, grass, water) rather than the arch itself, so it
            grounds the page instead of repeating the opening. The crop is
            baked into its own asset: at mobile widths a full-frame image would
            letterbox back to the whole arch. Purely decorative, and it
            dissolves in and out again so SiteFooter still starts on clean
            background. */}
        <section
          aria-hidden
          className="relative mt-4 h-[180px] overflow-hidden md:h-[340px]"
        >
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet="/overview-close-mobile.webp"
            />
            <img
              src="/overview-close.webp"
              alt=""
              loading="lazy"
              className="h-full w-full object-cover object-center opacity-90 dark:opacity-70"
            />
          </picture>
          <div className="absolute inset-0 bg-background/25 dark:bg-background/35" />
          <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-background via-background/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
