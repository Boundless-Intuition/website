//#region node_modules/.nitro/vite/services/ssr/index.js
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
var SEEN_COOKIE = "bi_seen";
var SEEN_MAX_AGE_SECONDS = 3600 * 24 * 30;
var BOT_UA = /bot|crawl|spider|slurp|preview|scan|monitor|lighthouse|pagespeed|headless|curl|wget|python-requests|node-fetch|go-http-client|vercel-screenshot/i;
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
/** True for a real person's first full-page visit: GET for HTML, non-bot UA, no seen-cookie. */
function isFirstDocumentVisit(request) {
	if (request.method !== "GET") return false;
	if (!(request.headers.get("accept") ?? "").includes("text/html")) return false;
	const ua = request.headers.get("user-agent") ?? "";
	if (!ua || BOT_UA.test(ua)) return false;
	return !(request.headers.get("cookie") ?? "").includes(`${SEEN_COOKIE}=`);
}
/** Returns a copy of the response with the dedupe cookie appended. */
function withSeenCookie(response) {
	const res = new Response(response.body, response);
	res.headers.append("set-cookie", `${SEEN_COOKIE}=1; Max-Age=${SEEN_MAX_AGE_SECONDS}; Path=/; SameSite=Lax; HttpOnly; Secure`);
	return res;
}
/** Fire the ntfy.sh notification. Never throws - a failed ping must not break the page. */
async function notifyVisit(request, env) {
	const topic = getEnv(env, "NTFY_TOPIC");
	if (!topic) return;
	const server = getEnv(env, "NTFY_SERVER") ?? "https://ntfy.sh";
	const url = new URL(request.url);
	const city = geoHeader(request, "x-vercel-ip-city") ?? "Unknown city";
	const region = geoHeader(request, "x-vercel-ip-country-region");
	const country = request.headers.get("x-vercel-ip-country") ?? "?";
	const referrer = request.headers.get("referer") ?? "direct";
	const ua = request.headers.get("user-agent") ?? "";
	const body = [
		`Page: ${url.pathname}`,
		`From: ${[
			city,
			region,
			country
		].filter(Boolean).join(", ")}`,
		`Referrer: ${referrer}`,
		`UA: ${ua.slice(0, 140)}`
	].join("\n");
	try {
		await fetch(`${server}/${encodeURIComponent(topic)}`, {
			method: "POST",
			headers: {
				Title: `New visitor: ${city}, ${country}`,
				Tags: "eyes"
			},
			body,
			signal: AbortSignal.timeout(2e3)
		});
	} catch (error) {
		console.warn("ntfy visit notification failed", error);
	}
}
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-MPOC9CTv.mjs").then((m) => m.default ?? m);
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
export { server_default as default, renderErrorPage as t };
