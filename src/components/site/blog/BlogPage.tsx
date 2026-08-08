import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  BLOG_POSTS,
  BLOG_TAGS,
  formatBlogDate,
  type BlogTag,
} from "@/lib/blog";
import { BlogHeroBackdrop } from "@/components/site/domain-visuals/BlogVisual";

const FILTERS: Array<"All" | BlogTag> = ["All", ...BLOG_TAGS];

export function BlogPage() {
  const [filter, setFilter] = useState<"All" | BlogTag>("All");

  const posts = useMemo(
    () =>
      filter === "All"
        ? BLOG_POSTS
        : BLOG_POSTS.filter((p) => p.tags.includes(filter)),
    [filter],
  );

  return (
    <>
      {/* -mt-16 pulls this under the transparent sticky header, matching
          the pattern used on the landing and legal pages. */}
      <section className="relative -mt-16 overflow-hidden border-b border-border">
        {/* dithered pixel wave field — the cursor bends it like a gravity well */}
        <BlogHeroBackdrop />
        {/* legibility scrims — heavier on the left where the copy sits */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/85 via-background/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="pointer-events-none relative mx-auto max-w-shell px-6 lg:px-10 pt-24 pb-16 lg:pt-32">
          <div className="mb-10 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <span>Blog</span>
          </div>
          <h1 className="mb-6 max-w-[20ch] font-display text-[3rem] font-light leading-[1.02] tracking-[-0.03em] text-foreground md:text-[3.6rem]">
            Latest updates from Boundless Intuition Labs.
          </h1>
          <p className="max-w-[58ch] text-[17px] leading-[1.6] text-foreground/85">
            Benchmarks, verification results, and the failures we found along
            the way, published as we finish a report, not on a schedule.
          </p>
        </div>
      </section>

      <div className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-shell flex-wrap gap-2 px-6 lg:px-10 py-5">
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
        <div className="mx-auto max-w-shell px-6 lg:px-10 py-16">
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
                  className="group relative block overflow-hidden py-12"
                >
                  {/* cover art drifting behind the title; the scrim keeps the
                      copy side readable and lets the art breathe on the right */}
                  {post.image && (
                    <div
                      aria-hidden
                      className="absolute inset-0 overflow-hidden"
                    >
                      <img
                        src={post.image}
                        alt=""
                        loading="lazy"
                        className="blog-cover-img h-full w-full object-cover opacity-40 saturate-[0.85] transition-[opacity,filter] duration-700 group-hover:opacity-60 group-hover:saturate-110 dark:opacity-35 dark:group-hover:opacity-55"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/25" />
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/70 to-transparent" />
                    </div>
                  )}
                  <div className="relative flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-8">
                    <div className="flex-1">
                      {/* Same wrap as the post header: a two-tag card ran off
                          a phone screen. Tags hold the first line, the date and
                          reading time follow on the next. */}
                      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px] sm:tracking-[0.18em]">
                        <div className="flex w-full flex-wrap gap-2.5 sm:w-auto sm:gap-3">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="border border-border px-2 py-0.5 text-foreground/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
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
                    <span className="inline-flex shrink-0 items-center gap-2 self-start font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/80 [text-shadow:0_0_10px_var(--background),0_1px_16px_var(--background)] transition-colors group-hover:text-accent md:mr-6 md:self-auto">
                      Read
                      <span
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        →
                      </span>
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
