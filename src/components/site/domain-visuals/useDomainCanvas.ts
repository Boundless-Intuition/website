import { useEffect, useRef } from "react";
import {
  type Engine,
  type EngineFactory,
  type FrameEnv,
  type Pointer,
  readPalette,
} from "./engine";

/**
 * Drives a single <canvas> from an Engine factory.
 *
 * Responsibilities kept out of the engines:
 *  - HiDPI: sizes the backing store to devicePixelRatio (capped at 2) and
 *    scales the 2D context so engines draw in CSS pixels.
 *  - ResizeObserver: re-measures on layout changes.
 *  - IntersectionObserver: only runs the rAF loop while on (or near) screen —
 *    essential when eight of these live on one page.
 *  - visibilitychange: pauses in background tabs.
 *  - prefers-reduced-motion: draws exactly one still frame, no loop.
 *  - pointer tracking on an external target (the card), normalized to 0..1.
 *
 * The returned refs are attached by the component: `canvasRef` to the <canvas>
 * and `pointerTargetRef` to the element whose hover/pointer should drive the
 * animation (usually the whole card).
 */
export function useDomainCanvas(makeEngine: EngineFactory) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerTargetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const engine: Engine = makeEngine();
    const pointer: Pointer = { x: 0.5, y: 0.5, active: false };
    let hover = false;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = Math.round(rect.width);
      h = Math.round(rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      engine.resize(w, h);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const drawStill = () => {
      if (w === 0) measure();
      if (w === 0) return;
      ctx.clearRect(0, 0, w, h);
      engine.frame(ctx, {
        w,
        h,
        t: 0,
        dt: 0,
        pointer: { x: 0.5, y: 0.5, active: false },
        palette: readPalette(),
        hover: false,
        still: true,
      });
    };

    // --- animation loop ---------------------------------------------------
    let raf = 0;
    let start = 0;
    let last = 0;
    let onScreen = false;
    let running = false;

    const tick = (now: number) => {
      if (!running) return;
      if (start === 0) {
        start = now;
        last = now;
      }
      const t = (now - start) / 1000;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const env: FrameEnv = {
        w,
        h,
        t,
        dt,
        pointer,
        palette: readPalette(),
        hover,
        still: false,
      };
      ctx.clearRect(0, 0, w, h);
      engine.frame(ctx, env);
      raf = window.requestAnimationFrame(tick);
    };

    const play = () => {
      if (running || reduce.matches) return;
      if (!onScreen || document.hidden) return;
      if (w === 0) measure();
      if (w === 0) return;
      running = true;
      // resync clock so time doesn't jump after a pause
      start = 0;
      last = 0;
      raf = window.requestAnimationFrame(tick);
    };

    const pause = () => {
      running = false;
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
    };

    // --- observers & listeners -------------------------------------------
    const ro = new ResizeObserver(() => {
      measure();
      if (reduce.matches) drawStill();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? false;
        if (onScreen) {
          if (reduce.matches) drawStill();
          else play();
        } else {
          pause();
        }
      },
      { rootMargin: "120px" },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) pause();
      else play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const target: HTMLElement = pointerTargetRef.current ?? canvas;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / Math.max(1, rect.width);
      pointer.y = (e.clientY - rect.top) / Math.max(1, rect.height);
      pointer.active = true;
    };
    const onEnter = () => {
      hover = true;
    };
    const onLeave = () => {
      hover = false;
      pointer.active = false;
      pointer.x = 0.5;
      pointer.y = 0.5;
    };
    target.addEventListener("pointermove", onMove);
    target.addEventListener("pointerenter", onEnter);
    target.addEventListener("pointerleave", onLeave);

    const onReduceChange = () => {
      if (reduce.matches) {
        pause();
        drawStill();
      } else {
        play();
      }
    };
    reduce.addEventListener("change", onReduceChange);

    // Refresh the still frame if the theme flips while paused/reduced.
    const themeObserver = new MutationObserver(() => {
      if (reduce.matches || !running) drawStill();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    measure();
    if (reduce.matches) drawStill();

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      reduce.removeEventListener("change", onReduceChange);
      document.removeEventListener("visibilitychange", onVisibility);
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerenter", onEnter);
      target.removeEventListener("pointerleave", onLeave);
    };
  }, [makeEngine]);

  return { canvasRef, pointerTargetRef };
}
