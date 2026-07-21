import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { _ as ResponsiveContainer, a as YAxis, c as Line, d as Bar, f as Radar, g as Cell, h as PolarGrid, i as LineChart, l as CartesianGrid, m as PolarRadiusAxis, n as RadarChart, o as XAxis, p as PolarAngleAxis, r as BarChart, s as Scatter, t as ScatterChart, u as ReferenceLine, v as Tooltip, y as Legend } from "../_libs/recharts+[...].mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-CKUsRWAJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Prose({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-w-0 max-w-[70ch]",
		children
	});
}
function P({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-5 text-[16px] leading-[1.75] text-foreground/85",
		children
	});
}
function H2({ id, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		id,
		className: "mb-4 mt-14 scroll-mt-24 font-display text-[25px] font-medium leading-tight tracking-tight text-foreground md:text-[28px]",
		children
	});
}
function H3({ id, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		id,
		className: "mb-3 mt-9 scroll-mt-24 font-display text-[18.5px] font-medium tracking-tight text-foreground",
		children
	});
}
function InlineCode({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
		className: "rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.86em] text-foreground",
		children
	});
}
function CodeBlock({ children, lang }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 overflow-hidden rounded-sm border border-border",
		children: [lang && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-b border-border bg-muted px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground",
			children: lang
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "overflow-x-auto bg-ink p-4 font-mono text-[13px] leading-relaxed text-ink-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children })
		})]
	});
}
function DataTable({ headers, rows, note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 overflow-x-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[420px] border-collapse text-[14px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: headers.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
				className: "border border-border bg-muted px-3 py-2 text-left font-display font-medium text-foreground",
				children: h
			}, h)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: row.map((cell, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "border border-border px-3 py-2 text-foreground/85",
				children: cell
			}, j)) }, i)) })]
		}), note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-[12.5px] text-muted-foreground",
			children: note
		})]
	});
}
function Figure({ n, caption, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "mb-6 overflow-hidden rounded-sm border border-border bg-muted/20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4 pt-5 md:p-6",
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
			className: "border-t border-border px-4 py-3 text-[13.5px] leading-relaxed text-muted-foreground md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mr-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/60",
				children: ["Fig. ", n]
			}), caption]
		})]
	});
}
function Details({ summary, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "group mb-6 rounded-sm border border-border bg-muted/30 px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
			className: "cursor-pointer list-none font-display text-[14.5px] font-medium text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mr-2 inline-block text-muted-foreground transition-transform group-open:rotate-90",
				children: "›"
			}), summary]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 text-[14.5px] leading-relaxed text-foreground/80 [&>p:last-child]:mb-0",
			children
		})]
	});
}
function Hr() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-12 border-border" });
}
function FootnoteRef({ id }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: `#fn-${id}`,
		id: `fnref-${id}`,
		className: "text-accent no-underline",
		children: [
			"[",
			id,
			"]"
		]
	}) });
}
function Notes({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "space-y-3 text-[13.5px] leading-relaxed text-muted-foreground",
		children
	});
}
function Note({ id, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		id: `fn-${id}`,
		className: "flex gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "shrink-0 text-foreground/60",
			children: [
				"[",
				id,
				"]"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			children,
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `#fnref-${id}`,
				className: "ml-1 text-accent",
				children: "↩"
			})
		] })]
	});
}
function References({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "mb-5 list-decimal space-y-3 pl-5 text-[14px] leading-relaxed text-muted-foreground",
		children
	});
}
function StepChip({ step, active, onHover, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onMouseEnter: onHover,
		onFocus: onHover,
		className: `rounded-sm border px-3 py-2 text-left font-display text-[13px] font-medium transition-colors ${active ? tone === "accent" ? "border-accent bg-accent/10 text-foreground" : "border-foreground/50 bg-foreground/5 text-foreground" : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"}`,
		children: step.title
	});
}
function TrustBoundaryDiagram({ probabilistic, verified }) {
	const [active, setActive] = (0, import_react.useState)(null);
	const activeStep = active ? (active.zone === "prob" ? probabilistic : verified)[active.index] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-sm border border-dashed border-foreground/30 bg-muted/10 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground",
				children: "Probabilistic — the model"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-3",
				children: probabilistic.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepChip, {
					step,
					tone: "amber",
					active: active?.zone === "prob" && active.index === i,
					onHover: () => setActive({
						zone: "prob",
						index: i
					})
				}, step.title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative my-3 flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "h-0 flex-1 border-t border-dashed border-foreground/30",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "relative z-10 bg-background px-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground",
					children: "trust boundary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "h-0 flex-1 border-t border-dashed border-foreground/30",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-accent"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-sm border border-border bg-muted/20 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-accent",
				children: "Verified — deterministic"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-3",
				children: verified.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepChip, {
					step,
					tone: "accent",
					active: active?.zone === "verified" && active.index === i,
					onHover: () => setActive({
						zone: "verified",
						index: i
					})
				}, step.title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 min-h-[3.6em] rounded-sm border border-border bg-background px-4 py-3 text-[13.5px] leading-relaxed text-foreground/85",
			children: activeStep ? activeStep.detail : "Hover or focus a step above to read what it does."
		})
	] });
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var THEMES = {
	light: "",
	dark: ".dark"
};
var ChartContext = import_react.createContext(null);
function useChart() {
	const context = import_react.useContext(ChartContext);
	if (!context) throw new Error("useChart must be used within a <ChartContainer />");
	return context;
}
var ChartContainer = import_react.forwardRef(({ id, className, children, config, ...props }, ref) => {
	const uniqueId = import_react.useId();
	const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContext.Provider, {
		value: { config },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-chart": chartId,
			ref,
			className: cn("flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none", className),
			...props,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartStyle, {
				id: chartId,
				config
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children })]
		})
	});
});
ChartContainer.displayName = "Chart";
var ChartStyle = ({ id, config }) => {
	const colorConfig = Object.entries(config).filter(([, config]) => config.theme || config.color);
	if (!colorConfig.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { dangerouslySetInnerHTML: { __html: Object.entries(THEMES).map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
		const color = itemConfig.theme?.[theme] || itemConfig.color;
		return color ? `  --color-${key}: ${color};` : null;
	}).join("\n")}
}
`).join("\n") } });
};
var ChartTooltip = Tooltip;
var ChartTooltipContent = import_react.forwardRef(({ active, payload, className, indicator = "dot", hideLabel = false, hideIndicator = false, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey }, ref) => {
	const { config } = useChart();
	const tooltipLabel = import_react.useMemo(() => {
		if (hideLabel || !payload?.length) return null;
		const [item] = payload;
		const itemConfig = getPayloadConfigFromPayload(config, item, `${labelKey || item?.dataKey || item?.name || "value"}`);
		const value = !labelKey && typeof label === "string" ? config[label]?.label || label : itemConfig?.label;
		if (labelFormatter) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("font-medium", labelClassName),
			children: labelFormatter(value, payload)
		});
		if (!value) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("font-medium", labelClassName),
			children: value
		});
	}, [
		label,
		labelFormatter,
		payload,
		hideLabel,
		labelClassName,
		config,
		labelKey
	]);
	if (!active || !payload?.length) return null;
	const nestLabel = payload.length === 1 && indicator !== "dot";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: cn("grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl", className),
		children: [!nestLabel ? tooltipLabel : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-1.5",
			children: payload.filter((item) => item.type !== "none").map((item, index) => {
				const itemConfig = getPayloadConfigFromPayload(config, item, `${nameKey || item.name || item.dataKey || "value"}`);
				const indicatorColor = color || item.payload.fill || item.color;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground", indicator === "dot" && "items-center"),
					children: formatter && item?.value !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [itemConfig?.icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)", {
							"h-2.5 w-2.5": indicator === "dot",
							"w-1": indicator === "line",
							"w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
							"my-0.5": nestLabel && indicator === "dashed"
						}),
						style: {
							"--color-bg": indicatorColor,
							"--color-border": indicatorColor
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [nestLabel ? tooltipLabel : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: itemConfig?.label || item.name
							})]
						}), item.value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono font-medium tabular-nums text-foreground",
							children: item.value.toLocaleString()
						})]
					})] })
				}, item.dataKey);
			})
		})]
	});
});
ChartTooltipContent.displayName = "ChartTooltip";
var ChartLegend = Legend;
var ChartLegendContent = import_react.forwardRef(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
	const { config } = useChart();
	if (!payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className),
		children: payload.filter((item) => item.type !== "none").map((item) => {
			const itemConfig = getPayloadConfigFromPayload(config, item, `${nameKey || item.dataKey || "value"}`);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"),
				children: [itemConfig?.icon && !hideIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(itemConfig.icon, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-2 w-2 shrink-0 rounded-[2px]",
					style: { backgroundColor: item.color }
				}), itemConfig?.label]
			}, item.value);
		})
	});
});
ChartLegendContent.displayName = "ChartLegend";
function getPayloadConfigFromPayload(config, payload, key) {
	if (typeof payload !== "object" || payload === null) return;
	const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
	let configLabelKey = key;
	if (key in payload && typeof payload[key] === "string") configLabelKey = payload[key];
	else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") configLabelKey = payloadPayload[key];
	return configLabelKey in config ? config[configLabelKey] : config[key];
}
var AMBER = {
	light: "oklch(0.58 0.16 40)",
	dark: "oklch(0.75 0.15 45)"
};
var TEAL = {
	light: "oklch(0.44 0.1 165)",
	dark: "oklch(0.7 0.12 165)"
};
var NEUTRAL = {
	light: "oklch(0.55 0.02 250)",
	dark: "oklch(0.65 0.02 250)"
};
var NEGATIVE = {
	light: "oklch(0.55 0.18 25)",
	dark: "oklch(0.7 0.16 25)"
};
var tooltipCursor = {
	fill: "var(--muted)",
	opacity: .4
};
function tooltipRow(label, value) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-full items-center justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono font-medium tabular-nums text-foreground",
			children: value
		})]
	});
}
var headlineAccuracyConfig = {
	unaided: {
		label: "Unaided",
		theme: AMBER
	},
	kernel: {
		label: "Behind the kernel",
		color: "var(--accent)"
	}
};
var headlineAccuracyData = [{
	label: "Claude Opus 4.8",
	unaided: 54,
	kernel: 100
}, {
	label: "Claude Fable 5",
	unaided: 61,
	kernel: 100
}];
function HeadlineAccuracyChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: headlineAccuracyConfig,
		className: "aspect-[16/10] w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
			data: headlineAccuracyData,
			margin: {
				top: 8,
				right: 8,
				left: -12,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { vertical: false }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: "label",
					tickLine: false,
					axisLine: false,
					fontSize: 12
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					tickLine: false,
					axisLine: false,
					domain: [0, 100],
					tickFormatter: (v) => `${v}%`,
					width: 40,
					fontSize: 12
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
					cursor: tooltipCursor,
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, { formatter: (value, name) => tooltipRow(name, `${value}%`) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegendContent, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "unaided",
					fill: "var(--color-unaided)",
					radius: [
						3,
						3,
						0,
						0
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "kernel",
					fill: "var(--color-kernel)",
					radius: [
						3,
						3,
						0,
						0
					]
				})
			]
		})
	});
}
var paretoConfig = {
	opus: {
		label: "Claude Opus 4.8",
		theme: AMBER
	},
	fable: {
		label: "Claude Fable 5",
		theme: TEAL
	},
	haiku: {
		label: "Claude Haiku 4.5",
		theme: NEUTRAL
	}
};
var opusArms = [
	{
		cost: 18.08,
		acc: 54,
		arm: "Opus 4.8 · unaided"
	},
	{
		cost: 1.32,
		acc: 100,
		arm: "Opus 4.8 · verified"
	},
	{
		cost: 4.44,
		acc: 100,
		arm: "Opus 4.8 · verified + self-consistency"
	}
];
var fableArms = [
	{
		cost: 16.92,
		acc: 61,
		arm: "Fable 5 · unaided"
	},
	{
		cost: 3.63,
		acc: 100,
		arm: "Fable 5 · verified"
	},
	{
		cost: 11.44,
		acc: 100,
		arm: "Fable 5 · verified + self-consistency"
	}
];
var haikuArms = [
	{
		cost: 2.05,
		acc: 3,
		arm: "Haiku 4.5 · unaided"
	},
	{
		cost: .22,
		acc: 82,
		arm: "Haiku 4.5 · verified"
	},
	{
		cost: 1.1,
		acc: 85,
		arm: "Haiku 4.5 · verified + self-consistency"
	}
];
function ParetoTooltip({ active, payload }) {
	if (!active || !payload?.length) return null;
	const p = payload[0].payload;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-sm border border-border bg-background px-3 py-2 text-xs shadow-lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-medium text-foreground",
			children: p.arm
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-1 flex gap-3 font-mono text-[11px] text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				"$",
				p.cost.toFixed(2),
				"/run"
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [p.acc, "% correct"] })]
		})]
	});
}
function CostAccuracyParetoChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: paretoConfig,
		className: "aspect-[16/11] w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScatterChart, {
			margin: {
				top: 8,
				right: 16,
				left: -8,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					type: "number",
					dataKey: "cost",
					scale: "log",
					domain: [.15, 22],
					tickFormatter: (v) => `$${v}`,
					tickLine: false,
					axisLine: false,
					fontSize: 12,
					label: {
						value: "Cost per full run (log scale)",
						position: "insideBottom",
						offset: -2,
						fontSize: 11
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					type: "number",
					dataKey: "acc",
					domain: [0, 100],
					tickFormatter: (v) => `${v}%`,
					tickLine: false,
					axisLine: false,
					width: 40,
					fontSize: 12
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParetoTooltip, {}),
					cursor: { strokeDasharray: "3 3" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, { content: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap items-center justify-center gap-4 pt-3 text-xs",
					children: [
						"opus",
						"fable",
						"haiku"
					].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-2 w-2 shrink-0 rounded-[2px]",
							style: { backgroundColor: `var(--color-${key})` }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: paretoConfig[key].label
						})]
					}, key))
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scatter, {
					name: "Claude Opus 4.8",
					data: opusArms,
					fill: "var(--color-opus)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scatter, {
					name: "Claude Fable 5",
					data: fableArms,
					fill: "var(--color-fable)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scatter, {
					name: "Claude Haiku 4.5",
					data: haikuArms,
					fill: "var(--color-haiku)"
				})
			]
		})
	});
}
var latencyConfig = {
	llm: {
		label: "Model reasoning",
		theme: AMBER
	},
	kernel: {
		label: "Kernel",
		color: "var(--accent)"
	}
};
var latencyData = [
	{
		label: "Opus 4.8 · unaided",
		llm: 68.08,
		kernel: 0
	},
	{
		label: "Opus 4.8 · verified",
		llm: 3.32,
		kernel: 2.78
	},
	{
		label: "Fable 5 · unaided",
		llm: 25.91,
		kernel: 0
	},
	{
		label: "Fable 5 · verified",
		llm: 7.59,
		kernel: 3.75
	},
	{
		label: "Haiku 4.5 · unaided",
		llm: 23.75,
		kernel: 0
	},
	{
		label: "Haiku 4.5 · verified",
		llm: 1.92,
		kernel: 3.63
	}
];
function LatencyByArmChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: latencyConfig,
		className: "aspect-[16/13] w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
			data: latencyData,
			layout: "vertical",
			margin: {
				top: 8,
				right: 16,
				left: 8,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { horizontal: false }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					type: "number",
					tickFormatter: (v) => `${v}s`,
					tickLine: false,
					axisLine: false,
					fontSize: 12
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					type: "category",
					dataKey: "label",
					tickLine: false,
					axisLine: false,
					width: 130,
					fontSize: 11
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
					cursor: tooltipCursor,
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, { formatter: (value, name) => tooltipRow(name, `${value}s`) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegendContent, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "llm",
					stackId: "t",
					fill: "var(--color-llm)",
					radius: [
						0,
						0,
						0,
						0
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "kernel",
					stackId: "t",
					fill: "var(--color-kernel)",
					radius: [
						0,
						3,
						3,
						0
					]
				})
			]
		})
	});
}
var bagCountConfig = {
	wrong: {
		label: "Cases got wrong",
		theme: NEGATIVE
	},
	right: {
		label: "Cases got right",
		color: "var(--accent)"
	}
};
var bagCountData = [{
	label: "Claude Opus 4.8",
	wrong: 9.78,
	wrongN: 46,
	right: 9.91,
	rightN: 54
}, {
	label: "Claude Fable 5",
	wrong: 9.87,
	wrongN: 39,
	right: 9.84,
	rightN: 61
}];
function BagCountAggregateChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: bagCountConfig,
		className: "aspect-[16/10] w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
			data: bagCountData,
			margin: {
				top: 8,
				right: 8,
				left: -12,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { vertical: false }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: "label",
					tickLine: false,
					axisLine: false,
					fontSize: 12
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					tickLine: false,
					axisLine: false,
					domain: [0, 12],
					tickCount: 5,
					width: 30,
					fontSize: 12
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
					cursor: tooltipCursor,
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, { formatter: (value, name, item) => {
						return tooltipRow(name, `${value} avg (n=${item.dataKey === "wrong" ? item.payload.wrongN : item.payload.rightN})`);
					} })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegendContent, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "wrong",
					fill: "var(--color-wrong)",
					radius: [
						3,
						3,
						0,
						0
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "right",
					fill: "var(--color-right)",
					radius: [
						3,
						3,
						0,
						0
					]
				})
			]
		})
	});
}
var kSlotsConfig = {
	opus: {
		label: "Claude Opus 4.8",
		theme: AMBER
	},
	fable: {
		label: "Claude Fable 5",
		theme: TEAL
	}
};
var kSlotsData = [
	{
		label: "K = 0",
		opus: 0,
		opusFrac: "0 of 23",
		fable: 0,
		fableFrac: "0 of 23"
	},
	{
		label: "K = 1",
		opus: 92.3,
		opusFrac: "12 of 13",
		fable: 61.5,
		fableFrac: "8 of 13"
	},
	{
		label: "K = 2",
		opus: 62.5,
		opusFrac: "30 of 48",
		fable: 56.3,
		fableFrac: "27 of 48"
	},
	{
		label: "K = 3",
		opus: 25,
		opusFrac: "4 of 16",
		fable: 25,
		fableFrac: "4 of 16"
	}
];
function FailureByKChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: kSlotsConfig,
		className: "aspect-[16/10] w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
			data: kSlotsData,
			margin: {
				top: 8,
				right: 8,
				left: -12,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { vertical: false }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: "label",
					tickLine: false,
					axisLine: false,
					fontSize: 12
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					tickLine: false,
					axisLine: false,
					domain: [0, 100],
					tickFormatter: (v) => `${v}%`,
					width: 40,
					fontSize: 12
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
					cursor: tooltipCursor,
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, { formatter: (value, name, item) => {
						return tooltipRow(name, `${item.dataKey === "opus" ? item.payload.opusFrac : item.payload.fableFrac} failed`);
					} })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegendContent, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "opus",
					fill: "var(--color-opus)",
					radius: [
						3,
						3,
						0,
						0
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "fable",
					fill: "var(--color-fable)",
					radius: [
						3,
						3,
						0,
						0
					]
				})
			]
		})
	});
}
var cabinConfig = {
	opus: {
		label: "Claude Opus 4.8",
		theme: AMBER
	},
	fable: {
		label: "Claude Fable 5",
		theme: TEAL
	}
};
var cabinData = [
	{
		label: "Basic Economy",
		opus: 0,
		opusFrac: "0 of 14",
		fable: 0,
		fableFrac: "0 of 14"
	},
	{
		label: "Main Cabin",
		opus: 41.2,
		opusFrac: "7 of 17",
		fable: 17.6,
		fableFrac: "3 of 17"
	},
	{
		label: "First",
		opus: 25,
		opusFrac: "5 of 20",
		fable: 35,
		fableFrac: "7 of 20"
	},
	{
		label: "Business",
		opus: 52,
		opusFrac: "13 of 25",
		fable: 28,
		fableFrac: "7 of 25"
	},
	{
		label: "Premium Economy",
		opus: 78.6,
		opusFrac: "11 of 14",
		fable: 85.7,
		fableFrac: "12 of 14"
	},
	{
		label: "Main Plus",
		opus: 100,
		opusFrac: "10 of 10",
		fable: 100,
		fableFrac: "10 of 10"
	}
];
function FailureByCabinClassChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: cabinConfig,
		className: "aspect-[16/14] w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
			data: cabinData,
			layout: "vertical",
			margin: {
				top: 8,
				right: 16,
				left: 8,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { horizontal: false }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					type: "number",
					domain: [0, 100],
					tickFormatter: (v) => `${v}%`,
					tickLine: false,
					axisLine: false,
					fontSize: 12
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					type: "category",
					dataKey: "label",
					tickLine: false,
					axisLine: false,
					width: 110,
					fontSize: 11
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
					cursor: tooltipCursor,
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, { formatter: (value, name, item) => {
						return tooltipRow(name, `${item.dataKey === "opus" ? item.payload.opusFrac : item.payload.fableFrac} failed`);
					} })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegendContent, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "opus",
					fill: "var(--color-opus)",
					radius: [
						0,
						3,
						3,
						0
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "fable",
					fill: "var(--color-fable)",
					radius: [
						0,
						3,
						3,
						0
					]
				})
			]
		})
	});
}
var radarConfig = {
	baseline: {
		label: "Baseline (LLM only)",
		theme: AMBER
	},
	verified: {
		label: "Verified (Lean)",
		color: "var(--accent)"
	}
};
var radarData = [
	{
		metric: "Verdict accuracy",
		baseline: 96.8,
		verified: 100
	},
	{
		metric: "Sensitivity",
		baseline: 90,
		verified: 100
	},
	{
		metric: "Specificity",
		baseline: 100,
		verified: 100
	},
	{
		metric: "Mimic accuracy",
		baseline: 90,
		verified: 100
	},
	{
		metric: "Boundary / arithmetic",
		baseline: 100,
		verified: 100
	},
	{
		metric: "Entry-gate",
		baseline: 100,
		verified: 100
	},
	{
		metric: "Run-to-run consistency",
		baseline: 98,
		verified: 100
	}
];
function HeadlineMetricsRadar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: radarConfig,
		className: "mx-auto aspect-square max-h-[380px] w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
			data: radarData,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
					dataKey: "metric",
					fontSize: 11
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarRadiusAxis, {
					domain: [80, 100],
					tickFormatter: (v) => `${v}%`,
					fontSize: 10
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, { formatter: (value, name) => tooltipRow(name, `${value}%`) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegendContent, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
					name: "Baseline (LLM only)",
					dataKey: "baseline",
					stroke: "var(--color-baseline)",
					fill: "var(--color-baseline)",
					fillOpacity: .22
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
					name: "Verified (Lean)",
					dataKey: "verified",
					stroke: "var(--color-verified)",
					fill: "var(--color-verified)",
					fillOpacity: .12
				})
			]
		})
	});
}
var categoryConfig = {
	clear: {
		label: "Structural / clear cases",
		theme: NEUTRAL
	},
	mimic: {
		label: "Mimic cases",
		theme: AMBER
	}
};
var categoryData = [
	{
		label: "Clear SLE",
		n: 10,
		acc: 100,
		kind: "clear"
	},
	{
		label: "Sub-threshold",
		n: 7,
		acc: 100,
		kind: "clear"
	},
	{
		label: "ANA-negative",
		n: 6,
		acc: 100,
		kind: "clear"
	},
	{
		label: "Boundary / arithmetic",
		n: 11,
		acc: 100,
		kind: "clear"
	},
	{
		label: "Drug-induced mimic",
		n: 8,
		acc: 92.5,
		kind: "mimic"
	},
	{
		label: "Infection mimic",
		n: 8,
		acc: 87.5,
		kind: "mimic"
	}
];
function CategoryAccuracyChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: categoryConfig,
		className: "aspect-[16/12] w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
			data: categoryData,
			margin: {
				top: 8,
				right: 8,
				left: -12,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { vertical: false }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: "label",
					tickLine: false,
					axisLine: false,
					fontSize: 10.5,
					interval: 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					tickLine: false,
					axisLine: false,
					domain: [80, 100],
					tickFormatter: (v) => `${v}%`,
					width: 40,
					fontSize: 12
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
					y: 100,
					stroke: "var(--accent)",
					strokeDasharray: "4 4",
					label: {
						value: "Verified · 100% across all categories",
						position: "insideTopLeft",
						fontSize: 10.5,
						fill: "var(--accent)"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
					cursor: tooltipCursor,
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
						hideIndicator: true,
						formatter: (value, _name, item) => tooltipRow("Baseline accuracy", `${value}% (n=${item.payload.n})`)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "acc",
					radius: [
						3,
						3,
						0,
						0
					],
					children: categoryData.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.kind === "mimic" ? "var(--color-mimic)" : "var(--color-clear)" }, d.label))
				})
			]
		})
	});
}
function MatrixCell({ label, value, tone }) {
	const [hover, setHover] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		onMouseEnter: () => setHover(true),
		onMouseLeave: () => setHover(false),
		className: `relative flex flex-1 flex-col items-center justify-center gap-1 border p-3 text-center transition-transform ${tone === "bad" ? "border-[var(--chart-negative)]/50 bg-[var(--chart-negative)]/10" : tone === "good" ? "border-accent/40 bg-accent/10" : "border-border bg-muted/20"} ${hover ? "scale-[1.03]" : ""}`,
		style: { "--chart-negative": "oklch(0.55 0.18 25)" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-[22px] font-medium leading-none text-foreground",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted-foreground",
			children: label
		})]
	});
}
function ConfusionMatrix({ title, tp, fn, fp, tn }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-2 text-center font-display text-[13px] font-medium text-foreground",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-px overflow-hidden rounded-sm border border-border bg-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-px",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatrixCell, {
					label: "True positive",
					value: tp,
					tone: "good"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatrixCell, {
					label: "False negative",
					value: fn,
					tone: fn > 0 ? "bad" : "neutral"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-px",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatrixCell, {
					label: "False positive",
					value: fp,
					tone: fp > 0 ? "bad" : "neutral"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatrixCell, {
					label: "True negative",
					value: tn,
					tone: "good"
				})]
			})]
		})]
	});
}
function ConfusionMatrixFigure() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8 sm:flex-row sm:gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfusionMatrix, {
			title: "Baseline (LLM only)",
			tp: 18,
			fn: 2,
			fp: 0,
			tn: 30
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfusionMatrix, {
			title: "Verified (autoformalization + Lean)",
			tp: 20,
			fn: 0,
			fp: 0,
			tn: 30
		})]
	});
}
var runScoreConfig = { score: {
	label: "Baseline score",
	color: "var(--muted-foreground)"
} };
var caseAData = [
	{
		run: "Run 1",
		score: 10,
		verdict: "negative"
	},
	{
		run: "Run 2",
		score: 16,
		verdict: "positive"
	},
	{
		run: "Run 3",
		score: 16,
		verdict: "positive"
	},
	{
		run: "Run 4",
		score: 10,
		verdict: "negative"
	},
	{
		run: "Run 5",
		score: 10,
		verdict: "negative"
	}
];
function CaseADot(props) {
	const { cx, cy, payload } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx,
		cy,
		r: 5,
		fill: payload.verdict === "positive" ? "var(--accent)" : "oklch(0.58 0.18 25)",
		stroke: "var(--background)",
		strokeWidth: 2
	});
}
function CaseATooltip({ active, payload }) {
	if (!active || !payload?.length) return null;
	const p = payload[0].payload;
	const correct = p.verdict === "positive";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-sm border border-border bg-background px-3 py-2 text-xs shadow-lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "font-medium text-foreground",
			children: [
				p.run,
				" · score ",
				p.score
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `mt-1 font-mono text-[11px] ${correct ? "text-accent" : ""}`,
			style: !correct ? { color: "oklch(0.58 0.18 25)" } : void 0,
			children: [
				"verdict: ",
				p.verdict,
				" ",
				correct ? "(correct)" : "(wrong — this is genuine lupus)"
			]
		})]
	});
}
function RunVerdictFigure() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-[13px] font-medium text-foreground",
				children: "Case A · hydralazine + anti-dsDNA (genuine lupus)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground",
				children: "Verified: positive, all 5 runs"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
			config: runScoreConfig,
			className: "aspect-[16/7] w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data: caseAData,
				margin: {
					top: 8,
					right: 16,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { vertical: false }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "run",
						tickLine: false,
						axisLine: false,
						fontSize: 11,
						padding: {
							left: 16,
							right: 16
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						domain: [0, 20],
						tickLine: false,
						axisLine: false,
						width: 28,
						fontSize: 11
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
						y: 10,
						stroke: "var(--muted-foreground)",
						strokeDasharray: "4 4",
						label: {
							value: "classification threshold",
							position: "insideTopRight",
							fontSize: 10,
							fill: "var(--muted-foreground)"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseATooltip, {}),
						cursor: { strokeDasharray: "3 3" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						dataKey: "score",
						stroke: "var(--muted-foreground)",
						strokeWidth: 1.5,
						isAnimationActive: false,
						dot: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseADot, {}),
						activeDot: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseADot, {})
					})
				]
			})
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-[13px] font-medium text-foreground",
					children: "Case B · treated HIV + anti-dsDNA (genuine lupus)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground",
					children: "Verified: positive, all 5 runs"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-5 gap-2",
				children: [
					"Run 1",
					"Run 2",
					"Run 3",
					"Run 4",
					"Run 5"
				].map((run) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-1.5 rounded-sm border p-2.5 text-center",
					style: {
						borderColor: "oklch(0.58 0.18 25 / 0.4)",
						background: "oklch(0.58 0.18 25 / 0.08)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted-foreground",
						children: run
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[12px] font-medium",
						style: { color: "oklch(0.58 0.18 25)" },
						children: "Negative"
					})]
				}, run))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-[12px] text-muted-foreground",
				children: "Consistent this time, and consistently wrong — a stable derivation, not a drifting one."
			})
		] })]
	});
}
function FluentIsNotTheSameAsCorrect() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Thomas is flying First Class from Montreal to Portland with ten checked bags. Apply the airline's own published fee schedule to his itinerary, in full, and the total is $3,445. Hand a frontier language model the same published rules, in full, and ask it to compute the same total, and it answers $3,185. Hand the identical question, the identical rules, to a second, newer, more capable model from the same lab, and it also answers $3,185." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"Two different models. One wrong number, shared exactly. That agreement is the finding this post is built around. When we set out to test our verification architecture on a domain we did not design it for, we expected some rate of unaided error - models make mistakes. We did not expect the mistakes to be ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "the same" }),
			" ",
			"mistake, down to the dollar, on the majority of cases both models got wrong. That is not the signature of noise. It is the signature of a rule that both models are misreading in the same specific way."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"This is a follow-on to our earlier work formalizing clinical diagnostic criteria in Lean 4",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FootnoteRef, { id: "1" }),
			". That project showed the architecture works on rules we chose, in a domain we understood deeply, against a benchmark we built ourselves. This one asks a less comfortable question: does it survive contact with a benchmark somebody else designed, ground truth we did not author, ninety-five rules across a real airline's actual fee schedule, and the newest models Anthropic has shipped? We think the honest answer, laid out below with the numbers that support it, is yes - and the way it fails is at least as informative as the way it succeeds."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "measuring-the-case",
			children: "Measuring the case, not the average"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Start with a distinction that shapes everything downstream, because it is easy to blur and the whole architecture depends on keeping it sharp." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"A benchmark score is a statement about a sample. Run a model over a hundred problems, count how many it gets right, and you have learned something true and useful about the model ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "in aggregate" }),
			" - but nothing at all about the one problem a real customer is asking about right now. Evaluation, in this sense, measures the average."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"Verification asks a narrower, more useful question of a single case: does ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "this" }),
			" conclusion follow from ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "these" }),
			" rules, applied to ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "these" }),
			" facts, without a gap? A deterministic program can answer that question the same way every time, for any one case, independent of whatever the aggregate accuracy across a thousand other cases happens to be. That is the property we are actually after - not a higher score, but a guarantee that travels with the individual answer."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The architecture we test below is the same one we've used before: a language model reads unstructured input and proposes a structured set of facts - nothing more - and a small, independently checkable program takes those facts and derives the answer. The model's only job is reading. The deciding is done by code a domain expert can open and read line by line." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "borrowing-a-harder-exam",
			children: "Borrowing a harder exam"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "A benchmark and a verification kernel built by the same team, at the same time, will tend to agree with each other - that's true regardless of domain, and it's a fair objection to any hand-built test. We wanted a test we couldn't be accused of having set up to pass: a benchmark we did not write, with ground truth we did not compute ourselves." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"So we went looking for a benchmark we had no hand in: independently authored, independently graded, and hard enough that published results already showed frontier models struggling with it. We settled on ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "RuleArena" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FootnoteRef, { id: "2" }),
			", a 2025 benchmark purpose-built to probe exactly this failure mode - language models applying real-world rules that ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "read" }),
			" like simple lookups but are quietly procedural. RuleArena spans three domains - airline baggage fees, NBA transaction legality, and tax - each graded by the benchmark's own reference implementation rather than by a human rater. We chose the airline domain specifically because that reference implementation is executable: a Python program we could run ourselves, case by case, to check our own re-encoding of the rules against an authority we did not write."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"We took the 100 hardest problems in that domain - RuleArena's own \"Level 3\" tier - and ran them against ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineCode, { children: "claude-opus-4-8" }),
			" ",
			"and ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineCode, { children: "claude-fable-5" }),
			", Anthropic's current frontier and most-capable models, unaided, with the airline's actual published fee rules supplied as the system prompt. Then we built an extractor-plus-kernel architecture in Catala - a language model that only reads, a deterministic program that only decides - and ran the same 100 cases through it."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Details, {
			summary: "Why RuleArena and not another benchmark we checked",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Before settling on RuleArena, we tested SARA, the Statutory Reasoning Assessment built from the US Internal Revenue Code - a well-cited, rigorously constructed benchmark. Run against current frontier models with a properly structured evaluation, it turned out to be close to saturated: 99 of 100 numeric cases correct for Opus 4.8, 100 of 100 for Fable 5. A saturated benchmark can't demonstrate what a verification layer buys you, because there's no unaided error left to fix. We report this rather than quietly dropping it, because a benchmark choice that isn't defensible on its own terms undercuts everything measured afterward." })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "clause-optimization",
			children: "The clause that turns a table into an optimization"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The published fee policy reads like a spreadsheet: a base fee by bag position - first, second, third, and beyond - that varies by route and cabin class; a surcharge if a bag is oversized; a surcharge if it's overweight; and, for some route-and-class combinations, the first bag or two are complimentary. Read left to right, bag by bag, and you'd apply it exactly the way you'd fill in a spreadsheet." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"The airline's own reference computation does something the table never states outright. When a passenger's route and class entitle them to, say, two complimentary bag slots, the airline does not hand that complimentary status to whichever two bags happen to be listed first on the itinerary. It assigns the free slots to whichever bags would otherwise have cost the ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "most" }),
			" in oversize and overweight surcharges - a small combinatorial optimization, minimizing the passenger's total, sitting quietly underneath a policy that reads like plain data entry. It is exactly the kind of clause a fluent reader glides past, because nothing about the table's formatting flags it as a decision rather than a fact."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "translator-not-judge",
			children: "A translator, not a judge"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The design places a hard boundary between the one probabilistic step and everything after it." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 1,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "RuleArena's rules and its own reference script are the ground truth we build against. The Catala kernel is hand-written from the rules text and checked against that reference script on all 100 cases before being trusted for anything downstream. Every number in this post is generated directly from one logged experiment run - nothing here is hand-recomputed." }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBoundaryDiagram, {
				probabilistic: [{
					title: "Language model",
					detail: "Reads a passenger's itinerary - fare, cabin class, route, and every checked bag - and extracts those facts as a structured record. It does not total a fee, and it is told explicitly not to."
				}],
				verified: [{
					title: "Catala kernel",
					detail: "Derives the total: the base fee at each bag position, every oversize and overweight surcharge, and the free-slot assignment - computed as an actual optimization, not assumed to fall on the first N bags."
				}, {
					title: "Cross-checked vs. reference script",
					detail: "Validated against RuleArena's own reference implementation on all 100 cases before a single number produced by the kernel was trusted for this post."
				}]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "A language model reads a passenger's itinerary - the fare, the cabin class, the route, and the size and weight of every checked bag - and extracts those facts as a structured record. It does not total a fee, and it is told explicitly not to. A Catala program takes that record and derives the total: the base fee owed at each bag position, every oversize and overweight surcharge, and the free-slot assignment, computed as an actual optimization rather than assumed to fall on the first N bags." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "That optimization is three lines:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
			lang: "catala",
			children: `declaration insert_top3
  content Top3
  depends on acc content Top3, x content money
  equals
    if x > acc.v1 then Top3 { -- v1: x -- v2: acc.v1 -- v3: acc.v2 }
    else if x > acc.v2 then Top3 { -- v1: acc.v1 -- v2: x -- v3: acc.v2 }
    else if x > acc.v3 then Top3 { -- v1: acc.v1 -- v2: acc.v2 -- v3: x }
    else acc`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineCode, { children: "Top3" }), " tracks the three largest surcharges seen so far as the kernel folds over a passenger's bags; folding it to the end yields exactly the bags that should receive the complimentary slots, because this fee schedule never grants more than three. It's a bounded insertion rather than a call to a sort function, because Catala's list primitives don't include one - the constraint that a proof-checkable language keeps its primitives small is a feature, not a limitation, here. We validated this re-encoding the only way that means anything: running it against RuleArena's own reference script on all 100 cases before trusting a single number it produced."] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "what-we-measured",
			children: "What we measured"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Three tiers, each run once unaided and once behind the kernel, over the same 100 cases." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			headers: [
				"",
				"Claude Opus 4.8",
				"Claude Fable 5"
			],
			rows: [
				[
					"Unaided, full rules supplied",
					"54 / 100 correct",
					"61 / 100 correct"
				],
				[
					"Behind the kernel",
					"100 / 100 correct",
					"100 / 100 correct"
				],
				[
					"Cost per full run",
					"$18.08 → $1.32",
					"$16.92 → $3.63"
				],
				[
					"Time per case",
					"68.1s → 6.1s",
					"25.9s → 11.3s"
				]
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 2,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Unaided accuracy sits well under perfect for both frontier tiers; every kernel-backed arm reaches it, with one informative exception discussed below." }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadlineAccuracyChart, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Both frontier models fail this benchmark unaided at a rate that isn't close to zero - 46 of 100 cases for Opus 4.8, 39 of 100 for Fable 5 - even with the complete published rules in front of them and an explicit sentence telling them the free-slot assignment is a choice, not a default. This wasn't a case of the models lacking information. The kernel, reading the identical facts, is exact on all 100." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 3,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "The kernel-backed systems win on accuracy and cost at the same time here - there's no tradeoff to negotiate. Hover a point for the exact arm, cost, and accuracy." }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CostAccuracyParetoChart, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 4,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "The unaided models spend tens of seconds reasoning through the bag-assignment problem in natural language; extraction is fast regardless of how hard that underlying optimization is, because the kernel - not the model - solves it, in milliseconds." }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LatencyByArmChart, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Details, {
			summary: "The full nine-arm table, including the cheap tier and the self-consistency variant",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				headers: [
					"Arm",
					"Accuracy",
					"LLM time/case",
					"Cost/run",
					"Cost/correct answer"
				],
				rows: [
					[
						"Opus 4.8, unaided",
						"54.0%",
						"68.08s",
						"$18.08",
						"$0.335"
					],
					[
						"Opus 4.8, verified",
						"100.0%",
						"3.32s + 2.78s kernel",
						"$1.32",
						"$0.013"
					],
					[
						"Opus 4.8, verified + self-consistency loop",
						"100.0%",
						"10.67s",
						"$4.44",
						"$0.044"
					],
					[
						"Fable 5, unaided",
						"61.0%",
						"25.91s",
						"$16.92",
						"$0.277"
					],
					[
						"Fable 5, verified",
						"100.0%",
						"7.59s + 3.75s kernel",
						"$3.63",
						"$0.036"
					],
					[
						"Fable 5, verified + self-consistency loop",
						"100.0%",
						"22.52s",
						"$11.44",
						"$0.114"
					],
					[
						"Haiku 4.5, unaided",
						"3.0%",
						"23.75s",
						"$2.05",
						"$0.682"
					],
					[
						"Haiku 4.5, verified",
						"82.0%",
						"1.92s + 3.63s kernel",
						"$0.22",
						"$0.003"
					],
					[
						"Haiku 4.5, verified + self-consistency loop",
						"85.0%",
						"6.12s",
						"$1.10",
						"$0.013"
					]
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The cheap tier is the honest exception to a clean story: Haiku 4.5 nearly fails outright unaided, and behind the kernel it reaches 82-85%, not 100. Every one of those residual misses is an extraction error - a misread bag weight, one bag dropped from a list of ten - not a kernel failure. That's the correct way to read a verification system's limits: the kernel is exact by construction whenever the facts it receives are correct, so the only place risk still lives is a narrow, measurable reading step, not an open-ended reasoning one." })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "wrong-number",
			children: "The wrong number that wouldn't average away"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"The first time we ran this benchmark, before we'd added any hint about the free-slot rule, both frontier models made the",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "opposite" }),
			" error: they overcharged, and 34 of Opus 4.8's 36 misses on that pass were clean multiples of $70, $140, or $210 - the price of assigning a free slot to the wrong bag. That's a legible signature on its own, but we wanted to know whether simply stating the rule would fix it."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"We added one sentence to the system prompt: when N bags are complimentary, the free slots go to the N bags with the highest surcharge, not to whichever bags come first. The overcharging pattern vanished - not one remaining miss was a multiple of $70. But a new pattern replaced it. Both models now ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "undercharge" }),
			" on every single failure, in both models' 39-to-46 misses, no exceptions. And on 31 of the cases both models got wrong, they landed on the",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "identical" }),
			" wrong dollar figure - including Thomas's $3,185 against a correct $3,445."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Telling a model the rule exists changed the direction of its error. It did not change the fact of it. That's worth sitting with, because it rules out the easiest explanation - that the models simply hadn't been told - and points at something more structural underneath." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "chasing-the-predictor",
			children: "Chasing the actual predictor of failure"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The intuitive next hypothesis is the one most people would reach for first: harder cases have more moving parts, so a ten-bag itinerary should break down more often, and more badly, than a three-bag one. We had this hypothesis before we had the data, wrote it down, and then checked it directly rather than assuming it." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 5,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "The reported aggregates: mean bag count barely moves between the cases each model got wrong and the cases it got right, for either model. The correlation between bag count and error size, restricted to wrong answers, is r = 0.10 for both models - statistically indistinguishable from no relationship at all." }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BagCountAggregateChart, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "It doesn't hold. Average bag count on cases Opus 4.8 got wrong was 9.78, against 9.91 on cases it got right - the same, within noise. Fable 5: 9.87 wrong, 9.84 right. More facts to extract did not make either model more likely to fail, or fail by a larger margin. The number of atomic facts in a case is not what breaks unaided reasoning here." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "What does predict a failure, cleanly, is whether the case has any complimentary slot to assign in the first place:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 6,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "K is the number of bag positions that are free for a given route and cabin class - zero, one, two, or three under this fee schedule. Both models are flawless when K is zero and fail roughly six times in ten whenever K is one or more. Hover a bar for the exact fraction." }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FailureByKChart, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			headers: [
				"Complimentary slots (K)",
				"Opus 4.8 fails",
				"Fable 5 fails"
			],
			rows: [
				[
					"K = 0 (nothing free)",
					"0 of 23",
					"0 of 23"
				],
				[
					"K = 1",
					"12 of 13",
					"8 of 13"
				],
				[
					"K = 2",
					"30 of 48",
					"27 of 48"
				],
				[
					"K = 3",
					"4 of 16",
					"4 of 16"
				]
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"Zero failures, either model, across all 23 cases with no complimentary slot at all - regardless of bag count, weight, or size. The moment a case requires ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "choosing" }),
			" which bag gets the free slot, the failure rate jumps immediately. This was never a test of whether a model can add up ten line items. It's a test of whether it notices that one clause quietly redefines the task from arithmetic to assignment - and that's the one clause a fluent reader is most likely to skate past, because nothing in the formatting marks it as different from every other line in the table."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Cabin class sharpens this into something closer to a mechanism:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 7,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Basic Economy - which never carries a complimentary bag under this schedule - is perfect for both models. Main Plus, which does carry one and a footnote about it, is wrong for both models on every case." }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FailureByCabinClassChart, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			headers: [
				"Cabin class",
				"Opus 4.8 fails",
				"Fable 5 fails"
			],
			rows: [
				[
					"Basic Economy",
					"0 of 14",
					"0 of 14"
				],
				[
					"Main Cabin",
					"7 of 17",
					"3 of 17"
				],
				[
					"First",
					"5 of 20",
					"7 of 20"
				],
				[
					"Business",
					"13 of 25",
					"7 of 25"
				],
				[
					"Premium Economy",
					"11 of 14",
					"12 of 14"
				],
				[
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Main Plus" }, "mp"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "10 of 10" }, "mp1"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "10 of 10" }, "mp2")
				]
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"Main Plus is a perfect 0-for-10 for both models, on every Main Plus case either one saw. The published rule table carries a footnote on that column: ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "\"Main Plus includes 1 extra free checked bag in addition to the Main Cabin allowance.\"" }),
			" The table's own numbers already price that bag in - reading the table correctly needs nothing more than the figures it contains. But a model that treats the footnote as a second, additive instruction has an obvious way to double-count it: work out the table's free slots, and then wave through one ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "more" }),
			" bag on top, because the footnote says \"extra.\""
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The errors fit that story precisely. The ten Main Plus misses aren't one repeated dollar amount - they're $400, $300, $900, $360, $900, and so on, tracking whatever that one extra bag's own size and weight happened to cost. A single misread table cell would produce the same wrong number every time; a whole additional bag being waived produces exactly this variable pattern. We can't see either model's internal reasoning - it isn't exposed in the API - but the shape of the evidence is specific enough to trust: not \"the model gets worse as a problem grows,\" but \"the model misses the one clause that turns a lookup into an optimization, and a second, easily-conflated clause makes that worse for exactly one cabin class.\" A kernel has no footnote to double-count. Its free-slot count comes from the same table cells its total does, computed once, the same way, every time." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "field-notes",
			children: "Field notes from building this pipeline"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Details, {
			summary: "Bug one - self-consistency voting assumed every fact was a scalar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
				"Our self-consistency mode re-extracts a case several times and takes a majority vote, using a hashable form of the extracted facts to compare runs. We had designed that comparison around flat, scalar facts - a fare, a boolean, a headcount - so a plain per-field key seemed sufficient. The airline domain's facts include a ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "list" }),
				" of bag records, and a list isn't hashable. The fix was a small recursive hashing function; the lesson was that \"atomic facts\" is a schema decision that gets more demanding as the domain does, and the plumbing underneath has to be general enough to keep up."
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Details, {
			summary: "Bug two - a paraphrase quietly deletes the rule it's summarizing",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
				"Our first full run showed the unaided frontier model failing on nearly every case - 0% for Opus 4.8, 7% for Fable 5. That wasn't a real result; it was ours to fix. We'd summarized the fee schedule into a paragraph, assuming a short prose statement would carry enough of the rule to be a fair test. It doesn't, once a rule has more than a handful of numeric constants: this fee schedule has dozens of dollar figures across regions, classes, and bag positions, and a paraphrase silently drops most of them. The fix was to vendor the benchmark's actual rules text verbatim rather than summarize it - a discipline we already applied to the",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "kernel" }),
				", just extended to the ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "prompt" }),
				", and easy to overlook until a domain is large enough that it matters."
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Details, {
			summary: "Bug three - a harder problem needs a bigger thinking budget",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "With the full rules text in the prompt and the model genuinely reasoning through a combinatorial assignment, one case spent 7,999 of its 8,000-token thinking budget and returned nothing at all. Raising the ceiling to 16,000 tokens fixed it. The general point survives the specific number: a token budget tuned for one problem's reasoning depth silently fails on a harder one, and the failure mode isn't a wrong answer - it's no answer." })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "what-this-buys-us",
			children: "What this buys us, and what it doesn't"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "This result answers a specific, falsifiable question: whether a proof-carrying verification architecture - a model that only reads, a kernel that only decides - survives being pointed at a benchmark, a domain, and a set of models it was never built for. It does - and not marginally. A 46-point and a 39-point unaided failure rate, on the two newest Claude models, on a real, independently authored, real-world fee schedule, collapsed to zero by a kernel we could check case-by-case against someone else's reference implementation before trusting a single output." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"It's worth stating the limit as plainly as the result. Verification guarantees that a specific set of extracted facts was correctly turned into an answer under the encoded rules. It does not, by itself, guarantee that the facts were read correctly in the first place - that residual risk is real, and the Haiku tier's 82-85% (against a kernel that is otherwise exact) is where we show it rather than hide it. What verification changes is the ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "shape" }),
			" of that risk: instead of an open-ended \"was this multi-step reasoning sound,\" which you cannot check case by case, you're left with \"was this one field read correctly,\" a narrow question you can measure, retry, or hand to a second pass."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The pattern in this result isn't \"language models are bad at arithmetic.\" It's narrower, and this time it comes with a clean quantitative test behind it rather than a hunch: models are bad at noticing when a rule that reads like a lookup table is quietly asking for an optimization, a branch, or a composition - not because the surrounding case is large, but because one specific clause is easy to read past - and when they miss that clause, they miss it fluently, with nothing in the answer to flag that anything went wrong, and no more often on a ten-fact case than a three-fact one. A kernel doesn't need to notice the trap. It just runs the rule, the same way, every time." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notes, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Note, {
			id: "1",
			children: [
				"See our companion post,",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/blog/$slug",
					params: { slug: "a-diagnosis-should-be-a-proof-not-a-probability" },
					className: "text-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "A Diagnosis Should Be a Proof, Not a Probability" })
				}),
				", which formalizes the 2019 EULAR/ACR lupus classification criteria in Lean 4 and runs the same evaluation-versus-verification comparison on a clinical benchmark."
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Note, {
			id: "2",
			children: [
				"Zhou et al. ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "RuleArena: A Benchmark for Rule-Guided Reasoning with LLMs in Real-World Scenarios." }),
				" ACL 2025; arXiv:2412.08972. MIT license. Covers airline baggage fees, NBA transaction legality, and tax; this post uses the airline domain."
			]
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hr, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "references",
			children: "References"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(References, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				"Merigoux D, Chataing N, Protzenko J.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Catala: A Programming Language for the Law." }),
				" ICFP 2021. ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "The domain-specific language the verification kernel is written in - designed specifically so statutory and regulatory rules can be transcribed into checkable code rather than paraphrased." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				"Dziri N, Lu X, Sclar M, et al.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Faith and Fate: Limits of Transformers on Compositionality." }),
				" NeurIPS 2023.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Documents the broader, scale-resistant class of compositional failure this result is one concrete instance of." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				"Holzenberger N, Van Durme B.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Factoring Statutory Reasoning as Language Understanding Challenges." }),
				" ACL 2021.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "SARA, the statutory benchmark we evaluated before RuleArena; see the disclosure above for why we moved past it." })
			] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Details, {
			summary: "Benchmark provenance, exact optimization definition, and how to reproduce this",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Dataset." }), " RuleArena's airline domain, \"Level 3\" (hardest) tier, 100 problems, each a real itinerary - fare, cabin class, route, and up to eleven checked-bag items - with ground truth from the benchmark's own reference implementation, not a human label. We vendored the benchmark's published fee-schedule text verbatim rather than paraphrasing it, and cross-checked our Catala kernel against the reference script on all 100 cases before treating it as ground truth for anything in this post."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "The optimization, precisely." }),
					" For a given route, cabin class, and bag position, the published base fee is either a fixed amount or zero (\"complimentary\"). When K positions are complimentary, the reference computation assigns those K free slots to the K bags with the highest ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineCode, { children: "max(oversize fee, overweight fee)" }),
					", minimizing the passenger's total. K never exceeds 3 under this fee schedule. The kernel computes this with the bounded top-3 fold shown above rather than a general sort, since Catala's list primitives don't include one."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Method." }), " The K-value and cabin-class breakdowns are computed directly from each case's route and class against the same fee-table logic the kernel itself uses, cross-tabulated against each arm's logged per-case correctness - not estimated or sampled after the fact. The bag-count correlation is the Pearson correlation between bag count and absolute dollar error, restricted to incorrect cases, computed separately per model."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Code." }), " The pipeline - the Catala kernel, the dataset-construction and cross-check scripts, the experiment harness, and the figure generation - is being prepared for an open-source release. A repository link will be added here once it's public."] })
			]
		})
	] });
}
function ADiagnosisShouldBeAProof() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "We gave a frontier language model a single patient record and asked it one question: does this patient meet classification criteria for lupus? Then we asked four more times, with the identical record, word for word. The answers came back: not lupus, lupus, lupus, not lupus, not lupus." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Same patient. Same chart. Five identical prompts. Two different diagnoses, separated by nothing but the random sampling inside the model." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The patient was one we constructed to be exactly this kind of trap. She was taking hydralazine, a blood-pressure drug well known for producing a lupus-like syndrome, and the easy read is to call her findings a drug reaction and move on. But she also carried the bloodwork of genuine lupus underneath the drug. The correct classification is lupus, and a model that answers \"not lupus\" three times out of five sends a real patient home with an untreated autoimmune disease. Worse, nothing in any single one of those five fluent, confident answers tells you which one you happened to receive." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "This is not a story about a weak model. The model here is among the strongest available, and as the results below show, it classifies most of our cases correctly. It is a story about a property that no amount of model scale removes, and about an architecture that does. We built a clinical classifier whose verdicts are not sampled but proven, benchmarked it against a frontier model on a 50-case adversarial dataset, and measured exactly where each one succeeds and fails. What follows is the system, the evidence, and an honest account of the limits of both." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "argument",
			children: "When a diagnosis is an argument"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "A diagnostic classification is not a sentence to be completed. It is an argument to be made: a chain of rule applications over a patient's data that ends in a verdict. The published criteria for a disease spell that chain out precisely. They say which findings count, how much each is worth, which preconditions must hold before the assessment even begins, and which competing explanations disqualify a finding." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "A language model does not execute that chain. It performs next-token prediction over a learned probability distribution. Asked to classify, it generates text that resembles the argument, drawn stochastically token by token. That mechanism produces three failure modes, and they are intrinsic rather than incidental:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"The first is ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "non-determinism" }),
			". Because the output is sampled, the same input can produce different verdicts on different runs, and the reasoning can drift partway through a derivation without any visible sign in the final text. This is the behavior in the opening paragraph."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"The second is ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "unverifiable confidence" }),
			". A fluent derivation is not evidence that the derivation is sound. The model's confidence reflects the shape of its token distribution, not the validity of the argument, so a wrong step arrives with exactly the same polish as a right one."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"The third is the ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "absence of a completeness guarantee" }),
			". Nothing forces the model to check every disqualifying exception or to consider every competing diagnosis. When it skips one, the omission does not announce itself. It simply is not there."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"For a consumer chatbot, this is a fine trade. For clinical classification, where a confidently wrong answer carries real cost, high average accuracy with no guarantee on the individual case is not a foundation you can build on. A trustworthy classification needs two properties that a sampled argument cannot supply. It needs",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "correctness" }),
			", meaning no step contradicts the patient's data or the rules. And it needs ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "completeness" }),
			", meaning no applicable criterion goes unevaluated and no disqualifying exception goes unchecked. Those are precisely the guarantees that formal verification was invented to provide."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "evaluation-vs-verification",
			children: "Evaluation measures the average; verification checks the case"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "It helps to separate two ideas that are easy to conflate." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Evaluation is a statement about a sample average. A model scores some accuracy across a benchmark. That number is statistical, it describes the model, and it says nothing about whether any particular answer is valid. When the grader is itself a language model, the problem compounds, because the grader is another probabilistic system drifting off-distribution in ways you cannot inspect." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Verification is a statement about a single output. A small, trusted program checks that this specific conclusion follows, by deduction, from the rules. The check is deterministic, it reproduces regardless of model weights or random seed, it is complete over the encoded rules rather than over a sample of cases, and it offers no gradient for an adversary to push against. Our aim was a clinical classifier whose every verdict is verified in this second sense: a derivation a kernel can check." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "model-reads-kernel-decides",
			children: "The model reads, the kernel decides"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The design demotes the language model from decision-maker to translator, and places authority in a formal proof system." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 1,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "The model proposes a structured representation of the chart; the formal core decides the diagnosis. The dashed line is the trust boundary. The only probabilistic step is autoformalization, above the line; everything below it is verified." }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBoundaryDiagram, {
				probabilistic: [{
					title: "Autoformalizer (LLM)",
					detail: "Reads the free-text chart and converts it into a structured term in a formal vocabulary - extracting the findings that are present, not reasoning about the disease. The only step allowed to be wrong."
				}],
				verified: [{
					title: "Formal rulebook (Lean 4)",
					detail: "The 2019 EULAR/ACR criteria encoded as explicit, reviewable definitions - the entry gate, domain-maximum scoring, and the attribution rule."
				}, {
					title: "Proof kernel",
					detail: "Evaluates any concrete patient to a verdict and certifies it with a proof object. No sampling, no drift - the verdict is a theorem."
				}]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "There are three components, and the separation of trust between them is the entire point." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"The ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "autoformalizer" }),
			" is a language model that converts the free-text record into a structured term in a formal vocabulary. This is the only probabilistic step, and it is deliberately a narrow one: extract the findings that are present, not reason about the disease. The model is allowed to be wrong here, and we measure how often it is."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"The ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "formal rulebook" }),
			" is the published criteria, encoded as definitions in Lean 4, a language built for writing programs and mathematical proofs that a machine can check. This is where domain knowledge lives, as explicit, reviewable, version-controlled code rather than as opaque weights or a brittle prompt."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"The ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "proof kernel" }),
			" is a small, heavily scrutinized program, the trusted computing base of the whole system, whose only job is to check proofs. Because we encode the rulebook so that classification is a ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "decidable" }),
			" proposition, meaning a property a machine can settle with a definite yes or no, the kernel can evaluate any concrete patient to a verdict and certify that verdict with a proof object. There is no sampling and no drift at this stage. The verdict is a theorem."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "This inverts the usual posture. Instead of trusting the model and hoping its reasoning held, we trust a few hundred lines of formal logic and a kernel that mechanically verifies them, and we confine the model to the task it is genuinely reliable at, which is reading." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "encoding-lupus",
			children: "Encoding a real standard: the lupus criteria"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "We did not invent a toy rule. We formalized the 2019 EULAR/ACR classification criteria for Systemic Lupus Erythematosus, an internationally adopted clinical standard, because it has the structure that most serious diagnostic rules share and therefore stresses the architecture in clinically meaningful ways." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"The criteria have three parts. First, an",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "obligatory entry criterion" }),
			": an antinuclear antibody (ANA) titer of at least 1:80. If that gate fails, the patient cannot be classified as lupus, no matter what else is true. Second, a",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "weighted additive score across ten organ domains" }),
			", where each domain contributes only its single highest-weighted finding rather than the sum of its findings, classification requires a total of at least 10 points, and at least one of those points must come from a clinical rather than a purely laboratory domain. Third, an ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "attribution rule" }),
			": a finding counts only if there is no more likely explanation than lupus. That last clause is the crux of the diagnosis, because lupus has well-known impostors. Certain drugs (hydralazine, procainamide, minocycline, isoniazid) and certain chronic infections (endocarditis, HIV, hepatitis C, parvovirus B19) reproduce many of its findings."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "In our system every scored criterion is an item with a weight and a domain, and a patient is a structured term that carries both the findings and the confounders that drive attribution:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
			lang: "lean",
			children: `structure Patient where
  anaTiterRecip    : Nat            -- reciprocal titer; 80 denotes 1:80
  findings         : List Item
  drugInducedLupus : Bool := false  -- a culprit drug is implicated
  chronicInfection : Bool := false  -- an SLE-mimicking infection is present`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The domain-maximum score is a fold that takes, for each domain, the highest weight among the items that actually count, and then sums across domains:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
			lang: "lean",
			children: `def domainScore (p : Patient) (d : Domain) : Nat :=
  (allItems.filter (fun i => (domainOf i == d) && counts p i)).foldl
    (fun acc i => Nat.max acc (weight i)) 0

