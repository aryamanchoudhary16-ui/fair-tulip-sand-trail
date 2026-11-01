import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as useAnalyses, _ as filesFromUnifiedDiff, a as Findings, d as Shell, f as Stat, i as Eyebrow, m as analyzeFiles, n as DiffBlock, u as Panel, v as fmt } from "./stats-CWjN6O2P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workbench-hacuKuJL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SAMPLE = `import pickle

def load_cache(blob):
    return pickle.loads(blob)
`;
function WorkbenchPage() {
	const { study } = useAnalyses();
	const [filename, setFilename] = (0, import_react.useState)("snippet.py");
	const [mode, setMode] = (0, import_react.useState)("file");
	const [source, setSource] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	function run() {
		const text = source.trim();
		if (!text) {
			setError("Paste a Python file or a unified diff first.");
			setResult(null);
			return;
		}
		if (text.length > 2e5) {
			setError("That paste is over 200 KB. Trim it and try again.");
			setResult(null);
			return;
		}
		if (mode === "diff") {
			const files = filesFromUnifiedDiff(text);
			if (!files || files.length === 0) {
				setError("That text does not look like a unified diff.");
				setResult(null);
				return;
			}
			setError("");
			setResult(analyzeFiles(files, study.threshold));
			return;
		}
		const path = filename.trim() || "snippet.py";
		setError("");
		setResult(analyzeFiles([{
			path,
			before: "",
			after: text
		}], study.threshold));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Bench" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 text-3xl font-medium tracking-tight",
			children: "Run the same analysers on a paste"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-sm text-muted",
			children: "A file is treated as all-new lines. A unified diff is scored on its additions. Nothing here is added to the study, and test execution stays off."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex gap-2",
			children: ["file", "diff"].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": mode === item,
				onClick: () => setMode(item),
				className: `inline-flex min-h-11 items-center rounded-md px-3 font-mono text-xs ${mode === item ? "bg-surface-2 text-fg" : "text-muted"}`,
				children: item === "file" ? "Python file" : "Unified diff"
			}, item))
		}),
		mode === "file" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "mt-3 block text-sm",
			htmlFor: "filename",
			children: ["Filename", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "filename",
				value: filename,
				onChange: (event) => setFilename(event.target.value),
				className: "mt-1 w-full rounded-md border border-line bg-surface px-3 py-2 font-mono text-sm"
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value: source,
			onChange: (event) => setSource(event.target.value),
			rows: 12,
			spellCheck: false,
			"aria-label": mode === "file" ? "Python source" : "Unified diff",
			placeholder: mode === "file" ? "def example():\n    return 1" : "diff --git a/app.py b/app.py",
			className: "mt-3 w-full rounded-md border border-line bg-surface p-3 font-mono text-xs leading-5"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: run,
				className: "inline-flex min-h-11 items-center rounded-md bg-brass px-3 text-sm font-medium text-brass-ink",
				children: "Analyse"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					setMode("file");
					setFilename("cache.py");
					setSource(SAMPLE);
					setError("");
				},
				className: "inline-flex min-h-11 items-center rounded-md border border-line px-3 text-sm",
				children: "Load a sample"
			})]
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-alert",
			children: error
		}) : null,
		result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Added",
						value: String(result.linesAdded)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Findings",
						value: String(result.securityFindings)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Per kLOC",
						value: fmt(result.findingsPerThousand, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "State",
						value: result.state
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Findings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Same rule pack as the study. A clean result is not a security proof."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Findings, { findings: result.findings })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiffBlock, { diff: result.diff })
			})
		] }) : null
	] });
}
//#endregion
export { WorkbenchPage as component };
