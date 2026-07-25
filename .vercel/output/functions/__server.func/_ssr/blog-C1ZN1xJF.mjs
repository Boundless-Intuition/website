import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { _ as Cell, a as YAxis, b as Legend, c as ZAxis, d as ReferenceLine, f as Bar, g as PolarGrid, h as PolarRadiusAxis, i as LineChart, l as Line, m as PolarAngleAxis, n as RadarChart, o as XAxis, p as Radar, r as BarChart, s as Scatter, t as ScatterChart, u as CartesianGrid, v as ResponsiveContainer, y as Tooltip } from "../_libs/recharts+[...].mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-C1ZN1xJF.js
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
function Hr() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-12 border-border" });
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
var NEUTRAL = {
	light: "oklch(0.55 0.02 250)",
	dark: "oklch(0.65 0.02 250)"
};
var SALMON = {
	light: "oklch(0.6 0.17 38)",
	dark: "oklch(0.74 0.15 42)"
};
var PERIWINKLE = {
	light: "oklch(0.5 0.15 266)",
	dark: "oklch(0.73 0.13 268)"
};
var BLUSH = {
	light: "oklch(0.59 0.13 350)",
	dark: "oklch(0.8 0.1 350)"
};
var PALE_BLUE = {
	light: "oklch(0.64 0.09 250)",
	dark: "oklch(0.87 0.06 245)"
};
var tooltipCursor = {
	fill: "var(--muted)",
	opacity: .4
};
var AXIS = {
	tickLine: false,
	axisLine: { stroke: "var(--border)" },
	tick: {
		fontSize: 11,
		className: "font-mono"
	}
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
function ChartFrame({ title, unit, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
			className: "font-display text-[15px] font-semibold tracking-tight text-foreground",
			children: title
		}),
		unit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground",
			children: unit
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children
		})
	] });
}
function DotLegend({ config, keys }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap items-center gap-x-7 gap-y-2 pb-5 pl-1",
		children: keys.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "size-2.5 shrink-0 rounded-full",
				style: { backgroundColor: `var(--color-${key})` }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[12.5px] text-foreground/80",
				children: config[key].label
			})]
		}, key))
	});
}
var accuracyConfig = {
	baseline: {
		label: "Baseline",
		theme: SALMON
	},
	verified: {
		label: "Verified",
		theme: PERIWINKLE
	},
	loop: {
		label: "Verified + loop",
		theme: PALE_BLUE
	}
};
var accuracyData = [
	{
		label: "Opus 4.8",
		baseline: 54,
		verified: 100,
		loop: 100
	},
	{
		label: "Fable 5",
		baseline: 61,
		verified: 100,
		loop: 100
	},
	{
		label: "Haiku 4.5",
		baseline: 3,
		verified: 82,
		loop: 85
	}
];
function AccuracyByArmChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
		title: "Accuracy by arm",
		unit: "Correct answers out of 100 RuleArena cases",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
			config: accuracyConfig,
			className: "aspect-[16/10] w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data: accuracyData,
				barCategoryGap: "30%",
				maxBarSize: 44,
				margin: {
					top: 4,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						...AXIS
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						...AXIS,
						domain: [0, 100],
						ticks: [
							0,
							25,
							50,
							75,
							100
						],
						tickFormatter: (v) => `${v}%`,
						width: 46
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
						cursor: tooltipCursor,
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, { formatter: (value, name) => tooltipRow(name, `${value}%`) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, {
						verticalAlign: "top",
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DotLegend, {
							config: accuracyConfig,
							keys: [
								"baseline",
								"verified",
								"loop"
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "baseline",
						fill: "var(--color-baseline)",
						radius: [
							2,
							2,
							0,
							0
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "verified",
						fill: "var(--color-verified)",
						radius: [
							2,
							2,
							0,
							0
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "loop",
						fill: "var(--color-loop)",
						radius: [
							2,
							2,
							0,
							0
						]
					})
				]
			})
		})
	});
}
var paretoConfig = {
	opus: {
		label: "Claude Opus 4.8",
		theme: SALMON
	},
	fable: {
		label: "Claude Fable 5",
		theme: PERIWINKLE
	},
	haiku: {
		label: "Claude Haiku 4.5",
		theme: BLUSH
	}
};
var opusArms = [
	{
		cost: 1.32,
		acc: 100,
		perCorrect: .013,
		arm: "Opus 4.8 · verified"
	},
	{
		cost: 4.44,
		acc: 100,
		perCorrect: .044,
		arm: "Opus 4.8 · verified + loop"
	},
	{
		cost: 18.08,
		acc: 54,
		perCorrect: .335,
		arm: "Opus 4.8 · baseline"
	}
];
var fableArms = [
	{
		cost: 3.63,
		acc: 100,
		perCorrect: .036,
		arm: "Fable 5 · verified"
	},
	{
		cost: 11.44,
		acc: 100,
		perCorrect: .114,
		arm: "Fable 5 · verified + loop"
	},
	{
		cost: 16.92,
		acc: 61,
		perCorrect: .277,
		arm: "Fable 5 · baseline"
	}
];
var haikuArms = [
	{
		cost: .22,
		acc: 82,
		perCorrect: .003,
		arm: "Haiku 4.5 · verified"
	},
	{
		cost: 1.1,
		acc: 85,
		perCorrect: .013,
		arm: "Haiku 4.5 · verified + loop"
	},
	{
		cost: 2.05,
		acc: 3,
		perCorrect: .682,
		arm: "Haiku 4.5 · baseline"
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
			className: "mt-1.5 space-y-0.5 font-mono text-[11px] tabular-nums text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [p.acc, "% correct"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					"$",
					p.cost.toFixed(2),
					" per run"
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					"$",
					p.perCorrect.toFixed(3),
					" per correct answer"
				] })
			]
		})]
	});
}
function CostAccuracyParetoChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
		title: "Cost against accuracy",
		unit: "Cost per 100-case run, log scale",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
			config: paretoConfig,
			className: "aspect-[16/11] w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScatterChart, {
				margin: {
					top: 12,
					right: 20,
					left: 0,
					bottom: 4
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						...AXIS,
						type: "number",
						dataKey: "cost",
						scale: "log",
						domain: [.15, 26],
						ticks: [
							.25,
							1,
							4,
							16
						],
						tickFormatter: (v) => `$${v}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						...AXIS,
						type: "number",
						dataKey: "acc",
						domain: [0, 106],
						ticks: [
							0,
							25,
							50,
							75,
							100
						],
						tickFormatter: (v) => `${v}%`,
						width: 46
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZAxis, { range: [72, 72] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParetoTooltip, {}),
						cursor: { strokeDasharray: "3 3" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, {
						verticalAlign: "top",
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DotLegend, {
							config: paretoConfig,
							keys: [
								"opus",
								"fable",
								"haiku"
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scatter, {
						name: "Claude Opus 4.8",
						data: opusArms,
						fill: "var(--color-opus)",
						line: {
							stroke: "var(--color-opus)",
							strokeWidth: 1.5
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scatter, {
						name: "Claude Fable 5",
						data: fableArms,
						fill: "var(--color-fable)",
						line: {
							stroke: "var(--color-fable)",
							strokeWidth: 1.5
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scatter, {
						name: "Claude Haiku 4.5",
						data: haikuArms,
						fill: "var(--color-haiku)",
						line: {
							stroke: "var(--color-haiku)",
							strokeWidth: 1.5
						}
					})
				]
			})
		})
	});
}
var latencyConfig = {
	llm: {
		label: "Model",
		theme: SALMON
	},
	kernel: {
		label: "Kernel",
		theme: PERIWINKLE
	}
};
var latencyData = [
	{
		label: "Opus 4.8 · baseline",
		llm: 68.08,
		kernel: 0
	},
	{
		label: "Opus 4.8 · verified",
		llm: 3.32,
		kernel: 2.78
	},
	{
		label: "Fable 5 · baseline",
		llm: 25.91,
		kernel: 0
	},
	{
		label: "Fable 5 · verified",
		llm: 7.59,
		kernel: 3.75
	},
	{
		label: "Haiku 4.5 · baseline",
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
		title: "Latency by arm",
		unit: "Mean seconds per answer",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
			config: latencyConfig,
			className: "aspect-[16/10] w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data: latencyData,
				layout: "vertical",
				barCategoryGap: "22%",
				maxBarSize: 26,
				margin: {
					top: 4,
					right: 20,
					left: 8,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						...AXIS,
						type: "number",
						ticks: [
							0,
							20,
							40,
							60
						],
						tickFormatter: (v) => `${v}s`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						...AXIS,
						type: "category",
						dataKey: "label",
						width: 150
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
						cursor: tooltipCursor,
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, { formatter: (value, name) => tooltipRow(name, `${value}s`) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, {
						verticalAlign: "top",
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DotLegend, {
							config: latencyConfig,
							keys: ["llm", "kernel"]
						})
					}),
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
							2,
							2,
							0
						]
					})
				]
			})
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
				left: 0,
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
					width: 46,
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
function FluencyIsNotCorrectness() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "tldr",
			children: "TL;DR"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Large language models exhibit strong natural-language fluency but remain unreliable at executing formal rule systems. We evaluate whether separating semantic extraction from deterministic execution improves correctness on RuleArena, an open evaluation benchmark for rule-guided reasoning, using its airline baggage fee domain. We compare three tiers of Claude models, first unaided and then within a two-stage verification stack in which the language model acts only as an autoformalizer, translating each itinerary into a machine-checkable formal representation, while a deterministic solver, written in Catala, executes the policy." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Verification raises frontier accuracy from 54% and 61% to 100% while simultaneously reducing inference cost by roughly a factor of fourteen and latency by an order of magnitude. Unaided, two frontier generations of the same model family return the identical wrong dollar amount on shared failure cases, which indicates that the errors originate in shared learned priors rather than insufficient inference-time reasoning. Most notably, a verified budget model outperforms unaided frontier models, suggesting that deterministic execution can compensate for substantial differences in model capability on rule-governed tasks." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hr, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "where-models-go-wrong",
			children: "Where language models quietly go wrong"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Modern language models have become remarkably capable at interpreting natural-language instructions. Whether they correctly execute the semantics of those instructions remains substantially less understood. A model can restate a policy accurately, walk through its application step by step, and still return a number the policy does not license." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "This distinction matters because many practical domains, including taxation, healthcare, finance, and regulatory compliance, depend not on fluent explanations but on faithful execution of explicit rules. In these domains an answer is either derivable from the governing specification or it is not, and a persuasive derivation of a wrong answer is worse than no answer, because it disarms the reader's skepticism." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "We investigate this question using RuleArena, a published evaluation benchmark in which real-world policies must be applied to concrete scenarios, and we focus on its airline baggage fee domain. A single case from that benchmark illustrates the phenomenon this report is about. Thomas is flying First Class from Montreal to Portland with ten checked bags, ranging from 55 to 99 pounds. Applying American Airlines' published fee schedule to his itinerary yields $3,445. A current frontier model, given the full published rules and an explicit note about the one difficult step, answers $3,185. The newest and most capable model in the same family, a full generation later and given more room for inference-time reasoning, also answers $3,185." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The two models do not merely fail. They fail identically, down to the dollar. If these failures were caused by limited reasoning capacity, the stronger model should miss differently or stop missing. It does neither. This observation motivated the experiment reported here: the failure appears to live in the model family's learned priors rather than in its inference-time effort, and if that is true, no amount of additional reasoning will remove it. A different system boundary might." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "the-question",
			children: "The question we wanted to answer"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "We investigate whether failures on this benchmark arise primarily from faulty semantic execution rather than from limited reasoning capacity or limited language understanding." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "hypothesis",
			children: "Hypothesis"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "A hypothesis is only useful if it makes predictions that can be tested, and ours makes two. First, replacing probabilistic rule execution with deterministic execution should eliminate most observed failures without requiring a stronger language model. Concretely, a two-stage system in which the language model only produces a structured semantic representation of the input, and an executable specification makes every normative decision, should reach near-perfect accuracy even when the underlying model is weak, and the residual errors should be attributable to semantic parsing rather than to rule execution." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The second prediction is sharper. If execution is the bottleneck, then a budget model behind a deterministic decision procedure should outperform a frontier model reasoning unaided, because the difficult computation has been moved out of the probabilistic component entirely." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "putting-it-to-the-test",
			children: "Putting the idea to the test"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "To test these predictions, we used the 100 hardest (\"Level 3\") problems from RuleArena's airline domain. Each problem is a realistic American Airlines itinerary: a ticket price, a cabin class, a route, and up to eleven items including one free personal item. Ground truth is computed by the benchmark's own reference implementation rather than by human annotation, a property that turns out to matter a great deal, as the next section explains." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"We compared three tiers of Claude:",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineCode, { children: "claude-opus-4-8" }),
			" (frontier),",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineCode, { children: "claude-fable-5" }),
			" (Anthropic's newest and most capable model), and ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineCode, { children: "claude-haiku-4-5" }),
			" ",
			"(budget). Every tier was evaluated under the same three conditions, or arms, on the same 100 cases. In the ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "baseline" }),
			" arm, the model receives the complete published fee rules verbatim as its system prompt, plus the itinerary, and produces the total fee directly. In the ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "verified" }),
			" arm, the model performs autoformalization only, translating the itinerary into a machine-checkable formal representation, and a deterministic solver kernel, described below, executes the policy: the language model never computes a fee, and the kernel never interprets prose. The ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "loop" }),
			" arm extends the verified arm with self-consistency voting, an assertion-retry round, and round-trip back-translation, escalating unresolved cases to the frontier model."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "We deliberately made the baseline hard to beat. The unaided models receive the full policy text, not a paraphrase, and the prompt explicitly states that the free-bag assignment is an optimization rather than a positional lookup. Whatever failures the baseline shows cannot be blamed on missing information: the model is handed the rules and told exactly where the difficulty lies." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Across every arm we measured four things: accuracy against the reference implementation's ground truth, mean language-model latency per case (plus kernel latency where the kernel runs), total cost per run, and cost per correct answer." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "why-rulearena",
			children: "Why RuleArena?"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"We selected",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "https://arxiv.org/abs/2412.08972",
				target: "_blank",
				rel: "noreferrer",
				className: "text-accent underline underline-offset-2",
				children: "RuleArena"
			}),
			" ",
			"(Zhou et al., ACL 2025, MIT license) because it provides executable ground truth through a reference implementation rather than human annotation. This property isolates semantic execution errors from annotation ambiguity: when a model disagrees with the benchmark, the disagreement can be traced to a specific step of a runnable program rather than to a label whose provenance is unknown. RuleArena covers three domains, airline baggage fees, NBA transaction legality, and tax. We used the airline domain because its executable ground truth allowed us to validate our own re-encoding of the policy directly against it."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "implicit-optimization",
			children: "The implicit optimization problem"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The published policy reads like a lookup table. There is a base fee by bag position (1st, 2nd, 3rd, 4th and beyond), by route, and by cabin class. There is a surcharge if a bag is oversized, and another if it is overweight. Some route and class combinations make the first one or two bags free. A human interpreting the policy would apply it left to right, bag by bag." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The reference implementation does something the tables never state explicitly. When N bags are free (\"complimentary\") for a given route and class, the airline does not grant that status to whichever bags happen to be listed first. It assigns the free slots to whichever N bags would otherwise incur the highest oversize or overweight surcharges, minimizing the total charge. The benchmark therefore implicitly requires solving a constrained optimization problem that is absent from the textual policy but present in the executable specification. It is exactly the kind of step a fluent reader glides past, and it is where, as the results below show, the unaided models fail." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "system-boundary",
			children: "A different system boundary"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Our system runs a minimal path through our verification stack, which pairs an autoformalizer with provers and domain-specific solvers. For this experiment it decomposes the task into two computational stages." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Stage 1: autoformalization." }), " A language model reads the passenger's itinerary and formalizes it into a structured, machine-checkable representation: the ticket price, the cabin class, the route, and for every checked bag (skipping the free personal item), its size and weight. It performs no normative computation. It does not compute a fee, apply a threshold, or decide which bag is free."] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Stage 2: deterministic solving." }), " A deterministic decision procedure, written in Catala and hereafter called the verification kernel, acts as the solver over that formal representation, executing the policy: base fees by position, oversize and overweight surcharges per bag, and the optimal assignment of complimentary slots, solved as a genuine top-K selection rather than a guess."] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "why-decomposition-works",
			children: "Why this decomposition works"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "This decomposition deliberately assigns language understanding to the language model while reserving all normative decision-making for the executable specification. The boundary minimizes the amount of computation delegated to probabilistic inference. Interpreting an itinerary is a task language models are demonstrably good at. Executing a policy with an embedded optimization is, as the results below show, a task they are demonstrably unreliable at, regardless of scale. The architecture places each task with the component that can be trusted to perform it. It is also the smallest useful slice of the full stack: the same boundary supports provers that return proof artifacts and counterexamples rather than a single number, and solvers for constraint systems far richer than a fee schedule." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 1,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"RuleArena's own rules and reference script are the source of truth. We hand-wrote the Catala kernel from the rules text and cross-checked it against the reference implementation on all 100 cases before trusting it. That cross-check is what makes the kernel usable as ground truth in everything downstream.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
					className: "font-mono text-[12.5px]",
					children: "run_experiment.py"
				}),
				" ",
				"then runs all nine arms (three models across baseline, verified, and loop) over the same 100 cases. Every output, from the scores to the summary table to the per case response PDF, is generated from that run's logged data."
			] }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBoundaryDiagram, {
				probabilistic: [{
					title: "Stage 1 - autoformalization",
					detail: "A language model reads the passenger's itinerary and formalizes it into a structured, machine-checkable representation: ticket price, cabin class, route, and the size and weight of every checked bag. It performs no normative computation."
				}],
				verified: [{
					title: "Stage 2 - Catala kernel",
					detail: "A deterministic decision procedure executes the policy over that formal representation: base fees by position, oversize and overweight surcharges per bag, and the optimal assignment of complimentary slots as a genuine top-K selection."
				}, {
					title: "Cross-checked vs. reference script",
					detail: "The kernel was validated case by case against RuleArena's own reference implementation on all 100 cases before being trusted as ground truth for anything downstream."
				}]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The kernel's treatment of the optimization is compact enough to show in full:" }),
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
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineCode, { children: "Top3" }), " tracks the three largest values seen so far. Folding it over every bag's oversize or overweight surcharge finds the K bags (at most three, per this fee schedule) that should receive the free slots. It is the same computation the reference implementation performs with Python's sort, done here as a bounded insertion because Catala's list primitives have no built-in sort. We validated the re-encoding case by case against RuleArena's reference implementation before trusting it, and all 100 cases matched exactly on the first clean run."] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "what-we-observed",
			children: "What we observed"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "correctness",
			children: "Correctness"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			headers: [
				"Arm",
				"Accuracy",
				"LLM s/case",
				"$/run",
				"$/correct"
			],
			rows: [
				[
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "frontier baseline" }, "a"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "54.0%" }, "b"),
					"68.08",
					"$18.08",
					"$0.335"
				],
				[
					"frontier verified",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "100.0%" }, "c"),
					"3.32 (+2.78 kernel)",
					"$1.32",
					"$0.013"
				],
				[
					"frontier loop",
					"100.0%",
					"10.67",
					"$4.44",
					"$0.044"
				],
				[
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "fable baseline" }, "d"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "61.0%" }, "e"),
					"25.91",
					"$16.92",
					"$0.277"
				],
				[
					"fable verified",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "100.0%" }, "f"),
					"7.59 (+3.75 kernel)",
					"$3.63",
					"$0.036"
				],
				[
					"fable loop",
					"100.0%",
					"22.52",
					"$11.44",
					"$0.114"
				],
				[
					"cheap baseline",
					"3.0%",
					"23.75",
					"$2.05",
					"$0.682"
				],
				[
					"cheap verified",
					"82.0%",
					"1.92 (+3.63 kernel)",
					"$0.22",
					"$0.003"
				],
				[
					"cheap loop",
					"85.0%",
					"6.12",
					"$1.10",
					"$0.013"
				]
			],
			note: "Frontier is Opus 4.8, fable is Fable 5, cheap is Haiku 4.5."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 2,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Unaided accuracy for all three models sits well under 100%. Every frontier verified and loop arm reaches it. Haiku's verified and loop arms reach 82% and 85%." }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccuracyByArmChart, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Unaided, the frontier models fail at a substantial rate: 46% of cases for Opus 4.8 and 39% for Fable 5, despite receiving the complete published rules and an explicit statement that the free-slot assignment is an optimization. Both verified frontier arms reach 100%. The budget model fails almost entirely unaided, at 3%, and reaches 82% verified and 85% with the loop." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The aggregate numbers tell the overall story, but individual failures are often more revealing. We've made the benchmark interactive so you can compare unaided model outputs with verified outputs on the same RuleArena cases." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"Explore the live playground:",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "https://playground.boundlessintuition.com/",
				target: "_blank",
				rel: "noreferrer",
				className: "text-accent underline underline-offset-2",
				children: "playground.boundlessintuition.com"
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "efficiency",
			children: "Efficiency"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 3,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Accuracy against cost per run, on a log scale. The verified systems exceed the baselines on accuracy and cost simultaneously. Hover a point for the exact arm, its cost per run, and its cost per correct answer." }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CostAccuracyParetoChart, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The verified frontier system is roughly 14 times cheaper per run than its unaided counterpart and about 25 times cheaper per correct answer. The cheapest configuration that beats every unaided baseline, the verified budget model, costs $0.22 per 100-case run, against $18.08 for the unaided frontier baseline." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "latency",
			children: "Latency"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 4,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Mean latency per answer. The unaided baselines spend tens of seconds on inference-time reasoning through the assignment problem. Semantic parsing is fast regardless of how hard that problem is, because the kernel, not the model, executes it." }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LatencyByArmChart, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The verified frontier system answers in roughly 6 seconds end to end against 68 seconds of unaided reasoning. Extracting a bag's dimensions is a short task regardless of how hard the underlying optimization is, and the kernel executes that optimization in milliseconds." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "why-failures-matter",
			children: "Why the failures matter"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Three observations from the results bear directly on the hypothesis." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Identical errors across model generations." }), " On cases both frontier models miss, they frequently return the identical wrong dollar amount, including the $3,185 answer to the Thomas case described in the introduction. The persistence of identical errors across model generations suggests that these failures originate from shared learned priors rather than insufficient inference-time reasoning. Increased reasoning capacity improved explanation quality without correcting the underlying semantic execution. This is the pattern the hypothesis predicts: a prior about how a rule \"should\" work does not shrink as models get stronger, whereas a reasoning gap should."] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Verification eliminates frontier failures completely." }),
			" ",
			"Both frontier models move from 54% and 61% to 100% behind the kernel, with no change to the models themselves. The 46-point and 39-point failure rates were therefore not caused by an inability to interpret the itinerary. The models could always read the input. What they could not reliably do was execute the policy, and removing that responsibility removed the failures."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Residual budget-tier error is confined to semantic parsing." }),
			" ",
			"The verified budget model reaches 82% rather than 100%, and every remaining miss is a parsing failure: an occasionally misread bag weight, or a bag dropped from a list of ten. None are kernel failures. Execution is exact by construction whenever the structured representation is correct, so the residual risk is narrow and measurable rather than open-ended. This is the error profile the hypothesis predicts for a weak parser in front of a sound decision procedure."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Taken together, the evidence supports the hypothesis. The dominant failure mode of the unaided models is semantic execution, not language understanding, and substituting deterministic execution removes it without requiring a stronger model." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "deterministic-execution",
			children: "What changes when execution becomes deterministic"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Deterministic execution changes which model you need." }),
			" ",
			"The verified budget model, at 82%, outperforms both unaided frontier models, at 54% and 61%, while costing about $0.22 per run against roughly $18 and answering in about 6 seconds against 68. A budget model with a verification layer beats a frontier model without one. The practical consequence is that on rule-governed tasks, capability spending and correctness are not the same axis: moving the normative computation into an executable specification buys more accuracy than moving up a model tier, at a small fraction of the price."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Verification is not a tradeoff in this domain." }), " The usual expectation is that additional checking costs money or time. Here it saves both, because the expensive resource was never the check. It was the tens of seconds of inference-time reasoning the unaided model spends attempting an optimization it cannot reliably perform. Replacing that reasoning with a millisecond-scale execution shortens the language model's task to semantic parsing, which is fast and cheap at every tier."] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Where the approach applies." }), " The architecture requires that the governing rules be expressible as an executable specification and that the inputs be extractable as a structured semantic representation. Fee schedules, tax computations, benefit eligibility, and compliance thresholds fit this shape. Tasks whose difficulty lies in the interpretation itself, such as ambiguous clinical narratives or contested legal readings, do not, because the hard part cannot be moved across the trust boundary."] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "When verification does not help." }), " The kernel cannot repair a wrong structured representation. If the parser misreads a weight, the kernel will execute the policy exactly, on the wrong facts. The budget tier's residual 18% is precisely this case. Verification narrows the failure surface to the parsing stage. It does not close it."] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "bigger-picture",
			children: "The bigger picture"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Our results suggest that the principal bottleneck in rule-governed reasoning is not language understanding but semantic execution. Two generations of frontier models, given the complete policy and told where the difficulty lies, fail on 39% to 46% of cases and frequently fail identically, which points to shared learned priors that additional inference-time reasoning does not dislodge. Separating the two functions, so that the language model performs interpretation and an executable specification performs every normative decision, eliminates the frontier failures entirely while reducing inference cost by roughly a factor of fourteen and latency by an order of magnitude, and it lifts a budget model above the unaided frontier. More broadly, these findings support a design paradigm in which language models perform interpretation, while executable specifications remain responsible for normative decision-making. The kernel in this experiment is the simplest instance of that paradigm; the same architecture extends to provers and solvers that return not only the answer but its derivation - which rule applied, which assumptions were made, and which constraints were checked." })
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
	slug: "fluency-is-not-correctness",
	title: "Fluency Is Not Correctness",
	subtitle: "Separating semantic parsing from deterministic execution in rule-governed reasoning.",
	description: "On RuleArena's airline domain, verification lifts two frontier Claude models from 54% and 61% to 100% while cutting cost roughly fourteenfold - and a verified budget model beats both unaided frontier models.",
	tag: "Research",
	author: "Boundless Intuition Research",
	date: "2026-07-17",
	readingTime: "12 min read",
	image: "/blog/fluent-hero.webp",
	Content: FluencyIsNotCorrectness
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
