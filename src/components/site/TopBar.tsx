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

  // Transparent over the hero; solidify once the page scrolls beneath it.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drawer open forces the solid treatment so the menu stays legible.
  const solid = scrolled || open;

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-background/55 via-background/15 to-transparent backdrop-blur-[2px]"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-12">
          <Link
            to="/"
            className="flex items-center gap-2.5 font-display text-[15px] font-medium tracking-tight text-foreground"
          >
            <span className="grid size-5 place-items-center border border-foreground/70">
              <span className="size-1.5 bg-foreground" />
            </span>
            Boundless Intuition
          </Link>
          <div className="hidden gap-8 font-display text-[12px] font-medium text-muted-foreground md:flex">
            {SECTIONS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
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
        className={`overflow-hidden border-t border-border bg-background/95 backdrop-blur-md transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0 border-t-transparent"
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
