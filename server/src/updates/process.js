import { DEFAULT_MODEL_ID } from "../captions/job.js";

export function createSceneProcessor({ chipHandler, captionHandler, sizePx = 256, modelId = DEFAULT_MODEL_ID }) {
  return async function processScene({ acquisition, region }) {
    const chip = await chipHandler({ acquisition_id: acquisition.id, lon: region.lon, lat: region.lat, size_px: sizePx });
    const caption = await captionHandler({ chip_id: chip.chip_id, model_id: modelId }, { userId: region.created_by });
    return { captionCreated: !caption.reused };
  };
}
