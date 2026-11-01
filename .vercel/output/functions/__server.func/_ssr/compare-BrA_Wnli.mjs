import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as setThreshold, M as useAnalyses, S as kappaBand, c as PATCHES, d as Shell, g as cohensKappa, i as Eyebrow, j as summarize, u as Panel, v as fmt, w as mannWhitney, x as joinStudy, y as fmtP } from "./stats-CWjN6O2P.mjs";
import { t as METRIC_DEFS } from "./report-1v8Jrc28.mjs";
import { a as Bar, c as Tooltip, i as CartesianGrid, n as YAxis, o as Cell, r as XAxis, s as ResponsiveContainer, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/compare-BrA_Wnli.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tooltipStyle = {
	background: "var(--color-surface)",
	border: "1px solid var(--color-line)",
	borderRadius: 8,
	color: "var(--color-fg)",
	fontSize: 12
};
function MeanChart({ human, ai }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	const data = [
		"Added lines",
		"Max complexity",
		"Findings / kLOC",
		"Test change %"
	].map((metric, index) => {
		const humanRaw = human[index] ?? 0;
		const aiRaw = ai[index] ?? 0;
		const max = Math.max(humanRaw, aiRaw, .001);
		return {
			metric,
			human: humanRaw / max * 100,
			ai: aiRaw / max * 100,
			humanRaw,
			aiRaw
		};
	});
	if (!mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-72 rounded-lg border border-line bg-surface" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-72 w-full min-w-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
				layout: "vertical",
				margin: {
					top: 8,
					right: 8,
					left: 8,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-line)",
						horizontal: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						type: "number",
						domain: [0, 100],
						tick: {
							fill: "var(--color-muted)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						type: "category",
						dataKey: "metric",
						width: 112,
						tick: {
							fill: "var(--color-muted)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						contentStyle: tooltipStyle,
						cursor: { fill: "var(--color-surface-2)" },
						formatter: (value, name, item) => {
							const payload = item.payload;
							return [(name === "human" ? payload.humanRaw : payload.aiRaw).toFixed(1), String(name)];
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "human",
						name: "human",
						fill: "var(--color-human)",
						radius: [
							0,
							2,
							2,
							0
						],
						barSize: 8
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "ai",
						name: "ai-assisted",
						fill: "var(--color-ai)",
						radius: [
							0,
							2,
							2,
							0
						],
						barSize: 8
					})
				]
			})
		})
	});
}
function RateChart({ rows }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	const data = rows.filter((row) => row.label === "human" || row.label === "ai-assisted").map((row) => ({
		name: `${row.patch.repo.split("/")[0]}#${row.patch.externalId}`,
		value: Number((row.metrics.findingsPerThousand ?? 0).toFixed(1)),
		label: row.label
	})).sort((a, b) => a.value - b.value);
	if (!mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-80 rounded-lg border border-line bg-surface" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-80 w-full min-w-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 48
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-line)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "name",
						interval: 0,
						angle: -50,
						textAnchor: "end",
						height: 60,
						tick: {
							fill: "var(--color-muted)",
							fontSize: 10
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fill: "var(--color-muted)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false,
						width: 36
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						contentStyle: tooltipStyle,
						cursor: { fill: "var(--color-surface-2)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "value",
						name: "Findings / kLOC",
						radius: [
							2,
							2,
							0,
							0
						],
						children: data.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: entry.label === "human" ? "var(--color-human)" : "var(--color-ai)" }, entry.name))
					})
				]
			})
		})
	});
}
var GROUPS = [
	"human",
	"ai-assisted",
	"mixed"
];
function values(rows, label, pick) {
	return rows.filter((row) => row.label === label).map(pick).filter((value) => value !== null);
}
function ComparePage() {
	const { study, analyses } = useAnalyses();
	const rows = (0, import_react.useMemo)(() => joinStudy(PATCHES, analyses, study), [analyses, study]);
	const compared = rows.filter((row) => row.label !== "unknown");
	const unknown = rows.length - compared.length;
	const small = GROUPS.filter((label) => rows.filter((row) => row.label === label).length < 20);
	const specs = [
		{
			name: "Lines added",
			note: "Size of the change",
			pick: (row) => row.metrics.linesAdded,
			digits: 1
		},
		{
			name: "Max complexity",
			note: "Changed functions only",
			pick: (row) => row.metrics.maxComplexity,
			digits: 1
		},
		{
			name: "Findings / kLOC",
			note: "Security smells per thousand added lines",
			pick: (row) => row.metrics.findingsPerThousand,
			digits: 1
		},
		{
			name: "Test change",
			note: "1 if a test file changed, else 0",
			pick: (row) => row.metrics.hasTestChange ? 1 : 0,
			digits: 2
		},
		{
			name: "High severity",
			note: "Count of HIGH smells",
			pick: (row) => row.metrics.highSeverity,
			digits: 2
		}
	];
	const humanRates = values(rows, "human", (row) => row.metrics.findingsPerThousand);
	const aiRates = values(rows, "ai-assisted", (row) => row.metrics.findingsPerThousand);
	const rateTest = mannWhitney(humanRates, aiRates);
	const ccTest = mannWhitney(values(rows, "human", (row) => row.metrics.maxComplexity), values(rows, "ai-assisted", (row) => row.metrics.maxComplexity));
	const pairs = rows.filter((row) => row.patch.rater2).map((row) => ({
		a: row.label,
		b: row.patch.rater2,
		id: row.patch.id,
		title: row.patch.title
	}));
	const kappa = cohensKappa(pairs.map((pair) => ({
		a: pair.a,
		b: pair.b
	})));
	const fights = pairs.filter((pair) => pair.a !== pair.b);
	const mean = (label, pick) => summarize(values(rows, label, pick)).mean ?? 0;
	const humanMeans = [
		mean("human", (row) => row.metrics.linesAdded),
		mean("human", (row) => row.metrics.maxComplexity),
		mean("human", (row) => row.metrics.findingsPerThousand),
		mean("human", (row) => row.metrics.hasTestChange ? 100 : 0)
	];
	const aiMeans = [
		mean("ai-assisted", (row) => row.metrics.linesAdded),
		mean("ai-assisted", (row) => row.metrics.maxComplexity),
		mean("ai-assisted", (row) => row.metrics.findingsPerThousand),
		mean("ai-assisted", (row) => row.metrics.hasTestChange ? 100 : 0)
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Comparison" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 text-3xl font-medium tracking-tight",
			children: "Human against AI-assisted"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 max-w-2xl text-sm text-muted",
			children: [
				unknown,
				" unknown ",
				unknown === 1 ? "patch is" : "patches are",
				" excluded from this comparison and kept in the dataset. Mixed stays visible but the rank test uses only the two primary groups."
			]
		}),
		small.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 rounded-lg border border-brass/40 bg-surface px-3 py-3 text-sm",
			children: [
				small.join(", "),
				" ",
				small.length === 1 ? "has" : "have",
				" fewer than 20 patches. This is a pilot. Do not treat a difference here as a result."
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: "Complexity threshold"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Functions above this count as complex. Default is 10."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "font-mono text-xs text-muted",
					children: ["Threshold", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 1,
						max: 50,
						value: study.threshold,
						onChange: (event) => setThreshold(Number(event.target.value)),
						className: "ml-2 min-h-11 w-20 rounded-md border border-line bg-bg px-2 text-sm text-fg"
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex flex-col gap-3",
			children: specs.map((spec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-medium",
					children: spec.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: spec.note
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-3 gap-2",
					children: GROUPS.map((label) => {
						const stat = summarize(values(rows, label, spec.pick));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-muted",
								children: label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xl tabular-nums",
								children: fmt(stat.mean, spec.digits)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-xs tabular-nums text-muted",
								children: [
									"n ",
									stat.count,
									" · med ",
									fmt(stat.median, spec.digits)
								]
							})
						] }, label);
					})
				})
			] }, spec.name))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: "Mean rates"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Each row is scaled to the larger group so different units can share the chart. Tooltip and the table show the real means. Sage is human, brass is AI-assisted."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex gap-4 font-mono text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-human",
						children: "human"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-ai",
						children: "ai-assisted"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeanChart, {
						human: humanMeans,
						ai: aiMeans
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: "Findings per thousand added lines"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "One bar per primary-group patch. A smell in a two-line patch inflates the rate — read it beside lines added."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RateChart, { rows })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: "Exploratory rank test"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Mann–Whitney U, two-sided, with a tie correction and a continuity correction. Not confirmatory. Not causal."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 flex flex-col gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestLine, {
						name: "Findings / kLOC",
						result: rateTest
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestLine, {
						name: "Max complexity",
						result: ccTest
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: "Inter-rater agreement"
				}),
				kappa ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-mono text-2xl tabular-nums",
					children: fmt(kappa.kappa, 2)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Cohen's kappa on ",
						kappa.n,
						" overlapping patches · ",
						kappa.agree,
						" agreements · ",
						kappaBand(kappa.kappa),
						" ",
						"agreement. Descriptive only."
					]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "No overlap to score."
				}),
				fights.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-col",
					children: fights.map((pair) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-b border-line py-2 last:border-b-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/patches/$patchId",
							params: { patchId: pair.id },
							className: "text-sm",
							children: pair.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs text-muted",
							children: [
								pair.a,
								" vs ",
								pair.b
							]
						})]
					}, pair.id))
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Limitations"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-2 flex list-disc flex-col gap-1 pl-4 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Labelling error, visible in the disagreements above." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Public-repo bias. Nothing here is private or enterprise code." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Static false positives. MD5 used as a cache key still raises PGSEC009." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Python only. Java and TypeScript globs are recognised for tests, not scored for complexity." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						rows.length,
						" patches in total, under the 80-patch study bar.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/export",
							className: "text-brass",
							children: "The export says so in writing."
						})
					] })
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: "Metric names"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-col gap-3",
					children: METRIC_DEFS.slice(0, 6).map((metric) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-brass",
						children: metric.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: metric.formula
					})] }, metric.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/export",
					className: "mt-3 inline-flex min-h-11 items-center text-sm text-brass",
					children: "Full definitions and the replication package"
				})
			]
		})
	] });
}
function TestLine({ name, result }) {
	if (!result) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [name, ": too few numeric values to report U."] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-fg",
		children: name
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "mt-1 block font-mono text-xs text-muted",
		children: [
			"U ",
			fmt(result.u, 1),
			" · n ",
			result.n1,
			"/",
			result.n2,
			" · z ",
			fmt(result.z, 2),
			" · p ",
			fmtP(result.p)
		]
	})] });
}
//#endregion
export { ComparePage as component };
