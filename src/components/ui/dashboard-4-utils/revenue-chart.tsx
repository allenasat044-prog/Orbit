import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { useRuns, Empty } from "./use-runs";

const config = { new_acquisitions: { label: "New acquisitions", color: "var(--chart-1)" } } satisfies ChartConfig;

export function RevenueChart() {
  const runs = useRuns();
  const data = (runs ?? []).map(r => ({ date: r.started_at.slice(5, 10), new_acquisitions: r.new_acquisitions })).reverse();
  return (
    <Card className="md:col-span-2 lg:col-span-4">
      <CardHeader><CardTitle className="text-base">Acquisitions ingested</CardTitle></CardHeader>
      <CardContent>{data.length === 0 ? <Empty /> :
        <ChartContainer config={config} className="aspect-auto h-64 w-full">
          <AreaChart data={data}><CartesianGrid vertical={false} /><XAxis dataKey="date" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area dataKey="new_acquisitions" type="natural" fill="var(--color-new_acquisitions)" fillOpacity={0.15} stroke="var(--color-new_acquisitions)" />
          </AreaChart>
        </ChartContainer>}
      </CardContent>
    </Card>
  );
}
