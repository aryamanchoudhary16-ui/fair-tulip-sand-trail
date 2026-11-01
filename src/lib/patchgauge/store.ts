import { useSyncExternalStore } from "react";
import type { Provenance, Study } from "./types";
import { COMPLEXITY_DEFAULT } from "./types";

const KEY = "patchgauge-model-v1";

export const DEFAULT_STUDY: Study = {
  raterId: "researcher",
  threshold: COMPLEXITY_DEFAULT,
  analyzedAt: "2026-09-06T10:30:00.000Z",
  replayCount: 0,
  labels: {},
};

let study: Study = DEFAULT_STUDY;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(study));
  } catch {
    /* private mode or a full disk — the session still works */
  }
}

function isProvenance(value: unknown): value is Provenance {
  return value === "human" || value === "ai-assisted" || value === "mixed" || value === "unknown";
}

function sanitize(input: unknown): Study {
  if (!input || typeof input !== "object") return DEFAULT_STUDY;
  const raw = input as Partial<Study>;
  const threshold =
    typeof raw.threshold === "number" && raw.threshold >= 1 && raw.threshold <= 50
      ? Math.round(raw.threshold)
      : DEFAULT_STUDY.threshold;
  const raterId =
    typeof raw.raterId === "string" && raw.raterId.trim() ? raw.raterId.trim().slice(0, 40) : DEFAULT_STUDY.raterId;
  const analyzedAt = typeof raw.analyzedAt === "string" ? raw.analyzedAt : DEFAULT_STUDY.analyzedAt;
  const replayCount = typeof raw.replayCount === "number" && raw.replayCount >= 0 ? Math.floor(raw.replayCount) : 0;
  const labels: Study["labels"] = {};
  if (raw.labels && typeof raw.labels === "object") {
    for (const [id, value] of Object.entries(raw.labels)) {
      if (!value || typeof value !== "object") continue;
      const label = (value as { label?: unknown }).label;
      if (!isProvenance(label)) continue;
      const notes = (value as { notes?: unknown }).notes;
      labels[id] = { label, notes: typeof notes === "string" ? notes.slice(0, 500) : "" };
    }
  }
  return { raterId, threshold, analyzedAt, replayCount, labels };
}

let hydrated = false;

export function hydrateStudy() {
  if (hydrated || typeof localStorage === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return;
    study = sanitize(JSON.parse(raw));
    emit();
  } catch {
    /* ignore a broken cache */
  }
}

function update(next: Study) {
  study = next;
  persist();
  emit();
}

export function getStudy(): Study {
  return study;
}

export function subscribeStudy(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useStudy(): Study {
  return useSyncExternalStore(subscribeStudy, getStudy, () => DEFAULT_STUDY);
}

export function setLabel(id: string, label: Provenance, notes: string) {
  update({
    ...study,
    labels: { ...study.labels, [id]: { label, notes: notes.slice(0, 500) } },
  });
}

export function setRater(raterId: string) {
  update({ ...study, raterId: raterId.slice(0, 40) });
}

export function setThreshold(threshold: number) {
  if (!Number.isFinite(threshold)) return;
  update({ ...study, threshold: Math.min(50, Math.max(1, Math.round(threshold))) });
}

export function markReplay() {
  update({
    ...study,
    replayCount: study.replayCount + 1,
    analyzedAt: new Date().toISOString(),
  });
}

export function importLabels(rows: { id: string; label: Provenance; notes: string }[]) {
  const labels = { ...study.labels };
  for (const row of rows) labels[row.id] = { label: row.label, notes: row.notes.slice(0, 500) };
  update({ ...study, labels });
}

export function resetStudy() {
  study = { ...DEFAULT_STUDY, labels: {} };
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  emit();
}
