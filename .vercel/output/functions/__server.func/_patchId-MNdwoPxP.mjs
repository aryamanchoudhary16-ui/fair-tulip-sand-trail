import { S as require_jsx_runtime, b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./_ssr/router-CLTWiPsV.mjs";
import { C as labelOf, E as patchRef, M as useAnalyses, O as setLabel, a as Findings, c as PATCHES, d as Shell, f as Stat, i as Eyebrow, l as PROVENANCE, n as DiffBlock, s as LabelPill, u as Panel, v as fmt } from "./_ssr/stats-CWjN6O2P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_patchId-MNdwoPxP.js
var import_jsx_runtime = require_jsx_runtime();
function PatchDetailPage() {
	const { patchId } = Route.useParams();
	const { study, analyses } = useAnalyses();
	const patch = PATCHES.find((item) => item.id === patchId);
	if (!patch) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-2xl font-medium",
		children: "Patch not in this fixture"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/patches",
		className: "mt-4 inline-flex min-h-11 items-center text-sm text-brass",
		children: "Back to the table"
	})] });
	const metrics = analyses.get(patch.id);
	const current = labelOf(patch, study);
	const highs = metrics.findings.filter((finding) => finding.severity === "HIGH");
	function choose(label) {
		setLabel(patch.id, label, current.notes);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/patches",
			className: "font-mono text-xs text-muted",
			children: "← Patches"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
			className: "mt-3",
			children: "Patch"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 text-2xl font-medium tracking-tight",
			children: patch.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 font-mono text-xs text-muted",
			children: [
				patchRef(patch.repo, patch.externalId),
				" · ",
				patch.author,
				" · ",
				patch.createdAt.slice(0, 10),
				" · ",
				patch.source
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Added",
					value: String(metrics.linesAdded)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Deleted",
					value: String(metrics.linesDeleted)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Files",
					value: String(metrics.filesTouched)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Hunks",
					value: String(metrics.hunks)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Max CC",
					value: fmt(metrics.maxComplexity, 0),
					hint: `threshold ${study.threshold}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Findings",
					value: String(metrics.securityFindings),
					hint: `${metrics.highSeverity} high`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Per kLOC",
					value: fmt(metrics.findingsPerThousand, 1)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Tests",
					value: metrics.hasTestChange ? "yes" : "no",
					hint: metrics.state
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Provenance"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelPill, { label: current.label })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						"Rater ",
						study.raterId,
						current.edited ? " · edited in this browser" : " · seeded confirmation",
						". A hint never becomes the label on its own."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4",
					children: PROVENANCE.map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": current.label === label,
						onClick: () => choose(label),
						className: `min-h-11 rounded-md border px-2 font-mono text-xs ${current.label === label ? "border-brass text-brass" : "border-line text-muted"}`,
						children: label
					}, label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 block text-sm",
					htmlFor: "notes",
					children: ["Rationale", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "notes",
						value: current.notes,
						maxLength: 500,
						rows: 3,
						onChange: (event) => setLabel(patch.id, current.label, event.target.value),
						className: "mt-1 w-full rounded-md border border-line bg-bg p-3 text-sm"
					})]
				}),
				patch.rater2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"Second rater (classmate): ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-fg",
							children: patch.rater2
						}),
						patch.rater2 === current.label ? " · agree" : " · disagree"
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "No second rating on this patch."
				}),
				patch.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 rounded-md border border-line bg-bg p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: ["Hint only: ", patch.hint]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setLabel(patch.id, "ai-assisted", current.notes || patch.hint || ""),
						className: "mt-2 inline-flex min-h-11 items-center text-sm text-brass",
						children: "Confirm as ai-assisted"
					})]
				}) : null
			]
		}),
		highs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium text-alert",
				children: "High severity"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Findings, { findings: highs })
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: "Findings"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "A clean scan is not evidence the patch is secure."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Findings, { findings: metrics.findings })
				}),
				metrics.ignoredFiles.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-muted",
					children: ["Ignored paths: ", metrics.ignoredFiles.join(", ")]
				}) : null,
				metrics.complexFunctions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 font-mono text-xs text-muted",
					children: metrics.complexFunctions.map((fn) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						fn.name,
						" · CC ",
						fn.complexity,
						" · ",
						fn.file
					] }, `${fn.file}-${fn.name}`))
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-lg font-medium",
				children: "Diff"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiffBlock, { diff: metrics.diff })]
		})
	] });
}
//#endregion
export { PatchDetailPage as component };
