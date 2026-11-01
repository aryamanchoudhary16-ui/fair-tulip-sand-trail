import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stats-CWjN6O2P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var LABEL_TEXT = {
	human: "text-human",
	"ai-assisted": "text-ai",
	mixed: "text-mixed",
	unknown: "text-unknown"
};
var SEVERITY_TEXT = {
	HIGH: "text-alert",
	MEDIUM: "text-brass",
	LOW: "text-muted",
	INFO: "text-muted"
};
function LabelPill({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 font-mono text-xs", LABEL_TEXT[label]),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "size-1.5 rounded-full bg-current",
			"aria-hidden": true
		}), label]
	});
}
function SeverityTag({ severity }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("font-mono text-xs", SEVERITY_TEXT[severity]),
		children: severity
	});
}
function Panel({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("rounded-lg border border-line bg-surface p-4", className),
		children
	});
}
function Eyebrow({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("font-mono text-xs tracking-widest text-brass uppercase", className),
		children
	});
}
var SEVERITY_RANK = {
	HIGH: 0,
	MEDIUM: 1,
	LOW: 2,
	INFO: 3
};
function Findings({ findings }) {
	if (findings.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "No findings on the lines this patch added."
	});
	const ordered = [...findings].sort((a, b) => SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-col gap-3",
		children: ordered.map((finding, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "border-b border-line pb-3 last:border-b-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline gap-x-3 gap-y-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityTag, { severity: finding.severity }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-fg",
						children: finding.ruleId
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs text-muted",
						children: [finding.file || "patch", finding.line ? `:${finding.line}` : ""]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm",
				children: finding.message
			})]
		}, `${finding.ruleId}-${finding.file}-${finding.line}-${index}`))
	});
}
function DiffBlock({ diff }) {
	const lines = diff.split("\n");
	const truncated = lines.length > 160;
	const shown = truncated ? lines.slice(0, 160) : lines;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-lg border border-line",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "max-h-96 overflow-auto p-3 font-mono text-xs leading-5",
			children: shown.map((line, index) => {
				const kind = line.startsWith("+") && !line.startsWith("+++") ? "text-human" : line.startsWith("-") && !line.startsWith("---") ? "text-alert" : line.startsWith("@@") ? "text-brass" : "text-muted";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: kind,
					children: line || " "
				}, `${index}-${line.slice(0, 12)}`);
			})
		}), truncated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "border-t border-line px-3 py-2 text-xs text-muted",
			children: "Truncated to 160 lines."
		}) : null]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-line bg-surface px-3 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-mono text-2xl tabular-nums text-fg",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: hint
			}) : null
		]
	});
}
var PROVENANCE = [
	"human",
	"ai-assisted",
	"mixed",
	"unknown"
];
var IGNORE_GLOBS = [
	"vendor/**",
	"node_modules/**",
	"dist/**",
	"build/**",
	"**/*.min.js",
	"**/*.min.css",
	"**/*.{png,jpg,jpeg,gif,webp,pyc,whl}"
];
var TEST_GLOBS = [
	"**/test_*.py",
	"**/*_test.py",
	"**/*Test.java",
	"**/*.spec.ts",
	"**/tests/**",
	"**/test/**"
];
var KEY = "patchgauge-model-v1";
var DEFAULT_STUDY = {
	raterId: "researcher",
	threshold: 10,
	analyzedAt: "2026-09-06T10:30:00.000Z",
	replayCount: 0,
	labels: {}
};
var study = DEFAULT_STUDY;
var listeners = /* @__PURE__ */ new Set();
function emit() {
	for (const listener of listeners) listener();
}
function persist() {
	try {
		localStorage.setItem(KEY, JSON.stringify(study));
	} catch {}
}
function isProvenance(value) {
	return value === "human" || value === "ai-assisted" || value === "mixed" || value === "unknown";
}
function sanitize(input) {
	if (!input || typeof input !== "object") return DEFAULT_STUDY;
	const raw = input;
	const threshold = typeof raw.threshold === "number" && raw.threshold >= 1 && raw.threshold <= 50 ? Math.round(raw.threshold) : DEFAULT_STUDY.threshold;
	const raterId = typeof raw.raterId === "string" && raw.raterId.trim() ? raw.raterId.trim().slice(0, 40) : DEFAULT_STUDY.raterId;
	const analyzedAt = typeof raw.analyzedAt === "string" ? raw.analyzedAt : DEFAULT_STUDY.analyzedAt;
	const replayCount = typeof raw.replayCount === "number" && raw.replayCount >= 0 ? Math.floor(raw.replayCount) : 0;
	const labels = {};
	if (raw.labels && typeof raw.labels === "object") for (const [id, value] of Object.entries(raw.labels)) {
		if (!value || typeof value !== "object") continue;
		const label = value.label;
		if (!isProvenance(label)) continue;
		const notes = value.notes;
		labels[id] = {
			label,
			notes: typeof notes === "string" ? notes.slice(0, 500) : ""
		};
	}
	return {
		raterId,
		threshold,
		analyzedAt,
		replayCount,
		labels
	};
}
var hydrated = false;
function hydrateStudy() {
	if (hydrated || typeof localStorage === "undefined") return;
	hydrated = true;
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return;
		study = sanitize(JSON.parse(raw));
		emit();
	} catch {}
}
function update(next) {
	study = next;
	persist();
	emit();
}
function getStudy() {
	return study;
}
function subscribeStudy(listener) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}
function useStudy() {
	return (0, import_react.useSyncExternalStore)(subscribeStudy, getStudy, () => DEFAULT_STUDY);
}
function setLabel(id, label, notes) {
	update({
		...study,
		labels: {
			...study.labels,
			[id]: {
				label,
				notes: notes.slice(0, 500)
			}
		}
	});
}
function setRater(raterId) {
	update({
		...study,
		raterId: raterId.slice(0, 40)
	});
}
function setThreshold(threshold) {
	if (!Number.isFinite(threshold)) return;
	update({
		...study,
		threshold: Math.min(50, Math.max(1, Math.round(threshold)))
	});
}
function markReplay() {
	update({
		...study,
		replayCount: study.replayCount + 1,
		analyzedAt: (/* @__PURE__ */ new Date()).toISOString()
	});
}
function importLabels(rows) {
	const labels = { ...study.labels };
	for (const row of rows) labels[row.id] = {
		label: row.label,
		notes: row.notes.slice(0, 500)
	};
	update({
		...study,
		labels
	});
}
function resetStudy() {
	study = {
		...DEFAULT_STUDY,
		labels: {}
	};
	try {
		localStorage.removeItem(KEY);
	} catch {}
	emit();
}
var NAV = [
	{
		to: "/",
		label: "Study"
	},
	{
		to: "/patches",
		label: "Patches"
	},
	{
		to: "/compare",
		label: "Compare"
	},
	{
		to: "/workbench",
		label: "Bench"
	},
	{
		to: "/export",
		label: "Export"
	}
];
function Mark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: "size-8 shrink-0",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "6",
				className: "fill-surface-2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M6 22a10 10 0 0 1 20 0",
				className: "stroke-brass",
				fill: "none",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 22 23 11",
				className: "stroke-fg",
				fill: "none",
				strokeWidth: "1.6",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "22",
				r: "1.7",
				className: "fill-brass"
			})
		]
	});
}
function Shell({ children }) {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	(0, import_react.useEffect)(() => {
		hydrateStudy();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-sm tracking-wide",
							children: "PatchGauge"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-muted",
							children: "Research instrument · model 1.0"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-brass",
							children: "fixture-py-2026"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Python · offline replay"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "-mx-4 flex gap-1 overflow-x-auto px-4",
					"aria-label": "Sections",
					children: NAV.map((item) => {
						const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							"aria-current": active ? "page" : void 0,
							className: cn("inline-flex min-h-11 shrink-0 items-center rounded-md px-3 font-mono text-xs tracking-wide", active ? "bg-surface-2 text-fg" : "text-muted"),
							children: item.label
						}, item.to);
					})
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto w-full max-w-6xl px-4 py-6",
			children
		})]
	});
}
var CONTEXT = 3;
function linesOf(source) {
	if (source === "") return [];
	return source.split("\n");
}
function stripStrings(source) {
	return source.replace(/'''[\s\S]*?'''|"""[\s\S]*?"""|'(?:\\.|[^'\n])*'|"(?:\\.|[^"\n])*"/g, "''");
}
function isIgnoredPath(path) {
	return /(^|\/)(vendor|node_modules|dist|build)\//.test(path) || /\.min\.(js|css)$/.test(path) || /\.(png|jpg|jpeg|gif|webp|pyc|whl|so|dll)$/.test(path);
}
function isTestPath(path) {
	const base = path.split("/").pop() ?? path;
	return /^test_.*\.py$/.test(base) || /_test\.py$/.test(base) || /Test\.java$/.test(base) || /\.spec\.ts$/.test(base) || /(^|\/)tests?\//.test(path);
}
function pythonParseError(source) {
	if (source.includes("\0")) return "binary or NUL byte";
	const stripped = stripStrings(source);
	let paren = 0;
	let bracket = 0;
	let brace = 0;
	for (const ch of stripped) {
		if (ch === "(") paren += 1;
		else if (ch === ")") paren -= 1;
		else if (ch === "[") bracket += 1;
		else if (ch === "]") bracket -= 1;
		else if (ch === "{") brace += 1;
		else if (ch === "}") brace -= 1;
		if (paren < 0 || bracket < 0 || brace < 0) return "unbalanced brackets";
	}
	if (paren !== 0 || bracket !== 0 || brace !== 0) return "unbalanced brackets";
	for (const line of source.split("\n")) if (/^\s*def\s+/.test(line) && !/:\s*(#.*)?$/.test(line)) return "def is missing a colon";
	return null;
}
function cyclomatic(text) {
	const code = stripStrings(text).replace(/#.*$/gm, "");
	let score = 1;
	const re = /\b(if|elif|for|while|except|and|or|case)\b/g;
	while (re.exec(code)) score += 1;
	return score;
}
function extractFunctions(source) {
	const lines = source.split("\n");
	const defs = [];
	lines.forEach((line, index) => {
		const match = line.match(/^(\s*)def\s+([A-Za-z_]\w*)\s*\(/);
		if (!match || !/:\s*(#.*)?$/.test(line)) return;
		defs.push({
			name: match[2],
			indent: match[1].length,
			start: index
		});
	});
	return defs.map((def) => {
		let end = lines.length - 1;
		for (let i = def.start + 1; i < lines.length; i += 1) {
			if (lines[i].trim() === "" || lines[i].trim().startsWith("#")) continue;
			if ((lines[i].match(/^ */)?.[0].length ?? 0) <= def.indent) {
				end = i - 1;
				break;
			}
		}
		return {
			name: def.name,
			start: def.start + 1,
			end: end + 1,
			text: lines.slice(def.start, end + 1).join("\n")
		};
	});
}
function emptyExceptLines(source) {
	const lines = source.split("\n");
	const hits = [];
	for (let i = 0; i < lines.length; i += 1) {
		if (!/^\s*except\b.*:\s*(#.*)?$/.test(lines[i])) continue;
		const exceptIndent = lines[i].match(/^ */)?.[0].length ?? 0;
		const body = [];
		let j = i + 1;
		while (j < lines.length) {
			if (lines[j].trim() === "") {
				body.push(lines[j]);
				j += 1;
				continue;
			}
			if ((lines[j].match(/^ */)?.[0].length ?? 0) <= exceptIndent) break;
			body.push(lines[j]);
			j += 1;
		}
		const meaningful = body.map((line) => line.trim()).filter(Boolean);
		if (meaningful.length === 0 || meaningful.every((line) => line === "pass" || line === "..." || line.startsWith("#"))) hits.push(i + 1);
	}
	return hits;
}
function diffFile(path, before, after) {
	const a = linesOf(before);
	const b = linesOf(after);
	const n = a.length;
	const m = b.length;
	const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
	for (let i = n - 1; i >= 0; i -= 1) for (let j = m - 1; j >= 0; j -= 1) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
	const ops = [];
	const addedLineNos = /* @__PURE__ */ new Set();
	let i = 0;
	let j = 0;
	while (i < n && j < m) if (a[i] === b[j]) {
		ops.push({
			t: " ",
			line: a[i],
			bLine: j + 1
		});
		i += 1;
		j += 1;
	} else if (dp[i + 1][j] >= dp[i][j + 1]) {
		ops.push({
			t: "-",
			line: a[i]
		});
		i += 1;
	} else {
		ops.push({
			t: "+",
			line: b[j],
			bLine: j + 1
		});
		addedLineNos.add(j + 1);
		j += 1;
	}
	while (i < n) {
		ops.push({
			t: "-",
			line: a[i]
		});
		i += 1;
	}
	while (j < m) {
		ops.push({
			t: "+",
			line: b[j],
			bLine: j + 1
		});
		addedLineNos.add(j + 1);
		j += 1;
	}
	const additions = ops.filter((op) => op.t === "+").length;
	const deletions = ops.filter((op) => op.t === "-").length;
	if (additions === 0 && deletions === 0) return {
		text: `--- a/${path}\n+++ b/${path}\n(no textual change)`,
		additions,
		deletions,
		hunks: 0,
		addedLineNos
	};
	const include = ops.map(() => false);
	ops.forEach((op, index) => {
		if (op.t === " ") return;
		for (let t = Math.max(0, index - CONTEXT); t <= Math.min(ops.length - 1, index + CONTEXT); t += 1) include[t] = true;
	});
	const hunkBodies = [];
	let oldLine = 1;
	let newLine = 1;
	let k = 0;
	while (k < ops.length) {
		if (!include[k]) {
			if (ops[k].t !== "+") oldLine += 1;
			if (ops[k].t !== "-") newLine += 1;
			k += 1;
			continue;
		}
		const hunk = {
			oldStart: oldLine,
			newStart: newLine,
			lines: []
		};
		while (k < ops.length && include[k]) {
			hunk.lines.push(`${ops[k].t}${ops[k].line}`);
			if (ops[k].t !== "+") oldLine += 1;
			if (ops[k].t !== "-") newLine += 1;
			k += 1;
		}
		hunkBodies.push(hunk);
	}
	return {
		text: `--- a/${path}\n+++ b/${path}\n${hunkBodies.map((hunk) => {
			const oldCount = hunk.lines.filter((line) => !line.startsWith("+")).length;
			const newCount = hunk.lines.filter((line) => !line.startsWith("-")).length;
			return `@@ -${oldCount === 0 ? 0 : hunk.oldStart},${oldCount} +${newCount === 0 ? 0 : hunk.newStart},${newCount} @@\n${hunk.lines.join("\n")}`;
		}).join("\n")}`,
		additions,
		deletions,
		hunks: hunkBodies.length,
		addedLineNos
	};
}
function scanAddedLine(line) {
	const trimmed = line.trim();
	if (!trimmed || trimmed.startsWith("#")) return [];
	const code = stripStrings(line);
	const hits = [];
	if (/\beval\s*\(/.test(code)) hits.push({
		ruleId: "PGSEC001",
		severity: "HIGH",
		message: "eval() on a dynamic string can execute attacker-controlled code."
	});
	if (/\bexec\s*\(/.test(code)) hits.push({
		ruleId: "PGSEC002",
		severity: "HIGH",
		message: "exec() runs a dynamic string as code."
	});
	if (/pickle\.loads\s*\(/.test(code)) hits.push({
		ruleId: "PGSEC003",
		severity: "HIGH",
		message: "pickle.loads can execute arbitrary code from its input."
	});
	if (/yaml\.load\s*\(/.test(code) && !/SafeLoader|safe_load/.test(code)) hits.push({
		ruleId: "PGSEC004",
		severity: "HIGH",
		message: "yaml.load without SafeLoader can construct unexpected objects."
	});
	if (/shell\s*=\s*True/.test(code)) hits.push({
		ruleId: "PGSEC005",
		severity: "HIGH",
		message: "subprocess with shell=True is open to command injection."
	});
	if (/(?:password|secret|api_key|apikey|token)\s*=\s*["'][^"']{6,}["']/i.test(line) && !/os\.environ|getenv/.test(line)) hits.push({
		ruleId: "PGSEC006",
		severity: "HIGH",
		message: "Possible hardcoded secret assigned in source."
	});
	if (/(execute|executemany)\s*\(\s*f["']/.test(line) || /\b(SELECT|INSERT|UPDATE|DELETE)\b/.test(line) && /f["']/.test(line) && /\{/.test(line)) hits.push({
		ruleId: "PGSEC007",
		severity: "HIGH",
		message: "SQL is built with an f-string. Bind parameters instead."
	});
	if (/verify\s*=\s*False/.test(code)) hits.push({
		ruleId: "PGSEC008",
		severity: "MEDIUM",
		message: "TLS verification is disabled (verify=False)."
	});
	if (/hashlib\.(md5|sha1)\s*\(/.test(code)) hits.push({
		ruleId: "PGSEC009",
		severity: "MEDIUM",
		message: "MD5 or SHA1 is used. Weak where a cryptographic guarantee is needed; may be a false positive for cache keys."
	});
	if (/requests\.(get|post|put|patch|delete)\s*\(/.test(code) && !/timeout\s*=/.test(code)) hits.push({
		ruleId: "PGSEC010",
		severity: "LOW",
		message: "HTTP call has no explicit timeout."
	});
	if (/tempfile\.mktemp\s*\(/.test(code)) hits.push({
		ruleId: "PGSEC011",
		severity: "MEDIUM",
		message: "tempfile.mktemp is insecure. Use mkstemp."
	});
	return hits;
}
function analyzeFiles(files, threshold) {
	const findings = [];
	const parseErrors = [];
	const ignoredFiles = [];
	const complexFunctions = [];
	const diffs = [];
	let linesAdded = 0;
	let linesDeleted = 0;
	let hunks = 0;
	let todoFixme = 0;
	let emptyExcept = 0;
	let repeatedBlocks = 0;
	let hasTestChange = false;
	const complexities = [];
	for (const file of files) {
		const diff = diffFile(file.path, file.before, file.after);
		diffs.push(`diff --git a/${file.path} b/${file.path}\n${diff.text}`);
		hunks += diff.hunks;
		if (isTestPath(file.path) && file.before !== file.after) hasTestChange = true;
		if (isIgnoredPath(file.path)) {
			ignoredFiles.push(file.path);
			continue;
		}
		linesAdded += diff.additions;
		linesDeleted += diff.deletions;
		const afterLines = linesOf(file.after);
		const addedTexts = [];
		for (const lineNo of diff.addedLineNos) {
			const text = afterLines[lineNo - 1] ?? "";
			addedTexts.push(text);
			if (/\b(TODO|FIXME)\b/.test(text)) {
				todoFixme += 1;
				findings.push({
					analyser: "quality",
					severity: "INFO",
					ruleId: "PGQA-TODO",
					file: file.path,
					line: lineNo,
					message: "TODO or FIXME introduced by the patch."
				});
			}
			for (const hit of scanAddedLine(text)) findings.push({
				analyser: "security",
				severity: hit.severity,
				ruleId: hit.ruleId,
				file: file.path,
				line: lineNo,
				message: hit.message
			});
		}
		const counts = /* @__PURE__ */ new Map();
		for (const text of addedTexts) {
			const trimmed = text.trim();
			if (trimmed.length < 12 || trimmed.startsWith("#")) continue;
			counts.set(trimmed, (counts.get(trimmed) ?? 0) + 1);
		}
		for (const count of counts.values()) if (count >= 4) repeatedBlocks += 1;
		const parseError = pythonParseError(file.after);
		if (parseError && /\.py$/.test(file.path)) {
			parseErrors.push({
				file: file.path,
				message: parseError
			});
			findings.push({
				analyser: "quality",
				severity: "INFO",
				ruleId: "PGQA-PARSE",
				file: file.path,
				line: null,
				message: `Could not parse ${file.path}: ${parseError}. Complexity was skipped for this file.`
			});
			continue;
		}
		if (/\.py$/.test(file.path)) {
			for (const lineNo of emptyExceptLines(file.after)) if (diff.addedLineNos.has(lineNo)) {
				emptyExcept += 1;
				findings.push({
					analyser: "quality",
					severity: "LOW",
					ruleId: "PGQA-EXCEPT",
					file: file.path,
					line: lineNo,
					message: "Empty except block introduced by the patch (pass, ellipsis, or no body)."
				});
			}
			for (const fn of extractFunctions(file.after)) {
				let changed = false;
				for (let line = fn.start; line <= fn.end; line += 1) if (diff.addedLineNos.has(line)) {
					changed = true;
					break;
				}
				if (!changed) continue;
				const score = cyclomatic(fn.text);
				complexities.push(score);
				if (score > threshold) {
					complexFunctions.push({
						name: fn.name,
						file: file.path,
						complexity: score
					});
					findings.push({
						analyser: "quality",
						severity: "MEDIUM",
						ruleId: "PGQA-CC",
						file: file.path,
						line: fn.start,
						message: `${fn.name} has cyclomatic complexity ${score}, above the threshold of ${threshold}.`
					});
				}
			}
		}
	}
	if (repeatedBlocks > 0) findings.push({
		analyser: "quality",
		severity: "LOW",
		ruleId: "PGQA-REPEAT",
		file: "",
		line: null,
		message: `${repeatedBlocks} repeated identical added line${repeatedBlocks === 1 ? "" : "s"} (4 or more copies).`
	});
	const securityFindings = findings.filter((finding) => finding.analyser === "security").length;
	const highSeverity = findings.filter((finding) => finding.severity === "HIGH").length;
	const meanComplexity = complexities.length === 0 ? null : complexities.reduce((sum, value) => sum + value, 0) / complexities.length;
	const maxComplexity = complexities.length === 0 ? null : Math.max(...complexities);
	const qualityOk = parseErrors.length === 0;
	const analysers = [
		{
			name: "quality-heuristic",
			status: qualityOk ? "ok" : "error",
			detail: qualityOk ? `${complexities.length} functions measured` : parseErrors.map((entry) => entry.message).join("; ")
		},
		{
			name: "security-heuristic",
			status: "ok",
			detail: `${securityFindings} findings on added lines`
		},
		{
			name: "test-presence",
			status: "ok",
			detail: hasTestChange ? "test file changed" : "no test file changed"
		}
	];
	return {
		linesAdded,
		linesDeleted,
		filesTouched: files.length,
		hunks,
		functionsMeasured: complexities.length,
		meanComplexity,
		maxComplexity,
		complexFunctions,
		todoFixme,
		emptyExcept,
		repeatedBlocks,
		securityFindings,
		highSeverity,
		findingsPerThousand: linesAdded === 0 ? null : securityFindings * 1e3 / linesAdded,
		hasTestChange,
		parseErrors,
		ignoredFiles,
		findings,
		diff: diffs.join("\n"),
		state: parseErrors.length > 0 ? "partial" : "complete",
		analysers
	};
}
function analyzePatch(patch, threshold) {
	return analyzeFiles(patch.files, threshold);
}
function filesFromUnifiedDiff(diff) {
	const text = diff.replace(/\r\n/g, "\n");
	if (!/(^|\n)(\+\+\+|diff |@@ )/.test(text)) return null;
	const files = [];
	const slot = { file: null };
	const open = (path) => {
		if (slot.file && slot.file.path === path) return slot.file;
		const next = {
			path,
			before: [],
			after: []
		};
		files.push(next);
		slot.file = next;
		return next;
	};
	for (const line of text.split("\n")) {
		if (line.startsWith("diff ") || line.startsWith("index ") || line.startsWith("@@") || line.startsWith("--- ")) {
			const git = line.match(/^diff --git a\/(.+?) b\/(.+)$/);
			if (git) open(git[2]);
			continue;
		}
		if (line.startsWith("+++ ")) {
			const raw = line.slice(4).trim();
			open(raw === "/dev/null" ? slot.file?.path ?? "deleted" : raw.replace(/^b\//, ""));
			continue;
		}
		const file = slot.file;
		if (!file) continue;
		if (line.startsWith("+")) file.after.push(line.slice(1));
		else if (line.startsWith("-")) file.before.push(line.slice(1));
		else if (line.startsWith("\\")) continue;
		else {
			const ctx = line.startsWith(" ") ? line.slice(1) : line;
			file.before.push(ctx);
			file.after.push(ctx);
		}
	}
	if (files.length === 0) return null;
	return files.map((file) => ({
		path: file.path,
		before: file.before.join("\n"),
		after: file.after.join("\n")
	}));
}
function src(value) {
	const lines = value.replace(/^\n/, "").replace(/\s+$/, "").split("\n");
	const widths = lines.filter((line) => line.trim().length > 0).map((line) => line.match(/^ */)?.[0].length ?? 0);
	const cut = widths.length ? Math.min(...widths) : 0;
	return lines.map((line) => line.trim().length === 0 ? "" : line.slice(cut)).join("\n");
}
function files(entries) {
	return entries.map(([path, before, after]) => ({
		path,
		before: src(before),
		after: src(after)
	}));
}
var EXPERIMENT = {
	id: "fixture-py-2026",
	title: "AI-assisted vs human patches (Python pilot)",
	creator: "student researcher",
	createdAt: "2026-09-06T09:00:00.000Z",
	language: "python",
	dateWindow: ["2026-01-01", "2026-08-31"],
	sampleCap: 200,
	notes: "Bundled offline-replay fixture. Metrics are computed in the browser from these diffs.",
	toolVersion: "1.0.0-model",
	analysers: [
		{
			name: "quality-heuristic",
			version: "1.0.0"
		},
		{
			name: "security-heuristic",
			version: "1.0.0"
		},
		{
			name: "test-presence",
			version: "1.0.0"
		}
	]
};
var COLLECTION_LOG = [
	"cache hit: github/pulls for 6 public repositories (offline replay of cache/)",
	"accepted public repositories in owner/name form",
	"filter: language=python, date window 2026-01-01..2026-08-31, files touched 1..12",
	"skipped acme/internal-billing — private or inaccessible (HTTP 404)",
	"sample cap 200 not reached; stored 23 pull requests",
	"collection log written; a later audit can read it without the network"
];
var PATCHES = [
	{
		id: "harbor--auth-helpers--184",
		repo: "harbor/auth-helpers",
		source: "pr",
		externalId: "184",
		title: "Compare tokens in constant time",
		author: "mira",
		createdAt: "2026-02-03T11:12:00.000Z",
		seedLabel: "human",
		seedNotes: "Author describes a review comment about == on secrets. Test added.",
		rater2: "human",
		files: files([[
			"auth_helpers/tokens.py",
			`
        def tokens_match(given, expected):
            return given == expected
        `,
			`
        import hmac


        def tokens_match(given: str, expected: str) -> bool:
            if not given or not expected:
                return False
            return hmac.compare_digest(given.encode(), expected.encode())
        `
		], [
			"tests/test_tokens.py",
			``,
			`
        from auth_helpers.tokens import tokens_match


        def test_mismatch():
            assert tokens_match("a", "b") is False


        def test_match():
            assert tokens_match("same", "same") is True
        `
		]])
	},
	{
		id: "harbor--auth-helpers--191",
		repo: "harbor/auth-helpers",
		source: "pr",
		externalId: "191",
		title: "Add an admin token fallback",
		author: "devpatil",
		createdAt: "2026-02-18T08:04:00.000Z",
		seedLabel: "ai-assisted",
		seedNotes: "PR body says the snippet was drafted with Copilot and then lightly edited.",
		rater2: "mixed",
		hint: "PR body mentions Copilot.",
		files: files([[
			"auth_helpers/fallback.py",
			`
        import os


        def admin_token() -> str:
            return os.environ["ADMIN_TOKEN"]
        `,
			`
        import os


        def admin_token() -> str:
            api_key = "sk-live-please-rotate"
            return os.environ.get("ADMIN_TOKEN", api_key)
        `
		]])
	},
	{
		id: "harbor--auth-helpers--203",
		repo: "harbor/auth-helpers",
		source: "pr",
		externalId: "203",
		title: "Split session expiry into a helper",
		author: "sora",
		createdAt: "2026-03-02T15:40:00.000Z",
		seedLabel: "mixed",
		seedNotes: "Refactor looks hand-written. The TODO reads like an assistant leftover.",
		rater2: "human",
		files: files([[
			"auth_helpers/session.py",
			`
        def session_open(now: int, exp: int) -> bool:
            return now < exp
        `,
			`
        def session_open(now: int, exp: int, skew: int = 30) -> bool:
            # TODO: confirm the skew default with the auth reviewer
            if exp <= 0:
                return False
            return now + skew < exp
        `
		], [
			"tests/test_session.py",
			``,
			`
        from auth_helpers.session import session_open


        def test_expired():
            assert session_open(100, 90) is False
        `
		]])
	},
	{
		id: "kiln--config-kit--42",
		repo: "kiln/config-kit",
		source: "pr",
		externalId: "42",
		title: "Read typed environment values",
		author: "nayak",
		createdAt: "2026-01-21T09:18:00.000Z",
		seedLabel: "human",
		seedNotes: "Small parser with a test. No assistant mention.",
		rater2: "human",
		files: files([[
			"configkit/env.py",
			`
        import os
        `,
			`
        import os


        def read_int(name: str, default: int) -> int:
            raw = os.environ.get(name)
            if raw is None or raw == "":
                return default
            return int(raw)
        `
		], [
			"tests/test_env.py",
			``,
			`
        from configkit.env import read_int


        def test_default_when_missing(monkeypatch):
            monkeypatch.delenv("PORT", raising=False)
            assert read_int("PORT", 8000) == 8000
        `
		]])
	},
	{
		id: "kiln--config-kit--55",
		repo: "kiln/config-kit",
		source: "pr",
		externalId: "55",
		title: "Load YAML config and evaluate expressions",
		author: "leung",
		createdAt: "2026-03-11T12:01:00.000Z",
		seedLabel: "ai-assisted",
		seedNotes: "Commit message: 'chatgpt wrote the loader, I only renamed the function'.",
		rater2: "ai-assisted",
		hint: "Commit message mentions ChatGPT.",
		files: files([[
			"configkit/load.py",
			`
        def load_settings(text: str) -> dict:
            return {"raw": text}
        `,
			`
        import yaml


        def load_settings(text: str) -> dict:
            data = yaml.load(text)
            expr = data.get("expr")
            if expr:
                data["value"] = eval(expr, {}, {})
            return data
        `
		]])
	},
	{
		id: "kiln--config-kit--61",
		repo: "kiln/config-kit",
		source: "pr",
		externalId: "61",
		title: "Clarify the loader comment",
		author: "berg",
		createdAt: "2026-03-19T16:22:00.000Z",
		seedLabel: "unknown",
		seedNotes: "Comment-only. No provenance signal either way.",
		rater2: "unknown",
		files: files([[
			"configkit/load.py",
			`
        # read settings from a string
        def load_settings(text: str) -> dict:
            return {"raw": text}
        `,
			`
        # Read settings from a caller-supplied string. Does not touch the network.
        def load_settings(text: str) -> dict:
            return {"raw": text}
        `
		]])
	},
	{
		id: "northwind--ledger-core--310",
		repo: "northwind/ledger-core",
		source: "pr",
		externalId: "310",
		title: "Round invoice totals half away from zero",
		author: "okonkwo",
		createdAt: "2026-04-02T10:11:00.000Z",
		seedLabel: "human",
		seedNotes: "Decimal change with a regression test. Review thread is ordinary.",
		rater2: "human",
		files: files([[
			"ledger/money.py",
			`
        def round_total(value: float) -> int:
            return int(value)
        `,
			`
        from decimal import Decimal, ROUND_HALF_UP


        def round_total(value: str) -> Decimal:
            amount = Decimal(value)
            if amount.is_nan():
                raise ValueError("amount is not a number")
            return amount.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        `
		], [
			"tests/test_money.py",
			``,
			`
        from ledger.money import round_total


        def test_half_up():
            assert str(round_total("1.225")) == "1.23"
        `
		]])
	},
	{
		id: "northwind--ledger-core--318",
		repo: "northwind/ledger-core",
		source: "pr",
		externalId: "318",
		title: "Look up an invoice by id",
		author: "iqubal",
		createdAt: "2026-04-09T13:47:00.000Z",
		seedLabel: "ai-assisted",
		seedNotes: "Cursor transcript linked in the PR. Query is interpolated.",
		rater2: "human",
		hint: "PR links a Cursor transcript.",
		files: files([[
			"ledger/queries.py",
			`
        def find_invoice(cur, invoice_id: str):
            return cur.execute("SELECT id FROM invoices WHERE id = ?", (invoice_id,))
        `,
			`
        def find_invoice(cur, invoice_id: str):
            query = f"SELECT * FROM invoices WHERE id = '{invoice_id}'"
            return cur.execute(query)
        `
		]])
	},
	{
		id: "northwind--ledger-core--322",
		repo: "northwind/ledger-core",
		source: "pr",
		externalId: "322",
		title: "Extract a tax label helper",
		author: "mira",
		createdAt: "2026-04-16T07:33:00.000Z",
		seedLabel: "human",
		seedNotes: "Mechanical extract. No new branches beyond the old code.",
		files: files([[
			"ledger/tax.py",
			`
        def format_row(rate: float) -> str:
            return "tax:" + str(rate)
        `,
			`
        def tax_label(rate: float) -> str:
            return "tax:" + format(rate, ".2f")


        def format_row(rate: float) -> str:
            return tax_label(rate)
        `
		]])
	},
	{
		id: "northwind--ledger-core--330",
		repo: "northwind/ledger-core",
		source: "pr",
		externalId: "330",
		title: "Classify ledger rows for the export feed",
		author: "devpatil",
		createdAt: "2026-05-01T18:05:00.000Z",
		seedLabel: "ai-assisted",
		seedNotes: "Large generated function. Author says Claude drafted classify_row.",
		rater2: "mixed",
		hint: "PR body says Claude drafted the classifier.",
		files: files([[
			"ledger/classify.py",
			`
        def classify_row(row):
            return "ok"
        `,
			`
        def classify_row(row):
            # FIXME: this nest was generated and not simplified
            if row.status == "open" and row.total > 0:
                if row.region == "east" or row.region == "west":
                    for item in row.lines:
                        if item.qty > 10 and item.qty < 100:
                            while item.qty > 10:
                                if item.qty % 2 == 0 or item.flag:
                                    item.qty -= 1
                                else:
                                    item.qty -= 2
                        elif item.qty >= 100 and item.taxable:
                            item.note = "review"
                elif row.region == "north":
                    if row.rush or row.manual:
                        return "hold"
            elif row.status == "draft":
                if row.owner == "ops" or row.total == 0:
                    return "skip"
            return "ok"


        def emit_audit(row, audit):
            audit.append({"status": "ok", "source": "generated", "row": row.id})
            audit.append({"status": "ok", "source": "generated", "row": row.id})
            audit.append({"status": "ok", "source": "generated", "row": row.id})
            audit.append({"status": "ok", "source": "generated", "row": row.id})
        `
		]])
	},
	{
		id: "papertrail--logfmt--77",
		repo: "papertrail/logfmt",
		source: "pr",
		externalId: "77",
		title: "Unescape quoted log values",
		author: "sora",
		createdAt: "2026-02-27T06:50:00.000Z",
		seedLabel: "human",
		seedNotes: "Bugfix plus a unit test. Diff is short.",
		rater2: "human",
		files: files([[
			"logfmt/parse.py",
			`
        def unescape(value: str) -> str:
            return value
        `,
			`
        def unescape(value: str) -> str:
            if "\\\\" not in value and '\\"' not in value:
                return value
            return value.replace("\\\\", "\\").replace('\\"', '"')
        `
		], [
			"tests/test_parse.py",
			``,
			`
        from logfmt.parse import unescape


        def test_quotes():
            assert unescape('a\\\\"b') == 'a"b'
        `
		]])
	},
	{
		id: "papertrail--logfmt--88",
		repo: "papertrail/logfmt",
		source: "pr",
		externalId: "88",
		title: "Tail a log file from the reader",
		author: "leung",
		createdAt: "2026-05-14T11:26:00.000Z",
		seedLabel: "ai-assisted",
		seedNotes: "Copilot suggestion committed with the shell flag left on.",
		rater2: "ai-assisted",
		hint: "PR body mentions Copilot.",
		files: files([[
			"logfmt/tail.py",
			`
        def tail_file(path: str) -> str:
            with open(path) as handle:
                return handle.read()[-2000:]
        `,
			`
        import subprocess


        def tail_file(path: str) -> str:
            return subprocess.check_output(f"tail -n 50 {path}", shell=True, text=True)
        `
		]])
	},
	{
		id: "papertrail--logfmt--90",
		repo: "papertrail/logfmt",
		source: "pr",
		externalId: "90",
		title: "Cache parsed records between runs",
		author: "nayak",
		createdAt: "2026-05-20T09:14:00.000Z",
		seedLabel: "mixed",
		seedNotes: "Cache idea is the author's. The pickle call matches an assistant snippet they pasted.",
		rater2: "ai-assisted",
		files: files([[
			"logfmt/cache.py",
			`
        def load_cache(blob: bytes) -> dict:
            return {}
        `,
			`
        import pickle


        def load_cache(blob: bytes) -> dict:
            if not blob:
                return {}
            return pickle.loads(blob)
        `
		]])
	},
	{
		id: "acme--httpx-utils--12",
		repo: "acme/httpx-utils",
		source: "pr",
		externalId: "12",
		title: "Set a timeout on status fetches",
		author: "berg",
		createdAt: "2026-01-15T14:02:00.000Z",
		seedLabel: "human",
		seedNotes: "Adds the timeout the reviewer asked for. No assistant mention.",
		rater2: "human",
		files: files([[
			"httpx_utils/status.py",
			`
        import requests


        def fetch_status(url: str) -> int:
            response = requests.get(url)
            return response.status_code
        `,
			`
        import requests


        def fetch_status(url: str) -> int:
            response = requests.get(url, timeout=5)
            return response.status_code
        `
		]])
	},
	{
		id: "acme--httpx-utils--19",
		repo: "acme/httpx-utils",
		source: "pr",
		externalId: "19",
		title: "Allow insecure status checks",
		author: "iqubal",
		createdAt: "2026-06-02T17:44:00.000Z",
		seedLabel: "ai-assisted",
		seedNotes: "Description contains the phrase 'generated by' an assistant.",
		rater2: "ai-assisted",
		hint: "PR body contains “generated by”.",
		files: files([[
			"httpx_utils/status.py",
			`
        import requests


        def fetch_status(url: str) -> int:
            response = requests.get(url, timeout=5)
            return response.status_code
        `,
			`
        import requests


        def fetch_status(url: str) -> int:
            response = requests.get(url, verify=False)
            return response.status_code
        `
		]])
	},
	{
		id: "acme--httpx-utils--21",
		repo: "acme/httpx-utils",
		source: "pr",
		externalId: "21",
		title: "Add a bounded retry and a weak etag",
		author: "okonkwo",
		createdAt: "2026-06-08T08:19:00.000Z",
		seedLabel: "human",
		seedNotes: "Hand-written retry. MD5 is a cache key, not a password — expect a medium smell.",
		rater2: "human",
		files: files([[
			"httpx_utils/retry.py",
			`
        import requests


        def fetch_once(url: str) -> int:
            response = requests.get(url, timeout=5)
            return response.status_code
        `,
			`
        import hashlib
        import time

        import requests


        def etag_for(body: bytes) -> str:
            return hashlib.md5(body).hexdigest()


        def fetch_with_retry(url: str, attempts: int = 3) -> int:
            last = 0
            for _ in range(attempts):
                response = requests.get(url, timeout=5)
                last = response.status_code
                if last < 500:
                    return last
                time.sleep(0.2)
            return last
        `
		]])
	},
	{
		id: "fieldnote--csv-clean--8",
		repo: "fieldnote/csv-clean",
		source: "pr",
		externalId: "8",
		title: "Drop NUL bytes before parsing",
		author: "mira",
		createdAt: "2026-03-28T12:36:00.000Z",
		seedLabel: "human",
		seedNotes: "Defensive cleaner with a test. Ordinary review.",
		files: files([[
			"csv_clean/rows.py",
			`
        def clean_cell(value: str) -> str:
            return value.strip()
        `,
			`
        def clean_cell(value: str) -> str:
            if "\\0" in value:
                value = value.replace("\\0", "")
            return value.strip()
        `
		], [
			"tests/test_rows.py",
			``,
			`
        from csv_clean.rows import clean_cell


        def test_nul():
            assert clean_cell("a\\0b") == "ab"
        `
		]])
	},
	{
		id: "fieldnote--csv-clean--14",
		repo: "fieldnote/csv-clean",
		source: "pr",
		externalId: "14",
		title: "Evaluate a user formula column",
		author: "devpatil",
		createdAt: "2026-06-19T19:08:00.000Z",
		seedLabel: "ai-assisted",
		seedNotes: "ChatGPT transcript pasted under the fold of the PR.",
		rater2: "ai-assisted",
		hint: "PR body mentions ChatGPT.",
		files: files([[
			"csv_clean/formula.py",
			`
        def apply_formula(row: dict, expr: str):
            return row.get("value")
        `,
			`
        def apply_formula(row: dict, expr: str):
            if not expr:
                return None
            return eval(expr, {}, row)
        `
		]])
	},
	{
		id: "fieldnote--csv-clean--16",
		repo: "fieldnote/csv-clean",
		source: "pr",
		externalId: "16",
		title: "Rename the cleaner entry point",
		author: "berg",
		createdAt: "2026-07-01T10:27:00.000Z",
		seedLabel: "unknown",
		seedNotes: "Rename only. A reviewer guessed an assistant; the author did not confirm.",
		rater2: "ai-assisted",
		hint: "Reviewer guessed an assistant. Not confirmed — do not auto-label.",
		files: files([[
			"csv_clean/rows.py",
			`
        def clean_cell(value: str) -> str:
            return value.strip()
        `,
			`
        def clean_row_cell(value: str) -> str:
            return value.strip()
        `
		]])
	},
	{
		id: "fieldnote--csv-clean--20",
		repo: "fieldnote/csv-clean",
		source: "pr",
		externalId: "20",
		title: "Keep going when a row fails",
		author: "leung",
		createdAt: "2026-07-12T21:16:00.000Z",
		seedLabel: "ai-assisted",
		seedNotes: "Cursor tab-complete. Swallows errors and hashes the password with MD5.",
		rater2: "mixed",
		hint: "PR body mentions Cursor.",
		files: files([[
			"csv_clean/safe.py",
			`
        import json


        def load_row(raw: str) -> dict:
            return json.loads(raw)
        `,
			`
        import hashlib
        import json


        def pin(password: str) -> str:
            return hashlib.md5(password.encode()).hexdigest()


        def load_row(raw: str) -> dict:
            try:
                return json.loads(raw)
            except Exception:
                pass
            return {}
        `
		]])
	},
	{
		id: "harbor--auth-helpers--210",
		repo: "harbor/auth-helpers",
		source: "pr",
		externalId: "210",
		title: "Reject expired session windows",
		author: "nayak",
		createdAt: "2026-07-22T05:41:00.000Z",
		seedLabel: "human",
		seedNotes: "Boundary check only. No assistant language in the thread.",
		files: files([[
			"auth_helpers/window.py",
			`
        def inside(now: int, start: int, end: int) -> bool:
            return start <= now <= end
        `,
			`
        def inside(now: int, start: int, end: int) -> bool:
            if end < start:
                return False
            return start <= now <= end
        `
		]])
	},
	{
		id: "papertrail--logfmt--99",
		repo: "papertrail/logfmt",
		source: "pr",
		externalId: "99",
		title: "Streaming decoder draft",
		author: "sora",
		createdAt: "2026-08-03T13:55:00.000Z",
		seedLabel: "human",
		seedNotes: "Left unfinished on purpose. The quality analyser should record a parse error and continue.",
		files: files([[
			"logfmt/stream.py",
			`
        def decode(chunk: str) -> str:
            return chunk
        `,
			`
        def broken(
            value = (
            return value
        `
		]])
	},
	{
		id: "acme--httpx-utils--30",
		repo: "acme/httpx-utils",
		source: "pr",
		externalId: "30",
		title: "Refresh the vendored helper",
		author: "okonkwo",
		createdAt: "2026-08-18T09:09:00.000Z",
		seedLabel: "human",
		seedNotes: "Only a vendored minified file changes. The ignore list should drop it from line metrics.",
		files: files([[
			"vendor/legacy.min.js",
			`
        /*! v1.0 */ function v(){return 1}
        `,
			`
        /*! v1.1 */ function v(){return 2}
        `
		]])
	}
];
function patchRef(repo, externalId) {
	return `${repo}#${externalId}`;
}
function useAnalyses() {
	const study = useStudy();
	return {
		study,
		analyses: (0, import_react.useMemo)(() => {
			const map = /* @__PURE__ */ new Map();
			for (const patch of PATCHES) map.set(patch.id, analyzePatch(patch, study.threshold));
			return map;
		}, [study.threshold])
	};
}
function summarize(values) {
	if (values.length === 0) return {
		count: 0,
		mean: null,
		median: null,
		min: null,
		max: null
	};
	const sorted = [...values].sort((a, b) => a - b);
	const mid = Math.floor(sorted.length / 2);
	const median = sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
	return {
		count: values.length,
		mean: values.reduce((sum, value) => sum + value, 0) / values.length,
		median,
		min: sorted[0],
		max: sorted[sorted.length - 1]
	};
}
function normalCdf(z) {
	const sign = z < 0 ? -1 : 1;
	const x = Math.abs(z) / Math.SQRT2;
	const t = 1 / (1 + .3275911 * x);
	return .5 * (1 + sign * (1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - .284496736) * t + .254829592) * t * Math.exp(-x * x)));
}
/** Two-sided Mann–Whitney U with tie correction and continuity correction. Exploratory only. */
function mannWhitney(xs, ys) {
	const n1 = xs.length;
	const n2 = ys.length;
	if (n1 < 3 || n2 < 3) return null;
	const all = [...xs.map((v) => ({
		v,
		g: 0
	})), ...ys.map((v) => ({
		v,
		g: 1
	}))].sort((a, b) => a.v - b.v);
	const ranks = new Array(all.length);
	let tieSum = 0;
	let i = 0;
	while (i < all.length) {
		let j = i;
		while (j < all.length && all[j].v === all[i].v) j += 1;
		const t = j - i;
		const average = (i + 1 + j) / 2;
		for (let k = i; k < j; k += 1) ranks[k] = average;
		if (t > 1) tieSum += t * t * t - t;
		i = j;
	}
	let rankSum = 0;
	for (let k = 0; k < all.length; k += 1) if (all[k].g === 0) rankSum += ranks[k];
	const u1 = rankSum - n1 * (n1 + 1) / 2;
	const u2 = n1 * n2 - u1;
	const n = n1 + n2;
	const sigma = Math.sqrt(n1 * n2 * (n + 1 - tieSum / (n * (n - 1))) / 12);
	if (!Number.isFinite(sigma) || sigma === 0) return {
		n1,
		n2,
		u: Math.min(u1, u2),
		z: 0,
		p: 1
	};
	const z = (Math.abs(u1 - n1 * n2 / 2) - .5) / sigma;
	const p = Math.min(1, Math.max(0, 2 * (1 - normalCdf(z))));
	return {
		n1,
		n2,
		u: Math.min(u1, u2),
		z,
		p
	};
}
function cohensKappa(pairs) {
	if (pairs.length === 0) return null;
	const labels = Array.from(new Set(pairs.flatMap((pair) => [pair.a, pair.b])));
	const n = pairs.length;
	const matrix = /* @__PURE__ */ new Map();
	for (const label of labels) matrix.set(label, new Map(labels.map((other) => [other, 0])));
	let agree = 0;
	for (const pair of pairs) {
		matrix.get(pair.a).set(pair.b, (matrix.get(pair.a).get(pair.b) ?? 0) + 1);
		if (pair.a === pair.b) agree += 1;
	}
	const po = agree / n;
	let pe = 0;
	for (const label of labels) {
		let row = 0;
		let col = 0;
		for (const other of labels) {
			row += matrix.get(label).get(other) ?? 0;
			col += matrix.get(other).get(label) ?? 0;
		}
		pe += row / n * (col / n);
	}
	const kappa = pe === 1 ? 1 : (po - pe) / (1 - pe);
	return {
		n,
		agree,
		po,
		kappa
	};
}
function kappaBand(kappa) {
	const abs = Math.abs(kappa);
	if (abs < .2) return "slight";
	if (abs < .4) return "fair";
	if (abs < .6) return "moderate";
	if (abs < .8) return "substantial";
	return "almost perfect";
}
function labelOf(patch, study) {
	const override = study.labels[patch.id];
	if (override) return {
		label: override.label,
		notes: override.notes,
		edited: true
	};
	return {
		label: patch.seedLabel,
		notes: patch.seedNotes,
		edited: false
	};
}
function fmt(value, digits = 2) {
	if (value === null || Number.isNaN(value)) return "—";
	return value.toFixed(digits);
}
function fmtP(value) {
	if (value < .001) return "< 0.001";
	return value.toFixed(3);
}
function joinStudy(patches, analyses, study) {
	return patches.map((patch) => {
		const labelled = labelOf(patch, study);
		return {
			patch,
			metrics: analyses.get(patch.id),
			label: labelled.label,
			notes: labelled.notes,
			edited: labelled.edited
		};
	});
}
//#endregion
export { setThreshold as A, labelOf as C, resetStudy as D, patchRef as E, useAnalyses as M, setLabel as O, kappaBand as S, markReplay as T, filesFromUnifiedDiff as _, Findings as a, importLabels as b, PATCHES as c, Shell as d, Stat as f, cohensKappa as g, cn as h, Eyebrow as i, summarize as j, setRater as k, PROVENANCE as l, analyzeFiles as m, DiffBlock as n, IGNORE_GLOBS as o, TEST_GLOBS as p, EXPERIMENT as r, LabelPill as s, COLLECTION_LOG as t, Panel as u, fmt as v, mannWhitney as w, joinStudy as x, fmtP as y };
