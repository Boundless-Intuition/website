/**
 * Renders blog posts to narrated MP3s using a local Voicebox instance.
 *
 *   https://github.com/jamiepine/voicebox  (MIT, runs on 127.0.0.1:17493)
 *
 * Voicebox needs Python and a local model, so it cannot run on Cloudflare
 * Workers where this site is deployed. Narration is therefore a publishing
 * step: run this on your machine, commit the MP3s, and the browser only ever
 * plays a static file.
 *
 * The narration text is pulled from the server-rendered page rather than from
 * the markdown drafts in src/content/blog, so the audio always matches what a
 * reader actually sees. The element marked `data-post-body` is the scope, and
 * the same filter the on-page player uses applies here: h2, h3 and p, skipping
 * anything inside figure, table, pre or details.
 *
 * Usage:
 *   bun run preview                      # serve the built site first
 *   bun run narrate                      # every post that is missing or stale
 *   bun run narrate <slug> [<slug>...]   # just these
 *   bun run narrate --check              # report staleness, generate nothing
 *   bun run narrate --force              # re-render even if the hash matches
 *
 * Environment:
 *   VOICEBOX_PROFILE   required - profile id from `curl $VOICEBOX_URL/profiles`
 *   VOICEBOX_URL       default http://127.0.0.1:17493
 *   VOICEBOX_LANGUAGE  default en
 *   VOICEBOX_ENGINE    optional - overrides the engine read off the profile
 *   NARRATE_SITE       default http://localhost:4173
 *   NARRATE_AUDIO_KEY  optional - the field in /generate's JSON holding audio,
 *                      if the built-in guesses miss it
 */
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";

const SITE = (process.env.NARRATE_SITE ?? "http://localhost:4173").replace(
  /\/$/,
  "",
);
const VOICEBOX = (process.env.VOICEBOX_URL ?? "http://127.0.0.1:17493").replace(
  /\/$/,
  "",
);
const PROFILE = process.env.VOICEBOX_PROFILE ?? "";
const LANGUAGE = process.env.VOICEBOX_LANGUAGE ?? "en";

const POSTS_FILE = "src/lib/blog.tsx";
const MANIFEST_FILE = "src/content/blog/narration.json";
const AUDIO_DIR = "public/blog/audio";
/** public path recorded in the manifest, must match AUDIO_DIR under public/ */
const AUDIO_URL_BASE = "/blog/audio";

/** silence inserted between sections, seconds */
const SECTION_GAP = 0.55;
/** speech at mono 64k is transparent enough and keeps a 15 min post near 7 MB */
const MP3_BITRATE = "64k";
/** how long to wait for one section's generation before giving up */
const GENERATION_TIMEOUT_MS = 600_000;
/** tries per section, since the status stream closes unexpectedly now and then */
const SECTION_ATTEMPTS = 3;
/** hard ceiling per synthesis request; long sections are split on sentences */
const MAX_REQUEST_CHARS = 1200;

interface ManifestEntry {
  audio: string;
  duration: number;
  /** hash of the narration text, so staleness is detectable */
  hash: string;
  sections: number;
  profile: string;
  generatedAt: string;
}

type Manifest = Record<string, ManifestEntry>;

// ---------------------------------------------------------------- text sourcing

const SPEAKABLE = new Set(["h2", "h3", "p"]);
const SKIP_INSIDE = new Set(["figure", "table", "pre", "details"]);
const RAW_TEXT = new Set(["script", "style"]);
const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "-",
  mdash: "-",
  hellip: "...",
  lsquo: "'",
  rsquo: "'",
  ldquo: '"',
  rdquo: '"',
  middot: "·",
  deg: "°",
  times: "x",
};

function htmlToText(fragment: string): string {
  return fragment
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, digits: string) =>
      String.fromCodePoint(Number(digits)),
    )
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(
      /&([a-z]+);/gi,
      (whole, name: string) => ENTITIES[name.toLowerCase()] ?? whole,
    )
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Walks the markup with a tag stack, collecting the speakable elements inside
 * the `data-post-body` element. React emits well-formed HTML, so matching close
 * tags by nesting depth is sound here.
 */
