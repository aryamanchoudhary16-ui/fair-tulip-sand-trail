import type { Finding, Provenance, Severity } from "@/lib/patchgauge/types";
import { cn } from "@/lib/utils";

const LABEL_TEXT: Record<Provenance, string> = {
  human: "text-human",
  "ai-assisted": "text-ai",
  mixed: "text-mixed",
  unknown: "text-unknown",
};

const SEVERITY_TEXT: Record<Severity, string> = {
  HIGH: "text-alert",
  MEDIUM: "text-brass",
  LOW: "text-muted",
  INFO: "text-muted",
};

export function LabelPill({ label }: { label: Provenance }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-mono text-xs", LABEL_TEXT[label])}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {label}
    </span>
  );
}

export function SeverityTag({ severity }: { severity: Severity }) {
  return <span className={cn("font-mono text-xs", SEVERITY_TEXT[severity])}>{severity}</span>;
}

export function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cn("rounded-lg border border-line bg-surface p-4", className)}>{children}</section>;
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("font-mono text-xs tracking-widest text-brass uppercase", className)}>{children}</p>;
}

const SEVERITY_RANK: Record<Severity, number> = { HIGH: 0, MEDIUM: 1, LOW: 2, INFO: 3 };

export function Findings({ findings }: { findings: Finding[] }) {
  if (findings.length === 0) {
    return <p className="text-sm text-muted">No findings on the lines this patch added.</p>;
  }
  const ordered = [...findings].sort((a, b) => SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity]);
  return (
    <ul className="flex flex-col gap-3">
      {ordered.map((finding, index) => (
        <li key={`${finding.ruleId}-${finding.file}-${finding.line}-${index}`} className="border-b border-line pb-3 last:border-b-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <SeverityTag severity={finding.severity} />
            <span className="font-mono text-xs text-fg">{finding.ruleId}</span>
            <span className="font-mono text-xs text-muted">
              {finding.file || "patch"}
              {finding.line ? `:${finding.line}` : ""}
            </span>
          </div>
          <p className="mt-1 text-sm">{finding.message}</p>
        </li>
      ))}
    </ul>
  );
}

export function DiffBlock({ diff }: { diff: string }) {
  const lines = diff.split("\n");
  const truncated = lines.length > 160;
  const shown = truncated ? lines.slice(0, 160) : lines;
  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <pre className="max-h-96 overflow-auto p-3 font-mono text-xs leading-5">
        {shown.map((line, index) => {
          const kind = line.startsWith("+") && !line.startsWith("+++")
            ? "text-human"
            : line.startsWith("-") && !line.startsWith("---")
              ? "text-alert"
              : line.startsWith("@@")
                ? "text-brass"
                : "text-muted";
          return (
            <div key={`${index}-${line.slice(0, 12)}`} className={kind}>
              {line || " "}
            </div>
          );
        })}
      </pre>
      {truncated ? <p className="border-t border-line px-3 py-2 text-xs text-muted">Truncated to 160 lines.</p> : null}
    </div>
  );
}

export function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface px-3 py-3">
      <p className="font-mono text-xs text-muted">{label}</p>
      <p className="mt-1 font-mono text-2xl tabular-nums text-fg">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}
