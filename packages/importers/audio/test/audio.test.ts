import { describe, it, expect } from "vitest";
import { importAudio } from "../src/index.js";
import { readAzp, verifyAzp } from "@azphalt/azp";

describe("importer-audio", () => {
  it("packages a WAV (RIFF/WAVE) file with tags into a verifiable azp", () => {
    // A realistic WAV header: "RIFF" + chunk size + "WAVE" + "fmt " subchunk tag.
    const wav = new Uint8Array([
      0x52, 0x49, 0x46, 0x46, // "RIFF"
      0x24, 0x00, 0x00, 0x00, // chunk size
      0x57, 0x41, 0x56, 0x45, // "WAVE"
      0x66, 0x6d, 0x74, 0x20, // "fmt "
    ]);

    const azp = importAudio(wav, {
      id: "test.audio",
      version: "1.0.0",
      author: "Test",
      tags: ["sfx", "impact"],
    });

    expect(verifyAzp(azp).ok).toBe(true);

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets).toBeDefined();
    expect(parsed.manifest.assets![0].type).toBe("audio");
    expect(parsed.manifest.assets![0].path).toBe("assets/audio.wav");
    expect(parsed.manifest.assets![0].params?.format).toBe("wav");
    expect(parsed.manifest.assets![0].tags).toEqual(["sfx", "impact"]);
    expect(parsed.payload["assets/audio.wav"]).toEqual(wav);
    expect(parsed.payload["LICENSE"]).toBeTruthy();
  });

  it("detects an ID3-tagged MP3", () => {
    const mp3 = new Uint8Array([0x49, 0x44, 0x33, 0x03, 0x00, 0x00, 0x00, 0x00]); // "ID3"

    const azp = importAudio(mp3, { id: "test.mp3", version: "1.0.0", author: "Test" });

    expect(verifyAzp(azp).ok).toBe(true);
    const parsed = readAzp(azp);
    expect(parsed.manifest.assets![0].path).toBe("assets/audio.mp3");
    expect(parsed.manifest.assets![0].params?.format).toBe("mp3");
  });

  it("detects a bare MP3 frame sync", () => {
    const mp3 = new Uint8Array([0xff, 0xfb, 0x90, 0x00]); // frame sync + header

    const parsed = readAzp(
      importAudio(mp3, { id: "test.mp3.sync", version: "1.0.0", author: "Test" }),
    );
    expect(parsed.manifest.assets![0].path).toBe("assets/audio.mp3");
    expect(parsed.manifest.assets![0].params?.format).toBe("mp3");
  });

  it("detects OGG and FLAC by their stream markers", () => {
    const ogg = new Uint8Array([0x4f, 0x67, 0x67, 0x53, 0x00]); // "OggS"
    const flac = new Uint8Array([0x66, 0x4c, 0x61, 0x43, 0x00]); // "fLaC"

    const oggParsed = readAzp(
      importAudio(ogg, { id: "test.ogg", version: "1.0.0", author: "Test" }),
    );
    expect(oggParsed.manifest.assets![0].path).toBe("assets/audio.ogg");
    expect(oggParsed.manifest.assets![0].params?.format).toBe("ogg");

    const flacParsed = readAzp(
      importAudio(flac, { id: "test.flac", version: "1.0.0", author: "Test" }),
    );
    expect(flacParsed.manifest.assets![0].path).toBe("assets/audio.flac");
    expect(flacParsed.manifest.assets![0].params?.format).toBe("flac");
  });

  it("threads a custom license id and license text", () => {
    const wav = new Uint8Array([
      0x52, 0x49, 0x46, 0x46, 0x24, 0x00, 0x00, 0x00, 0x57, 0x41, 0x56, 0x45,
    ]);

    const parsed = readAzp(
      importAudio(wav, {
        id: "test.license",
        version: "1.0.0",
        author: "Test",
        license: "CC0-1.0",
        licenseText: "CC0 1.0 Universal — full text here\n",
      }),
    );
    expect(parsed.manifest.license).toBe("CC0-1.0");
    expect(new TextDecoder().decode(parsed.payload["LICENSE"])).toBe(
      "CC0 1.0 Universal — full text here\n",
    );
  });

  it("rejects unrecognized audio bytes", () => {
    const junk = new Uint8Array([0x00, 0x01, 0x02, 0x03]);
    expect(() =>
      importAudio(junk, { id: "test.bad", version: "1.0.0", author: "Test" }),
    ).toThrow(/unrecognized audio format/);
  });
});
