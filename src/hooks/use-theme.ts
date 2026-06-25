import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

/**
 * Shared light/dark theme state. Persists to localStorage under "bi-theme"
 * and toggles the `dark` class on <html>, matching the landing page behaviour
 * so every page (home, blog) stays in sync.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("bi-theme")) as
      | Theme
      | null;
    const initial: Theme =
      stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("bi-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, setTheme, toggleTheme };
}
