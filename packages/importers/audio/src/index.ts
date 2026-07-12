import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/sdk";

export interface ImportOptions {
  id: string;
  name?: string;
  version: string;
  author: string;
  filename: string;
  tags?: string[];
}

/**
 * Packages an audio file (.wav, .mp3, .ogg) into an .azp asset package.
 */
export function importAudio(bytes: Uint8Array, opts: ImportOptions): Uint8Array {
  const extMatch = opts.filename.match(/\.([^.]+)$/);
  const ext = extMatch ? extMatch[1].toLowerCase() : "wav";
  
  const payload: Record<string, Uint8Array> = {
    [`assets/audio.${ext}`]: bytes
  };

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "Audio Asset",
    version: opts.version,
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [
      {
        type: "audio",
        path: `assets/audio.${ext}`,
        ...(opts.tags && opts.tags.length > 0 ? { tags: opts.tags } : {})
      }
    ]
  };

  const { azp } = writeAzp({ manifest, payload, license: "MIT License" });
  return azp;
}
