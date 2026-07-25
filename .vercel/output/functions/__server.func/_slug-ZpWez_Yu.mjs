import { i as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { h as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as getBlogPost, i as formatBlogDate, r as Prose, t as BLOG_POSTS } from "./_ssr/blog-C1ZN1xJF.mjs";
import { t as Route } from "./_slug-OaQ4ObNM.mjs";
import { n as TopBar, t as SiteFooter } from "./_ssr/SiteFooter-Cgrkd3Pp.mjs";
import { i as Check, n as Pause, r as Link2, t as Play } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-ZpWez_Yu.js
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
		className: "sticky top-24 hidden max-h-[calc(100vh-7rem)] w-52 shrink-0 overflow-y-auto pr-2 lg:block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
			children: "On this page"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-1.5 border-l border-border",
			children: headings.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: h.level === 3 ? "ml-3" : "",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `#${h.id}`,
					className: `-ml-px block border-l-2 py-0.5 pl-3 text-[12.5px] leading-snug transition-colors ${activeId === h.id ? "border-accent font-medium text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`,
					children: h.text
				})
			}, h.id))
		})]
	});
}
var WORDS_PER_MINUTE = 175;
var MAX_CHUNK_CHARS = 180;
function formatClock(seconds) {
	const m = Math.floor(seconds / 60);
	const s = Math.round(seconds % 60);
	return `${m}:${String(s).padStart(2, "0")}`;
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
function ListenToArticle({ containerRef }) {
	const [supported, setSupported] = (0, import_react.useState)(false);
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [duration, setDuration] = (0, import_react.useState)(null);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const chunksRef = (0, import_react.useRef)([]);
	const indexRef = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
		const root = containerRef.current;
		if (!root) return;
		const text = collectSpeakableText(root);
		if (!text) return;
		chunksRef.current = splitIntoChunks(text);
		setDuration(text.split(/\s+/).length / WORDS_PER_MINUTE * 60);
		setSupported(true);
		return () => window.speechSynthesis.cancel();
	}, [containerRef]);
	const speakFrom = (0, import_react.useCallback)((index) => {
		const chunks = chunksRef.current;
		if (index >= chunks.length) {
			indexRef.current = 0;
			setProgress(0);
			setStatus("idle");
			return;
		}
		indexRef.current = index;
		setProgress(index / chunks.length);
		const utterance = new SpeechSynthesisUtterance(chunks[index]);
		utterance.rate = 1;
		utterance.onend = () => speakFrom(index + 1);
		utterance.onerror = () => setStatus("idle");
		window.speechSynthesis.speak(utterance);
	}, []);
	const toggle = (0, import_react.useCallback)(() => {
		const synth = window.speechSynthesis;
		if (status === "playing") {
			synth.pause();
			setStatus("paused");
		} else if (status === "paused") {
			synth.resume();
			setStatus("playing");
		} else {
			synth.cancel();
			setStatus("playing");
			speakFrom(0);
		}
	}, [status, speakFrom]);
	if (!supported) return null;
	const playing = status === "playing";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: toggle,
		"aria-label": playing ? "Pause article narration" : "Listen to article",
		className: "group relative flex items-center gap-3 overflow-hidden rounded-full border border-border px-4 py-2 transition-colors hover:bg-foreground/5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-6 shrink-0 place-items-center rounded-full bg-foreground text-background",
				children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3 translate-x-px fill-current" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-[13px] font-medium text-foreground",
				children: status === "idle" ? "Listen to article" : playing ? "Pause" : "Resume"
			}),
			duration !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[12px] tabular-nums text-muted-foreground",
				children: formatClock(duration)
			}),
			status !== "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "absolute inset-x-0 bottom-0 h-px origin-left bg-accent transition-transform duration-500",
				style: { transform: `scaleX(${progress})` }
			})
		]
	});
}
function ShareButton({ title }) {
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
				return;
			} catch {}
			await navigator.clipboard.writeText(url);
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		}, [title]),
		className: "flex items-center gap-2 rounded-full px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
		children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-[13px] font-medium",
			children: copied ? "Link copied" : "Share"
		})]
	});
}
var HERO_FADE = "linear-gradient(to bottom, black 0%, black 42%, rgba(0,0,0,0.55) 74%, transparent 100%)";
function BlogPostPage({ post }) {
	const morePosts = BLOG_POSTS.filter((p) => p.slug !== post.slug);
	const { Content } = post;
	const contentRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative -mt-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "blueprint-grid absolute inset-0",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-4xl px-6 pt-24 pb-10 text-center lg:pt-32",
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "border border-border px-2 py-0.5 text-foreground/70",
									children: post.tag
								})
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
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListenToArticle, { containerRef: contentRef })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareButton, { title: post.title })]
						})
					]
				})]
			}), post.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto max-w-6xl px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-sm",
					style: {
						maskImage: HERO_FADE,
						WebkitMaskImage: HERO_FADE
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: post.image,
						alt: "",
						className: "blog-cover-img h-[clamp(200px,34vw,420px)] w-full object-cover saturate-[0.92] dark:opacity-85 dark:saturate-[0.8]"
					})
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
			className: `bg-background pb-16 md:pb-20 ${post.image ? "pt-6" : "pt-16 md:pt-20"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-start gap-12 px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableOfContents, { containerRef: contentRef }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: contentRef,
					className: "min-w-0 flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prose, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {}) })
				})]
			})
		}),
		morePosts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-border bg-muted/20 py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6",
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
									p.tag,
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
