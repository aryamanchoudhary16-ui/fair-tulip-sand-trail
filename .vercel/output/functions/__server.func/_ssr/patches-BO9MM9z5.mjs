import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as patchRef, M as useAnalyses, b as importLabels, c as PATCHES, d as Shell, i as Eyebrow, l as PROVENANCE, s as LabelPill, u as Panel, x as joinStudy } from "./stats-CWjN6O2P.mjs";
import { i as buildLabelsCsv, s as downloadText, u as splitCsvLine } from "./report-1v8Jrc28.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/patches-BO9MM9z5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PatchListPage() {
	const { study, analyses } = useAnalyses();
	const [query, setQuery] = (0, import_react.useState)("");
	const [label, setLabel] = (0, import_react.useState)("all");
	const [onlyFindings, setOnlyFindings] = (0, import_react.useState)(false);
	const [onlyTests, setOnlyTests] = (0, import_react.useState)(false);
	const [onlyPartial, setOnlyPartial] = (0, import_react.useState)(false);
	const [sort, setSort] = (0, import_react.useState)("findings");
	const [csvText, setCsvText] = (0, import_react.useState)("");
	const [importNote, setImportNote] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => {
		const joined = joinStudy(PATCHES, analyses, study);
		const q = query.trim().toLowerCase();
		const filtered = joined.filter((row) => {
			if (label !== "all" && row.label !== label) return false;
			if (onlyFindings && row.metrics.securityFindings === 0) return false;
			if (onlyTests && !row.metrics.hasTestChange) return false;
			if (onlyPartial && row.metrics.state !== "partial") return false;
			if (!q) return true;
			return `${row.patch.repo} ${row.patch.title} ${row.patch.externalId} ${row.patch.id}`.toLowerCase().includes(q);
		});
		filtered.sort((a, b) => {
			if (sort === "newest") return b.patch.createdAt.localeCompare(a.patch.createdAt);
			if (sort === "added") return b.metrics.linesAdded - a.metrics.linesAdded;
			if (sort === "repo") return a.patch.repo.localeCompare(b.patch.repo) || a.patch.externalId.localeCompare(b.patch.externalId);
			return b.metrics.securityFindings - a.metrics.securityFindings || b.metrics.highSeverity - a.metrics.highSeverity;
		});
		return filtered;
	}, [
		analyses,
		label,
		onlyFindings,
		onlyPartial,
		onlyTests,
		query,
		sort,
		study
	]);
	function onImport() {
		const lines = csvText.trim().split(/\r?\n/).filter(Boolean);
		if (lines.length < 2) {
			setImportNote("Need a header and at least one row.");
			return;
		}
		const header = splitCsvLine(lines[0]).map((cell) => cell.trim().toLowerCase());
		const idAt = header.indexOf("patch_id");
		const labelAt = header.indexOf("label");
		const notesAt = header.indexOf("notes");
		if (idAt < 0 || labelAt < 0) {
			setImportNote("Header must include patch_id and label.");
			return;
		}
		const known = new Set(PATCHES.map((patch) => patch.id));
		const accepted = [];
		let skipped = 0;
		for (const line of lines.slice(1)) {
			const cells = splitCsvLine(line);
			const id = cells[idAt]?.trim();
			const next = cells[labelAt]?.trim();
			if (!id || !known.has(id) || !PROVENANCE.includes(next)) {
				skipped += 1;
				continue;
			}
			accepted.push({
				id,
				label: next,
				notes: notesAt >= 0 ? cells[notesAt] ?? "" : ""
			});
		}
		importLabels(accepted);
		setImportNote(`Imported ${accepted.length}. Skipped ${skipped}.`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Patches" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 text-3xl font-medium tracking-tight",
			children: "Label and inspect"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 max-w-2xl text-sm text-muted",
			children: [
				rows.length,
				" of ",
				PATCHES.length,
				" shown. Sort and filter stay on this page. Unknown labels remain in the table."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-col gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: query,
					onChange: (event) => setQuery(event.target.value),
					placeholder: "Filter by repository or patch id",
					"aria-label": "Filter by repository or patch id",
					className: "min-h-11 w-full rounded-md border border-line bg-surface px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto",
					children: ["all", ...PROVENANCE].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": label === item,
						onClick: () => setLabel(item),
						className: `inline-flex min-h-11 shrink-0 items-center rounded-md px-3 font-mono text-xs ${label === item ? "bg-surface-2 text-fg" : "text-muted"}`,
						children: item
					}, item))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterToggle, {
							pressed: onlyFindings,
							onClick: () => setOnlyFindings((v) => !v),
							label: "Has findings"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterToggle, {
							pressed: onlyTests,
							onClick: () => setOnlyTests((v) => !v),
							label: "Test change"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterToggle, {
							pressed: onlyPartial,
							onClick: () => setOnlyPartial((v) => !v),
							label: "Partial"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ml-auto flex items-center gap-2 text-xs text-muted",
							children: ["Sort", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: sort,
								onChange: (event) => setSort(event.target.value),
								className: "min-h-11 rounded-md border border-line bg-surface px-2 text-sm text-fg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "findings",
										children: "Security findings"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "newest",
										children: "Newest"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "added",
										children: "Lines added"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "repo",
										children: "Repository"
									})
								]
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 flex flex-col gap-2",
			children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "rounded-lg border border-line bg-surface p-4 text-sm text-muted",
				children: "No patch matches that filter."
			}) : rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/patches/$patchId",
				params: { patchId: row.patch.id },
				className: "block rounded-lg border border-line bg-surface p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: row.patch.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-xs text-muted",
							children: [
								patchRef(row.patch.repo, row.patch.externalId),
								" · ",
								row.patch.createdAt.slice(0, 10)
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelPill, { label: row.label })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-3 grid grid-cols-3 gap-2 font-mono text-xs tabular-nums text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Δ" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "text-fg",
							children: [
								"+",
								row.metrics.linesAdded,
								" / −",
								row.metrics.linesDeleted
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Findings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: row.metrics.highSeverity > 0 ? "text-alert" : "text-fg",
							children: row.metrics.securityFindings
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Tests" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-fg",
							children: row.metrics.hasTestChange ? "yes" : "no"
						})] })
					]
				})]
			}) }, row.patch.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: "Label CSV"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Import columns patch_id, label, notes. Unknown stays a real label, not a deletion."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "inline-flex min-h-11 items-center rounded-md border border-line px-3 text-sm",
						onClick: () => downloadText("labels.csv", buildLabelsCsv(joinStudy(PATCHES, analyses, study), study), "text/csv"),
						children: "Export labels"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: csvText,
					onChange: (event) => setCsvText(event.target.value),
					rows: 4,
					placeholder: "patch_id,label,rater,notes",
					className: "mt-3 w-full rounded-md border border-line bg-bg p-3 font-mono text-xs"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onImport,
					className: "mt-2 inline-flex min-h-11 items-center rounded-md bg-brass px-3 text-sm font-medium text-brass-ink",
					children: "Import"
				}),
				importNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: importNote
				}) : null
			]
		})
	] });
}
function FilterToggle({ pressed, onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": pressed,
		onClick,
		className: `inline-flex min-h-11 items-center rounded-md border px-3 text-xs ${pressed ? "border-brass text-brass" : "border-line text-muted"}`,
		children: label
	});
}
//#endregion
export { PatchListPage as component };
