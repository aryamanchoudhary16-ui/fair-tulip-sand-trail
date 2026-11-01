import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { MeanChart, RateChart } from "@/components/patchgauge/charts";
import { Eyebrow, Panel } from "@/components/patchgauge/bits";
import { Shell } from "@/components/patchgauge/shell";
import { useAnalyses } from "@/components/patchgauge/use-analyses";
import { PATCHES } from "@/lib/patchgauge/fixture";
import { METRIC_DEFS } from "@/lib/patchgauge/report";
import {
  cohensKappa,
  fmt,
  fmtP,
  joinStudy,
  kappaBand,
  mannWhitney,
  summarize,
  type Joined,
} from "@/lib/patchgauge/stats";
import { setThreshold } from "@/lib/patchgauge/store";
import type { Provenance } from "@/lib/patchgauge/types";

export const Route = createFileRoute("/compare")({
  head: () => ({ meta: [{ title: "Compare · PatchGauge" }] }),
  component: ComparePage,
});

const GROUPS: Provenance[] = ["human", "ai-assisted", "mixed"];

function values(rows: Joined[], label: Provenance, pick: (row: Joined) => number | null): number[] {
  return rows
    .filter((row) => row.label === label)
    .map(pick)
    .filter((value): value is number => value !== null);
}

