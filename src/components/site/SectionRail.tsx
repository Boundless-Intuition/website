import { useEffect, useState } from "react";

// The on-page sections, moved off the top bar and onto a quiet vertical rail
// pinned to the right edge of the viewport. Ids must match the section anchors
// rendered on the home page (see the hrefs the TopBar/footer point at).
const SECTIONS = [
  { id: "doctrine", label: "Doctrine" },
  { id: "method", label: "Method" },
  { id: "try", label: "Demonstration" },
  { id: "domains", label: "Domains" },
  { id: "value", label: "Value" },
  { id: "walkthrough", label: "Walkthrough" },
  { id: "lab", label: "Lab" },
] as const;

export function SectionRail() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  // Scroll-spy: whichever section is crossing the middle band of the viewport
  // is the active one. The symmetric rootMargin collapses the observation area
  // to a thin horizontal band centred on the screen.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!els.length) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // topmost visible section in document order wins
        const next = SECTIONS.find((s) => visible.has(s.id));
        if (next) setActive(next.id);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-5 top-[42%] z-40 hidden -translate-y-1/2 xl:block"
    >
      {/* group: the whole rail reveals its labels on hover; at rest only the
          tick marks sit quietly in the right gutter. */}
      <ul className="group flex flex-col items-end gap-1">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id} className="w-full">
              <a
                href={`/#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                className="flex items-center justify-end gap-3 py-1"
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.18em] opacity-0 transition-all duration-300 group-hover:opacity-100 ${
                    isActive
                      ? "text-foreground group-hover:text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  aria-hidden
                  className={`h-px shrink-0 transition-all duration-300 ${
                    isActive
                      ? "w-8 bg-accent"
                      : "w-4 bg-foreground/25 group-hover:bg-foreground/45"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
