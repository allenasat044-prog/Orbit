import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export type Run = { id: string; started_at: string; status: "succeeded" | "failed" | "running"; new_acquisitions: number; captions_created: number; failed_tasks: number };

export function useRuns() {
  const [runs, setRuns] = useState<Run[] | null>(null);
  useEffect(() => {
    fetch("/api/updates/history").then(r => (r.ok ? r.json() : Promise.reject())).then(d => setRuns(d.items ?? [])).catch(() => setRuns([]));
  }, []);
  return runs;
}

const DAY = 86_400_000;
/** Runs started between `from` and `to` days ago (from > to). */
export const inWindow = (runs: Run[], from: number, to = 0) =>
  runs.filter(r => { const age = (Date.now() - new Date(r.started_at).getTime()) / DAY; return age >= to && age < from; });

export const pctChange = (now: number, prev: number) => (prev === 0 ? (now === 0 ? 0 : null) : ((now - prev) / prev) * 100);

export function Delta({ value, suffix = "vs prior 30 days", unit = "%", invert = false }: { value: number | null; suffix?: string; unit?: string; invert?: boolean }) {
  if (value === null) return <p className="text-sm text-muted-foreground">New activity {suffix}</p>;
  const up = value >= 0;
  const good = invert ? !up : up;
  const Icon = up ? ChevronUp : ChevronDown;
  return (
    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <span className={cn("flex items-center font-medium", good ? "text-emerald-400" : "text-red-400")}>
        <Icon className="size-4" />{Math.abs(value).toFixed(1)}{unit}
      </span>
      {suffix}
    </p>
  );
}

export const Empty = () => <p className="p-6 text-sm text-muted-foreground">No update runs yet.</p>;
