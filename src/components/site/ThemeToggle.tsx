import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function apply(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      (window.localStorage.getItem("bi-theme") as Theme | null)) || null;
    // Dark by default on every device; only an explicit stored choice overrides.
    const initial: Theme = stored ?? "dark";
    setTheme(initial);
    apply(initial);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    apply(next);
    try {
      window.localStorage.setItem("bi-theme", next);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="grid size-8 place-items-center rounded-sm border border-border text-foreground/70 transition-colors hover:border-foreground/60 hover:text-foreground"
    >
      <span className="font-mono text-[13px]" aria-hidden>
        {mounted ? (theme === "dark" ? "☾" : "☀") : "·"}
      </span>
    </button>
  );
}
