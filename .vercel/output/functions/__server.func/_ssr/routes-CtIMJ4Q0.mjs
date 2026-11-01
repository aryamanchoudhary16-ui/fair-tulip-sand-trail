import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as labelOf, D as resetStudy, E as patchRef, M as useAnalyses, T as markReplay, c as PATCHES, d as Shell, f as Stat, h as cn, i as Eyebrow, k as setRater, r as EXPERIMENT, s as LabelPill, t as COLLECTION_LOG, u as Panel } from "./stats-CWjN6O2P.mjs";
import { l as pipelineLines } from "./report-1v8Jrc28.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CtIMJ4Q0.js
var import_jsx_runtime = require_jsx_runtime();
var ORDER = [
	"human",
	"ai-assisted",
	"mixed",
	"unknown"
];
var BAR = {
	human: "bg-human",
	"ai-assisted": "bg-ai",
	mixed: "bg-mixed",
	unknown: "bg-unknown"
};
function StudyPage() {
	const { study, analyses } = useAnalyses();
	const counts = Object.fromEntries(ORDER.map((label) => [label, 0]));
	let partial = 0;
	let labelled = 0;
	for (const patch of PATCHES) {
		counts[labelOf(patch, study).label] += 1;
		labelled += 1;
		if (analyses.get(patch.id)?.state === "partial") partial += 1;
	}
	const rows = PATCHES.map((patch) => ({
		patch,
		metrics: analyses.get(patch.id),
		label: labelOf(patch, study).label,
		notes: labelOf(patch, study).notes,
		edited: labelOf(patch, study).edited
	}));
	const hot = [...rows].filter((row) => row.metrics.highSeverity > 0).sort((a, b) => b.metrics.highSeverity - a.metrics.highSeverity).slice(0, 3);
	const log = pipelineLines(rows, study.replayCount);
	const stamp = study.analyzedAt.replace("T", " ").slice(0, 16);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Experiment" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 max-w-2xl text-3xl font-medium tracking-tight",
			children: "Do AI-assisted changes differ on static signals?"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl border-l-2 border-brass pl-4 text-sm text-muted",
			children: "Quality, security-smell density, and test presence on a curated Python fixture. The numbers describe this sample. They do not say that AI assistance causes defects."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Collected",
					value: String(PATCHES.length),
					hint: "public pull requests"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Labelled",
					value: String(labelled),
					hint: "unknown stays in the set"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Analysed",
					value: String(PATCHES.length - partial),
					hint: "complete pairs"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Partial",
					value: String(partial),
					hint: "parse error, run continued"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "lg:col-span-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-medium",
							children: "Provenance mix"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs text-muted",
							children: [
								"last analysis ",
								stamp,
								" UTC"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 flex flex-col gap-3",
						children: ORDER.map((label) => {
							const width = Math.round(counts[label] / PATCHES.length * 100);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelPill, { label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-xs tabular-nums text-muted",
									children: [
										counts[label],
										" · ",
										width,
										"%"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-2 rounded-full bg-surface-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("h-2 rounded-full", BAR[label]),
									style: { width: `${width}%` }
								})
							})] }, label);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/compare",
							className: "inline-flex min-h-11 items-center rounded-md bg-brass px-3 text-sm font-medium text-brass-ink",
							children: "Open comparison"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/patches",
							className: "inline-flex min-h-11 items-center rounded-md border border-line px-3 text-sm",
							children: "Review patches"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "lg:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "High-severity smells"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Listed individually, as the patch detail view requires."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-col",
						children: hot.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-b border-line last:border-b-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/patches/$patchId",
								params: { patchId: row.patch.id },
								className: "flex min-h-11 items-center justify-between gap-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-sm",
										children: row.patch.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs text-muted",
										children: patchRef(row.patch.repo, row.patch.externalId)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "shrink-0 font-mono text-xs text-alert",
									children: [row.metrics.highSeverity, " high"]
								})]
							})
						}, row.patch.id))
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: "Workspace"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: EXPERIMENT.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Creator"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: EXPERIMENT.creator }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Language"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: EXPERIMENT.language }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Window"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "font-mono text-xs",
							children: [
								EXPERIMENT.dateWindow[0],
								" – ",
								EXPERIMENT.dateWindow[1]
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Sample cap"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono tabular-nums",
							children: EXPERIMENT.sampleCap
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-mono text-xs text-muted",
					children: "config/ · cache/ · data/ · logs/ · export/"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-ok",
					children: "Config valid. Title, creator, language, window, and repos are set."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 flex flex-col gap-1 font-mono text-xs text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["patchgauge ", EXPERIMENT.toolVersion] }), EXPERIMENT.analysers.map((analyser) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						analyser.name,
						" ",
						analyser.version
					] }, analyser.name))]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: "Operator"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 block text-sm",
					htmlFor: "rater",
					children: ["Rater id", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "rater",
						value: study.raterId,
						onChange: (event) => setRater(event.target.value),
						maxLength: 40,
						className: "mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 font-mono text-sm text-fg"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "Stored with each label you change. Tokens are never written here."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => markReplay(),
						className: "inline-flex min-h-11 items-center rounded-md border border-line px-3 text-sm",
						children: "Re-run pipeline"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => resetStudy(),
						className: "inline-flex min-h-11 items-center rounded-md px-3 text-sm text-muted",
						children: "Reset labels"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-muted",
					children: [
						"Replay ",
						study.replayCount === 0 ? "has not been requested" : `count ${study.replayCount}`,
						". Completed patch and analyser pairs are skipped. The unparsable file stays partial."
					]
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: "Collection log"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Readable without calling GitHub again. One private repository was skipped."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-col gap-2",
					children: COLLECTION_LOG.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "font-mono text-xs text-muted",
						children: line
					}, line))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: "Pipeline log"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "JSON lines, one record per patch and analyser. Failures stay on their own row."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pre", {
					className: "mt-3 max-h-64 overflow-auto rounded-md bg-bg p-3 font-mono text-xs leading-5 text-muted",
					children: [log.slice(0, 12).join("\n"), log.length > 12 ? `\n… ${log.length - 12} more lines in the export` : ""]
				})
			]
		})
	] });
}
//#endregion
export { StudyPage as component };
