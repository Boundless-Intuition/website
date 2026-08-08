import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { PlatePourVisual } from "./domain-visuals/PlateVisual";

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
 * The painting is left whole. The only live element is the water itself, drawn
 * as a halftone plume falling from the spout and mirrored under the surface —
 * the plate's own motion continued rather than an effect laid over it. The
 * arcade runs in from the right and the rest is open water, which is where the
 * statement goes.
 */
export function ThesisBand() {
  // The pointer is read from the section, not the canvas: the canvas sits
  // behind the copy, so anywhere you would actually be reading would otherwise
  // be dead to it.
  const bandRef = useRef<HTMLElement | null>(null);

  return (
    <section ref={bandRef} className="relative overflow-hidden bg-background">
      <PlatePourVisual pointerTarget={bandRef} />

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

          <Link
            to="/overview"
            className="group mt-10 inline-flex items-center gap-3 border-b border-foreground/40 pb-1 font-display text-[13px] font-medium text-foreground transition-colors hover:border-foreground"
          >
            Read the overview
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
