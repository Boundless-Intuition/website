import { Link } from "@tanstack/react-router";
import { Waitlist } from "./Waitlist";

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

const SECTION_LINKS = [
  ["/#doctrine", "Doctrine"],
  ["/#method", "Method"],
  ["/#domains", "Domains"],
  ["/#value", "Value"],
  ["/#walkthrough", "Walkthrough"],
  ["/#lab", "Lab"],
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-background">
      {/* Waitlist / "Signal" capture — the first row of the footer */}
      <Waitlist />
      {/* Divider between the waitlist band and the footer proper */}
      <div className="relative z-10 h-px w-full bg-border" aria-hidden />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2.5 font-display text-[15px] tracking-tight text-foreground">
              {/* Logo, masked so it takes the theme colour (light + dark) */}
              <span
                role="img"
                aria-label="Boundless Intuition"
                className="inline-block size-7 bg-foreground"
                style={{
                  WebkitMaskImage: "url(/boundless_int_logo_white.png)",
                  maskImage: "url(/boundless_int_logo_white.png)",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
              <span>
                <span className="font-light">Boundless</span>{" "}
                <span className="font-semibold">Intuition</span>{" "}
                <span className="font-light">Labs</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-muted-foreground">
              The trust layer for artificial intelligence.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-14 gap-y-3 font-display text-[12px] font-medium text-muted-foreground sm:grid-cols-3">
            {SECTION_LINKS.map(([href, label]) => (
              <a key={label} href={href} className="hover:text-foreground">
                {label}
              </a>
            ))}
            <Link to="/engage" className="hover:text-foreground">
              Engage
            </Link>
            <Link to="/blog" className="hover:text-foreground">
              Blog
            </Link>
            <a
              href="https://playground.boundlessintuition.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground"
            >
              Playground
              <span aria-hidden className="text-[10px]">
                ↗
              </span>
            </a>
            <a
              href="mailto:research@boundlessintuition.com"
              className="hover:text-foreground"
            >
              Contact
            </a>
            <Link to="/legal" className="hover:text-foreground">
              Legal
            </Link>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            {/* CERN mark, masked so it takes the theme colour (light + dark) */}
            <span
              role="img"
              aria-label="CERN"
              className="inline-block h-[18px] w-[18px] bg-foreground/70"
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
          <span className="tabular-nums text-foreground/70">
            46.2330° N · 6.0557° E
          </span>
          <span>All results verifiable</span>
        </div>
      </div>

      {/* The monument wordmark — a quiet watermark clipped by the base of the
          page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none"
      >
        <div className="flex translate-y-[26%] justify-center">
          <span className="whitespace-nowrap font-display text-[19vw] font-light leading-none tracking-[-0.045em] text-foreground/[0.07]">
            Boundless Intuition
          </span>
        </div>
      </div>
    </footer>
  );
}
