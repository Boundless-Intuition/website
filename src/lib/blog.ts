import proofCarryingDiagnosis from "@/content/blog/proof-carrying-diagnosis.md?raw";

export type BlogPost = {
  slug: string;
  title: string;
  /** One-line standfirst shown under the title. */
  subtitle: string;
  author: string;
  /** ISO date — used for sorting and <time>. */
  date: string;
  readingTime: string;
  tags: string[];
  /** Base path under /public that figure references are rewritten against. */
  assetBase: string;
  /** Raw markdown body, with the title/subtitle/byline header stripped. */
  content: string;
};

/**
 * The source markdown opens with a metadata header we render as a styled hero
 * instead of as body copy:
 *
 *   # Title
 *   ### Subtitle
 *   *Author*
 *   ---
 *
 * Strip everything up to and including that first horizontal rule so the body
 * starts at the first real section.
 */
function stripFrontMatter(raw: string): string {
  const marker = raw.indexOf("\n---");
  if (marker === -1) return raw.trim();
  const afterRule = raw.indexOf("\n", marker + 1);
  return raw.slice(afterRule + 1).trim();
}

export const posts: BlogPost[] = [
  {
    slug: "a-diagnosis-should-be-a-proof-not-a-probability",
    title: "A Diagnosis Should Be a Proof, Not a Probability",
    subtitle:
      "Formalizing the lupus classification criteria in Lean 4, and a 50-case benchmark against a frontier model.",
    author: "Boundless Intuition Research",
    date: "2026-06-25",
    readingTime: "12 min read",
    tags: ["Formal Verification", "Clinical AI", "Lean 4"],
    assetBase: "/blog/a-diagnosis-should-be-a-proof-not-a-probability",
    content: stripFrontMatter(proofCarryingDiagnosis),
  },
];

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
