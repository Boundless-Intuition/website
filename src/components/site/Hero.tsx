import { Link } from "@tanstack/react-router";
import { GlitchText } from "./GlitchText";

export function Hero() {
  return (
    <section
      id="doctrine"
      className="relative -mt-16 overflow-hidden border-b border-border"
    >
      {/* Full-bleed plate — the sum of human knowledge, engraved and checkable
          (CERN, "Wandering the Immeasurable", Meyrin) */}
      <div className="absolute inset-0" aria-hidden>
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="/artifact-hero-mobile.webp"
          />
          <img
            src="/artifact-hero.webp"
            alt=""
            className="h-full w-full object-cover object-[62%_center] opacity-100 saturate-[0.92] contrast-[1.02] dark:opacity-[0.72] dark:saturate-[0.78]"
          />
        </picture>
        {/* Navy wash to fuse the photograph into the vellum plate */}
        <div className="absolute inset-0 bg-accent/5 mix-blend-multiply dark:bg-background/25 dark:mix-blend-normal" />
        {/* Vertical scrim — carries readability on mobile / narrow viewports */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/35 to-background/85 lg:from-background/40 lg:via-transparent lg:to-background/55" />
        {/* Horizontal reading scrim — anchors the copy column on wide screens */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/78 to-background/5 lg:via-background/55 lg:to-transparent" />
      </div>

      {/* Blueprint construction lines drawn over the plate */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full text-foreground"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="currentColor"
        vectorEffect="non-scaling-stroke"
      >
        {/* concentric survey rings over the mechanism */}
        <g opacity="0.22" strokeWidth="1">
          <circle cx="815" cy="430" r="118" />
          <circle cx="815" cy="430" r="196" strokeDasharray="2 6" />
          <circle cx="815" cy="430" r="286" opacity="0.6" />
        </g>
        {/* crosshair + registration ticks */}
        <g opacity="0.28" strokeWidth="1">
          <path d="M815 250 V610 M665 430 H965" />
          <path d="M803 430 h24 M815 418 v24" opacity="0.8" />
          <circle cx="815" cy="430" r="5" opacity="0.9" />
        </g>
        {/* construction diagonals + golden section */}
        <g opacity="0.16" strokeWidth="1">
          <path d="M0 120 L1200 690" />
          <path d="M120 800 L1050 0" strokeDasharray="3 7" />
          <rect x="612" y="272" width="406" height="316" />
          <path d="M612 430 H1018" opacity="0.7" />
        </g>
        {/* dimension line with arrow ticks along the base */}
        <g opacity="0.3" strokeWidth="1">
          <path d="M612 720 H1018" />
          <path d="M612 712 v16 M1018 712 v16" />
          <path d="M612 720 l10 -5 M612 720 l10 5 M1018 720 l-10 -5 M1018 720 l-10 5" />
        </g>
      </svg>

      {/* Blueprint grid + grain, kept faint over the plate */}
      <div className="blueprint-grid absolute inset-0 opacity-40" aria-hidden />
      <div
        className="paper-grain pointer-events-none absolute inset-0"
        aria-hidden
      />

      {/* Drafting registration marks */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-6 top-20 hidden font-mono text-[10px] tracking-[0.2em] text-foreground/40 lg:block"
      >
        ⌐ BI—001
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-6 right-6 hidden font-mono text-[10px] tracking-[0.2em] text-foreground/40 lg:block"
      >
        SHEET 1 / 6 ¬
      </span>

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pt-24 pb-28 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:pt-32">
        <div>
          <div className="mb-10 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-8 bg-foreground/40" />
            <span className="text-foreground/70">§ I</span>
            <span className="text-muted-foreground/50">·</span>
            <span>Doctrine</span>
          </div>

          <h1 className="relative mb-10 max-w-[16ch] font-display text-[3rem] font-light leading-[1.02] tracking-[-0.03em] text-foreground md:text-[3.6rem] lg:text-[4.4rem]">
            <GlitchText text="The trust layer for artificial intelligence." />
          </h1>

          <div className="max-w-[54ch] space-y-5 text-[17px] leading-[1.6] text-foreground/85">
            <p>
              Modern AI is fluent, not correct. It speaks with the confidence of
              an expert and the accountability of a guess. In high-stakes
              domains, that gap is not an inconvenience - it is a liability.
            </p>
            <p className="text-muted-foreground">
              Boundless Intuition builds the verification layer for AI -
              formalizing domain rules into machine-checkable form and proving
              every answer correct before it reaches production.
            </p>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-4 font-display text-[12px] font-medium">
            <Link
              to="/engage"
              className="group inline-flex items-center gap-2 border border-foreground/30 bg-foreground/5 px-5 py-3 text-foreground transition-all hover:border-foreground/60 hover:bg-foreground/10"
            >
              Bring us your rules
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <a
              href="#walkthrough"
              className="group inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-foreground transition-colors hover:border-foreground"
            >
              Walk through a proof
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>

        {/* Frosted caption plate, floated over the mechanism in the photograph */}
        <div className="relative hidden lg:block">
          <div className="absolute bottom-2 right-0 max-w-[74%] rounded-sm border border-border bg-background/55 px-5 py-4 shadow-[0_20px_50px_-30px_oklch(0.22_0.03_250/0.55)] backdrop-blur-md">
            <div className="mb-1.5 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>Plate · fig. I</span>
              <span className="text-muted-foreground/40">·</span>
              <span>46.2330° N &nbsp;6.0557° E</span>
            </div>
            <div className="font-display text-[15.5px] font-medium leading-snug tracking-tight text-foreground">
              Every input. One proof.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
