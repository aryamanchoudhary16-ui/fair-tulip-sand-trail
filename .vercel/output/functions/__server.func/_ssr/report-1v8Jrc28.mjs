import { E as patchRef, c as PATCHES, j as summarize, o as IGNORE_GLOBS, p as TEST_GLOBS, r as EXPERIMENT, v as fmt } from "./stats-CWjN6O2P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/report-1v8Jrc28.js
var METRIC_DEFS = [
	{
		name: "lines_added",
		formula: "Added lines in the unified diff, excluding ignore-list paths.",
		tool: "quality-heuristic"
	},
	{
		name: "lines_deleted",
		formula: "Deleted lines in the unified diff, excluding ignore-list paths.",
		tool: "quality-heuristic"
	},
	{
		name: "files_touched",
		formula: "Count of paths in the patch, including ignored paths.",
		tool: "quality-heuristic"
	},
	{
		name: "hunks",
		formula: "Number of unified-diff hunks across non-identical files.",
		tool: "quality-heuristic"
	},
	{
		name: "mean_complexity",
		formula: "Mean cyclomatic complexity of changed Python functions. A function scores 1, plus 1 for each if, elif, for, while, except, and, or, or case, after stripping strings and comments.",
		tool: "quality-heuristic"
	},
	{
		name: "max_complexity",
		formula: "Highest cyclomatic complexity among changed Python functions. Null when none changed.",
		tool: "quality-heuristic"
	},
	{
		name: "complex_functions",
		formula: "Changed functions whose complexity exceeds the experiment threshold (default 10).",
		tool: "quality-heuristic"
	},
	{
		name: "todo_fixme",
		formula: "Added lines containing TODO or FIXME.",
		tool: "quality-heuristic"
	},
	{
		name: "empty_except",
		formula: "Added except blocks whose body is empty, pass, or ellipsis.",
		tool: "quality-heuristic"
	},
	{
		name: "repeated_blocks",
		formula: "Distinct added lines of at least 12 non-comment characters that occur 4 or more times.",
		tool: "quality-heuristic"
	},
	{
		name: "security_findings",
		formula: "Count of PGSEC rules on added lines only. This is a documented heuristic pack, not a Bandit or Semgrep run, and a clean result does not prove the patch is secure.",
		tool: "security-heuristic"
	},
	{
		name: "findings_per_thousand",
		formula: "security_findings × 1000 / lines_added. Null when lines_added is 0. Unstable when a patch adds only a few lines.",
		tool: "security-heuristic"
	},
	{
		name: "has_test_change",
		formula: `True when a path matching ${TEST_GLOBS.join(", ")} changes. Test execution is off in this model.`,
		tool: "test-presence"
	}
];
function metricsHash() {
	const text = JSON.stringify(METRIC_DEFS);
	let hash = 5381;
	for (let i = 0; i < text.length; i += 1) hash = (hash << 5) + hash ^ text.charCodeAt(i);
	return (hash >>> 0).toString(16).padStart(8, "0");
}
function csvCell(value) {
	if (value === null) return "";
	const text = String(value);
	if (/[",\n]/.test(text)) return `"${text.replace(/"/g, "\"\"")}"`;
	return text;
}
function csv(rows) {
	return rows.map((row) => row.map(csvCell).join(",")).join("\n") + "\n";
}
function splitCsvLine(line) {
	const out = [];
	let cur = "";
	let quoted = false;
	for (let i = 0; i < line.length; i += 1) {
		const ch = line[i];
		if (quoted) {
			if (ch === "\"") {
				if (line[i + 1] === "\"") {
					cur += "\"";
					i += 1;
				} else quoted = false;
			} else cur += ch;
		} else if (ch === "\"") quoted = true;
		else if (ch === ",") {
			out.push(cur);
			cur = "";
		} else cur += ch;
	}
	out.push(cur);
	return out;
}
var PRIMARY = [
	"human",
	"ai-assisted",
	"mixed"
];
function groupRows(rows, label) {
	return rows.filter((row) => row.label === label);
}
function buildMetricsCsv(rows, study) {
	return csv([[
		"patch_id",
		"repo",
		"external_id",
		"title",
		"label",
		"rater",
		"lines_added",
		"lines_deleted",
		"files_touched",
		"hunks",
		"mean_complexity",
		"max_complexity",
		"complex_functions",
		"todo_fixme",
		"empty_except",
		"repeated_blocks",
		"security_findings",
		"high_severity",
		"findings_per_thousand",
		"has_test_change",
		"parse_errors",
		"state"
	], ...rows.map((row) => {
		const m = row.metrics;
		return [
			row.patch.id,
			row.patch.repo,
			row.patch.externalId,
			row.patch.title,
			row.label,
			study.raterId,
			m.linesAdded,
			m.linesDeleted,
			m.filesTouched,
			m.hunks,
			m.meanComplexity === null ? null : Number(m.meanComplexity.toFixed(4)),
			m.maxComplexity,
			m.complexFunctions.length,
			m.todoFixme,
			m.emptyExcept,
			m.repeatedBlocks,
			m.securityFindings,
			m.highSeverity,
			m.findingsPerThousand === null ? null : Number(m.findingsPerThousand.toFixed(4)),
			m.hasTestChange,
			m.parseErrors.length,
			m.state
		];
	})]);
}
function buildFindingsCsv(rows) {
	return csv([[
		"patch_id",
		"analyser",
		"severity",
		"rule_id",
		"file",
		"line",
		"message"
	], ...rows.flatMap((row) => row.metrics.findings.map((finding) => [
		row.patch.id,
		finding.analyser,
		finding.severity,
		finding.ruleId,
		finding.file,
		finding.line,
		finding.message
	]))]);
}
function buildLabelsCsv(rows, study) {
	return csv([[
		"patch_id",
		"label",
		"rater",
		"notes"
	], ...rows.map((row) => [
		row.patch.id,
		row.label,
		study.raterId,
		row.notes
	])]);
}
function buildConfigJson(study) {
	return JSON.stringify({
		experiment: EXPERIMENT.id,
		title: EXPERIMENT.title,
		language: EXPERIMENT.language,
		dateWindow: EXPERIMENT.dateWindow,
		sampleCap: EXPERIMENT.sampleCap,
		complexityThreshold: study.threshold,
		toolVersion: EXPERIMENT.toolVersion,
		analysers: EXPERIMENT.analysers,
		metricsHash: metricsHash(),
		ignore: IGNORE_GLOBS,
		testGlobs: TEST_GLOBS,
		repos: Array.from(new Set(PATCHES.map((patch) => patch.repo))),
		note: "Offline replay. No GitHub token is stored in this package."
	}, null, 2);
}
function buildReportMarkdown(rows, study) {
	const unknown = rows.filter((row) => row.label === "unknown").length;
	const primary = rows.filter((row) => row.label !== "unknown");
	const lines = [];
	lines.push(`# ${EXPERIMENT.title}`);
	lines.push("");
	lines.push(`Experiment \`${EXPERIMENT.id}\`. Tool ${EXPERIMENT.toolVersion}. Metrics definition hash \`${metricsHash()}\`.`);
	lines.push("");
	lines.push("## Sample");
	lines.push("");
	lines.push(`${rows.length} labelled patches are in the dataset. ${unknown} labelled unknown are excluded from the primary comparison and retained in the CSV. ${primary.length} patches remain in the comparison.`);
	lines.push("");
	lines.push("| Group | Patches |");
	lines.push("| --- | ---: |");
	for (const label of [
		"human",
		"ai-assisted",
		"mixed",
		"unknown"
	]) lines.push(`| ${label} | ${rows.filter((row) => row.label === label).length} |`);
	lines.push("");
	const small = PRIMARY.filter((label) => groupRows(rows, label).length < 20);
	if (small.length) lines.push(`Warning: ${small.join(", ")} ${small.length === 1 ? "has" : "have"} fewer than 20 patches. Treat every difference as a pilot, not a result.`);
	lines.push("");
	lines.push(`The study bar in the requirements is at least 80 labelled patches. This fixture has ${rows.length}. That is a working model of the instrument, not the final study.`);
	lines.push("");
	lines.push("## Group statistics");
	lines.push("");
	lines.push("Unknown is omitted here. Means use only patches where the metric is defined.");
	lines.push("");
	const specs = [
		{
			name: "lines_added",
			pick: (row) => row.metrics.linesAdded,
			digits: 1
		},
		{
			name: "max_complexity",
			pick: (row) => row.metrics.maxComplexity,
			digits: 1
		},
		{
			name: "findings_per_thousand",
			pick: (row) => row.metrics.findingsPerThousand,
			digits: 2
		},
		{
			name: "has_test_change",
			pick: (row) => row.metrics.hasTestChange ? 1 : 0,
			digits: 2
		},
		{
			name: "high_severity",
			pick: (row) => row.metrics.highSeverity,
			digits: 2
		}
	];
	for (const spec of specs) {
		lines.push(`### ${spec.name}`);
		lines.push("");
		lines.push("| Group | n | mean | median | min | max |");
		lines.push("| --- | ---: | ---: | ---: | ---: | ---: |");
		for (const label of PRIMARY) {
			const values = groupRows(rows, label).map(spec.pick).filter((value) => value !== null);
			const stat = summarize(values);
			lines.push(`| ${label} | ${stat.count} | ${fmt(stat.mean, spec.digits)} | ${fmt(stat.median, spec.digits)} | ${fmt(stat.min, spec.digits)} | ${fmt(stat.max, spec.digits)} |`);
		}
		lines.push("");
	}
	lines.push("## What this does not say");
	lines.push("");
	lines.push("These figures describe the labelled sample. They do not show that AI assistance causes defects, and they are not a security certification. Static rules have false positives. Labels are a validity threat; see the inter-rater card in the comparison view.");
	lines.push("");
	lines.push("## Limitations");
	lines.push("");
	lines.push("- Labelling error: provenance is a human judgement, and the second rater does not always agree.");
	lines.push("- Public-repo bias: the fixture only contains public-style Python changes.");
	lines.push("- Static-analysis false positives: PGSEC009 in particular fires on MD5 used as a cache key.");
	lines.push("- Language mix: version 1 of the quality suite is Python-only.");
	lines.push("- Security rules are an in-browser heuristic pack inspired by common Bandit findings, not Bandit or Semgrep themselves.");
	lines.push("");
	lines.push("## Toolchain");
	lines.push("");
	for (const analyser of EXPERIMENT.analysers) lines.push(`- ${analyser.name} ${analyser.version}`);
	lines.push(`- complexity threshold ${study.threshold}`);
	lines.push("");
	lines.push("## Rerun");
	lines.push("");
	lines.push("Reporting reads the stored patch texts and the label table. It does not call GitHub. Two exports from the same labels and threshold produce the same metrics CSV. Secrets are not part of this package.");
	lines.push("");
	return lines.join("\n");
}
function pipelineLines(rows, replayCount) {
	return rows.flatMap((row) => row.metrics.analysers.map((analyser) => {
		const skipped = replayCount > 0 && analyser.status === "ok";
		return JSON.stringify({
			patch: patchRef(row.patch.repo, row.patch.externalId),
			analyser: analyser.name,
			status: skipped ? "skipped" : analyser.status,
			detail: skipped ? "skipped completed patch+analyser pair" : analyser.detail
		});
	}));
}
function downloadText(filename, contents, mime) {
	const blob = new Blob([contents], { type: mime });
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = filename;
	document.body.appendChild(anchor);
	anchor.click();
	anchor.remove();
	URL.revokeObjectURL(url);
}
//#endregion
export { buildMetricsCsv as a, metricsHash as c, buildLabelsCsv as i, pipelineLines as l, buildConfigJson as n, buildReportMarkdown as o, buildFindingsCsv as r, downloadText as s, METRIC_DEFS as t, splitCsvLine as u };
