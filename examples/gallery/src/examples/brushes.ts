import { example, TINY_PNG, type Example } from "../shared.js";

/** `brush` — a bitmap tip plus normalized dynamics a host's paint engine stamps along a stroke. */
export const brushes: Example[] = [
  example({
    slug: "brush-round",
    summary: "A round soft brush with pressure-driven flow.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.brush-round",
      name: "Round Soft",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A soft round tip with tight spacing and pressure-driven flow.",
      author: "azphalt examples",
      capabilities: ["assets", "bitmap"],
      assets: [
        {
          type: "brush",
          path: "assets/brush-round.png",
          tags: ["round", "soft", "pressure"],
          params: { spacing: 0.05, angle: 0, roundness: 1, flowByPressure: true },
        },
      ],
    },
    payload: { "assets/brush-round.png": TINY_PNG },
  }),
  example({
    slug: "brush-sumi",
    summary: "A textured sumi brush with an angled elliptical tip.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.brush-sumi",
      name: "Sumi Ink",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A textured ink tip with an angled, flattened profile for expressive strokes.",
      author: "azphalt examples",
      capabilities: ["assets", "bitmap"],
      assets: [
        {
          type: "brush",
          path: "assets/brush-sumi.png",
          tags: ["sumi", "ink", "textured"],
          params: { spacing: 0.12, angle: 35, roundness: 0.45, flowByPressure: true },
        },
      ],
    },
    payload: { "assets/brush-sumi.png": TINY_PNG },
  }),
];
