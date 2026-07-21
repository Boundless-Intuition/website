import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";

const SECTIONS = [
  { href: "/#doctrine", label: "Doctrine" },
  { href: "/#method", label: "Method" },
  { href: "/#try", label: "Demonstration" },
  { href: "/#domains", label: "Domains" },
  { href: "/#value", label: "Value" },
  { href: "/#walkthrough", label: "Walkthrough" },
  { href: "/#lab", label: "Lab" },
];

export function TopBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Track whether the page has scrolled away from the top.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The bar never paints a background — it stays fully transparent and
  // dissolved into the page at every scroll position. When scrolled, only a
  // faint backdrop blur is applied (no colour/tint) so links stay legible
  // over passing content without going dark. The open mobile drawer forces
  // the solid treatment so the menu stays readable.
  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-[background-color,backdrop-filter] duration-300 ${
        open
          ? "bg-background/85 backdrop-blur-md"
          : scrolled
            ? "bg-transparent backdrop-blur-[2px]"
            : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-12">
          <Link
            to="/"
            className="flex items-center gap-2.5 font-display text-[15px] tracking-tight text-foreground"
          >
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
          </Link>
          <div className="hidden gap-8 font-display text-[12px] font-medium text-muted-foreground md:flex">
            <Link to="/blog" className="transition-colors hover:text-foreground">
              Blog
            </Link>
            <a
              href="https://playground.boundlessintuition.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
            >
              Playground
              <span aria-hidden className="text-[10px]">
                ↗
              </span>
            </a>
          </div>
        </div>
        <div className="flex items-center gap-5">

          {/* Engage - styled as a soft CTA, not a loud button */}
          <Link
            to="/engage"
            className="hidden items-center border border-foreground/25 px-4 py-1.5 font-display text-[12px] font-medium text-foreground transition-colors hover:border-foreground/60 hover:bg-foreground/5 sm:inline-flex"
          >
            Engage
          </Link>
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-sm border border-border text-foreground transition-colors hover:bg-foreground/5 md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-[1.5px] w-4 bg-current transition-opacity duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden transition-[max-height] duration-300 md:hidden ${
          open
            ? "max-h-96 border-t border-border bg-background/95 backdrop-blur-md"
            : "max-h-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-col divide-y divide-border">
            {SECTIONS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                onClick={() => setOpen(false)}
                className="py-3 font-display text-[15px] font-medium text-foreground/85 transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
            <Link
              to="/blog"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-3 font-display text-[15px] font-medium text-foreground/85 transition-colors hover:text-foreground"
            >
              Blog
            </Link>
            <a
              href="https://playground.boundlessintuition.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-3 font-display text-[15px] font-medium text-foreground/85 transition-colors hover:text-foreground"
            >
              Playground
              <span aria-hidden className="text-muted-foreground">
                ↗
              </span>
            </a>
            <Link
              to="/engage"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-3 font-display text-[15px] font-medium text-foreground"
            >
              Engage
              <span aria-hidden className="text-muted-foreground">
                →
              </span>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
