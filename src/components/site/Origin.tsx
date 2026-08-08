import { useRef } from "react";
import { track } from "@/lib/analytics";
import { PlateDrift } from "./PlateDrift";
import { LabPlumeOverlay } from "./domain-visuals/PlateVisual";

/**
 * The lab.
 *
 * Immersive, on the same pattern as the thesis band: one plate edge to edge,
 * copy over the open side of it, no frame and no seam. An earlier version split
 * the band in two and ended the picture partway across, which put a hard
 * vertical edge down the middle of the section however the edge was drawn —
 * a plate that stops inside the viewport always reads as a panel.
 *
 * The copy is deliberately short: no founding dates, no coordinates. The plate
 * carries what a lab is — three people calibrating an instrument together, one
 * polishing the graduated ring, one adjusting a theodolite, one steadying the
 * sphere — so the words only have to say who and where.
 *
 * Two live elements. The plate itself drifts on a very slow cycle and leans
 * away from the cursor; over it, grain leaves the sphere's own edge in slow
 * wavefronts and spends itself across the open sky. It emits from the
 * instrument because that is the only place on this plate anything could —
 * a stream starting out in open sky read as arriving from nowhere.
 *
 * The cursor sets the plume's ink: ivory in the open field, struck to lantern
 * ochre where it is held.
 */
export function Origin() {
  // The pointer is read from the section, not the canvas: the canvas sits
  // behind the copy, so anywhere you would actually be reading would otherwise
  // be dead to it.
  const bandRef = useRef<HTMLElement | null>(null);

  return (
    <section
      id="lab"
      ref={bandRef}
      className="relative overflow-hidden bg-background"
    >
      <PlateDrift
        src="/plates/armillary-sphere-polishing.webp"
        // keeps the sphere and the standing figures; spends the crop on the
        // marble base instead. LabPlumeOverlay reproduces this exact crop —
        // change one and change the other, or the plume leaves the wrong spot.
        focus="50% 34%"
        pointerTarget={bandRef}
      />
      <LabPlumeOverlay pointerTarget={bandRef} />

      {/* Reading scrim: heavy where the copy sits, gone before the sphere. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent lg:via-background/55"
      />
      {/* Short vertical dissolves — long ones stack with the neighbouring
          section's into a band of dead background between the pictures. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background to-transparent"
      />
      {/* Longer at the foot than at the head: above is another plate with a
          fade of its own, so a long ramp there would stack into dead ground —
          but below is the footer, plain page, and the plate has room to spend
          itself properly into it. This is the only transition on the page with
          nothing competing beneath it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/70 to-transparent lg:h-40"
      />

      <div className="relative mx-auto max-w-shell px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-[30ch] lg:max-w-[42ch]">
          <p className="mb-7 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            The lab
          </p>

          <h2 className="mb-8 max-w-[16ch] font-display text-[2.2rem] font-light leading-[1.08] tracking-[-0.02em] text-foreground md:text-[2.7rem]">
            Built at the edge of what's verifiable.
          </h2>

          <p className="text-[17px] leading-[1.7] text-foreground/85 lg:text-[18px]">
            We are a team of researchers and engineers, working out of Geneva.
            We come from CERN, where a system is not finished until it has been
            proved correct, and we build the tools that hold AI to that same
            standard.
          </p>

          <a
            href="mailto:research@boundlessintuition.com"
            onClick={() => track("contact_mailto", { from: "lab" })}
            className="group mt-10 inline-flex items-center gap-3 border-b border-foreground/40 pb-1 font-display text-[13px] font-medium text-foreground transition-colors hover:border-foreground"
          >
            research@boundlessintuition.com
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
