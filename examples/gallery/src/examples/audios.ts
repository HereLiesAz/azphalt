import { example, remoteChecksum, type Example } from "../shared.js";

/**
 * `audio` — a sound a host plays for UI feedback or ambience. A short SFX is a few KB while an ambient
 * bed runs to a couple MB, so these use the remote-header pattern: an empty `path`, a `remoteUrl` the
 * host fetches, and a `checksum`/`byteSize` for verification and download progress. The `.azp` is just
 * the header plus the LICENSE.
 */
export const audios: Example[] = [
  example({
    slug: "audio-click",
    summary: "A crisp UI click SFX for button feedback (remote, mono).",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.audio-click",
      name: "UI Click",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A short, dry click for button presses and toggles — no tail, no reverb.",
      author: "azphalt examples",
      capabilities: ["assets"],
      assets: [
        {
          type: "audio",
          path: "",
          remoteUrl: "https://assets.azphalt.dev/audio/ui-click.wav",
          checksum: remoteChecksum("audio-ui-click"),
          byteSize: 13_312,
          role: "sfx",
          params: { format: "wav", sampleRate: 48000, channels: 1, bitDepth: 16, durationMs: 60 },
          tags: ["ui", "click", "sfx", "feedback"],
        },
      ],
    },
  }),
  example({
    slug: "audio-ambient",
    summary: "A seamless rainy-cafe ambient loop for background beds (remote, stereo).",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.audio-ambient",
      name: "Ambient Loop",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A two-minute seamless rainy-cafe ambience for menus, focus modes, and idle scenes.",
      author: "azphalt examples",
      capabilities: ["assets"],
      assets: [
        {
          type: "audio",
          path: "",
          remoteUrl: "https://assets.azphalt.dev/audio/rainy-cafe-loop.ogg",
          checksum: remoteChecksum("audio-rainy-cafe"),
          byteSize: 2_097_152,
          role: "ambience",
          params: { format: "ogg", sampleRate: 44100, channels: 2, durationMs: 120000, seamless: true },
          tags: ["ambient", "loop", "rain", "cafe"],
        },
      ],
    },
  }),
];
