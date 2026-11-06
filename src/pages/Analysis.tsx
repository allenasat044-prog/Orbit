import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BookmarkPlus, CloudSun, GitCompare, History, RefreshCw, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Panel } from "@/components/ui/spotlight-card";
import { MorphingSquare } from "@/components/ui/morphing-square";
import { BookmarkDialog } from "@/components/bookmark-dialog";
import { Bar, Notice, Spinner, Stat, day, muted, select } from "@/components/analysis/bits";
import { ChipImage } from "@/components/analysis/chip-image";
import { ChangeResult } from "@/components/analysis/change-result";
import { ScenePicker } from "@/components/analysis/scene-picker";
import { WeatherPanel } from "@/components/analysis/weather-panel";
import { getToken } from "@/lib/auth";
import { api, type Bookmark } from "@/lib/library";
import { BusyLabel } from "@/components/ui/busy-label";
import {
  analyseChange, compareModels, describeChip, listAnalyses, loadForecast, prepareChip, searchScenes,
  type ChangeAnalysis, type ChipInfo, type Comparison, type Description, type Forecast, type Pin, type Scene,
} from "@/lib/analysis-api";

type TabId = "describe" | "compare" | "change" | "weather";
const TABS: [TabId, string, typeof Sparkles][] = [
  ["describe", "Image description", Sparkles],
  ["compare", "Compare models", GitCompare],
  ["change", "Historical change", History],
  ["weather", "Weather", CloudSun],
];
const ZOOMS = [
  { px: 128, name: "Close", km: "1.3 km" },
  { px: 256, name: "Medium", km: "2.6 km" },
  { px: 512, name: "Wide", km: "5.1 km" },
];
type Working = { kind: "locate" | "chip" | "describe" | "compare" | "change"; text: string } | null;
type Region = { id: string; name: string; location: { lat: number; lon: number } };

const asMessage = (e: unknown) => (e instanceof Error ? e.message : "Something went wrong.");

