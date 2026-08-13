//#region node_modules/.nitro/vite/services/ssr/assets/network.server-Dx2p6qNs.js
function header(request, name) {
	const value = request.headers.get(name);
	if (!value) return void 0;
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}
var IP_HEADERS = [
	"x-vercel-forwarded-for",
	"x-real-ip",
	"cf-connecting-ip",
	"x-forwarded-for"
];
function parseChain(value) {
	if (!value) return [];
	return value.split(",").map((part) => part.trim()).filter(Boolean);
}
function resolveIp(request) {
	const forwardedChain = parseChain(request.headers.get("x-forwarded-for") ?? void 0);
	for (const name of IP_HEADERS) {
		const raw = request.headers.get(name);
		if (!raw) continue;
		const first = parseChain(raw)[0];
		if (first) return {
			ip: first,
			ipSource: name,
			forwardedChain
		};
	}
	return {
		ip: "unknown",
		ipSource: "none",
		forwardedChain
	};
}
function resolveGeo(request) {
	const city = header(request, "x-vercel-ip-city");
	const region = header(request, "x-vercel-ip-country-region");
	const country = header(request, "x-vercel-ip-country");
	const continent = header(request, "x-vercel-ip-continent");
	return {
		city,
		region,
		country,
		continent,
		latitude: header(request, "x-vercel-ip-latitude"),
		longitude: header(request, "x-vercel-ip-longitude"),
		timezone: header(request, "x-vercel-ip-timezone"),
		place: [
			city,
			region,
			country
		].filter(Boolean).join(", ") || continent || "unknown location"
	};
}
var BROWSERS = [
	["Edge", /Edg(?:e|A|iOS)?\/([\d.]+)/],
	["Opera", /OPR\/([\d.]+)/],
	["Samsung Internet", /SamsungBrowser\/([\d.]+)/],
	["Firefox", /(?:Firefox|FxiOS)\/([\d.]+)/],
	["Chrome", /(?:Chrome|CriOS)\/([\d.]+)/],
	["Safari", /Version\/([\d.]+).*Safari/]
];
var OSES = [
	["iOS", /(?:iPhone )?OS ([\d_]+)/],
	["macOS", /Mac OS X ([\d_]+)/],
	["Android", /Android ([\d.]+)/],
	["Windows", /Windows NT ([\d.]+)/],
	["ChromeOS", /CrOS \w+ ([\d.]+)/],
	["Linux", /(Linux)/]
];
var WINDOWS_NAMES = {
	"10.0": "10/11",
	"6.3": "8.1",
	"6.2": "8",
	"6.1": "7"
};
function matchTable(ua, table) {
	for (const [name, pattern] of table) {
		const found = pattern.exec(ua);
		if (found) return {
			name,
			version: (found[1] ?? "").replace(/_/g, ".")
		};
	}
	return {
		name: "unknown",
		version: ""
	};
}
/** Device model, where the UA carries one. Android and Samsung are the useful cases. */
function deviceModel(ua) {
	if (/iPhone/.test(ua)) return "iPhone";
	if (/iPad/.test(ua)) return "iPad";
	const android = /Android [\d.]+;\s*([^;)]+?)(?:\s+Build|[;)])/.exec(ua);
	if (android) return android[1].trim();
	return "unknown";
}
function resolveAgent(request) {
	const raw = request.headers.get("user-agent") ?? "";
	const browser = matchTable(raw, BROWSERS);
	const os = matchTable(raw, OSES);
	const osVersion = os.name === "Windows" ? WINDOWS_NAMES[os.version] ?? os.version : os.version;
	const engine = /Gecko\/|rv:/.test(raw) ? "Gecko" : /AppleWebKit/.test(raw) ? /Chrome|Edg|OPR/.test(raw) ? "Blink" : "WebKit" : "unknown";
	const form = /iPad|Tablet/.test(raw) ? "tablet" : /Mobile|iPhone|iPod/.test(raw) ? "mobile" : raw ? "desktop" : "unknown";
	const hintedPlatform = header(request, "sec-ch-ua-platform")?.replace(/"/g, "");
	const hintedMobileRaw = request.headers.get("sec-ch-ua-mobile");
	const hintedModel = header(request, "sec-ch-ua-model")?.replace(/"/g, "");
	return {
		raw,
		browser: browser.name,
		browserVersion: browser.version,
		engine,
		os: os.name,
		osVersion,
		device: hintedModel || deviceModel(raw),
		form,
		hintedPlatform: hintedPlatform || void 0,
		hintedMobile: hintedMobileRaw ? hintedMobileRaw === "?1" : void 0,
		hintedModel: hintedModel || void 0
	};
}
function networkContext(request) {
	const { ip, ipSource, forwardedChain } = resolveIp(request);
	return {
		ip,
		ipSource,
		forwardedChain,
		geo: resolveGeo(request),
		agent: resolveAgent(request),
		asn: request.headers.get("x-vercel-ip-as-number") ?? void 0,
		asOrg: header(request, "x-vercel-ip-as-organization")
	};
}
/**
* Cross-checks between what the network says and what the browser says about
* itself. A VPN produces a timezone mismatch; a patched user-agent produces a
* platform or form mismatch, because stealth tooling routinely rewrites the UA
* string and forgets the Client Hints beside it.
*
* `clientTimezone` is the IANA zone reported by `./fingerprint`.
*/
function networkAnomalies(ctx, clientTimezone) {
	const { geo, agent } = ctx;
	const timezoneMismatch = Boolean(clientTimezone && geo.timezone && clientTimezone !== geo.timezone);
	const platformMismatch = Boolean(agent.hintedPlatform && agent.os !== "unknown" && !agent.hintedPlatform.toLowerCase().includes(agent.os.toLowerCase()) && !(agent.os === "ChromeOS" && agent.hintedPlatform === "Chrome OS"));
	const formMismatch = Boolean(agent.hintedMobile !== void 0 && agent.hintedMobile !== (agent.form === "mobile"));
	return {
		timezoneMismatch,
		proxied: ctx.forwardedChain.length > 1,
		platformMismatch,
		formMismatch
	};
}
//#endregion
export { networkAnomalies, networkContext };
