import { t as cs } from "../_libs/neondatabase__serverless.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/identity-store.server-C8nFiSFo.js
var client;
function db() {
	if (client !== void 0) return client;
	const url = process.env.DATABASE_URL;
	client = url ? cs(url) : null;
	return client;
}
/**
* Component weights, by how much each one actually narrows the field.
*
* Canvas, WebGL parameters and the audio signature carry the most entropy and
* are the hardest to change by accident. Core count and colour depth carry
* almost none - millions of machines report 8 and 24 - so they only break ties.
*/
var WEIGHTS = {
	canvas: 4,
	webgl_params: 4,
	audio: 4,
	fonts: 3,
	webgl: 3,
	screen: 2,
	media_devices: 2,
	ua: 2,
	timezone: 1,
	languages: 1,
	platform: 1,
	cores: 1,
	memory: 1,
	touch_points: 1,
	color_depth: 1
};
var TOTAL_WEIGHT = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);
/**
* How much agreement counts as the same device. 23/31 is a little over 70%:
* high enough that two different machines from the same corporate image do not
* collide, low enough to absorb a browser update plus a font install.
*/
var MATCH_THRESHOLD = 23;
/** Values that mean "this browser refused to answer" and must never join a match. */
var OPAQUE = new Set([
	"unstable",
	"masked",
	"error",
	"none",
	""
]);
/**
* Find the device this trait vector most likely belongs to, else record it.
*
* `stability` gates the whole thing. A browser that randomises canvas and masks
* WebGL produces a vector whose high-entropy components are all the same
* literal placeholder, so every such visitor would score identically against
* every other one and get merged into a single fictional device. Those are
* stored but never matched - see the note in `/legal` §05 about anti-
* fingerprinting browsers landing in one bucket by design.
*/
async function resolveDevice(traits, clientId, stability) {
	const sql = db();
	if (!sql) return void 0;
	try {
		if (stability !== "high") {
			const inserted = await insertDevice(sql, traits, clientId);
			return inserted ? {
				visitorId: clientId,
				deviceId: inserted,
				confidence: 0,
				matched: false
			} : void 0;
		}
		const best = (await sql`
      select
        id, visitor_id,
        (case when canvas       = ${traits.canvas}       then ${WEIGHTS.canvas}        else 0 end) +
        (case when webgl_params = ${traits.webglParams}  then ${WEIGHTS.webgl_params}  else 0 end) +
        (case when audio        = ${traits.audio}        then ${WEIGHTS.audio}         else 0 end) +
        (case when fonts        = ${traits.fonts}        then ${WEIGHTS.fonts}         else 0 end) +
        (case when webgl        = ${traits.webgl}        then ${WEIGHTS.webgl}         else 0 end) +
        (case when screen       = ${traits.screen}       then ${WEIGHTS.screen}        else 0 end) +
        (case when media_devices= ${traits.mediaDevices} then ${WEIGHTS.media_devices} else 0 end) +
        (case when ua           = ${traits.ua}           then ${WEIGHTS.ua}            else 0 end) +
        (case when timezone     = ${traits.timezone}     then ${WEIGHTS.timezone}      else 0 end) +
        (case when languages    = ${traits.languages}    then ${WEIGHTS.languages}     else 0 end) +
        (case when platform     = ${traits.platform}     then ${WEIGHTS.platform}      else 0 end) +
        (case when cores        = ${traits.cores}        then ${WEIGHTS.cores}         else 0 end) +
        (case when memory       = ${traits.memory}       then ${WEIGHTS.memory}        else 0 end) +
        (case when touch_points = ${traits.touchPoints}  then ${WEIGHTS.touch_points}  else 0 end) +
        (case when color_depth  = ${traits.colorDepth}   then ${WEIGHTS.color_depth}   else 0 end)
        as score
      from device
      where canvas = ${traits.canvas}
         or webgl_params = ${traits.webglParams}
         or audio = ${traits.audio}
         or fonts = ${traits.fonts}
      order by score desc
      limit 1
    `)[0];
		if (best && best.score >= MATCH_THRESHOLD) {
			await sql`
        update device
        set last_seen = now(), hits = hits + 1
        where id = ${best.id}
      `;
			return {
				visitorId: best.visitor_id,
				deviceId: best.id,
				confidence: Number((best.score / TOTAL_WEIGHT).toFixed(2)),
				matched: true
			};
		}
		const inserted = await insertDevice(sql, traits, clientId);
		return inserted ? {
			visitorId: clientId,
			deviceId: inserted,
			confidence: best ? Number((best.score / TOTAL_WEIGHT).toFixed(2)) : 0,
			matched: false
		} : void 0;
	} catch (error) {
		console.warn("device resolve failed", error);
		return;
	}
}
async function insertDevice(sql, t, visitorId) {
	return (await sql`
    insert into device (
      visitor_id, ua, platform, languages, timezone, cores, memory,
      touch_points, color_depth, screen, canvas, webgl, webgl_params,
      audio, fonts, media_devices
    ) values (
      ${visitorId}, ${t.ua}, ${t.platform}, ${t.languages}, ${t.timezone},
      ${t.cores}, ${t.memory}, ${t.touchPoints}, ${t.colorDepth}, ${t.screen},
      ${nullIfOpaque(t.canvas)}, ${t.webgl}, ${t.webglParams},
      ${nullIfOpaque(t.audio)}, ${t.fonts}, ${t.mediaDevices}
    )
    returning id
  `)[0]?.id;
}
function nullIfOpaque(value) {
	return OPAQUE.has(value) ? null : value;
}
/**
* Write one visit. This is the sink the raw trace previously lacked - before
* this existed the pointer path and keystroke timings were collected, validated
* and then dropped, because an ntfy message body caps out at 4096 bytes.
*/
async function recordVisit(v) {
	const sql = db();
	if (!sql) return;
	const b = v.behavior ?? {};
	try {
		await sql`
      insert into visit (
        device_id, visitor_id, entry_path, exit_path, dwell_secs,
        ip, country, city, asn, as_org,
        pointer_samples, pointer_straightness, sub_pixel_ratio,
        key_count, dwell_mean, flight_mean, click_count, inert_clicks,
        flags, trace
      ) values (
        ${v.deviceId ?? null}, ${v.visitorId}, ${v.entryPath}, ${v.exitPath},
        ${v.dwellSeconds},
        ${isIp(v.ip) ? v.ip : null}, ${v.country ?? null}, ${v.city ?? null},
        ${v.asn ?? null}, ${v.asOrg ?? null},
        ${b.pointerSamples ?? null}, ${b.pointerStraightness ?? null},
        ${b.subPixelRatio ?? null}, ${b.keyCount ?? null},
        ${b.dwellMean ?? null}, ${b.flightMean ?? null},
        ${b.clickCount ?? null}, ${b.inertClicks ?? null},
        ${v.flags}, ${v.trace ? JSON.stringify(v.trace) : null}
      )
    `;
	} catch (error) {
		console.warn("visit insert failed", error);
	}
}
function isIp(value) {
	if (!value || value === "unknown") return false;
	return /^[0-9a-fA-F.:]+$/.test(value);
}
//#endregion
export { recordVisit, resolveDevice };
