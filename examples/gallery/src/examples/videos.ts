import { example, remoteChecksum, type Example } from "../shared.js";

/**
 * `video` — a clip a host drops onto a timeline or uses as a background. Even short clips run to
 * several MB, so these use the remote-header pattern: an empty `path`, a `remoteUrl` the host fetches,
 * and a `checksum`/`byteSize` for verification and download progress. The `.azp` carries only the
 * header plus the LICENSE.
 */
export const videos: Example[] = [
  example({
    slug: "video-intro",
    summary: "A 5-second branded intro sting with audio (remote, 1080p).",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.video-intro",
      name: "Intro Sting",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A punchy five-second logo reveal with a whoosh, ready to top a timeline.",
      author: "azphalt examples",
      capabilities: ["assets"],
      assets: [
        {
          type: "video",
          path: "",
          remoteUrl: "https://assets.azphalt.dev/video/intro-sting-1080p.mp4",
          checksum: remoteChecksum("video-intro-sting"),
          byteSize: 4_718_592,
          role: "intro",
          params: { format: "mp4", codec: "h264", resolution: "1920x1080", fps: 30, durationMs: 5000, hasAudio: true },
          tags: ["intro", "sting", "branding", "1080p"],
        },
      ],
    },
  }),
  example({
    slug: "video-loop",
    summary: "A seamless drifting-particles background loop, muted (remote, 4K).",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.video-loop",
      name: "Looping Background",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A ten-second seamless loop of slow drifting particles for behind titles or UI.",
      author: "azphalt examples",
      capabilities: ["assets"],
      assets: [
        {
          type: "video",
          path: "",
          remoteUrl: "https://assets.azphalt.dev/video/particles-loop-4k.webm",
          checksum: remoteChecksum("video-particles-loop"),
          byteSize: 12_582_912,
          role: "background",
          params: { format: "webm", codec: "vp9", resolution: "3840x2160", fps: 24, durationMs: 10000, seamless: true, hasAudio: false },
          tags: ["background", "loop", "particles", "4k"],
        },
      ],
    },
  }),
];
