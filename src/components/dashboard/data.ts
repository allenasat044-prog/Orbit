import { cloudOutlook, type DayOutlook } from "@/lib/cloud-outlook";
import type { Forecast } from "@/lib/analysis-api";

// Everything the dashboard works out from the update-run history. Plain functions, no React.

export type Run = {
  id: string;
  trigger: string;
  status: "succeeded" | "failed" | "running";
  started_at: string;
  finished_at: string | null;
  regions_checked: number;
  new_acquisitions: number;
  captions_created: number;
  failed_tasks: number;
};

export const DAY = 86_400_000;
const dayKey = (t: number) => new Date(t).toISOString().slice(0, 10);

/** One entry per day for the last `days` days (oldest first, today last), with that day's totals. */
export function dailySeries(runs: Run[], days: number, now = Date.now()) {
  const out = Array.from({ length: days }, (_, i) => ({ date: dayKey(now - (days - 1 - i) * DAY), scenes: 0, captions: 0, runs: 0 }));
  const at = new Map(out.map((d, i) => [d.date, i]));
  for (const r of runs) {
    const i = at.get(r.started_at.slice(0, 10));
    if (i === undefined) continue;
    out[i].scenes += r.new_acquisitions;
    out[i].captions += r.captions_created;
    out[i].runs += 1;
  }
  return out;
}

export const cumulative = (values: number[]) => values.reduce<number[]>((acc, v) => [...acc, (acc[acc.length - 1] ?? 0) + v], []);

/** Runs that started between `from` and `to` days ago (from > to). */
export const inWindow = (runs: Run[], from: number, to = 0, now = Date.now()) =>
  runs.filter((r) => {
    const age = (now - new Date(r.started_at).getTime()) / DAY;
    return age >= to && age < from;
  });

export const sum = (runs: Run[], key: "new_acquisitions" | "captions_created" | "failed_tasks") => runs.reduce((a, r) => a + r[key], 0);

/** Percentage change; null when there was nothing before to compare with. */
export const pctChange = (now: number, prev: number) => (prev === 0 ? (now === 0 ? 0 : null) : ((now - prev) / prev) * 100);

/** Share of finished runs that succeeded, as a percentage; null when none has finished. */
export function successRate(runs: Run[]) {
  const done = runs.filter((r) => r.status !== "running");
  return done.length ? (done.filter((r) => r.status === "succeeded").length / done.length) * 100 : null;
}

export function relativeTime(iso: string | null | undefined, now = Date.now()) {
  if (!iso) return "never";
  const s = Math.max(0, (now - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

/** 1 = just checked, 0 = nothing for a week or more. */
export const freshness = (iso: string | null | undefined, now = Date.now()) =>
  iso ? Math.max(0, Math.min(1, 1 - (now - new Date(iso).getTime()) / (7 * DAY))) : 0;

export const coord = (lat: number, lon: number) => `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? "N" : "S"} ${Math.abs(lon).toFixed(2)}°${lon >= 0 ? "E" : "W"}`;

export function skyDays(forecast: Forecast | null): DayOutlook[] {
  return forecast ? cloudOutlook(forecast).slice(0, 3) : [];
}

/** A few evenly spaced "Oct 3" style labels for the chart's bottom edge. */
export function axisLabels(dates: string[], count = 5) {
  if (dates.length === 0) return [];
  return Array.from({ length: count }, (_, i) => {
    const d = dates[Math.round((i / (count - 1)) * (dates.length - 1))];
    return i === count - 1 ? "Today" : new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  });
}
