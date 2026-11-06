import type { Forecast } from "@/lib/analysis-api";

export type DayOutlook = { date: string; avg: number | null; label: string; tone: "good" | "fair" | "poor" | "unknown" };

/**
 * Satellite pictures are only useful when the sky is clear. Sentinel-2 passes over in the morning
 * (around 10:30 local time), so this averages the forecast cloud cover for 09:00-12:00 each day.
 */
export function cloudOutlook(f: Pick<Forecast, "hourly">): DayOutlook[] {
  const byDay = new Map<string, number[]>();
  f.hourly.time.forEach((t, i) => {
    const hour = Number(t.slice(11, 13));
    const v = f.hourly.cloud_cover_pct[i];
    if (v == null || Number.isNaN(hour) || hour < 9 || hour > 12) return;
    const day = t.slice(0, 10);
    byDay.set(day, [...(byDay.get(day) ?? []), v]);
  });
  const days = [...new Set(f.hourly.time.map((t) => t.slice(0, 10)))];
  return days.map((date) => {
    const v = byDay.get(date);
    if (!v?.length) return { date, avg: null, label: "No forecast", tone: "unknown" as const };
    const avg = Math.round(v.reduce((a, b) => a + b, 0) / v.length);
    return avg < 20
      ? { date, avg, label: "Likely clear", tone: "good" as const }
      : avg < 50
        ? { date, avg, label: "Partly cloudy", tone: "fair" as const }
        : { date, avg, label: "Mostly cloudy", tone: "poor" as const };
  });
}
