import { JobError } from "../imagery/chipJob.js";

const asJobError = (err) => (err instanceof JobError ? err : new JobError(err?.code ?? "ml_service_error", err?.message ?? String(err), err?.retryable === true));

export function createCompareHandler({ chips, captions, captionHandler, comparisons, listModels, classify, score }) {
  return async function compareModels({ chip_id, model_ids = null }, { userId } = {}) {
    const chip = await chips.findById(chip_id);
    if (!chip) throw new JobError("chip_not_found", "Preview image not found.");

    let items;
    try {
      ({ items } = await listModels());
    } catch (err) {
      throw asJobError(err);
    }

    if (model_ids) {
      const unknown = model_ids.filter((id) => !items.some((m) => m.id === id));
      if (unknown.length) throw new JobError("unknown_model", `Unknown model: ${unknown.join(", ")}`);
    }
    const captioners = items.filter((m) => m.tasks.includes("caption") && (!model_ids || model_ids.includes(m.id)));
    const unavailable = captioners.filter((m) => !m.available).map((m) => ({ model_id: m.id, name: m.name, reason: m.unavailable_reason }));
    const runnable = captioners.filter((m) => m.available);
    if (!runnable.length) {
      throw new JobError("no_caption_model", `No caption model is available. ${unavailable.map((u) => `${u.name}: ${u.reason}`).join(" ")}`.trim());
    }

    const results = [];
    for (const m of runnable) {
      try {
        const done = await captionHandler({ chip_id, model_id: m.id }, { userId });
        const row = await captions.findById(done.caption_id);
        results.push({ model_id: m.id, name: m.name, checkpoint: row.checkpoint, caption_id: row.id, text: row.caption, latency_ms: row.latency_ms, device: row.device, reused: done.reused, alignment: null });
      } catch (err) {
        const e = asJobError(err);
        results.push({ model_id: m.id, name: m.name, error: { code: e.code, message: e.message } });
      }
    }
    if (!results.some((r) => r.text)) {
      const first = results[0].error;
      throw new JobError(first.code, `Every available model failed. ${first.message}`);
    }

    let sceneTags = null;
    let sceneModel = null;
    let sceneError = null;
    const matcher = items.find((m) => m.tasks.includes("classify"));
    if (!matcher || !matcher.available) {
      sceneError = { code: "model_unavailable", message: matcher?.unavailable_reason ?? "No image-text matching model is registered." };
    } else {
      try {
        const c = await classify({ image_path: chip.storage_path, model_id: matcher.id, top_k: 5 });
        sceneTags = c.labels;
        sceneModel = { id: c.model_id, checkpoint: c.checkpoint, device: c.device };
        const texts = [...new Set(results.filter((r) => r.text).map((r) => r.text))];
        const s = await score({ image_path: chip.storage_path, model_id: matcher.id, texts });
        for (const r of results) if (r.text) r.alignment = s.scores.find((x) => x.text === r.text)?.similarity ?? null;
      } catch (err) {
        const e = asJobError(err);
        sceneError = { code: e.code, message: e.message };
      }
    }

    const saved = await comparisons.insert({ chip_id, created_by: userId ?? null, results, scene_tags: sceneTags, scene_model: sceneModel, scene_error: sceneError, unavailable });
    return { comparison_id: saved.id };
  };
}
