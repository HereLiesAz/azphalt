/**
 * `@azphalt/importer-isf` — normalize an ISF / GLSL fragment shader into a `.azp` asset package.
 * The shader source is stored verbatim; its ISF `INPUTS` become an azphalt UI panel plus manifest
 * params, so an adopting host (a paint app, or Guillotine the video editor) renders the controls
 * natively and applies the shader with its own engine. See `spec/package-format.md` § Assets.
 */
import { writeAzp, type WriteResult } from "@azphalt/azp";
import type { Manifest, Panel } from "@azphalt/azdk";
import { parseIsf, type ParsedIsf } from "./parse-isf.js";
import { inputsToPanel, isHostBound } from "./ui.js";

const FORMAT = "0.1";

export interface IsfImportOptions {
  /** Reverse-DNS id, e.g. `"com.hereliesaz.teal-grade"`. Required. */
  id: string;
  /** Display name; defaults to the ISF `DESCRIPTION`, then the asset stem. */
  name?: string;
  /** Semver; default `"1.0.0"`. */
  version?: string;
  /** SPDX id for the manifest; default `"MIT"`. */
  license?: string;
  author?: string;
  /** Base name for the stored shader, e.g. `"teal-grade"` -> `assets/teal-grade.fs`. */
  assetName?: string;
  /** Extension for the stored shader file; default `".fs"`. */
  ext?: string;
}

export interface IsfImportResult extends WriteResult {
  /** The parsed shader (header + inputs + body). */
  parsed: ParsedIsf;
  /** The generated UI panel (empty `controls` for raw GLSL or a shader with no user inputs). */
  panel: Panel;
}

/** Parse `source`, derive its UI panel, and package it as a `.azp` shader asset. */
export function importIsf(source: string, licenseText: string, opts: IsfImportOptions): IsfImportResult {
  const parsed = parseIsf(source);
  const stem = opts.assetName ?? slug(opts.name ?? parsed.header.DESCRIPTION ?? "shader");
  const ext = opts.ext ?? ".fs";
  const assetPath = `assets/${stem}${ext}`;
  const uiPath = `ui/${stem}.json`;

  const panel = inputsToPanel(parsed.inputs);
  const hasUi = panel.controls.length > 0;

  const manifest: Omit<Manifest, "files"> = {
    azphalt: FORMAT,
    id: opts.id,
    name: opts.name ?? parsed.header.DESCRIPTION ?? stem,
    version: opts.version ?? "1.0.0",
    kind: "asset",
    license: opts.license ?? "MIT",
    compat: ">=0.1",
    author: opts.author,
    assets: [
      {
        type: "shader",
        path: assetPath,
        ...(hasUi ? { ui: uiPath } : {}),
        params: {
          format: parsed.hasIsfHeader ? "isf" : "glsl",
          ...(parsed.header.ISFVSN ? { isfvsn: parsed.header.ISFVSN } : {}),
          ...(parsed.header.CATEGORIES ? { categories: parsed.header.CATEGORIES } : {}),
          ...(parsed.header.DESCRIPTION ? { description: parsed.header.DESCRIPTION } : {}),
          ...(parsed.header.PASSES ? { passes: parsed.header.PASSES } : {}),
          // Declared inputs (including host-bound ones the host wires to the clip/media).
          inputs: parsed.inputs.map((i) => ({ name: i.NAME, type: i.TYPE, hostBound: isHostBound(i) })),
        },
      },
    ],
  };

  const payload: Record<string, Uint8Array> = { [assetPath]: new TextEncoder().encode(source) };
  if (hasUi) payload[uiPath] = new TextEncoder().encode(JSON.stringify(panel, null, 2) + "\n");

  const result = writeAzp({ manifest, payload, license: licenseText });
  return { ...result, parsed, panel };
}

/** Filesystem-safe stem: lowercase, runs of non-alphanumerics to single hyphens. */
function slug(s: string): string {
  // The prior collapse leaves at most one leading/trailing hyphen, so trim a single one — `/^-+/`,
  // `/-+$/` would backtrack polynomially on a crafted run (CodeQL js/polynomial-redos).
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-/, "").replace(/-$/, "") || "shader";
}

export { parseIsf } from "./parse-isf.js";
export type { ParsedIsf, IsfInput, IsfHeader, IsfInputType } from "./parse-isf.js";
export { inputsToPanel, inputToControl, isHostBound, vec4ToHex } from "./ui.js";
