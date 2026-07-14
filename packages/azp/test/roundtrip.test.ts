import { describe, it, expect } from "vitest";
import { unzipSync, zipSync } from "fflate";
import { writeAzp, readAzp, verifyAzp, digest } from "../src/index";

const license = "MIT License\n\nCopyright (c) 2026 Az\n";

const base = {
  azphalt: "0.1",
  name: "X",
  version: "1.0.0",
  kind: "asset" as const,
  license: "MIT",
  compat: ">=0.1",
};

describe("azp", () => {
  it("writes, reads back, and verifies", () => {
    const payload = { "assets/hello.txt": new TextEncoder().encode("hello") };
    const { azp, manifest } = writeAzp({
      manifest: { ...base, id: "com.hereliesaz.hello", name: "Hello" },
      payload,
      license,
    });

    expect(manifest.files["assets/hello.txt"]).toBe(digest(payload["assets/hello.txt"]));
    expect(manifest.files["LICENSE"]).toBeTruthy();

    const back = readAzp(azp);
    expect(back.manifest.id).toBe("com.hereliesaz.hello");
    expect(new TextDecoder().decode(back.payload["assets/hello.txt"])).toBe("hello");
    expect(new TextDecoder().decode(back.payload["LICENSE"])).toBe(license);

    expect(verifyAzp(azp).ok).toBe(true);
  });

  it("round-trips model-asset delivery fields (files[], requirements, modelLicense, remote checksum)", () => {
    const assets = [
      {
        type: "sherpa-bundle" as const,
        role: "speech-to-text",
        path: "",
        requirements: { runtime: "sherpa-onnx", formatVersion: ">=17", quantization: "int8", accelerator: "cpu", minRamMB: 512 },
        modelLicense: {
          spdx: "CC-BY-NC-4.0",
          commercialUse: false,
          attributionRequired: true,
          attribution: "Model © Vendor, CC-BY-NC-4.0",
          url: "https://example.com/LICENSE",
          sourceUrl: "https://huggingface.co/vendor/model",
        },
        files: [
          { name: "encoder.onnx", remoteUrl: "https://cdn.example.com/enc.onnx", checksum: "sha256-aaa", byteSize: 120, supportsRange: true },
          { name: "tokens.txt", path: "assets/tokens.txt" },
        ],
      },
    ];
    const { azp } = writeAzp({
      manifest: { ...base, id: "com.hereliesaz.asr", name: "ASR", assets },
      payload: { "assets/tokens.txt": new TextEncoder().encode("hello world") },
      license,
    });

    const a = readAzp(azp).manifest.assets![0];
    expect(a.requirements?.accelerator).toBe("cpu");
    expect(a.modelLicense?.commercialUse).toBe(false);
    expect(a.modelLicense?.attribution).toContain("CC-BY-NC-4.0");
    expect(a.files?.[0]).toMatchObject({ name: "encoder.onnx", checksum: "sha256-aaa", supportsRange: true });
    expect(a.files?.[1].path).toBe("assets/tokens.txt");
    // The one bundled member is a real payload with a digest; remote members aren't, and that's fine.
    expect(verifyAzp(azp).ok).toBe(true);
  });

  it("round-trips asset metadata fields (physical, contentRights, standalone)", () => {
    const enc = (s: string) => new TextEncoder().encode(s);
    const assets = [
      {
        type: "vector" as const,
        path: "assets/stencil.svg",
        physical: { width: 1200, height: 800, unit: "mm" as const, dpi: 300, tileWidth: 210, tileHeight: 297 },
        contentRights: { attribution: "Mural © Artist, CC-BY-4.0", attributionRequired: true, commercialUse: false },
      },
      { type: "shader" as const, path: "assets/fx.glsl", standalone: false },
    ];
    const { azp } = writeAzp({
      manifest: { ...base, id: "com.hereliesaz.mural", kind: "mixed", entry: "code/main.js", runtime: "js", assets },
      payload: {
        "assets/stencil.svg": enc("<svg xmlns='http://www.w3.org/2000/svg'/>"),
        "assets/fx.glsl": enc("void main(){}"),
        "code/main.js": enc("export const x = 1;"),
      },
      license,
    });

    const back = readAzp(azp).manifest.assets!;
    expect(back[0].physical).toMatchObject({ width: 1200, height: 800, unit: "mm", dpi: 300, tileWidth: 210, tileHeight: 297 });
    expect(back[0].contentRights).toMatchObject({ attribution: "Mural © Artist, CC-BY-4.0", attributionRequired: true, commercialUse: false });
    expect(back[1].standalone).toBe(false);
    expect(verifyAzp(azp).ok).toBe(true);
  });

  it("flags a digest mismatch when the payload is tampered", () => {
    const { azp } = writeAzp({
      manifest: { ...base, id: "com.hereliesaz.x" },
      payload: { "assets/a.bin": new Uint8Array([1, 2, 3]) },
      license,
    });

    const files = unzipSync(azp);
    files["assets/a.bin"] = new Uint8Array([9, 9, 9]); // payload changes, manifest digest does not
    const tampered = zipSync(files);

    const result = verifyAzp(tampered);
    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes("digest mismatch"))).toBe(true);
  });

  it("rejects bytes that are not a package", () => {
    expect(verifyAzp(new Uint8Array([1, 2, 3, 4])).ok).toBe(false);
  });

  it("flags a payload file that is absent from manifest.files", () => {
    const { azp } = writeAzp({
      manifest: { ...base, id: "com.hereliesaz.x" },
      payload: { "assets/a.bin": new Uint8Array([1, 2, 3]) },
      license,
    });

    const files = unzipSync(azp);
    files["assets/stowaway.bin"] = new Uint8Array([4, 5, 6]); // never listed in manifest.files
    const smuggled = zipSync(files);

    const result = verifyAzp(smuggled);
    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes("unlisted payload"))).toBe(true);
  });

  it("writes identical bytes for identical input (reproducible)", () => {
    const input = {
      manifest: { ...base, id: "com.hereliesaz.repro" },
      payload: { "assets/x.bin": new Uint8Array([7, 8, 9]) },
      license,
    };
    expect(writeAzp(input).azp).toEqual(writeAzp(input).azp);
  });
});
