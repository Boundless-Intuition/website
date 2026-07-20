import { createFileRoute, notFound } from "@tanstack/react-router";
import { TopBar } from "@/components/site/TopBar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BlogPostPage } from "@/components/site/blog/BlogPostPage";
import { getBlogPost } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    if (!getBlogPost(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) {
      return { meta: [{ title: "Blog - Boundless Intuition" }] };
    }
    return {
      meta: [
        { title: `${post.title} - Boundless Intuition` },
        { name: "description", content: post.description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: BlogPostRoute,
});

function BlogPostRoute() {
  const { slug } = Route.useParams();
  // The loader above guarantees this exists, or throws notFound().
  const post = getBlogPost(slug)!;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <main>
        <BlogPostPage post={post} />
      </main>
      <SiteFooter />
    </div>
  );
}
