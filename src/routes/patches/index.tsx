import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PATCHES, patchRef } from "@/lib/patchgauge/fixture";
import { buildLabelsCsv, downloadText, splitCsvLine } from "@/lib/patchgauge/report";
import { joinStudy, labelOf } from "@/lib/patchgauge/stats";
import { importLabels } from "@/lib/patchgauge/store";
import { PROVENANCE, type Provenance } from "@/lib/patchgauge/types";
import { Eyebrow, LabelPill, Panel } from "@/components/patchgauge/bits";
import { Shell } from "@/components/patchgauge/shell";
import { useAnalyses } from "@/components/patchgauge/use-analyses";

export const Route = createFileRoute("/patches/")({
  head: () => ({ meta: [{ title: "Patches · PatchGauge" }] }),
  component: PatchListPage,
});

type SortKey = "newest" | "findings" | "added" | "repo";

function PatchListPage() {
  const { study, analyses } = useAnalyses();
  const [query, setQuery] = useState("");
  const [label, setLabel] = useState<"all" | Provenance>("all");
  const [onlyFindings, setOnlyFindings] = useState(false);
  const [onlyTests, setOnlyTests] = useState(false);
  const [onlyPartial, setOnlyPartial] = useState(false);
  const [sort, setSort] = useState<SortKey>("findings");
  const [csvText, setCsvText] = useState("");
  const [importNote, setImportNote] = useState("");

  const rows = useMemo(() => {
    const joined = joinStudy(PATCHES, analyses, study);
    const q = query.trim().toLowerCase();
    const filtered = joined.filter((row) => {
      if (label !== "all" && row.label !== label) return false;
      if (onlyFindings && row.metrics.securityFindings === 0) return false;
      if (onlyTests && !row.metrics.hasTestChange) return false;
      if (onlyPartial && row.metrics.state !== "partial") return false;
      if (!q) return true;
      const hay = `${row.patch.repo} ${row.patch.title} ${row.patch.externalId} ${row.patch.id}`.toLowerCase();
      return hay.includes(q);
    });
    filtered.sort((a, b) => {
      if (sort === "newest") return b.patch.createdAt.localeCompare(a.patch.createdAt);
      if (sort === "added") return b.metrics.linesAdded - a.metrics.linesAdded;
      if (sort === "repo") return a.patch.repo.localeCompare(b.patch.repo) || a.patch.externalId.localeCompare(b.patch.externalId);
      return b.metrics.securityFindings - a.metrics.securityFindings || b.metrics.highSeverity - a.metrics.highSeverity;
    });
    return filtered;
  }, [analyses, label, onlyFindings, onlyPartial, onlyTests, query, sort, study]);

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
    const accepted: { id: string; label: Provenance; notes: string }[] = [];
    let skipped = 0;
    for (const line of lines.slice(1)) {
      const cells = splitCsvLine(line);
      const id = cells[idAt]?.trim();
      const next = cells[labelAt]?.trim();
      if (!id || !known.has(id) || !PROVENANCE.includes(next as Provenance)) {
        skipped += 1;
        continue;
      }
      accepted.push({ id, label: next as Provenance, notes: notesAt >= 0 ? (cells[notesAt] ?? "") : "" });
    }
    importLabels(accepted);
    setImportNote(`Imported ${accepted.length}. Skipped ${skipped}.`);
  }

  return (
    <Shell>
      <Eyebrow>Patches</Eyebrow>
      <h1 className="mt-2 text-3xl font-medium tracking-tight">Label and inspect</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        {rows.length} of {PATCHES.length} shown. Sort and filter stay on this page. Unknown labels remain in the table.
      </p>

      <div className="mt-4 flex flex-col gap-3">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter by repository or patch id"
          aria-label="Filter by repository or patch id"
          className="min-h-11 w-full rounded-md border border-line bg-surface px-3 text-sm"
        />
        <div className="flex gap-2 overflow-x-auto">
          {(["all", ...PROVENANCE] as const).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={label === item}
              onClick={() => setLabel(item)}
              className={`inline-flex min-h-11 shrink-0 items-center rounded-md px-3 font-mono text-xs ${
                label === item ? "bg-surface-2 text-fg" : "text-muted"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <FilterToggle pressed={onlyFindings} onClick={() => setOnlyFindings((v) => !v)} label="Has findings" />
          <FilterToggle pressed={onlyTests} onClick={() => setOnlyTests((v) => !v)} label="Test change" />
          <FilterToggle pressed={onlyPartial} onClick={() => setOnlyPartial((v) => !v)} label="Partial" />
          <label className="ml-auto flex items-center gap-2 text-xs text-muted">
            Sort
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="min-h-11 rounded-md border border-line bg-surface px-2 text-sm text-fg"
            >
              <option value="findings">Security findings</option>
              <option value="newest">Newest</option>
              <option value="added">Lines added</option>
              <option value="repo">Repository</option>
            </select>
          </label>
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {rows.length === 0 ? (
          <li className="rounded-lg border border-line bg-surface p-4 text-sm text-muted">No patch matches that filter.</li>
        ) : (
          rows.map((row) => (
            <li key={row.patch.id}>
              <Link
                to="/patches/$patchId"
                params={{ patchId: row.patch.id }}
                className="block rounded-lg border border-line bg-surface p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{row.patch.title}</p>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {patchRef(row.patch.repo, row.patch.externalId)} · {row.patch.createdAt.slice(0, 10)}
                    </p>
                  </div>
                  <LabelPill label={row.label} />
                </div>
                <dl className="mt-3 grid grid-cols-3 gap-2 font-mono text-xs tabular-nums text-muted">
                  <div>
                    <dt>Δ</dt>
                    <dd className="text-fg">
                      +{row.metrics.linesAdded} / −{row.metrics.linesDeleted}
                    </dd>
                  </div>
                  <div>
                    <dt>Findings</dt>
                    <dd className={row.metrics.highSeverity > 0 ? "text-alert" : "text-fg"}>{row.metrics.securityFindings}</dd>
                  </div>
                  <div>
                    <dt>Tests</dt>
                    <dd className="text-fg">{row.metrics.hasTestChange ? "yes" : "no"}</dd>
                  </div>
                </dl>
              </Link>
            </li>
          ))
        )}
      </ul>

      <Panel className="mt-6">
        <h2 className="text-lg font-medium">Label CSV</h2>
        <p className="mt-1 text-sm text-muted">Import columns patch_id, label, notes. Unknown stays a real label, not a deletion.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-md border border-line px-3 text-sm"
            onClick={() => downloadText("labels.csv", buildLabelsCsv(joinStudy(PATCHES, analyses, study), study), "text/csv")}
          >
            Export labels
          </button>
        </div>
        <textarea
          value={csvText}
          onChange={(event) => setCsvText(event.target.value)}
          rows={4}
          placeholder="patch_id,label,rater,notes"
          className="mt-3 w-full rounded-md border border-line bg-bg p-3 font-mono text-xs"
        />
        <button
          type="button"
          onClick={onImport}
          className="mt-2 inline-flex min-h-11 items-center rounded-md bg-brass px-3 text-sm font-medium text-brass-ink"
        >
          Import
        </button>
        {importNote ? <p className="mt-2 text-sm text-muted">{importNote}</p> : null}
      </Panel>
    </Shell>
  );
}

function FilterToggle({ pressed, onClick, label }: { pressed: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center rounded-md border px-3 text-xs ${
        pressed ? "border-brass text-brass" : "border-line text-muted"
      }`}
    >
      {label}
    </button>
  );
}
