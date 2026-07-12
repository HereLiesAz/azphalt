import { describe, it, expect } from "vitest";
import { parseIsf } from "../src/parse-isf";
import { ISF } from "./sample";

describe("parseIsf", () => {
  it("parses an ISF header, inputs, and body", () => {
    const p = parseIsf(ISF);
    expect(p.hasIsfHeader).toBe(true);
    expect(p.header.DESCRIPTION).toBe("Test Grade");
    expect(p.header.ISFVSN).toBe("2.0");
    expect(p.inputs.map((i) => i.TYPE)).toEqual([
      "image",
      "float",
      "float",
      "bool",
      "long",
      "color",
      "point2D",
      "event",
    ]);
    expect(p.body).toContain("void main");
    expect(p.source).toBe(ISF);
  });

  it("treats raw GLSL (no header) as a shader with no inputs", () => {
    const src = "void main() { gl_FragColor = vec4(1.0); }";
    const p = parseIsf(src);
    expect(p.hasIsfHeader).toBe(false);
    expect(p.inputs).toEqual([]);
    expect(p.body).toBe(src);
  });

  it("treats a leading non-JSON comment as plain GLSL, not an ISF header", () => {
    const p = parseIsf("/* Copyright 2026 Az */\nvoid main(){}");
    expect(p.hasIsfHeader).toBe(false);
    expect(p.body).toContain("void main");
  });

  it("throws on a malformed JSON header", () => {
    expect(() => parseIsf('/*{ "INPUTS": [ }*/\nvoid main(){}')).toThrow(/malformed JSON header/);
  });

  it("throws on an unknown input TYPE", () => {
    expect(() => parseIsf('/*{ "INPUTS": [ { "NAME": "x", "TYPE": "vec9" } ] }*/\ncode')).toThrow(/unknown TYPE/);
  });

  it("throws on an input NAME with whitespace", () => {
    expect(() => parseIsf('/*{ "INPUTS": [ { "NAME": "bad name", "TYPE": "float" } ] }*/\ncode')).toThrow(/NAME/);
  });

  it("throws on a duplicate input NAME", () => {
    const src = '/*{ "INPUTS": [ { "NAME": "a", "TYPE": "float" }, { "NAME": "a", "TYPE": "bool" } ] }*/\ncode';
    expect(() => parseIsf(src)).toThrow(/duplicate/);
  });

  it("throws when an INPUTS entry is an array, not an object", () => {
    expect(() => parseIsf('/*{ "INPUTS": [ [1, 2] ] }*/\ncode')).toThrow(/not an object/);
  });
});
