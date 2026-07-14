import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/azdk";

export interface ImportOptions {
  id: string;
  name?: string;
  version: string;
  author: string;
  /** SPDX id for the manifest; default `"MIT"`. */
  license?: string;
  /** Full license text stored as the package's `LICENSE`. */
  licenseText?: string;
}

/**
 * Packages a JSON motion/easing preset into an .azp asset package. The input must
 * be a cubic-bezier control array `[x1, y1, x2, y2]`; the four values are lifted
 * into the asset params so a host can read the curve without opening the payload.
 */
export function importMotion(jsonStr: string, opts: ImportOptions): Uint8Array {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    throw new Error("Motion preset must be valid JSON.");
  }

  if (
    !Array.isArray(parsed) ||
    parsed.length !== 4 ||
    !parsed.every((n: unknown): n is number => typeof n === "number")
  ) {
    throw new Error(
      "Motion preset must be a cubic-bezier numeric array of length 4. e.g. [0.25, 0.1, 0.25, 1.0]"
    );
  }

  const bezier: [number, number, number, number] = [parsed[0], parsed[1], parsed[2], parsed[3]];

  // For a valid easing curve the X control coords must lie in [0, 1] (the Y may overshoot for
  // bounce). An out-of-range X makes the curve non-monotonic and can crash animation runtimes.
  if (bezier[0] < 0 || bezier[0] > 1 || bezier[2] < 0 || bezier[2] > 1) {
    throw new Error("Cubic-bezier X coordinates (x1, x2) must be between 0 and 1.");
  }

  const payload: Record<string, Uint8Array> = {
    "assets/motion.json": new TextEncoder().encode(JSON.stringify(bezier))
  };

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "Motion Preset",
    version: opts.version,
    kind: "asset",
    license: opts.license ?? "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [
      {
        type: "motion",
        path: "assets/motion.json",
        params: {
          format: "cubic-bezier",
          bezier
        }
      }
    ]
  };

  const { azp } = writeAzp({
    manifest,
    payload,
    license: opts.licenseText ?? `${opts.license ?? "MIT"}\n\nProvide the full license text.\n`
  });
  return azp;
}
