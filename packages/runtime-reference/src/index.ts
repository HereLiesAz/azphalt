import { readAzp, verifyAzp } from "@azphalt/azp";
import { buildGrantedHost } from "./capability-gate.js";
import { FakeHost } from "./fake-host.js";
import { writeFileSync, unlinkSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";
import type { Host, FilterContext } from "@azphalt/sdk";

export { FakeHost } from "./fake-host.js";
export { buildGrantedHost } from "./capability-gate.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface RuntimeResult {
  host: Host;
  scopedHost: Partial<Host>;
}

export async function runAzp(azpBytes: Uint8Array): Promise<RuntimeResult> {
  const verify = verifyAzp(azpBytes);
  if (!verify.ok) {
    throw new Error(`AZP verification failed: ${verify.errors.join(", ")}`);
  }

  const { manifest, payload } = readAzp(azpBytes);

  // 1. Build the full fake host
  const fullHost = new FakeHost(payload);

  // 2. Extract UI params and populate default values
  // Find the first filter UI panel if it exists
  const filterContrib = manifest.contributes?.filters?.[0];
  if (filterContrib?.ui && payload[filterContrib.ui]) {
    const uiJson = new TextDecoder().decode(payload[filterContrib.ui]);
    const panel = JSON.parse(uiJson);
    fullHost.params.setValuesFromUI(panel.controls || []);
  }

  // 3. Capability gating
  const scopedHost = buildGrantedHost(fullHost, manifest.capabilities);

  // 4. Execution
  if (manifest.kind === "code" || manifest.kind === "mixed") {
    if (manifest.runtime === "js" && manifest.entry && payload[manifest.entry]) {
      const code = new TextDecoder().decode(payload[manifest.entry]);
      
      // We use a temp file to utilize Node's native ESM dynamic import()
      // This naturally resolves "@azphalt/sdk" via the workspace node_modules
      const tempId = randomUUID();
      const tempPath = join(__dirname, `__temp_${tempId}.mjs`);
      writeFileSync(tempPath, code);

      try {
        const module = await import("file://" + tempPath);
        
        let filterFn: any = null;
        for (const exp of Object.values(module)) {
          if (typeof exp === "function" && (exp as any)[Symbol.for("azphalt.contribution")] === "filter") {
            filterFn = exp;
            break;
          }
        }

        if (filterFn) {
          // Prepare context
          const ctx: FilterContext = {
            ...scopedHost,
            target: fullHost.layers.active()
          } as FilterContext; // Cast because scopedHost might be missing some APIs, which is intended

          await filterFn(ctx);
        }
      } finally {
        unlinkSync(tempPath);
      }
    }
  }

  return { host: fullHost, scopedHost };
}
