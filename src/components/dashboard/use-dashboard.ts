import { useCallback, useEffect, useRef, useState } from "react";
import { getToken } from "@/lib/auth";
import { api, type Profile, type Records } from "@/lib/library";
import { loadForecast, type Forecast } from "@/lib/analysis-api";
import type { Run } from "@/components/dashboard/data";

export type Status = { running: Run | null; last_run: Run | null; last_success_at: string | null; schedule: { mode: string; note: string } };
export type Region = {
  id: string;
  name: string;
  location: { lat: number; lon: number };
  max_cloud: number;
  active: boolean;
  last_checked_at: string | null;
  last_success_at: string | null;
};
export type Personal = { profile: Profile | null; records: Records | null; regions: Region[] };
export type Health = { status: string; components: Record<string, { status: string; latency_ms: number }> };
export type ProviderHealth = { id: string; name: string; status: string; latency_ms: number };
export type System = { health: Health | null; providers: ProviderHealth[] };

export const dashboardTiming = { pollMs: 2000, maxPolls: 150 };
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Everything the dashboard shows. Public figures (update runs, status, system health) load for everyone;
 * personal ones (profile, library counts, monitored locations, their sky) only when someone is logged in.
 * `undefined` means "still loading", `null` means "nothing to show".
 */
export function useDashboard() {
  const [runs, setRuns] = useState<Run[] | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [system, setSystem] = useState<System | null>(null);
  const [personal, setPersonal] = useState<Personal | null | undefined>(undefined);
  const [forecast, setForecast] = useState<Forecast | null | undefined>(undefined);
  const [publicError, setPublicError] = useState("");
  const [checking, setChecking] = useState(false);
  const alive = useRef(true);

  const loadRuns = useCallback(async () => {
    const [h, s] = await Promise.all([
      api<{ items: Run[] }>("GET", "/api/updates/history?limit=200", undefined, false),
      api<Status>("GET", "/api/updates/status", undefined, false),
    ]);
    if (!alive.current) return;
    if (h.ok) { setRuns(h.data.items ?? []); setPublicError(""); } else { setRuns([]); setPublicError(h.error); }
    if (s.ok) setStatus(s.data);
  }, []);

  const loadSystem = useCallback(async () => {
    // a degraded server answers 503 with the details in the body, so use either
    const [h, p] = await Promise.all([api<Health>("GET", "/api/health", undefined, false), api<{ items: ProviderHealth[] }>("GET", "/api/providers", undefined, false)]);
    if (!alive.current) return;
    const health = (h.ok ? h.data : h.body) as Health | undefined;
    setSystem({ health: health?.components ? health : null, providers: p.ok ? p.data.items : [] });
  }, []);

  const loadPersonal = useCallback(async () => {
    if (!getToken()) { setPersonal(null); setForecast(null); return; }
    const [p, rec, reg] = await Promise.all([
      api<{ profile: Profile }>("GET", "/api/library/profile"),
      api<Records>("GET", "/api/library/records"),
      api<{ items: Region[] }>("GET", "/api/regions"),
    ]);
    if (!alive.current) return;
    const regions = reg.ok ? reg.data.items : [];
    setPersonal({ profile: p.ok ? p.data.profile : null, records: rec.ok ? rec.data : null, regions });
    const first = regions.find((r) => r.active) ?? regions[0];
    if (!first) return setForecast(null);
    loadForecast(first.location.lat, first.location.lon, 4)
      .then((f) => alive.current && setForecast(f))
      .catch(() => alive.current && setForecast(null));
  }, []);

  useEffect(() => {
    alive.current = true;
    void loadRuns();
    void loadSystem();
    void loadPersonal();
    return () => { alive.current = false; };
  }, [loadRuns, loadSystem, loadPersonal]);

  /** Starts an update run, waits for it to finish and refreshes the numbers. Returns a message when something went wrong. */
  const startRun = useCallback(async (): Promise<string | null> => {
    setChecking(true);
    try {
      const r = await api("POST", "/api/updates/run");
      if (!r.ok && r.status !== 409) return r.status === 429 ? "Too many checks in a row. Try again in a minute." : r.error;
      for (let i = 0; i < dashboardTiming.maxPolls; i++) {
        await sleep(dashboardTiming.pollMs);
        const s = await api<Status>("GET", "/api/updates/status", undefined, false);
        if (s.ok) {
          if (alive.current) setStatus(s.data);
          if (!s.data.running) break;
        }
      }
      await Promise.all([loadRuns(), loadPersonal()]);
      return null;
    } finally {
      if (alive.current) setChecking(false);
    }
  }, [loadRuns, loadPersonal]);

  return { runs, status, system, personal, forecast, publicError, checking, startRun, reloadSystem: loadSystem };
}
