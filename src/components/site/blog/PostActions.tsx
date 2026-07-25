import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { Check, Link2, Pause, Play } from "lucide-react";

const WORDS_PER_MINUTE = 175;
// Chrome truncates long utterances, so the article is queued as short
// sentence-sized chunks rather than one continuous string.
const MAX_CHUNK_CHARS = 180;

function formatClock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
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
  const [duration, setDuration] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const chunksRef = useRef<string[]>([]);
  const indexRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const root = containerRef.current;
    if (!root) return;

    const text = collectSpeakableText(root);
    if (!text) return;

    chunksRef.current = splitIntoChunks(text);
    setDuration((text.split(/\s+/).length / WORDS_PER_MINUTE) * 60);
    setSupported(true);

    return () => window.speechSynthesis.cancel();
  }, [containerRef]);

  const speakFrom = useCallback((index: number) => {
    const chunks = chunksRef.current;
    if (index >= chunks.length) {
      indexRef.current = 0;
      setProgress(0);
      setStatus("idle");
      return;
    }
    indexRef.current = index;
    setProgress(index / chunks.length);

    const utterance = new SpeechSynthesisUtterance(chunks[index]);
    utterance.rate = 1;
    utterance.onend = () => speakFrom(index + 1);
    utterance.onerror = () => setStatus("idle");
    window.speechSynthesis.speak(utterance);
  }, []);

  const toggle = useCallback(() => {
    const synth = window.speechSynthesis;
    if (status === "playing") {
      synth.pause();
      setStatus("paused");
    } else if (status === "paused") {
      synth.resume();
      setStatus("playing");
    } else {
      synth.cancel();
      setStatus("playing");
      speakFrom(0);
    }
  }, [status, speakFrom]);

  if (!supported) return null;

  const playing = status === "playing";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pause article narration" : "Listen to article"}
      className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-border px-4 py-2 transition-colors hover:bg-foreground/5"
    >
      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-foreground text-background">
        {playing ? (
          <Pause className="size-3 fill-current" />
        ) : (
          <Play className="size-3 translate-x-px fill-current" />
        )}
      </span>
      <span className="font-display text-[13px] font-medium text-foreground">
        {status === "idle" ? "Listen to article" : playing ? "Pause" : "Resume"}
      </span>
      {duration !== null && (
        <span className="font-mono text-[12px] tabular-nums text-muted-foreground">
          {formatClock(duration)}
        </span>
      )}
      {status !== "idle" && (
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent transition-transform duration-500"
          style={{ transform: `scaleX(${progress})` }}
        />
      )}
    </button>
  );
}

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const share = useCallback(async () => {
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