function extractNodes(html: string): Array<{ tag: string; text: string }> {
  const tagPattern = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)([^>]*?)(\/?)>/g;
  const nodes: Array<{ tag: string; text: string }> = [];
  const stack: string[] = [];

  let bodyDepth = -1;
  let skipDepth = 0;
  let open: { tag: string; depth: number; start: number } | null = null;
  let match: RegExpExecArray | null;

  while ((match = tagPattern.exec(html)) !== null) {
    const [, closing, rawTag, attrs, selfClosing] = match;
    const tag = rawTag.toLowerCase();

    if (!closing) {
      if (RAW_TEXT.has(tag)) {
        // Script and style bodies can contain angle brackets; jump past them.
        const end = html.indexOf(`</${tag}`, tagPattern.lastIndex);
        tagPattern.lastIndex = end === -1 ? html.length : end;
        continue;
      }
      if (VOID_TAGS.has(tag) || selfClosing) continue;

      stack.push(tag);
      if (bodyDepth === -1) {
        if (/\sdata-post-body\b/.test(attrs)) bodyDepth = stack.length;
      } else if (SKIP_INSIDE.has(tag)) {
        skipDepth++;
      } else if (!open && skipDepth === 0 && SPEAKABLE.has(tag)) {
        open = { tag, depth: stack.length, start: tagPattern.lastIndex };
      }
      continue;
    }

    if (open && tag === open.tag && stack.length === open.depth) {
      const text = htmlToText(html.slice(open.start, match.index));
      if (text) nodes.push({ tag, text });
      open = null;
    }
    if (SKIP_INSIDE.has(tag) && skipDepth > 0) skipDepth--;
    stack.pop();
    if (bodyDepth !== -1 && stack.length < bodyDepth) break;
  }

  if (bodyDepth === -1) {
    throw new Error(
      "No [data-post-body] element in the rendered page. Is NARRATE_SITE pointing at this site?",
    );
  }
  return nodes;
}

interface Section {
  label: string;
  text: string;
}