def totalScore (p : Patient) : Nat :=
  allDomains.foldl (fun acc d => acc + domainScore p d) 0`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"Classification then becomes a single proposition, with a",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineCode, { children: "Decidable" }),
			" instance that lets the kernel both decide and prove it for any concrete patient:"
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
			lang: "lean",
			children: `def classifiedSLE (p : Patient) : Prop :=
  entryGate p ∧ hasClinicalCriterion p = true ∧ totalScore p ≥ 10

instance (p : Patient) : Decidable (classifiedSLE p) := by
  unfold classifiedSLE; infer_instance`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"That ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineCode, { children: "Decidable" }),
			" instance is the engine of the whole approach. For any specific patient the verdict is not asserted, it is derived, and the derivation is a proof term the kernel will reject unless it actually holds:"
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
			lang: "lean",
			children: `theorem alice_has_sle : classifiedSLE alice := by decide  -- compiles, therefore proven
theorem bob_not_sle   : ¬ classifiedSLE bob   := by decide  -- compiles, therefore proven`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "attribution-rule",
			children: "The attribution rule, where the mimics live"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The interesting part is attribution, and it is worth seeing in full. Drug-induced lupus and the infections we model do not produce the antibodies that are specific to lupus, anti-dsDNA and anti-Smith. Their presence is therefore a positive marker of genuine disease, and it should switch off mimic-attribution entirely:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
			lang: "lean",
			children: `def genuineSleMarker (p : Patient) : Bool :=
  p.findings.contains dsDNAorSmith   -- anti-dsDNA or anti-Smith implies genuine SLE

