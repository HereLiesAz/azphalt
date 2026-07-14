import { describe, it, expect } from "vitest";
import { parseCompat, compatSatisfies } from "../src/index";

describe("compat grammar", () => {
  it("parses a comparator + version, defaulting the operator to >=", () => {
    expect(parseCompat(">=0.1")).toEqual({ op: ">=", version: [0, 1, 0] });
    expect(parseCompat("0.1")).toEqual({ op: ">=", version: [0, 1, 0] }); // bare = minimum
    expect(parseCompat("=1.2.3")).toEqual({ op: "=", version: [1, 2, 3] });
    expect(parseCompat("< 2")).toEqual({ op: "<", version: [2, 0, 0] });
  });

  it("rejects grammar outside the 0.1 subset", () => {
    expect(parseCompat("^1.0.0")).toBeNull();
    expect(parseCompat("~0.1")).toBeNull();
    expect(parseCompat(">=0.1 <0.3")).toBeNull();
    expect(parseCompat("1.0.0 || 2.0.0")).toBeNull();
    expect(parseCompat("1.0.0-rc.1")).toBeNull();
    expect(parseCompat("latest")).toBeNull();
  });

  it("evaluates a host version against compat", () => {
    expect(compatSatisfies("0.1", ">=0.1")).toBe(true);
    expect(compatSatisfies("0.2", ">=0.1")).toBe(true);
    expect(compatSatisfies("0.0.9", ">=0.1")).toBe(false);
    expect(compatSatisfies("1.0.0", ">=0.1")).toBe(true);
    expect(compatSatisfies("1.2.3", "=1.2.3")).toBe(true);
    expect(compatSatisfies("1.2.4", "=1.2.3")).toBe(false);
    expect(compatSatisfies("0.1", "<0.3")).toBe(true);
    expect(compatSatisfies("0.5", "<0.3")).toBe(false);
  });

  it("is false on unparseable input", () => {
    expect(compatSatisfies("0.1", "^1.0.0")).toBe(false);
    expect(compatSatisfies("nope", ">=0.1")).toBe(false);
  });
});
