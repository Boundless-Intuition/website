import { Link } from "@tanstack/react-router";
import { HeroFilm } from "./HeroFilm";
import { track } from "@/lib/analytics";
import { BOOKING_URL } from "@/lib/links";

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
      className="relative -mt-16 overflow-hidden lg:flex lg:min-h-[min(56.25vw,60rem)] lg:flex-col lg:justify-end"
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

      {/* From lg the section is a fixed 16:9 box (the min-h above), so the copy
          no longer sets the height — it sits inside it. The block is anchored to
          the bottom of that box rather than centred: the plate earns the whole
          upper field, and the copy reads up from the water line. pb-28 is what
          holds it off the floor, and it is load-bearing — it is roughly the
          height of the flower band in the plate, so the last line clears the
          silhouettes instead of sitting in them. The plate and the dissolve are
          absolute, so only this div is in the flex flow. */}
      <div className="relative mx-auto w-full max-w-shell grid gap-16 px-6 lg:px-10 pt-24 pb-28 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:pt-32">
        {/* @container so the headline can be sized against this column rather
            than the viewport — see the clamp on the h1. */}
        <div className="@container">
          {/* Category line above the headline. Mono rather than the display-face
              eyebrow the blog and legal pages use: it brackets the hero against
              the mono "get research updates" link at the foot of the same
              column, and reads as a stamped label rather than as small copy. */}
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[12px]">
            Verified Intelligence Infrastructure
          </p>

          {/* Two blocks rather than one wrapping line: the break is deliberate,
              so both lines start on the same left edge. "for" rides with the
              second line rather than trailing the first — "Foundational
              Infrastructure" is already the longer of the two, and hanging "for"
              off it pushes the line another 1.5em into the pour. Leading is a
              touch looser than a single line would want, so the descender of
              "g" in "Intelligence" has room under it.

              From lg the size follows the column width instead of a fixed step.
              "Foundational Infrastructure" measures ~12.4em in this face at this
              tracking, so 5.8cqw sets it to ~72% of the column. That width is
              the point of the number, not just the scale: past ~97% of the
              column the last word lands in the suspended basket in the plate.
              Holding it under three-quarters keeps the whole headline in open
              water to the left of the pour, and the shorter block also drops the
              headline clear of the basket vertically, since the column is
              anchored to the bottom of the section. The clamp floor is 1.95rem
              rather than 2.4rem for the same reason: at lg the column is only
              ~442px, and a 2.4rem floor would run this longer line past the
              column edge. text-balance is the safety net below lg, where the
              column runs full width. */}
          <h1 className="mb-8 text-balance font-display text-[2.5rem] font-light leading-[1.08] tracking-[-0.03em] text-foreground md:text-[3rem] lg:text-[clamp(1.95rem,5.8cqw,2.7rem)]">
            <span className="block">Foundational Infrastructure</span>
            <span className="block">for Verified Intelligence</span>
          </h1>

          {/* One paragraph, not two stacked blocks: the diagnosis and what it
              costs are a single thought, and splitting them put a 2rem gap where
              a full stop belongs. Read as one run they land as premise and
              consequence.

              Sized against the headline rather than as fine print — at 20px it
              sits at ~0.29 of the h1 instead of 0.26. The measure moves with it:
              40ch at 20px is the same physical width 42ch was at 18px, so the
              right edge stays clear of the suspended basket in the plate, which
              the old 52ch lines used to run into. */}
          <p className="max-w-[52ch] text-[17px] leading-[1.6] text-foreground/85 lg:max-w-[40ch] lg:text-[20px] lg:leading-[1.7]">
            The most fluent systems ever built still cannot tell you when they
            are wrong. Scaling intelligence without scaling trust is a dangerous
            trajectory.
          </p>

          {/* Two solid boxes of equal size rather than a box and a text link:
              at this scale a bare link beside a button reads as an afterthought.
              The thesis leads and carries the fill — it is the artifact the page
              is built to hand over — with the booking link beside it as the
              outlined second action. */}
          <div className="mt-10 flex flex-wrap items-center gap-3 font-display text-[13px] font-medium">
            <Link
              to="/blog/$slug"
              params={{ slug: "towards-verified-superintelligence" }}
              className="group inline-flex items-center gap-2 border border-foreground bg-foreground px-6 py-3.5 text-background transition-all hover:bg-foreground/90"
            >
              Read the thesis
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("booking_opened", { from: "hero" })}
              className="group inline-flex items-center gap-2 border border-foreground/30 bg-foreground/5 px-6 py-3.5 text-foreground transition-all hover:border-foreground/60 hover:bg-foreground/10"
            >
              Talk to the lab
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>

        {/* Right column left empty on purpose: it reserves the open water and
            the mechanism in the plate, so the copy never runs over them. */}
        <div aria-hidden className="hidden lg:block" />
      </div>
    </section>
  );
}
