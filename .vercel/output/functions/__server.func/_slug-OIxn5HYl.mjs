import { f as lazyRouteComponent, j as notFound, p as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as getBlogPost } from "./_ssr/blog-CKUsRWAJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-OIxn5HYl.js
var $$splitComponentImporter = () => import("./_slug-B2uzA1L9.mjs");
var Route = createFileRoute("/blog/$slug")({
	loader: ({ params }) => {
		if (!getBlogPost(params.slug)) throw notFound();
	},
	head: ({ params }) => {
		const post = getBlogPost(params.slug);
		if (!post) return { meta: [{ title: "Blog - Boundless Intuition" }] };
		return { meta: [
			{ title: `${post.title} - Boundless Intuition` },
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