export default function Analysis() {
  const token = getToken();
  const [params] = useSearchParams();
  const [tab, setTab] = useState<TabId>("describe");
  const [query, setQuery] = useState("");
  const [pin, setPin] = useState<Pin | null>(null);
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [credit, setCredit] = useState("");
  const [sizePx, setSizePx] = useState(256);
  const [working, setWorking] = useState<Working>(null);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Scene | null>(null);
  const [chips, setChips] = useState<Record<string, ChipInfo>>({});
  const [descriptions, setDescriptions] = useState<Record<string, Description>>({});
  const [comparisons, setComparisons] = useState<Record<string, Comparison>>({});
  const [before, setBefore] = useState<Scene | null>(null);
  const [after, setAfter] = useState<Scene | null>(null);
  const [change, setChange] = useState<ChangeAnalysis | null>(null);
  const [history, setHistory] = useState<ChangeAnalysis[] | null>(null);
  const [forecast, setForecast] = useState<{ key: string; data: Forecast } | null>(null);
  const [weatherBusy, setWeatherBusy] = useState(false);
  const [weatherError, setWeatherError] = useState("");
  const [regions, setRegions] = useState<Region[]>([]);
  const [places, setPlaces] = useState<Bookmark[]>([]);
  const [bookmarkOpen, setBookmarkOpen] = useState(false);
  const healed = useRef(new Set<string>());

  const chipKey = (s: Scene, px = sizePx) => `${s.external_id}:${px}`;
  const chip = selected ? chips[chipKey(selected)] : undefined;
  const weatherKey = pin ? `${pin.lat.toFixed(2)},${pin.lon.toFixed(2)}` : "";
  const busy = working !== null;

  const run = async (kind: NonNullable<Working>["kind"], text: string, fn: () => Promise<void>) => {
    setWorking({ kind, text });
    setError("");
    try {
      await fn();
    } catch (e) {
      setError(asMessage(e));
    } finally {
      setWorking(null);
    }
  };

  /* ---------- location ---------- */
  const locate = (target: { q: string } | { lat: number; lon: number; name?: string }) =>
    run("locate", "Finding scenes over this place…", async () => {
      const r = await searchScenes(target);
      const point = r.point ?? ("lat" in target ? { lat: target.lat, lon: target.lon } : null);
      if (!point) throw new Error("Could not find that place. Try a place name, or coordinates like 12.97, 77.59.");
      const name = "q" in target ? r.placeName ?? target.q : target.name || `${point.lat.toFixed(4)}, ${point.lon.toFixed(4)}`;
      setPin({ lat: point.lat, lon: point.lon, name });
      setScenes(r.items);
      setCredit(r.credit);
      setSelected(null); setBefore(null); setAfter(null); setChange(null); setForecast(null);
    });

  useEffect(() => {
    if (!token) return;
    void api<{ items: Region[] }>("GET", "/api/regions").then((r) => r.ok && setRegions(r.data.items));
    void api<{ items: Bookmark[] }>("GET", "/api/library/bookmarks").then((r) => r.ok && setPlaces(r.data.items.filter((b) => b.location)));
    const lat = Number(params.get("lat"));
    const lon = Number(params.get("lon"));
    if (params.get("lat") && params.get("lon") && Number.isFinite(lat) && Number.isFinite(lon)) void locate({ lat, lon, name: params.get("name") ?? undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  /* ---------- images ---------- */
  const loadChip = (scene: Scene, px = sizePx, refresh = false) =>
    run("chip", refresh ? "Cutting a fresh preview…" : "Preparing the image. The first time for a scene also downloads it, which can take a minute…", async () => {
      const c = await prepareChip(scene, pin!, px, refresh);
      setChips((prev) => ({ ...prev, [chipKey(scene, px)]: c }));
    });

  const selectScene = (s: Scene) => {
    setSelected(s);
    if (!chips[chipKey(s)]) void loadChip(s);
  };

  const changeSize = (px: number) => {
    setSizePx(px);
    setChange(null);
    if (selected && pin && !chips[chipKey(selected, px)]) void loadChip(selected, px);
  };

  const healChip = () => {
    if (!selected || healed.current.has(chipKey(selected))) return;
    healed.current.add(chipKey(selected));
    void loadChip(selected, sizePx, true);
  };

  /* ---------- describe / compare ---------- */
  const describe = () =>
    chip && run("describe", "Describing the image. The first time loads the model, which can take a minute…", async () => {
      const d = await describeChip(chip.id);
      setDescriptions((prev) => ({ ...prev, [chip.id]: d }));
    });

  const compare = () =>
    chip && run("compare", "Comparing models. The first time loads them, which can take a minute…", async () => {
      const c = await compareModels(chip.id);
      setComparisons((prev) => ({ ...prev, [chip.id]: c }));
    });

  /* ---------- historical change ---------- */
  const refreshHistory = useCallback(() => { void listAnalyses().then(setHistory).catch(() => setHistory([])); }, []);
  useEffect(() => { if (tab === "change" && token && history === null) refreshHistory(); }, [tab, token, history, refreshHistory]);

  const analyse = () =>
    before && after && pin && run("change", "Measuring change between the two scenes. The first time downloads both scenes, which can take a few minutes…", async () => {
      const a = await analyseChange(before, after, pin, sizePx);
      setChange(a);
      refreshHistory();
    });

  /* ---------- weather ---------- */
  useEffect(() => {
    if (tab !== "weather" || !pin || forecast?.key === weatherKey) return;
    let live = true;
    setWeatherBusy(true);
    setWeatherError("");
    loadForecast(pin.lat, pin.lon, 7)
      .then((data) => live && setForecast({ key: weatherKey, data }))
      .catch((e) => live && setWeatherError(asMessage(e)))
      .finally(() => live && setWeatherBusy(false));
    return () => { live = false; };
  }, [tab, pin, weatherKey, forecast?.key]);

  const description = chip ? descriptions[chip.id] : undefined;
  const comparison = chip ? comparisons[chip.id] : undefined;
  const picks = useMemo(() => (before && after ? (new Date(before.acquired_at) > new Date(after.acquired_at) ? "Before is newer than After. They will be put in date order." : "") : ""), [before, after]);

  if (!token) {
    return (
      <p className="text-muted-foreground">
        <Link to="/login" className="text-link hover:underline">Log in</Link> or <Link to="/signup" className="text-link hover:underline">sign up</Link> to use the analysis tools.
      </p>
    );
  }

  const facts = chip && selected && (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
      <dt className="text-ink-faint">Taken</dt><dd className="text-ink-soft">{day(selected.acquired_at)}</dd>
      <dt className="text-ink-faint">Satellite</dt><dd className="text-ink-soft">{selected.platform ?? selected.collection}</dd>
      <dt className="text-ink-faint">Cloud cover</dt><dd className="text-ink-soft">{selected.cloud_cover == null ? "unknown" : `${Math.round(selected.cloud_cover)}%`}</dd>
      <dt className="text-ink-faint">Detail</dt><dd className="text-ink-soft">{chip.gsd_m ?? 10} m per pixel</dd>
      <dt className="text-ink-faint">Area shown</dt><dd className="text-ink-soft">about {((chip.width_px * (chip.gsd_m ?? 10)) / 1000).toFixed(1)} × {((chip.height_px * (chip.gsd_m ?? 10)) / 1000).toFixed(1)} km</dd>
    </dl>
  );

  const imagePanel = (
    <div className="space-y-3">
      {selected && !chip && busy && working?.kind === "chip" && <Spinner>{working.text}</Spinner>}
      {chip && <ChipImage chip={chip} onBroken={healChip} />}
      {chip && (
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          {facts}
          <Button variant="outline" size="sm" disabled={busy} onClick={() => selected && void loadChip(selected, sizePx, true)} title="Cut this preview again from the scene"><RefreshCw className="size-4" />Refresh image</Button>
        </div>
      )}
      {chip && working?.kind === "chip" && <Spinner>{working.text}</Spinner>}
    </div>
  );

  const needScene = <Notice>Pick a scene from the list first. Its picture appears here.</Notice>;

  return (
    <div className="space-y-6">
      {/* ---- where ---- */}
      <Panel as="section" className="space-y-4" aria-label="Choose a place">
        <form className="flex flex-wrap items-end gap-3" onSubmit={(e) => { e.preventDefault(); if (query.trim()) void locate({ q: query.trim() }); }}>
          <div className="relative min-w-[16rem] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input aria-label="Place or coordinates" className="rounded-lg border border-input pl-9 focus-visible:ring-2 focus-visible:ring-ring" placeholder="A place name, or coordinates like 12.97, 77.59" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <Button type="submit" disabled={busy || !query.trim()}><BusyLabel busy={working?.kind === "locate"} busyText="Searching…">Find place</BusyLabel></Button>
          {regions.length > 0 && (
            <select aria-label="My monitored locations" className={select} value="" disabled={busy} onChange={(e) => { const r = regions.find((x) => x.id === e.target.value); if (r) void locate({ lat: r.location.lat, lon: r.location.lon, name: r.name }); }}>
              <option value="">My monitored locations</option>
              {regions.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          )}
          {places.length > 0 && (
            <select aria-label="My bookmarks" className={select} value="" disabled={busy} onChange={(e) => { const b = places.find((x) => x.id === e.target.value); if (b?.location) void locate({ lat: b.location.lat, lon: b.location.lon, name: b.title }); }}>
              <option value="">My bookmarks</option>
              {places.map((b) => <option key={b.id} value={b.id}>{b.title}</option>)}
            </select>
          )}
        </form>
        {pin && (
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <p className="text-ink-soft"><strong className="text-ink">{pin.name}</strong> <span className="text-ink-muted">· {pin.lat.toFixed(4)}, {pin.lon.toFixed(4)}</span></p>
            <div className="flex items-center gap-2" role="group" aria-label="Preview area around the pin">
              <span className="text-ink-muted">Area</span>
              {ZOOMS.map((z) => (
                <button key={z.px} type="button" aria-pressed={sizePx === z.px} disabled={busy} onClick={() => changeSize(z.px)}
                  className={`rounded-lg border px-3 py-1 text-xs transition-colors disabled:opacity-60 ${sizePx === z.px ? "border-link bg-link/10 text-ink" : "border-line-strong text-ink-muted hover:bg-wash"}`}>
                  {z.name} · {z.km}
                </button>
              ))}
            </div>
          </div>
        )}
        {working?.kind === "locate" && <Spinner>{working.text}</Spinner>}
      </Panel>

      {error && <Notice kind="error">{error}</Notice>}

      {!pin ? (
        <section aria-label="What you can do here" className="grid gap-4 md:grid-cols-2">
          {[
            ["Image description", "Cut a satellite picture at your place and let AI describe what it shows.", Sparkles],
            ["Compare models", "Ask several AI models about the same picture and see where they agree.", GitCompare],
            ["Historical change", "Pick an earlier and a later scene, then see what changed between them.", History],
            ["Weather", "A 7-day forecast, and the days when the sky is clear enough for a good new picture.", CloudSun],
          ].map(([title, text, Icon]) => {
            const I = Icon as typeof Sparkles;
            return (
              <Panel key={title as string}>
                <I className="mb-2 size-5 text-link" aria-hidden />
                <h3 className="font-medium text-ink">{title as string}</h3>
                <p className={muted}>{text as string}</p>
              </Panel>
            );
          })}
          <p className={`${muted} md:col-span-2`}>Start by searching for a place above, or choose one of your monitored locations or bookmarks.</p>
        </section>
      ) : (
        <>
          <div role="tablist" aria-label="Analysis tools" className="flex flex-wrap gap-1 border-b border-line">
            {TABS.map(([id, label, Icon]) => (
              <button key={id} role="tab" type="button" aria-selected={tab === id} onClick={() => setTab(id)}
                className={`-mb-px flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm transition-colors ${tab === id ? "border-link text-ink" : "border-transparent text-ink-muted hover:text-ink"}`}>
                <Icon className="size-4" />{label}
              </button>
            ))}
          </div>

          {(tab === "describe" || tab === "compare") && (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_1fr]">
              <Panel as="section" aria-label="Scenes"><h3 className="mb-3 font-medium text-ink">1. Pick a scene</h3>
                <ScenePicker mode="single" scenes={scenes} selectedId={selected?.external_id} busyId={working?.kind === "chip" ? selected?.external_id ?? null : null} onSelect={selectScene} />
                {credit && <p className="mt-3 text-xs text-ink-faint">{credit}</p>}
              </Panel>
              <Panel as="section" className="space-y-5" aria-label={tab === "describe" ? "Image description" : "Model comparison"}>
                {!selected ? needScene : (
                  <>
                    {imagePanel}
                    {tab === "describe" && chip && (
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <Button disabled={busy} onClick={() => void describe()}><Sparkles className="size-4" />{description ? "Describe again" : "Describe this image"}</Button>
                          <Button variant="outline" onClick={() => setBookmarkOpen(true)}><BookmarkPlus className="size-4" />Bookmark this place</Button>
                          <Button variant="outline" asChild><Link to="#" onClick={(e) => { e.preventDefault(); setTab("compare"); }}>Compare models →</Link></Button>
                        </div>
                        {working?.kind === "describe" && <Spinner>{working.text}</Spinner>}
                        {description && (
                          <Panel as="article" radius={12} className="space-y-2 rounded-xl p-4">
                            <p className="text-xs uppercase tracking-widest text-link">Main caption</p>
                            <p className="text-lg text-ink">{description.text}</p>
                            <p className="text-xs text-ink-faint">
                              AI-generated by {description.checkpoint}{description.device ? ` on ${description.device}` : ""}{description.latencyMs != null ? ` in ${(description.latencyMs / 1000).toFixed(1)} s` : ""}. Treat it as a rough description, not a measurement.
                            </p>
                          </Panel>
                        )}
                      </div>
                    )}
                    {tab === "compare" && chip && (
                      <div className="space-y-3">
                        <Button disabled={busy} onClick={() => void compare()}><GitCompare className="size-4" />{comparison ? "Compare again" : "Compare models"}</Button>
                        {working?.kind === "compare" && <Spinner>{working.text}</Spinner>}
                        {comparison && (
                          <div className="space-y-4">
                            {comparison.scene_tags && (
                              <div className="space-y-2">
                                <h4 className="font-medium text-ink">Scene tags <span className="text-xs font-normal text-ink-faint">(GeoRSCLIP)</span></h4>
                                <ul className="space-y-1.5">
                                  {comparison.scene_tags.map((t) => (
                                    <li key={t.label} className="grid grid-cols-[minmax(0,12rem)_1fr_auto] items-center gap-3 text-sm">
                                      <span className="truncate text-ink-soft">{t.label}</span><Bar value={t.score} label={`${Math.round(t.score * 100)}%`} /><span className="tabular-nums text-ink-muted">{Math.round(t.score * 100)}%</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {comparison.scene_error && <p className="text-xs text-ink-faint">Scene tags unavailable: {comparison.scene_error.message}</p>}
                            <ul className="grid gap-3 md:grid-cols-2">
                              {comparison.results.map((r) => (
                                <Panel as="li" key={r.model_id} radius={12} className="space-y-1.5 rounded-xl p-4">
                                  <p className="font-medium text-ink">{r.name}</p>
                                  {r.text ? <p className="text-sm text-ink-soft">{r.text}</p> : <p className="text-sm text-red-700 dark:text-red-300">Failed: {r.error?.message ?? "unknown error"}</p>}
                                  <p className="text-xs text-ink-faint">{r.latency_ms != null ? `${(r.latency_ms / 1000).toFixed(1)} s` : ""}{r.alignment != null ? ` · image match ${r.alignment.toFixed(2)}` : ""}</p>
                                </Panel>
                              ))}
                            </ul>
                            {comparison.unavailable.length > 0 && (
                              <p className="text-xs text-ink-faint">Not available on this machine: {comparison.unavailable.map((u, i) => <span key={u.model_id} title={u.reason}>{u.name}{i < comparison.unavailable.length - 1 ? ", " : ""}</span>)}. Hover a name for the reason.</p>
                            )}
                            <p className="text-xs text-ink-faint">AI-generated. Image match is a rough similarity between the image and each caption, not a measure of truth.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </Panel>
            </div>
          )}

          {tab === "change" && (
            <div className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,26rem)_1fr]">
                <Panel as="section" className="space-y-3" aria-label="Pick two scenes">
                  <h3 className="font-medium text-ink">Pick two scenes</h3>
                  <p className={muted}>Choose an earlier scene as <strong>Before</strong> and a later one as <strong>After</strong>. A few months apart shows change best.</p>
                  <ScenePicker mode="pair" scenes={scenes} beforeId={before?.external_id} afterId={after?.external_id}
                    onBefore={(s) => setBefore(after?.external_id === s.external_id ? null : s)} onAfter={(s) => setAfter(before?.external_id === s.external_id ? null : s)} />
                  {picks && <Notice kind="warn">{picks}</Notice>}
                  <Button disabled={busy || !before || !after} onClick={() => void analyse()}><History className="size-4" />Analyse change</Button>
                  {!before || !after ? <p className="text-xs text-ink-faint">{!before && !after ? "Pick a Before and an After scene." : !before ? "Now pick the Before scene." : "Now pick the After scene."}</p> : null}
                  {scenes.length < 2 && <p className="text-xs text-ink-faint">Only {scenes.length} scene covers this place in the last 30 days. Change analysis needs two, so try another place.</p>}
                </Panel>
                <Panel as="section" aria-label="Change result">
                  {working?.kind === "change" && <Spinner>{working.text}</Spinner>}
                  {!change && working?.kind !== "change" && (
                    <div className="space-y-2">
                      <h3 className="font-medium text-ink">How it works</h3>
                      <ol className="list-decimal space-y-1 pl-5 text-sm text-ink-muted">
                        <li>Pick a Before and an After scene on the left.</li>
                        <li>Press Analyse change.</li>
                        <li>Slide between the two pictures, and read how much changed and into what.</li>
                      </ol>
                      <p className="text-xs text-ink-faint">Every analysis you run is saved in “My past analyses” below.</p>
                    </div>
                  )}
                  {change && <ChangeResult a={change} />}
                </Panel>
              </div>
              <Panel as="section" aria-label="My past analyses">
                <h3 className="mb-3 font-medium text-ink">My past analyses</h3>
                {history === null ? <MorphingSquare className="h-4 w-4" message="Loading…" messagePlacement="right" /> : history.length === 0 ? <p className={muted}>None yet. Your analyses will be listed here so you can open them again.</p> : (
                  <ul className="grid gap-2 md:grid-cols-2">
                    {history.map((h) => (
                      <li key={h.id}>
                        <button type="button" onClick={() => { setChange(h); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-pressed={change?.id === h.id}
                          className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-left transition-colors ${change?.id === h.id ? "border-link bg-link/10" : "border-line hover:bg-wash"}`}>
                          <span>
                            <span className="block text-sm text-ink">{day(h.before.acquired_at)} → {day(h.after.acquired_at)}</span>
                            <span className="block text-xs text-ink-faint">{h.location.lat.toFixed(3)}, {h.location.lon.toFixed(3)} · run {day(h.created_at)}</span>
                          </span>
                          <span className="shrink-0 text-sm text-ink-muted">{h.status === "ok" ? `${h.results.changed_area_ha ?? 0} ha` : "no result"}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>
            </div>
          )}

          {tab === "weather" && (
            <section aria-label="Weather">
              {weatherBusy && <Spinner>Loading the forecast…</Spinner>}
              {weatherError && <Notice kind="error">{weatherError}</Notice>}
              {forecast && forecast.key === weatherKey && !weatherBusy && <WeatherPanel forecast={forecast.data} place={pin.name} />}
            </section>
          )}
        </>
      )}

      {bookmarkOpen && pin && (
        <BookmarkDialog
          open
          onOpenChange={(o) => !o && setBookmarkOpen(false)}
          defaults={{ title: pin.name.slice(0, 120), lat: Number(pin.lat.toFixed(6)), lon: Number(pin.lon.toFixed(6)), ...(description ? { caption_id: description.id } : {}) }}
          onSaved={() => setError("")}
        />
      )}
    </div>
  );
}
