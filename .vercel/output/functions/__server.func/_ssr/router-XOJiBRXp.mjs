import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { n as Analytics } from "../_libs/vercel__analytics.mjs";
import { o as themeForPath, r as applyTheme, s as track$1, u as useVisitDigest } from "./theme-0hrIaw_O.mjs";
import { _ as createFileRoute, b as useRouter, d as HeadContent, f as useLocation, g as lazyRouteComponent, h as Outlet, m as createRouter, u as Scripts, v as createRootRouteWithContext, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as BLOG_POSTS } from "./blog-CYul9FM9.mjs";
import { t as Route$11 } from "../_slug-DcMhwCyE.mjs";
import { a as literalType, c as objectType, d as unionType, i as enumType, l as recordType, n as booleanType, o as nullType, r as discriminatedUnionType, s as numberType, t as arrayType, u as stringType } from "../_libs/zod.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as SpeedInsights } from "../_libs/vercel__speed-insights.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-XOJiBRXp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-5Dv2tZjO.css";
function NotFoundComponent() {
	(0, import_react.useEffect)(() => {
		track$1("page_not_found", { path: typeof window === "undefined" ? "" : window.location.pathname });
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		track$1("render_error", { message: error.message.slice(0, 200) });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$10 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Boundless Intuition · Foundational layer for Verified Intelligence" },
			{
				name: "description",
				content: "Boundless Intuition builds the foundational layer for verified intelligence, formalizing domain rules into machine-checkable form and proving every AI answer correct before it reaches production. Founded 2026 in Geneva by research software engineers from CERN."
			},
			{
				name: "author",
				content: "Boundless Intuition"
			},
			{
				property: "og:title",
				content: "Boundless Intuition · Foundational layer for Verified Intelligence"
			},
			{
				property: "og:description",
				content: "Machine-checkable verification for high-stakes AI. Every answer proved correct before it reaches production. Founded 2026 in Geneva by research software engineers from CERN."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:image",
				content: "https://www.boundlessintuition.com/og-image.jpg"
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				property: "og:image:alt",
				content: "\"Wandering the Immeasurable\" at CERN, engraved equations on steel"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: "https://www.boundlessintuition.com/og-image.jpg"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `(function(){try{var p=location.pathname;var blog=p==='/blog'||p.indexOf('/blog/')===0;var t=localStorage.getItem('bi-theme');if(!(blog&&t==='light'))document.documentElement.classList.add('dark');}catch(e){document.documentElement.classList.add('dark');}})();` } }),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Analytics, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeedInsights, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$10.useRouteContext();
	const pathname = useLocation({ select: (l) => l.pathname });
	useVisitDigest();
	(0, import_react.useEffect)(() => {
		applyTheme(themeForPath(pathname));
	}, [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$6 = () => import("./unsubscribed-Dngxr8ok.mjs");
var Route$9 = createFileRoute("/unsubscribed")({
	head: () => ({
		meta: [{ title: "Unsubscribed · Boundless Intuition" }, {
			name: "robots",
			content: "noindex, nofollow"
		}],
		links: [{
			rel: "stylesheet",
			href: "https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Shadows+Into+Light&display=swap"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./subscribed-C5SeB-fG.mjs");
var Route$8 = createFileRoute("/subscribed")({
	head: () => ({
		meta: [{ title: "You're in · Boundless Intuition" }, {
			name: "robots",
			content: "noindex, nofollow"
		}],
		links: [{
			rel: "stylesheet",
			href: "https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Shadows+Into+Light&display=swap"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var SITE = "https://www.boundlessintuition.com";
function buildSitemap() {
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
		{
			path: "/",
			changefreq: "weekly",
			priority: "1.0"
		},
		{
			path: "/engage",
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/blog",
			changefreq: "weekly",
			priority: "0.8"
		},
		{
			path: "/legal",
			changefreq: "yearly",
			priority: "0.3"
		},
		...BLOG_POSTS.map((post) => ({
			path: `/blog/${post.slug}`,
			changefreq: "monthly",
			priority: "0.7",
			lastmod: post.date
		}))
	].map((entry) => {
		return `  <url>\n${[
			`    <loc>${SITE}${entry.path}</loc>`,
			entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>` : void 0,
			`    <changefreq>${entry.changefreq}</changefreq>`,
			`    <priority>${entry.priority}</priority>`
		].filter(Boolean).join("\n")}\n  </url>`;
	}).join("\n")}
</urlset>
`;
}
var Route$7 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: () => new Response(buildSitemap(), { headers: {
	"content-type": "application/xml; charset=utf-8",
	"cache-control": "public, max-age=3600"
} }) } } });
var BODY = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /subscribed
Disallow: /unsubscribed

Sitemap: https://www.boundlessintuition.com/sitemap.xml
`;
var Route$6 = createFileRoute("/robots.txt")({ server: { handlers: { GET: () => new Response(BODY, { headers: {
	"content-type": "text/plain; charset=utf-8",
	"cache-control": "public, max-age=86400"
} }) } } });
var $$splitComponentImporter$4 = () => import("./overview-C6Z5F0pk.mjs");
/**
* /overview - the unlisted overview one-pager.
*
* Nothing on the site links here: it is not in TopBar, SiteFooter, or the blog
* index, and it is not a blog post, so it never appears in BLOG_POSTS. The
* robots meta below keeps it out of search results, which is what makes the
* page effectively private - anyone with the URL can read it, and only people
* given the URL will find it.
*/
var Route$5 = createFileRoute("/overview")({
	head: () => ({ meta: [
		{ title: "Boundless Intuition · Overview" },
		{
			name: "description",
			content: "Boundless Intuition builds the foundational layer for verified intelligence: domains, benchmarks, and results."
		},
		{
			name: "robots",
			content: "noindex, nofollow, noarchive"
		},
		{
			name: "googlebot",
			content: "noindex, nofollow"
		},
		{
			property: "og:title",
			content: "Boundless Intuition · Overview"
		},
		{
			property: "og:description",
			content: "The verification layer for AI: domains, benchmarks, and results."
		},
		{
			property: "og:type",
			content: "article"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./legal-y3YmtEFC.mjs");
var Route$4 = createFileRoute("/legal")({
	head: () => ({ meta: [{ title: "Legal · Boundless Intuition" }, {
		name: "description",
		content: "Terms of use and privacy notice for Boundless Intuition, the foundational layer for verified intelligence."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./engage-cxHTzSCc.mjs");
var Route$3 = createFileRoute("/engage")({
	head: () => ({ meta: [
		{ title: "Engage · Boundless Intuition" },
		{
			name: "description",
			content: "Bring us the rules that govern your domain, from standards to policies to regulations, and we build the verification layer that proves every decision conforms to them. Work with Boundless Intuition."
		},
		{
			property: "og:title",
			content: "Engage · Boundless Intuition"
		},
		{
			property: "og:description",
			content: "Bring us your rules. We make them machine-checkable and prove every change safe, continuously."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./routes-Cej-cAaA.mjs");
var Route$2 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./blog-C87IdkPR.mjs");
var Route$1 = createFileRoute("/blog/")({
	head: () => ({ meta: [
		{ title: "Blog · Boundless Intuition" },
		{
			name: "description",
			content: "Research, benchmarks, and verification results from Boundless Intuition, published as we finish a report, not on a schedule."
		},
		{
			property: "og:title",
			content: "Blog · Boundless Intuition"
		},
		{
			property: "og:description",
			content: "Research, benchmarks, and verification results from Boundless Intuition."
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var STR = stringType().max(200);
var ATTRIBUTION = {
	referrer: stringType().max(300).optional(),
	utm_source: stringType().max(100).optional(),
	utm_medium: stringType().max(100).optional(),
	utm_campaign: stringType().max(100).optional()
};
var PUSHED_EVENTS = [
	"engage_submitted",
	"contact_mailto",
	"render_error",
	"outbound_playground",
	"post_shared",
	"narration_play"
];
var ALERT_EVENTS = new Set(["engage_submitted", "contact_mailto"]);
var QUIET_EVENTS = new Set([
	"outbound_playground",
	"post_shared",
	"narration_play"
]);
var Payload = discriminatedUnionType("kind", [objectType({
	kind: literalType("event"),
	event: enumType(PUSHED_EVENTS),
	props: recordType(unionType([
		stringType().max(200),
		numberType(),
		booleanType(),
		nullType()
	])).default({}),
	path: STR,
	...ATTRIBUTION
}), objectType({
	kind: literalType("digest"),
	entryPath: STR,
	exitPath: STR,
	dwellSeconds: numberType().int().min(0).max(86400),
	sections: arrayType(stringType().max(40)).max(20),
	sectionsTotal: numberType().int().min(0).max(50),
	postProgress: recordType(numberType().min(0).max(100)),
	narrated: arrayType(stringType().max(120)).max(20),
	shared: arrayType(stringType().max(120)).max(20),
	notFound: arrayType(STR).max(20),
	...ATTRIBUTION
})]);
var WINDOW_MS = 300 * 1e3;
var MAX_PER_WINDOW = 40;
var hits = /* @__PURE__ */ new Map();
function rateLimited(ip) {
	const now = Date.now();
	const entry = hits.get(ip);
	if (!entry || now > entry.resetAt) {
		hits.set(ip, {
			count: 1,
			resetAt: now + WINDOW_MS
		});
		if (hits.size > 5e3) {
			for (const [key, value] of hits) if (now > value.resetAt) hits.delete(key);
		}
		return false;
	}
	entry.count += 1;
	return entry.count > MAX_PER_WINDOW;
}
function isSameOrigin(request) {
	const origin = request.headers.get("origin");
	if (!origin) return false;
	const host = request.headers.get("host");
	try {
		return new URL(origin).host === host;
	} catch {
		return false;
	}
}
function formatDwell(seconds) {
	if (seconds < 60) return `${seconds}s`;
	const m = Math.floor(seconds / 60);
	const s = seconds % 60;
	return s === 0 ? `${m}m` : `${m}m ${s}s`;
}
function attributionLines(data) {
	const lines = [];
	if (data.referrer) lines.push(`**Referrer** ${data.referrer}`);
	const campaign = [
		data.utm_source,
		data.utm_medium,
		data.utm_campaign
	].filter(Boolean).join(" / ");
	if (campaign) lines.push(`**Campaign** ${campaign}`);
	return lines;
}
function describeEvent(data) {
	const { event, props } = data;
	switch (event) {
		case "engage_submitted": return "Engage form submitted - their mail client is open";
		case "contact_mailto": return `Contact email opened (from ${props.from ?? "unknown"})`;
		case "render_error": return `Client render error: ${props.message ?? "unknown"}`;
		case "outbound_playground": return `Clicked through to the playground (from ${props.from ?? "unknown"})`;
		case "post_shared": return `Shared "${props.slug}" (${props.method})`;
		case "narration_play": return `Playing narration for "${props.slug}" (${props.source})`;
		default: return event;
	}
}
async function handle(request) {
	const ok = new Response(null, { status: 204 });
	try {
		if (!isSameOrigin(request)) return ok;
		const { isBotRequest, sendNtfy, visitorContext } = await import("./ssr.mjs").then((n) => n.t);
		if (isBotRequest(request)) return ok;
		if (rateLimited(request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown")) return ok;
		const raw = await request.json();
		const parsed = Payload.safeParse(raw);
		if (!parsed.success) return ok;
		const data = parsed.data;
		const { place, timezone, client } = visitorContext(request);
		if (data.kind === "event") {
			const alert = ALERT_EVENTS.has(data.event);
			const quiet = QUIET_EVENTS.has(data.event);
			const body = [
				describeEvent(data),
				"",
				`**Where** ${place}${timezone ? ` (${timezone})` : ""}`,
				`**Page** \`${data.path}\``,
				...attributionLines(data),
				`**Client** ${client}`
			].join("\n");
			await sendNtfy({
				title: alert ? `${place} — high intent` : place,
				body,
				priority: alert ? 4 : quiet ? 1 : 3,
				tags: alert ? ["tada"] : quiet ? ["speech_balloon"] : ["mag"],
				firehose: quiet
			}, void 0);
			return ok;
		}
		const lines = [];
		const path = data.entryPath === data.exitPath ? `\`${data.entryPath}\`` : `\`${data.entryPath}\` → \`${data.exitPath}\``;
		lines.push(`**Path** ${path}`);
		lines.push(...attributionLines(data));
		if (data.sections.length > 0) lines.push(`**Sections** ${data.sections.join(" → ")} (${data.sections.length}/${data.sectionsTotal})`);
		const reading = Object.entries(data.postProgress).map(([slug, pct]) => `${slug} ${pct}%`);
		if (reading.length > 0) lines.push(`**Blog** ${reading.join(", ")}`);
		if (data.narrated.length > 0) lines.push(`**Narration** ${data.narrated.join(", ")}`);
		if (data.shared.length > 0) lines.push(`**Shared** ${data.shared.join(", ")}`);
		if (data.notFound.length > 0) lines.push(`**404s** ${data.notFound.join(", ")}`);
		lines.push(`**Client** ${client}`);
		await sendNtfy({
			title: `Visit · ${place} · ${formatDwell(data.dwellSeconds)}`,
			body: lines.join("\n"),
			priority: 2,
			tags: ["footprints"],
			firehose: true
		}, void 0);
		return ok;
	} catch (error) {
		console.warn("signal relay failed", error);
		return ok;
	}
}
var Route = createFileRoute("/api/signal")({ server: { handlers: { POST: ({ request }) => handle(request) } } });
var UnsubscribedRoute = Route$9.update({
	id: "/unsubscribed",
	path: "/unsubscribed",
	getParentRoute: () => Route$10
});
var SubscribedRoute = Route$8.update({
	id: "/subscribed",
	path: "/subscribed",
	getParentRoute: () => Route$10
});
var SitemapDotxmlRoute = Route$7.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$10
});
var RobotsDottxtRoute = Route$6.update({
	id: "/robots.txt",
	path: "/robots.txt",
	getParentRoute: () => Route$10
});
var OverviewRoute = Route$5.update({
	id: "/overview",
	path: "/overview",
	getParentRoute: () => Route$10
});
var LegalRoute = Route$4.update({
	id: "/legal",
	path: "/legal",
	getParentRoute: () => Route$10
});
var EngageRoute = Route$3.update({
	id: "/engage",
	path: "/engage",
	getParentRoute: () => Route$10
});
var IndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$10
});
var BlogIndexRoute = Route$1.update({
	id: "/blog/",
	path: "/blog/",
	getParentRoute: () => Route$10
});
var BlogSlugRoute = Route$11.update({
	id: "/blog/$slug",
	path: "/blog/$slug",
	getParentRoute: () => Route$10
});
var rootRouteChildren = {
	IndexRoute,
	EngageRoute,
	LegalRoute,
	OverviewRoute,
	RobotsDottxtRoute,
	SitemapDotxmlRoute,
	SubscribedRoute,
	UnsubscribedRoute,
	ApiSignalRoute: Route.update({
		id: "/api/signal",
		path: "/api/signal",
		getParentRoute: () => Route$10
	}),
	BlogSlugRoute,
	BlogIndexRoute
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
