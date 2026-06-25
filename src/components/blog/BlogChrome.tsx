import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ParticleField, defaultSettings } from "@/components/ParticleField";
import { useTheme } from "@/hooks/use-theme";

/**
 * Shared shell for every blog page: the subtle particle field, the top nav
 * (brand → home, theme toggle), and the footer — so /blog and /blog/$slug match
 * the landing page's paper/ink theme exactly.
 */
export function BlogChrome({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="relative flex min-h-screen w-full flex-col bg-background text-foreground transition-colors duration-300"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* Subtle collision field, dialled back so long-form text stays readable */}
      <div className="pointer-events-none fixed inset-0 -z-0 opacity-[0.45]">
        <ParticleField settings={{ ...defaultSettings, density: 0.6 }} />
      </div>

      {/* Header */}
      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-6 md:px-10">
        <Link
          to="/"
          className="text-sm font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
        >
          Boundless Intuition
        </Link>
        <nav className="flex items-center gap-5 text-[10px] uppercase tracking-widest text-muted-foreground">
          <Link to="/blog" className="transition-colors hover:text-foreground">
            Blog
          </Link>
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="transition-colors hover:text-foreground"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </nav>
      </header>

      {/* Page body */}
      <main className="relative z-10 flex-1">{children}</main>

      {/* Footer */}
      <footer className="relative z-10 mx-auto mt-20 w-full max-w-5xl px-6 py-10 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 border-t border-border pt-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <p className="text-[9px] uppercase tracking-widest text-muted-foreground">
              Founded by CERN Researchers
            </p>
            <div className="h-3 w-px bg-foreground/20" />
            <img src="/cern-logo-blue.svg" alt="CERN" className="h-5 w-auto opacity-75 dark:hidden" />
            <img
              src="/cern-logo-white.svg"
              alt="CERN"
              className="hidden h-5 w-auto opacity-60 dark:block"
            />
          </div>
          <a
            href="mailto:research@boundlessintuition.com"
            className="text-[10px] uppercase tracking-widest underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-muted-foreground"
          >
            research@boundlessintuition.com
          </a>
        </div>
      </footer>
    </div>
  );
}
