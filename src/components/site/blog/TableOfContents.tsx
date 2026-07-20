import { useEffect, useState, type RefObject } from "react";

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

// Builds its list from the actual rendered h2/h3[id] elements rather than a
// hand-duplicated outline, so it can never drift from the content.
export function TableOfContents({ containerRef }: { containerRef: RefObject<HTMLElement | null> }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const els = Array.from(root.querySelectorAll<HTMLHeadingElement>("h2[id], h3[id]"));
    setHeadings(
      els.map((el) => ({
        id: el.id,
        text: el.textContent || "",
        level: el.tagName === "H3" ? 3 : 2,
      })),
    );
    if (els.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        if (visible.size > 0) {
          const firstVisible = els.find((el) => visible.has(el.id));
          if (firstVisible) setActiveId(firstVisible.id);
        }
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 hidden max-h-[calc(100vh-7rem)] w-52 shrink-0 overflow-y-auto pr-2 lg:block"
    >
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        On this page
      </div>
      <ul className="space-y-1.5 border-l border-border">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "ml-3" : ""}>
            <a
              href={`#${h.id}`}
              className={`-ml-px block border-l-2 py-0.5 pl-3 text-[12.5px] leading-snug transition-colors ${
                activeId === h.id
                  ? "border-accent font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
