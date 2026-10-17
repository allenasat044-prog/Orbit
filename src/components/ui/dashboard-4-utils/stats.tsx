import { Card, CardContent } from "@/components/ui/card";
import { useRuns, inWindow, pctChange, Delta, type Run } from "./use-runs";

const sum = (rs: Run[], k: "new_acquisitions" | "captions_created") => rs.reduce((a, r) => a + r[k], 0);
const rate = (rs: Run[]) => { const d = rs.filter(r => r.status !== "running"); return d.length ? (d.filter(r => r.status === "succeeded").length / d.length) * 100 : null; };

export function DashboardStats() {
  const runs = useRuns() ?? [];
  const cur = inWindow(runs, 30), prev = inWindow(runs, 60, 30);
  const curRate = rate(cur), prevRate = rate(prev);
  const stats: [string, string, number | null, string?][] = [
    ["Update runs", runs.length.toLocaleString(), pctChange(cur.length, prev.length)],
    ["New acquisitions", sum(runs, "new_acquisitions").toLocaleString(), pctChange(sum(cur, "new_acquisitions"), sum(prev, "new_acquisitions"))],
    ["Captions created", sum(runs, "captions_created").toLocaleString(), pctChange(sum(cur, "captions_created"), sum(prev, "captions_created"))],
    ["Run success rate", curRate === null ? "—" : `${curRate.toFixed(1)}%`, curRate !== null && prevRate !== null ? curRate - prevRate : 0, "pp"],
  ];
  return <>{stats.map(([label, value, delta, unit]) => (
    <Card key={label}><CardContent className="space-y-4 p-6">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-3xl font-semibold">{value}</p>
      <Delta value={delta} unit={unit === "pp" ? " pts" : "%"} />
    </CardContent></Card>
  ))}</>;
}
