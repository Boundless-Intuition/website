import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { n as objectType, r as stringType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/waitlist-Bi-lE_my.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var SubscribeInput = objectType({
	email: stringType().email("That doesn't look like a valid email."),
	topics: arrayType(stringType()).max(12).default([])
});
var subscribeToWaitlist_createServerFn_handler = createServerRpc({
	id: "a09665e0a5ccb55e8be2ca52267403dc2b5094c9b6be00c64cbe098f9682d591",
	name: "subscribeToWaitlist",
	filename: "src/lib/waitlist.ts"
}, (opts) => subscribeToWaitlist.__executeServer(opts));
var subscribeToWaitlist = createServerFn({ method: "POST" }).validator(SubscribeInput).handler(subscribeToWaitlist_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.BUTTONDOWN_API_KEY;
	if (!apiKey) return {
		ok: false,
		reason: "unconfigured"
	};
	const res = await fetch("https://api.buttondown.email/v1/subscribers", {
		method: "POST",
		headers: {
			Authorization: `Token ${apiKey}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email_address: data.email,
			tags: data.topics,
			metadata: { source: "website-waitlist" }
		})
	});
	if (res.status === 201 || res.status === 200) return {
		ok: true,
		status: "subscribed"
	};
	const body = await res.text().catch(() => "");
	if (res.status === 400 && /already|exists|duplicate/i.test(body)) return {
		ok: true,
		status: "already"
	};
	console.error(`Buttondown subscribe failed (${res.status}): ${body}`);
	return {
		ok: false,
		reason: "failed"
	};
});
//#endregion
export { subscribeToWaitlist_createServerFn_handler };
