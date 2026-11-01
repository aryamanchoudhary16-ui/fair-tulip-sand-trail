import { useMemo } from "react";
import { analyzePatch } from "@/lib/patchgauge/analyze";
import { PATCHES } from "@/lib/patchgauge/fixture";
import { useStudy } from "@/lib/patchgauge/store";
import type { PatchMetrics } from "@/lib/patchgauge/types";

export function useAnalyses() {
  const study = useStudy();
  const analyses = useMemo(() => {
    const map = new Map<string, PatchMetrics>();
    for (const patch of PATCHES) map.set(patch.id, analyzePatch(patch, study.threshold));
    return map;
  }, [study.threshold]);
  return { study, analyses };
}
