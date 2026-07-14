import { example, utf8, type Example } from "../shared.js";

/**
 * A real ISF (Interactive Shader Format) fragment shader: GLSL preceded by a top-of-file JSON
 * metadata block `/*{ ... }*\/` that declares INPUTS the host renders as controls. This one warps
 * the input image with a radial ripple driven by `TIME` and an `amplitude`/`frequency` pair.
 */
const RIPPLE_ISF = `/*{
    "DESCRIPTION": "Radial ripple that distorts the input image outward from a movable center.",
    "CREDIT": "azphalt examples",
    "ISFVSN": "2",
    "CATEGORIES": ["Distortion", "Stylize"],
    "INPUTS": [
        { "NAME": "inputImage", "TYPE": "image" },
        { "NAME": "amplitude", "TYPE": "float", "DEFAULT": 0.03, "MIN": 0.0, "MAX": 0.2 },
        { "NAME": "frequency", "TYPE": "float", "DEFAULT": 12.0, "MIN": 1.0, "MAX": 40.0 },
        { "NAME": "center", "TYPE": "point2D", "DEFAULT": [0.5, 0.5] }
    ]
}*/

void main() {
    vec2 uv = isf_FragNormCoord;
    vec2 delta = uv - center;
    float dist = length(delta);
    float ripple = sin(dist * frequency - TIME * 3.0) * amplitude;
    vec2 offset = normalize(delta + 1e-6) * ripple;
    gl_FragColor = IMG_NORM_PIXEL(inputImage, uv + offset);
}
`;

/** A plain GLSL fragment shader (no ISF metadata): an animated plasma from summed sine waves. */
const PLASMA_GLSL = `precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float v = sin(uv.x * 10.0 + u_time)
            + sin(uv.y * 10.0 + u_time * 1.3)
            + sin((uv.x + uv.y) * 8.0 - u_time * 0.7);
    v *= 0.33333;
    vec3 col = 0.5 + 0.5 * cos(6.2831853 * (v + vec3(0.0, 0.33, 0.67)));
    gl_FragColor = vec4(col, 1.0);
}
`;

/** The control panel the host renders for the ISF shader's numeric INPUTS. */
const RIPPLE_UI = JSON.stringify(
  {
    controls: [
      { type: "slider", key: "amplitude", label: "Amplitude", min: 0, max: 0.2, step: 0.005, default: 0.03 },
      { type: "slider", key: "frequency", label: "Frequency", min: 1, max: 40, step: 1, default: 12 },
    ],
  },
  null,
  2,
);

/** `shader` — a GPU fragment shader asset, either ISF (with a UI panel) or plain GLSL. */
export const shaders: Example[] = [
  example({
    slug: "shader-ripple",
    summary: "An ISF ripple distortion shader with declared INPUTS and a control panel.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.shader-ripple",
      name: "Ripple (ISF)",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "An Interactive Shader Format ripple that warps the image around a movable center.",
      author: "azphalt examples",
      capabilities: ["assets", "bitmap"],
      assets: [
        {
          type: "shader",
          path: "assets/shader-ripple.fs",
          params: { format: "isf" },
          ui: "ui/panel.json",
          tags: ["isf", "distortion", "animated"],
        },
      ],
    },
    payload: { "assets/shader-ripple.fs": utf8(RIPPLE_ISF), "ui/panel.json": utf8(RIPPLE_UI) },
  }),
  example({
    slug: "shader-plasma",
    summary: "A plain GLSL fragment shader that paints an animated sine-wave plasma.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.shader-plasma",
      name: "Plasma (GLSL)",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A classic plasma effect from summed sine waves, in portable GLSL.",
      author: "azphalt examples",
      capabilities: ["assets", "bitmap"],
      assets: [
        {
          type: "shader",
          path: "assets/shader-plasma.fs",
          params: { format: "glsl" },
          tags: ["glsl", "generative", "animated"],
        },
      ],
    },
    payload: { "assets/shader-plasma.fs": utf8(PLASMA_GLSL) },
  }),
];
