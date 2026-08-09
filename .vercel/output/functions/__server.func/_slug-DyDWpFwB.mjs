import { A as notFound, f as lazyRouteComponent, p as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as getBlogPost } from "./_ssr/blog-B-0C1v-U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DyDWpFwB.js
var $$splitComponentImporter = () => import("./_slug-CzyI4Fk6.mjs");
var Route = createFileRoute("/blog/$slug")({
	loader: ({ params }) => {
		if (!getBlogPost(params.slug)) throw notFound();
	},
	head: ({ params }) => {
		const post = getBlogPost(params.slug);
		if (!post) return { meta: [{ title: "Blog · Boundless Intuition" }] };
		return { meta: [
			{ title: `${post.title} · Boundless Intuition` },
			{
				name: "description",
				content: post.description
			},
			{
				property: "og:title",
				content: post.title
			},
			{
				property: "og:description",
				content: post.description
			},
			{
				property: "og:type",
				content: "article"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
