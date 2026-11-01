export const PROVENANCE = ["human", "ai-assisted", "mixed", "unknown"] as const;

export type Provenance = (typeof PROVENANCE)[number];

export type Severity = "HIGH" | "MEDIUM" | "LOW" | "INFO";

export type FileChange = {
  path: string;
  before: string;
  after: string;
};

export type Patch = {
  id: string;
  repo: string;
  source: "pr" | "commit";
  externalId: string;
  title: string;
  author: string;
  createdAt: string;
  seedLabel: Provenance;
  seedNotes: string;
  rater2?: Provenance;
  hint?: string;
  files: FileChange[];
};

export type Finding = {
  analyser: "quality" | "security" | "tests";
  severity: Severity;
  ruleId: string;
  file: string;
  line: number | null;
  message: string;
};

export type AnalyserStatus = {
  name: string;
  status: "ok" | "error" | "skipped";
  detail: string;
};

export type PatchMetrics = {
  linesAdded: number;
  linesDeleted: number;
  filesTouched: number;
  hunks: number;
  functionsMeasured: number;
  meanComplexity: number | null;
  maxComplexity: number | null;
  complexFunctions: { name: string; file: string; complexity: number }[];
  todoFixme: number;
  emptyExcept: number;
  repeatedBlocks: number;
  securityFindings: number;
  highSeverity: number;
  findingsPerThousand: number | null;
  hasTestChange: boolean;
  parseErrors: { file: string; message: string }[];
  ignoredFiles: string[];
  findings: Finding[];
  diff: string;
  state: "complete" | "partial";
  analysers: AnalyserStatus[];
};

export type LabelOverride = {
  label: Provenance;
  notes: string;
};

export type Study = {
  raterId: string;
  threshold: number;
  analyzedAt: string;
  replayCount: number;
  labels: Record<string, LabelOverride>;
};

export const COMPLEXITY_DEFAULT = 10;

export const IGNORE_GLOBS = [
  "vendor/**",
  "node_modules/**",
  "dist/**",
  "build/**",
  "**/*.min.js",
  "**/*.min.css",
  "**/*.{png,jpg,jpeg,gif,webp,pyc,whl}",
];

export const TEST_GLOBS = [
  "**/test_*.py",
  "**/*_test.py",
  "**/*Test.java",
  "**/*.spec.ts",
  "**/tests/**",
  "**/test/**",
];
