import { BusyLabel } from "@/components/ui/busy-label";
import { day, muted } from "@/components/analysis/bits";
import type { Scene } from "@/lib/analysis-api";
import { MorphingSquare } from "@/components/ui/morphing-square";

type Common = { scenes: Scene[]; loading?: boolean; busyId?: string | null };
type Single = Common & { mode: "single"; selectedId?: string | null; onSelect: (s: Scene) => void };
type Pair = Common & { mode: "pair"; beforeId?: string | null; afterId?: string | null; onBefore: (s: Scene) => void; onAfter: (s: Scene) => void };

const cloudTone = (c: number | null) => (c == null ? "text-ink-muted" : c < 10 ? "text-emerald-700 dark:text-emerald-300" : c < 30 ? "text-amber-700 dark:text-amber-300" : "text-red-700 dark:text-red-300");

/** The satellite scenes that cover the pin, newest first. Pick one, or pick a Before and an After. */
export function ScenePicker(props: Single | Pair) {
  const { scenes, loading, busyId } = props;
  if (loading) return <MorphingSquare className="h-4 w-4" message="Looking for scenes…" messagePlacement="right" />;
  if (scenes.length === 0) return <p className={muted}>No scene covers this exact point in the last 30 days with cloud cover up to 30%. Try another place.</p>;
  return (
    <ul className="space-y-2" aria-label="Scenes over this place">
      {scenes.map((s) => {
        const info = (
          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-left">
            <span className="font-medium text-ink">{day(s.acquired_at)}</span>
            <span className="text-sm text-ink-muted">{s.platform ?? s.collection}</span>
            <span className={`text-sm ${cloudTone(s.cloud_cover)}`}>{s.cloud_cover == null ? "cloud ?" : `${Math.round(s.cloud_cover)}% cloud`}</span>
            {s.gsd != null && <span className="text-xs text-ink-faint">{s.gsd} m</span>}
          </span>
        );
        if (props.mode === "single") {
          const on = props.selectedId === s.external_id;
          return (
            <li key={s.external_id}>
              <button
                type="button"
                aria-pressed={on}
                disabled={busyId != null}
                onClick={() => props.onSelect(s)}
                className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-2.5 transition-colors disabled:opacity-60 ${on ? "border-link bg-link/10" : "border-line hover:bg-wash"}`}
              >
                {info}
                <span className="shrink-0 text-xs text-link"><BusyLabel busy={busyId === s.external_id} busyText="Preparing…" size="h-3 w-3">{on ? "Selected" : "Select"}</BusyLabel></span>
              </button>
            </li>
          );
        }
        const isBefore = props.beforeId === s.external_id;
        const isAfter = props.afterId === s.external_id;
        const pill = (on: boolean) => `rounded-lg border px-3 py-1 text-xs transition-colors ${on ? "border-link bg-link text-background" : "border-line-strong text-link hover:bg-wash"}`;
        return (
          <li key={s.external_id} className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5 ${isBefore || isAfter ? "border-link/60 bg-link/5" : "border-line"}`}>
            {info}
            <span className="flex shrink-0 gap-2">
              <button type="button" aria-pressed={isBefore} onClick={() => props.onBefore(s)} className={pill(isBefore)}>Before</button>
              <button type="button" aria-pressed={isAfter} onClick={() => props.onAfter(s)} className={pill(isAfter)}>After</button>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
