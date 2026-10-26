import { useEffect, useRef, useState } from "react";
import {
  Viewer, ImageryLayer, UrlTemplateImageryProvider, GeoJsonDataSource, Color, Rectangle, Entity,
  Cartesian2, Cartesian3, Cartographic, LabelStyle, ScreenSpaceEventHandler, ScreenSpaceEventType, Math as CesiumMath, SingleTileImageryProvider,
} from "cesium";
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, ReferenceLine } from "recharts";
import SearchGroup from "@/components/ui/v-group-18";
import { getToken } from "@/lib/auth";

type Geometry = { type: string; coordinates: unknown };
type Item = {
  external_id: string;
  collection: string;
  acquired_at: string;
  platform: string | null;
  cloud_cover: number | null;
  gsd: number | null;
  footprint: Geometry;
  ingested: boolean;
  id: string | null;
};
type Point = { lat: number; lon: number };
type Chip = { id: string; image_url: string; display_url: string; width_px: number; height_px: number; pin_px: { x: number; y: number }; gsd_m: number | null; label: string };
type Caption = { text: string; checkpoint: string; device: string | null; latencyMs: number | null };
type CompareResult = { model_id: string; name: string; text?: string; latency_ms?: number | null; alignment?: number | null; error?: { message: string } };
type Comparison = {
  results: CompareResult[];
  scene_tags: { label: string; score: number }[] | null;
  scene_error: { message: string } | null;
  unavailable: { model_id: string; name: string; reason: string }[];
};
type SceneRef = { acquired_at: string; platform: string | null; cloud_cover: number | null; display_url: string };
type Analysis = {
  id: string;
  status: "ok" | "insufficient_data";
  scl_used: boolean;
  bounds: { west: number; south: number; east: number; north: number } | null;
  before: SceneRef;
  after: SceneRef;
  overlay_url: string | null;
  notes: string[];
  results: {
    changed_area_ha?: number;
    changed_fraction?: number;
    cloud_masked_fraction?: number | null;
    valid_fraction?: number;
    transitions?: { from: string; to: string; area_ha: number }[];
  };
};
type Num = number | null;
type Forecast = {
  location: { timezone: string | null; elevation_m: number | null };
  now_index: number | null;
  hourly: {
    time: string[]; temperature_c: Num[]; humidity_pct: Num[]; precipitation_probability_pct: Num[]; precipitation_mm: Num[];
    cloud_cover_pct: Num[]; wind_speed_kmh: Num[]; wind_gust_kmh: Num[]; summary: string[];
  };
  daily: { date: string[]; tmax_c: Num[]; tmin_c: Num[]; precipitation_mm: Num[]; summary: string[] };
  source: { attribution: string; url: string };
  cached: boolean;
  fetched_at: string;
};
type Zoom = { px: number; name: string; km: string };

