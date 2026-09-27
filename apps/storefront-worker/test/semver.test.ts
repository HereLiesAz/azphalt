import { describe, expect, it } from "vitest";
import { compareSemver } from "../src/semver";

describe("compareSemver", () => {
  it("orders by precedence, as packages/registry does", () => {
    const sorted = ["1.0.0", "1.0.0-alpha", "1.0.0-alpha.1", "1.0.0-beta", "1.0.0-beta.11", "1.0.0-beta.2", "1.0.0-rc.1", "0.9.9", "1.10.0", "1.2.0"]
      .sort(compareSemver);
    expect(sorted).toEqual(["0.9.9", "1.0.0-alpha", "1.0.0-alpha.1", "1.0.0-beta", "1.0.0-beta.2", "1.0.0-beta.11", "1.0.0-rc.1", "1.0.0", "1.2.0", "1.10.0"]);
  });

  it("ignores build metadata and sorts non-semver oldest", () => {
    expect(compareSemver("1.0.0+build.5", "1.0.0")).toBe(0);
    expect(compareSemver("banana", "0.0.1")).toBeLessThan(0);
  });
});
