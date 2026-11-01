import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DiffBlock, Eyebrow, Findings, Panel, Stat } from "@/components/patchgauge/bits";
import { Shell } from "@/components/patchgauge/shell";
import { useAnalyses } from "@/components/patchgauge/use-analyses";
import { analyzeFiles, filesFromUnifiedDiff } from "@/lib/patchgauge/analyze";
import { fmt } from "@/lib/patchgauge/stats";
import type { PatchMetrics } from "@/lib/patchgauge/types";

export const Route = createFileRoute("/workbench")({
  head: () => ({ meta: [{ title: "Bench · PatchGauge" }] }),
  component: WorkbenchPage,
});

const SAMPLE = `import pickle

def load_cache(blob):
    return pickle.loads(blob)
`;

function WorkbenchPage() {
  const { study } = useAnalyses();
  const [filename, setFilename] = useState("snippet.py");
  const [mode, setMode] = useState<"file" | "diff">("file");
  const [source, setSource] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<PatchMetrics | null>(null);

  function run() {
    const text = source.trim();
    if (!text) {
      setError("Paste a Python file or a unified diff first.");
      setResult(null);
      return;
    }
    if (text.length > 200_000) {
      setError("That paste is over 200 KB. Trim it and try again.");
      setResult(null);
      return;
    }
    if (mode === "diff") {
      const files = filesFromUnifiedDiff(text);
      if (!files || files.length === 0) {
        setError("That text does not look like a unified diff.");
        setResult(null);
        return;
      }
      setError("");
      setResult(analyzeFiles(files, study.threshold));
      return;
    }
    const path = filename.trim() || "snippet.py";
    setError("");
    setResult(analyzeFiles([{ path, before: "", after: text }], study.threshold));
  }

  return (
    <Shell>
      <Eyebrow>Bench</Eyebrow>
      <h1 className="mt-2 text-3xl font-medium tracking-tight">Run the same analysers on a paste</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        A file is treated as all-new lines. A unified diff is scored on its additions. Nothing here is added to the
        study, and test execution stays off.
      </p>

      <div className="mt-4 flex gap-2">
        {(["file", "diff"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`inline-flex min-h-11 items-center rounded-md px-3 font-mono text-xs ${
              mode === item ? "bg-surface-2 text-fg" : "text-muted"
            }`}
          >
            {item === "file" ? "Python file" : "Unified diff"}
          </button>
        ))}
      </div>

      {mode === "file" ? (
        <label className="mt-3 block text-sm" htmlFor="filename">
          Filename
          <input
            id="filename"
            value={filename}
            onChange={(event) => setFilename(event.target.value)}
            className="mt-1 w-full rounded-md border border-line bg-surface px-3 py-2 font-mono text-sm"
          />
        </label>
      ) : null}

      <textarea
        value={source}
        onChange={(event) => setSource(event.target.value)}
        rows={12}
        spellCheck={false}
        aria-label={mode === "file" ? "Python source" : "Unified diff"}
        placeholder={mode === "file" ? "def example():\n    return 1" : "diff --git a/app.py b/app.py"}
        className="mt-3 w-full rounded-md border border-line bg-surface p-3 font-mono text-xs leading-5"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={run}
          className="inline-flex min-h-11 items-center rounded-md bg-brass px-3 text-sm font-medium text-brass-ink"
        >
          Analyse
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("file");
            setFilename("cache.py");
            setSource(SAMPLE);
            setError("");
          }}
          className="inline-flex min-h-11 items-center rounded-md border border-line px-3 text-sm"
        >
          Load a sample
        </button>
      </div>
      {error ? <p className="mt-3 text-sm text-alert">{error}</p> : null}

      {result ? (
        <>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Added" value={String(result.linesAdded)} />
            <Stat label="Findings" value={String(result.securityFindings)} />
            <Stat label="Per kLOC" value={fmt(result.findingsPerThousand, 1)} />
            <Stat label="State" value={result.state} />
          </div>
          <Panel className="mt-4">
            <h2 className="text-lg font-medium">Findings</h2>
            <p className="mt-1 text-sm text-muted">Same rule pack as the study. A clean result is not a security proof.</p>
            <div className="mt-3">
              <Findings findings={result.findings} />
            </div>
          </Panel>
          <div className="mt-4">
            <DiffBlock diff={result.diff} />
          </div>
        </>
      ) : null}
    </Shell>
  );
}
