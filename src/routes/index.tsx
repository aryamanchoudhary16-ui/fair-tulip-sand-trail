import { Link, createFileRoute } from "@tanstack/react-router";
import { COLLECTION_LOG, EXPERIMENT, PATCHES, patchRef } from "@/lib/patchgauge/fixture";
import { pipelineLines } from "@/lib/patchgauge/report";
import { labelOf } from "@/lib/patchgauge/stats";
import { markReplay, resetStudy, setRater } from "@/lib/patchgauge/store";
import type { Provenance } from "@/lib/patchgauge/types";
import { Eyebrow, LabelPill, Panel, Stat } from "@/components/patchgauge/bits";
import { Shell } from "@/components/patchgauge/shell";
import { useAnalyses } from "@/components/patchgauge/use-analyses";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Study · PatchGauge" }] }),
  component: StudyPage,
});

const ORDER: Provenance[] = ["human", "ai-assisted", "mixed", "unknown"];

const BAR: Record<Provenance, string> = {
  human: "bg-human",
  "ai-assisted": "bg-ai",
  mixed: "bg-mixed",
  unknown: "bg-unknown",
};

function StudyPage() {
  const { study, analyses } = useAnalyses();
  const counts = Object.fromEntries(ORDER.map((label) => [label, 0])) as Record<Provenance, number>;
  let partial = 0;
  let labelled = 0;
  for (const patch of PATCHES) {
    counts[labelOf(patch, study).label] += 1;
    labelled += 1;
    if (analyses.get(patch.id)?.state === "partial") partial += 1;
  }
  const rows = PATCHES.map((patch) => ({
    patch,
    metrics: analyses.get(patch.id)!,
    label: labelOf(patch, study).label,
    notes: labelOf(patch, study).notes,
    edited: labelOf(patch, study).edited,
  }));
  const hot = [...rows]
    .filter((row) => row.metrics.highSeverity > 0)
    .sort((a, b) => b.metrics.highSeverity - a.metrics.highSeverity)
    .slice(0, 3);
  const log = pipelineLines(rows, study.replayCount);
  const stamp = study.analyzedAt.replace("T", " ").slice(0, 16);

  return (
    <Shell>
      <Eyebrow>Experiment</Eyebrow>
      <h1 className="mt-2 max-w-2xl text-3xl font-medium tracking-tight">Do AI-assisted changes differ on static signals?</h1>
      <p className="mt-3 max-w-2xl border-l-2 border-brass pl-4 text-sm text-muted">
        Quality, security-smell density, and test presence on a curated Python fixture. The numbers describe this
        sample. They do not say that AI assistance causes defects.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Collected" value={String(PATCHES.length)} hint="public pull requests" />
        <Stat label="Labelled" value={String(labelled)} hint="unknown stays in the set" />
        <Stat label="Analysed" value={String(PATCHES.length - partial)} hint="complete pairs" />
        <Stat label="Partial" value={String(partial)} hint="parse error, run continued" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        <Panel className="lg:col-span-3">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-lg font-medium">Provenance mix</h2>
            <p className="font-mono text-xs text-muted">last analysis {stamp} UTC</p>
          </div>
          <ul className="mt-4 flex flex-col gap-3">
            {ORDER.map((label) => {
              const width = Math.round((counts[label] / PATCHES.length) * 100);
              return (
                <li key={label}>
                  <div className="mb-1 flex items-center justify-between">
                    <LabelPill label={label} />
                    <span className="font-mono text-xs tabular-nums text-muted">
                      {counts[label]} · {width}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-2">
                    <div className={cn("h-2 rounded-full", BAR[label])} style={{ width: `${width}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/compare"
              className="inline-flex min-h-11 items-center rounded-md bg-brass px-3 text-sm font-medium text-brass-ink"
            >
              Open comparison
            </Link>
            <Link to="/patches" className="inline-flex min-h-11 items-center rounded-md border border-line px-3 text-sm">
              Review patches
            </Link>
          </div>
        </Panel>

        <Panel className="lg:col-span-2">
          <h2 className="text-lg font-medium">High-severity smells</h2>
          <p className="mt-1 text-sm text-muted">Listed individually, as the patch detail view requires.</p>
          <ul className="mt-3 flex flex-col">
            {hot.map((row) => (
              <li key={row.patch.id} className="border-b border-line last:border-b-0">
                <Link
                  to="/patches/$patchId"
                  params={{ patchId: row.patch.id }}
                  className="flex min-h-11 items-center justify-between gap-3 py-2"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm">{row.patch.title}</span>
                    <span className="font-mono text-xs text-muted">
                      {patchRef(row.patch.repo, row.patch.externalId)}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-xs text-alert">{row.metrics.highSeverity} high</span>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel>
          <h2 className="text-lg font-medium">Workspace</h2>
          <p className="mt-1 text-sm text-muted">{EXPERIMENT.title}</p>
          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <dt className="text-muted">Creator</dt>
            <dd>{EXPERIMENT.creator}</dd>
            <dt className="text-muted">Language</dt>
            <dd>{EXPERIMENT.language}</dd>
            <dt className="text-muted">Window</dt>
            <dd className="font-mono text-xs">
              {EXPERIMENT.dateWindow[0]} – {EXPERIMENT.dateWindow[1]}
            </dd>
            <dt className="text-muted">Sample cap</dt>
            <dd className="font-mono tabular-nums">{EXPERIMENT.sampleCap}</dd>
          </dl>
          <p className="mt-3 font-mono text-xs text-muted">config/ · cache/ · data/ · logs/ · export/</p>
          <p className="mt-2 text-sm text-ok">Config valid. Title, creator, language, window, and repos are set.</p>
          <ul className="mt-3 flex flex-col gap-1 font-mono text-xs text-muted">
            <li>patchgauge {EXPERIMENT.toolVersion}</li>
            {EXPERIMENT.analysers.map((analyser) => (
              <li key={analyser.name}>
                {analyser.name} {analyser.version}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <h2 className="text-lg font-medium">Operator</h2>
          <label className="mt-3 block text-sm" htmlFor="rater">
            Rater id
            <input
              id="rater"
              value={study.raterId}
              onChange={(event) => setRater(event.target.value)}
              maxLength={40}
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 font-mono text-sm text-fg"
            />
          </label>
          <p className="mt-2 text-xs text-muted">Stored with each label you change. Tokens are never written here.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => markReplay()}
              className="inline-flex min-h-11 items-center rounded-md border border-line px-3 text-sm"
            >
              Re-run pipeline
            </button>
            <button
              type="button"
              onClick={() => resetStudy()}
              className="inline-flex min-h-11 items-center rounded-md px-3 text-sm text-muted"
            >
              Reset labels
            </button>
          </div>
          <p className="mt-3 text-xs text-muted">
            Replay {study.replayCount === 0 ? "has not been requested" : `count ${study.replayCount}`}. Completed
            patch and analyser pairs are skipped. The unparsable file stays partial.
          </p>
        </Panel>
      </div>

      <Panel className="mt-4">
        <h2 className="text-lg font-medium">Collection log</h2>
        <p className="mt-1 text-sm text-muted">Readable without calling GitHub again. One private repository was skipped.</p>
        <ul className="mt-3 flex flex-col gap-2">
          {COLLECTION_LOG.map((line) => (
            <li key={line} className="font-mono text-xs text-muted">
              {line}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel className="mt-4">
        <h2 className="text-lg font-medium">Pipeline log</h2>
        <p className="mt-1 text-sm text-muted">JSON lines, one record per patch and analyser. Failures stay on their own row.</p>
        <pre className="mt-3 max-h-64 overflow-auto rounded-md bg-bg p-3 font-mono text-xs leading-5 text-muted">
          {log.slice(0, 12).join("\n")}
          {log.length > 12 ? `\n… ${log.length - 12} more lines in the export` : ""}
        </pre>
      </Panel>
    </Shell>
  );
}
