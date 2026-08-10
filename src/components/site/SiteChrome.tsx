import { AnnouncementBar } from "./AnnouncementBar";
import { TopBar } from "./TopBar";

/**
 * The page chrome: the announcement strip with the top bar under it. Pages that
 * want the strip render this instead of a bare <TopBar />, which is also the one
 * place to add or retire it across every route at once.
 *
 * The strip is *not* pinned. It sits in the flow at the top of the page and
 * scrolls away for good; only the top bar sticks, exactly as it did before the
 * strip existed. So nothing that sticks below the chrome needs re-keying — the
 * blog's filter bar and the post table of contents still offset against the
 * bar's own 4rem.
 *
 * What the page does owe the strip is CHROME_PULL. The strip is transparent, so
 * it only reads as part of the screen if the plate behind it is the screen: a
 * page whose first section already carries the site's `-mt-16` (pulling it under
 * the transparent bar) additionally pulls its <main> up by the strip's 40px, and
 * the art then starts at the very top of the viewport.
 *
 * That pull goes on <main> together with `flow-root`, and the pairing is
 * load-bearing: without a block formatting context, <main>'s top margin
 * collapses with its first child's into the single most-negative of the two, and
 * only one of the two pulls survives.
 */
export const CHROME_PULL = "-mt-10";

export function SiteChrome() {
  return (
    <>
      <AnnouncementBar />
      <TopBar />
    </>
  );
}
