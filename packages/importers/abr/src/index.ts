/**
 * `@azphalt/importer-abr` — normalize a Photoshop `.abr` brush into a `.azp` asset package.
 * Unlike `.cube` (stored verbatim), `.abr` is *transcoded*: the sampled brush tip is decoded to a
 * grayscale PNG and its mappable dynamics are lifted into the manifest, per
 * `spec/package-format.md` ("an imported `.abr` becomes `assets/*.png` plus manifest params"). The
 * stroke engine is not portable, so this is a faithful-shape import, not a pixel-match — see
 * RATIONALE § 1.3.
 */
import { writeAzp, type WriteResult } from "@azphalt/azp";
import type { Manifest } from "@azphalt/azdk";
import { parseAbr, UnsupportedAbrError, type AbrBrush } from "./parse-abr.js";
import { encodeGrayPng } from "./png.js";

const FORMAT = "0.1";

export interface AbrImportOptions {
  /** Reverse-DNS id, e.g. `"com.hereliesaz.dry-ink"`. Required. */
  id: string;
  /** Display name; defaults to the brush's own name, then the asset stem. */
  name?: string;
  /** Semver; default `"1.0.0"`. */
  version?: string;
  /** SPDX id for the manifest; default `"MIT"`. */
  license?: string;
  author?: string;
  /** Base name for the stored tip, e.g. `"dry-ink"` -> `assets/dry-ink.png`. */
  assetName?: string;
  /** Which sampled brush to import when the file holds several (default 0). */
  brushIndex?: number;
}

export interface AbrImportResult extends WriteResult {
  /** The parsed brush that was imported (metadata + decoded tip). */
  brush: AbrBrush;
}

/** Parse `abrBytes`, decode its sampled tip to a PNG, and package it as a `.azp` asset. */
export function importAbr(abrBytes: Uint8Array, licenseText: string, opts: AbrImportOptions): AbrImportResult {
  const parsed = parseAbr(abrBytes);
  const sampled = parsed.brushes.filter((b) => b.kind === "sampled" && b.gray);
  if (sampled.length === 0) {
    throw new UnsupportedAbrError("no sampled brush bitmap to import (computed-only .abr?)");
  }
  const index = opts.brushIndex ?? 0;
  const brush = sampled[index];
  if (!brush) throw new UnsupportedAbrError(`brushIndex ${index} out of range (${sampled.length} sampled brushes)`);

  const stem = opts.assetName ?? slug(opts.name ?? brush.name ?? "brush");
  const assetPath = `assets/${stem}.png`;
  const png = encodeGrayPng(brush.width, brush.height, brush.gray!);

  const manifest: Omit<Manifest, "files"> = {
    azphalt: FORMAT,
    id: opts.id,
    name: opts.name ?? brush.name ?? stem,
    version: opts.version ?? "1.0.0",
    kind: "asset",
    license: opts.license ?? "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [
      {
        type: "brush",
        path: assetPath,
        params: {
          format: "png-gray",
          width: brush.width,
          height: brush.height,
          ...(brush.spacing != null ? { spacing: brush.spacing } : {}),
          ...(brush.params ?? {}),
        },
      },
    ],
  };

  const result = writeAzp({ manifest, payload: { [assetPath]: png }, license: licenseText });
  return { ...result, brush };
}

/** Filesystem-safe stem: lowercase, runs of non-alphanumerics to single hyphens. */
function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+/, "").replace(/-+$/, "") || "brush";
}

export { parseAbr, UnsupportedAbrError } from "./parse-abr.js";
export type { AbrBrush, AbrBounds, AbrFile } from "./parse-abr.js";
export { encodeGrayPng } from "./png.js";
