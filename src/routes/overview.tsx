import { createFileRoute } from "@tanstack/react-router";
import { OverviewPage } from "@/components/site/overview/OverviewPage";

/**
 * /overview - the unlisted overview one-pager.
 *
 * Nothing on the site links here: it is not in TopBar, SiteFooter, or the blog
 * index, and it is not a blog post, so it never appears in BLOG_POSTS. The
 * robots meta below keeps it out of search results, which is what makes the
 * page effectively private - anyone with the URL can read it, and only people
 * given the URL will find it.
 */
export const Route = createFileRoute("/overview")({
  head: () => ({
    meta: [
      { title: "Boundless Intuition - Overview" },
      {
        name: "description",
        content:
          "Boundless Intuition builds the verification layer for AI - domains, benchmarks, and results.",
      },
      { name: "robots", content: "noindex, nofollow, noarchive" },
      { name: "googlebot", content: "noindex, nofollow" },
      { property: "og:title", content: "Boundless Intuition - Overview" },
      {
        property: "og:description",
        content:
          "The verification layer for AI: domains, benchmarks, and results.",
      },
      { property: "og:type", content: "article" },
    ],
  }),
  component: OverviewPage,
});
