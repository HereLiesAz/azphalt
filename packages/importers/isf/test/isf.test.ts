import { describe, it, expect } from "vitest";
import { readAzp, verifyAzp } from "@azphalt/azp";
import { importIsf } from "../src/index";
import { ISF, LICENSE } from "./sample";

describe("importIsf", () => {
  it("produces a verifiable .azp shader asset with a UI panel", () => {
    const { azp, manifest, panel } = importIsf(ISF, LICENSE, { id: "com.hereliesaz.test-grade" });

    expect(manifest.kind).toBe("asset");
    const asset = manifest.assets![0];
    expect(asset.type).toBe("shader");
    expect(asset.path).toBe("assets/test-grade.fs");
    expect(asset.ui).toBe("ui/test-grade.json");
    expect(asset.params!.format).toBe("isf");
    expect(asset.params!.inputs).toEqual(
      expect.arrayContaining([{ name: "inputImage", type: "image", hostBound: true }]),
    );
    expect(panel.controls).toHaveLength(7);

    expect(verifyAzp(azp).ok).toBe(true);

    const back = readAzp(azp);
    expect(new TextDecoder().decode(back.payload["assets/test-grade.fs"])).toBe(ISF);
    expect(Object.keys(back.payload)).toContain("ui/test-grade.json");
    const storedPanel = JSON.parse(new TextDecoder().decode(back.payload["ui/test-grade.json"]));
    expect(storedPanel.controls).toHaveLength(7);
  });

  it("packages raw GLSL with format 'glsl' and no UI panel", () => {
    const src = "void main() { gl_FragColor = vec4(1.0); }";
    const { azp, manifest } = importIsf(src, LICENSE, { id: "com.hereliesaz.raw", name: "Raw" });

    const asset = manifest.assets![0];
    expect(asset.type).toBe("shader");
    expect(asset.params!.format).toBe("glsl");
    expect(asset.ui).toBeUndefined();

    expect(verifyAzp(azp).ok).toBe(true);
    const back = readAzp(azp);
    expect(Object.keys(back.payload).some((p) => p.startsWith("ui/"))).toBe(false);
  });
});
