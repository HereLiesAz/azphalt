import { describe, it, expect } from "vitest";
import { importIsf } from "../src/index.js";
import { readAzp, verifyAzp } from "@azphalt/azp";

describe("importer-isf", () => {
  it("parses ISF headers and generates a UI schema", () => {
    const isfSource = `/*{
      "CREDIT": "Az",
      "DESCRIPTION": "Test shader",
      "INPUTS": [
        { "NAME": "intensity", "TYPE": "float", "DEFAULT": 0.5, "MIN": 0.0, "MAX": 1.0, "LABEL": "Effect Intensity" },
        { "NAME": "tint", "TYPE": "color", "DEFAULT": [1.0, 0.5, 0.0, 1.0] }
      ]
    }*/
    void main() { gl_FragColor = vec4(1.0); }`;

    const azp = importIsf(isfSource, { id: "test.isf", version: "1.0.0", author: "Test" });

    const parsed = readAzp(azp);
    expect(parsed.manifest.author).toBe("Az");
    expect(parsed.manifest.description).toBe("Test shader");
    expect(parsed.manifest.assets![0].type).toBe("shader");
    expect(parsed.manifest.assets![0].ui).toBe("assets/ui.json");

    const ui = JSON.parse(new TextDecoder().decode(parsed.payload["assets/ui.json"]));
    expect(ui.controls).toHaveLength(2);
    expect(ui.controls[0]).toMatchObject({ type: "slider", key: "intensity", min: 0, max: 1, default: 0.5 });
    expect(ui.controls[1]).toMatchObject({ type: "color", key: "tint", default: "#ff8000", alpha: true });

    expect(verifyAzp(azp).ok).toBe(true);
  });

  it("maps every ISF input type and excludes host-bound inputs", () => {
    const src = `/*{
      "ISFVSN": "2.0",
      "CATEGORIES": ["Color"],
      "INPUTS": [
        { "NAME": "inputImage", "TYPE": "image" },
        { "NAME": "amount", "TYPE": "float", "DEFAULT": 0.5, "MIN": 0, "MAX": 1 },
        { "NAME": "gain", "TYPE": "float", "DEFAULT": 1 },
        { "NAME": "on", "TYPE": "bool", "DEFAULT": true },
        { "NAME": "mode", "TYPE": "long", "DEFAULT": 1, "VALUES": [0, 1, 2], "LABELS": ["Off", "Soft", "Hard"] },
        { "NAME": "center", "TYPE": "point2D", "DEFAULT": [0.5, 0.5] },
        { "NAME": "reset", "TYPE": "event" }
      ]
    }*/
    void main() {}`;

    const parsed = readAzp(importIsf(src, { id: "com.hereliesaz.all", version: "1.0.0", author: "Az" }));
    const ui = JSON.parse(new TextDecoder().decode(parsed.payload["assets/ui.json"]));

    // inputImage (host-bound) excluded; the other six mapped, in order
    expect(ui.controls.map((c: { key: string }) => c.key)).toEqual(["amount", "gain", "on", "mode", "center", "reset"]);
    expect(ui.controls[1].type).toBe("number"); // float without a range
    expect(ui.controls[2]).toMatchObject({ type: "toggle", default: true });
    expect(ui.controls[3]).toMatchObject({
      type: "select",
      default: "1",
      options: [
        { value: "0", label: "Off" },
        { value: "1", label: "Soft" },
        { value: "2", label: "Hard" },
      ],
    });
    expect(ui.controls[4].type).toBe("group");
    expect(ui.controls[4].controls.map((c: { key: string }) => c.key)).toEqual(["center.x", "center.y"]);
    expect(ui.controls[5]).toMatchObject({ type: "button", action: "reset" });

    // params record format + the declared inputs (incl. the host-bound one)
    const params = parsed.manifest.assets![0].params!;
    expect(params.format).toBe("isf");
    expect(params.inputs).toEqual(expect.arrayContaining([{ name: "inputImage", type: "image", hostBound: true }]));
  });

  it("packages raw GLSL (no header) with format 'glsl' and no UI panel", () => {
    const parsed = readAzp(importIsf("void main() { gl_FragColor = vec4(1.0); }", { id: "com.x.raw", version: "1.0.0", author: "Az" }));
    expect(parsed.manifest.assets![0].type).toBe("shader");
    expect(parsed.manifest.assets![0].params!.format).toBe("glsl");
    expect(parsed.manifest.assets![0].ui).toBeUndefined();
    expect(Object.keys(parsed.payload).some((p) => p === "assets/ui.json")).toBe(false);
  });

  it("throws on a malformed header or an unknown input TYPE", () => {
    expect(() => importIsf('/*{ "INPUTS": [ }*/\nvoid main(){}', { id: "x", version: "1", author: "a" })).toThrow(/malformed JSON header/);
    expect(() =>
      importIsf('/*{ "INPUTS": [ { "NAME": "x", "TYPE": "vec9" } ] }*/\ncode', { id: "x", version: "1", author: "a" }),
    ).toThrow(/unknown TYPE/);
  });
});
