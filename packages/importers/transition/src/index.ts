/**
 * `@azphalt/importer-transition` — normalize a GL Transition (gl-transitions.com) into a `.azp`
 * asset package. The GLSL source is stored verbatim; its tunable uniforms become an azphalt UI
 * panel plus manifest params, so an adopting host — e.g. Guillotine, the video editor whose
 * clip-to-clip transitions this feeds — renders the controls natively and runs the transition with
 * its own engine. See `spec/package-format.md` § Assets.
 */
import { writeAzp, type WriteResult } from "@azphalt/azp";
import type { Manifest, Panel } from "@azphalt/azdk";
import { parseGlTransition, type ParsedGlTransition } from "./parse-gl-transition.js";
import { isHostBound, uniformsToPanel } from "./ui.js";

const FORMAT = "0.1";

export interface TransitionImportOptions {
  /** Reverse-DNS id, e.g. `"com.hereliesaz.crosswarp"`. Required. */
  id: string;
  /** Display name; defaults to the transition's `name` metadata, then the asset stem. */
  name?: string;
  /** Semver; default `"1.0.0"`. */
  version?: string;
  /** SPDX id for the manifest; default the transition's `License`, then `"MIT"`. */
  license?: string;
  author?: string;
  /** Base name for the stored shader, e.g. `"crosswarp"` -> `assets/crosswarp.glsl`. */
  assetName?: string;
}

export interface TransitionImportResult extends WriteResult {
  parsed: ParsedGlTransition;
  panel: Panel;
}

/** Parse a gl-transition, derive its UI panel, and package it as a `.azp` transition asset. */
export function importGlTransition(
  source: string,
  licenseText: string,
  opts: TransitionImportOptions,
): TransitionImportResult {
  const parsed = parseGlTransition(source);
  const stem = opts.assetName ?? slug(opts.name ?? parsed.name ?? "transition");
  const assetPath = `assets/${stem}.glsl`;
  const uiPath = `ui/${stem}.json`;

  const panel = uniformsToPanel(parsed.uniforms);
  const hasUi = panel.controls.length > 0;

  const manifest: Omit<Manifest, "files"> = {
    azphalt: FORMAT,
    id: opts.id,
    name: opts.name ?? parsed.name ?? stem,
    version: opts.version ?? "1.0.0",
    kind: "asset",
    license: opts.license ?? parsed.license ?? "MIT",
    compat: ">=0.1",
    author: opts.author ?? parsed.author,
    assets: [
      {
        type: "transition",
        path: assetPath,
        ...(hasUi ? { ui: uiPath } : {}),
        params: {
          format: "gl-transition",
          ...(parsed.name ? { title: parsed.name } : {}),
          // Declared uniforms (including host-bound textures the host wires to the clips).
          uniforms: parsed.uniforms.map((u) => ({
            name: u.name,
            type: u.glslType,
            hostBound: isHostBound(u),
          })),
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
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+/, "").replace(/-+$/, "") || "transition";
}

export { parseGlTransition, HOST_PROVIDED } from "./parse-gl-transition.js";
export type { ParsedGlTransition, GlUniform } from "./parse-gl-transition.js";
export { uniformsToPanel, uniformToControl, isHostBound } from "./ui.js";
