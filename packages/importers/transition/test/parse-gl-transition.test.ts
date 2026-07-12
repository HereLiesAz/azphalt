import { describe, it, expect } from "vitest";
import { parseGlTransition } from "../src/parse-gl-transition";
import { GL } from "./sample";

describe("parseGlTransition", () => {
  it("parses metadata and uniforms with defaults", () => {
    const p = parseGlTransition(GL);
    expect(p.name).toBe("SimpleFade");
    expect(p.author).toBe("Az");
    expect(p.license).toBe("MIT");
    expect(p.uniforms.map((u) => u.name)).toEqual(["intensity", "steps", "reversed", "color", "direction", "mask"]);
    expect(p.uniforms.find((u) => u.name === "intensity")).toMatchObject({ glslType: "float", default: 0.3 });
    expect(p.uniforms.find((u) => u.name === "steps")).toMatchObject({ glslType: "int", default: 4 });
    expect(p.uniforms.find((u) => u.name === "reversed")).toMatchObject({ glslType: "bool", default: false });
    expect(p.uniforms.find((u) => u.name === "color")!.default).toEqual([0, 0, 0, 1]);
    expect(p.uniforms.find((u) => u.name === "direction")!.default).toEqual([1, 0]);
  });

  it("excludes host-provided from/to/progress/ratio uniforms", () => {
    const src = "uniform sampler2D from;\nuniform sampler2D to;\nuniform float progress;\nuniform float x; // = 1.0\nvec4 transition(vec2 uv){ return vec4(x); }";
    const p = parseGlTransition(src);
    expect(p.uniforms.map((u) => u.name)).toEqual(["x"]);
  });

  it("expands a single-arg vecN default to all components", () => {
    const src = "uniform vec3 c; // = vec3(0.5)\nvec4 transition(vec2 uv){ return vec4(c, 1.0); }";
    expect(parseGlTransition(src).uniforms[0].default).toEqual([0.5, 0.5, 0.5]);
  });

  it("throws when there is no transition() function", () => {
    expect(() => parseGlTransition("void main() {}")).toThrow(/transition\(/);
  });

  it("throws on a duplicate uniform", () => {
    const src = "uniform float a; // = 1.0\nuniform float a; // = 2.0\nvec4 transition(vec2 uv){ return vec4(a); }";
    expect(() => parseGlTransition(src)).toThrow(/duplicate/);
  });
});
