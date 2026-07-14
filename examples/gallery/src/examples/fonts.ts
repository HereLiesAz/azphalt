import { example, remoteChecksum, type Example } from "../shared.js";

/**
 * `font` — a typeface a host loads for text rendering. Fonts are commonly licensed and downloaded on
 * demand, so they fit the remote-header pattern: an empty `path`, a `remoteUrl` the host fetches, and a
 * `checksum`/`byteSize` for verification and download progress. The `.azp` carries only the header plus
 * the LICENSE.
 */
export const fonts: Example[] = [
  example({
    slug: "font-display",
    summary: "A bold geometric display sans for headlines (remote, variable).",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.font-display",
      name: "Display Sans",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A high-contrast geometric sans with a wide weight axis for posters and titles.",
      author: "azphalt examples",
      capabilities: ["assets"],
      assets: [
        {
          type: "font",
          path: "",
          remoteUrl: "https://assets.azphalt.dev/fonts/display-sans-variable.woff2",
          checksum: remoteChecksum("font-display-sans"),
          byteSize: 184_320,
          role: "display",
          params: { format: "woff2", family: "Azphalt Display Sans", variable: true, weightAxis: "100..900" },
          tags: ["sans", "display", "headline", "variable"],
        },
      ],
    },
  }),
  example({
    slug: "font-mono",
    summary: "A fixed-width monospace with ligatures for code (remote, TTF).",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.font-mono",
      name: "Code Monospace",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A legible fixed-width face with coding ligatures and a dotted zero for editors.",
      author: "azphalt examples",
      capabilities: ["assets"],
      assets: [
        {
          type: "font",
          path: "",
          remoteUrl: "https://assets.azphalt.dev/fonts/code-mono-regular.ttf",
          checksum: remoteChecksum("font-code-mono"),
          byteSize: 327_680,
          role: "monospace",
          params: { format: "ttf", family: "Azphalt Code Mono", weight: 400, ligatures: true },
          tags: ["monospace", "code", "ligatures", "editor"],
        },
      ],
    },
  }),
];