/** Splits on sentence boundaries so no single request exceeds the ceiling. */
function splitLong(text: string): string[] {
  if (text.length <= MAX_REQUEST_CHARS) return [text];
  const sentences = text.match(/[^.!?]+[.!?]*\s*/g) ?? [text];
  const parts: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    if (current && current.length + sentence.length > MAX_REQUEST_CHARS) {
      parts.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

/**
 * Groups the prose into one section per heading. Sections are the unit of
 * synthesis: they give the reader a natural pause at each boundary, and let a
 * single edited section be re-rendered without redoing the whole post.
 */
function toSections(nodes: Array<{ tag: string; text: string }>): Section[] {
  const groups: Array<{ label: string; parts: string[] }> = [];
  let current: { label: string; parts: string[] } | null = null;

  for (const node of nodes) {
    if (node.tag === "h2" || node.tag === "h3") {
      // A trailing stop makes the engine pause after the heading.
      const spoken = /[.!?:]$/.test(node.text) ? node.text : `${node.text}.`;
      current = { label: node.text, parts: [spoken] };
      groups.push(current);
    } else {
      if (!current) {
        current = { label: "opening", parts: [] };
        groups.push(current);
      }
      current.parts.push(node.text);
    }
  }

  return groups.flatMap((group) => {
    const chunks = splitLong(group.parts.join(" "));
    return chunks.map((text, i) => ({
      label:
        chunks.length > 1
          ? `${group.label} (${i + 1}/${chunks.length})`
          : group.label,
      text,
    }));
  });
}

async function fetchSections(slug: string): Promise<Section[]> {
  const url = `${SITE}/blog/${slug}`;
  let response: Response;
  try {
    response = await fetch(url);
  } catch (cause) {
    throw new Error(
      `Cannot reach ${url}. Start the site first (bun run preview), or set NARRATE_SITE.`,
      { cause },
    );
  }
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return toSections(extractNodes(await response.text()));
}

// ------------------------------------------------------------------- synthesis

interface AudioPart {
  bytes: Uint8Array;
  ext: string;
}

function extFromType(type: string): string {
  if (type.includes("wav")) return "wav";
  if (type.includes("mpeg") || type.includes("mp3")) return "mp3";
  if (type.includes("ogg")) return "ogg";
  if (type.includes("flac")) return "flac";
  if (type.includes("webm")) return "webm";
  return "wav";
}

function looksLikeBase64(value: string): boolean {
  return value.length > 256 && /^[A-Za-z0-9+/=\s]+$/.test(value);
}

/** Merges nested result objects up one level so key lookup stays flat. */
function flatten(payload: unknown): Record<string, unknown> {
  if (!payload || typeof payload !== "object") return {};
  const source = payload as Record<string, unknown>;
  const flat: Record<string, unknown> = { ...source };
  for (const key of ["data", "result", "output", "audio"]) {
    const nested = source[key];
    if (nested && typeof nested === "object" && !Array.isArray(nested)) {
      Object.assign(flat, nested as Record<string, unknown>);
    }
  }
  return flat;
}

const AUDIO_KEYS = [
  "audio_base64",
  "audioBase64",
  "audio_b64",
  "audio",
  "data",
  "path",
  "audio_path",
  "file",
  "file_path",
  "output_path",
  "wav_path",
  "url",
  "audio_url",
];

async function download(url: string): Promise<AudioPart> {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(
      `Fetching generated audio from ${url} returned ${response.status}`,
    );
  return {
    bytes: new Uint8Array(await response.arrayBuffer()),
    ext: extFromType(response.headers.get("content-type") ?? ""),
  };
}

/**
 * Voicebox's /generate has returned audio in several shapes across releases
 * (raw bytes, a base64 field, a path on disk, a URL), so every form is handled
 * and NARRATE_AUDIO_KEY is the escape hatch if a future one is missed.
 */
async function resolvePayload(payload: unknown): Promise<AudioPart> {
  const flat = flatten(payload);
  const keys = process.env.NARRATE_AUDIO_KEY
    ? [process.env.NARRATE_AUDIO_KEY, ...AUDIO_KEYS]
    : AUDIO_KEYS;

  for (const key of keys) {
    const value = flat[key];
    if (typeof value !== "string" || !value) continue;

    if (value.startsWith("data:")) {
      const [header, encoded] = value.split(",", 2);
      return {
        bytes: Buffer.from(encoded ?? "", "base64"),
        ext: extFromType(header),
      };
    }
    if (/^https?:\/\//.test(value)) return await download(value);
    if (!looksLikeBase64(value) && /[/\\]/.test(value)) {
      // Voicebox runs on this machine, so a returned path is readable directly.
      try {
        return {
          bytes: await readFile(value),
          ext: path.extname(value).slice(1) || "wav",
        };
      } catch {
        return await download(new URL(value, VOICEBOX).toString());
      }
    }
    if (looksLikeBase64(value)) {
      return { bytes: Buffer.from(value, "base64"), ext: "wav" };
    }
  }

  throw new Error(
    `No audio found in the /generate response. Keys seen: ${Object.keys(flat).join(", ") || "(none)"}. ` +
      `Check ${VOICEBOX}/docs and set NARRATE_AUDIO_KEY to the right field.`,
  );
}

interface VoiceboxProfile {
  id: string;
  name: string;
  default_engine?: string | null;
  preset_engine?: string | null;
}

let cachedEngine: string | null = null;

/**
 * /generate defaults to the qwen engine and a preset profile refuses any engine
 * but its own, so the engine has to be sent explicitly. Reading it off the
 * profile means switching voices needs no other change here.
 */
async function resolveEngine(): Promise<string> {
  if (process.env.VOICEBOX_ENGINE) return process.env.VOICEBOX_ENGINE;
  if (cachedEngine) return cachedEngine;

  const response = await fetch(`${VOICEBOX}/profiles`).catch(
    (cause: unknown) => {
      throw new Error(
        `Cannot reach Voicebox at ${VOICEBOX}. Is the app running?`,
        {
          cause,
        },
      );
    },
  );
  if (!response.ok) {
    throw new Error(`Voicebox /profiles returned ${response.status}`);
  }

  const profiles = (await response.json()) as VoiceboxProfile[];
  const profile = profiles.find((candidate) => candidate.id === PROFILE);
  if (!profile) {
    const known = profiles.map((p) => `${p.name} (${p.id})`).join(", ");
    throw new Error(`No profile ${PROFILE}. Available: ${known || "(none)"}`);
  }

  cachedEngine = profile.default_engine ?? profile.preset_engine ?? "kokoro";
  console.log(`  voice: ${profile.name}, engine ${cachedEngine}`);
  return cachedEngine;
}

const FINISHED = new Set(["completed", "complete", "done", "success"]);
const FAILED = new Set(["failed", "error", "cancelled", "canceled"]);

/**
 * Generation is asynchronous: /generate returns an id in "generating" state and
 * /generate/{id}/status is a server-sent event stream that closes once the
 * generation reaches a terminal state.
 */
async function awaitGeneration(
  id: string,
  initialStatus?: string,
): Promise<void> {
  if (initialStatus && FINISHED.has(initialStatus)) return;

  const response = await fetch(`${VOICEBOX}/generate/${id}/status`, {
    signal: AbortSignal.timeout(GENERATION_TIMEOUT_MS),
  });
  if (!response.ok || !response.body) {
    throw new Error(
      `Voicebox status stream for ${id} returned ${response.status}`,
    );
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  // Held rather than thrown from inside the loop so a real failure verdict is
  // not confused with the socket errors the catch below absorbs.
  let failure: Error | null = null;

  try {
    stream: for (;;) {
      const { done, value } = await reader.read();
      if (value) buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        let event: { status?: string; error?: string };
        try {
          event = JSON.parse(line.slice(5).trim());
        } catch {
          continue;
        }
        if (event.status && FAILED.has(event.status)) {
          failure = new Error(
            `Voicebox generation ${id} ${event.status}: ${event.error ?? "no detail given"}`,
          );
          break stream;
        }
        if (event.status && FINISHED.has(event.status)) break stream;
      }
      // A stream that closes without a verdict is treated as done; the audio
      // fetch reports the real problem if it is not actually ready.
      if (done) break;
    }
  } catch {
    // Voicebox drops this stream abruptly often enough that a socket error here
    // says nothing about the generation. Fall through and let the audio poll
    // decide, rather than discarding a section that is probably fine.
  } finally {
    await reader.cancel().catch(() => {});
  }

  if (failure) throw failure;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Waits for the finished audio. The file appears when the generation lands, so
 * availability here is the readiness signal, and polling it covers the case
 * where the status stream died before reporting a verdict.
 */
async function fetchAudioWhenReady(id: string): Promise<AudioPart> {
  const deadline = Date.now() + GENERATION_TIMEOUT_MS;
  let lastStatus = "no response";

  for (;;) {
    try {
      const response = await fetch(`${VOICEBOX}/audio/${id}`);
      if (response.ok) {
        return {
          bytes: new Uint8Array(await response.arrayBuffer()),
          ext: extFromType(response.headers.get("content-type") ?? ""),
        };
      }
      lastStatus = `HTTP ${response.status}`;
    } catch (error) {
      lastStatus = error instanceof Error ? error.message : String(error);
    }
    if (Date.now() > deadline) {
      throw new Error(
        `Audio for generation ${id} never arrived (${lastStatus})`,
      );
    }
    await sleep(2000);
  }
}

async function synthesize(text: string): Promise<AudioPart> {
  const engine = await resolveEngine();
  const response = await fetch(`${VOICEBOX}/generate`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      text,
      profile_id: PROFILE,
      language: LANGUAGE,
      engine,
      // The profile's personality prompt rewrites the input in character before
      // synthesis. Narration has to read the article as written, so it is off.
      personality: false,
      // Matches our own sentence-aligned split, so Voicebox does not re-cut the
      // text mid-sentence at its 800 character default.
      max_chunk_chars: MAX_REQUEST_CHARS,
    }),
  }).catch((cause: unknown) => {
    throw new Error(
      `Cannot reach Voicebox at ${VOICEBOX}. Is the app running?`,
      {
        cause,
      },
    );
  });

  if (!response.ok) {
    throw new Error(
      `Voicebox /generate returned ${response.status}: ${(await response.text()).slice(0, 400)}`,
    );
  }

  const type = response.headers.get("content-type") ?? "";
  if (type.startsWith("audio/") || type === "application/octet-stream") {
    return {
      bytes: new Uint8Array(await response.arrayBuffer()),
      ext: extFromType(type),
    };
  }

  const payload = (await response.json()) as { id?: string; status?: string };
  // Builds that answer inline rather than with a job id fall back to the
  // key-guessing path below.
  if (!payload.id) return await resolvePayload(payload);

  await awaitGeneration(payload.id, payload.status);
  return await fetchAudioWhenReady(payload.id);
}

/**
 * One flaky section should not discard the sections already synthesised, which
 * on a 16 section post is most of an hour of model time.
 */
async function synthesizeSection(text: string): Promise<AudioPart> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= SECTION_ATTEMPTS; attempt++) {
    try {
      return await synthesize(text);
    } catch (error) {
      lastError = error;
      if (attempt === SECTION_ATTEMPTS) break;
      const reason = error instanceof Error ? error.message : String(error);
      console.log(`\n    attempt ${attempt} failed (${reason}), retrying`);
      await sleep(3000);
    }
  }
  throw lastError;
}

