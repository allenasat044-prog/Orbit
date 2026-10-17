import { ImageryProvider } from "./base.js";

export class CopernicusProvider extends ImageryProvider {
  constructor({ stacUrl, timeoutMs }) {
    super({ id: "copernicus", name: "Copernicus Data Space Ecosystem" });
    this.stacUrl = stacUrl;
    this.timeoutMs = timeoutMs;
  }

  async healthCheck() {
    const res = await fetch(this.stacUrl, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(this.timeoutMs),
    });
    if (!res.ok) throw new Error(`STAC root responded with ${res.status}`);
    const body = await res.json();
    return { stac_version: body.stac_version ?? null, title: body.title ?? null };
  }
}
