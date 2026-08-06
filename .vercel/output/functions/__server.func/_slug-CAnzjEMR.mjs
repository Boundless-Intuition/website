import { F as notFound, _ as createFileRoute, g as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as getBlogPost } from "./_ssr/blog-ByrEdZ1c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-CAnzjEMR.js
var $$splitComponentImporter = () => import("./_slug-CwC-oFby.mjs");
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
