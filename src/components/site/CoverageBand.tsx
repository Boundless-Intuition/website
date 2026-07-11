import { useEffect, useRef, useState } from "react";

/**
 * CoverageBand — the "payoff" statistic: one proof covers the entire input
 * space. The figure is 2^64 (every value of a 64-bit parameter), counted up
 * with BigInt so all twenty digits stay exact, overshooting slightly before it
 * settles — like an instrument finding its reading. Honors reduced motion.
 */
const TARGET = 18446744073709551616n; // 2^64
const group = (s: string) => s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const FINAL = group(TARGET.toString());

const C1 = 1.7;
const C3 = C1 + 1;
const easeOutBack = (p: number) =>
  1 + C3 * Math.pow(p - 1, 3) + C1 * Math.pow(p - 1, 2);
const easeInOut = (p: number) =>
  p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

// One loop: count up (with a settling overshoot), hold, rewind to zero, rest.
const UP = 1800;
const HOLD = 2600;
const DOWN = 900;
const REST = 600;
const CYCLE = UP + HOLD + DOWN + REST;

function fracAt(t: number) {
  const m = t % CYCLE;
  if (m < UP) return easeOutBack(m / UP);
  if (m < UP + HOLD) return 1;
  if (m < UP + HOLD + DOWN) return 1 - easeInOut((m - UP - HOLD) / DOWN);
  return 0;
}

function readout(frac: number) {
  const scaled = BigInt(Math.max(0, Math.round(frac * 1_000_000)));
  return group(((TARGET * scaled) / 1_000_000n).toString());
}

export function CoverageBand() {
  const [display, setDisplay] = useState(FINAL);
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setDisplay(FINAL);
      return;
    }
    let start = 0;
    const loop = (ts: number) => {
      setDisplay(readout(fracAt(ts - start)));
      raf.current = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            // (re)start the loop when the band scrolls into view
            if (raf.current === null) {
              raf.current = requestAnimationFrame((ts) => {
                start = ts;
                loop(ts);
              });
            }
          } else if (raf.current !== null) {
            // pause off-screen; rest on the settled value
            cancelAnimationFrame(raf.current);
            raf.current = null;
            setDisplay(FINAL);
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <section
      id="coverage"
      className="relative overflow-hidden border-b border-border bg-ink text-ink-foreground"
    >
      <div
        className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-6 py-28 text-center">
        <div className="mb-8 flex items-center justify-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">
          <span className="h-px w-8 bg-white/30" />
          <span>§ · Coverage</span>
          <span className="h-px w-8 bg-white/30" />
        </div>

        <p className="mb-7 font-display text-[1.5rem] font-light leading-tight tracking-tight text-white/85 md:text-[2rem]">
          How one proof holds across
        </p>

        <div
          ref={ref}
          className="font-mono text-[clamp(1.25rem,6.2vw,3.6rem)] font-medium leading-none tracking-tight tabular-nums text-[oklch(0.82_0.11_220)]"
          style={{ textShadow: "0 0 32px oklch(0.72 0.09 220 / 0.45)" }}
        >
          {display}
        </div>

        <svg
          viewBox="0 0 100 8"
          preserveAspectRatio="none"
          className="mx-auto mt-5 h-2.5 w-full max-w-2xl text-white/25"
          aria-hidden
        >
          {Array.from({ length: 41 }).map((_, i) => {
            const x = i * 2.5;
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

        <p className="mx-auto mt-8 max-w-[48ch] text-[15px] leading-relaxed text-white/60">
          possible inputs — every value of a single 64-bit parameter. A test
          suite samples a few thousand. A proof covers all of them, and lets
          zero escape.
        </p>
        <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
          2<sup>64</sup> · exhaustive, not sampled
        </div>
      </div>
    </section>
  );
}
