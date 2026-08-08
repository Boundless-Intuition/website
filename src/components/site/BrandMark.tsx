/**
 * The Boundless Intuition mark — the feather drawn as a halftone field, the
 * house visual language applied to the logo itself (docs/visual-system.md).
 *
 * It ships as two plates rather than one masked PNG. The old mark was a flat
 * silhouette, so a CSS mask over `bg-foreground` could recolour it per theme for
 * free; this one carries its own values — bone-white grains, the warm ochre
 * glints, and the faint outlying grains at partial alpha — and a mask would
 * flatten all of it to a single colour. Ivory grains are invisible on the
 * vellum light palette, so the light plate redraws them in ink and darkens the
 * glints, the same inversion `BlogVisual` applies to the live halftone.
 *
 * Both plates are cropped tight to the feather (~1.5:1) rather than to the full
 * halftone field. The far-flung grains in the source put ~20% empty width to the
 * left of the mark, which pushed it off its optical position in the lockup and
 * made it read oversized for its ink; at lockup sizes those grains are a pixel
 * of near-zero alpha anyway. Callers set height only and let width follow.
 *
 * Both plates are always in the DOM and swapped with `dark:`, because the theme
 * is a class on <html> and can change without a reload.
 *
 * Decorative on purpose: every call site renders the wordmark next to it, so
 * announcing the image too would read the brand name twice.
 */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <>
      <img
        src="/logo-bi-labs-light.png"
        alt=""
        aria-hidden
        className={`w-auto dark:hidden ${className}`}
      />
      <img
        src="/logo-bi-labs.png"
        alt=""
        aria-hidden
        className={`hidden w-auto dark:block ${className}`}
      />
    </>
  );
}
