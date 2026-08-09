import { Link } from "@tanstack/react-router";
import { PlateDrift } from "./PlateDrift";

/**
 * The thesis band between the hero and the lab.
 *
 * Full-bleed rather than a figure in a box: the statement is the lab's position
 * on what the work is for, and a hairline frame around it would read as an
 * exhibit. The plate runs edge to edge and dissolves into the page at the top
 * and bottom, so the band has no seam — it is a stretch of the page that
 * happens to be painted.
 *
 * The plate is an aqueduct that stops mid-air, with a procession walking the
 * top toward the unbuilt end behind a single lantern, and measured water
 * falling from the broken edge. Infrastructure meant to outlast the people who
 * laid it, caught unfinished — which is the copy's "the future we are building
 * toward" without illustrating the words.
 *
 * The painting is left whole and nothing is drawn on top of it. The plate is a
 * film rather than a still, so the fall the painting depicts actually falls —
 * that is the whole of the motion in this band. An earlier version laid a live
 * halftone plume over the spout as well (platePour / PlatePourOverlay, both
 * still in domain-visuals if it is ever wanted back); with a film underneath
 * that was a second, coarser stream over a painted one that already moves.
 *
 * Nothing about the picture responds to the cursor here either: no drift, no
 * parallax, no lantern. The band is a statement and the plate is the ground it
 * is set on. The arcade runs in from the right and the rest is open water,
 * which is where the statement goes.
 */
export function ThesisBand() {
  return (
    <section className="relative overflow-hidden bg-background">
      <PlateDrift
        // the film's own first frame — not /plates/aqueduct-procession.webp,
        // which is the same painting at a slightly different framing and would
        // show as a jump when the film takes over.
        src="/thesis-plate-poster.webp"
        mobileSrc="/thesis-plate-poster-mobile.webp"
        film="/thesis-plate"
        // held still: see the note above, and `drift` on PlateDrift.
        drift={false}
      />

      {/* Reading scrim: heavy at the left edge where the copy sits, gone by the
          time it reaches the sphere so the plate keeps its own contrast. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent lg:via-background/55"
      />
      {/* Vertical dissolves — what makes it immersive rather than pasted on.
          Kept short on purpose: the sections above and below are dark plates
          with fades of their own, and two long ramps meeting just stack into a
          band of dead background between the pictures. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent"
      />

      <div className="relative mx-auto max-w-shell px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-[30ch] lg:max-w-[44ch]">
          <p className="mb-7 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            What we believe
          </p>

          <div className="space-y-6 font-display text-[1.2rem] font-light leading-[1.55] tracking-[-0.01em] text-foreground/90 lg:text-[1.5rem]">
            <p>
              We believe a world where advanced AI is safe to deploy is a world
              where consequential decisions can be verified before they are
              trusted. It is a world where correctness matters as much as
              capability, and where trust is earned through evidence rather than
              confidence.
            </p>
            <p>
              That is the future we are building toward. It is the foundation of
              trustworthy AI, and the path towards verified superintelligence.
            </p>
          </div>

          {/* Same destination as before, named for what is actually down
              there: the overview's "Domains & Benchmarks" section. A belief
              statement should hand off to the evidence for it, not to a table
              of contents. */}
          <Link
            to="/overview"
            className="group mt-10 inline-flex items-center gap-3 border-b border-foreground/40 pb-1 font-display text-[13px] font-medium text-foreground transition-colors hover:border-foreground"
          >
            See our benchmarks
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
  );
}
