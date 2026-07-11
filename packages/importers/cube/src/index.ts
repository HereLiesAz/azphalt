/**
 * `@azphalt/importer-cube` — normalize a `.cube` LUT into a `.azp` asset package.
 * `.cube` is already the portable color-transform interchange, so normalization is
 * 1:1: validate/parse for metadata, store the original bytes, and wrap them in a
 * manifest. See RATIONALE § 1.3.
 */
import { writeAzp, type WriteResult } from "@azphalt/azp";
import type { Manifest } from "@azphalt/sdk";
import { parseCube, type CubeLut } from "./parse-cube.js";

/** Manifest/format version this importer targets. */
const FORMAT = "0.1";

export interface ImportOptions {
  /** Reverse-DNS id, e.g. `"com.hereliesaz.teal-fade"`. Required. */
  id: string;
  /** Display name; defaults to the LUT's TITLE, then the asset stem. */
  name?: string;
  /** Semver; default `"1.0.0"`. */
  version?: string;
  /** SPDX id for the manifest; default `"MIT"`. */
  license?: string;
  author?: string;
  /** Base name for the stored asset, e.g. `"teal-fade"` -> `assets/teal-fade.cube`. */
  assetName?: string;
}

export interface ImportResult extends WriteResult {
  /** The parsed LUT (metadata + table), for inspection. */
  lut: CubeLut;
}

/** Parse `cubeText`, then package it as a `.azp` with `licenseText` as the LICENSE. */
export function importCube(cubeText: string, licenseText: string, opts: ImportOptions): ImportResult {
  const lut = parseCube(cubeText);
  const stem = opts.assetName ?? slug(opts.name ?? lut.title ?? "lut");
  const assetPath = `assets/${stem}.cube`;

  const manifest: Omit<Manifest, "files"> = {
    azphalt: FORMAT,
    id: opts.id,
    name: opts.name ?? lut.title ?? stem,
    version: opts.version ?? "1.0.0",
    kind: "asset",
    license: opts.license ?? "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [
      {
        type: "lut",
        path: assetPath,
        params: {
          format: "cube",
          dimensions: lut.dimensions,
          size: lut.size,
          domainMin: lut.domainMin,
          domainMax: lut.domainMax,
          ...(lut.title ? { title: lut.title } : {}),
        },
      },
    ],
  };

  const result = writeAzp({
    manifest,
    payload: { [assetPath]: new TextEncoder().encode(cubeText) },
    license: licenseText,
  });
  return { ...result, lut };
}

/** Filesystem-safe stem: lowercase, runs of non-alphanumerics to single hyphens. */
function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "lut";
}

export { parseCube } from "./parse-cube.js";
export type { CubeLut } from "./parse-cube.js";
