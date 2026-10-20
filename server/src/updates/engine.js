import { pointBbox, pointInGeometry } from "../imagery/geo.js";

const DAY = 86_400_000;
const iso = (ms) => new Date(ms).toISOString().replace(/\.\d{3}Z$/, "Z");
const defaultSleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function createUpdateEngine({ regions, runs, acquisitions, providers, processScene, now = Date.now, limits = {}, logger = console, sleep = defaultSleep }) {
  const { firstLookbackDays = 14, overlapMs = DAY, maxPages = 3, pageSize = 50, maxScenesPerRegion = 3, retryAttempts = 3, retryBackoffMs = 1000 } = limits;

  async function withRetry(fn) {
    for (let attempt = 1; ; attempt++) {
      try {
        return await fn();
      } catch (err) {
        if (!err?.retryable || attempt >= retryAttempts) throw err;
        await sleep(retryBackoffMs * 2 ** (attempt - 1));
      }
    }
  }

  const problem = (stage, err, scene) => ({ stage, scene, code: err?.code ?? "failed", message: err?.message ?? String(err) });

  async function checkRegion(region, userId) {
    const res = { region_id: region.id, name: region.name, found: 0, new: 0, captions: 0, failed: 0, errors: [] };
    const provider = providers.get("copernicus");
    const endMs = now();
    const startMs = region.last_success_at ? new Date(region.last_success_at).getTime() - overlapMs : endMs - firstLookbackDays * DAY;

    let found = [];
    try {
      let page = await provider.search({ collection: region.collection, bbox: pointBbox(region.lat, region.lon), start: iso(startMs), end: iso(endMs), cloudMax: region.max_cloud, limit: pageSize });
      found = [...page.items];
      for (let i = 1; i < maxPages && page.nextUrl; i++) {
        page = await provider.search({ cursorUrl: page.nextUrl });
        found.push(...page.items);
      }
    } catch (err) {
      res.failed++;
      res.errors.push(problem("search", err));
      return { res, ok: false, at: endMs };
    }

    const covering = found.filter((it) => pointInGeometry(it.footprint, region.lon, region.lat));
    res.found = covering.length;
    const existing = await acquisitions.findExistingIds(provider.id, covering.map((i) => i.external_id));
    const fresh = covering.filter((i) => !existing.has(i.external_id)).sort((a, b) => b.acquired_at.localeCompare(a.acquired_at));
    const captionIds = new Set(region.auto_caption ? fresh.slice(0, maxScenesPerRegion).map((i) => i.external_id) : []);

    for (const item of fresh) {
      try {
        const full = await provider.getItem({ collection: item.collection, id: item.external_id });
        const { record, created } = await acquisitions.upsert(full, userId ?? region.created_by);
        if (created) res.new++;
        if (created && captionIds.has(item.external_id)) {
          try {
            const out = await withRetry(() => processScene({ acquisition: record, region }));
            if (out?.captionCreated) res.captions++;
          } catch (err) {
            res.failed++;
            res.errors.push(problem("process", err, item.external_id));
          }
        }
      } catch (err) {
        res.failed++;
        res.errors.push(problem("register", err, item.external_id));
      }
    }
    const registerFailed = res.errors.some((e) => e.stage === "register");
    return { res, ok: !registerFailed, at: endMs };
  }

  async function execute(runId, { userId = null, role = "user" } = {}) {
    const totals = { regions_checked: 0, new_acquisitions: 0, captions_created: 0, failed_tasks: 0 };
    const summary = { regions: [] };
    let searchFailures = 0;
    try {
      const list = await regions.listActive(role === "admin" || userId == null ? null : userId);
      if (!list.length) summary.note = "No monitored locations to check. Add one from Explore with Monitor this location.";
      for (const region of list) {
        const { res, ok, at } = await checkRegion(region, userId);
        summary.regions.push(res);
        totals.regions_checked++;
        totals.new_acquisitions += res.new;
        totals.captions_created += res.captions;
        totals.failed_tasks += res.failed;
        if (res.errors.some((e) => e.stage === "search")) searchFailures++;
        await regions.markChecked(region.id, { at: new Date(at), success: ok });
      }
      const status = list.length > 0 && searchFailures === list.length ? "failed" : "succeeded";
      return await runs.finish(runId, { status, ...totals, summary });
    } catch (err) {
      logger.error("update run crashed:", err?.message ?? err);
      return runs.finish(runId, { status: "failed", ...totals, summary: { ...summary, error: err?.message ?? String(err) } });
    }
  }

  return { execute, checkRegion };
}
