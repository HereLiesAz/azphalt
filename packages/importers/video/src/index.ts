/**
 * `@azphalt/importer-video` — package a video container into a `.azp` asset package.
 *
 * The container is sniffed from the actual leading bytes (ISO-BMFF `ftyp` box or the
 * Matroska/WebM EBML magic), never from the filename, and unrecognized bytes are
 * rejected. See RATIONALE § 1.3.
 */
import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/azdk";

export interface ImportOptions {
  id: string;
  name?: string;
  version: string;
  author: string;
  /** Original filename, retained for provenance only. NOT used for format detection. */
  filename?: string;
  /** SPDX id for the manifest; default `"MIT"`. */
  license?: string;
  /** Full license text stored as the package `LICENSE`; default derived from `license`. */
  licenseText?: string;
}

/** A recognized video container, derived from the file's magic bytes. */
interface VideoFormat {
  /** Filesystem extension, e.g. `"mp4"`, `"mov"`, `"webm"`. */
  ext: string;
  /** ISO-BMFF major brand (e.g. `"isom"`, `"qt  "`), when the container carries one. */
  brand?: string;
}

/** Sniff the video container from its leading bytes. Throws if it isn't recognized. */
function detectVideoFormat(bytes: Uint8Array): VideoFormat {
  // ISO-BMFF (MP4/MOV): a `ftyp` box tag at bytes 4..8, major brand at bytes 8..12.
  if (asciiAt(bytes, 4, 8) === "ftyp") {
    const brand = asciiAt(bytes, 8, 12);
    const ext = brand.startsWith("qt") ? "mov" : "mp4";
    return { ext, brand };
  }
  // Matroska/WebM: EBML magic 0x1A 0x45 0xDF 0xA3.
  if (
    bytes.length >= 4 &&
    bytes[0] === 0x1a &&
    bytes[1] === 0x45 &&
    bytes[2] === 0xdf &&
    bytes[3] === 0xa3
  ) {
    return { ext: "webm" };
  }
  throw new Error("unrecognized video container");
}

/**
 * Packages a video into an `.azp` asset package. The container format is detected from
 * `bytes` (MP4/MOV via ISO-BMFF `ftyp`, WebM via EBML); unrecognized bytes throw.
 */
export function importVideo(bytes: Uint8Array, opts: ImportOptions): Uint8Array {
  const { ext, brand } = detectVideoFormat(bytes);
  const assetPath = `assets/video.${ext}`;

  const payload: Record<string, Uint8Array> = { [assetPath]: bytes };

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: opts.name || "Video Asset",
    version: opts.version,
    kind: "asset",
    license: opts.license ?? "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [
      {
        type: "video",
        path: assetPath,
        params: { format: ext, ...(brand ? { brand } : {}) },
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
