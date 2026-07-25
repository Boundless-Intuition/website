import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { Check, Link2, Pause, Play, RotateCcw, RotateCw } from "lucide-react";

const WORDS_PER_MINUTE = 175;
// Chrome truncates long utterances, so the article is queued as short
// sentence-sized chunks rather than one continuous string.
const MAX_CHUNK_CHARS = 180;
const SKIP_SECONDS = 15;
const RATES = [1, 1.25, 1.5, 2] as const;

function formatClock(seconds: number): string {
  const total = Math.max(0, Math.round(seconds));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

// Reads the prose only: headings and body paragraphs, skipping figures,
// tables, code, and collapsed asides, which do not narrate well.
function collectSpeakableText(root: HTMLElement): string {
  const nodes = Array.from(root.querySelectorAll<HTMLElement>("h2, h3, p"));
  return nodes
    .filter((el) => !el.closest("figure, table, pre, details"))
    .map((el) => el.textContent?.trim() ?? "")
    .filter(Boolean)
    .join(" ");
}

function splitIntoChunks(text: string): string[] {
  const sentences = text.match(/[^.!?]+[.!?]*\s*/g) ?? [text];
  const chunks: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    if (current && current.length + sentence.length > MAX_CHUNK_CHARS) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

export function ListenToArticle({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  const [supported, setSupported] = useState(false);
  const [status, setStatus] = useState<"idle" | "playing" | "paused">("idle");
  const [rateIndex, setRateIndex] = useState(0);
  // Real wall-clock seconds played so far, independent of rate; the baseline
  // (1x) position used for chunk lookups is derived as elapsed * rate.
  const [elapsed, setElapsed] = useState(0);
  const [totalBaseline, setTotalBaseline] = useState(0);

  const chunksRef = useRef<string[]>([]);
  const chunkStartsRef = useRef<number[]>([]);
  const indexRef = useRef(0);
  const rateRef = useRef<number>(RATES[0]);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const rate = RATES[rateIndex];

  useEffect(() => {
    rateRef.current = rate;
  }, [rate]);

  const stopTicking = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);

  const startTicking = useCallback(() => {
    stopTicking();
    tickRef.current = setInterval(() => {
      setElapsed((prev) => prev + 0.25);
    }, 250);
  }, [stopTicking]);

  // Held in a ref so the recursive onend handler always calls the latest
  // version rather than one closed over stale rate/status values.
  const speakFromRef = useRef<(index: number) => void>(() => {});
  speakFromRef.current = (index: number) => {
    const chunks = chunksRef.current;
    if (index >= chunks.length) {
      indexRef.current = 0;
      setElapsed(0);
      setStatus("idle");
      stopTicking();
      return;
    }
    indexRef.current = index;
    const utterance = new SpeechSynthesisUtterance(chunks[index]);
    utterance.rate = rateRef.current;
    utterance.onend = () => speakFromRef.current(index + 1);
    utterance.onerror = () => {
      setStatus("idle");
      stopTicking();
    };
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const root = containerRef.current;
    if (!root) return;

    const text = collectSpeakableText(root);
    if (!text) return;

    const chunks = splitIntoChunks(text);
    chunksRef.current = chunks;

    const starts: number[] = [];
    let acc = 0;
    for (const chunk of chunks) {
      starts.push(acc);
      acc += (wordCount(chunk) / WORDS_PER_MINUTE) * 60;
    }
    chunkStartsRef.current = starts;
    setTotalBaseline(acc);
    setSupported(true);

    return () => {
      window.speechSynthesis.cancel();
      stopTicking();
    };
  }, [containerRef, stopTicking]);

  const toggle = useCallback(() => {
    const synth = window.speechSynthesis;
    if (status === "playing") {
      synth.pause();
      setStatus("paused");
      stopTicking();
    } else if (status === "paused") {
      synth.resume();
      setStatus("playing");
      startTicking();
    } else {
      synth.cancel();
      setElapsed(0);
      setStatus("playing");
      startTicking();
      speakFromRef.current(0);
    }
  }, [status, startTicking, stopTicking]);

  const skip = useCallback(
    (deltaSeconds: number) => {
      if (status === "idle" || !chunkStartsRef.current.length) return;
      const currentRate = rateRef.current;
      const totalReal = totalBaseline / currentRate;
      const targetReal = Math.min(Math.max(elapsed + deltaSeconds, 0), totalReal);
      const targetBaseline = targetReal * currentRate;

      const starts = chunkStartsRef.current;
      let index = 0;
      for (let i = 0; i < starts.length; i++) {
        if (starts[i] <= targetBaseline) index = i;
        else break;
      }

      window.speechSynthesis.cancel();
      setElapsed(starts[index] / currentRate);
      speakFromRef.current(index);
      if (status === "paused") window.speechSynthesis.pause();
    },
    [status, elapsed, totalBaseline],
  );

  const cycleRate = useCallback(() => {
    if (status === "idle") {
      setRateIndex((prev) => (prev + 1) % RATES.length);
      return;
    }
    setRateIndex((prev) => {
      const next = (prev + 1) % RATES.length;
      rateRef.current = RATES[next];
      window.speechSynthesis.cancel();
      speakFromRef.current(indexRef.current);
      if (status === "paused") window.speechSynthesis.pause();
      return next;
    });
  }, [status]);

  if (!supported) return null;

  const playing = status === "playing";

  if (status === "idle") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label="Listen to article"
        className="group flex items-center gap-3 rounded-full border border-border px-4 py-2 transition-colors hover:bg-foreground/5"
      >
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-foreground text-background">
          <Play className="size-3 translate-x-px fill-current" />
        </span>
        <span className="font-display text-[13px] font-medium text-foreground">
          Listen to article
        </span>
        {totalBaseline > 0 && (
          <span className="font-mono text-[12px] tabular-nums text-muted-foreground">
            {formatClock(totalBaseline)}
          </span>
        )}
      </button>
    );
  }

  const progressPct =
    totalBaseline > 0 ? Math.min(100, ((elapsed * rate) / totalBaseline) * 100) : 0;

  return (
    <div className="relative flex w-full max-w-[19rem] items-center gap-1">
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause article narration" : "Resume article narration"}
        className="grid size-9 shrink-0 place-items-center rounded-full bg-foreground text-background transition-transform active:scale-95"
      >
        {playing ? (
          <Pause className="size-3.5 fill-current" />
        ) : (
          <Play className="size-3.5 translate-x-px fill-current" />
        )}
      </button>
      <span className="ml-2 w-[3ch] shrink-0 font-mono text-[13px] tabular-nums text-foreground/80">
        {formatClock(elapsed)}
      </span>
      <span className="mx-1 h-4 w-px shrink-0 bg-border" aria-hidden />
      <button
        type="button"
        onClick={() => skip(-SKIP_SECONDS)}
        aria-label={`Back ${SKIP_SECONDS} seconds`}
        className="relative grid size-7 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
      >
        <RotateCcw className="size-4" />
        <span className="pointer-events-none absolute font-mono text-[7px] font-bold leading-none">
          {SKIP_SECONDS}
        </span>
      </button>
      <button
        type="button"
        onClick={() => skip(SKIP_SECONDS)}
        aria-label={`Forward ${SKIP_SECONDS} seconds`}
        className="relative grid size-7 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
      >
        <RotateCw className="size-4" />
        <span className="pointer-events-none absolute font-mono text-[7px] font-bold leading-none">
          {SKIP_SECONDS}
        </span>
      </button>
      <button
        type="button"
        onClick={cycleRate}
        aria-label="Playback speed"
        className="ml-1 shrink-0 rounded-full border border-border px-2.5 py-1 font-mono text-[11px] font-medium text-foreground transition-colors hover:bg-foreground/5"
      >
        {rate}x
      </button>
      <div
        aria-hidden
        className="absolute inset-x-0 -bottom-2 h-0.5 overflow-hidden rounded-full bg-border/60"
      >
        <div
          className="h-full bg-accent transition-[width] duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </div>
  );
}

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const share = useCallback(async () => {
    // window.location.href reflects the live origin the page is served from
    // (localhost in dev, the real domain once deployed) - never hard-coded.
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Dismissed share sheets fall through to the clipboard copy below.
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [title]);

  return (
    <button
      type="button"
      onClick={share}
      className="flex items-center gap-2 rounded-full px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
    >
      {copied ? <Check className="size-3.5" /> : <Link2 className="size-3.5" />}
      <span className="font-display text-[13px] font-medium">
        {copied ? "Link copied" : "Share"}
      </span>
    </button>
  );
}
