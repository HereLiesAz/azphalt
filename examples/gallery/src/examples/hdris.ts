import { example, remoteChecksum, type Example } from "../shared.js";

/**
 * `hdri` — an HDR environment map a host loads for image-based lighting and reflections. These are
 * heavy (tens of MB), so they use the remote-header pattern: an empty `path`, a `remoteUrl` the host
 * fetches, and a `checksum`/`byteSize` for verification and download progress. The `.azp` itself is
 * just a lightweight header plus the LICENSE.
 */
export const hdris: Example[] = [
  example({
    slug: "hdri-studio",
    summary: "A neutral studio softbox HDRI for product lighting (remote, 4K).",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.hdri-studio",
      name: "Studio Softbox HDRI",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A clean three-softbox studio environment for even, neutral product renders.",
      author: "azphalt examples",
      capabilities: ["assets"],
      assets: [
        {
          type: "hdri",
          path: "",
          remoteUrl: "https://assets.azphalt.dev/hdri/studio-softbox-4k.hdr",
          checksum: remoteChecksum("hdri-studio-softbox"),
          byteSize: 27_262_976,
          role: "environment",
          params: { format: "hdr", resolution: "4096x2048", evRange: 12 },
          tags: ["studio", "softbox", "neutral", "ibl"],
        },
      ],
    },
  }),
  example({
    slug: "hdri-sunset-field",
    summary: "A golden-hour sunset field HDRI for outdoor scenes (remote, 8K).",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.hdri-sunset-field",
      name: "Sunset Field HDRI",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A wide open field at golden hour with a low warm sun for dramatic outdoor lighting.",
      author: "azphalt examples",
      capabilities: ["assets"],
      assets: [
        {
          type: "hdri",
          path: "",
          remoteUrl: "https://assets.azphalt.dev/hdri/sunset-field-8k.exr",
          checksum: remoteChecksum("hdri-sunset-field"),
          byteSize: 94_371_840,
          role: "environment",
          params: { format: "exr", resolution: "8192x4096", evRange: 16, sunAzimuth: 285 },
          tags: ["outdoor", "sunset", "golden-hour", "ibl"],
        },
      ],
    },
  }),
];
