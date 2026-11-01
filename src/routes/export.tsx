import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Eyebrow, Panel } from "@/components/patchgauge/bits";
import { Shell } from "@/components/patchgauge/shell";
import { useAnalyses } from "@/components/patchgauge/use-analyses";
import { PATCHES } from "@/lib/patchgauge/fixture";
import {
  METRIC_DEFS,
  buildConfigJson,
  buildFindingsCsv,
  buildLabelsCsv,
  buildMetricsCsv,
  buildReportMarkdown,
  downloadText,
  metricsHash,
  pipelineLines,
} from "@/lib/patchgauge/report";
import { joinStudy } from "@/lib/patchgauge/stats";

export const Route = createFileRoute("/export")({
  head: () => ({ meta: [{ title: "Export · PatchGauge" }] }),
  component: ExportPage,
});

function ExportPage() {
  const { study, analyses } = useAnalyses();
  const rows = useMemo(() => joinStudy(PATCHES, analyses, study), [analyses, study]);
  const markdown = useMemo(() => buildReportMarkdown(rows, study), [rows, study]);
  const [copied, setCopied] = useState("");

  async function copy(label: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
    } catch {
      setCopied("Clipboard blocked — use download instead.");
    }
  }

  const files: { name: string; mime: string; body: string }[] = [
    { name: "summary.md", mime: "text/markdown", body: markdown },
    { name: "metrics.csv", mime: "text/csv", body: buildMetricsCsv(rows, study) },
    { name: "findings.csv", mime: "text/csv", body: buildFindingsCsv(rows) },
    { name: "labels.csv", mime: "text/csv", body: buildLabelsCsv(rows, study) },
    { name: "config.json", mime: "application/json", body: buildConfigJson(study) },
    { name: "pipeline.log", mime: "text/plain", body: pipelineLines(rows, study.replayCount).join("\n") + "\n" },
  ];

  return (
    <Shell>
      <Eyebrow>Export</Eyebrow>
      <h1 className="mt-2 text-3xl font-medium tracking-tight">Replication package</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Config, metric tables, and a summary you can attach to a report. The metrics CSV has no timestamps, so two
        exports with the same labels and threshold match. No token and no home-directory path is included.
      </p>
      <p className="mt-3 font-mono text-xs text-muted">metrics hash {metricsHash()}</p>
      <p className="mt-2 text-sm text-alert">
        Public diffs can already contain secrets. Do not republish a raw diff if you spot one.
      </p>

      <ul className="mt-4 flex flex-col gap-2">
        {files.map((file) => (
          <li key={file.name} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-3 py-2">
            <span className="font-mono text-xs">{file.name}</span>
            <span className="flex gap-2">
              <button
                type="button"
                onClick={() => downloadText(file.name, file.body, file.mime)}
                className="inline-flex min-h-11 items-center rounded-md bg-brass px-3 text-sm font-medium text-brass-ink"
              >
                Download
              </button>
            </span>
          </li>
        ))}
      </ul>

      <Panel className="mt-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-medium">Summary preview</h2>
          <button type="button" onClick={() => copy("summary", markdown)} className="min-h-11 text-sm text-brass">
            {copied === "summary" ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="mt-3 max-h-96 overflow-auto font-mono text-xs leading-5 text-muted">{markdown}</pre>
        {copied && copied !== "summary" ? <p className="mt-2 text-xs text-muted">{copied}</p> : null}
      </Panel>

      <Panel className="mt-4">
        <h2 className="text-lg font-medium">How to rerun reporting</h2>
        <ol className="mt-2 flex list-decimal flex-col gap-2 pl-4 text-sm text-muted">
          <li>Keep the fixture texts and the label CSV.</li>
          <li>Set the complexity threshold to the value in config.json.</li>
          <li>Regenerate metrics.csv. Do not refresh from the network.</li>
          <li>Read the limitations in summary.md before quoting a number.</li>
        </ol>
      </Panel>

      <Panel className="mt-4">
        <h2 className="text-lg font-medium">Metric definitions</h2>
        <ul className="mt-3 flex flex-col gap-4">
          {METRIC_DEFS.map((metric) => (
            <li key={metric.name}>
              <p className="font-mono text-xs text-brass">{metric.name}</p>
              <p className="text-sm">{metric.formula}</p>
              <p className="font-mono text-xs text-muted">{metric.tool}</p>
            </li>
          ))}
        </ul>
      </Panel>
    </Shell>
  );
}
