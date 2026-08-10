import type { ComponentType } from "react";
import { FluencyIsNotCorrectness } from "@/components/site/blog/content/FluencyIsNotCorrectness";
import { TowardsVerifiedSupertechnology } from "@/components/site/blog/content/TowardsVerifiedSupertechnology";
import { APerfectScoreOnIMO2026 } from "@/components/site/blog/content/APerfectScoreOnIMO2026";
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
  /**
   * One or more tags, in BLOG_TAGS order. A post can belong to more than one:
   * the thesis is both the lab's position and the announcement of it, and the
   * filter bar matches on any of them.
   */
  tags: BlogTag[];
  author: string;
  date: string; // ISO yyyy-mm-dd
  readingTime: string;
  /** cover art under /public, shown on the index card and as the post hero */
  image?: string;
  Content: ComponentType;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "dirac-perfect-score-imo-2026",
    title: "Dirac Achieves a Perfect 6/6 on IMO 2026 at Record Speed",
    subtitle:
      "Our autonomous prover produced machine-checked proofs of every problem at this year's International Mathematical Olympiad.",
    description:
      "We ran Dirac, our autonomous proving agent, on the publicly released formalizations of all six IMO 2026 problems. It produced a machine-checked proof of every one, in 7h 18m of total proving time at a cost of $176.58.",
    tags: ["Announcements", "Research"],
    author: "Boundless Intuition Research",
    date: "2026-08-11",
    readingTime: "5 min read",
    image: "/blog/imo-hero.webp",
    Content: APerfectScoreOnIMO2026,
  },
  {
    slug: "towards-verified-superintelligence",
    title: "Towards Verified Superintelligence",
    subtitle:
      "Why the next breakthrough in AI is not bigger models, but verifiable intelligence.",
    description:
      "AI is becoming the operating system of the modern world, yet we have no reliable way to know whether an AI system is actually correct. Scaling intelligence without scaling trust is a dangerous trajectory.",
    tags: ["Announcements", "Research"],
    author: "Boundless Intuition Research",
    date: "2026-08-06",
    readingTime: "3 min read",
    image: "/blog/thesis-hero.webp",
    Content: TowardsVerifiedSupertechnology,
  },
  {
    slug: "fluency-is-not-correctness",
    title: "Fluency Is Not Correctness",
    subtitle:
      "Separating semantic parsing from deterministic execution in rule-governed reasoning.",
    description:
      "On RuleArena's airline domain, verification lifts two frontier Claude models from 54% and 61% to 100% while cutting cost roughly fourteenfold, and a verified budget model beats both unaided frontier models.",
    tags: ["Research"],
    author: "Boundless Intuition Research",
    date: "2026-07-17",
    readingTime: "12 min read",
    image: "/blog/fluent-hero.webp",
    Content: FluencyIsNotCorrectness,
  },
];

// Unpublished: "A Diagnosis Should Be a Proof, Not a Probability"
// (a-diagnosis-should-be-a-proof-not-a-probability), pulled 2026-08-11. Removing
// the entry is the whole of it — the index, the sitemap and /blog/$slug all read
// this list, so the post drops off the site and its URL now 404s. Nothing else
// was deleted: the body still lives at
// `src/components/site/blog/content/ADiagnosisShouldBeAProof.tsx` and its cover
// at `public/blog/diagnosis-hero.webp`, so republishing is re-adding the entry
// and its import.

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
