import { Link } from "@tanstack/react-router";
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
// The vertical crop is what places the basket against the headline. A wide hero
// is a shallower box than the plate, so the Y position picks which horizontal
// slice survives: a lower percentage keeps more of the sky and pushes the basket
// DOWN the frame. It sits at 8% so the whole headline clears the basket and its
// pour, and "Verified Intelligence" reads above the box rather than through it.
// Raise this number and the basket climbs back into the type.
//
// Theme opacity lives on the wrapper, not here, so it cannot fight the film's
// own fade-in.
const PLATE_CROP =
  "h-full w-full object-cover object-[52%_58%] sm:object-[14%_8%]";

// The min-height on the section is what keeps the plate whole. The plate is
// 16:9, so at a given width it wants width / 1.778 (= 56.25vw) of height; a
// shorter hero than that crops the picture top and bottom, and since the flowers
// sit in the very last 13% of the plate they are the first thing to go. Holding
// the hero at 56.25vw from lg up means no vertical crop at all on a wide screen:
// the basket keeps the low position the headline needs AND the flower band
// survives at the base. Capped at 60rem so an ultra-wide monitor doesn't get a
// 1400px hero (past ~1706px the cap does trim a little off the bottom again).
export function Hero() {
  return (
    <section
      id="doctrine"
      className="relative -mt-16 overflow-hidden lg:min-h-[min(56.25vw,60rem)]"
    >
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
            pour directly behind the body copy there rather than beside it. From
            lg the bottom stop is kept light: nothing is read down there and it
            is where the flower band sits. */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/40 to-background/60 lg:from-background/25 lg:via-transparent lg:to-background/10" />
        {/* Horizontal reading scrim — anchors the copy column on wide screens.
            Carries more weight than the last plate needed, because the pour
            falls through the right-hand end of the body copy. */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/55 to-transparent lg:via-background/48 lg:to-transparent" />
        {/* Radial vignette — corners fall away into the page so the instrument
            holds the eye. Centred on the wheel and temple in the right column.
            Eased off from 80% to 58% background at the rim: the bottom of the
            frame is the far edge of this ellipse, and at 80% it took the flower
            band down with it. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 82% 76% at 66% 55%, transparent 25%, color-mix(in oklab, var(--background) 58%, transparent) 100%)",
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

      {/* Dissolve into the method section below — sits above the plate so the
          seam never reads as a hard edge. Shorter and thinner from lg than the
          original full-height ramp: at 192px it swallowed the flower band whole,
          so it now only closes the last stretch and stays transparent above. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/35 to-transparent md:h-48 lg:h-20 lg:via-background/10"
      />

      <div className="relative mx-auto grid max-w-shell gap-16 px-6 lg:px-10 pt-24 pb-28 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:pt-32">
        {/* @container so the headline can be sized against this column rather
            than the viewport — see the clamp on the h1. */}
        <div className="@container">
          {/* Two blocks rather than one wrapping line: the break is deliberate,
              so "Verified Intelligence" holds its own line, both lines start on
              the same left edge, and the phrase lands clear above the basket in
              the plate. Paired with the 8% vertical crop above. Leading is a
              touch looser than a single line would want, so the descender of
              "layer" clears the cap-height of "Verified".

              From lg the size follows the column width instead of a fixed step.
              "Foundational layer for" measures 9.94em in this face at this
              tracking, so 9.8cqw keeps it at ~97% of the column: it always fits
              on one line and the deliberate break survives every desktop width
              (a fixed 4.4rem orphaned "for" onto its own line at 1440). The
              ceiling holds the size it had on a wide screen; text-balance is the
              safety net below lg, where the column runs full width. */}
          <h1 className="mb-10 text-balance font-display text-[3rem] font-light leading-[1.08] tracking-[-0.03em] text-foreground md:text-[3.6rem] lg:mb-16 lg:text-[clamp(2.6rem,9.8cqw,4.4rem)]">
            <span className="block">Foundational layer for</span>
            <span className="block">Verified Intelligence</span>
          </h1>

          {/* The plate is 16:9 and the copy only needs the top of it, so from lg
              there is height to spend below: the body takes a shorter measure
              (42ch ≈ 61 characters, an easier line than the 76 it ran at) and
              looser leading, which spends that height on the reading rhythm
              instead of leaving a void under the CTAs. The shorter measure also
              pulls the right edge clear of the suspended basket, which the 52ch
              lines used to run into. */}
          <div className="max-w-[52ch] space-y-5 text-[17px] leading-[1.6] text-foreground/85 lg:max-w-[42ch] lg:space-y-8 lg:text-[18px] lg:leading-[1.75]">
            <p>
              Modern AI is fluent, not correct. It has the confidence of an
              expert with the accountability of a guess. In high-stakes domains,
              that gap is a liability.
            </p>
            <p className="text-muted-foreground">
              We formalize your domain rules into machine-checkable form and
              prove every answer correct before it reaches production.
            </p>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-4 font-display text-[12px] font-medium lg:mt-28">
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
              href="#method"
              className="group inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-foreground transition-colors hover:border-foreground"
            >
              See the method
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
            className="group mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground lg:mt-14"
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

        {/* Right column left empty on purpose: it reserves the open water and
            the mechanism in the plate, so the copy never runs over them. */}
        <div aria-hidden className="hidden lg:block" />
      </div>
    </section>
  );
}