// ---------------------------------------------------------------------- ffmpeg

function run(command: string, args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => (stdout += chunk));
    child.stderr.on("data", (chunk) => (stderr += chunk));
    child.on("error", (error) =>
      reject(
        new Error(
          `Could not run ${command}. Is it installed? (${error.message})`,
        ),
      ),
    );
    child.on("close", (code) =>
      code === 0
        ? resolve(stdout)
        : reject(
            new Error(`${command} exited ${code}\n${stderr.slice(-2000)}`),
          ),
    );
  });
}

/** Concatenates the section files into one MP3, padding a gap between each. */
async function concatToMp3(files: string[], outFile: string): Promise<void> {
  const filters = files.map((_, i) => {
    // No pad on the last section, so the file does not end in silence.
    const pad = i === files.length - 1 ? "" : `,apad=pad_dur=${SECTION_GAP}`;
    return `[${i}:a]aresample=44100,aformat=sample_fmts=s16:channel_layouts=mono${pad}[a${i}]`;
  });
  const inputs = files.map((_, i) => `[a${i}]`).join("");
  const chain = `${filters.join(";")};${inputs}concat=n=${files.length}:v=0:a=1[out]`;

  await run("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    ...files.flatMap((file) => ["-i", file]),
    "-filter_complex",
    chain,
    "-map",
    "[out]",
    "-c:a",
    "libmp3lame",
    "-b:a",
    MP3_BITRATE,
    "-ac",
    "1",
    "-ar",
    "44100",
    "-y",
    outFile,
  ]);
}

