import { describe, it, expect } from "vitest";
import { importVideo } from "../src/index.js";
import { readAzp } from "@azphalt/azp";

describe("importer-video", () => {
  it("packages a video file into an azp", () => {
    const mp4 = new Uint8Array([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70]);
    
    const azp = importVideo(mp4, {
      id: "test.video",
      version: "1.0.0",
      author: "Test",
      filename: "test.mp4"
    });

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets).toBeDefined();
    expect(parsed.manifest.assets![0].type).toBe("video");
    expect(parsed.manifest.assets![0].path).toBe("assets/video.mp4");
    
    expect(parsed.payload["assets/video.mp4"]).toEqual(mp4);
  });
});