def explainedByOther (p : Patient) (i : Item) : Bool :=
  ! genuineSleMarker p &&
    ((p.drugInducedLupus && drugExplains.contains i)
     || (p.chronicInfection && infExplains.contains i))

def counts (p : Patient) (i : Item) : Bool :=
  p.findings.contains i && ! explainedByOther p i`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "This single predicate is what decides the trap case from the introduction, and it is the rule that the frontier model applies inconsistently. We come back to why it matters both in the failure analysis and when we discuss editing the rulebook." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "benchmark",
			children: "A benchmark, not an anecdote"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "A claim of verified correctness deserves measurement, not one dramatic case study. So we built a benchmark and ran a controlled comparison." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The dataset is 50 synthetic patient vignettes, each a free-text record paired with an authored set of true facts. The distribution is balanced and adversarial on purpose. There are 20 lupus-positive and 30 lupus-negative cases. Sixteen are mimic cases, split evenly between drugs and infections, and they include both pure mimics that should be negative and genuine-disease-behind-a-mimic cases that should be positive. Eleven are boundary and arithmetic traps: cases that sit exactly on the threshold, cases where summing all findings in a domain over-counts because only the highest should be taken, and cases that reach ten points entirely from laboratory findings and therefore fail the clinical-criterion requirement. Six are entry-gate cases where the ANA is negative or below the cutoff." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"We ran two systems over the same cases. The ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "baseline" }),
			" ",
			"receives the record and the full criteria in natural language and must produce both the score and the classification itself. We ran it as a frontier model with its strongest reasoning mode enabled, so this is a fair opponent rather than a strawman. The",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "verified" }),
			" system receives the record, extracts the atomic findings only, with explicit instructions not to score or classify, and hands the structured term to the kernel."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Ground truth is the formal rulebook applied to each vignette's authored facts. That choice has a consequence we confront directly later. Every vignette was run five times in each system, 500 model calls in all, so that we could measure run-to-run consistency alongside accuracy." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "what-we-found",
			children: "What we found"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			headers: [
				"Metric",
				"Baseline (LLM only)",
				"Verified (autoformalization + Lean)"
			],
			rows: [
				[
					"Verdict accuracy (mean of 5 runs)",
					"96.8%",
					"100%"
				],
				[
					"Sensitivity (true-positive rate)",
					"90.0%",
					"100%"
				],
				[
					"Specificity (true-negative rate)",
					"100%",
					"100%"
				],
				[
					"Mimic-case accuracy",
					"90.0%",
					"100%"
				],
				[
					"Boundary and arithmetic accuracy",
					"100%",
					"100%"
				],
				[
					"Entry-gate accuracy",
					"100%",
					"100%"
				],
				[
					"Run-to-run consistency",
					"98.0%",
					"100%"
				],
				[
					"False negatives (missed lupus)",
					"2 of 20",
					"0 of 20"
				],
				[
					"False positives (over-classified)",
					"0",
					"0"
				]
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 2,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Headline metrics, baseline versus verified, as the mean of five runs. The verified system reaches 100% on all seven axes. The baseline trails on sensitivity, mimic accuracy, and run-to-run consistency. The radius is truncated at 80% to make the gaps legible. Hover a vertex for the exact value." }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadlineMetricsRadar, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Breaking the baseline down by case category shows where its errors concentrate:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			headers: [
				"Category",
				"n",
				"Baseline accuracy"
			],
			rows: [
				[
					"Clear SLE",
					"10",
					"100%"
				],
				[
					"Sub-threshold",
					"7",
					"100%"
				],
				[
					"ANA-negative (entry gate)",
					"6",
					"100%"
				],
				[
					"Boundary and arithmetic",
					"11",
					"100%"
				],
				[
					"Drug-induced mimic",
					"8",
					"92.5%"
				],
				[
					"Infection mimic",
					"8",
					"87.5%"
				]
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 3,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Baseline accuracy by case category. Errors are confined to the two mimic categories (amber); the model handles every structural and arithmetic trap perfectly. The verified system is at 100% across all categories, marked by the dashed line." }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryAccuracyChart, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 4,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Confusion matrices using the majority verdict over five runs, n equals 50. The baseline's two errors are both false negatives, the clinically dangerous direction (highlighted). The verified system has none. Hover a cell for what it means." }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfusionMatrixFigure, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Two things in these numbers shape how to read them, and both make the case stronger rather than weaker." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The first is that the frontier baseline is genuinely good (Figures 2 and 3). It classified every clear case, every sub-threshold case, every entry-gate case, and every one of the boundary and arithmetic traps correctly, including the subtle ones, such as the domain-maximum cases where naive summation over-counts and the laboratory-only cases that reach the threshold but fail the clinical-criterion requirement. On these structurally tricky cases the model applied the rule faithfully. The point here is not that the model cannot follow rules." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The second is that the model's failures land exactly where the clinical stakes are highest, and in the dangerous direction (Figure 4). Both baseline errors are false negatives, which is to say missed disease. Its 90% sensitivity means it failed to identify two of twenty genuine lupus patients. Its specificity was perfect, so it never over-classified, but in a screening or decision-support setting a missed autoimmune diagnosis is the costly error." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "two-patients",
			children: "The two patients the model missed"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The two failures are not random noise. They are the two cases that require the attribution rule to be applied correctly in the harder direction, recognizing genuine disease that is hiding behind a mimic." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The first is the patient from the introduction, a woman on hydralazine with joint pain, but also with low complement levels and a positive anti-dsDNA antibody. The anti-dsDNA is not a feature of drug-induced lupus, so this is real lupus with the drug as a red herring, and the correct answer is positive. Across five identical runs the baseline returned negative, positive, positive, negative, negative, with computed scores of 10, 16, 16, 10, 10. It alternated between blaming the drug and recognizing the disease, governed by nothing but the sampler. This is the clearest possible illustration of the first failure mode: the verdict is a function of the random seed. The verified system returns positive on every run, because the rulebook states plainly that a lupus-specific antibody suppresses drug attribution, and the kernel computes the same derivation each time." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The second is a woman with treated HIV and a low platelet count, again with anti-dsDNA and low complement, and again genuinely lupus. HIV can lower platelets, so the model attributed the finding to the infection and returned negative on all five runs. Consistent this time, and consistently wrong. This is the second failure mode, a fluent and stable derivation that is simply incorrect. The verified system classifies it positive, for the same structural reason." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 5,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Per-run verdicts on the two hardest cases, both of which are genuine lupus. The baseline's first verdict flips with the random seed, and its second is consistently wrong. The verified system is correct and identical on every run. Hover a point on Case A for its score and verdict." }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunVerdictFigure, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Both cases have the same shape: a confounder is present, but a lupus-specific antibody overrides it. The correct policy is a single explicit predicate in the rulebook. The model approximates that policy stochastically, and it errs in the direction that misses disease." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "where-our-system-fails",
			children: "Where our own system can fail"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "We hold our own system to the standard we are applying to the baseline, which means confronting an obvious objection. The verified system scored 100% on the verdict for all 50 cases across all five runs, but that figure is partly true by construction. Ground truth is the rulebook, and the kernel cannot disagree with the rulebook. So the verdict accuracy of the verified system is not the quantity that is actually at risk." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The quantity at risk is the autoformalization step, where the model reads the chart, and we measure it directly. Across 250 translations, fifty cases times five runs, the model made exactly one extraction error. On a single case in a single run it omitted a fever finding, and the computed score came out as 16 instead of 18. The verdict was unaffected, because that case cleared the threshold on its renal criterion regardless." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "That single slip is the honest characterization of the architecture's limit, and it is also the design's central advantage. The residual uncertainty has been relocated. It is no longer \"was the multi-step clinical reasoning sound,\" an opaque question you cannot check case by case. It is \"was a single finding read correctly,\" a narrow, measurable step that can be hardened on its own, by cross-checking against structured fields in the record, by extracting several times and reconciling, or by asking a human to confirm. None of those is available for the monolithic reasoning of the baseline. We will keep reporting this error rate, because a verification system that hides its own failure mode has defeated its own purpose." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "There is a second limit worth stating plainly. Verification guarantees that the rules were applied correctly. It does not, on its own, guarantee that the rules are clinically optimal. That is true, and it is exactly where the architecture's strongest property lives." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "rule-you-can-edit",
			children: "A rule you can edit, and prove"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "When we first encoded the attribution rule, it was too aggressive. It stripped the joint-pain finding from any patient on a culprit drug, unconditionally, which made the hydralazine case come out negative. A rheumatologist would object, correctly, that the serology proves genuine disease." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"In a probabilistic system, encoding that objection means rewriting a prompt and hoping the change generalizes without quietly breaking ten other cases, with no guarantee either way. In a formal system the correction is a localized change to a single definition, the",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineCode, { children: "genuineSleMarker" }),
			" predicate shown earlier. We changed that one definition, recompiled, and all 50 cases were re-decided immediately, consistently, and with fresh proof terms. No regression is possible without the kernel reporting it."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "This is the property that matters most for deployment. The clinical policy is an explicit object that a domain expert can read, argue with, and approve, and once approved it governs every patient identically and deterministically until it is deliberately revised and re-verified. The disagreement between an aggressive and a refined attribution policy is not a matter of model temperament. It is a diff. That auditability, and the ability to fix a rule once and have the fix apply everywhere with a proof, is something no prompt and no round of fine-tuning can offer." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "beyond-lupus",
			children: "Beyond lupus"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Lupus is one classification standard. The machine underneath it is domain-general. Any high-stakes field that runs on written rules, constraints, and consequences has the same shape that made this work: diagnostic criteria across medicine, statutory tax computation, regulatory compliance, insurance adjudication, financial controls. In each of these the prevailing approach is to deploy a fluent model that produces answers that are plausible but not proven, and in each of these a confidently wrong output carries liability. The requirement is the same everywhere. It is a verification layer that turns a model's proposed answer into a checkable proof against the governing rules." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The pattern repeats: an autoformalizer to bridge unstructured input and formal representation, a rulebook that encodes the domain as decidable propositions, and a kernel that certifies each verdict. The model proposes, and the kernel disposes." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "reproducibility",
			children: "Reproducibility"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The complete system is small and self-contained: the encoded criteria in Lean, the 50-case dataset with authored ground truth, the two-system experimental harness, and the raw per-run results. The benchmark reruns end to end, and every verdict is accompanied by a proof term." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "in-closing",
			children: "In closing"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Given a published diagnostic standard in plain language, a frontier model classified our 50-case benchmark at 96.8% accuracy, with perfect specificity and flawless performance on every structurally difficult category. It also missed two of twenty genuine lupus patients, and on one of them it returned different diagnoses on identical, repeated queries. Those are not the failures of a weak system. They are the failures inherent in deciding a high-stakes question by sampling." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The verified system classified the same benchmark with perfect sensitivity and specificity, perfect run-to-run consistency, and a machine-checkable proof behind every verdict, with its only residual error confined to a single, measurable reading step that did not change a diagnosis. In any domain where a wrong answer carries a cost, an output you can prove correct is worth more than one that is merely likely to be. A diagnosis should be a proof, not a probability." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hr, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "references",
			children: "References"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(References, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				"Aringer M, Costenbader K, Daikh D, et al.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "2019 European League Against Rheumatism / American College of Rheumatology classification criteria for systemic lupus erythematosus." }),
				" Arthritis & Rheumatology, 2019; 71(9): 1400-1412.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "The clinical standard we formalized, including the entry criterion, weighted domains, and the attribution clause." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				"Moura L de, Ullrich S.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "The Lean 4 theorem prover and programming language." }),
				" ",
				"Proceedings of the 28th International Conference on Automated Deduction (CADE), 2021.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "The proof assistant and kernel that form our trusted computing base." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				"Google DeepMind. ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "AI achieves silver-medal standard solving International Mathematical Olympiad problems" }),
				" (AlphaProof and AlphaGeometry 2), 2024.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Evidence that machine-generated, formally checked proofs now reach expert-level reasoning, the foundation this approach builds on." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				"Trinh TH, Wu Y, Le QV, He H, Luong T.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Solving olympiad geometry without human demonstrations" }),
				" ",
				"(AlphaGeometry). Nature, 2024; 625: 476-482.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "A neuro-symbolic system pairing a language model with a formal engine, the same division of labor we use." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				"Wu Y, Jiang AQ, Li W, et al.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Autoformalization with large language models." }),
				" ",
				"Advances in Neural Information Processing Systems (NeurIPS), 2022.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Establishes the autoformalization step, translating natural language into a formal representation a machine can verify." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				"Dziri N, Lu X, Sclar M, et al.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Faith and Fate: limits of transformers on compositionality." }),
				" Advances in Neural Information Processing Systems (NeurIPS), 2023.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Documents the systematic, scale-resistant failures of language models on multi-step compositional and arithmetic reasoning, the class of failure our results reproduce." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				"Holtzman A, Buys J, Du L, Forbes M, Choi Y.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "The curious case of neural text degeneration." }),
				" ",
				"International Conference on Learning Representations (ICLR), 2020.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "On stochastic decoding, the mechanism behind the run-to-run non-determinism in Figure 5." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				"Singhal K, Azizi S, Tu T, et al.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Large language models encode clinical knowledge." }),
				" ",
				"Nature, 2023; 620: 172-180.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Shows that frontier models hold substantial clinical knowledge, consistent with our strong baseline, while motivating the need for guarantees on top of it." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				"Graber ML, Franklin N, Gordon R.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Diagnostic error in internal medicine." }),
				" Archives of Internal Medicine, 2005; 165(13): 1493-1499.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Quantifies the clinical cost of diagnostic error, including premature closure and anchoring, the human analog of the model's missed-mimic failures." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				"Vaglio A, Grayson PC, Fenaroli P, et al.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Drug-induced lupus: traditional and new concepts." }),
				" ",
				"Autoimmunity Reviews, 2018; 17(9): 912-918.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Clinical basis for our attribution rule, including why anti-dsDNA argues against a pure drug-induced picture." })
			] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hr, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "appendix",
			children: "Appendix"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "appendix-a",
			children: "A. Dataset composition"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Fifty synthetic vignettes, 20 lupus-positive and 30 lupus-negative, authored so that ground truth is unambiguous and the formal rulebook is the single source of truth." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			headers: [
				"Category",
				"n",
				"Designed to test"
			],
			rows: [
				[
					"Clear SLE",
					"10",
					"Straightforward positives across organ domains"
				],
				[
					"Sub-threshold",
					"7",
					"Entry met but score below 10"
				],
				[
					"ANA-negative",
					"6",
					"Entry gate fails despite other findings"
				],
				[
					"Drug-induced mimic",
					"8",
					"Attribution to a culprit drug, both pure and disease-behind-drug"
				],
				[
					"Infection mimic",
					"8",
					"Attribution to a chronic infection, both pure and disease-behind-infection"
				],
				[
					"Boundary and arithmetic",
					"11",
					"Exact threshold, domain-maximum counting, laboratory-only-no-clinical"
				]
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "appendix-b",
			children: "B. Metric definitions"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Verdict accuracy" }),
			" is the fraction of cases whose predicted classification matches ground truth, averaged over five runs. ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Sensitivity" }),
			" is the true-positive rate over the 20 lupus-positive cases; ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "specificity" }),
			" is the true-negative rate over the 30 negatives. ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Score exact-match" }),
			" is the fraction of cases whose computed additive score equals the ground-truth score.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Run-to-run consistency" }),
			" is the fraction of cases for which a system returned the same verdict on all five runs. Confusion matrices and per-category figures use the",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "majority verdict" }),
			" across the five runs."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "appendix-c",
			children: "C. Model and configuration"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Both systems used the same frontier model with adaptive thinking enabled. The baseline received the full criteria in natural language and produced the score and classification directly; the score was requested independently of the entry gate so that the score metric is comparable across systems. The verified system used structured extraction constrained to the atomic-finding vocabulary, with explicit instructions not to score or classify. Each system was run five times over all 50 cases, for 500 model calls in total." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "appendix-d",
			children: "D. The formal encoding"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Classification is encoded as a decidable proposition: the conjunction of the entry gate (ANA at least 1:80), the presence of at least one clinical criterion, and a total weighted score of at least 10. The score uses domain-maximum aggregation, taking only the highest-weighted counting item per domain across all ten domains. Attribution is a Boolean predicate that suppresses a finding when a confounder explains it, except when a lupus-specific antibody (anti-dsDNA or anti-Smith) is present, in which case attribution is switched off and the finding counts. Because the proposition is decidable, Lean's kernel evaluates any concrete patient to a definite verdict and emits a proof term; the kernel is the only component that must be trusted." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "appendix-e",
			children: "E. Reproduction"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The repository contains the Lean formalization, the dataset with authored facts, the experimental harness, the figure-generation script, and the raw results. Running the harness recomputes ground truth from the rulebook, executes both systems over five runs, and regenerates the metrics and figures reproduced in this post." })
	] });
}
var BLOG_TAGS = [
	"Announcements",
	"Partnerships",
	"Research"
];
var BLOG_POSTS = [{
	slug: "fluent-is-not-the-same-as-correct",
	title: "Fluent Is Not the Same as Correct",
	subtitle: "Stress-testing a proof-carrying verification architecture on a benchmark we didn't build, a domain we didn't design it for, and two frontier Claude models that land on the identical wrong dollar figure.",
	description: "Two frontier Claude models fail an independently authored airline fee benchmark on the same cases, landing on the same wrong dollar figure - and a proof-carrying kernel takes both to 100%.",
	tag: "Research",
	author: "Boundless Intuition Research",
	date: "2026-07-17",
	readingTime: "18 min read",
	image: "/blog/fluent-hero.webp",
	Content: FluentIsNotTheSameAsCorrect
}, {
	slug: "a-diagnosis-should-be-a-proof-not-a-probability",
	title: "A Diagnosis Should Be a Proof, Not a Probability",
	subtitle: "Formalizing the lupus classification criteria in Lean 4, and a 50-case benchmark against a frontier model.",
	description: "A frontier model gave five different diagnoses to the same patient, five times. We built a clinical classifier whose verdicts are proven in Lean 4, not sampled, and benchmarked it head-to-head.",
	tag: "Research",
	author: "Boundless Intuition Research",
	date: "2026-06-19",
	readingTime: "15 min read",
	image: "/blog/diagnosis-hero.webp",
	Content: ADiagnosisShouldBeAProof
}];
function getBlogPost(slug) {
	return BLOG_POSTS.find((p) => p.slug === slug);
}
function formatBlogDate(iso) {
	return (/* @__PURE__ */ new Date(`${iso}T00:00:00Z`)).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC"
	});
}
//#endregion
export { getBlogPost as a, formatBlogDate as i, BLOG_TAGS as n, Prose as r, BLOG_POSTS as t };
