import { createFileRoute } from "@tanstack/react-router";

import { BLOG_POSTS } from "@/lib/blog";

// Generated rather than checked in, so a new entry in BLOG_POSTS shows up in
// Search Console without anyone remembering to update a static file.

const SITE = "https://www.boundlessintuition.com";

interface Entry {
  path: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: string;
  lastmod?: string;
}

function buildSitemap(): string {
  const entries: Entry[] = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/blog", changefreq: "weekly", priority: "0.8" },
    { path: "/legal", changefreq: "yearly", priority: "0.3" },
    // `/subscribed` and `/unsubscribed` are intentionally omitted - both are
    // already marked noindex in their own route heads.
    ...BLOG_POSTS.map(
      (post): Entry => ({
        path: `/blog/${post.slug}`,
        changefreq: "monthly",
        priority: "0.7",
        lastmod: post.date,
      }),
    ),
  ];

  const urls = entries
    .map((entry) => {
      const parts = [
        `    <loc>${SITE}${entry.path}</loc>`,
        entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>` : undefined,
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority}</priority>`,
      ].filter(Boolean);
      return `  <url>\n${parts.join("\n")}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
