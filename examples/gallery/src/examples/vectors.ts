import { example, utf8, type Example } from "../shared.js";

/** A crisp check-mark icon on a 24×24 grid; strokes inherit `currentColor` from the host. */
const CHECK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M20 6 9 17l-5-5"/>
</svg>
`;

/** A rosette "badge" icon — a medallion above two ribbon tails, on the same 24×24 grid. */
const BADGE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="8" r="6"/>
  <path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.12"/>
</svg>
`;

/** `vector` — a scalable SVG asset the host can place, tint (`currentColor`), and rasterize. */
export const vectors: Example[] = [
  example({
    slug: "vector-check",
    summary: "A single-path check-mark SVG icon on a 24×24 grid.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.vector-check",
      name: "Check Icon",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A rounded check-mark SVG that tints to the host's currentColor.",
      author: "azphalt examples",
      capabilities: ["assets"],
      assets: [{ type: "vector", path: "assets/vector-check.svg", tags: ["icon", "ui", "check"] }],
    },
    payload: { "assets/vector-check.svg": utf8(CHECK_SVG) },
  }),
  example({
    slug: "vector-badge",
    summary: "A rosette badge/award SVG icon with a medallion and ribbon tails.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.vector-badge",
      name: "Badge Icon",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "An award-rosette SVG icon: a circular medallion above two ribbon tails.",
      author: "azphalt examples",
      capabilities: ["assets"],
      assets: [{ type: "vector", path: "assets/vector-badge.svg", tags: ["icon", "ui", "award"] }],
    },
    payload: { "assets/vector-badge.svg": utf8(BADGE_SVG) },
  }),
];