const ZOOMS: Zoom[] = [
  { px: 128, name: "Close", km: "1.3 km" },
  { px: 256, name: "Medium", km: "2.6 km" },
  { px: 512, name: "Wide", km: "5.1 km" },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const HINT = "Search a place or click the globe to drop a pin.";

function bboxOf(g: Geometry): [number, number, number, number] | null {
  let w = 180, s = 90, e = -180, n = -90, found = false;
  const walk = (c: unknown) => {
    if (!Array.isArray(c)) return;
    if (typeof c[0] === "number" && typeof c[1] === "number") {
      w = Math.min(w, c[0]); e = Math.max(e, c[0]); s = Math.min(s, c[1]); n = Math.max(n, c[1]); found = true;
    } else c.forEach(walk);
  };
  walk(g.coordinates);
  return found ? [w, s, e, n] : null;
}

export default function Explore() {
  const el = useRef<HTMLDivElement>(null);
  const viewer = useRef<Viewer | undefined>(undefined);
  const source = useRef<GeoJsonDataSource | undefined>(undefined);
  const pin = useRef<Entity | undefined>(undefined);
  const overlay = useRef<ImageryLayer | undefined>(undefined);
  const changeLayers = useRef<{ base?: ImageryLayer; changes?: ImageryLayer }>({});
  const onPick = useRef<(lat: number, lon: number) => void>(() => {});
  const [msg, setMsg] = useState(HINT);
  const [items, setItems] = useState<Item[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [credit, setCredit] = useState("");
  const [point, setPoint] = useState<Point | null>(null);
  const [chip, setChip] = useState<Chip | null>(null);
  const [chipBusy, setChipBusy] = useState<string | null>(null);
  const [zoomPx, setZoomPx] = useState(256);
  const [smooth, setSmooth] = useState(true);
  const [caption, setCaption] = useState<Caption | null>(null);
  const [captionBusy, setCaptionBusy] = useState(false);
  const [comparison, setComparison] = useState<Comparison | null>(null);
  const [compareBusy, setCompareBusy] = useState(false);
  const [beforeItem, setBeforeItem] = useState<Item | null>(null);
  const [afterItem, setAfterItem] = useState<Item | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [analysisBusy, setAnalysisBusy] = useState(false);
  const [showChanges, setShowChanges] = useState(true);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [weatherBusy, setWeatherBusy] = useState(false);
  const [hourIdx, setHourIdx] = useState(0);
  const [pinName, setPinName] = useState("");
  const [autoCaption, setAutoCaption] = useState(false);
  const [monitorBusy, setMonitorBusy] = useState(false);
  const [runBusy, setRunBusy] = useState(false);

  useEffect(() => {
    const v = new Viewer(el.current!, {
      baseLayer: new ImageryLayer(new UrlTemplateImageryProvider({ url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png", maximumLevel: 19, credit: "© OpenStreetMap contributors" })),
      baseLayerPicker: false, geocoder: false, timeline: false, animation: false, infoBox: false, selectionIndicator: false,
    });
    viewer.current = v;
    const handler = new ScreenSpaceEventHandler(v.scene.canvas);
    handler.setInputAction((click: { position: Cartesian2 }) => {
      const cart = v.camera.pickEllipsoid(click.position, v.scene.globe.ellipsoid);
      if (!cart) return;
      const c = Cartographic.fromCartesian(cart);
      onPick.current(CesiumMath.toDegrees(c.latitude), CesiumMath.toDegrees(c.longitude));
    }, ScreenSpaceEventType.LEFT_CLICK);
    return () => { handler.destroy(); v.destroy(); };
  }, []);

  const placePin = (pt: Point, label: string, fly: boolean) => {
    const v = viewer.current;
    if (!v) return;
    if (pin.current) v.entities.remove(pin.current);
    pin.current = v.entities.add({
      position: Cartesian3.fromDegrees(pt.lon, pt.lat),
      point: { pixelSize: 12, color: Color.RED, outlineColor: Color.WHITE, outlineWidth: 2, disableDepthTestDistance: Number.POSITIVE_INFINITY },
      label: {
        text: label.length > 40 ? `${label.slice(0, 40)}…` : label, font: "13px sans-serif", fillColor: Color.WHITE, outlineColor: Color.BLACK,
        outlineWidth: 3, style: LabelStyle.FILL_AND_OUTLINE, pixelOffset: new Cartesian2(0, -22), disableDepthTestDistance: Number.POSITIVE_INFINITY,
      },
    });
    if (fly) v.camera.flyTo({ destination: Cartesian3.fromDegrees(pt.lon, pt.lat, 150000) });
  };

  const clearOverlay = () => {
    const v = viewer.current;
    if (v && overlay.current) { v.imageryLayers.remove(overlay.current, true); overlay.current = undefined; }
    if (source.current) source.current.show = true;
  };

  const showOverlay = async (url: string, w: number, s: number, e: number, n: number) => {
    const v = viewer.current;
    if (!v) return;
    clearOverlay();
    const provider = await SingleTileImageryProvider.fromUrl(url, { rectangle: Rectangle.fromDegrees(w, s, e, n) });
    overlay.current = v.imageryLayers.addImageryProvider(provider);
    if (source.current) source.current.show = false;
    const padX = (e - w) * 0.25, padY = (n - s) * 0.25;
    v.camera.flyTo({ destination: Rectangle.fromDegrees(w - padX, s - padY, e + padX, n + padY) });
  };

  const clearChange = () => {
    const v = viewer.current;
    const { base, changes } = changeLayers.current;
    if (v && base) v.imageryLayers.remove(base, true);
    if (v && changes) v.imageryLayers.remove(changes, true);
    changeLayers.current = {};
    if (source.current) source.current.show = true;
  };

  const showChangeOnGlobe = async (a: Analysis) => {
    const v = viewer.current;
    if (!v || !a.bounds) return;
    clearChange();
    clearOverlay();
    const rect = Rectangle.fromDegrees(a.bounds.west, a.bounds.south, a.bounds.east, a.bounds.north);
    const base = v.imageryLayers.addImageryProvider(await SingleTileImageryProvider.fromUrl(a.after.display_url, { rectangle: rect }));
    changeLayers.current.base = base;
    if (a.overlay_url) {
      const changes = v.imageryLayers.addImageryProvider(await SingleTileImageryProvider.fromUrl(a.overlay_url, { rectangle: rect }));
      changes.show = showChanges;
      changeLayers.current.changes = changes;
    }
    if (source.current) source.current.show = false;
    const padX = (a.bounds.east - a.bounds.west) * 0.25, padY = (a.bounds.north - a.bounds.south) * 0.25;
    v.camera.flyTo({ destination: Rectangle.fromDegrees(a.bounds.west - padX, a.bounds.south - padY, a.bounds.east + padX, a.bounds.north + padY) });
  };

  const toggleChanges = () => {
    const next = !showChanges;
    setShowChanges(next);
    if (changeLayers.current.changes) changeLayers.current.changes.show = next;
  };

  const closeAnalysis = () => { clearChange(); setAnalysis(null); };

  const closeChip = () => { clearOverlay(); setChip(null); setCaption(null); setComparison(null); };

  const draw = async (list: Item[]) => {
    const v = viewer.current;
    if (!v) return undefined;
    if (source.current) { v.dataSources.remove(source.current, true); source.current = undefined; }
    if (!list.length) return undefined;
    const fc = { type: "FeatureCollection", features: list.map((i) => ({ type: "Feature", id: i.external_id, properties: { name: i.external_id }, geometry: i.footprint })) };
    const ds = await GeoJsonDataSource.load(fc, { stroke: Color.CYAN, fill: Color.CYAN.withAlpha(0.12), strokeWidth: 2 });
    await v.dataSources.add(ds);
    source.current = ds;
    return ds;
  };

  const run = async (url: string, append: boolean, pinLabel?: string) => {
    setBusy(true);
    setMsg("Searching…");
    try {
      const res = await fetch(url);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setMsg(data?.error?.message ?? `Search failed (${res.status})`); return; }
      const all: Item[] = append ? [...items, ...data.items] : data.items;
      setItems(all);
      setNext(data.next_cursor ?? null);
      setCredit([data.attribution?.imagery, data.attribution?.geocoding].filter(Boolean).join(" · "));
      await draw(all);
      const pt: Point | null = data.point ?? (append ? point : null);
      if (!append) { setPoint(pt); clearOverlay(); clearChange(); setChip(null); setCaption(null); setComparison(null); setAnalysis(null); setBeforeItem(null); setAfterItem(null); setForecast(null); }
      const label = pinLabel ?? data.place?.name ?? (pt ? `${pt.lat.toFixed(4)}, ${pt.lon.toFixed(4)}` : "");
      if (!append && pt) { setPinName(label); placePin(pt, label, true); }
      const where = pt ? ` at ${pt.lat.toFixed(4)}, ${pt.lon.toFixed(4)}` : "";
      if (!all.length) setMsg(`No scene covers this exact point in the last 30 days with cloud cover up to 30%.`);
      else setMsg(`${all.length} scene${all.length === 1 ? "" : "s"} cover this point${where}${data.next_cursor ? " (more available)" : ""}`);
    } catch {
      setMsg("Can't reach the server. Is the backend running on port 3000?");
    } finally {
      setBusy(false);
    }
  };

  const onSearch = (q: string, category: string) => {
    const params = new URLSearchParams({ q, type: category, cloud_max: "30" });
    void run(`/api/imagery/search?${params}`, false);
  };

  onPick.current = (lat: number, lon: number) => {
    if (busy) return;
    const params = new URLSearchParams({ lat: lat.toFixed(6), lon: lon.toFixed(6), cloud_max: "30" });
    void run(`/api/imagery/search?${params}`, false, `${lat.toFixed(4)}, ${lon.toFixed(4)}`);
  };

  const loadMore = () => { if (next) void run(`/api/imagery/search?cursor=${encodeURIComponent(next)}`, true); };

  const focus = (item: Item) => {
    const b = bboxOf(item.footprint);
    if (b) viewer.current?.camera.flyTo({ destination: Rectangle.fromDegrees(b[0], b[1], b[2], b[3]) });
  };

  const previewChip = async (item: Item) => {
    const token = getToken();
    if (!token) { setMsg("Log in to preview imagery."); return; }
    if (!point) { setMsg("Drop a pin first: search a place or click the globe."); return; }
    const auth = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
    setChipBusy(item.external_id);
    try {
      let acqId = item.id;
      if (!acqId) {
        setMsg("Registering scene…");
        const r = await fetch("/api/imagery/ingest", { method: "POST", headers: auth, body: JSON.stringify({ collection: item.collection, external_id: item.external_id }) });
        const d = await r.json().catch(() => ({}));
        if (!r.ok) { setMsg(d?.error?.message ?? `Could not register (${r.status})`); return; }
        acqId = d.acquisition.id as string;
        setItems((prev) => prev.map((i) => (i.external_id === item.external_id ? { ...i, ingested: true, id: acqId } : i)));
      }
      setMsg("Cutting a preview at your pin. The first time for a scene also downloads it, which can take a minute…");
      const res = await fetch(`/api/imagery/${acqId}/chip`, { method: "POST", headers: auth, body: JSON.stringify({ lat: point.lat, lon: point.lon, size_px: zoomPx }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setMsg(data?.error?.message ?? `Preview failed (${res.status})`); return; }
      let chipId: string | undefined = data.chip?.id;
      if (!chipId) {
        const jobId = data.job.id as string;
        for (let i = 0; i < 160 && !chipId; i++) {
          await sleep(1500);
          const jr = await fetch(`/api/jobs/${jobId}`, { headers: { Authorization: `Bearer ${token}` } });
          const jd = await jr.json().catch(() => ({}));
          if (!jr.ok) { setMsg(jd?.error?.message ?? `Could not check the preview job (${jr.status})`); return; }
          if (jd.job.status === "failed") { setMsg(jd.job.error?.message ?? "Preview failed."); return; }
          if (jd.job.status === "succeeded") chipId = jd.job.result.chip_id as string;
        }
        if (!chipId) { setMsg("The preview is taking too long. Try again in a moment."); return; }
      }
      const cr = await fetch(`/api/chips/${chipId}`);
      const cd = await cr.json().catch(() => ({}));
      if (!cr.ok) { setMsg(cd?.error?.message ?? "Could not load the preview."); return; }
      const c = cd.chip;
      setCaption(null);
      setComparison(null);
      setChip({ id: c.id, image_url: c.image_url, display_url: c.display_url ?? c.image_url, width_px: c.width_px, height_px: c.height_px, pin_px: c.pin_px, gsd_m: c.gsd_m, label: `${new Date(item.acquired_at).toISOString().slice(0, 10)} · ${item.platform ?? item.collection}` });
      const ring: number[][] = c.bounds.coordinates[0];
      await showOverlay(c.display_url ?? c.image_url, ring[0][0], ring[2][1], ring[2][0], ring[0][1]);
      setMsg("Preview placed on the globe at your pin.");
    } catch {
      setMsg("Can't reach the server. Is the backend running on port 3000?");
    } finally {
      setChipBusy(null);
    }
  };

  const describeChip = async () => {
    const token = getToken();
    if (!chip) return;
    if (!token) { setMsg("Log in to describe imagery."); return; }
    setCaptionBusy(true);
    setMsg("Describing the image. The first time loads the model, which can take a minute…");
    try {
      const res = await fetch("/api/captions", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ chip_id: chip.id }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setMsg(data?.error?.message ?? `Could not describe the image (${res.status})`); return; }
      let captionId: string | undefined = data.caption?.id;
      if (!captionId) {
        const jobId = data.job.id as string;
        for (let i = 0; i < 200 && !captionId; i++) {
          await sleep(1500);
          const jr = await fetch(`/api/jobs/${jobId}`, { headers: { Authorization: `Bearer ${token}` } });
          const jd = await jr.json().catch(() => ({}));
          if (!jr.ok) { setMsg(jd?.error?.message ?? `Could not check the caption job (${jr.status})`); return; }
          if (jd.job.status === "failed") { setMsg(jd.job.error?.message ?? "Captioning failed."); return; }
          if (jd.job.status === "succeeded") captionId = jd.job.result.caption_id as string;
        }
        if (!captionId) { setMsg("The caption is taking too long. Try again in a moment."); return; }
      }
      const cr = await fetch(`/api/captions/${captionId}`);
      const cd = await cr.json().catch(() => ({}));
      if (!cr.ok) { setMsg(cd?.error?.message ?? "Could not load the caption."); return; }
      const c = cd.caption;
      setCaption({ text: c.caption, checkpoint: c.model.checkpoint, device: c.model.device, latencyMs: c.latency_ms });
      setMsg("Caption ready.");
    } catch {
      setMsg("Can't reach the server. Is the backend running on port 3000?");
    } finally {
      setCaptionBusy(false);
    }
  };

  const compareModels = async () => {
    const token = getToken();
    if (!chip) return;
    if (!token) { setMsg("Log in to compare models."); return; }
    setCompareBusy(true);
    setMsg("Comparing models. The first time loads them, which can take a minute…");
    try {
      const res = await fetch("/api/captions/compare-models", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ chip_id: chip.id }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setMsg(data?.error?.message ?? `Could not start the comparison (${res.status})`); return; }
      const jobId = data.job.id as string;
      let comparisonId: string | undefined;
      for (let i = 0; i < 240 && !comparisonId; i++) {
        await sleep(1500);
        const jr = await fetch(`/api/jobs/${jobId}`, { headers: { Authorization: `Bearer ${token}` } });
        const jd = await jr.json().catch(() => ({}));
        if (!jr.ok) { setMsg(jd?.error?.message ?? `Could not check the comparison job (${jr.status})`); return; }
        if (jd.job.status === "failed") { setMsg(jd.job.error?.message ?? "The comparison failed."); return; }
        if (jd.job.status === "succeeded") comparisonId = jd.job.result.comparison_id as string;
      }
      if (!comparisonId) { setMsg("The comparison is taking too long. Try again in a moment."); return; }
      const cr = await fetch(`/api/comparisons/${comparisonId}`);
      const cd = await cr.json().catch(() => ({}));
      if (!cr.ok) { setMsg(cd?.error?.message ?? "Could not load the comparison."); return; }
      setComparison(cd.comparison);
      setMsg("Comparison ready.");
    } catch {
      setMsg("Can't reach the server. Is the backend running on port 3000?");
    } finally {
      setCompareBusy(false);
    }
  };

  const analyzeChange = async () => {
    const token = getToken();
    if (!point) { setMsg("Drop a pin first: search a place or click the globe."); return; }
    if (!token) { setMsg("Log in to analyse change."); return; }
    if (!beforeItem || !afterItem) { setMsg("Pick two scenes first: press Before on one and After on another."); return; }
    if (beforeItem.external_id === afterItem.external_id) { setMsg("Pick two different scenes."); return; }
    const auth = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
    setAnalysisBusy(true);
    try {
      const ids: string[] = [];
      for (const item of [beforeItem, afterItem]) {
        let id = item.id;
        if (!id) {
          setMsg("Registering scenes…");
          const r = await fetch("/api/imagery/ingest", { method: "POST", headers: auth, body: JSON.stringify({ collection: item.collection, external_id: item.external_id }) });
          const d = await r.json().catch(() => ({}));
          if (!r.ok) { setMsg(d?.error?.message ?? `Could not register a scene (${r.status})`); return; }
          id = d.acquisition.id as string;
          setItems((prev) => prev.map((i) => (i.external_id === item.external_id ? { ...i, ingested: true, id } : i)));
        }
        ids.push(id as string);
      }
      setMsg("Comparing the two dates. The first time downloads both scenes, which can take a few minutes…");
      const res = await fetch("/api/analysis/compare", { method: "POST", headers: auth, body: JSON.stringify({ before_id: ids[0], after_id: ids[1], lat: point.lat, lon: point.lon, size_px: zoomPx }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setMsg(data?.error?.message ?? `Could not start the analysis (${res.status})`); return; }
      const jobId = data.job.id as string;
      let analysisId: string | undefined;
      for (let i = 0; i < 300 && !analysisId; i++) {
        await sleep(2000);
        const jr = await fetch(`/api/jobs/${jobId}`, { headers: { Authorization: `Bearer ${token}` } });
        const jd = await jr.json().catch(() => ({}));
        if (!jr.ok) { setMsg(jd?.error?.message ?? `Could not check the analysis job (${jr.status})`); return; }
        if (jd.job.status === "failed") { setMsg(jd.job.error?.message ?? "The analysis failed."); return; }
        if (jd.job.status === "succeeded") analysisId = jd.job.result.analysis_id as string;
      }
      if (!analysisId) { setMsg("The analysis is taking too long. Try again in a moment."); return; }
      const ar = await fetch(`/api/analysis/${analysisId}`);
      const ad = await ar.json().catch(() => ({}));
      if (!ar.ok) { setMsg(ad?.error?.message ?? "Could not load the analysis."); return; }
      setAnalysis(ad.analysis);
      setShowChanges(true);
      await showChangeOnGlobe(ad.analysis);
      setMsg(ad.analysis.status === "ok" ? "Change analysis ready." : "The analysis could not measure change for these scenes. See the note below.");
    } catch {
      setMsg("Can't reach the server. Is the backend running on port 3000?");
    } finally {
      setAnalysisBusy(false);
    }
  };

  const loadWeather = async () => {
    if (!point) { setMsg("Drop a pin first: search a place or click the globe."); return; }
    setWeatherBusy(true);
    setMsg("Loading the weather forecast…");
    try {
      const res = await fetch(`/api/weather/forecast?lat=${point.lat.toFixed(4)}&lon=${point.lon.toFixed(4)}&days=3`);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setMsg(data?.error?.message ?? `Could not load the forecast (${res.status})`); return; }
      setForecast(data);
      setHourIdx(data.now_index ?? 0);
      setMsg("Forecast ready.");
    } catch {
      setMsg("Can't reach the server. Is the backend running on port 3000?");
    } finally {
      setWeatherBusy(false);
    }
  };

  const monitorHere = async () => {
    const token = getToken();
    if (!point) { setMsg("Drop a pin first: search a place or click the globe."); return; }
    if (!token) { setMsg("Log in to monitor locations."); return; }
    setMonitorBusy(true);
    try {
      const res = await fetch("/api/regions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: (pinName || `${point.lat.toFixed(4)}, ${point.lon.toFixed(4)}`).slice(0, 80), lat: point.lat, lon: point.lon, auto_caption: autoCaption }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setMsg(data?.error?.message ?? `Could not monitor this location (${res.status})`); return; }
      setMsg(`Monitoring "${data.region.name}". Press "Check for new scenes now" to run an update.`);
    } catch {
      setMsg("Can't reach the server. Is the backend running on port 3000?");
    } finally {
      setMonitorBusy(false);
    }
  };

  const runUpdate = async () => {
    const token = getToken();
    if (!token) { setMsg("Log in to run updates."); return; }
    setRunBusy(true);
    setMsg("Checking your monitored locations for new scenes…");
    try {
      const res = await fetch("/api/updates/run", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setMsg(data?.error?.message ?? `Could not start the update (${res.status})`); return; }
      const runId = data.run.id as string;
      for (let i = 0; i < 300; i++) {
        await sleep(2000);
        const rr = await fetch(`/api/updates/runs/${runId}`, { headers: { Authorization: `Bearer ${token}` } });
        const rd = await rr.json().catch(() => ({}));
        if (!rr.ok) { setMsg(rd?.error?.message ?? `Could not check the update (${rr.status})`); return; }
        const run = rd.run;
        if (run.status === "running") continue;
        const firstError = run.summary?.regions?.flatMap((r: { errors: { message: string }[] }) => r.errors)?.[0]?.message ?? run.summary?.error;
        if (run.status === "failed") { setMsg(`Update failed${firstError ? `: ${firstError}` : "."}`); return; }
        setMsg(run.summary?.note ?? `Update finished: ${run.new_acquisitions} new scene${run.new_acquisitions === 1 ? "" : "s"}, ${run.captions_created} caption${run.captions_created === 1 ? "" : "s"}, ${run.failed_tasks} problem${run.failed_tasks === 1 ? "" : "s"}. See the Dashboard.`);
        return;
      }
      setMsg("The update is still running. Check the Dashboard in a few minutes.");
    } catch {
      setMsg("Can't reach the server. Is the backend running on port 3000?");
    } finally {
      setRunBusy(false);
    }
  };

  const register = async (item: Item) => {
    const token = getToken();
    if (!token) { setMsg("Log in to register imagery."); return; }
    try {
      const res = await fetch("/api/imagery/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ collection: item.collection, external_id: item.external_id }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setMsg(data?.error?.message ?? `Could not register (${res.status})`); return; }
      setItems((prev) => prev.map((i) => (i.external_id === item.external_id ? { ...i, ingested: true, id: data.acquisition.id } : i)));
      setMsg(data.created ? "Scene registered." : "Scene was already registered.");
    } catch {
      setMsg("Can't reach the server. Is the backend running on port 3000?");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4"><SearchGroup onSearch={onSearch} /><span className="text-sm text-muted-foreground">{msg}</span></div>
      <div ref={el} className="h-[70vh] w-full overflow-hidden rounded-2xl border border-white/10" />
      {point && (
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <button type="button" disabled={monitorBusy} onClick={() => void monitorHere()} className="rounded-md border border-white/10 px-2 py-1 text-xs text-[#8daaff] disabled:text-muted-foreground">
            {monitorBusy ? "Saving…" : "Monitor this location"}
          </button>
          <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <input type="checkbox" checked={autoCaption} onChange={(e) => setAutoCaption(e.target.checked)} />
            also describe new scenes
          </label>
          <button type="button" disabled={weatherBusy} onClick={() => void loadWeather()} className="rounded-md border border-white/10 px-2 py-1 text-xs text-[#8daaff] disabled:text-muted-foreground">
            {weatherBusy ? "Loading…" : "Weather forecast"}
          </button>
          <button type="button" disabled={analysisBusy || !beforeItem || !afterItem} onClick={() => void analyzeChange()} className="rounded-md border border-white/10 px-2 py-1 text-xs text-[#8daaff] disabled:text-muted-foreground">
            {analysisBusy ? "Analysing…" : "Analyse change"}
          </button>
          <button type="button" disabled={runBusy} onClick={() => void runUpdate()} className="rounded-md border border-white/10 px-2 py-1 text-xs text-[#8daaff] disabled:text-muted-foreground">
            {runBusy ? "Checking…" : "Check for new scenes now"}
          </button>
        </div>
      )}
      {forecast && (() => {
        const h = forecast.hourly;
        const i = Math.min(hourIdx, h.time.length - 1);
        const show = (v: Num, unit = "") => (v == null ? "n/a" : `${v}${unit}`);
        const data = h.time.map((t, k) => ({ k, label: `${t.slice(5, 10)} ${t.slice(11, 16)}`, temp: h.temperature_c[k], rain: h.precipitation_mm[k], cloud: h.cloud_cover_pct[k] }));
        return (
          <div className="space-y-3 rounded-2xl border border-white/10 p-3">
            <div className="flex items-center justify-between text-sm">
              <span>Weather at the pin · {forecast.location.timezone ?? "local time"} time</span>
              <button type="button" onClick={() => setForecast(null)} className="text-xs text-muted-foreground hover:text-white">Close</button>
            </div>
            <div className="space-y-1 text-sm">
              <p className="font-medium">{h.time[i].replace("T", " ")} · {h.summary[i]}</p>
              <p className="text-xs text-muted-foreground">
                Temperature {show(h.temperature_c[i], " °C")} · Rain {show(h.precipitation_mm[i], " mm")} ({show(h.precipitation_probability_pct[i], "%")} chance) · Cloud cover {show(h.cloud_cover_pct[i], "%")} · Wind {show(h.wind_speed_kmh[i], " km/h")} (gusts {show(h.wind_gust_kmh[i], " km/h")}) · Humidity {show(h.humidity_pct[i], "%")}
              </p>
            </div>
            <input type="range" min={0} max={h.time.length - 1} value={i} onChange={(e) => setHourIdx(Number(e.target.value))} className="w-full" aria-label="Forecast hour" />
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <XAxis dataKey="k" interval={11} tickFormatter={(k: number) => data[k]?.label ?? ""} tick={{ fontSize: 10, fill: "#9aa8c7" }} />
                  <YAxis yAxisId="t" width={28} tick={{ fontSize: 10, fill: "#9aa8c7" }} />
                  <YAxis yAxisId="c" orientation="right" width={28} domain={[0, 100]} tick={{ fontSize: 10, fill: "#9aa8c7" }} />
                  <YAxis yAxisId="r" hide domain={[0, "auto"]} />
                  <Tooltip labelFormatter={(k: number) => data[k]?.label ?? ""} contentStyle={{ background: "#0b1224", border: "1px solid #24304f", fontSize: 12 }} />
                  <Bar yAxisId="r" dataKey="rain" name="Rain (mm)" fill="#4f7cff" />
                  <Line yAxisId="c" dataKey="cloud" name="Cloud cover (%)" stroke="#9aa8c7" strokeDasharray="4 3" dot={false} />
                  <Line yAxisId="t" dataKey="temp" name="Temperature (°C)" stroke="#ffb86b" dot={false} strokeWidth={2} />
                  <ReferenceLine yAxisId="t" x={i} stroke="#ffffff" strokeDasharray="3 3" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground">Orange line: temperature (left scale). Grey dashed line: cloud cover (right scale, 0 to 100%). Blue bars: rain.</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {forecast.daily.date.map((d, k) => (
                <div key={d} className="rounded-lg border border-white/10 p-2">
                  <p className="font-medium">{d}</p>
                  <p className="text-muted-foreground">{forecast.daily.summary[k]}</p>
                  <p>{show(forecast.daily.tmax_c[k], "°")} / {show(forecast.daily.tmin_c[k], "°")}</p>
                  <p className="text-muted-foreground">Rain {show(forecast.daily.precipitation_mm[k], " mm")}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Model forecast for roughly an 11 km area around the pin, not a measurement. Cloud cover helps judge whether a new satellite scene will be clear.{" "}
              <a href={forecast.source.url} target="_blank" rel="noreferrer" className="text-[#8daaff] underline">{forecast.source.attribution}</a> (CC BY 4.0).
            </p>
          </div>
        );
      })()}
      {items.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">Preview area around the pin:</span>
          {ZOOMS.map((z) => (
            <button
              key={z.px}
              type="button"
              onClick={() => setZoomPx(z.px)}
              className={`rounded-md border px-2 py-1 text-xs ${zoomPx === z.px ? "border-[#8daaff] text-[#8daaff]" : "border-white/10 text-muted-foreground"}`}
            >
              {z.name} · {z.km}
            </button>
          ))}
        </div>
      )}
      {items.length > 0 && (
        <ul className="max-h-60 space-y-1 overflow-auto text-sm">
          {items.map((i) => (
            <li key={i.external_id} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 px-3 py-2">
              <button type="button" className="text-left hover:text-[#8daaff]" onClick={() => focus(i)}>
                {new Date(i.acquired_at).toISOString().slice(0, 10)} · {i.platform ?? i.collection} · {i.cloud_cover != null ? `${i.cloud_cover.toFixed(0)}% cloud` : "no cloud data"}{i.gsd ? ` · ${i.gsd} m` : ""}
              </button>
              <span className="flex items-center gap-3">
                <button type="button" onClick={() => setBeforeItem(beforeItem?.external_id === i.external_id ? null : i)} className={`text-xs ${beforeItem?.external_id === i.external_id ? "font-semibold text-[#8daaff]" : "text-muted-foreground hover:text-white"}`}>Before</button>
                <button type="button" onClick={() => setAfterItem(afterItem?.external_id === i.external_id ? null : i)} className={`text-xs ${afterItem?.external_id === i.external_id ? "font-semibold text-[#8daaff]" : "text-muted-foreground hover:text-white"}`}>After</button>
                <button type="button" disabled={chipBusy !== null} onClick={() => void previewChip(i)} className="text-xs text-[#8daaff] disabled:text-muted-foreground">
                  {chipBusy === i.external_id ? "Working…" : "Preview"}
                </button>
                <button type="button" disabled={i.ingested} onClick={() => void register(i)} className="text-xs text-[#8daaff] disabled:text-muted-foreground">
                  {i.ingested ? "Registered" : "Register"}
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
      {chip && (
        <div className="space-y-2 rounded-2xl border border-white/10 p-3">
          <div className="flex items-center justify-between text-sm">
            <span>{chip.label} · {chip.width_px}×{chip.height_px} px{chip.gsd_m ? ` · ${chip.gsd_m} m/px` : ""}</span>
            <span className="flex items-center gap-3">
              <button type="button" disabled={captionBusy} onClick={() => void describeChip()} className="text-xs text-[#8daaff] disabled:text-muted-foreground">{captionBusy ? "Describing…" : "Describe this image"}</button>
              <button type="button" disabled={compareBusy} onClick={() => void compareModels()} className="text-xs text-[#8daaff] disabled:text-muted-foreground">{compareBusy ? "Comparing…" : "Compare models"}</button>
              <button type="button" onClick={() => setSmooth((v) => !v)} className="text-xs text-[#8daaff]">{smooth ? "Show pixels" : "Smooth"}</button>
              <button type="button" onClick={closeChip} className="text-xs text-muted-foreground hover:text-white">Close preview</button>
            </span>
          </div>
          <div className="relative inline-block w-full max-w-[512px]">
            <img src={smooth ? chip.display_url : chip.image_url} alt="Satellite preview at the pin" width={chip.width_px} height={chip.height_px} className="block w-full max-w-[512px] rounded-lg" style={{ imageRendering: smooth ? "auto" : "pixelated" }} />
            <span
              className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-500"
              style={{ left: `${(chip.pin_px.x / chip.width_px) * 100}%`, top: `${(chip.pin_px.y / chip.height_px) * 100}%` }}
            />
          </div>
          {caption && (
            <div className="space-y-1 rounded-lg border border-white/10 p-3 text-sm">
              <p>{caption.text}</p>
              <p className="text-xs text-muted-foreground">
                AI-generated by {caption.checkpoint}{caption.device ? ` on ${caption.device}` : ""}{caption.latencyMs != null ? ` in ${(caption.latencyMs / 1000).toFixed(1)} s` : ""}. This is a general-purpose model, not trained on satellite imagery, so treat it as a rough description, not a measurement.
              </p>
            </div>
          )}
          {comparison && (
            <div className="space-y-2 rounded-lg border border-white/10 p-3 text-sm">
              {comparison.scene_tags && (
                <p>
                  <span className="text-muted-foreground">Scene tags (GeoRSCLIP): </span>
                  {comparison.scene_tags.map((t) => `${t.label} ${Math.round(t.score * 100)}%`).join(" · ")}
                </p>
              )}
              {comparison.scene_error && <p className="text-xs text-muted-foreground">Scene tags unavailable: {comparison.scene_error.message}</p>}
              <ul className="space-y-1">
                {comparison.results.map((r) => (
                  <li key={r.model_id}>
                    <span className="font-medium">{r.name}: </span>
                    {r.text ?? `failed (${r.error?.message ?? "unknown error"})`}
                    {r.alignment != null && <span className="text-xs text-muted-foreground"> · image match {r.alignment.toFixed(2)}</span>}
                  </li>
                ))}
              </ul>
              {comparison.unavailable.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  Not available on this machine:{" "}
                  {comparison.unavailable.map((u, i) => (
                    <span key={u.model_id} title={u.reason}>{u.name}{i < comparison.unavailable.length - 1 ? ", " : ""}</span>
                  ))}
                  . Hover a name for the reason.
                </p>
              )}
              <p className="text-xs text-muted-foreground">AI-generated. Image match is a rough similarity between the image and each caption, not a measure of truth.</p>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            North is up and the red ring is your pin. Each pixel covers about {chip.gsd_m ?? 10} × {chip.gsd_m ?? 10} m on the ground, which is the finest detail Sentinel-2 true colour has: roads, fields, water and large buildings show, but not individual houses or cars.
          </p>
        </div>
      )}
      {analysis && (
        <div className="space-y-3 rounded-2xl border border-white/10 p-3">
          <div className="flex items-center justify-between text-sm">
            <span>Change between {analysis.before.acquired_at.slice(0, 10)} and {analysis.after.acquired_at.slice(0, 10)}</span>
            <span className="flex items-center gap-3">
              {analysis.overlay_url && <button type="button" onClick={toggleChanges} className="text-xs text-[#8daaff]">{showChanges ? "Hide changes on globe" : "Show changes on globe"}</button>}
              <button type="button" onClick={closeAnalysis} className="text-xs text-muted-foreground hover:text-white">Close</button>
            </span>
          </div>
          <div className="grid max-w-[640px] grid-cols-2 gap-2">
            {[["Earlier", analysis.before], ["Later", analysis.after]].map(([label, s]) => (
              <figure key={label as string} className="space-y-1">
                <img src={(s as SceneRef).display_url} alt={`${label} scene`} className="block w-full rounded-lg" />
                <figcaption className="text-xs text-muted-foreground">{label as string}: {(s as SceneRef).acquired_at.slice(0, 10)} · {(s as SceneRef).platform ?? "satellite"}</figcaption>
              </figure>
            ))}
          </div>
          {analysis.status === "ok" ? (
            <div className="space-y-1 text-sm">
              <p>
                About {analysis.results.changed_area_ha} ha flagged as changed ({Math.round((analysis.results.changed_fraction ?? 0) * 1000) / 10}% of the usable area).
                {analysis.results.cloud_masked_fraction != null && ` Clouds and shadows excluded: ${Math.round(analysis.results.cloud_masked_fraction * 1000) / 10}% of the area.`}
              </p>
              {analysis.results.transitions && analysis.results.transitions.length > 0 && (
                <ul className="text-xs text-muted-foreground">
                  {analysis.results.transitions.map((t) => (
                    <li key={`${t.from}-${t.to}`}>{t.from} to {t.to}: about {t.area_ha} ha</li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <p className="text-sm">The analysis could not measure change for these two scenes.</p>
          )}
          <ul className="space-y-0.5 text-xs text-muted-foreground">
            {analysis.notes.map((n) => <li key={n}>{n}</li>)}
          </ul>
          <p className="text-xs text-muted-foreground">Measured by image analysis, not AI. Areas are approximate, and a difference between two images is not a confirmed real-world event: lighting, season, haze and alignment can all create apparent change.</p>
        </div>
      )}
      {next && <button type="button" disabled={busy} onClick={loadMore} className="text-sm text-[#8daaff] disabled:text-muted-foreground">Load more</button>}
      {credit && <p className="text-xs text-muted-foreground">{credit}</p>}
    </div>
  );
}
