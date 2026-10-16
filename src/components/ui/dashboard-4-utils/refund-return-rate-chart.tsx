import { Line, LineChart, XAxis } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { useRuns, Empty } from "./use-runs";

const config = { failed_tasks: { label: "Failed tasks", color: "var(--chart-1)" } } satisfies ChartConfig;

export function RefundReturnRateChart() {
  const runs = useRuns();
  const data = (runs ?? []).slice(0, 14).map(r => ({ date: r.started_at.slice(5, 10), failed_tasks: r.failed_tasks })).reverse();
  return (
    <Card className="md:col-span-2">
      <CardHeader><CardTitle className="text-base">Failed tasks</CardTitle><CardDescription>Last 14 runs</CardDescription></CardHeader>
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
