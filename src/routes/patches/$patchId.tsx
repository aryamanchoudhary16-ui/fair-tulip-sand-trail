import { Link, createFileRoute } from "@tanstack/react-router";
import { PATCHES, patchRef } from "@/lib/patchgauge/fixture";
import { labelOf } from "@/lib/patchgauge/stats";
import { setLabel } from "@/lib/patchgauge/store";
import { PROVENANCE, type Provenance } from "@/lib/patchgauge/types";
import { DiffBlock, Eyebrow, Findings, LabelPill, Panel, Stat } from "@/components/patchgauge/bits";
import { Shell } from "@/components/patchgauge/shell";
import { useAnalyses } from "@/components/patchgauge/use-analyses";
import { fmt } from "@/lib/patchgauge/stats";

export const Route = createFileRoute("/patches/$patchId")({
  head: () => ({ meta: [{ title: "Patch · PatchGauge" }] }),
  component: PatchDetailPage,
});

function PatchDetailPage() {
  const { patchId } = Route.useParams();
  const { study, analyses } = useAnalyses();
  const patch = PATCHES.find((item) => item.id === patchId);

  if (!patch) {
    return (
      <Shell>
        <h1 className="text-2xl font-medium">Patch not in this fixture</h1>
        <Link to="/patches" className="mt-4 inline-flex min-h-11 items-center text-sm text-brass">
          Back to the table
        </Link>
      </Shell>
    );
  }

  const metrics = analyses.get(patch.id)!;
  const current = labelOf(patch, study);
  const highs = metrics.findings.filter((finding) => finding.severity === "HIGH");

  function choose(label: Provenance) {
    setLabel(patch!.id, label, current.notes);
  }

  return (
    <Shell>
      <Link to="/patches" className="font-mono text-xs text-muted">
        ← Patches
      </Link>
      <Eyebrow className="mt-3">Patch</Eyebrow>
      <h1 className="mt-2 text-2xl font-medium tracking-tight">{patch.title}</h1>
      <p className="mt-2 font-mono text-xs text-muted">
        {patchRef(patch.repo, patch.externalId)} · {patch.author} · {patch.createdAt.slice(0, 10)} · {patch.source}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Added" value={String(metrics.linesAdded)} />
        <Stat label="Deleted" value={String(metrics.linesDeleted)} />
        <Stat label="Files" value={String(metrics.filesTouched)} />
        <Stat label="Hunks" value={String(metrics.hunks)} />
        <Stat label="Max CC" value={fmt(metrics.maxComplexity, 0)} hint={`threshold ${study.threshold}`} />
        <Stat label="Findings" value={String(metrics.securityFindings)} hint={`${metrics.highSeverity} high`} />
        <Stat label="Per kLOC" value={fmt(metrics.findingsPerThousand, 1)} />
        <Stat label="Tests" value={metrics.hasTestChange ? "yes" : "no"} hint={metrics.state} />
      </div>

      <Panel className="mt-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-medium">Provenance</h2>
          <LabelPill label={current.label} />
        </div>
        <p className="mt-1 text-sm text-muted">
          Rater {study.raterId}
          {current.edited ? " · edited in this browser" : " · seeded confirmation"}. A hint never becomes the label on its own.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {PROVENANCE.map((label) => (
            <button
              key={label}
              type="button"
              aria-pressed={current.label === label}
              onClick={() => choose(label)}
              className={`min-h-11 rounded-md border px-2 font-mono text-xs ${
                current.label === label ? "border-brass text-brass" : "border-line text-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="mt-3 block text-sm" htmlFor="notes">
          Rationale
          <textarea
            id="notes"
            value={current.notes}
            maxLength={500}
            rows={3}
            onChange={(event) => setLabel(patch.id, current.label, event.target.value)}
            className="mt-1 w-full rounded-md border border-line bg-bg p-3 text-sm"
          />
        </label>
        {patch.rater2 ? (
          <p className="mt-3 text-sm text-muted">
            Second rater (classmate): <span className="font-mono text-fg">{patch.rater2}</span>
            {patch.rater2 === current.label ? " · agree" : " · disagree"}
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted">No second rating on this patch.</p>
        )}
        {patch.hint ? (
          <div className="mt-3 rounded-md border border-line bg-bg p-3">
            <p className="text-sm">Hint only: {patch.hint}</p>
            <button
              type="button"
              onClick={() => setLabel(patch.id, "ai-assisted", current.notes || patch.hint || "")}
              className="mt-2 inline-flex min-h-11 items-center text-sm text-brass"
            >
              Confirm as ai-assisted
            </button>
          </div>
        ) : null}
      </Panel>

      {highs.length > 0 ? (
        <Panel className="mt-4">
          <h2 className="text-lg font-medium text-alert">High severity</h2>
          <div className="mt-3">
            <Findings findings={highs} />
          </div>
        </Panel>
      ) : null}

      <Panel className="mt-4">
        <h2 className="text-lg font-medium">Findings</h2>
        <p className="mt-1 text-sm text-muted">A clean scan is not evidence the patch is secure.</p>
        <div className="mt-3">
          <Findings findings={metrics.findings} />
        </div>
        {metrics.ignoredFiles.length > 0 ? (
          <p className="mt-3 text-xs text-muted">Ignored paths: {metrics.ignoredFiles.join(", ")}</p>
        ) : null}
        {metrics.complexFunctions.length > 0 ? (
          <ul className="mt-3 font-mono text-xs text-muted">
            {metrics.complexFunctions.map((fn) => (
              <li key={`${fn.file}-${fn.name}`}>
                {fn.name} · CC {fn.complexity} · {fn.file}
              </li>
            ))}
          </ul>
        ) : null}
      </Panel>

      <div className="mt-4">
        <h2 className="mb-2 text-lg font-medium">Diff</h2>
        <DiffBlock diff={metrics.diff} />
      </div>
    </Shell>
  );
}
