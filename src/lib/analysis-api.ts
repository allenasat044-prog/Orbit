import { api, type ApiResult } from "@/lib/library";

// Everything the Analysis page asks the server for. Each function throws an Error with a plain message,
// so the page can show it as it is.

export type Geometry = { type: string; coordinates: unknown };
export type Scene = {
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
export type Pin = { lat: number; lon: number; name: string };
export type ChipInfo = { id: string; rev: number; image_url: string; display_url: string; width_px: number; height_px: number; pin_px: { x: number; y: number }; gsd_m: number | null };
export type Description = { id: string; text: string; checkpoint: string; device: string | null; latencyMs: number | null };
export type CompareResult = { model_id: string; name: string; text?: string; latency_ms?: number | null; alignment?: number | null; error?: { message: string } };
export type Comparison = {
  results: CompareResult[];
  scene_tags: { label: string; score: number }[] | null;
  scene_error: { message: string } | null;
  unavailable: { model_id: string; name: string; reason: string }[];
};
export type SceneRef = { chip_id: string; acquired_at: string; platform: string | null; cloud_cover: number | null; display_url: string; image_url: string };
export type ChangeAnalysis = {
  id: string;
  status: "ok" | "insufficient_data";
  scl_used: boolean;
  location: { lat: number; lon: number };
  size_px: number;
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
  created_at: string;
  method: string;
  caveat: string;
};
type Num = number | null;
export type Forecast = {
  location: { timezone: string | null; elevation_m: number | null };
  now_index: number | null;
  hourly: {
    time: string[]; temperature_c: Num[]; humidity_pct: Num[]; precipitation_probability_pct: Num[]; precipitation_mm: Num[];
    cloud_cover_pct: Num[]; wind_speed_kmh: Num[]; wind_gust_kmh: Num[]; weather_code: Num[]; summary: string[];
  };
  daily: { date: string[]; tmax_c: Num[]; tmin_c: Num[]; precipitation_mm: Num[]; weather_code: Num[]; summary: string[] };
  source: { attribution: string; url: string };
  cached: boolean;
  fetched_at: string;
};

export const timing = { pollMs: 1500 };
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function must<T>(p: Promise<ApiResult<T>>): Promise<T> {
  const r = await p;
  if (!r.ok) throw new Error(r.error);
  return r.data;
}

type JobAnswer = { job: { status: string; error?: { message?: string }; result?: Record<string, string> } };

/** Waits for a background job and returns one field of its result. */
async function waitForJob(jobId: string, field: string, tries: number, what: string): Promise<string> {
  for (let i = 0; i < tries; i++) {
    await sleep(timing.pollMs);
    const { job } = await must(api<JobAnswer>("GET", `/api/jobs/${jobId}`));
    if (job.status === "failed") throw new Error(job.error?.message ?? `${what} failed.`);
    if (job.status === "succeeded" && job.result?.[field]) return job.result[field];
  }
  throw new Error(`${what} is taking too long. Try again in a moment.`);
}

export async function searchScenes(target: { q: string } | { lat: number; lon: number }) {
  const params = new URLSearchParams({ cloud_max: "30" });
  if ("q" in target) { params.set("q", target.q); params.set("type", "All"); }
  else { params.set("lat", target.lat.toFixed(6)); params.set("lon", target.lon.toFixed(6)); }
  const d = await must(api<{ items: Scene[]; point?: { lat: number; lon: number } | null; place?: { name?: string } | null; attribution?: { imagery?: string; geocoding?: string } }>("GET", `/api/imagery/search?${params}`, undefined, false));
  return {
    items: d.items,
    point: d.point ?? null,
    placeName: d.place?.name ?? null,
    credit: [d.attribution?.imagery, d.attribution?.geocoding].filter(Boolean).join(" · "),
  };
}

/** Makes sure the server knows the scene, and returns its id. */
export async function ensureSceneId(scene: Scene): Promise<string> {
  if (scene.id) return scene.id;
  const d = await must(api<{ acquisition: { id: string } }>("POST", "/api/imagery/ingest", { collection: scene.collection, external_id: scene.external_id }));
  scene.id = d.acquisition.id;
  return d.acquisition.id;
}

/** Cuts (or reuses) the preview picture of a scene at the pin. refresh = cut it again. */
export async function prepareChip(scene: Scene, pin: Pin, sizePx: number, refresh = false): Promise<ChipInfo> {
  const acqId = await ensureSceneId(scene);
  const d = await must(api<{ chip?: { id: string }; job?: { id: string } }>("POST", `/api/imagery/${acqId}/chip`, { lat: pin.lat, lon: pin.lon, size_px: sizePx, ...(refresh ? { refresh: true } : {}) }));
  const chipId = d.chip?.id ?? (await waitForJob(d.job!.id, "chip_id", 160, "The preview"));
  const { chip: c } = await must(api<{ chip: { id: string; image_url: string; display_url?: string; width_px: number; height_px: number; pin_px: { x: number; y: number }; gsd_m: number | null } }>("GET", `/api/chips/${chipId}`, undefined, false));
  return { id: c.id, rev: Date.now(), image_url: c.image_url, display_url: c.display_url ?? c.image_url, width_px: c.width_px, height_px: c.height_px, pin_px: c.pin_px, gsd_m: c.gsd_m };
}

export async function describeChip(chipId: string): Promise<Description> {
  const d = await must(api<{ caption?: { id: string }; job?: { id: string } }>("POST", "/api/captions", { chip_id: chipId }));
  const captionId = d.caption?.id ?? (await waitForJob(d.job!.id, "caption_id", 200, "The description"));
  const { caption: c } = await must(api<{ caption: { id: string; caption: string; model: { checkpoint: string; device: string | null }; latency_ms: number | null } }>("GET", `/api/captions/${captionId}`, undefined, false));
  return { id: c.id, text: c.caption, checkpoint: c.model.checkpoint, device: c.model.device, latencyMs: c.latency_ms };
}

export async function compareModels(chipId: string): Promise<Comparison> {
  const d = await must(api<{ job: { id: string } }>("POST", "/api/captions/compare-models", { chip_id: chipId }));
  const id = await waitForJob(d.job.id, "comparison_id", 240, "The comparison");
  return (await must(api<{ comparison: Comparison }>("GET", `/api/comparisons/${id}`, undefined, false))).comparison;
}

export async function analyseChange(before: Scene, after: Scene, pin: Pin, sizePx: number): Promise<ChangeAnalysis> {
  const [beforeId, afterId] = [await ensureSceneId(before), await ensureSceneId(after)];
  const d = await must(api<{ job: { id: string } }>("POST", "/api/analysis/compare", { before_id: beforeId, after_id: afterId, lat: pin.lat, lon: pin.lon, size_px: sizePx }));
  const id = await waitForJob(d.job.id, "analysis_id", 300, "The analysis");
  return (await must(api<{ analysis: ChangeAnalysis }>("GET", `/api/analysis/${id}`, undefined, false))).analysis;
}

export async function listAnalyses(): Promise<ChangeAnalysis[]> {
  return (await must(api<{ items: ChangeAnalysis[] }>("GET", "/api/analysis"))).items;
}

export async function loadForecast(lat: number, lon: number, days = 7): Promise<Forecast> {
  return must(api<Forecast>("GET", `/api/weather/forecast?lat=${lat.toFixed(4)}&lon=${lon.toFixed(4)}&days=${days}`, undefined, false));
}
