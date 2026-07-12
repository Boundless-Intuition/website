import { useCallback, useEffect, useRef, useState } from "react";

/**
 * GlitchText — a "decode to verified" headline effect.
 *
 * The text arrives as unstable, glitching noise — the visual of an AI answer
 * that is fluent but not yet trusted — and a verification pass (the scanline)
 * resolves it, character by character, into the clean final string. It is the
 * site's own thesis rendered in motion: fluent, not correct, being disproved.
 * It then rests briefly and re-runs on a loop so the headline never sits fully
 * still — verification is a thing that keeps happening.
 *
 * Design notes:
 * - SSR-safe: server and first client render both emit the plain final text
 *   (no hydration mismatch). The animation is a client-only enhancement kicked
 *   off in an effect.
 * - Accessible: while animating, the real text is exposed to assistive tech via
 *   an `sr-only` copy and the animated glyphs are `aria-hidden`. Once settled,
 *   the plain, selectable text is what remains in the DOM.
 * - No layout shift: undecoded characters keep their final glyph but render
 *   transparent, so they reserve their true width and wrapping never jumps.
 * - Honors `prefers-reduced-motion`: the effect simply never starts.
 *
 * Requires a positioned ancestor (e.g. `relative` on the wrapping heading) so
 * the sweeping scanline can size to the full, possibly multi-line, text box.
 */

const GLYPHS = "<>/\\[]{}=+*—·:;≡⊢∎01".split("");

const STAGGER = 24; // ms between each character starting to resolve
const DUR = 260; // ms each character spends scrambling
const TAIL = 80; // ms of settle after the last character resolves

type Cell = { ch: string; s: 0 | 1 | 2 }; // 0 pending · 1 scrambling · 2 done

export function GlitchText({
  text,
  replayOnHover = true,
  repeatDelay = 4600,
}: {
  text: string;
  replayOnHover?: boolean;
  /** ms the settled text rests before it glitches and re-decodes again */
  repeatDelay?: number;
}) {
  const [cells, setCells] = useState<Cell[] | null>(null);
  const raf = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stable schedule derived from the text — order[i] is the resolve slot of the
  // character at index i, skipping spaces. Total drives both the rAF loop's
  // end and the scanline's CSS duration so the sweep tracks the decode.
  const chars = [...text];
  const order = new Map<number, number>();
  let slots = 0;
  chars.forEach((c, i) => {
    if (c !== " ") order.set(i, slots++);
  });
  const total = slots * STAGGER + DUR + TAIL;

  const stop = useCallback(() => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = null;
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const play = useCallback(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    stop();
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const t = ts - start;
      setCells(
        chars.map((ch, i) => {
          if (ch === " ") return { ch: " ", s: 2 };
          const from = (order.get(i) ?? 0) * STAGGER;
          if (t >= from + DUR) return { ch, s: 2 };
          if (t >= from)
            return { ch: GLYPHS[(Math.random() * GLYPHS.length) | 0], s: 1 };
          return { ch, s: 0 };
        }),
      );
      if (t < total) {
        raf.current = requestAnimationFrame(step);
      } else {
        raf.current = null;
        setCells(null); // settle to the plain, selectable text
        // rest briefly, then decode again so it never stays still
        timer.current = setTimeout(play, repeatDelay);
      }
    };
    raf.current = requestAnimationFrame(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, stop, repeatDelay]);

  useEffect(() => {
    play();
    return stop;
  }, [play, stop]);

  // Resting state (also the SSR / first-render output): plain, real text.
  if (!cells) {
    return <span onMouseEnter={replayOnHover ? play : undefined}>{text}</span>;
  }

  return (
    <span onMouseEnter={replayOnHover ? play : undefined}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="hero-glitch">
        {cells.map((c, i) =>
          c.ch === " " ? (
            <span key={i}> </span>
          ) : (
            <span
              key={i}
              className={
                c.s === 0
                  ? "text-transparent"
                  : c.s === 1
                    ? "text-[oklch(0.55_0.13_230)] dark:text-[oklch(0.82_0.11_220)]"
                    : ""
              }
            >
              {c.ch}
            </span>
          ),
        )}
      </span>
      <span
        aria-hidden
        className="hero-scanbar pointer-events-none absolute inset-x-0 h-px bg-[oklch(0.55_0.13_230)] dark:bg-[oklch(0.82_0.11_220)]"
        style={{
          ["--scan-dur" as string]: `${total}ms`,
          boxShadow: "0 0 12px oklch(0.72 0.11 220 / 0.75)",
        }}
      />
    </span>
  );
}
