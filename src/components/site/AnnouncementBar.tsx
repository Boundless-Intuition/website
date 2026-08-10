import { Link } from "@tanstack/react-router";
import { track } from "@/lib/analytics";

/**
 * The one announcement strip. Rendered by SiteChrome, which pins it above the
 * top bar; see that file for the height arithmetic every page keys off.
 *
 * One line of type and an arrow, and nothing else — no rule, no chip, no
 * accent, and no fill beyond the fall from page black to nothing. The plate
 * runs up behind it, so it reads as part of the screen rather than a band
 * bolted above it.
 *
 * Sentence-case mono rather than the wide uppercase the rest of the chrome
 * uses: at this length the tracked caps run past half the viewport and stop
 * scanning as a single line.
 *
 * Curated, not derived from BLOG_POSTS: the newest post is not automatically
 * the one worth stopping a visitor for. To retire the strip, drop it from
 * `SiteChrome`; to repoint it, edit the three constants below.
 */
const SLUG = "dirac-perfect-score-imo-2026";
const HEADLINE =
  "Boundless Intuition’s prover Dirac proves 6/6 on IMO 2026 at record speed";
const HEADLINE_SHORT = "Dirac proves 6/6 on IMO 2026";

/** Feeds CHROME_HEIGHT in SiteChrome — change the two together. */
export const ANNOUNCEMENT_HEIGHT = "h-10";

export function AnnouncementBar() {
  return (
    // The fall, not a fill: page black at the top edge easing to nothing at the
    // foot, so the strip has presence and the plate still reads through it.
    // Never a full-opacity `from-background` stop - that is the solid bar this
    // must not become. z-50 keeps it above the <main> that is pulled up over it.
    <Link
      to="/blog/$slug"
      params={{ slug: SLUG }}
      onClick={() => track("announcement_clicked", { slug: SLUG })}
      aria-label={`${HEADLINE} — read the result`}
      className="group relative z-50 block bg-gradient-to-b from-background/85 via-background/55 to-transparent"
    >
      {/* Each width gets its own complete row rather than one row with pieces
          switched off inside it: the full line does not fit a narrow phone, and
          a two-line announcement stops reading as a rule and starts reading as
          a paragraph. Both are aria-hidden - the link carries the full label. */}
      <div
        aria-hidden
        className={`mx-auto flex ${ANNOUNCEMENT_HEIGHT} max-w-shell items-center justify-center gap-2 px-6 md:hidden`}
      >
        <span className="font-mono text-[11.5px] text-foreground/75">
          {HEADLINE_SHORT}
        </span>
        <span className="text-[11px] text-foreground/50 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:text-foreground/80">
          →
        </span>
      </div>

      <div
        aria-hidden
        className={`mx-auto hidden ${ANNOUNCEMENT_HEIGHT} max-w-shell items-center justify-center gap-2.5 px-6 md:flex lg:px-10`}
      >
        <span className="font-mono text-[13px] text-foreground/75 transition-colors group-hover:text-foreground">
          {HEADLINE}
        </span>
        <span className="text-[12px] text-foreground/50 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:text-foreground/80">
          →
        </span>
      </div>
    </Link>
  );
}
