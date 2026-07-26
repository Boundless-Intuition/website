# Blog narration

`narrate.ts` turns a blog post into an MP3 using [Voicebox](https://github.com/jamiepine/voicebox),
a local, MIT-licensed voice studio. Voicebox needs Python and a local model, and the site runs on
Cloudflare Workers, so nothing is synthesised when a visitor loads the page. The audio is made here,
committed, and served as a static file.

## One-time setup

1. Install Voicebox from [voicebox.sh](https://voicebox.sh/) (DMG on macOS) and open it.
2. The blog voice is **Bella BI**: the Kokoro engine on the `af_bella` preset. Kokoro is the small
   fast one, which matters when a post is 16 sections long.
3. Find the profile id. Ids are local to your Voicebox install, so yours will differ from anyone
   else's:

   ```sh
   curl -s http://127.0.0.1:17493/profiles
   ```

4. Put it in your shell, or in front of the command each time:

   ```sh
   export VOICEBOX_PROFILE=<id>
   ```

The engine is read off the profile, so switching voices needs nothing else. `/generate` defaults to
qwen and a preset profile rejects any engine but its own, which is why the script sends it
explicitly.

`ffmpeg` and `ffprobe` also need to be on your PATH (`brew install ffmpeg`).

## A note on personality prompts

A Voicebox profile can carry a personality prompt, and Bella BI has one ("act as a normal person
reading a research blog with interest"). When `personality` is true, Voicebox sends the input through
an LLM that **rewrites it in character before synthesis**. For narration that is the wrong thing: it
would put words in the article's mouth that the article does not say. The script always sends
`personality: false`, so the profile's prompt is deliberately ignored and Bella reads the post
verbatim. Tone comes from the voice, not from a rewrite.

## Making audio

The script reads the narration text off the rendered page, so the site has to be running:

```sh
bun run build && bun run preview     # in one terminal
bun run narrate                      # in another
```

That writes `public/blog/audio/<slug>.mp3` and records the length and a text hash in
`src/content/blog/narration.json`. Commit both. The player picks the file up automatically through
`getNarration()` in `src/lib/blog.tsx`; there is nothing to paste by hand.

Useful variants:

| Command                          | What it does                                               |
| -------------------------------- | ---------------------------------------------------------- |
| `bun run narrate`                | every post that is missing audio or whose text has changed |
| `bun run narrate <slug>`         | just that post                                             |
| `bun run narrate --force`        | re-render even when the hash still matches                 |
| `bun run narrate <slug> --print` | print the script it would speak, generate nothing          |
| `bun run narrate:check`          | report what is stale and exit 1, generates nothing         |

`narrate:check` needs no Voicebox and no profile, only the site running. It is the thing to run
before a deploy if you want to be sure the audio still matches the words.

## What gets read

Headings (`h2`, `h3`) and paragraphs inside the `data-post-body` element, skipping anything inside
`figure`, `table`, `pre`, or `details`. That is the same filter `collectSpeakableText()` in
`PostActions.tsx` applies in the browser, so both narration paths cover the same words. The markdown
drafts in `src/content/blog/*.md` are **not** the source, they have already drifted from the live
components.

Each heading starts a new section, and each section is one synthesis request with a short pause
after it. So a reworded section only costs one request to redo, not the whole post.

## When the text changes

Editing a post makes its MP3 stale. `narrate:check` will say so, since the hash in the manifest no
longer matches the page. Re-run `bun run narrate <slug>`.

## How a section is generated

`/generate` is asynchronous. It returns a job id in `generating` state, `/generate/{id}/status` is a
server-sent event stream that closes when the job reaches a terminal state, and the audio is then
fetched from `/audio/{id}` as a 24 kHz mono WAV. The script does those three steps per section and
hands the WAVs to ffmpeg.

Older Voicebox builds answered `/generate` inline instead, with audio bytes, a base64 field, a path,
or a URL. Those shapes are still handled as a fallback. If one turns up that is not, the script
prints the JSON keys it saw. Open <http://127.0.0.1:17493/docs>, find the right field, and pass it:

```sh
NARRATE_AUDIO_KEY=<field> bun run narrate <slug>
```

## Environment

| Variable            | Default                  | Purpose                                      |
| ------------------- | ------------------------ | -------------------------------------------- |
| `VOICEBOX_PROFILE`  | none, required           | which voice to use                           |
| `VOICEBOX_URL`      | `http://127.0.0.1:17493` | where Voicebox is listening                  |
| `VOICEBOX_LANGUAGE` | `en`                     | language passed to the engine                |
| `VOICEBOX_ENGINE`   | from the profile         | override the engine, rarely needed           |
| `NARRATE_SITE`      | `http://localhost:4173`  | where to read the rendered posts from        |
| `NARRATE_AUDIO_KEY` | none                     | override for the audio field in the response |
