// The site is obsidian-dark everywhere. The "Blueprint Vellum" light palette
// survives for one purpose only — long-form reading on the blog — so the theme
// toggle lives on `/blog` and nowhere else, and every other route re-asserts
// dark on navigation.
//
// The pre-hydration counterpart to this module is the inline script in
// `src/routes/__root.tsx`; if the rule here changes, change it there too or the
// first paint and the first render will disagree.

export type Theme = "light" | "dark";

export const THEME_KEY = "bi-theme";

/** Whether a route is allowed to render in the light palette. */
export function allowsLight(pathname: string): boolean {
  return pathname === "/blog" || pathname.startsWith("/blog/");
}

export function storedTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(THEME_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

export function storeTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* ignore */
  }
}

/** The theme a given path must render in. Dark unless the blog says otherwise. */
export function themeForPath(pathname: string): Theme {
  if (!allowsLight(pathname)) return "dark";
  return storedTheme() ?? "dark";
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}
