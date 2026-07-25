import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { BLOG_POSTS, formatBlogDate, type BlogPost } from "@/lib/blog";
import { Prose } from "./prose";
import { TableOfContents } from "./TableOfContents";
import { ListenToArticle, ShareButton } from "./PostActions";

// The header dissolves into the article rather than ending on a rule: the
// artwork is masked to transparent at its lower edge so the page background
// takes over gradually.
const HERO_FADE =
  "linear-gradient(to bottom, black 0%, black 42%, rgba(0,0,0,0.55) 74%, transparent 100%)";

export function BlogPostPage({ post }: { post: BlogPost }) {
  const morePosts = BLOG_POSTS.filter((p) => p.slug !== post.slug);
  const { Content, heroImage } = post;
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <section className="relative -mt-16">
        <div className="relative overflow-hidden">
          <div className="blueprint-grid absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-4xl px-6 pt-24 pb-10 text-center lg:pt-32">
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
              <span className="border border-border px-2 py-0.5 text-foreground/70">
                {post.tag}
              </span>
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
                <ListenToArticle containerRef={contentRef} />
              </div>
              <ShareButton title={post.title} />
            </div>
          </div>
        </div>

        {heroImage && (
          <div className="relative mx-auto max-w-6xl px-6">
            <div
              className="overflow-hidden rounded-sm"
              style={{ maskImage: HERO_FADE, WebkitMaskImage: HERO_FADE }}
            >
              <picture>
                {heroImage.mobileSrc && (
                  <source media="(max-width: 768px)" srcSet={heroImage.mobileSrc} />
                )}
                <img
                  src={heroImage.src}
                  alt=""
                  className="h-[clamp(200px,34vw,420px)] w-full object-cover object-[62%_center] saturate-[0.92] dark:opacity-80 dark:saturate-[0.78]"
                />
              </picture>
            </div>
          </div>
        )}
      </section>

      <article className={`bg-background pb-16 md:pb-20 ${heroImage ? "pt-6" : "pt-16 md:pt-20"}`}>
        <div className="mx-auto flex max-w-6xl items-start gap-12 px-6">
          <TableOfContents containerRef={contentRef} />
          <div ref={contentRef} className="min-w-0 flex-1">
            <Prose>
              <Content />
            </Prose>
          </div>
        </div>
      </article>

      {morePosts.length > 0 && (
        <section className="border-t border-border bg-muted/20 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px w-8 bg-foreground/40" />
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
                  className="group flex flex-col gap-3 bg-background p-8 transition-colors hover:bg-muted/40 lg:p-10"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {p.tag} · {formatBlogDate(p.date)}
                  </span>
                  <h3 className="font-display text-[19px] font-medium tracking-tight text-foreground transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-muted-foreground">
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
