import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/sdk";

export interface ImportOptions {
  id: string;
  name?: string;
  version: string;
  author: string;
}

/**
 * Packages a JSON motion/easing preset into an .azp asset package.
 */
export function importMotion(jsonStr: string, opts: ImportOptions): Uint8Array {
  // Validate it's a valid cubic bezier array [x1, y1, x2, y2]
  let parsed: any;
  try {
    parsed = JSON.parse(jsonStr);
  } catch (e) {
    throw new Error("Motion preset must be valid JSON.");
  }
  
  if (!Array.isArray(parsed) || parsed.length !== 4 || !parsed.every(n => typeof n === "number")) {
    throw new Error("Motion preset must be a cubic-bezier numeric array of length 4. e.g. [0.25, 0.1, 0.25, 1.0]");
  }
  
  const payload: Record<string, Uint8Array> = {
    "assets/motion.json": new TextEncoder().encode(JSON.stringify(parsed))
  };

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "Motion Preset",
    version: opts.version,
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [
      {
        type: "motion",
        path: "assets/motion.json"
      }
    ]
  };

  const { azp } = writeAzp({ manifest, payload, license: "MIT License" });
  return azp;
}
