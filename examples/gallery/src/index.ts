/**
 * The example gallery: several example `.azp` packages per asset type and per extension kind. Import
 * each group and flatten into {@link EXAMPLES}. The build script packages them; the test verifies and
 * runs them. See `readme.md` for the catalog.
 */
import type { Example } from "./shared.js";

// ── code extensions ──
import { filters } from "./examples/filters.js";
import { tools } from "./examples/tools.js";
import { commands } from "./examples/commands.js";
import { wasm } from "./examples/wasm.js";

// ── assets ──
import { luts } from "./examples/luts.js";
import { shaders } from "./examples/shaders.js";
import { transitions } from "./examples/transitions.js";
import { vectors } from "./examples/vectors.js";
import { palettes } from "./examples/palettes.js";
import { meshes } from "./examples/meshes.js";
import { materials } from "./examples/materials.js";
import { motions } from "./examples/motions.js";
import { brushes } from "./examples/brushes.js";
import { patterns } from "./examples/patterns.js";
import { stamps } from "./examples/stamps.js";
import { images } from "./examples/images.js";
import { hdris } from "./examples/hdris.js";
import { videos } from "./examples/videos.js";
import { audios } from "./examples/audios.js";
import { fonts } from "./examples/fonts.js";
import { models } from "./examples/models.js";

/** Every example, grouped by kind then asset type. */
export const EXAMPLES: Example[] = [
  // code extensions (js filters/tools/commands + raw wasm)
  ...filters,
  ...tools,
  ...commands,
  ...wasm,
  // assets
  ...luts,
  ...shaders,
  ...transitions,
  ...vectors,
  ...palettes,
  ...meshes,
  ...materials,
  ...motions,
  ...brushes,
  ...patterns,
  ...stamps,
  ...images,
  ...hdris,
  ...videos,
  ...audios,
  ...fonts,
  ...models,
];

export type { Example } from "./shared.js";
