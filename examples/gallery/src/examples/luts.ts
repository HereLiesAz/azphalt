import { example, utf8, type Example } from "../shared.js";

const CUBE_3D = `TITLE "Teal & Orange"
LUT_3D_SIZE 2
0.02 0.05 0.10
1.00 0.55 0.20
0.00 0.35 0.40
1.00 0.80 0.55
0.05 0.25 0.45
1.00 0.60 0.30
0.10 0.55 0.60
1.00 0.95 0.80
`;

const CUBE_1D = `TITLE "S-Curve Contrast"
LUT_1D_SIZE 4
0.00 0.00 0.00
0.22 0.18 0.20
0.80 0.82 0.80
1.00 1.00 1.00
`;

/** `lut` — a `.cube` color transform applied by a host's color pipeline. */
export const luts: Example[] = [
  example({
    slug: "lut-teal-orange",
    summary: "A cinematic teal-and-orange 3D color grade (.cube, 3D).",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.teal-orange",
      name: "Teal & Orange",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A portable 3D LUT that pushes shadows teal and skin tones warm.",
      author: "azphalt examples",
      capabilities: ["assets", "bitmap"],
      assets: [{ type: "lut", path: "assets/teal-orange.cube", tags: ["cinematic", "grade"] }],
    },
    payload: { "assets/teal-orange.cube": utf8(CUBE_3D) },
  }),
  example({
    slug: "lut-s-curve",
    summary: "A gentle S-curve contrast boost (.cube, 1D).",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.s-curve",
      name: "S-Curve Contrast",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A 1D LUT that lifts contrast without clipping the extremes.",
      author: "azphalt examples",
      capabilities: ["assets", "bitmap"],
      assets: [{ type: "lut", path: "assets/s-curve.cube", tags: ["contrast", "tone"] }],
    },
    payload: { "assets/s-curve.cube": utf8(CUBE_1D) },
  }),
];
