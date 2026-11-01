import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as useAnalyses, c as PATCHES, d as Shell, i as Eyebrow, u as Panel, x as joinStudy } from "./stats-CWjN6O2P.mjs";
import { a as buildMetricsCsv, c as metricsHash, i as buildLabelsCsv, l as pipelineLines, n as buildConfigJson, o as buildReportMarkdown, r as buildFindingsCsv, s as downloadText, t as METRIC_DEFS } from "./report-1v8Jrc28.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/export-C8LK4XjL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ExportPage() {
	const { study, analyses } = useAnalyses();
	const rows = (0, import_react.useMemo)(() => joinStudy(PATCHES, analyses, study), [analyses, study]);
	const markdown = (0, import_react.useMemo)(() => buildReportMarkdown(rows, study), [rows, study]);
	const [copied, setCopied] = (0, import_react.useState)("");
	async function copy(label, text) {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(label);
		} catch {
			setCopied("Clipboard blocked — use download instead.");
		}
	}
	const files = [
		{
			name: "summary.md",
			mime: "text/markdown",
			body: markdown
		},
		{
			name: "metrics.csv",
			mime: "text/csv",
			body: buildMetricsCsv(rows, study)
		},
		{
			name: "findings.csv",
			mime: "text/csv",
			body: buildFindingsCsv(rows)
		},
		{
			name: "labels.csv",
			mime: "text/csv",
			body: buildLabelsCsv(rows, study)
		},
		{
			name: "config.json",
			mime: "application/json",
			body: buildConfigJson(study)
		},
		{
			name: "pipeline.log",
			mime: "text/plain",
			body: pipelineLines(rows, study.replayCount).join("\n") + "\n"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Export" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 text-3xl font-medium tracking-tight",
			children: "Replication package"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-sm text-muted",
			children: "Config, metric tables, and a summary you can attach to a report. The metrics CSV has no timestamps, so two exports with the same labels and threshold match. No token and no home-directory path is included."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 font-mono text-xs text-muted",
			children: ["metrics hash ", metricsHash()]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-alert",
			children: "Public diffs can already contain secrets. Do not republish a raw diff if you spot one."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 flex flex-col gap-2",
			children: files.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs",
					children: file.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => downloadText(file.name, file.body, file.mime),
						className: "inline-flex min-h-11 items-center rounded-md bg-brass px-3 text-sm font-medium text-brass-ink",
						children: "Download"
					})
				})]
			}, file.name))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Summary preview"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => copy("summary", markdown),
						className: "min-h-11 text-sm text-brass",
						children: copied === "summary" ? "Copied" : "Copy"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-3 max-h-96 overflow-auto font-mono text-xs leading-5 text-muted",
					children: markdown
				}),
				copied && copied !== "summary" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: copied
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "How to rerun reporting"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mt-2 flex list-decimal flex-col gap-2 pl-4 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Keep the fixture texts and the label CSV." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Set the complexity threshold to the value in config.json." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Regenerate metrics.csv. Do not refresh from the network." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Read the limitations in summary.md before quoting a number." })
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Metric definitions"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-col gap-4",
				children: METRIC_DEFS.map((metric) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-brass",
						children: metric.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: metric.formula
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-muted",
						children: metric.tool
					})
				] }, metric.name))
			})]
		})
	] });
}
//#endregion
export { ExportPage as component };
