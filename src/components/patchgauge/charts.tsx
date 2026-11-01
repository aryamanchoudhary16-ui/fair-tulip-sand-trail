import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Joined } from "@/lib/patchgauge/stats";

const tooltipStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-line)",
  borderRadius: 8,
  color: "var(--color-fg)",
  fontSize: 12,
};

export function MeanChart({ human, ai }: { human: number[]; ai: number[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const labels = ["Added lines", "Max complexity", "Findings / kLOC", "Test change %"];
  const data = labels.map((metric, index) => {
    const humanRaw = human[index] ?? 0;
    const aiRaw = ai[index] ?? 0;
    const max = Math.max(humanRaw, aiRaw, 0.001);
    return {
      metric,
      human: (humanRaw / max) * 100,
      ai: (aiRaw / max) * 100,
      humanRaw,
      aiRaw,
    };
  });
  if (!mounted) return <div className="h-72 rounded-lg border border-line bg-surface" />;
  return (
    <div className="h-72 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-line)" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: "var(--color-muted)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="metric"
            width={112}
            tick={{ fill: "var(--color-muted)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ fill: "var(--color-surface-2)" }}
            formatter={(value, name, item) => {
              const payload = item.payload as { humanRaw: number; aiRaw: number };
              const raw = name === "human" ? payload.humanRaw : payload.aiRaw;
              return [raw.toFixed(1), String(name)];
            }}
          />
          <Bar dataKey="human" name="human" fill="var(--color-human)" radius={[0, 2, 2, 0]} barSize={8} />
          <Bar dataKey="ai" name="ai-assisted" fill="var(--color-ai)" radius={[0, 2, 2, 0]} barSize={8} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RateChart({ rows }: { rows: Joined[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const data = rows
    .filter((row) => row.label === "human" || row.label === "ai-assisted")
    .map((row) => ({
      name: `${row.patch.repo.split("/")[0]}#${row.patch.externalId}`,
      value: Number((row.metrics.findingsPerThousand ?? 0).toFixed(1)),
      label: row.label,
    }))
    .sort((a, b) => a.value - b.value);
  if (!mounted) return <div className="h-80 rounded-lg border border-line bg-surface" />;
  return (
    <div className="h-80 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 48 }}>
          <CartesianGrid stroke="var(--color-line)" vertical={false} />
          <XAxis
            dataKey="name"
            interval={0}
            angle={-50}
            textAnchor="end"
            height={60}
            tick={{ fill: "var(--color-muted)", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-surface-2)" }} />
          <Bar dataKey="value" name="Findings / kLOC" radius={[2, 2, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.label === "human" ? "var(--color-human)" : "var(--color-ai)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
