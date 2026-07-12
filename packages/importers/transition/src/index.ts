import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/sdk";

export interface ImportOptions {
  id: string;
  name?: string;
  version: string;
  author: string;
}

/**
 * Packages a gl-transition shader into an .azp asset package.
 */
export function importTransition(shaderText: string, opts: ImportOptions): Uint8Array {
  const payload: Record<string, Uint8Array> = {};
  const encoder = new TextEncoder();
  
  payload["assets/transition.glsl"] = encoder.encode(shaderText);

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "GL Transition",
    version: opts.version,
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [
      {
        type: "transition",
        path: "assets/transition.glsl"
      }
    ]
  };

  const { azp } = writeAzp({ manifest, payload, license: "MIT License" });
  return azp;
}
