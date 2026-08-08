import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  BLOG_POSTS,
  formatBlogDate,
  getNarration,
  type BlogPost,
} from "@/lib/blog";
import { Prose } from "./prose";
import { BlogHeroBackdrop } from "@/components/site/domain-visuals/BlogVisual";
import { TableOfContents } from "./TableOfContents";
import { ListenToArticle, ShareButton } from "./PostActions";
import { useReadProgress } from "@/lib/analytics";

export function BlogPostPage({ post }: { post: BlogPost }) {
  const morePosts = BLOG_POSTS.filter((p) => p.slug !== post.slug);
  const { Content } = post;
  const contentRef = useRef<HTMLDivElement>(null);

  // Depth is measured against the article body, so the footer and signup strip
  // below it don't count as "read".
  useReadProgress(post.slug, contentRef);

  return (
    <>
      <section className="relative -mt-16 overflow-hidden">
        {post.image ? (
          <div aria-hidden className="absolute inset-0">
            <img
              src={post.image}
              alt=""
              className="blog-cover-img h-full w-full object-cover opacity-95 dark:opacity-80"
            />
            {/* Light scrim for the centered copy */}
            <div className="absolute inset-0 bg-background/15 dark:bg-background/25" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background via-background/65 to-transparent" />
            {/* Gentle dissolve into the article below */}
            <div className="absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-background via-background/88 to-transparent" />
          </div>
        ) : (
          // No cover art: fall back to the house halftone plume, the same
          // masthead the blog index runs (docs/visual-system.md §12).
          <div aria-hidden className="absolute inset-0">
            <BlogHeroBackdrop />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background via-background/65 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-background via-background/88 to-transparent" />
          </div>
        )}
        <div className="relative mx-auto max-w-4xl px-6 pt-32 pb-24 text-center lg:pt-48">
          <div className="mb-8 flex items-center justify-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <Link
              to="/blog"
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              ← Blog
            </Link>
            <span className="text-muted-foreground/50">·</span>
            <span>{formatBlogDate(post.date)}</span>
            <span className="text-muted-foreground/50">·</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="border border-border px-2 py-0.5 text-foreground/70"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mx-auto max-w-[42ch] font-display text-[2.3rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground md:text-[3rem]">
            {post.title}
          </h1>
          <p className="mx-auto mt-6 max-w-[60ch] text-[17px] leading-[1.6] text-foreground/80">
            {post.subtitle}
          </p>
          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span>{post.author}</span>
            <span className="text-muted-foreground/50">·</span>
            <span>{post.readingTime}</span>
          </div>
          {/* The listen pill only mounts client-side; the flex slots keep
              Share anchored right either way. */}
          <div className="mx-auto mt-8 flex min-h-[2.6rem] max-w-lg items-center gap-4 border-t border-border pt-4">
            <div className="flex flex-1 justify-start">
              <ListenToArticle
                containerRef={contentRef}
                narration={getNarration(post.slug)}
                slug={post.slug}
              />
            </div>
            <ShareButton title={post.title} slug={post.slug} />
          </div>
        </div>
      </section>

      <article className="bg-background pt-6 pb-16 md:pb-20">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-[13rem_minmax(0,1fr)_13rem] lg:items-start lg:gap-8">
            <TableOfContents containerRef={contentRef} />
            {/* data-post-body is the handle scripts/narrate.ts scopes to when
                it pulls narration text out of the server-rendered HTML. */}
            <div
              ref={contentRef}
              data-post-body
              className="mx-auto w-full min-w-0 max-w-[70ch]"
            >
              <Prose>
                <Content />
              </Prose>
            </div>
            {/* mirrors the TOC column so the reading column sits dead
                center in the page rather than hugging the sidebar */}
            <div aria-hidden className="hidden lg:block" />
          </div>
        </div>
      </article>

      {/* Closing band - bookends the masthead, but cropped to the foot of the
          cover art rather than repeating the opening. Purely decorative, and it
          dissolves in and out again so what follows starts on clean
          background. */}
      {post.image && (
        <section
          aria-hidden
          className="relative mt-4 h-[180px] overflow-hidden md:h-[340px]"
        >
          <img
            src={post.image}
            alt=""
            loading="lazy"
            className="blog-cover-img h-full w-full object-cover object-bottom opacity-90 dark:opacity-70"
          />
          <div className="absolute inset-0 bg-background/25 dark:bg-background/35" />
          <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-background via-background/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </section>
      )}

      {morePosts.length > 0 && (
        <section className="border-t border-border bg-muted/20 py-16">
          <div className="mx-auto max-w-shell px-6 lg:px-10">
            <div className="mb-8 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <span>More from the lab</span>
            </div>
            <div
              className={`grid grid-cols-1 gap-px border border-border bg-border ${
                morePosts.length > 1 ? "md:grid-cols-2" : ""
              }`}
            >
              {morePosts.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group relative flex flex-col gap-3 overflow-hidden bg-background p-8 lg:p-10"
                >
                  {/* cover art drifting behind the card copy */}
                  {p.image && (
                    <div
                      aria-hidden
                      className="absolute inset-0 overflow-hidden"
                    >
                      <img
                        src={p.image}
                        alt=""
                        loading="lazy"
                        className="blog-cover-img h-full w-full object-cover opacity-30 saturate-[0.85] transition-[opacity,filter] duration-700 group-hover:opacity-50 group-hover:saturate-110 dark:opacity-25 dark:group-hover:opacity-45"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/35" />
                    </div>
                  )}
                  <span className="relative font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {p.tags.join(" · ")} · {formatBlogDate(p.date)}
                  </span>
                  <h3 className="relative font-display text-[19px] font-medium tracking-tight text-foreground transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                  <p className="relative text-[14px] leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
