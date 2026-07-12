import { describe, it, expect } from "vitest";
import { unzipSync, zipSync } from "fflate";
import { Registry, RegistryError, compareSemver } from "../src/registry.js";
import { makeAzp } from "./make.js";

describe("compareSemver", () => {
  it("orders releases numerically and ranks release above prerelease", () => {
    expect(compareSemver("1.0.1", "1.0.0")).toBeGreaterThan(0);
    expect(compareSemver("1.2.0", "1.10.0")).toBeLessThan(0);
    expect(compareSemver("1.0.0", "1.0.0-rc.1")).toBeGreaterThan(0);
    expect(compareSemver("1.0.0-rc.2", "1.0.0-rc.10")).toBeLessThan(0);
    expect(compareSemver("2.0.0", "2.0.0")).toBe(0);
  });
});

describe("Registry publish + resolve", () => {
  it("publishes, then summarizes with derived fields", async () => {
    const r = new Registry();
    await r.publish(
      makeAzp("com.hereliesaz.halftone", "1.0.0", {
        name: "Halftone",
        kind: "code",
        description: "A halftone filter",
        author: "Az",
        assets: [{ type: "lut", path: "assets/x.bin" }],
        capabilities: ["bitmap", "params"],
        contributes: { filters: [{ id: "ht", name: "Halftone", entry: "applyHalftone" }] },
      }),
    );

    const summary = await r.getSummary("com.hereliesaz.halftone");
    expect(summary?.name).toBe("Halftone");
    expect(summary?.version).toBe("1.0.0");
    expect(summary?.assetTypes).toEqual(["lut"]);
    expect(summary?.capabilities).toEqual(["bitmap", "params"]);
    expect(summary?.contributes.filters).toBe(1);
    expect(summary?.downloads).toBe(0);
  });

  it("rejects re-publishing an existing version", async () => {
    const r = new Registry();
    await r.publish(makeAzp("com.hereliesaz.x", "1.0.0"));
    await expect(r.publish(makeAzp("com.hereliesaz.x", "1.0.0"))).rejects.toBeInstanceOf(RegistryError);
  });

  it("rejects a bad id and a non-semver version", async () => {
    const r = new Registry();
    await expect(r.publish(makeAzp("nodots", "1.0.0"))).rejects.toThrow(/invalid package id/);
    await expect(r.publish(makeAzp("com.hereliesaz.y", "v1"))).rejects.toThrow(/invalid version/);
  });

  it("rejects a tampered container with verification errors", async () => {
    const r = new Registry();
    const azp = makeAzp("com.hereliesaz.z", "1.0.0");
    const files = unzipSync(azp);
    files["assets/x.bin"] = new Uint8Array([9, 9, 9]);
    const tampered = zipSync(files);
    await expect(r.publish(tampered)).rejects.toMatchObject({
      name: "RegistryError",
      errors: expect.arrayContaining([expect.stringContaining("digest mismatch")]),
    });
  });

  it("resolves latest by semver and skips yanked versions", async () => {
    const r = new Registry();
    await r.publish(makeAzp("com.hereliesaz.multi", "1.0.0"));
    await r.publish(makeAzp("com.hereliesaz.multi", "1.2.0"));
    await r.publish(makeAzp("com.hereliesaz.multi", "1.1.0"));
    expect((await r.latest("com.hereliesaz.multi"))?.version).toBe("1.2.0");

    await r.yank("com.hereliesaz.multi", "1.2.0");
    expect((await r.latest("com.hereliesaz.multi"))?.version).toBe("1.1.0");
    // Yanked version still resolvable by exact version.
    expect((await r.getVersion("com.hereliesaz.multi", "1.2.0"))?.yanked).toBe(true);
  });
});

describe("Registry serve + browse", () => {
  it("serves bytes and counts a download", async () => {
    const r = new Registry();
    await r.publish(makeAzp("com.hereliesaz.dl", "1.0.0"));
    const served = await r.serve("com.hereliesaz.dl");
    expect(served.bytes.length).toBeGreaterThan(0);
    expect(served.version.version).toBe("1.0.0");
    await r.serve("com.hereliesaz.dl");
    expect((await r.getSummary("com.hereliesaz.dl"))?.downloads).toBe(2);
  });

  it("throws serving an unknown package", async () => {
    const r = new Registry();
    await expect(r.serve("com.nope.nope")).rejects.toBeInstanceOf(RegistryError);
  });

  it("lists with filters and sorts, and searches by field", async () => {
    const r = new Registry();
    await r.publish(makeAzp("com.hereliesaz.brush", "1.0.0", { name: "Inky", kind: "asset", assets: [{ type: "brush", path: "assets/x.bin" }] }));
    await r.publish(makeAzp("com.hereliesaz.lut", "1.0.0", { name: "Sunset", kind: "asset", assets: [{ type: "lut", path: "assets/x.bin" }] }));
    await r.serve("com.hereliesaz.lut"); // give it a download so it sorts first

    const brushes = await r.list({ assetType: "brush" });
    expect(brushes.map((s) => s.id)).toEqual(["com.hereliesaz.brush"]);

    const byDownloads = await r.list({ sort: "downloads" });
    expect(byDownloads[0].id).toBe("com.hereliesaz.lut");

    const hits = await r.search("sunset");
    expect(hits[0]?.package.id).toBe("com.hereliesaz.lut");
    expect(await r.search("brush")).not.toHaveLength(0); // matches the brush asset type
  });
});
