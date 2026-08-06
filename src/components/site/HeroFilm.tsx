import { useEffect, useRef, useState } from "react";

type Variant = "desktop" | "mobile";

/**
 * The moving hero plate. Sits on top of the still poster in Hero.tsx and
 * cross-fades in once it is actually playing — the clip's first frame *is* the
 * poster, so the hand-off is invisible.
 *
 * Nothing is fetched during SSR or first paint: the element gets no src until
 * after mount, and only for a visitor who wants motion and is not on a metered
 * connection. Everyone else keeps the still and spends zero extra bytes.
 *
 * The camera in the source is locked and only the water moves, so the file is a
 * crossfade loop: the build-up is trimmed off and the tail is dissolved back
 * onto the head, giving 5.6s that repeat without a cut.
 */
export function HeroFilm({ className = "" }: { className?: string }) {
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

    // 640, not 768: the mobile file is pre-cropped to a 52%-wide column of the
    // plate, and at 768px the hero goes short enough (750px) to need 58% of the
    // plate's width — more than that column holds. Above 640 the full-frame
    // desktop file covers the same box at a ~1.4x upscale anyway.
    setVariant(
      window.matchMedia("(max-width: 639.98px)").matches ? "mobile" : "desktop",
    );
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !variant) return;
    const base = variant === "mobile" ? "/hero-plate-mobile" : "/hero-plate";

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
      start(`${base}.mp4`);
    };
    v.addEventListener("error", onError);
    start(`${base}.${preferWebm ? "webm" : "mp4"}`);

    return () => v.removeEventListener("error", onError);
  }, [variant]);

  return (
    <video
      ref={ref}
      className={`${className} transition-opacity duration-[1200ms] ease-out ${
        playing ? "opacity-100" : "opacity-0"
      }`}
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
