import { CopernicusProvider } from "./copernicus.js";

export function createProviders(config) {
  const list = [
    new CopernicusProvider({
      stacUrl: config.copernicusStacUrl,
      timeoutMs: config.providerTimeoutMs,
      retries: config.providerRetries,
    }),
  ];
  return new Map(list.map((p) => [p.id, p]));
}
