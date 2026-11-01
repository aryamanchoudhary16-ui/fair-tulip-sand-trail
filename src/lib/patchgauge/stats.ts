import type { Patch, PatchMetrics, Provenance, Study } from "./types";

export type GroupStat = {
  count: number;
  mean: number | null;
  median: number | null;
  min: number | null;
  max: number | null;
};

export function summarize(values: number[]): GroupStat {
  if (values.length === 0) return { count: 0, mean: null, median: null, min: null, max: null };
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  return {
    count: values.length,
    mean: values.reduce((sum, value) => sum + value, 0) / values.length,
    median,
    min: sorted[0],
    max: sorted[sorted.length - 1],
  };
}

function normalCdf(z: number): number {
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const erf =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-x * x);
  return 0.5 * (1 + sign * erf);
}

export type MannWhitney = {
  n1: number;
  n2: number;
  u: number;
  z: number;
  p: number;
};

/** Two-sided Mann–Whitney U with tie correction and continuity correction. Exploratory only. */
export function mannWhitney(xs: number[], ys: number[]): MannWhitney | null {
  const n1 = xs.length;
  const n2 = ys.length;
  if (n1 < 3 || n2 < 3) return null;
  const all = [
    ...xs.map((v) => ({ v, g: 0 as const })),
    ...ys.map((v) => ({ v, g: 1 as const })),
  ].sort((a, b) => a.v - b.v);
  const ranks = new Array<number>(all.length);
  let tieSum = 0;
  let i = 0;
  while (i < all.length) {
    let j = i;
    while (j < all.length && all[j].v === all[i].v) j += 1;
    const t = j - i;
    const average = (i + 1 + j) / 2;
    for (let k = i; k < j; k += 1) ranks[k] = average;
    if (t > 1) tieSum += t * t * t - t;
    i = j;
  }
  let rankSum = 0;
  for (let k = 0; k < all.length; k += 1) {
    if (all[k].g === 0) rankSum += ranks[k];
  }
  const u1 = rankSum - (n1 * (n1 + 1)) / 2;
  const u2 = n1 * n2 - u1;
  const n = n1 + n2;
  const sigma = Math.sqrt((n1 * n2 * ((n + 1) - tieSum / (n * (n - 1)))) / 12);
  if (!Number.isFinite(sigma) || sigma === 0) return { n1, n2, u: Math.min(u1, u2), z: 0, p: 1 };
  const z = (Math.abs(u1 - (n1 * n2) / 2) - 0.5) / sigma;
  const p = Math.min(1, Math.max(0, 2 * (1 - normalCdf(z))));
  return { n1, n2, u: Math.min(u1, u2), z, p };
}

export type Kappa = {
  n: number;
  agree: number;
  po: number;
  kappa: number;
};

export function cohensKappa(pairs: { a: string; b: string }[]): Kappa | null {
  if (pairs.length === 0) return null;
  const labels = Array.from(new Set(pairs.flatMap((pair) => [pair.a, pair.b])));
  const n = pairs.length;
  const matrix = new Map<string, Map<string, number>>();
  for (const label of labels) {
    matrix.set(label, new Map(labels.map((other) => [other, 0])));
  }
  let agree = 0;
  for (const pair of pairs) {
    matrix.get(pair.a)!.set(pair.b, (matrix.get(pair.a)!.get(pair.b) ?? 0) + 1);
    if (pair.a === pair.b) agree += 1;
  }
  const po = agree / n;
  let pe = 0;
  for (const label of labels) {
    let row = 0;
    let col = 0;
    for (const other of labels) {
      row += matrix.get(label)!.get(other) ?? 0;
      col += matrix.get(other)!.get(label) ?? 0;
    }
    pe += (row / n) * (col / n);
  }
  const kappa = pe === 1 ? 1 : (po - pe) / (1 - pe);
  return { n, agree, po, kappa };
}

export function kappaBand(kappa: number): string {
  const abs = Math.abs(kappa);
  if (abs < 0.2) return "slight";
  if (abs < 0.4) return "fair";
  if (abs < 0.6) return "moderate";
  if (abs < 0.8) return "substantial";
  return "almost perfect";
}

export function labelOf(patch: Patch, study: Study): { label: Provenance; notes: string; edited: boolean } {
  const override = study.labels[patch.id];
  if (override) return { label: override.label, notes: override.notes, edited: true };
  return { label: patch.seedLabel, notes: patch.seedNotes, edited: false };
}

export function fmt(value: number | null, digits = 2): string {
  if (value === null || Number.isNaN(value)) return "—";
  return value.toFixed(digits);
}

export function fmtP(value: number): string {
  if (value < 0.001) return "< 0.001";
  return value.toFixed(3);
}

export type Joined = { patch: Patch; metrics: PatchMetrics; label: Provenance; notes: string; edited: boolean };

export function joinStudy(
  patches: Patch[],
  analyses: Map<string, PatchMetrics>,
  study: Study,
): Joined[] {
  return patches.map((patch) => {
    const labelled = labelOf(patch, study);
    return {
      patch,
      metrics: analyses.get(patch.id)!,
      label: labelled.label,
      notes: labelled.notes,
      edited: labelled.edited,
    };
  });
}