async function probeDuration(file: string): Promise<number> {
  const out = await run("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=noprint_wrappers=1:nokey=1",
    file,
  ]);
  const seconds = Number(out.trim());
  if (!Number.isFinite(seconds) || seconds <= 0) {
    throw new Error(`ffprobe could not read a duration from ${file}`);
  }
  return Math.round(seconds * 10) / 10;
}

// ------------------------------------------------------------------------ main

function hashText(text: string): string {
  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}

async function readManifest(): Promise<Manifest> {
  try {
    return JSON.parse(await readFile(MANIFEST_FILE, "utf8")) as Manifest;
  } catch {
    return {};
  }
}

async function writeManifest(manifest: Manifest): Promise<void> {
  const ordered = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
  );
  await writeFile(MANIFEST_FILE, `${JSON.stringify(ordered, null, 2)}\n`);
}

async function allSlugs(): Promise<string[]> {
  const source = await readFile(POSTS_FILE, "utf8");
  const slugs = [...source.matchAll(/^\s+slug: "([^"]+)"/gm)].map((m) => m[1]);
  if (!slugs.length) throw new Error(`Found no post slugs in ${POSTS_FILE}`);
  return slugs;
}

async function narrate(
  slug: string,
  sections: Section[],
  hash: string,
): Promise<ManifestEntry> {
  const workDir = await mkdtemp(path.join(tmpdir(), `narrate-${slug}-`));
  try {
    const files: string[] = [];
    for (const [index, section] of sections.entries()) {
      const position = `${String(index + 1).padStart(2, "0")}/${sections.length}`;
      process.stdout.write(`  ${position} ${section.label.slice(0, 58)} ... `);
      const part = await synthesizeSection(section.text);
      const file = path.join(
        workDir,
        `part-${String(index).padStart(3, "0")}.${part.ext}`,
      );
      await writeFile(file, part.bytes);
      files.push(file);
      console.log(`${(part.bytes.length / 1024).toFixed(0)} KB`);
    }

    await mkdir(AUDIO_DIR, { recursive: true });
    const outFile = path.join(AUDIO_DIR, `${slug}.mp3`);
    await concatToMp3(files, outFile);
    const duration = await probeDuration(outFile);
    const { size } = await stat(outFile);

    console.log(
      `  wrote ${outFile} - ${formatClock(duration)}, ${(size / 1024 / 1024).toFixed(1)} MB`,
    );

    return {
      audio: `${AUDIO_URL_BASE}/${slug}.mp3`,
      duration,
      hash,
      sections: sections.length,
      profile: PROFILE,
      generatedAt: new Date().toISOString(),
    };
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
}

function formatClock(seconds: number): string {
  const total = Math.round(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const check = args.includes("--check");
  const force = args.includes("--force");
  const print = args.includes("--print");
  const requested = args.filter((arg) => !arg.startsWith("--"));

  const slugs = requested.length ? requested : await allSlugs();
  const manifest = await readManifest();

  // Reading the script out before spending model time on it is worth the
  // detour: this is exactly what the engine will be handed, section by section.
  if (print) {
    for (const slug of slugs) {
      const sections = await fetchSections(slug);
      console.log(`\n=== ${slug} (${sections.length} sections) ===`);
      for (const section of sections) {
        console.log(`\n[${section.label}]\n${section.text}`);
      }
    }
    return;
  }

  if (!check && !PROFILE) {
    throw new Error(
      `VOICEBOX_PROFILE is not set. Pick one from: curl -s ${VOICEBOX}/profiles`,
    );
  }

  let stale = 0;
  let written = 0;

  for (const slug of slugs) {
    const sections = await fetchSections(slug);
    const hash = hashText(sections.map((s) => s.text).join("\n"));
    const existing = manifest[slug];
    const current = existing?.hash === hash;
    const words = sections.reduce((n, s) => n + s.text.split(/\s+/).length, 0);

    if (current && !force) {
      console.log(`✓ ${slug} - up to date (${formatClock(existing.duration)})`);
      continue;
    }

    stale++;
    if (check) {
      console.log(
        existing
          ? `! ${slug} - text changed since ${existing.generatedAt.slice(0, 10)}, needs re-rendering`
          : `! ${slug} - no audio yet (${sections.length} sections, ~${words} words)`,
      );
      continue;
    }

    console.log(`→ ${slug} - ${sections.length} sections, ~${words} words`);
    manifest[slug] = await narrate(slug, sections, hash);
    await writeManifest(manifest);
    written++;
  }

  if (check && stale) {
    console.log(`\n${stale} post(s) need narration. Run: bun run narrate`);
    process.exitCode = 1;
    return;
  }
  if (written)
    console.log(`\nUpdated ${MANIFEST_FILE}. Commit it with the MP3s.`);
}

main().catch((error: unknown) => {
  console.error(`\n${error instanceof Error ? error.message : String(error)}`);
  if (error instanceof Error && error.cause) console.error(error.cause);
  process.exitCode = 1;
});
