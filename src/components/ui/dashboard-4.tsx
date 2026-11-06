"use client";

import { Link } from "react-router-dom";
import { BarChart3, Globe2, MessageSquare } from "lucide-react";
import { useReducedMotion } from "@/components/ui/bento";
import { useTheme } from "@/lib/theme";
import { MorphingSquare } from "@/components/ui/morphing-square";
import { skyDays } from "@/components/dashboard/data";
import { useDashboard } from "@/components/dashboard/use-dashboard";
import { ActivityTile, HeroTile, LibraryTile, LocationsTile, MonitoringTile, RunsTile, SkyTile, SystemTile, TrendTile, activityFrom } from "@/components/dashboard/tiles";

/**
 * The dashboard, in the bento layout of the 21st.dev "web3-bento" component (by @romanvasnev),
 * showing Orbit EO's own numbers: update runs, monitored places, the sky over them and system health.
 */
// Colours for lines, bars and highlights. Deeper on the light theme so they stay readable on white.
const COLORS = {
  dark: { accent: "oklch(0.76 0.12 268)", accent2: "oklch(0.74 0.12 320)" },
  light: { accent: "oklch(0.5 0.18 268)", accent2: "oklch(0.55 0.18 330)" },
};
// The solid "Monitoring" tile is the same soft blue in both themes, with dark text on it.
const TILE_ACCENT = "oklch(0.78 0.11 268)";

const SHORTCUTS = [
  { to: "/explore", label: "Explore globe", icon: Globe2 },
  { to: "/captions", label: "Generate captions", icon: MessageSquare },
  { to: "/analysis", label: "Compare dates", icon: BarChart3 },
] as const;

export function Dashboard() {
  const reduced = useReducedMotion();
  const theme = useTheme();
  const { accent: ACCENT, accent2: ACCENT2 } = COLORS[theme];
  const d = useDashboard();

  if (d.runs === null) {
    return (
      <div className="grid min-h-[40vh] place-items-center text-sm text-muted-foreground">
        <MorphingSquare message="Loading your dashboard…" />
      </div>
    );
  }

  const profile = d.personal?.profile;
  const name = profile?.first_name || profile?.username || "explorer";
  const firstRegion = d.personal?.regions.find((r) => r.active) ?? d.personal?.regions[0];

  return (
    <div className="w-full">
      <style>{`@keyframes orbit-pop { 0% { transform: scaleY(0) } 100% { transform: scaleY(1) } }`}</style>

      <nav className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1" aria-label="Shortcuts">
        <div className="flex flex-wrap items-center gap-2">
          {SHORTCUTS.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-[12px] font-medium transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Icon className="size-3.5" aria-hidden />
              {label}
            </Link>
          ))}
        </div>
        {profile && <span className="rounded-full bg-foreground px-3 py-1.5 font-mono text-[12px] font-semibold text-background">@{profile.username}</span>}
      </nav>

      {d.publicError && (
        <p role="alert" className="mb-3 rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-800 dark:text-amber-200">
          Could not load the update history: {d.publicError}
        </p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <HeroTile name={name} runs={d.runs} accent={ACCENT} accent2={ACCENT2} reduced={reduced} />
        <LocationsTile personal={d.personal} reduced={reduced} />
        <SkyTile days={skyDays(d.forecast ?? null)} place={firstRegion?.name ?? ""} personal={d.personal} forecast={d.forecast} />
        <TrendTile runs={d.runs} accent={ACCENT} reduced={reduced} />
        <LibraryTile personal={d.personal} accent={ACCENT} accent2={ACCENT2} />
        <MonitoringTile
          accent={TILE_ACCENT}
          runs={d.runs}
          status={d.status}
          locations={d.personal ? d.personal.regions.length : null}
          signedIn={Boolean(d.personal)}
          checking={d.checking}
          onCheck={d.startRun}
        />
        <SystemTile system={d.system} accent={ACCENT} accent2={ACCENT2} onRefresh={d.reloadSystem} />
        <RunsTile runs={d.runs} accent={ACCENT} accent2={ACCENT2} reduced={reduced} />
        <ActivityTile items={activityFrom(d.personal?.records, d.runs)} accent={ACCENT} accent2={ACCENT2} signedIn={Boolean(d.personal)} />
      </div>
    </div>
  );
}

export default Dashboard;
