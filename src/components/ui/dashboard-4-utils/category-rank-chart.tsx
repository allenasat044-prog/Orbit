import { Pie, PieChart, Cell, LabelList } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { useRuns, Empty } from "./use-runs";

const config = {
  succeeded: { label: "Succeeded", color: "var(--chart-1)" },
  failed: { label: "Failed", color: "var(--chart-3)" },
  running: { label: "Running", color: "var(--chart-5)" },
} satisfies ChartConfig;

export function CategoryRankChart() {
  const runs = useRuns() ?? [];
  const raw = (["succeeded", "failed", "running"] as const)
    .map(s => ({ status: s, value: runs.filter(r => r.status === s).length, fill: `var(--color-${s})` }))
    .filter(d => d.value > 0);
  const total = raw.reduce((a, d) => a + d.value, 0);
  const data = raw.map(d => ({ ...d, pct: `${Math.round((d.value / total) * 100)}%` }));
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Runs by status</CardTitle><CardDescription>All time</CardDescription></CardHeader>
      <CardContent>{data.length === 0 ? <Empty /> :
        <ChartContainer config={config} className="mx-auto aspect-square h-48">
          <PieChart><ChartTooltip content={<ChartTooltipContent nameKey="status" />} />
            <Pie data={data} dataKey="value" nameKey="status" innerRadius={50} startAngle={90} endAngle={-270}>
              {data.map(d => <Cell key={d.status} fill={d.fill} />)}
              <LabelList dataKey="pct" position="inside" className="fill-background text-xs font-medium" stroke="none" />
            </Pie>
          </PieChart>
        </ChartContainer>}
      </CardContent>
    </Card>
  );
}
