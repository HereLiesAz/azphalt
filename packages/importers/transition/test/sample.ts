/** A representative gl-transition exercising the uniform types + host-bound texture, for tests. */
export const GL = `// Author: Az
// License: MIT
// name: SimpleFade
uniform float intensity; // = 0.3
uniform int steps; // = 4
uniform bool reversed; // = false
uniform vec4 color; // = vec4(0.0, 0.0, 0.0, 1.0)
uniform vec2 direction; // = vec2(1.0, 0.0)
uniform sampler2D mask;

vec4 transition(vec2 uv) {
  return mix(getFromColor(uv), getToColor(uv), progress * intensity);
}
`;

export const LICENSE = "MIT License\n\nCopyright (c) 2026 Az\n";
