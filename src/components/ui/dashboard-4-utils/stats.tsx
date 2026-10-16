import { Card, CardContent } from "@/components/ui/card";
import { useRuns } from "./use-runs";

export function DashboardStats() {
  const runs = useRuns() ?? [];
  const done = runs.filter(r => r.status !== "running");
  const ok = done.filter(r => r.status === "succeeded").length;
  const stats = [
    ["Update runs", runs.length.toLocaleString()],
    ["New acquisitions", runs.reduce((a, r) => a + r.new_acquisitions, 0).toLocaleString()],
    ["Captions created", runs.reduce((a, r) => a + r.captions_created, 0).toLocaleString()],
    ["Run success rate", done.length ? `${((ok / done.length) * 100).toFixed(1)}%` : "—"],
  ];
  return <>{stats.map(([label, value]) => (
    <Card key={label}><CardContent className="space-y-3 p-6">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-3xl font-semibold">{value}</p>
    </CardContent></Card>
  ))}</>;
}
