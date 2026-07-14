/**
 * `@azphalt/importer-audio` — package an audio file into a `.azp` asset package.
 *
 * The format is sniffed from the actual leading bytes (WAV `RIFF`/`WAVE`, MP3 `ID3`
 * or MPEG frame sync, OGG `OggS`, FLAC `fLaC`), never from the filename, and
 * unrecognized bytes are rejected. See RATIONALE § 1.3.
 */
import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/sdk";

export interface ImportOptions {
  id: string;
  name?: string;
  version: string;
  author: string;
  /** Original filename, retained for provenance only. NOT used for format detection. */
  filename?: string;
  /** Optional marketplace tags (e.g. `["sfx", "impact"]`). */
  tags?: string[];
  /** SPDX id for the manifest; default `"MIT"`. */
  license?: string;
  /** Full license text stored as the package `LICENSE`; default derived from `license`. */
  licenseText?: string;
}

/** Sniff the audio format from its leading bytes. Throws if it isn't recognized. */
function detectAudioFormat(bytes: Uint8Array): string {
  // WAV: a RIFF container whose form type is WAVE.
  if (asciiAt(bytes, 0, 4) === "RIFF" && asciiAt(bytes, 8, 12) === "WAVE") return "wav";
  // MP3: an ID3v2 tag, or a bare MPEG audio frame sync (11 set bits).
  if (asciiAt(bytes, 0, 3) === "ID3") return "mp3";
  if (bytes.length >= 2 && bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0) return "mp3";
  // OGG: the "OggS" capture pattern.
  if (asciiAt(bytes, 0, 4) === "OggS") return "ogg";
  // FLAC: the "fLaC" stream marker.
  if (asciiAt(bytes, 0, 4) === "fLaC") return "flac";
  throw new Error("unrecognized audio format");
}

/**
 * Packages an audio file into an `.azp` asset package. The format is detected from
 * `bytes` (WAV/MP3/OGG/FLAC); unrecognized bytes throw.
 */
export function importAudio(bytes: Uint8Array, opts: ImportOptions): Uint8Array {
  const format = detectAudioFormat(bytes);
  const assetPath = `assets/audio.${format}`;

  const payload: Record<string, Uint8Array> = { [assetPath]: bytes };

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "Audio Asset",
    version: opts.version,
    kind: "asset",
    license: opts.license ?? "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [
      {
        type: "audio",
        path: assetPath,
        params: { format },
        ...(opts.tags && opts.tags.length > 0 ? { tags: opts.tags } : {}),
      },
    ],
  };

  const { azp } = writeAzp({
    manifest,
    payload,
    license: opts.licenseText ?? `${opts.license ?? "MIT"}\n\nProvide the full license text.\n`,
  });
  return azp;
}

/** Decode `bytes[start, end)` as ASCII, or `""` if the buffer is too short. */
function asciiAt(bytes: Uint8Array, start: number, end: number): string {
  if (bytes.length < end) return "";
  let s = "";
  for (let i = start; i < end; i++) s += String.fromCharCode(bytes[i]);
  return s;
}
