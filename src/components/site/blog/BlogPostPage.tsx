import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { BLOG_POSTS, formatBlogDate, type BlogPost } from "@/lib/blog";
import { Prose } from "./prose";
import { TableOfContents } from "./TableOfContents";

export function BlogPostPage({ post }: { post: BlogPost }) {
  const morePosts = BLOG_POSTS.filter((p) => p.slug !== post.slug);
  const { Content } = post;
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <section className="relative -mt-16 overflow-hidden border-b border-border">
        <div className="blueprint-grid absolute inset-0 opacity-100" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-6 pt-24 pb-16 text-center lg:pt-32">
          <div className="mb-8 flex items-center justify-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <Link to="/blog" className="text-foreground/70 transition-colors hover:text-foreground">
              ← Blog
            </Link>
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
            <span>{formatBlogDate(post.date)}</span>
            <span className="text-muted-foreground/50">·</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </section>

      <article className="bg-background py-16 md:py-20">
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
