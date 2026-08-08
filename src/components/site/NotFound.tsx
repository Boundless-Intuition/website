import { Link } from "@tanstack/react-router";
import { TopBar } from "./TopBar";
import { PlateDrift } from "./PlateDrift";

/**
 * The 404.
 *
 * Built like the rest of the site rather than as a bare system message: a plate
 * edge to edge, the copy over the open field, no frame. The plate is a labyrinth
 * seen from above, with a lit path running from the entrance to the centre and
 * a figure holding a lantern at each end — the route exists and is walkable,
 * this visitor simply is not on it, which is precisely what a 404 is.
 *
 * It keeps the top bar so a wrong turn is recoverable without using the CTA,
 * and drops the footer: an error page should get people moving, not offer them
 * a directory.
 */
export function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <section className="relative -mt-16 overflow-hidden lg:flex lg:min-h-[min(56.25vw,52rem)] lg:flex-col lg:justify-center">
        <PlateDrift
          src="/plates/labyrinth-aerial.webp"
          // the maze sits right of centre; this keeps its lit path in frame
          focus="58% 50%"
        />

        {/* Reading scrim over the open field, gone before the labyrinth. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent lg:via-background/55"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"
        />

        <div className="relative mx-auto w-full max-w-shell px-6 lg:px-10 pt-32 pb-24 lg:py-28">
          <div className="max-w-[30ch] lg:max-w-[44ch]">
            <p className="mb-7 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              404 · Not found
            </p>

            <h1 className="mb-8 font-display text-[2.4rem] font-light leading-[1.08] tracking-[-0.02em] text-foreground md:text-[3rem]">
              No such path.
            </h1>

            <p className="max-w-[46ch] text-[17px] leading-[1.7] text-foreground/85 lg:text-[18px]">
              The address you followed doesn't match anything we hold. It may
              have moved, or it may never have existed.
            </p>

            {/* Two thousand years before the 404, and still the best account of
                one. Seneca, Letters to Lucilius LXXI. */}
            <figure className="mt-10">
              <blockquote className="max-w-[42ch] font-display text-[17px] font-light italic leading-[1.55] text-foreground/70 lg:text-[18px]">
                “If one does not know to which port one is sailing, no wind is
                favourable.”
              </blockquote>
              <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Seneca · Letters to Lucilius
              </figcaption>
            </figure>

            <Link
              to="/"
              className="group mt-10 inline-flex items-center gap-2 border border-foreground bg-foreground px-6 py-3.5 font-display text-[13px] font-medium text-background transition-all hover:bg-foreground/90"
            >
              Back to the site
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
