import { createFileRoute } from "@tanstack/react-router";

const SITE = "https://www.boundlessintuition.com";

// Crawl everything except the engagement relay and the post-signup confirmation
// pages, which already carry noindex in their own route heads.
const BODY = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /subscribed
Disallow: /unsubscribed

Sitemap: ${SITE}/sitemap.xml
`;

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(BODY, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=86400",
          },
        }),
    },
  },
});
