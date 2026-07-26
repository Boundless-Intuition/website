import type { ComponentType } from "react";
import { FluencyIsNotCorrectness } from "@/components/site/blog/content/FluencyIsNotCorrectness";
import { ADiagnosisShouldBeAProof } from "@/components/site/blog/content/ADiagnosisShouldBeAProof";
import narrationManifest from "@/content/blog/narration.json";

export type BlogTag = "Announcements" | "Partnerships" | "Research";

// Every tag the filter bar shows, in display order - kept even when a tag
// currently has zero posts, so the filter surface doesn't grow later.
export const BLOG_TAGS: BlogTag[] = [
  "Announcements",
  "Partnerships",
  "Research",
];

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tag: BlogTag;
  author: string;
  date: string; // ISO yyyy-mm-dd
  readingTime: string;
  /** cover art under /public, shown on the index card and as the post hero */
  image?: string;
  Content: ComponentType;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "fluency-is-not-correctness",
    title: "Fluency Is Not Correctness",
    subtitle:
      "Separating semantic parsing from deterministic execution in rule-governed reasoning.",
    description:
      "On RuleArena's airline domain, verification lifts two frontier Claude models from 54% and 61% to 100% while cutting cost roughly fourteenfold - and a verified budget model beats both unaided frontier models.",
    tag: "Research",
    author: "Boundless Intuition Research",
    date: "2026-07-17",
    readingTime: "12 min read",
    image: "/blog/fluent-hero.webp",
    Content: FluencyIsNotCorrectness,
  },
  {
    slug: "a-diagnosis-should-be-a-proof-not-a-probability",
    title: "A Diagnosis Should Be a Proof, Not a Probability",
    subtitle:
      "Formalizing the lupus classification criteria in Lean 4, and a 50-case benchmark against a frontier model.",
    description:
      "A frontier model gave five different diagnoses to the same patient, five times. We built a clinical classifier whose verdicts are proven in Lean 4, not sampled, and benchmarked it head-to-head.",
    tag: "Research",
    author: "Boundless Intuition Research",
    date: "2026-06-19",
    readingTime: "15 min read",
    image: "/blog/diagnosis-hero.webp",
    Content: ADiagnosisShouldBeAProof,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export interface Narration {
  /** pre-rendered MP3 under /public */
  audio: string;
  /** length in seconds at 1x, measured by ffprobe when the file was written */
  duration: number;
}

/**
 * Pre-rendered narration for a post, if one has been generated.
 *
 * The manifest is written by `bun run narrate` (see `scripts/README.md`), which
 * drives a local Voicebox instance - nothing is synthesised at request time.
 * A post with no entry falls back to the browser's own speech synthesis.
 */
export function getNarration(slug: string): Narration | undefined {
  const entry = (narrationManifest as Record<string, Narration | undefined>)[
    slug
  ];
  return entry?.audio && entry.duration > 0 ? entry : undefined;
}

export function formatBlogDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
