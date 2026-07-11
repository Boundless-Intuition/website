import { useEffect, useMemo, useRef, useState } from "react";

/**
 * MeasuredFigure — renders a Value-section figure as an instrument readout.
 *
 * Numeric figures (e.g. "€20M · 4%") count up when scrolled into view and
 * overshoot slightly before settling, like a needle gauge finding its value,
 * shown in tabular-nums above a faint caliper tick-scale. Non-numeric figures
 * ("Personal", "Precedent") render plainly. Honors prefers-reduced-motion.
 */
const C1 = 1.9;
const C3 = C1 + 1;
// easeOutBack — rises, overshoots past the target, then settles back to it.
const easeOutBack = (p: number) =>
  1 + C3 * Math.pow(p - 1, 3) + C1 * Math.pow(p - 1, 2);

type Token = { raw: string; num: boolean; target: number; decimals: number };

export function MeasuredFigure({ value }: { value: string }) {
  const hasNumber = /\d/.test(value);

  const tokens = useMemo<Token[]>(
    () =>
      value.split(/(\d+(?:\.\d+)?)/).map((raw) => {
        const num = /^\d+(?:\.\d+)?$/.test(raw);
        const decimals =
          num && raw.includes(".") ? raw.split(".")[1].length : 0;
        return { raw, num, target: num ? parseFloat(raw) : 0, decimals };
      }),
    [value],
  );

  const build = (eased: number) =>
    tokens
      .map((t) =>
        t.num ? Math.max(0, t.target * eased).toFixed(t.decimals) : t.raw,
      )
      .join("");

  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined" || !hasNumber) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setDisplay(value);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.disconnect();
          const dur = 1300;
          let start: number | null = null;
          const step = (ts: number) => {
            if (start === null) start = ts;
            const p = Math.min(1, (ts - start) / dur);
            setDisplay(build(easeOutBack(p)));
            if (p < 1) raf.current = requestAnimationFrame(step);
            else setDisplay(value);
          };
          raf.current = requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, hasNumber]);

  return (
    <div>
      <span
        ref={ref}
        className="block font-display text-[26px] font-light leading-none tracking-tight tabular-nums text-foreground md:text-[30px]"
      >
        {display}
      </span>
      {hasNumber && (
        <svg
          viewBox="0 0 100 8"
          preserveAspectRatio="none"
          className="mt-2.5 h-2 w-full text-foreground/25"
          aria-hidden
        >
          {Array.from({ length: 26 }).map((_, i) => {
            const x = i * 4;
            const major = i % 5 === 0;
            return (
              <line
                key={i}
                x1={x}
                y1={major ? 0 : 3.5}
                x2={x}
                y2={8}
                stroke="currentColor"
                strokeWidth={major ? 0.8 : 0.5}
              />
            );
          })}
        </svg>
      )}
    </div>
  );
}
