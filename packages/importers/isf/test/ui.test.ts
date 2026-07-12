import { describe, it, expect } from "vitest";
import { inputsToPanel, vec4ToHex } from "../src/ui";
import { parseIsf } from "../src/parse-isf";
import { ISF } from "./sample";

const panel = inputsToPanel(parseIsf(ISF).inputs);
const byKey = (k: string) => panel.controls.find((c) => c.key === k) as Record<string, unknown>;

describe("inputsToPanel", () => {
  it("excludes host-bound inputs (image) and keeps the rest in order", () => {
    expect(panel.controls.map((c) => c.key)).toEqual([
      "amount",
      "gain",
      "invert",
      "mode",
      "tint",
      "center",
      "reset",
    ]);
  });

  it("maps float with a range to a slider, without a range to a number", () => {
    expect(byKey("amount")).toMatchObject({ type: "slider", min: 0, max: 1, default: 0.5, label: "Amount" });
    expect(byKey("gain")).toMatchObject({ type: "number", default: 1 });
  });

  it("maps bool to toggle and long to a select with VALUES/LABELS", () => {
    expect(byKey("invert")).toMatchObject({ type: "toggle", default: false });
    expect(byKey("mode")).toMatchObject({
      type: "select",
      default: "1",
      options: [
        { value: "0", label: "Off" },
        { value: "1", label: "Soft" },
        { value: "2", label: "Hard" },
      ],
    });
  });

  it("maps color to #RRGGBB, point2D to a group of two numbers, event to a button", () => {
    expect(byKey("tint")).toMatchObject({ type: "color", default: "#ff8000", alpha: true });
    const center = byKey("center");
    expect(center.type).toBe("group");
    expect((center.controls as Array<{ key: string }>).map((c) => c.key)).toEqual(["center.x", "center.y"]);
    expect(byKey("reset")).toMatchObject({ type: "button", action: "reset" });
  });
});

describe("vec4ToHex", () => {
  it("rounds and clamps channels", () => {
    expect(vec4ToHex([1, 0.5, 0, 1])).toBe("#ff8000");
    expect(vec4ToHex([2, -1, 0.5, 1])).toBe("#ff0080");
    expect(vec4ToHex(undefined)).toBe("#000000");
  });

  it("coerces NaN / non-numeric channels to 0", () => {
    expect(vec4ToHex([Number.NaN, 0.5, 0])).toBe("#008000");
    expect(vec4ToHex(["x" as unknown as number, 1, 0])).toBe("#00ff00");
  });
});
