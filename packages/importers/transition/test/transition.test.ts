import { describe, it, expect } from "vitest";
import { importTransition } from "../src/index.js";
import { readAzp } from "@azphalt/azp";

describe("importer-transition", () => {
  it("packages a gl-transition into an azp", () => {
    const glsl = `vec4 transition(vec2 uv) {
      return mix(getFromColor(uv), getToColor(uv), progress);
    }`;

    const azp = importTransition(glsl, {
      id: "test.transition",
      name: "Crossfade",
      version: "1.0.0",
      author: "Test"
    });

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets).toBeDefined();
    expect(parsed.manifest.assets![0].type).toBe("transition");
    
    const shaderText = new TextDecoder().decode(parsed.payload["assets/transition.glsl"]);
    expect(shaderText).toContain("mix(getFromColor(uv)");
  });
});
