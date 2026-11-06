import { useState } from "react";
import { Bar, Notice, Stat, day, muted } from "@/components/analysis/bits";
import { BeforeAfter } from "@/components/analysis/before-after";
import type { ChangeAnalysis } from "@/lib/analysis-api";

const pct = (n: number) => `${Math.round(n * 1000) / 10}%`;

/** What changed between two scenes: pictures, numbers, land-type changes and honest caveats. */
export function ChangeResult({ a }: { a: ChangeAnalysis }) {
  const [showChanges, setShowChanges] = useState(true);
  const r = a.results;
  const transitions = r.transitions ?? [];
  const top = Math.max(...transitions.map((t) => t.area_ha), 0.0001);
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-ink">Change between {day(a.before.acquired_at)} and {day(a.after.acquired_at)}</h3>
        <p className={muted}>
          {a.before.platform ?? "scene"} to {a.after.platform ?? "scene"} · around {a.location.lat.toFixed(4)}, {a.location.lon.toFixed(4)}
        </p>
      </div>

      <BeforeAfter
        beforeUrl={a.before.display_url}
        afterUrl={a.after.display_url}
        beforeLabel={day(a.before.acquired_at)}
        afterLabel={day(a.after.acquired_at)}
        overlayUrl={a.overlay_url}
        showChanges={showChanges}
      />
      {a.overlay_url && (
        <label className="mx-auto flex w-fit items-center gap-2 text-sm text-ink-muted">
          <input type="checkbox" checked={showChanges} onChange={(e) => setShowChanges(e.target.checked)} className="accent-[#8daaff]" />
          Highlight changed areas
        </label>
      )}

      {a.status === "ok" ? (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat label="Flagged as changed" value={`${r.changed_area_ha ?? 0} ha`} hint={r.changed_fraction != null ? `${pct(r.changed_fraction)} of the usable area` : undefined} />
            <Stat label="Usable area" value={r.valid_fraction != null ? pct(r.valid_fraction) : "n/a"} hint="Pixels that could be compared" />
            <Stat label="Clouds and shadows removed" value={r.cloud_masked_fraction != null ? pct(r.cloud_masked_fraction) : "not masked"} hint={a.scl_used ? "Using the scene classification layer" : "No classification layer available"} />
          </div>
          {transitions.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-ink">What it changed into</h4>
              <ul className="space-y-2">
                {transitions.map((t) => (
                  <li key={`${t.from}-${t.to}`} className="grid grid-cols-[minmax(0,14rem)_1fr_auto] items-center gap-3 text-sm">
                    <span className="truncate text-ink-soft">{t.from} → {t.to}</span>
                    <Bar value={t.area_ha} max={top} label={`${t.area_ha} hectares`} />
                    <span className="tabular-nums text-ink-muted">{t.area_ha} ha</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <Notice kind="warn">The analysis could not measure change for these two scenes. See the notes below.</Notice>
      )}

      {a.notes.length > 0 && (
        <ul className="list-disc space-y-1 pl-5 text-sm text-ink-muted">
          {a.notes.map((n) => <li key={n}>{n}</li>)}
        </ul>
      )}
      <p className="text-xs text-ink-faint">{a.method} {a.caveat}</p>
    </div>
  );
}
