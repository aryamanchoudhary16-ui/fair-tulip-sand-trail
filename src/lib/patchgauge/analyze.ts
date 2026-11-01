import type { AnalyserStatus, FileChange, Finding, Patch, PatchMetrics, Severity } from "./types";

const CONTEXT = 3;

function linesOf(source: string): string[] {
  if (source === "") return [];
  return source.split("\n");
}

function stripStrings(source: string): string {
  return source.replace(/'''[\s\S]*?'''|"""[\s\S]*?"""|'(?:\\.|[^'\n])*'|"(?:\\.|[^"\n])*"/g, "''");
}

export function isIgnoredPath(path: string): boolean {
  return (
    /(^|\/)(vendor|node_modules|dist|build)\//.test(path) ||
    /\.min\.(js|css)$/.test(path) ||
    /\.(png|jpg|jpeg|gif|webp|pyc|whl|so|dll)$/.test(path)
  );
}

export function isTestPath(path: string): boolean {
  const base = path.split("/").pop() ?? path;
  return (
    /^test_.*\.py$/.test(base) ||
    /_test\.py$/.test(base) ||
    /Test\.java$/.test(base) ||
    /\.spec\.ts$/.test(base) ||
    /(^|\/)tests?\//.test(path)
  );
}

export function pythonParseError(source: string): string | null {
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
  for (const line of source.split("\n")) {
    if (/^\s*def\s+/.test(line) && !/:\s*(#.*)?$/.test(line)) return "def is missing a colon";
  }
  return null;
}

function cyclomatic(text: string): number {
  const code = stripStrings(text).replace(/#.*$/gm, "");
  let score = 1;
  const re = /\b(if|elif|for|while|except|and|or|case)\b/g;
  while (re.exec(code)) score += 1;
  return score;
}

function extractFunctions(source: string): { name: string; start: number; end: number; text: string }[] {
  const lines = source.split("\n");
  const defs: { name: string; indent: number; start: number }[] = [];
  lines.forEach((line, index) => {
    const match = line.match(/^(\s*)def\s+([A-Za-z_]\w*)\s*\(/);
    if (!match || !/:\s*(#.*)?$/.test(line)) return;
    defs.push({ name: match[2], indent: match[1].length, start: index });
  });
  return defs.map((def) => {
    let end = lines.length - 1;
    for (let i = def.start + 1; i < lines.length; i += 1) {
      if (lines[i].trim() === "" || lines[i].trim().startsWith("#")) continue;
      const indent = lines[i].match(/^ */)?.[0].length ?? 0;
      if (indent <= def.indent) {
        end = i - 1;
        break;
      }
    }
    return {
      name: def.name,
      start: def.start + 1,
      end: end + 1,
      text: lines.slice(def.start, end + 1).join("\n"),
    };
  });
}

function emptyExceptLines(source: string): number[] {
  const lines = source.split("\n");
  const hits: number[] = [];
  for (let i = 0; i < lines.length; i += 1) {
    if (!/^\s*except\b.*:\s*(#.*)?$/.test(lines[i])) continue;
    const exceptIndent = lines[i].match(/^ */)?.[0].length ?? 0;
    const body: string[] = [];
    let j = i + 1;
    while (j < lines.length) {
      if (lines[j].trim() === "") {
        body.push(lines[j]);
        j += 1;
        continue;
      }
      const indent = lines[j].match(/^ */)?.[0].length ?? 0;
      if (indent <= exceptIndent) break;
      body.push(lines[j]);
      j += 1;
    }
    const meaningful = body.map((line) => line.trim()).filter(Boolean);
    if (
      meaningful.length === 0 ||
      meaningful.every((line) => line === "pass" || line === "..." || line.startsWith("#"))
    ) {
      hits.push(i + 1);
    }
  }
  return hits;
}

type DiffOp = { t: " " | "+" | "-"; line: string; bLine?: number };

type FileDiff = {
  text: string;
  additions: number;
  deletions: number;
  hunks: number;
  addedLineNos: Set<number>;
};

function diffFile(path: string, before: string, after: string): FileDiff {
  const a = linesOf(before);
  const b = linesOf(after);
  const n = a.length;
  const m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const ops: DiffOp[] = [];
  const addedLineNos = new Set<number>();
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      ops.push({ t: " ", line: a[i], bLine: j + 1 });
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      ops.push({ t: "-", line: a[i] });
      i += 1;
    } else {
      ops.push({ t: "+", line: b[j], bLine: j + 1 });
      addedLineNos.add(j + 1);
      j += 1;
    }
  }
  while (i < n) {
    ops.push({ t: "-", line: a[i] });
    i += 1;
  }
  while (j < m) {
    ops.push({ t: "+", line: b[j], bLine: j + 1 });
    addedLineNos.add(j + 1);
    j += 1;
  }

  const additions = ops.filter((op) => op.t === "+").length;
  const deletions = ops.filter((op) => op.t === "-").length;
  if (additions === 0 && deletions === 0) {
    return {
      text: `--- a/${path}\n+++ b/${path}\n(no textual change)`,
      additions,
      deletions,
      hunks: 0,
      addedLineNos,
    };
  }

  const include = ops.map(() => false);
  ops.forEach((op, index) => {
    if (op.t === " ") return;
    for (let t = Math.max(0, index - CONTEXT); t <= Math.min(ops.length - 1, index + CONTEXT); t += 1) {
      include[t] = true;
    }
  });

  const hunkBodies: { oldStart: number; newStart: number; lines: string[] }[] = [];
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
    const hunk = { oldStart: oldLine, newStart: newLine, lines: [] as string[] };
    while (k < ops.length && include[k]) {
      hunk.lines.push(`${ops[k].t}${ops[k].line}`);
      if (ops[k].t !== "+") oldLine += 1;
      if (ops[k].t !== "-") newLine += 1;
      k += 1;
    }
    hunkBodies.push(hunk);
  }

  const rendered = hunkBodies
    .map((hunk) => {
      const oldCount = hunk.lines.filter((line) => !line.startsWith("+")).length;
      const newCount = hunk.lines.filter((line) => !line.startsWith("-")).length;
      const oldStart = oldCount === 0 ? 0 : hunk.oldStart;
      const newStart = newCount === 0 ? 0 : hunk.newStart;
      return `@@ -${oldStart},${oldCount} +${newStart},${newCount} @@\n${hunk.lines.join("\n")}`;
    })
    .join("\n");

  return {
    text: `--- a/${path}\n+++ b/${path}\n${rendered}`,
    additions,
    deletions,
    hunks: hunkBodies.length,
    addedLineNos,
  };
}

function scanAddedLine(line: string): { ruleId: string; severity: Severity; message: string }[] {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return [];
  const code = stripStrings(line);
  const hits: { ruleId: string; severity: Severity; message: string }[] = [];

  if (/\beval\s*\(/.test(code)) {
    hits.push({
      ruleId: "PGSEC001",
      severity: "HIGH",
      message: "eval() on a dynamic string can execute attacker-controlled code.",
    });
  }
  if (/\bexec\s*\(/.test(code)) {
    hits.push({ ruleId: "PGSEC002", severity: "HIGH", message: "exec() runs a dynamic string as code." });
  }
  if (/pickle\.loads\s*\(/.test(code)) {
    hits.push({
      ruleId: "PGSEC003",
      severity: "HIGH",
      message: "pickle.loads can execute arbitrary code from its input.",
    });
  }
  if (/yaml\.load\s*\(/.test(code) && !/SafeLoader|safe_load/.test(code)) {
    hits.push({
      ruleId: "PGSEC004",
      severity: "HIGH",
      message: "yaml.load without SafeLoader can construct unexpected objects.",
    });
  }
  if (/shell\s*=\s*True/.test(code)) {
    hits.push({
      ruleId: "PGSEC005",
      severity: "HIGH",
      message: "subprocess with shell=True is open to command injection.",
    });
  }
  if (
    /(?:password|secret|api_key|apikey|token)\s*=\s*["'][^"']{6,}["']/i.test(line) &&
    !/os\.environ|getenv/.test(line)
  ) {
    hits.push({ ruleId: "PGSEC006", severity: "HIGH", message: "Possible hardcoded secret assigned in source." });
  }
  if (
    /(execute|executemany)\s*\(\s*f["']/.test(line) ||
    (/\b(SELECT|INSERT|UPDATE|DELETE)\b/.test(line) && /f["']/.test(line) && /\{/.test(line))
  ) {
    hits.push({
      ruleId: "PGSEC007",
      severity: "HIGH",
      message: "SQL is built with an f-string. Bind parameters instead.",
    });
  }
  if (/verify\s*=\s*False/.test(code)) {
    hits.push({ ruleId: "PGSEC008", severity: "MEDIUM", message: "TLS verification is disabled (verify=False)." });
  }
  if (/hashlib\.(md5|sha1)\s*\(/.test(code)) {
    hits.push({
      ruleId: "PGSEC009",
      severity: "MEDIUM",
      message:
        "MD5 or SHA1 is used. Weak where a cryptographic guarantee is needed; may be a false positive for cache keys.",
    });
  }
  if (/requests\.(get|post|put|patch|delete)\s*\(/.test(code) && !/timeout\s*=/.test(code)) {
    hits.push({ ruleId: "PGSEC010", severity: "LOW", message: "HTTP call has no explicit timeout." });
  }
  if (/tempfile\.mktemp\s*\(/.test(code)) {
    hits.push({ ruleId: "PGSEC011", severity: "MEDIUM", message: "tempfile.mktemp is insecure. Use mkstemp." });
  }
  return hits;
}

export function analyzeFiles(files: FileChange[], threshold: number): PatchMetrics {
  const findings: Finding[] = [];
  const parseErrors: { file: string; message: string }[] = [];
  const ignoredFiles: string[] = [];
  const complexFunctions: PatchMetrics["complexFunctions"] = [];
  const diffs: string[] = [];
  let linesAdded = 0;
  let linesDeleted = 0;
  let hunks = 0;
  let todoFixme = 0;
  let emptyExcept = 0;
  let repeatedBlocks = 0;
  let hasTestChange = false;
  const complexities: number[] = [];

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
    const addedTexts: string[] = [];
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
          message: "TODO or FIXME introduced by the patch.",
        });
      }
      for (const hit of scanAddedLine(text)) {
        findings.push({
          analyser: "security",
          severity: hit.severity,
          ruleId: hit.ruleId,
          file: file.path,
          line: lineNo,
          message: hit.message,
        });
      }
    }

    const counts = new Map<string, number>();
    for (const text of addedTexts) {
      const trimmed = text.trim();
      if (trimmed.length < 12 || trimmed.startsWith("#")) continue;
      counts.set(trimmed, (counts.get(trimmed) ?? 0) + 1);
    }
    for (const count of counts.values()) {
      if (count >= 4) repeatedBlocks += 1;
    }

    const parseError = pythonParseError(file.after);
    if (parseError && /\.py$/.test(file.path)) {
      parseErrors.push({ file: file.path, message: parseError });
      findings.push({
        analyser: "quality",
        severity: "INFO",
        ruleId: "PGQA-PARSE",
        file: file.path,
        line: null,
        message: `Could not parse ${file.path}: ${parseError}. Complexity was skipped for this file.`,
      });
      continue;
    }

    if (/\.py$/.test(file.path)) {
      for (const lineNo of emptyExceptLines(file.after)) {
        if (diff.addedLineNos.has(lineNo)) {
          emptyExcept += 1;
          findings.push({
            analyser: "quality",
            severity: "LOW",
            ruleId: "PGQA-EXCEPT",
            file: file.path,
            line: lineNo,
            message: "Empty except block introduced by the patch (pass, ellipsis, or no body).",
          });
        }
      }
      for (const fn of extractFunctions(file.after)) {
        let changed = false;
        for (let line = fn.start; line <= fn.end; line += 1) {
          if (diff.addedLineNos.has(line)) {
            changed = true;
            break;
          }
        }
        if (!changed) continue;
        const score = cyclomatic(fn.text);
        complexities.push(score);
        if (score > threshold) {
          complexFunctions.push({ name: fn.name, file: file.path, complexity: score });
          findings.push({
            analyser: "quality",
            severity: "MEDIUM",
            ruleId: "PGQA-CC",
            file: file.path,
            line: fn.start,
            message: `${fn.name} has cyclomatic complexity ${score}, above the threshold of ${threshold}.`,
          });
        }
      }
    }
  }

  if (repeatedBlocks > 0) {
    findings.push({
      analyser: "quality",
      severity: "LOW",
      ruleId: "PGQA-REPEAT",
      file: "",
      line: null,
      message: `${repeatedBlocks} repeated identical added line${repeatedBlocks === 1 ? "" : "s"} (4 or more copies).`,
    });
  }

  const securityFindings = findings.filter((finding) => finding.analyser === "security").length;
  const highSeverity = findings.filter((finding) => finding.severity === "HIGH").length;
  const meanComplexity =
    complexities.length === 0 ? null : complexities.reduce((sum, value) => sum + value, 0) / complexities.length;
  const maxComplexity = complexities.length === 0 ? null : Math.max(...complexities);
  const qualityOk = parseErrors.length === 0;

  const analysers: AnalyserStatus[] = [
    {
      name: "quality-heuristic",
      status: qualityOk ? "ok" : "error",
      detail: qualityOk ? `${complexities.length} functions measured` : parseErrors.map((entry) => entry.message).join("; "),
    },
    {
      name: "security-heuristic",
      status: "ok",
      detail: `${securityFindings} findings on added lines`,
    },
    {
      name: "test-presence",
      status: "ok",
      detail: hasTestChange ? "test file changed" : "no test file changed",
    },
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
    findingsPerThousand: linesAdded === 0 ? null : (securityFindings * 1000) / linesAdded,
    hasTestChange,
    parseErrors,
    ignoredFiles,
    findings,
    diff: diffs.join("\n"),
    state: parseErrors.length > 0 ? "partial" : "complete",
    analysers,
  };
}

export function analyzePatch(patch: Patch, threshold: number): PatchMetrics {
  return analyzeFiles(patch.files, threshold);
}

export function filesFromUnifiedDiff(diff: string): FileChange[] | null {
  const text = diff.replace(/\r\n/g, "\n");
  if (!/(^|\n)(\+\+\+|diff |@@ )/.test(text)) return null;
  type Acc = { path: string; before: string[]; after: string[] };
  const files: Acc[] = [];
  const slot: { file: Acc | null } = { file: null };
  const open = (path: string): Acc => {
    if (slot.file && slot.file.path === path) return slot.file;
    const next: Acc = { path, before: [], after: [] };
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
      const path = raw === "/dev/null" ? (slot.file?.path ?? "deleted") : raw.replace(/^b\//, "");
      open(path);
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
    after: file.after.join("\n"),
  }));
}
