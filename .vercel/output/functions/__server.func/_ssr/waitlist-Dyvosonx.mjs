import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { c as objectType, t as arrayType, u as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/waitlist-Dyvosonx.js
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
	topics: arrayType(stringType()).max(12).default([]),
	attribution: objectType({
		referrer: stringType().max(300).optional(),
		utm_source: stringType().max(100).optional(),
		utm_medium: stringType().max(100).optional(),
		utm_campaign: stringType().max(100).optional()
	}).optional()
});
/**
* Records a completed signup: a Vercel custom event and an ntfy alert.
*
* Deliberately server-side rather than fired from the browser. A signup is the
* highest-intent thing that happens on this site, and the client-side path is
* the unreliable one - `/_vercel/insights` is a common ad-blocker target, and
* a technical audience blocks it at a meaningful rate. Running it here also
* means the notification carries the request's geo headers.
*
* Never throws: reporting a signup must not fail the signup.
*/
async function announceSignup(status, attribution) {
	try {
		const [{ track }, { getRequest }, { sendNtfy, visitorContext }] = await Promise.all([
			import("../_libs/vercel__analytics.mjs").then((n) => n.t),
			import("./server-CR2rDZNb.mjs"),
			import("./ssr.mjs").then((n) => n.t)
		]);
		await track("waitlist_subscribed", {
			status,
			...attribution ?? {}
		});
		const { place, timezone, client } = visitorContext(getRequest());
		const campaign = [
			attribution?.utm_source,
			attribution?.utm_medium,
			attribution?.utm_campaign
		].filter(Boolean).join(" / ");
		const lines = [
			status === "already" ? "Already-subscribed address re-submitted" : "**New research-updates subscriber**",
			"",
			`**Where** ${place}${timezone ? ` (${timezone})` : ""}`
		];
		if (attribution?.referrer) lines.push(`**Referrer** ${attribution.referrer}`);
		if (campaign) lines.push(`**Campaign** ${campaign}`);
		lines.push(`**Client** ${client}`);
		await sendNtfy({
			title: `Subscriber — ${place}`,
			body: lines.join("\n"),
			priority: 4,
			tags: ["tada"]
		}, void 0);
	} catch (error) {
		console.warn("signup announcement failed", error);
	}
}
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
			metadata: {
				source: "website-waitlist",
				...data.attribution ?? {}
			}
		})
	});
	if (res.status === 201 || res.status === 200) {
		await announceSignup("subscribed", data.attribution);
		return {
			ok: true,
			status: "subscribed"
		};
	}
	const body = await res.text().catch(() => "");
	if (res.status === 400 && /already|exists|duplicate/i.test(body)) {
		await announceSignup("already", data.attribution);
		return {
			ok: true,
			status: "already"
		};
	}
	console.error(`Buttondown subscribe failed (${res.status}): ${body}`);
	return {
		ok: false,
		reason: "failed"
	};
});
//#endregion
export { subscribeToWaitlist_createServerFn_handler };
