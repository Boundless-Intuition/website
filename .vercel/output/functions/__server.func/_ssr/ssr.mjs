import { t as isbot } from "../_libs/isbot.mjs";
//#region node_modules/.nitro/vite/services/ssr/index.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var lastCapturedError;
var TTL_MS = 5e3;
function record(error) {
	lastCapturedError = {
		error,
		at: Date.now()
	};
}
if (typeof globalThis.addEventListener === "function") {
	globalThis.addEventListener("error", (event) => record(event.error ?? event));
	globalThis.addEventListener("unhandledrejection", (event) => record(event.reason));
}
function consumeLastCapturedError() {
	if (!lastCapturedError) return void 0;
	if (Date.now() - lastCapturedError.at > TTL_MS) {
		lastCapturedError = void 0;
		return;
	}
	const { error } = lastCapturedError;
	lastCapturedError = void 0;
	return error;
}
function renderErrorPage() {
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
var visit_notify_server_exports = /* @__PURE__ */ __exportAll({
	isBotRequest: () => isBotRequest,
	isFirstDocumentVisit: () => isFirstDocumentVisit,
	notifyVisit: () => notifyVisit,
	sendNtfy: () => sendNtfy,
	visitorContext: () => visitorContext,
	withSeenCookie: () => withSeenCookie
});
var SEEN_COOKIE = "bi_seen";
var SEEN_MAX_AGE_SECONDS = 3600 * 24 * 30;
/** ntfy treats bodies over 4096 bytes as attachments; stay well clear. */
var MAX_BODY = 3500;
function getEnv(env, key) {
	const binding = env?.[key];
	if (typeof binding === "string" && binding.length > 0) return binding;
	const fromProcess = typeof process !== "undefined" ? process.env?.[key] : void 0;
	return fromProcess && fromProcess.length > 0 ? fromProcess : void 0;
}
function geoHeader(request, name) {
	const value = request.headers.get(name);
	if (!value) return void 0;
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}
/** True when the request comes from a crawler, scraper or uptime monitor. */
function isBotRequest(request) {
	const ua = request.headers.get("user-agent");
	return !ua || isbot(ua);
}
/** Coarse device/OS/browser, rather than dumping a raw user-agent string. */
function describeClient(ua) {
	if (!ua) return "unknown client";
	return `${/Windows/.test(ua) ? "Windows" : /iPhone|iPad|iPod/.test(ua) ? "iOS" : /Mac OS X/.test(ua) ? "macOS" : /Android/.test(ua) ? "Android" : /Linux/.test(ua) ? "Linux" : "unknown OS"} · ${/Edg\//.test(ua) ? "Edge" : /OPR\//.test(ua) ? "Opera" : /Firefox\//.test(ua) ? "Firefox" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : "unknown browser"} · ${/Mobile|iPhone|iPod|Android.*Mobile/.test(ua) ? "mobile" : /iPad|Tablet/.test(ua) ? "tablet" : "desktop"}`;
}
/** Everything Vercel's edge already knows about the requester, formatted. */
function visitorContext(request) {
	const city = geoHeader(request, "x-vercel-ip-city");
	const region = geoHeader(request, "x-vercel-ip-country-region");
	const country = request.headers.get("x-vercel-ip-country");
	const continent = request.headers.get("x-vercel-ip-continent");
	return {
		place: [
			city,
			region,
			country
		].filter(Boolean).join(", ") || continent || "unknown location",
		timezone: request.headers.get("x-vercel-ip-timezone") ?? void 0,
		client: describeClient(request.headers.get("user-agent") ?? "")
	};
}
/**
* Publish one notification. Never throws and never rejects - a failed ping must
* not break a page render or a form submission.
*
* Uses ntfy's JSON publishing format rather than its `Title`/`Priority` headers.
* HTTP header values are ByteStrings, so a header-based title throws outright on
* any character above U+00FF and silently mangles Latin-1 ones - which for us
* means every em dash, and every visitor from Zürich or São Paulo. The JSON body
* is UTF-8 and has neither problem.
*/
async function sendNtfy(message, env) {
	const main = getEnv(env, "NTFY_TOPIC");
	if (!main) return;
	const topic = message.firehose ? getEnv(env, "NTFY_TOPIC_FIREHOSE") ?? main : main;
	const server = getEnv(env, "NTFY_SERVER") ?? "https://ntfy.sh";
	const token = getEnv(env, "NTFY_TOKEN");
	const headers = { "Content-Type": "application/json" };
	if (token) headers.Authorization = `Bearer ${token}`;
	try {
		await fetch(server, {
			method: "POST",
			headers,
			body: JSON.stringify({
				topic,
				title: message.title.slice(0, 200),
				message: message.body.slice(0, MAX_BODY),
				priority: message.priority ?? 3,
				tags: message.tags ?? [],
				markdown: true
			}),
			signal: AbortSignal.timeout(2e3)
		});
	} catch (error) {
		console.warn("ntfy notification failed", error);
	}
}
/** True for a real person's first full-page visit: GET for HTML, non-bot UA, no seen-cookie. */
function isFirstDocumentVisit(request) {
	if (request.method !== "GET") return false;
	if (!(request.headers.get("accept") ?? "").includes("text/html")) return false;
	if (isBotRequest(request)) return false;
	return !(request.headers.get("cookie") ?? "").includes(`${SEEN_COOKIE}=`);
}
/** Returns a copy of the response with the dedupe cookie appended. */
function withSeenCookie(response) {
	const res = new Response(response.body, response);
	res.headers.append("set-cookie", `${SEEN_COOKIE}=1; Max-Age=${SEEN_MAX_AGE_SECONDS}; Path=/; SameSite=Lax; HttpOnly; Secure`);
	return res;
}
/**
* Fire the arrival notification. Deliberately quiet: at this point we know only
* that someone showed up. The end-of-visit digest sent from `/api/signal` is the
* one that carries what they actually did, so this is really just the fallback
* for visitors whose closing beacon never fires.
*/
async function notifyVisit(request, env) {
	const url = new URL(request.url);
	const { place, timezone, client } = visitorContext(request);
	const referrer = request.headers.get("referer") ?? "direct";
	const body = [
		`**Landed on** \`${url.pathname}\``,
		`**From** ${place}${timezone ? ` (${timezone})` : ""}`,
		`**Referrer** ${referrer}`,
		`**Client** ${client}`
	].join("\n");
	await sendNtfy({
		title: `Arrival: ${place}`,
		body,
		priority: 1,
		tags: ["eyes"],
		firehose: true
	}, env);
}
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-DNBARj35.mjs").then((m) => m.default ?? m);
	return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
	if (response.status < 500) return response;
	if (!(response.headers.get("content-type") ?? "").includes("application/json")) return response;
	const body = await response.clone().text();
	if (!isH3SwallowedErrorBody(body)) return response;
	console.error(consumeLastCapturedError() ?? /* @__PURE__ */ new Error(`h3 swallowed SSR error: ${body}`));
	return new Response(renderErrorPage(), {
		status: 500,
		headers: { "content-type": "text/html; charset=utf-8" }
	});
}
function isH3SwallowedErrorBody(body) {
	try {
		const payload = JSON.parse(body);
		return payload.unhandled === true && payload.message === "HTTPError";
	} catch {
		return false;
	}
}
var server_default = { async fetch(request, env, ctx) {
	try {
		let normalized = await normalizeCatastrophicSsrResponse(await (await getServerEntry()).fetch(request, env, ctx));
		if (normalized.ok && isFirstDocumentVisit(request)) {
			const notification = notifyVisit(request, env);
			const waitUntil = ctx?.waitUntil;
			if (typeof waitUntil === "function") waitUntil.call(ctx, notification);
			else await notification;
			normalized = withSeenCookie(normalized);
		}
		return normalized;
	} catch (error) {
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
} };
//#endregion
export { server_default as default, renderErrorPage as n, visit_notify_server_exports as t };
