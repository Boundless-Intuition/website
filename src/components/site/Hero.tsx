import { Link } from "@tanstack/react-router";
import { GlitchText } from "./GlitchText";

export function Hero() {
  return (
    <section
      id="doctrine"
      className="relative -mt-16 overflow-hidden"
    >
      {/* Full-bleed plate — the sum of human knowledge, engraved and checkable
          (CERN, "Wandering the Immeasurable", Meyrin) */}
      <div className="absolute inset-0 isolate" aria-hidden>
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="/artifact-hero-mobile.webp"
          />
          <img
            src="/artifact-hero.webp"
            alt=""
            className="h-full w-full object-cover object-[62%_center] opacity-100 saturate-100 contrast-[1.03] dark:opacity-95 dark:saturate-[0.9]"
          />
        </picture>
        {/* Navy wash to fuse the photograph into the vellum plate */}
        <div className="absolute inset-0 bg-accent/5 mix-blend-multiply dark:bg-background/10 dark:mix-blend-normal" />
        {/* Vertical scrim — carries readability on mobile / narrow viewports */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-transparent to-background/60 lg:from-background/25 lg:via-transparent lg:to-background/30" />
        {/* Horizontal reading scrim — anchors the copy column on wide screens */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/55 to-transparent lg:via-background/30 lg:to-transparent" />
        {/* Radial vignette — corners fall away into the page so the sculpture
            holds the eye. Centred on the photograph's focal point (62%), the
            same point object-position crops to. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 78% 72% at 62% 45%, transparent 25%, color-mix(in oklab, var(--background) 80%, transparent) 100%)",
          }}
        />
        {/* Extra grain on the plate, on top of the global body::after layer —
            same tile params so it reads as more of the site's film stock, not a
            second, different noise. */}
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay dark:opacity-[0.09]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Long dissolve into the method section below — sits above the plate
          so it fades cleanly into the method section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/35 to-transparent md:h-48"
      />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pt-24 pb-28 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:pt-32">
        <div>
          <div className="mb-10 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
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

          {/* Quiet tertiary link down to the research updates signup */}
          <a
            href="#signal"
            className="group mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="relative grid size-2 place-items-center">
              <span className="wl-ping absolute inset-0 rounded-full bg-[oklch(0.48_0.11_170)] dark:bg-[oklch(0.78_0.13_170)]" />
              <span className="size-1.5 rounded-full bg-[oklch(0.48_0.11_170)] dark:bg-[oklch(0.78_0.13_170)]" />
            </span>
            Get research updates
            <span
              aria-hidden
              className="transition-transform group-hover:translate-y-0.5"
            >
              ↓
            </span>
          </a>
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
