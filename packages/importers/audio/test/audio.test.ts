import { describe, it, expect } from "vitest";
import { importAudio } from "../src/index.js";
import { readAzp } from "@azphalt/azp";

describe("importer-audio", () => {
  it("packages an audio file with tags into an azp", () => {
    const wav = new Uint8Array([0x52, 0x49, 0x46, 0x46]);
    
    const azp = importAudio(wav, {
      id: "test.audio",
      version: "1.0.0",
      author: "Test",
      filename: "test.wav",
      tags: ["sfx", "impact"]
    });

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets).toBeDefined();
    expect(parsed.manifest.assets![0].type).toBe("audio");
    expect(parsed.manifest.assets![0].path).toBe("assets/audio.wav");
    expect(parsed.manifest.assets![0].tags).toEqual(["sfx", "impact"]);
    
    expect(parsed.payload["assets/audio.wav"]).toEqual(wav);
  });
});
