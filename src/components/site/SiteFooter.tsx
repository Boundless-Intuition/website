import { Link } from "@tanstack/react-router";
import { BrandMark } from "./BrandMark";
import { track } from "@/lib/analytics";
import { BOOKING_URL } from "@/lib/links";
import { SECTIONS } from "@/lib/sections";

/**
 * The Swiss flag, in its own red. It is a national mark rather than a piece of
 * the palette, so it keeps the colour it actually is.
 */
function SwissFlag({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="Switzerland"
    >
      <rect width="32" height="32" rx="4" fill="#D52B1E" />
      <rect x="13" y="7" width="6" height="18" fill="#fff" />
      <rect x="7" y="13" width="18" height="6" fill="#fff" />
    </svg>
  );
}

/**
 * Social marks, drawn as single filled paths in `currentColor` so they take the
 * theme and sit at the same ink as the CERN badge beside them. Official glyphs,
 * not redrawn ones — a house-styled LinkedIn mark is just a wrong LinkedIn mark.
 */
const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/boundless-intuition/",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z",
  },
  {
    label: "X",
    href: "https://x.com/bi_labs",
    path: "M18.9 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
] as const;

// Derived from the canonical home-page section list so the footer can never
// drift from the anchors that actually exist on the page.
const PAGE_LINKS = SECTIONS.map((s) => ({
  href: `/#${s.id}`,
  label: s.label,
  external: false,
}));

/**
 * Site footer.
 *
 * Built on the same grammar as the rest of the site: mono labels in small caps,
 * hairline rules, and a readout row that states facts rather than decorating
 * them. The link lists carry mono column headings for the same reason the lab
 * section has an eyebrow — a label tells you what a group of things is, and it
 * costs one line to say.
 */
export function SiteFooter() {
  // No rule across the top. The section above ends in a plate, and a hairline
  // there cut the picture off at a hard edge instead of letting it spend itself
  // into the page — the plate's own fade is the transition.
  return (
    <footer className="relative overflow-hidden bg-background">
      {/* The footer was the only band on the page not sitting on a picture.
          Two figures meeting under a lantern, a comet coming down to meet its
          own reflection: a sign-off. Held well back — this band is dense with
          links, and the plate is here to give the page a floor, not to be
          looked at. The crop favours the lower half, where the horizon, the
          reflections and the flower band are. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img
          src="/plates/twin-gazebos-comet.webp"
          alt=""
          className="plate-drift h-full w-full object-cover object-[50%_62%] opacity-[0.5]"
        />
        {/* Fades in from the top so the lab plate above hands over to it
            rather than stopping and a second picture starting. */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
        {/* Legibility wash over the whole band. */}
        <div className="absolute inset-0 bg-background/75" />
      </div>

      <div className="relative z-10 mx-auto max-w-shell px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-2.5 font-display text-[15px] tracking-tight text-foreground">
              <BrandMark className="h-5" />
              <span>
                <span className="font-light">Boundless</span>{" "}
                <span className="font-semibold">Intuition</span>{" "}
                <span className="font-light">Labs</span>
              </span>
            </div>
            <p className="mt-4 max-w-[34ch] text-[14.5px] leading-relaxed text-muted-foreground">
              Foundational layer for Verified Intelligence
            </p>
            <a
              href="mailto:research@boundlessintuition.com"
              onClick={() => track("contact_mailto", { from: "footer" })}
              className="group mt-7 inline-flex items-center gap-2 border-b border-foreground/30 pb-1 font-display text-[13px] font-medium text-foreground transition-colors hover:border-foreground"
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

          <div className="grid grid-cols-2 gap-x-10 gap-y-10">
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                Site
              </p>
              <ul className="space-y-2.5 font-display text-[13px] font-medium text-muted-foreground">
                {PAGE_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("booking_opened", { from: "footer" })}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                  >
                    Talk to the lab
                    <span aria-hidden className="text-[10px]">
                      ↗
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                Elsewhere
              </p>
              <ul className="space-y-2.5 font-display text-[13px] font-medium text-muted-foreground">
                <li>
                  <Link
                    to="/blog"
                    className="transition-colors hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <a
                    href="https://playground.boundlessintuition.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      track("outbound_playground", { from: "footer" })
                    }
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                  >
                    Playground
                    <span aria-hidden className="text-[10px]">
                      ↗
                    </span>
                  </a>
                </li>
                <li>
                  <Link
                    to="/legal"
                    className="transition-colors hover:text-foreground"
                  >
                    Legal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Readout row: provenance marks and the notice at one end, the social
            marks at the other. All of them are stamped marks at the same ink,
            which is why they share a row rather than the socials sitting up in
            a link column as words. */}
        <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            {/* CERN mark, masked so it takes the theme colour (light + dark) */}
            <span
              role="img"
              aria-label="CERN"
              className="inline-block h-[18px] w-[18px] bg-foreground/60"
              style={{
                WebkitMaskImage: "url(/CERN_logo_badge.svg)",
                maskImage: "url(/CERN_logo_badge.svg)",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
            <SwissFlag className="h-[15px] w-[15px] rounded-[3px]" />
            <span className="h-3 w-px bg-border" aria-hidden />
            <span>© 2026 Boundless Intuition</span>
          </div>

          <div className="flex items-center gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                onClick={() =>
                  track("outbound_social", { network: s.label, from: "footer" })
                }
                className="text-foreground/60 transition-colors hover:text-foreground"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-[15px]"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* The monument wordmark — a quiet watermark clipped by the base of the
          page, set in grain rather than in ink so it answers the halftone mark
          in the top bar. See `.halftone-type`. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none"
      >
        <div className="flex translate-y-[30%] justify-center">
          <span className="halftone-type whitespace-nowrap font-display text-[19vw] font-light leading-none tracking-[-0.045em]">
            Boundless Intuition
          </span>
        </div>
      </div>
    </footer>
  );
}
