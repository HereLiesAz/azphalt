import { describe, it, expect } from "vitest";
import { readDescriptor } from "../src/descriptor";
import { descriptor, item } from "./helpers";

describe("readDescriptor", () => {
  it("reads doub / UntF / TEXT / bool items and tolerates a leading version", () => {
    const bytes = descriptor([
      item.untf("Dmtr", "#Pxl", 40),
      item.untf("Spcn", "#Prc", 25),
      item.doub("Hrdn", 0.8),
      item.text("Nm  ", "Dry Ink"),
      item.bool("Intr", true),
    ]);
    const d = readDescriptor(bytes);
    expect(d.Dmtr).toBe(40);
    expect(d.Spcn).toBe(25);
    expect(d.Hrdn).toBeCloseTo(0.8);
    expect(d["Nm  "]).toBe("Dry Ink");
    expect(d.Intr).toBe(true);
  });

  it("throws on an unknown OSType rather than misreading", () => {
    // key 'Bogs' + unknown OSType 'zzzz'
    const bad = descriptor([new Uint8Array([0, 0, 0, 0, 66, 111, 103, 115, 122, 122, 122, 122])]);
    expect(() => readDescriptor(bad)).toThrow(/unsupported descriptor OSType/);
  });
});
