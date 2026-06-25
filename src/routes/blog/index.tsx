import { createFileRoute, Link } from "@tanstack/react-router";
import { BlogChrome } from "@/components/blog/BlogChrome";
import { getAllPosts, formatDate } from "@/lib/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Boundless Intuition" },
      {
        name: "description",
        content:
          "Research notes from Boundless Intuition — on verifiable AI, formal methods, and intuition.",
      },
      { property: "og:title", content: "Boundless Intuition — Blog" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500&display=swap",
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const posts = getAllPosts();

  return (
    <BlogChrome>
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        {/* Hero */}
        <div className="border-b border-border py-16 fade-up md:py-20">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Writing</p>
          <h1
            className="mt-4 text-balance text-5xl leading-[1.05] tracking-tight md:text-7xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Blog
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Research notes on verifiable intelligence — where intuition meets proof.
          </p>
        </div>

        {/* Post list */}
        <ul className="divide-y divide-border">
          {posts.map((post, i) => (
            <li key={post.slug} className={`fade-up delay-${Math.min(i + 1, 3)}`}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group grid grid-cols-1 gap-4 py-10 transition-opacity md:grid-cols-[8rem_1fr] md:gap-10"
              >
                <div className="flex flex-col gap-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>{post.readingTime}</span>
                </div>
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-2.5 py-0.5 text-[9px] uppercase tracking-widest text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2
                    className="text-balance text-2xl leading-tight tracking-tight transition-colors group-hover:text-foreground md:text-3xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    {post.subtitle}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-foreground/70 transition-colors group-hover:text-foreground">
                    Read
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </BlogChrome>
  );
}
