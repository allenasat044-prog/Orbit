import { config } from "../config.js";
import { createTokenManager, ProviderAuthError } from "../providers/copernicusAuth.js";

const tokens = createTokenManager({ username: config.copernicusUsername, password: config.copernicusPassword, tokenUrl: config.copernicusTokenUrl });

try {
  await tokens.getToken();
  console.log("Copernicus login OK. Downloads are ready.");
} catch (err) {
  console.error(err instanceof ProviderAuthError ? `Copernicus login failed (${err.code}): ${err.message}` : `Unexpected error: ${err.message}`);
  process.exitCode = 1;
}
