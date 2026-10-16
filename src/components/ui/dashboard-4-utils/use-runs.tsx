import { useEffect, useState } from "react";
export type Run = { id: string; started_at: string; status: "succeeded" | "failed" | "running"; new_acquisitions: number; captions_created: number; failed_tasks: number };
export function useRuns() {
  const [runs, setRuns] = useState<Run[] | null>(null);
  useEffect(() => {
    fetch("/api/updates/history").then(r => (r.ok ? r.json() : Promise.reject())).then(d => setRuns(d.items ?? [])).catch(() => setRuns([]));
  }, []);
  return runs;
}
export const Empty = () => <p className="p-6 text-sm text-muted-foreground">No update runs yet.</p>;
