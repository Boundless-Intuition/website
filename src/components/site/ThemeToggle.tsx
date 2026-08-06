import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";

import {
  allowsLight,
  applyTheme,
  storeTheme,
  themeForPath,
  type Theme,
} from "@/lib/theme";

/**
 * Only rendered on the blog — the rest of the site is dark-only, so there is
 * nothing to toggle there. See `@/lib/theme`.
 */
export function ThemeToggle() {
  const pathname = useLocation({ select: (l) => l.pathname });
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(themeForPath(pathname));
    setMounted(true);
  }, [pathname]);

  if (!allowsLight(pathname)) return null;

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    storeTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} reading mode`}
      className="grid size-8 place-items-center rounded-sm border border-border text-foreground/70 transition-colors hover:border-foreground/60 hover:text-foreground"
    >
      <span className="font-mono text-[13px]" aria-hidden>
        {mounted ? (theme === "dark" ? "☾" : "☀") : "·"}
      </span>
    </button>
  );
}
