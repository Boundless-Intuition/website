import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/site/TopBar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BlogPage } from "@/components/site/blog/BlogPage";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog - Boundless Intuition" },
      {
        name: "description",
        content:
          "Research, benchmarks, and verification results from Boundless Intuition - published as we finish a report, not on a schedule.",
      },
      { property: "og:title", content: "Blog - Boundless Intuition" },
      {
        property: "og:description",
        content:
          "Research, benchmarks, and verification results from Boundless Intuition.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BlogIndexRoute,
});

function BlogIndexRoute() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <main>
        <BlogPage />
      </main>
      <SiteFooter />
    </div>
  );
}
