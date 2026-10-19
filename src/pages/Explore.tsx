import { useEffect, useRef, useState } from "react";
import {
  Viewer, ImageryLayer, UrlTemplateImageryProvider, GeoJsonDataSource, Color, Rectangle, Entity,
  Cartesian2, Cartesian3, Cartographic, LabelStyle, ScreenSpaceEventHandler, ScreenSpaceEventType, Math as CesiumMath, SingleTileImageryProvider,
} from "cesium";
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
type Chip = { id: string; image_url: string; width_px: number; height_px: number; pin_px: { x: number; y: number }; gsd_m: number | null; label: string };
type Caption = { text: string; checkpoint: string; device: string | null; latencyMs: number | null };
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

  const closeChip = () => { clearOverlay(); setChip(null); setCaption(null); };

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
      if (!append) { setPoint(pt); clearOverlay(); setChip(null); setCaption(null); }
      if (!append && pt) placePin(pt, pinLabel ?? data.place?.name ?? `${pt.lat.toFixed(4)}, ${pt.lon.toFixed(4)}`, true);
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
      setChip({ id: c.id, image_url: c.image_url, width_px: c.width_px, height_px: c.height_px, pin_px: c.pin_px, gsd_m: c.gsd_m, label: `${new Date(item.acquired_at).toISOString().slice(0, 10)} · ${item.platform ?? item.collection}` });
      const ring: number[][] = c.bounds.coordinates[0];
      await showOverlay(c.image_url, ring[0][0], ring[2][1], ring[2][0], ring[0][1]);
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
              <button type="button" onClick={() => setSmooth((v) => !v)} className="text-xs text-[#8daaff]">{smooth ? "Show pixels" : "Smooth"}</button>
              <button type="button" onClick={closeChip} className="text-xs text-muted-foreground hover:text-white">Close preview</button>
            </span>
          </div>
          <div className="relative inline-block w-full max-w-[512px]">
            <img src={chip.image_url} alt="Satellite preview at the pin" width={chip.width_px} height={chip.height_px} className="block w-full max-w-[512px] rounded-lg" style={{ imageRendering: smooth ? "auto" : "pixelated" }} />
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
          <p className="text-xs text-muted-foreground">
            North is up and the red ring is your pin. Each pixel covers about {chip.gsd_m ?? 10} × {chip.gsd_m ?? 10} m on the ground, which is the finest detail Sentinel-2 true colour has: roads, fields, water and large buildings show, but not individual houses or cars.
          </p>
        </div>
      )}
      {next && <button type="button" disabled={busy} onClick={loadMore} className="text-sm text-[#8daaff] disabled:text-muted-foreground">Load more</button>}
      {credit && <p className="text-xs text-muted-foreground">{credit}</p>}
    </div>
  );
}
