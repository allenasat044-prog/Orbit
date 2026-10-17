import { Line, LineChart, XAxis } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { useRuns, inWindow, Empty } from "./use-runs";

const config = { failed_tasks: { label: "Failed tasks", color: "var(--chart-1)" } } satisfies ChartConfig;

export function RefundReturnRateChart() {
  const runs = useRuns() ?? [];
  const data = runs.slice(0, 14).map(r => ({ date: r.started_at.slice(5, 10), failed_tasks: r.failed_tasks })).reverse();
  const week = inWindow(runs, 7);
  const failed = week.reduce((a, r) => a + r.failed_tasks, 0);
  return (
    <Card className="md:col-span-2">
      <CardHeader className="flex-row items-start justify-between space-y-0">
        <div className="space-y-1.5"><CardTitle className="text-base">Failed tasks</CardTitle><CardDescription>Last 14 runs</CardDescription></div>
        <div className="text-right"><p className="text-xl font-semibold">{failed.toLocaleString()}</p><p className="text-sm text-muted-foreground">in last 7 days</p></div>
      </CardHeader>
      <CardContent>{data.length === 0 ? <Empty /> :
        <ChartContainer config={config} className="aspect-auto h-40 w-full">
          <LineChart data={data}><XAxis dataKey="date" hide /><ChartTooltip content={<ChartTooltipContent />} />
            <Line dataKey="failed_tasks" type="natural" stroke="var(--color-failed_tasks)" dot={false} strokeWidth={2} />
          </LineChart>
        </ChartContainer>}
      </CardContent>
    </Card>
  );
}
