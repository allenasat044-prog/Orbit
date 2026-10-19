import { JobError } from "../imagery/chipJob.js";
import { promptKey } from "./repo.js";

export const DEFAULT_MODEL_ID = "smolvlm-instruct";

export function createCaptionHandler({ chips, captions, mlCaption }) {
  return async function generateCaption({ chip_id, model_id = DEFAULT_MODEL_ID, prompt = null }, { userId } = {}) {
    const chip = await chips.findById(chip_id);
    if (!chip) throw new JobError("chip_not_found", "Preview image not found.");
    const key = promptKey(prompt);
    const existing = await captions.find(chip.id, model_id, key);
    if (existing) return { caption_id: existing.id, reused: true };

    let r;
    try {
      r = await mlCaption({ image_path: chip.storage_path, model_id, prompt: prompt ?? undefined });
    } catch (err) {
      throw err instanceof JobError ? err : new JobError(err.code ?? "ml_service_error", err.message, err.retryable === true);
    }
    const { caption, created } = await captions.insert({
      chip_id: chip.id,
      acquisition_id: chip.acquisition_id,
      model_id: r.model_id ?? model_id,
      checkpoint: r.checkpoint,
      revision: r.revision,
      device: r.device,
      dtype: r.dtype,
      prompt: r.prompt ?? prompt ?? "",
      prompt_key: key,
      caption: r.text,
      latency_ms: r.latency_ms,
      created_by: userId ?? null,
    });
    return { caption_id: caption.id, reused: !created };
  };
}
