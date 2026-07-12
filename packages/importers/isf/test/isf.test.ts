import { describe, it, expect } from "vitest";
import { importIsf } from "../src/index.js";
import { readAzp } from "@azphalt/azp";

describe("importer-isf", () => {
  it("parses ISF headers and generates a UI schema", () => {
    const isfSource = `/*{
      "CREDIT": "Az",
      "DESCRIPTION": "Test shader",
      "INPUTS": [
        {
          "NAME": "intensity",
          "TYPE": "float",
          "DEFAULT": 0.5,
          "MIN": 0.0,
          "MAX": 1.0,
          "LABEL": "Effect Intensity"
        },
        {
          "NAME": "tint",
          "TYPE": "color",
          "DEFAULT": [1.0, 0.5, 0.0, 1.0]
        }
      ]
    }*/
    void main() {
      gl_FragColor = vec4(1.0);
    }`;

    const azp = importIsf(isfSource, {
      id: "test.isf",
      version: "1.0.0",
      author: "Test"
    });

    const parsed = readAzp(azp);
    expect(parsed.manifest.author).toBe("Az");
    expect(parsed.manifest.description).toBe("Test shader");
    
    expect(parsed.manifest.assets).toBeDefined();
    expect(parsed.manifest.assets![0].type).toBe("shader");
    expect(parsed.manifest.assets![0].ui).toBe("assets/ui.json");

    const uiJson = new TextDecoder().decode(parsed.payload["assets/ui.json"]);
    const uiSchema = JSON.parse(uiJson);
    expect(uiSchema.controls.length).toBe(2);
    expect(uiSchema.controls[0].type).toBe("slider");
    expect(uiSchema.controls[0].key).toBe("intensity");
    expect(uiSchema.controls[1].type).toBe("color");
    expect(uiSchema.controls[1].key).toBe("tint");
    expect(uiSchema.controls[1].alpha).toBe(true);
  });
});
