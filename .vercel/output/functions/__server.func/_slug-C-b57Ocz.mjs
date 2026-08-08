import { i as __toESM } from "./_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as track$1, r as TopBar, s as useReadProgress } from "./_ssr/TopBar-DCTQo05p.mjs";
import { g as Prose } from "./_ssr/charts-C6lQQitl.mjs";
import { a as getNarration, i as getBlogPost, r as formatBlogDate, t as BLOG_POSTS } from "./_ssr/blog-iG6aGCR5.mjs";
import { t as Route } from "./_slug-_z3PO6DQ.mjs";
import { t as SiteFooter } from "./_ssr/SiteFooter-Dt_ACPC3.mjs";
import { t as BlogHeroBackdrop } from "./_ssr/BlogVisual-eY5TGI-L.mjs";
import { a as Link2, i as Pause, n as RotateCcw, o as Check, r as Play, t as RotateCw } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-C-b57Ocz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TableOfContents({ containerRef }) {
	const [headings, setHeadings] = (0, import_react.useState)([]);
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const root = containerRef.current;
		if (!root) return;
		const els = Array.from(root.querySelectorAll("h2[id], h3[id]"));
		setHeadings(els.map((el) => ({
			id: el.id,
			text: el.textContent || "",
			level: el.tagName === "H3" ? 3 : 2
		})));
		if (els.length === 0) return;
		const visible = /* @__PURE__ */ new Set();
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) if (entry.isIntersecting) visible.add(entry.target.id);
			else visible.delete(entry.target.id);
			if (visible.size > 0) {
				const firstVisible = els.find((el) => visible.has(el.id));
				if (firstVisible) setActiveId(firstVisible.id);
			}
		}, {
			rootMargin: "0px 0px -70% 0px",
			threshold: 0
		});
		els.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, [containerRef]);
	if (headings.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		"aria-label": "Table of contents",
		className: "sticky top-24 hidden max-h-[calc(100vh-7rem)] w-52 shrink-0 overflow-y-auto lg:block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
			children: "On this page"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-2.5",
			children: headings.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: h.level === 3 ? "ml-3" : "",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `#${h.id}`,
					className: `block text-[12.5px] leading-snug transition-colors ${activeId === h.id ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"}`,
					children: h.text
				})
			}, h.id))
		})]
	});
}
var WORDS_PER_MINUTE = 175;
var MAX_CHUNK_CHARS = 180;
var SKIP_SECONDS = 15;
var RATES = [
	1,
	1.25,
	1.5,
	2
];
function formatClock(seconds) {
	const total = Math.max(0, Math.round(seconds));
	const m = Math.floor(total / 60);
	const s = total % 60;
	return `${m}:${String(s).padStart(2, "0")}`;
}
function wordCount(text) {
	return text.split(/\s+/).filter(Boolean).length;
}
function collectSpeakableText(root) {
	return Array.from(root.querySelectorAll("h2, h3, p")).filter((el) => !el.closest("figure, table, pre, details")).map((el) => el.textContent?.trim() ?? "").filter(Boolean).join(" ");
}
function splitIntoChunks(text) {
	const sentences = text.match(/[^.!?]+[.!?]*\s*/g) ?? [text];
	const chunks = [];
	let current = "";
	for (const sentence of sentences) if (current && current.length + sentence.length > MAX_CHUNK_CHARS) {
		chunks.push(current.trim());
		current = sentence;
	} else current += sentence;
	if (current.trim()) chunks.push(current.trim());
	return chunks;
}
/**
* The transport controls, shared by both narration sources so the pill looks
* and behaves the same whether it is playing a file or the browser's voice.
*/
function PlayerShell({ status, position, duration, rate, onToggle, onSkip, onCycleRate }) {
	if (status === "idle") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onToggle,
		"aria-label": "Listen to article",
		className: "group flex items-center gap-3 rounded-full border border-border px-4 py-2 transition-colors hover:bg-foreground/5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-6 shrink-0 place-items-center rounded-full bg-foreground text-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3 translate-x-px fill-current" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-[13px] font-medium text-foreground",
				children: "Listen to article"
			}),
			duration > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[12px] tabular-nums text-muted-foreground",
				children: formatClock(duration)
			})
		]
	});
	const playing = status === "playing";
	const progressPct = duration > 0 ? Math.min(100, position / duration * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex w-full max-w-[19rem] items-center gap-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onToggle,
				"aria-label": playing ? "Pause article narration" : "Resume article narration",
				className: "grid size-9 shrink-0 place-items-center rounded-full bg-foreground text-background transition-transform active:scale-95",
				children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5 translate-x-px fill-current" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-2 w-[5ch] shrink-0 font-mono text-[13px] tabular-nums text-foreground/80",
				children: formatClock(position)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mx-1 h-4 w-px shrink-0 bg-border",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onSkip(-15),
				"aria-label": `Back ${SKIP_SECONDS} seconds`,
				className: "relative grid size-7 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute font-mono text-[7px] font-bold leading-none",
					children: SKIP_SECONDS
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onSkip(SKIP_SECONDS),
				"aria-label": `Forward ${SKIP_SECONDS} seconds`,
				className: "relative grid size-7 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute font-mono text-[7px] font-bold leading-none",
					children: SKIP_SECONDS
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onCycleRate,
				"aria-label": "Playback speed",
				className: "ml-1 shrink-0 rounded-full border border-border px-2.5 py-1 font-mono text-[11px] font-medium text-foreground transition-colors hover:bg-foreground/5",
				children: [rate, "x"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "absolute inset-x-0 -bottom-2 h-0.5 overflow-hidden rounded-full bg-border/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-accent transition-[width] duration-300",
					style: { width: `${progressPct}%` }
				})
			})
		]
	});
}
/**
* Plays a pre-rendered MP3. Position, duration, and rate all come from the
* media element itself, so the clock is real rather than estimated.
*/
function AudioNarration({ audio, duration: knownDuration, slug }) {
	const audioRef = (0, import_react.useRef)(null);
	const reported = (0, import_react.useRef)(false);
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [position, setPosition] = (0, import_react.useState)(0);
	const [duration, setDuration] = (0, import_react.useState)(knownDuration);
	const [rateIndex, setRateIndex] = (0, import_react.useState)(0);
	const rate = RATES[rateIndex];
	const toggle = (0, import_react.useCallback)(() => {
		const el = audioRef.current;
		if (!el) return;
		if (!el.paused) {
			el.pause();
			return;
		}
		if (!reported.current) {
			reported.current = true;
			track$1("narration_play", {
				slug,
				source: "audio"
			});
		}
		el.playbackRate = rate;
		el.play().catch(() => setStatus("idle"));
	}, [rate, slug]);
	const skip = (0, import_react.useCallback)((deltaSeconds) => {
		const el = audioRef.current;
		if (!el) return;
		const total = Number.isFinite(el.duration) ? el.duration : 0;
		const target = Math.min(Math.max(el.currentTime + deltaSeconds, 0), total);
		el.currentTime = target;
		setPosition(target);
	}, []);
	const cycleRate = (0, import_react.useCallback)(() => {
		setRateIndex((prev) => {
			const next = (prev + 1) % RATES.length;
			if (audioRef.current) audioRef.current.playbackRate = RATES[next];
			return next;
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
		ref: audioRef,
		src: audio,
		preload: "metadata",
		className: "hidden",
		onLoadedMetadata: (event) => {
			const value = event.currentTarget.duration;
			if (Number.isFinite(value) && value > 0) setDuration(value);
		},
		onTimeUpdate: (event) => setPosition(event.currentTarget.currentTime),
		onPlay: () => setStatus("playing"),
		onPause: () => setStatus((prev) => prev === "idle" ? prev : "paused"),
		onEnded: (event) => {
			event.currentTarget.currentTime = 0;
			setPosition(0);
			setStatus("idle");
		}
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerShell, {
		status,
		position,
		duration,
		rate,
		onToggle: toggle,
		onSkip: skip,
		onCycleRate: cycleRate
	})] });
}
/**
* Fallback for posts with no generated audio: the browser's own voice, reading
* the rendered prose. Whatever voice the visitor's OS ships, and silent on the
* browsers that implement no voices at all - hence the pre-rendered path above.
*/
function SpeechNarration({ containerRef, slug }) {
	const [supported, setSupported] = (0, import_react.useState)(false);
	const reported = (0, import_react.useRef)(false);
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [rateIndex, setRateIndex] = (0, import_react.useState)(0);
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const [totalBaseline, setTotalBaseline] = (0, import_react.useState)(0);
	const chunksRef = (0, import_react.useRef)([]);
	const chunkStartsRef = (0, import_react.useRef)([]);
	const indexRef = (0, import_react.useRef)(0);
	const rateRef = (0, import_react.useRef)(RATES[0]);
	const tickRef = (0, import_react.useRef)(null);
	const rate = RATES[rateIndex];
	(0, import_react.useEffect)(() => {
		rateRef.current = rate;
	}, [rate]);
	const stopTicking = (0, import_react.useCallback)(() => {
		if (tickRef.current) {
			clearInterval(tickRef.current);
			tickRef.current = null;
		}
	}, []);
	const startTicking = (0, import_react.useCallback)(() => {
		stopTicking();
		tickRef.current = setInterval(() => {
			setElapsed((prev) => prev + .25);
		}, 250);
	}, [stopTicking]);
	const speakFromRef = (0, import_react.useRef)(() => {});
	speakFromRef.current = (index) => {
		const chunks = chunksRef.current;
		if (index >= chunks.length) {
			indexRef.current = 0;
			setElapsed(0);
			setStatus("idle");
			stopTicking();
			return;
		}
		indexRef.current = index;
		const utterance = new SpeechSynthesisUtterance(chunks[index]);
		utterance.rate = rateRef.current;
		utterance.onend = () => speakFromRef.current(index + 1);
		utterance.onerror = () => {
			setStatus("idle");
			stopTicking();
		};
		window.speechSynthesis.speak(utterance);
	};
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
		const root = containerRef.current;
		if (!root) return;
		const text = collectSpeakableText(root);
		if (!text) return;
		const chunks = splitIntoChunks(text);
		chunksRef.current = chunks;
		const starts = [];
		let acc = 0;
		for (const chunk of chunks) {
			starts.push(acc);
			acc += wordCount(chunk) / WORDS_PER_MINUTE * 60;
		}
		chunkStartsRef.current = starts;
		setTotalBaseline(acc);
		setSupported(true);
		return () => {
			window.speechSynthesis.cancel();
			stopTicking();
		};
	}, [containerRef, stopTicking]);
	const toggle = (0, import_react.useCallback)(() => {
		const synth = window.speechSynthesis;
		if (status !== "playing" && !reported.current) {
			reported.current = true;
			track$1("narration_play", {
				slug,
				source: "speech"
			});
		}
		if (status === "playing") {
			synth.pause();
			setStatus("paused");
			stopTicking();
		} else if (status === "paused") {
			synth.resume();
			setStatus("playing");
			startTicking();
		} else {
			synth.cancel();
			setElapsed(0);
			setStatus("playing");
			startTicking();
			speakFromRef.current(0);
		}
	}, [
		status,
		startTicking,
		stopTicking,
		slug
	]);
	const skip = (0, import_react.useCallback)((deltaSeconds) => {
		if (status === "idle" || !chunkStartsRef.current.length) return;
		const currentRate = rateRef.current;
		const totalReal = totalBaseline / currentRate;
		const targetBaseline = Math.min(Math.max(elapsed + deltaSeconds, 0), totalReal) * currentRate;
		const starts = chunkStartsRef.current;
		let index = 0;
		for (let i = 0; i < starts.length; i++) if (starts[i] <= targetBaseline) index = i;
		else break;
		window.speechSynthesis.cancel();
		setElapsed(starts[index] / currentRate);
		speakFromRef.current(index);
		if (status === "paused") window.speechSynthesis.pause();
	}, [
		status,
		elapsed,
		totalBaseline
	]);
	const cycleRate = (0, import_react.useCallback)(() => {
		if (status === "idle") {
			setRateIndex((prev) => (prev + 1) % RATES.length);
			return;
		}
		setRateIndex((prev) => {
			const next = (prev + 1) % RATES.length;
			rateRef.current = RATES[next];
			window.speechSynthesis.cancel();
			speakFromRef.current(indexRef.current);
			if (status === "paused") window.speechSynthesis.pause();
			return next;
		});
	}, [status]);
	if (!supported) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerShell, {
		status,
		position: Math.min(elapsed * rate, totalBaseline),
		duration: totalBaseline,
		rate,
		onToggle: toggle,
		onSkip: skip,
		onCycleRate: cycleRate
	});
}
function ListenToArticle({ containerRef, narration, slug }) {
	if (narration) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioNarration, {
		...narration,
		slug
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeechNarration, {
		containerRef,
		slug
	});
}
function ShareButton({ title, slug }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: (0, import_react.useCallback)(async () => {
			const url = window.location.href;
			if (navigator.share) try {
				await navigator.share({
					title,
					url
				});
				track$1("post_shared", {
					slug,
					method: "webshare"
				});
				return;
			} catch {}
			await navigator.clipboard.writeText(url);
			track$1("post_shared", {
				slug,
				method: "clipboard"
			});
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		}, [title, slug]),
		className: "flex items-center gap-2 rounded-full px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
		children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-[13px] font-medium",
			children: copied ? "Link copied" : "Share"
		})]
	});
}
function BlogPostPage({ post }) {
	const morePosts = BLOG_POSTS.filter((p) => p.slug !== post.slug);
	const { Content } = post;
	const contentRef = (0, import_react.useRef)(null);
	useReadProgress(post.slug, contentRef);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative -mt-16 overflow-hidden",
			children: [post.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"aria-hidden": true,
				className: "absolute inset-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: post.image,
						alt: "",
						className: "blog-cover-img h-full w-full object-cover opacity-95 dark:opacity-80"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-background/15 dark:bg-background/25" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background via-background/65 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-background via-background/88 to-transparent" })
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"aria-hidden": true,
				className: "absolute inset-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogHeroBackdrop, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background via-background/65 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-background via-background/88 to-transparent" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-4xl px-6 pt-32 pb-24 text-center lg:pt-48",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex items-center justify-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/blog",
								className: "text-foreground/70 transition-colors hover:text-foreground",
								children: "← Blog"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground/50",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatBlogDate(post.date) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground/50",
								children: "·"
							}),
							post.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "border border-border px-2 py-0.5 text-foreground/70",
								children: tag
							}, tag))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mx-auto max-w-[42ch] font-display text-[2.3rem] font-light leading-[1.1] tracking-[-0.02em] text-foreground md:text-[3rem]",
						children: post.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-6 max-w-[60ch] text-[17px] leading-[1.6] text-foreground/80",
						children: post.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto mt-8 flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: post.author }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground/50",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: post.readingTime })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto mt-8 flex min-h-[2.6rem] max-w-lg items-center gap-4 border-t border-border pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-1 justify-start",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListenToArticle, {
								containerRef: contentRef,
								narration: getNarration(post.slug),
								slug: post.slug
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareButton, {
							title: post.title,
							slug: post.slug
						})]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
			className: "bg-background pt-6 pb-16 md:pb-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-shell px-6 lg:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:grid lg:grid-cols-[13rem_minmax(0,1fr)_13rem] lg:items-start lg:gap-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableOfContents, { containerRef: contentRef }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							ref: contentRef,
							"data-post-body": true,
							className: "mx-auto w-full min-w-0 max-w-[70ch]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prose, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {}) })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "hidden lg:block"
						})
					]
				})
			})
		}),
		post.image && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"aria-hidden": true,
			className: "relative mt-4 h-[180px] overflow-hidden md:h-[340px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: post.image,
					alt: "",
					loading: "lazy",
					className: "blog-cover-img h-full w-full object-cover object-bottom opacity-90 dark:opacity-70"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-background/25 dark:bg-background/35" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-background via-background/70 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background via-background/70 to-transparent" })
			]
		}),
		morePosts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-border bg-muted/20 py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-shell px-6 lg:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-8 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "More from the lab" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `grid grid-cols-1 gap-px border border-border bg-border ${morePosts.length > 1 ? "md:grid-cols-2" : ""}`,
					children: morePosts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/blog/$slug",
						params: { slug: p.slug },
						className: "group relative flex flex-col gap-3 overflow-hidden bg-background p-8 lg:p-10",
						children: [
							p.image && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"aria-hidden": true,
								className: "absolute inset-0 overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.image,
									alt: "",
									loading: "lazy",
									className: "blog-cover-img h-full w-full object-cover opacity-30 saturate-[0.85] transition-[opacity,filter] duration-700 group-hover:opacity-50 group-hover:saturate-110 dark:opacity-25 dark:group-hover:opacity-45"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/35" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
								children: [
									p.tags.join(" · "),
									" · ",
									formatBlogDate(p.date)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "relative font-display text-[19px] font-medium tracking-tight text-foreground transition-colors group-hover:text-accent",
								children: p.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "relative text-[14px] leading-relaxed text-muted-foreground",
								children: p.description
							})
						]
					}, p.slug))
				})]
			})
		})
	] });
}
function BlogPostRoute() {
	const { slug } = Route.useParams();
	const post = getBlogPost(slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogPostPage, { post }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { BlogPostRoute as component };
