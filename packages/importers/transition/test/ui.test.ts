import { describe, it, expect } from "vitest";
import { uniformsToPanel } from "../src/ui";
import { parseGlTransition } from "../src/parse-gl-transition";
import { GL } from "./sample";

const panel = uniformsToPanel(parseGlTransition(GL).uniforms);
const byKey = (k: string) => panel.controls.find((c) => c.key === k) as Record<string, unknown>;

describe("uniformsToPanel", () => {
  it("excludes host-bound sampler2D uniforms and maps the rest", () => {
    expect(panel.controls.map((c) => c.key)).toEqual(["intensity", "steps", "reversed", "color", "direction"]);
  });

  it("maps float/int to number and bool to toggle", () => {
    expect(byKey("intensity")).toMatchObject({ type: "number", default: 0.3 });
    expect(byKey("steps")).toMatchObject({ type: "number", default: 4 });
    expect(byKey("reversed")).toMatchObject({ type: "toggle", default: false });
  });

  it("maps vecN to a group of numbers with per-component defaults", () => {
    const color = byKey("color");
    expect(color.type).toBe("group");
    const cc = color.controls as Array<{ key: string; default: number }>;
    expect(cc.map((c) => c.key)).toEqual(["color.0", "color.1", "color.2", "color.3"]);
    expect(cc.map((c) => c.default)).toEqual([0, 0, 0, 1]);

    const dir = byKey("direction");
    expect((dir.controls as Array<{ default: number }>).map((c) => c.default)).toEqual([1, 0]);
  });
});
