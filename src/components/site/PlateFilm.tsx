import { useEffect, useRef, useState, type CSSProperties } from "react";

type Variant = "desktop" | "mobile";

/**
 * A moving plate, laid over its own still and cross-faded in once it is really
 * playing — the clip's first frame *is* the poster, so the hand-off is invisible.
 * Same contract as HeroFilm, with two differences that come from living below
 * the fold rather than in the hero:
 *
 *  - the file is not even chosen until the section is within a viewport of the
 *    scroll position, so a visitor who never reaches it spends nothing;
 *  - playback is tied to visibility, so a loop nobody is looking at is not
 *    decoding frames in a background tab or three screens up the page.
 *
 * As in the hero, nothing is fetched during SSR or first paint, and a visitor
 * who has asked for less motion or is on a metered connection keeps the still.
 *
 * Expects `${base}.webm`, `${base}.mp4` and their `-mobile` pair in /public.
 */
export function PlateFilm({
  base,
  className = "",
  style,
}: {
  /** asset base path, e.g. "/lab-plate" */
  base: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [variant, setVariant] = useState<Variant | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Respect Data Saver / metered connections where the browser exposes it.
    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (conn?.saveData) return;

    const v = ref.current;
    if (!v) return;

    // The mobile file is the same frame at a smaller raster — the crop is done
    // in CSS by the caller — so the only question here is how many pixels are
    // worth sending. 639.98px keeps the breakpoint in step with the site's `sm`.
    const pick = () =>
      setVariant(
        window.matchMedia("(max-width: 639.98px)").matches
          ? "mobile"
          : "desktop",
      );

    if (typeof IntersectionObserver === "undefined") {
      pick();
      return;
    }

    // Armed on the idle callback rather than on mount, and only 40% of a
    // viewport early. Both numbers are about not competing with the hero: at a
    // full viewport of margin a 900px-tall desktop already has this section
    // inside the root on load, so the page fetched two films at once and the
    // one above the fold was the one that arrived late. Being a little late
    // here costs nothing — the still is the film's own first frame and the
    // hand-off is a 1.2s dissolve, so it reads as the picture warming up.
    let io: IntersectionObserver | null = null;
    const arm = () => {
      io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          io?.disconnect();
          pick();
        },
        { rootMargin: "40% 0px" },
      );
      io.observe(v);
    };
    // Feature-tested rather than assumed: the DOM lib declares it
    // unconditionally, but it only reached Safari in 16.4.
    let cancel: () => void;
    if (typeof window.requestIdleCallback === "function") {
      const h = window.requestIdleCallback(arm, { timeout: 2000 });
      cancel = () => window.cancelIdleCallback(h);
    } else {
      const h = window.setTimeout(arm, 600);
      cancel = () => window.clearTimeout(h);
    }

    return () => {
      cancel();
      io?.disconnect();
    };
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !variant) return;
    const src = variant === "mobile" ? `${base}-mobile` : base;

    // Order matters. Safari decides autoplay eligibility when the resource is
    // selected, so `muted` has to be true *before* src is assigned — React does
    // not reliably reflect the JSX attribute onto the element in time. Likewise
    // preload="none" is honoured strictly enough on iOS to stall a programmatic
    // play(), so it is lifted here rather than in the markup.
    v.muted = true;
    v.preload = "auto";

    // Assigning src (rather than rendering <source> children) keeps this to a
    // single request — React reconciling the children mid-load makes the
    // browser restart resource selection and fetch the file twice.
    //
    // Safari reports WebM as playable on devices where decoding then fails, so
    // canPlayType alone is not enough: fall back to H.264 once on error.
    const start = (file: string) => {
      v.src = file;
      // Autoplay can still be declined (iOS low-power mode); the still stays up.
      void v.play().catch(() => {});
    };
    const preferWebm = v.canPlayType('video/webm; codecs="vp9"') !== "";
    let usedFallback = false;
    const onError = () => {
      if (usedFallback) return;
      usedFallback = true;
      start(`${src}.mp4`);
    };
    v.addEventListener("error", onError);
    start(`${src}.${preferWebm ? "webm" : "mp4"}`);

    // Off-screen the loop is paused rather than left running: it is the same
    // decode cost as the hero's, but unlike the hero it can sit far outside the
    // viewport for the whole visit. Kept loose (10% visible) so a band that is
    // only half on screen still plays.
    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) void v.play().catch(() => {});
            else v.pause();
          }
        },
        { threshold: 0.1 },
      );
      io.observe(v);
    }

    return () => {
      v.removeEventListener("error", onError);
      io?.disconnect();
    };
  }, [base, variant]);

  return (
    <video
      ref={ref}
      className={`${className} transition-opacity duration-[1200ms] ease-out ${
        playing ? "opacity-100" : "opacity-0"
      }`}
      style={style}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      disablePictureInPicture
      aria-hidden
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
    />
  );
}
