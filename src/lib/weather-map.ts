import type { WeatherDay, WeatherHour, WeatherKind } from "@/components/ui/weather";

type Num = number | null;

/** The part of our /api/weather/forecast response the widget needs. */
export interface ForecastLike {
  now_index: number | null;
  hourly: {
    time: string[];
    temperature_c: Num[];
    precipitation_probability_pct: Num[];
    weather_code: Num[];
    wind_speed_kmh: Num[];
    summary: string[];
  };
  daily: { date: string[]; tmax_c: Num[]; tmin_c: Num[]; weather_code: Num[] };
}

/** Maps a WMO weather code to the widget's kinds of sky. */
export function kindFromCode(code: Num | undefined): WeatherKind {
  if (code == null) return "cloud";
  if (code === 0 || code === 1) return "clear";
  if (code === 2) return "partly";
  if (code === 3) return "cloud";
  if (code === 45 || code === 48) return "mist";
  if (code >= 51 && code <= 57) return code >= 56 ? "sleet" : "drizzle";
  if (code === 66 || code === 67) return "sleet";
  if ((code >= 61 && code <= 65) || (code >= 80 && code <= 82)) return "rain";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
  if (code >= 95) return "storm";
  return "cloud";
}

/** Very hot clear days show heat shimmer; strong wind on dry days shows gusts. */
export function refineKind(kind: WeatherKind, temp: Num, wind: Num): WeatherKind {
  if ((kind === "clear" || kind === "partly") && temp != null && temp >= 38) return "heat";
  if ((kind === "clear" || kind === "partly" || kind === "cloud") && wind != null && wind >= 35) return "windy";
  return kind;
}

/** Hour of day from a local time string like 2026-10-27T07:00. */
export function hourOf(time: string): number {
  return Number(time.slice(11, 13)) + Number(time.slice(14, 16) || 0) / 60;
}

const pad = (n: number) => String(Math.floor(n)).padStart(2, "0");

function firstNumber(values: Num[], from: number): number {
  for (let i = from; i < values.length; i++) if (values[i] != null) return values[i] as number;
  for (let i = from - 1; i >= 0; i--) if (values[i] != null) return values[i] as number;
  return 0;
}

export function weekdayName(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
}

/** A temperature scale of 20 degrees that fits every low and high in the week. */
export function weekScale(days: WeatherDay[]): [number, number] | undefined {
  if (!days.length) return undefined;
  const lo = Math.min(...days.map((d) => d.low));
  const hi = Math.max(...days.map((d) => d.high));
  let start = Math.floor(lo) - 1;
  if (hi > start + 20) start = Math.ceil(hi) - 20;
  return [start, start + 20];
}

export function buildWeatherProps(f: ForecastLike, place: string, now: Date = new Date()) {
  const h = f.hourly;
  const i0 = Math.min(Math.max(f.now_index ?? 0, 0), h.time.length - 1);
  const temp = Math.round(firstNumber(h.temperature_c, i0));
  const wind = h.wind_speed_kmh[i0];
  const kind = refineKind(kindFromCode(h.weather_code[i0]), h.temperature_c[i0], wind);

  const hours: WeatherHour[] = [];
  for (let k = 0; k < 6; k++) {
    const idx = i0 + k * 3;
    if (idx >= h.time.length) break;
    hours.push({
      label: k === 0 ? "Now" : pad(hourOf(h.time[idx])),
      hour: hourOf(h.time[idx]),
      kind: kindFromCode(h.weather_code[idx]),
      temp: Math.round(firstNumber(h.temperature_c, idx)),
    });
  }

  const days: WeatherDay[] = [];
  f.daily.date.slice(0, 7).forEach((date, k) => {
    const low = f.daily.tmin_c[k];
    const high = f.daily.tmax_c[k];
    if (low == null || high == null) return;
    days.push({ name: k === 0 ? "Today" : weekdayName(date), kind: kindFromCode(f.daily.weather_code[k]), low: Math.round(low), high: Math.round(high) });
  });

  const condition = h.summary[i0] ?? "Conditions unknown";
  const name = place.length > 26 ? `${place.slice(0, 25)}…` : place;
  return {
    place: name,
    summary: `${condition} now`,
    hour: hourOf(h.time[i0]),
    sky: kind,
    condition,
    temp,
    rain: h.precipitation_probability_pct[i0] ?? undefined,
    wind: wind != null ? `${Math.round(wind)} km/h` : undefined,
    live: true as const,
    clock: `${pad(hourOf(h.time[i0]))}:00`,
    date: now,
    hours,
    days,
    scale: weekScale(days),
  };
}
