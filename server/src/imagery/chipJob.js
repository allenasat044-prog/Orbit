import crypto from "node:crypto";
import { ProviderAuthError } from "../providers/copernicusAuth.js";

export class JobError extends Error {
  constructor(code, message, retryable = false) {
    super(message);
    this.code = code;
    this.retryable = retryable;
  }
}

export const CHIP_VERSION = "v3";
export const chipKey = (lon, lat, size) => `${lon.toFixed(5)},${lat.toFixed(5)},${size},${CHIP_VERSION}`;

const extFor = (type) => (/jp2|jpeg ?2000/i.test(type ?? "") ? ".jp2" : /tiff/i.test(type ?? "") ? ".tif" : ".dat");

export function createChipHandler({ acquisitions, assets, chips, tokens, storage, download, mlChip, limits }) {
  return async function prepareChip({ acquisition_id, lon, lat, size_px }) {
    const acq = await acquisitions.findById(acquisition_id);
    if (!acq) throw new JobError("acquisition_not_found", "Scene not found.");
    const key = chipKey(lon, lat, size_px);
    const existing = await chips.findByKey(acq.id, key);
    if (existing) return { chip_id: existing.id, reused: true };

    const assetKey = acq.visual_asset_key;
    if (!assetKey) throw new JobError("no_visual_asset", "This scene has no true-colour image asset.");
    const meta = acq.assets?.[assetKey];
    if (!meta?.https_href) throw new JobError("no_download_url", "This scene's image has no download URL.");

    let asset = await assets.find(acq.id, assetKey);
    if (!asset) {
      const rel = `assets/${acq.id}/${assetKey}${extFor(meta.type)}`;
      const token = await tokens.getToken();
      await storage.ensureDir(rel);
      let info;
      try {
        info = await download({ url: meta.https_href, destPath: storage.resolve(rel), token, maxBytes: limits.maxBytes, allowedHosts: limits.allowedHosts, timeoutMs: limits.timeoutMs });
      } catch (err) {
        if (err instanceof ProviderAuthError || err?.code === "provider_auth_failed") tokens.invalidate();
        throw err;
      }
      asset = await assets.insert({ acquisition_id: acq.id, asset_key: assetKey, storage_path: rel, sha256: info.sha256, size_bytes: info.size, content_type: info.contentType ?? meta.type });
    }

    const id = crypto.randomUUID();
    const outRel = `chips/${id}.png`;
    const displayRel = `chips/${id}.display.png`;
    const r = await mlChip({ path: asset.storage_path, out_path: outRel, display_out_path: displayRel, lon, lat, size_px });
    const { chip, created } = await chips.insert({
      id, acquisition_id: acq.id, asset_id: asset.id, center_key: key, center_lon: lon, center_lat: lat, size_px,
      width_px: r.width_px, height_px: r.height_px, pin_x: r.pin_px.x, pin_y: r.pin_px.y, gsd_m: r.gsd_m, crs: r.crs,
      nodata_fraction: r.nodata_fraction, bounds: r.bounds, storage_path: outRel, sha256: r.sha256,
    });
    if (!created) {
      await storage.remove(outRel);
      await storage.remove(displayRel);
    }
    return { chip_id: chip.id, reused: !created };
  };
}
