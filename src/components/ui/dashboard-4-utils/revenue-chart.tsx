import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { useRuns, inWindow, pctChange, Delta, Empty } from "./use-runs";

const config = { new_acquisitions: { label: "New acquisitions", color: "var(--chart-1)" } } satisfies ChartConfig;

export function RevenueChart() {
  const runs = useRuns();
  const [days, setDays] = useState("60");
  const data = inWindow(runs ?? [], Number(days))
    .map(r => ({ date: r.started_at.slice(5, 10), new_acquisitions: r.new_acquisitions }))
    .reverse();
  const change = data.length > 1 ? pctChange(data[data.length - 1].new_acquisitions, data[0].new_acquisitions) : 0;
  return (
    <Card className="md:col-span-2 lg:col-span-4">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Acquisitions ingested</CardTitle>
        <Select value={days} onValueChange={setDays}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="60">Last 60 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>{data.length === 0 ? <Empty /> :
        <ChartContainer config={config} className="aspect-auto h-64 w-full">
          <AreaChart data={data}><CartesianGrid vertical={false} strokeDasharray="3 3" /><XAxis dataKey="date" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area dataKey="new_acquisitions" type="natural" fill="var(--color-new_acquisitions)" fillOpacity={0.15} stroke="var(--color-new_acquisitions)" />
          </AreaChart>
        </ChartContainer>}
      </CardContent>
      <CardFooter className="justify-between">
        <Delta value={change} suffix={`vs first run in last ${days} days.`} />
        <Link to="/updates" className="flex items-center gap-1.5 text-sm font-medium hover:underline">View report <ArrowRight className="size-4" /></Link>
      </CardFooter>
    </Card>
  );
}
