import type { ComponentType } from "react";
import { FluentIsNotTheSameAsCorrect } from "@/components/site/blog/content/FluentIsNotTheSameAsCorrect";
import { ADiagnosisShouldBeAProof } from "@/components/site/blog/content/ADiagnosisShouldBeAProof";

export type BlogTag = "Announcements" | "Partnerships" | "Research";

// Every tag the filter bar shows, in display order - kept even when a tag
// currently has zero posts, so the filter surface doesn't grow later.
export const BLOG_TAGS: BlogTag[] = ["Announcements", "Partnerships", "Research"];

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tag: BlogTag;
  author: string;
  date: string; // ISO yyyy-mm-dd
  readingTime: string;
  Content: ComponentType;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "fluent-is-not-the-same-as-correct",
    title: "Fluent Is Not the Same as Correct",
    subtitle:
      "Stress-testing a proof-carrying verification architecture on a benchmark we didn't build, a domain we didn't design it for, and two frontier Claude models that land on the identical wrong dollar figure.",
    description:
      "Two frontier Claude models fail an independently authored airline fee benchmark on the same cases, landing on the same wrong dollar figure - and a proof-carrying kernel takes both to 100%.",
    tag: "Research",
    author: "Boundless Intuition Research",
    date: "2026-07-17",
    readingTime: "18 min read",
    Content: FluentIsNotTheSameAsCorrect,
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
    Content: ADiagnosisShouldBeAProof,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function formatBlogDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
