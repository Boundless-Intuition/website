import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BlogChrome } from "@/components/blog/BlogChrome";
import { Markdown } from "@/components/blog/Markdown";
import { getPost, formatDate } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — Boundless Intuition` },
          { name: "description", content: loaderData.post.subtitle },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.subtitle },
          { property: "og:type", content: "article" },
        ]
      : [],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500&display=swap",
      },
    ],
  }),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();

  return (
    <BlogChrome>
      <article className="mx-auto w-full max-w-3xl px-6 pb-10 pt-10 md:px-10 md:pt-16">
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground fade-up"
        >
          <span aria-hidden>&larr;</span> All posts
        </Link>

        {/* Hero header */}
        <header className="mt-8 border-b border-border pb-10 fade-up delay-1">
          <div className="mb-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 text-[9px] uppercase tracking-widest text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1
            className="text-balance text-4xl leading-[1.08] tracking-tight md:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
            {post.subtitle}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="text-foreground/80">{post.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        {/* Body */}
        <div className="fade-up delay-2">
          <Markdown content={post.content} assetBase={post.assetBase} />
        </div>
      </article>
    </BlogChrome>
  );
}
