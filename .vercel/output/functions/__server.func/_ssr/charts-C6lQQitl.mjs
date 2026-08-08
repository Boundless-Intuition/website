import { i as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { _ as Cell, a as YAxis, b as Legend, c as ZAxis, d as ReferenceLine, f as Bar, g as PolarGrid, h as PolarRadiusAxis, i as LineChart, l as Line, m as PolarAngleAxis, n as RadarChart, o as XAxis, p as Radar, r as BarChart, s as Scatter, t as ScatterChart, u as CartesianGrid, v as ResponsiveContainer, y as Tooltip } from "../_libs/recharts+[...].mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/charts-C6lQQitl.js
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
var SEA = {
	light: "oklch(0.47 0.115 170)",
	dark: "oklch(0.79 0.115 170)"
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
var taxConfig = {
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
		theme: SEA
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
//#endregion
export { References as _, CostAccuracyParetoChart as a, H2 as c, Hr as d, InlineCode as f, Prose as g, P as h, ConfusionMatrixFigure as i, H3 as l, Lead as m, CategoryAccuracyChart as n, DataTable as o, LatencyByArmChart as p, CodeBlock as r, Figure as s, AccuracyByArmChart as t, HeadlineMetricsRadar as u, RunVerdictFigure as v, TaxCostAccuracyChart as y };
