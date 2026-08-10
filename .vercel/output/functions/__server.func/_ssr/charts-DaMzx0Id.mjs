import { i as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { a as XAxis, c as Bar, d as PolarRadiusAxis, f as PolarGrid, g as Legend, h as Tooltip, i as YAxis, l as Radar, m as ResponsiveContainer, n as RadarChart, o as Scatter, p as Cell, r as BarChart, s as ZAxis, t as ScatterChart, u as PolarAngleAxis } from "../_libs/recharts+[...].mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/charts-DaMzx0Id.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Prose({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-w-0 max-w-[70ch]",
		children
	});
}
function Lead({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-8 text-[18px] leading-[1.65] text-foreground/90",
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
function UL({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mb-5 list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-foreground/85",
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
/** Unlit. Baselines, and the model on its own. */
var BONE = {
	light: "oklch(0.56 0.03 90)",
	dark: "oklch(0.88 0.02 92)"
};
/** The field. Verified runs, and the kernel. */
var ULTRA = {
	light: "oklch(0.45 0.16 266)",
	dark: "oklch(0.72 0.14 266)"
};
/** The lantern, and the site accent. Reserved for the best verified outcome. */
var LANTERN = {
	light: "oklch(0.58 0.14 74)",
	dark: "oklch(0.82 0.13 82)"
};
/** Warm skin. A third peer category, where three must be told apart. */
var SKIN = {
	light: "oklch(0.64 0.09 52)",
	dark: "oklch(0.82 0.08 56)"
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
		theme: BONE
	},
	verified: {
		label: "Verified",
		theme: ULTRA
	},
	loop: {
		label: "Verified + loop",
		theme: LANTERN
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
		theme: BONE
	},
	fable: {
		label: "Claude Fable 5",
		theme: ULTRA
	},
	haiku: {
		label: "Claude Haiku 4.5",
		theme: SKIN
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
var taxConfig = {
	baseline: {
		label: "Baseline",
		theme: BONE
	},
	verified: {
		label: "Verified",
		theme: ULTRA
	},
	loop: {
		label: "Verified + loop",
		theme: LANTERN
	}
};
var taxBaselineArms = [{
	cost: .0119,
	acc: 62,
	series: "baseline",
	arm: "Cheap · baseline",
	label: "cheap baseline",
	lx: 0,
	ly: -14,
	anchor: "middle"
}, {
	cost: .0185,
	acc: 98.9,
	series: "baseline",
	arm: "Frontier · baseline",
	label: "frontier baseline",
	lx: 0,
	ly: 22,
	anchor: "middle"
}];
var taxVerifiedArms = [{
	cost: 94e-5,
	acc: 98.9,
	series: "verified",
	arm: "Cheap · verified",
	label: "cheap verified",
	lx: 12,
	ly: 4,
	anchor: "start"
}, {
	cost: .0059,
	acc: 100,
	series: "verified",
	arm: "Frontier · verified",
	label: "frontier verified",
	lx: 12,
	ly: 4,
	anchor: "start"
}];
var taxLoopArms = [{
	cost: .0044,
	acc: 100,
	series: "loop",
	arm: "Cheap · verified + loop",
	label: "cheap loop",
	lx: -12,
	ly: 4,
	anchor: "end"
}, {
	cost: .02,
	acc: 100,
	series: "loop",
	arm: "Frontier · verified + loop",
	label: "frontier loop",
	lx: 0,
	ly: -14,
	anchor: "middle"
}];
var taxKeyRows = [
	...taxBaselineArms,
	...taxVerifiedArms,
	...taxLoopArms
].sort((a, b) => a.cost - b.cost);
var fmtCost = (c) => `$${c.toFixed(c < .001 ? 5 : 4)}`;
var fmtAcc = (a) => `${a.toFixed(a % 1 === 0 ? 0 : 1)}%`;
function TaxDot(props) {
	const { cx, cy, payload, fill } = props;
	if (cx == null || cy == null) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx,
		cy,
		r: 6.5,
		fill,
		stroke: "var(--background)",
		strokeWidth: 1.5
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
		x: cx + payload.lx,
		y: cy + payload.ly,
		textAnchor: payload.anchor,
		fontSize: 10,
		className: "font-mono [display:none] md:[display:inline]",
		fill: "var(--muted-foreground)",
		children: payload.label
	})] });
}
function TaxTooltip({ active, payload }) {
	if (!active || !payload?.length) return null;
	const p = payload[0].payload;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-sm border border-border bg-background px-3 py-2 text-xs shadow-lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-medium text-foreground",
			children: p.arm
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-1.5 space-y-0.5 font-mono text-[11px] tabular-nums text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [fmtAcc(p.acc), " correct"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [fmtCost(p.cost), " per correct answer"] })]
		})]
	});
}
var TAX_CHART_ID = "chart-tax-arms";
function TaxCostAccuracyChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
		title: "Cost against accuracy",
		unit: "Cost per correct answer (USD, log scale)",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-chart": TAX_CHART_ID,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartStyle, {
					id: TAX_CHART_ID,
					config: taxConfig
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
					config: taxConfig,
					className: "aspect-[16/11] w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScatterChart, {
						margin: {
							top: 20,
							right: 24,
							left: 0,
							bottom: 4
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								...AXIS,
								type: "number",
								dataKey: "cost",
								scale: "log",
								domain: [6e-4, .03],
								ticks: [
									.001,
									.003,
									.01,
									.03
								],
								tickFormatter: (v) => `$${v}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								...AXIS,
								type: "number",
								dataKey: "acc",
								domain: [55, 108],
								ticks: [
									60,
									70,
									80,
									90,
									100
								],
								tickFormatter: (v) => `${v}%`,
								width: 46
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZAxis, { range: [72, 72] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
								content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaxTooltip, {}),
								cursor: { strokeDasharray: "3 3" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, {
								verticalAlign: "top",
								content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DotLegend, {
									config: taxConfig,
									keys: [
										"baseline",
										"verified",
										"loop"
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scatter, {
								name: "Baseline",
								data: taxBaselineArms,
								fill: "var(--color-baseline)",
								shape: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaxDot, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scatter, {
								name: "Verified",
								data: taxVerifiedArms,
								fill: "var(--color-verified)",
								shape: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaxDot, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scatter, {
								name: "Verified + loop",
								data: taxLoopArms,
								fill: "var(--color-loop)",
								shape: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaxDot, {})
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-4 space-y-1.5 border-t border-border pt-4 md:hidden",
					children: taxKeyRows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline gap-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "size-2 shrink-0 rounded-full",
								style: { backgroundColor: `var(--color-${r.series})` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "flex-1 text-[12.5px] leading-snug text-foreground/80",
								children: r.arm
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground",
								children: [
									fmtAcc(r.acc),
									" · ",
									fmtCost(r.cost)
								]
							})
						]
					}, r.arm))
				})
			]
		})
	});
}
var latencyConfig = {
	llm: {
		label: "Model",
		theme: BONE
	},
	kernel: {
		label: "Kernel",
		theme: ULTRA
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
		theme: BONE
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
var imoTotalConfig = { total: {
	label: "Total proving time",
	theme: LANTERN
} };
var imoTotalData = [
	{
		label: "Dirac (ours)",
		total: 7.302,
		display: "7h 18m",
		ours: true
	},
	{
		label: "Pramaana Hardy",
		total: 8.95,
		display: "8h 57m",
		ours: false
	},
	{
		label: "Axiom AxiomProver",
		total: 24.933,
		display: "24h 56m",
		ours: false
	}
];
function ImoTotalTimeChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
		title: "Total proving time",
		unit: "Hours to prove all six problems",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
			config: imoTotalConfig,
			className: "aspect-[16/9] w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data: imoTotalData,
				layout: "vertical",
				barCategoryGap: "26%",
				maxBarSize: 34,
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
						domain: [0, 25],
						ticks: [
							0,
							5,
							10,
							15,
							20,
							25
						],
						tickFormatter: (v) => `${v}h`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						...AXIS,
						type: "category",
						dataKey: "label",
						width: 150
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
						cursor: tooltipCursor,
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, { formatter: (_value, name, item) => tooltipRow(name, item.payload.display) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "total",
						radius: [
							0,
							2,
							2,
							0
						],
						children: imoTotalData.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
							fill: d.ours ? "var(--color-total)" : "var(--muted-foreground)",
							fillOpacity: d.ours ? 1 : .45
						}, d.label))
					})
				]
			})
		})
	});
}
var imoProblemConfig = {
	dirac: {
		label: "Dirac (ours)",
		theme: LANTERN
	},
	hardy: {
		label: "Pramaana Hardy",
		theme: ULTRA
	},
	axiom: {
		label: "Axiom AxiomProver",
		theme: BONE
	}
};
var imoProblemData = [
	{
		label: "Q1",
		dirac: .485,
		hardy: .341,
		axiom: .4
	},
	{
		label: "Q2",
		dirac: 1.338,
		hardy: 2.883,
		axiom: 6
	},
	{
		label: "Q3",
		dirac: 2.174,
		hardy: 3.067,
		axiom: 14.483
	},
	{
		label: "Q4",
		dirac: .266,
		hardy: .272,
		axiom: .65
	},
	{
		label: "Q5",
		dirac: .303,
		hardy: .519,
		axiom: 1.083
	},
	{
		label: "Q6",
		dirac: 2.735,
		hardy: 1.867,
		axiom: 2.317
	}
];
function formatHours(value) {
	const totalMinutes = Math.round(value * 60);
	const h = Math.floor(totalMinutes / 60);
	const m = totalMinutes % 60;
	return h === 0 ? `${m}m` : `${h}h ${m.toString().padStart(2, "0")}m`;
}
function ImoTimeByProblemChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
		title: "Proving time by problem",
		unit: "Hours per problem",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
			config: imoProblemConfig,
			className: "aspect-[16/10] w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data: imoProblemData,
				barCategoryGap: "28%",
				maxBarSize: 30,
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
						domain: [0, 15],
						ticks: [
							0,
							3,
							6,
							9,
							12,
							15
						],
						tickFormatter: (v) => `${v}h`,
						width: 40
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
						cursor: tooltipCursor,
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, { formatter: (value, name) => tooltipRow(name, formatHours(Number(value))) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, {
						verticalAlign: "top",
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DotLegend, {
							config: imoProblemConfig,
							keys: [
								"dirac",
								"hardy",
								"axiom"
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "dirac",
						fill: "var(--color-dirac)",
						radius: [
							2,
							2,
							0,
							0
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "hardy",
						fill: "var(--color-hardy)",
						radius: [
							2,
							2,
							0,
							0
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "axiom",
						fill: "var(--color-axiom)",
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
//#endregion
export { TaxCostAccuracyChart as _, Figure as a, HeadlineMetricsRadar as c, ImoTotalTimeChart as d, InlineCode as f, Prose as g, P as h, DataTable as i, Hr as l, Lead as m, CodeBlock as n, H2 as o, LatencyByArmChart as p, CostAccuracyParetoChart as r, H3 as s, AccuracyByArmChart as t, ImoTimeByProblemChart as u, UL as v };
