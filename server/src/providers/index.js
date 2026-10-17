import { CopernicusProvider } from "./copernicus.js";

export function createProviders(config) {
  const list = [new CopernicusProvider({ stacUrl: config.copernicusStacUrl, timeoutMs: config.healthTimeoutMs })];
  return new Map(list.map((p) => [p.id, p]));
}