function ComparePage() {
  const { study, analyses } = useAnalyses();
  const rows = useMemo(() => joinStudy(PATCHES, analyses, study), [analyses, study]);
  const compared = rows.filter((row) => row.label !== "unknown");
  const unknown = rows.length - compared.length;
  const small = GROUPS.filter((label) => rows.filter((row) => row.label === label).length < 20);

  const specs: { name: string; note: string; pick: (row: Joined) => number | null; digits: number }[] = [
    { name: "Lines added", note: "Size of the change", pick: (row) => row.metrics.linesAdded, digits: 1 },
    { name: "Max complexity", note: "Changed functions only", pick: (row) => row.metrics.maxComplexity, digits: 1 },
    {
      name: "Findings / kLOC",
      note: "Security smells per thousand added lines",
      pick: (row) => row.metrics.findingsPerThousand,
      digits: 1,
    },
    {
      name: "Test change",
      note: "1 if a test file changed, else 0",
      pick: (row) => (row.metrics.hasTestChange ? 1 : 0),
      digits: 2,
    },
    { name: "High severity", note: "Count of HIGH smells", pick: (row) => row.metrics.highSeverity, digits: 2 },
  ];

  const humanRates = values(rows, "human", (row) => row.metrics.findingsPerThousand);
  const aiRates = values(rows, "ai-assisted", (row) => row.metrics.findingsPerThousand);
  const rateTest = mannWhitney(humanRates, aiRates);
  const ccTest = mannWhitney(
    values(rows, "human", (row) => row.metrics.maxComplexity),
    values(rows, "ai-assisted", (row) => row.metrics.maxComplexity),
  );

  const pairs = rows
    .filter((row) => row.patch.rater2)
    .map((row) => ({ a: row.label, b: row.patch.rater2 as string, id: row.patch.id, title: row.patch.title }));
  const kappa = cohensKappa(pairs.map((pair) => ({ a: pair.a, b: pair.b })));
  const fights = pairs.filter((pair) => pair.a !== pair.b);

  const mean = (label: Provenance, pick: (row: Joined) => number | null) => summarize(values(rows, label, pick)).mean ?? 0;
  const humanMeans = [
    mean("human", (row) => row.metrics.linesAdded),
    mean("human", (row) => row.metrics.maxComplexity),
    mean("human", (row) => row.metrics.findingsPerThousand),
    mean("human", (row) => (row.metrics.hasTestChange ? 100 : 0)),
  ];
  const aiMeans = [
    mean("ai-assisted", (row) => row.metrics.linesAdded),
    mean("ai-assisted", (row) => row.metrics.maxComplexity),
    mean("ai-assisted", (row) => row.metrics.findingsPerThousand),
    mean("ai-assisted", (row) => (row.metrics.hasTestChange ? 100 : 0)),
  ];

  return (
    <Shell>
      <Eyebrow>Comparison</Eyebrow>
      <h1 className="mt-2 text-3xl font-medium tracking-tight">Human against AI-assisted</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        {unknown} unknown {unknown === 1 ? "patch is" : "patches are"} excluded from this comparison and kept in the
        dataset. Mixed stays visible but the rank test uses only the two primary groups.
      </p>

      {small.length > 0 ? (
        <p className="mt-4 rounded-lg border border-brass/40 bg-surface px-3 py-3 text-sm">
          {small.join(", ")} {small.length === 1 ? "has" : "have"} fewer than 20 patches. This is a pilot. Do not treat a
          difference here as a result.
        </p>
      ) : null}

      <Panel className="mt-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-medium">Complexity threshold</h2>
            <p className="text-sm text-muted">Functions above this count as complex. Default is 10.</p>
          </div>
          <label className="font-mono text-xs text-muted">
            Threshold
            <input
              type="number"
              min={1}
              max={50}
              value={study.threshold}
              onChange={(event) => setThreshold(Number(event.target.value))}
              className="ml-2 min-h-11 w-20 rounded-md border border-line bg-bg px-2 text-sm text-fg"
            />
          </label>
        </div>
      </Panel>

      <div className="mt-4 flex flex-col gap-3">
        {specs.map((spec) => (
          <Panel key={spec.name}>
            <h2 className="text-base font-medium">{spec.name}</h2>
            <p className="text-xs text-muted">{spec.note}</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {GROUPS.map((label) => {
                const stat = summarize(values(rows, label, spec.pick));
                return (
                  <div key={label}>
                    <p className="font-mono text-xs text-muted">{label}</p>
                    <p className="font-mono text-xl tabular-nums">{fmt(stat.mean, spec.digits)}</p>
                    <p className="font-mono text-xs tabular-nums text-muted">
                      n {stat.count} · med {fmt(stat.median, spec.digits)}
                    </p>
                  </div>
                );
              })}
            </div>
          </Panel>
        ))}
      </div>

      <Panel className="mt-4">
        <h2 className="text-lg font-medium">Mean rates</h2>
        <p className="mt-1 text-sm text-muted">
          Each row is scaled to the larger group so different units can share the chart. Tooltip and the table show the
          real means. Sage is human, brass is AI-assisted.
        </p>
        <div className="mt-2 flex gap-4 font-mono text-xs">
          <span className="text-human">human</span>
          <span className="text-ai">ai-assisted</span>
        </div>
        <div className="mt-3">
          <MeanChart human={humanMeans} ai={aiMeans} />
        </div>
      </Panel>

      <Panel className="mt-4">
        <h2 className="text-lg font-medium">Findings per thousand added lines</h2>
        <p className="mt-1 text-sm text-muted">
          One bar per primary-group patch. A smell in a two-line patch inflates the rate — read it beside lines added.
        </p>
        <div className="mt-3">
          <RateChart rows={rows} />
        </div>
      </Panel>

      <Panel className="mt-4">
        <h2 className="text-lg font-medium">Exploratory rank test</h2>
        <p className="mt-1 text-sm text-muted">
          Mann–Whitney U, two-sided, with a tie correction and a continuity correction. Not confirmatory. Not causal.
        </p>
        <ul className="mt-3 flex flex-col gap-3 text-sm">
          <TestLine name="Findings / kLOC" result={rateTest} />
          <TestLine name="Max complexity" result={ccTest} />
        </ul>
      </Panel>

      <Panel className="mt-4">
        <h2 className="text-lg font-medium">Inter-rater agreement</h2>
        {kappa ? (
          <>
            <p className="mt-2 font-mono text-2xl tabular-nums">{fmt(kappa.kappa, 2)}</p>
            <p className="text-sm text-muted">
              Cohen's kappa on {kappa.n} overlapping patches · {kappa.agree} agreements · {kappaBand(kappa.kappa)}{" "}
              agreement. Descriptive only.
            </p>
          </>
        ) : (
          <p className="mt-2 text-sm text-muted">No overlap to score.</p>
        )}
        {fights.length > 0 ? (
          <ul className="mt-3 flex flex-col">
            {fights.map((pair) => (
              <li key={pair.id} className="border-b border-line py-2 last:border-b-0">
                <Link to="/patches/$patchId" params={{ patchId: pair.id }} className="text-sm">
                  {pair.title}
                </Link>
                <p className="font-mono text-xs text-muted">
                  {pair.a} vs {pair.b}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </Panel>

      <Panel className="mt-4">
        <h2 className="text-lg font-medium">Limitations</h2>
        <ul className="mt-2 flex list-disc flex-col gap-1 pl-4 text-sm text-muted">
          <li>Labelling error, visible in the disagreements above.</li>
          <li>Public-repo bias. Nothing here is private or enterprise code.</li>
          <li>Static false positives. MD5 used as a cache key still raises PGSEC009.</li>
          <li>Python only. Java and TypeScript globs are recognised for tests, not scored for complexity.</li>
          <li>
            {rows.length} patches in total, under the 80-patch study bar.{" "}
            <Link to="/export" className="text-brass">
              The export says so in writing.
            </Link>
          </li>
        </ul>
      </Panel>

      <Panel className="mt-4">
        <h2 className="text-lg font-medium">Metric names</h2>
        <ul className="mt-3 flex flex-col gap-3">
          {METRIC_DEFS.slice(0, 6).map((metric) => (
            <li key={metric.name}>
              <p className="font-mono text-xs text-brass">{metric.name}</p>
              <p className="text-sm text-muted">{metric.formula}</p>
            </li>
          ))}
        </ul>
        <Link to="/export" className="mt-3 inline-flex min-h-11 items-center text-sm text-brass">
          Full definitions and the replication package
        </Link>
      </Panel>
    </Shell>
  );
}

function TestLine({ name, result }: { name: string; result: ReturnType<typeof mannWhitney> }) {
  if (!result) return <li>{name}: too few numeric values to report U.</li>;
  return (
    <li>
      <span className="text-fg">{name}</span>
      <span className="mt-1 block font-mono text-xs text-muted">
        U {fmt(result.u, 1)} · n {result.n1}/{result.n2} · z {fmt(result.z, 2)} · p {fmtP(result.p)}
      </span>
    </li>
  );
}
