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
        {/* cover art drifting behind the title */}
        {post.image && (
          <div aria-hidden className="absolute inset-0 overflow-hidden">
            <img
              src={post.image}
              alt=""
              className="blog-cover-img h-full w-full object-cover opacity-50 dark:opacity-45"
            />
            {/* even scrim for the centered copy, fading out at the edges */}
            <div className="absolute inset-0 bg-background/60 dark:bg-background/65" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
          </div>
        )}
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
                  className="group relative flex flex-col gap-3 overflow-hidden bg-background p-8 lg:p-10"
                >
                  {/* cover art drifting behind the card copy */}
                  {p.image && (
                    <div aria-hidden className="absolute inset-0 overflow-hidden">
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
                    {p.tag} · {formatBlogDate(p.date)}
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
