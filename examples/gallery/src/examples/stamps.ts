import { example, TINY_PNG, type Example } from "../shared.js";

/** `stamp` — a single bitmap decal a host places once per click rather than stroking. */
export const stamps: Example[] = [
  example({
    slug: "stamp-star",
    summary: "A five-point star decal.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.stamp-star",
      name: "Star",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A crisp five-point star for accents and sparkle.",
      author: "azphalt examples",
      capabilities: ["assets", "bitmap"],
      assets: [{ type: "stamp", path: "assets/stamp-star.png", tags: ["star", "decal", "accent"] }],
    },
    payload: { "assets/stamp-star.png": TINY_PNG },
  }),
  example({
    slug: "stamp-leaf",
    summary: "A single leaf decal.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.stamp-leaf",
      name: "Leaf",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A single leaf decal for foliage and organic detailing.",
      author: "azphalt examples",
      capabilities: ["assets", "bitmap"],
      assets: [{ type: "stamp", path: "assets/stamp-leaf.png", tags: ["leaf", "decal", "nature"] }],
    },
    payload: { "assets/stamp-leaf.png": TINY_PNG },
  }),
];
