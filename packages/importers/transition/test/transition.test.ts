import { describe, it, expect } from "vitest";
import { readAzp, verifyAzp } from "@azphalt/azp";
import { importGlTransition } from "../src/index";
import { GL, LICENSE } from "./sample";

describe("importGlTransition", () => {
  it("produces a verifiable .azp transition asset with a UI panel", () => {
    const { azp, manifest, panel } = importGlTransition(GL, LICENSE, { id: "com.hereliesaz.simple-fade" });

    expect(manifest.kind).toBe("asset");
    const asset = manifest.assets![0];
    expect(asset.type).toBe("transition");
    expect(asset.path).toBe("assets/simplefade.glsl");
    expect(asset.ui).toBe("ui/simplefade.json");
    expect(asset.params!.format).toBe("gl-transition");
    expect(asset.params!.uniforms).toEqual(
      expect.arrayContaining([{ name: "mask", type: "sampler2D", hostBound: true }]),
    );
    // metadata carried through
    expect(manifest.author).toBe("Az");
    expect(manifest.license).toBe("MIT");
    expect(panel.controls).toHaveLength(5);

    expect(verifyAzp(azp).ok).toBe(true);

    const back = readAzp(azp);
    expect(new TextDecoder().decode(back.payload["assets/simplefade.glsl"])).toBe(GL);
    expect(Object.keys(back.payload)).toContain("ui/simplefade.json");
    const storedPanel = JSON.parse(new TextDecoder().decode(back.payload["ui/simplefade.json"]));
    expect(storedPanel.controls).toHaveLength(5);
  });
});
