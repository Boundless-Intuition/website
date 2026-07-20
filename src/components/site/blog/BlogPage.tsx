import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BLOG_POSTS, BLOG_TAGS, formatBlogDate, type BlogTag } from "@/lib/blog";

const FILTERS: Array<"All" | BlogTag> = ["All", ...BLOG_TAGS];

export function BlogPage() {
  const [filter, setFilter] = useState<"All" | BlogTag>("All");

  const posts = useMemo(
    () => (filter === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.tag === filter)),
    [filter],
  );

  return (
    <>
      {/* -mt-16 pulls this under the transparent sticky header, matching
          the pattern used on the landing and legal pages. */}
      <section className="relative -mt-16 overflow-hidden border-b border-border">
        <div className="blueprint-grid absolute inset-0 opacity-100" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-16 lg:pt-32">
          <div className="mb-10 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-8 bg-foreground/40" />
            <span className="text-foreground/70">§ IX</span>
            <span className="text-muted-foreground/50">·</span>
            <span>Blog</span>
          </div>
          <h1 className="mb-6 max-w-[20ch] font-display text-[3rem] font-light leading-[1.02] tracking-[-0.03em] text-foreground md:text-[3.6rem]">
            Latest updates from Boundless Intuition.
          </h1>
          <p className="max-w-[58ch] text-[17px] leading-[1.6] text-foreground/85">
            Benchmarks, verification results, and the failures we found along
            the way - published as we finish a report, not on a schedule.
          </p>
        </div>
      </section>

      <div className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-6 py-5">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`border px-4 py-1.5 font-display text-[12px] font-medium transition-colors ${
                filter === f
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-16">
          {posts.length === 0 ? (
            <p className="py-16 text-center text-[15px] text-muted-foreground">
              No posts under &ldquo;{filter}&rdquo; yet.
            </p>
          ) : (
            <div className="divide-y divide-border border-t border-border">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group block py-10 first:pt-0"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-8">
                    <div className="flex-1">
                      <div className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        <span className="border border-border px-2 py-0.5 text-foreground/70">
                          {post.tag}
                        </span>
                        <span>{formatBlogDate(post.date)}</span>
                        <span className="text-muted-foreground/50">·</span>
                        <span>{post.readingTime}</span>
                      </div>
                      <h2 className="font-display text-[24px] font-medium leading-tight tracking-tight text-foreground transition-colors group-hover:text-accent md:text-[28px]">
                        {post.title}
                      </h2>
                      <p className="mt-3 max-w-[68ch] text-[15px] leading-relaxed text-muted-foreground">
                        {post.description}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-foreground">
                      Read →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
