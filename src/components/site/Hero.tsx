import { Link } from "@tanstack/react-router";
import { GlitchText } from "./GlitchText";
import { HeroFilm } from "./HeroFilm";

// The still and the film must crop identically or the cross-fade slides.
// The plate's action — the basket and its pour — sits around 42% of the source
// width, which is where the copy column falls, so from sm up the crop is held
// well to the left: that nudges the pour and the wheel toward the right-hand
// column and keeps open water and sky behind the text. The nudge is small — a
// wide hero only crops ~8% of the plate's width, so there is little travel.
//
// Below sm the asset is a different file: a 52%-wide column of the plate already
// cropped around the pour, so 52% here means "centre of that column", not 52% of
// the whole plate. Centring on the pour is deliberate — the wheel and the figures
// are static, and the falling water is the only thing in frame that moves.
// The breakpoint must stay in step with HeroFilm and the <picture> below.
//
// Theme opacity lives on the wrapper, not here, so it cannot fight the film's
// own fade-in.
const PLATE_CROP =
  "h-full w-full object-cover object-[52%_58%] sm:object-[14%_58%]";

export function Hero() {
  return (
    <section id="doctrine" className="relative -mt-16 overflow-hidden">
      {/* Full-bleed plate — a measured pour beside a temple under scaffolding:
          the same water, drawn and returned, checked by lamplight. The still and
          the film share one crop so the hand-off between them is invisible; see
          HeroFilm for why the motion is opt-in. */}
      <div className="absolute inset-0 isolate" aria-hidden>
        {/* A night scene at full strength would read as a slab on pale vellum,
            so the light theme holds the plate right back and lets the page show
            through it. Dark is the plate's home register and needs little help.
            This plate's sky is also a much louder blue than the page's own
            palette, so it wants desaturating. The dark grade (saturation 0.78)
            is baked into the video and poster pixels rather than applied here: a
            CSS filter over a *playing* video makes the compositor render every
            frame to an offscreen texture and run a shader pass, which on iOS
            both stalls the film and starves the other composited layers on the
            page. Opacity is fine to keep — a blend factor is nearly free.

            Light has to go further (at half opacity that blue turns lavender
            over warm vellum, a hue the palette does not contain), so it carries
            the remainder — 0.5 / 0.78 ≈ 0.64 — but only from sm up. Phones get
            no filter over the film in either theme. */}
        <div className="absolute inset-0 opacity-[0.45] sm:contrast-[1.05] sm:saturate-[0.64] dark:opacity-[0.92] sm:dark:filter-none">
          <picture>
            <source
              media="(max-width: 639.98px)"
              srcSet="/hero-plate-poster-mobile.webp"
            />
            <img src="/hero-plate-poster.webp" alt="" className={PLATE_CROP} />
          </picture>
          <HeroFilm className={`absolute inset-0 ${PLATE_CROP}`} />
        </div>
        {/* Page-colour wash that fuses the plate into the vellum / obsidian */}
        <div className="absolute inset-0 bg-background/25 dark:bg-background/10" />
        {/* Vertical scrim — carries readability on mobile / narrow viewports.
            Narrow screens keep a mid-height wash too, because the crop puts the
            pour directly behind the body copy there rather than beside it. */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/40 to-background/60 lg:from-background/25 lg:via-transparent lg:to-background/30" />
        {/* Horizontal reading scrim — anchors the copy column on wide screens.
            Carries more weight than the last plate needed, because the pour
            falls through the right-hand end of the body copy. */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/55 to-transparent lg:via-background/48 lg:to-transparent" />
        {/* Radial vignette — corners fall away into the page so the instrument
            holds the eye. Centred on the wheel and temple in the right column. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 78% 72% at 66% 55%, transparent 25%, color-mix(in oklab, var(--background) 80%, transparent) 100%)",
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
