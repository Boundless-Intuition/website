import { Link } from "@tanstack/react-router";

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
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <div className="font-display text-[15px] font-medium tracking-tight text-foreground">
              Boundless Intuition
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
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:flex-row md:items-center">
          <span>© 2026 Boundless Intuition</span>
          <span className="tabular-nums text-foreground/70">
            46.2330° N · 6.0557° E
          </span>
          <span>All results verifiable</span>
        </div>
      </div>
    </footer>
  );
}
