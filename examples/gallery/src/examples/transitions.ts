import { example, utf8, type Example } from "../shared.js";

/**
 * A gl-transitions crossfade: the canonical dissolve. gl-transitions supply `getFromColor(uv)` /
 * `getToColor(uv)`, a `progress` in `[0,1]`, and the viewport `ratio`; the shader implements
 * `vec4 transition(vec2 uv)`. Here we simply blend the two frames by `progress`.
 */
const CROSSFADE_GLSL = `// Crossfade — the canonical dissolve between two frames.
// Author: azphalt examples
// License: MIT

vec4 transition(vec2 uv) {
  return mix(getFromColor(uv), getToColor(uv), progress);
}
`;

/**
 * A gl-transitions radial wipe: a soft-edged disc grows from the center, aspect-corrected with the
 * `ratio` uniform so the wipe front stays circular on any canvas.
 */
const RADIAL_WIPE_GLSL = `// Radial wipe — a soft disc grows from the center, aspect-corrected via \`ratio\`.
// Author: azphalt examples
// License: MIT

uniform float smoothness; // = 0.05

const vec2 center = vec2(0.5, 0.5);

vec4 transition(vec2 uv) {
  // Scale x by the viewport aspect so the wipe front stays circular.
  vec2 p = (uv - center) * vec2(ratio, 1.0);
  float dist = length(p);
  // Farthest corner distance, so progress = 1 fully covers the frame.
  float maxDist = length(vec2(0.5 * ratio, 0.5)) + smoothness;
  float radius = progress * maxDist;
  float edge = 1.0 - smoothstep(radius - smoothness, radius, dist);
  return mix(getFromColor(uv), getToColor(uv), edge);
}
`;

/** `transition` — a gl-transitions GLSL shader blending a from-frame and a to-frame by `progress`. */
export const transitions: Example[] = [
  example({
    slug: "transition-crossfade",
    summary: "A gl-transitions crossfade that blends two frames by `progress`.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.transition-crossfade",
      name: "Crossfade",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A gl-transitions dissolve: linearly mix from-frame to to-frame over progress.",
      author: "azphalt examples",
      capabilities: ["assets", "bitmap"],
      assets: [
        {
          type: "transition",
          path: "assets/transition-crossfade.glsl",
          params: { format: "gl-transition" },
          tags: ["dissolve", "fade"],
        },
      ],
    },
    payload: { "assets/transition-crossfade.glsl": utf8(CROSSFADE_GLSL) },
  }),
  example({
    slug: "transition-radial-wipe",
    summary: "A gl-transitions radial wipe with a soft edge, aspect-corrected via `ratio`.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.transition-radial-wipe",
      name: "Radial Wipe",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A gl-transitions circular wipe that expands from the center, corrected by ratio.",
      author: "azphalt examples",
      capabilities: ["assets", "bitmap"],
      assets: [
        {
          type: "transition",
          path: "assets/transition-radial-wipe.glsl",
          params: { format: "gl-transition" },
          tags: ["wipe", "radial"],
        },
      ],
    },
    payload: { "assets/transition-radial-wipe.glsl": utf8(RADIAL_WIPE_GLSL) },
  }),
];
