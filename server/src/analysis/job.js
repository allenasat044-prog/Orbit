import crypto from "node:crypto";
import { JobError } from "../imagery/chipJob.js";

const DAY = 86_400_000;
const dayOfYear = (d) => Math.floor((Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - Date.UTC(d.getUTCFullYear(), 0, 0)) / DAY);

export function sclKeyFor(acq) {
  const found = Object.entries(acq.assets ?? {})
    .filter(([k, a]) => /^SCL/i.test(k) && a?.https_href)
    .sort((x, y) => (x[1].gsd ?? Infinity) - (y[1].gsd ?? Infinity));
  return found[0]?.[0] ?? null;
}

export function timeNotes(before, after) {
  const b = new Date(before.acquired_at);
  const a = new Date(after.acquired_at);
  const gap = Math.round((a - b) / DAY);
  const notes = [`The scenes were captured ${gap} day${gap === 1 ? "" : "s"} apart.`];
  const d = Math.abs(dayOfYear(a) - dayOfYear(b));
  const apart = Math.min(d, 365 - d);
  if (apart > 45) notes.push(`The dates are about ${apart} days apart in the year, so vegetation, water and soil moisture differences may be seasonal rather than lasting change.`);
  for (const [label, s] of [["earlier", before], ["later", after]]) {
    if (typeof s.cloud_cover === "number" && s.cloud_cover > 20) notes.push(`The ${label} scene is ${Math.round(s.cloud_cover)}% cloudy over its whole tile, so check the pin area for cloud.`);
  }
  return { gap, notes };
}

export function createAnalysisHandler({ acquisitions, chips, analyses, chipHandler, ensureAsset, mlLabelChip, mlChange, storage }) {
  return async function analyzeChange({ before_id, after_id, lon, lat, size_px }, { userId } = {}) {
    const [first, second] = await Promise.all([acquisitions.findById(before_id), acquisitions.findById(after_id)]);
    if (!first || !second) throw new JobError("acquisition_not_found", "One of the scenes was not found.");
    if (first.id === second.id) throw new JobError("same_scene", "Pick two different scenes.");
    const [before, after] = new Date(first.acquired_at) <= new Date(second.acquired_at) ? [first, second] : [second, first];
    if (Math.round((new Date(after.acquired_at) - new Date(before.acquired_at)) / DAY) < 1) {
      throw new JobError("same_date", "Both scenes were captured on the same day. Pick scenes from different dates.");
    }
    for (const s of [before, after]) if (!s.visual_asset_key) throw new JobError("no_visual_asset", "One of the scenes has no true-colour image asset.");

    const cb = await chipHandler({ acquisition_id: before.id, lon, lat, size_px });
    const ca = await chipHandler({ acquisition_id: after.id, lon, lat, size_px });
    const chipB = await chips.findById(cb.chip_id);
    const chipA = await chips.findById(ca.chip_id);
    const existing = await analyses.findByChips(chipB.id, chipA.id);
    if (existing) return { analysis_id: existing.id, reused: true };

    const { notes } = timeNotes(before, after);
    const pixelM = chipB.gsd_m ?? 10;

    const scl = { before: null, after: null };
    const keyB = sclKeyFor(before);
    const keyA = sclKeyFor(after);
    if (keyB && keyA) {
      try {
        for (const [side, acq, key, chip] of [["before", before, keyB, chipB], ["after", after, keyA, chipA]]) {
          const asset = await ensureAsset(acq, key);
          const rel = `chips/${chip.id}.scl.png`;
          if (!storage.exists(rel)) await mlLabelChip({ path: asset.storage_path, out_path: rel, lon, lat, size_px, pixel_m: pixelM });
          scl[side] = rel;
        }
      } catch (err) {
        if (err?.retryable) throw err;
        scl.before = scl.after = null;
        notes.push(`Clouds and shadows could not be masked: ${err?.message ?? "the scene classification layer was unavailable"}.`);
      }
    } else {
      notes.push("These scenes have no scene classification layer, so clouds and shadows were not masked.");
    }

    const key = crypto.randomUUID();
    const overlayRel = `analysis/${key}.overlay.png`;
    let result;
    try {
      result = await mlChange({ before_path: chipB.storage_path, after_path: chipA.storage_path, overlay_out_path: overlayRel, before_scl_path: scl.before ?? undefined, after_scl_path: scl.after ?? undefined, pixel_m: pixelM });
    } catch (err) {
      throw err instanceof JobError ? err : new JobError(err?.code ?? "ml_service_error", err?.message ?? String(err), err?.retryable === true);
    }
    const { warnings, ...stats } = result;
    const { analysis, created } = await analyses.insert({
      before_chip_id: chipB.id, after_chip_id: chipA.id, status: result.status, scl_used: Boolean(result.scl_used),
      results: stats, notes: [...notes, ...(warnings ?? [])], overlay_path: result.status === "ok" ? overlayRel : null, created_by: userId ?? null,
    });
    if (!created || result.status !== "ok") await storage.remove(overlayRel);
    return { analysis_id: analysis.id, reused: !created };
  };
}
