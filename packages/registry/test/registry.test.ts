import { describe, it, expect } from "vitest";
import { unzipSync, zipSync } from "fflate";
import { Registry, RegistryError, compareSemver, mediaDomainsForManifest } from "../src/registry.js";
import { InMemoryStore } from "../src/store.js";
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

describe("Registry app scoping", () => {
  async function seeded() {
    const r = new Registry();
    await r.publish(makeAzp("com.hereliesaz.global", "1.0.0", { name: "Global Tool" })); // no targetApps
    await r.publish(makeAzp("com.hereliesaz.forx", "1.0.0", { name: "For X", targetApps: ["com.app.x"] }));
    await r.publish(makeAzp("com.hereliesaz.forxy", "1.0.0", { name: "For X and Y", targetApps: ["com.app.x", "com.app.y"] }));
    return r;
  }

  it("exposes targetApps on the summary (empty for a global package)", async () => {
    const r = await seeded();
    expect((await r.getSummary("com.hereliesaz.global"))?.targetApps).toEqual([]);
    expect((await r.getSummary("com.hereliesaz.forxy"))?.targetApps).toEqual(["com.app.x", "com.app.y"]);
  });

  it("list without an app returns every package, including app-scoped ones", async () => {
    const r = await seeded();
    expect((await r.list({})).map((s) => s.id).sort()).toEqual(["com.hereliesaz.forx", "com.hereliesaz.forxy", "com.hereliesaz.global"]);
  });

  it("list scoped to an app returns global + that app's packages only", async () => {
    const r = await seeded();
    expect((await r.list({ app: "com.app.x" })).map((s) => s.id).sort()).toEqual(["com.hereliesaz.forx", "com.hereliesaz.forxy", "com.hereliesaz.global"]);
    expect((await r.list({ app: "com.app.y" })).map((s) => s.id).sort()).toEqual(["com.hereliesaz.forxy", "com.hereliesaz.global"]);
    // An app nobody targets sees only the global package.
    expect((await r.list({ app: "com.app.z" })).map((s) => s.id)).toEqual(["com.hereliesaz.global"]);
  });

  it("search honors the app scope too", async () => {
    const r = await seeded();
    const forY = await r.search("for", { app: "com.app.y" });
    expect(forY.map((h) => h.package.id).sort()).toEqual(["com.hereliesaz.forxy"]); // "For X and Y" matches, "For X" is out of scope
  });
});

describe("mediaDomainsForManifest", () => {
  const m = (extra: Record<string, unknown>) =>
    ({ azphalt: "0.1", id: "com.x.y", name: "Y", version: "1.0.0", kind: "asset", license: "MIT", compat: ">=0.1", files: {}, ...extra }) as never;

  it("maps asset types to domains, spanning where a type fits more than one", () => {
    expect(mediaDomainsForManifest(m({ assets: [{ type: "brush", path: "a" }] })).sort()).toEqual(["image"]);
    expect(mediaDomainsForManifest(m({ assets: [{ type: "lut", path: "a" }] })).sort()).toEqual(["image", "video"]);
    expect(mediaDomainsForManifest(m({ assets: [{ type: "audio", path: "a" }] }))).toEqual(["audio"]);
    expect(mediaDomainsForManifest(m({ assets: [{ type: "onnx", path: "", remoteUrl: "u" }] }))).toEqual(["model"]);
  });

  it("derives domains from capabilities and a transitions contribution", () => {
    expect(mediaDomainsForManifest(m({ kind: "code", capabilities: ["bitmap"] }))).toEqual(["image"]);
    expect(mediaDomainsForManifest(m({ kind: "code", capabilities: ["audio"] }))).toEqual(["audio"]);
    const tx = mediaDomainsForManifest(m({ kind: "code", capabilities: ["time"], contributes: { transitions: [{ id: "x", name: "X", entry: "x" }] } }));
    expect(tx).toEqual(["video"]);
  });
});

describe("Registry discovery metadata (byteSize / preview / mediaDomains / rating) + revocations", () => {
  it("surfaces byteSize, preview, and mediaDomains on the summary", async () => {
    const r = new Registry();
    await r.publish(
      makeAzp("com.hereliesaz.card", "1.0.0", {
        assets: [{ type: "lut", path: "assets/x.bin" }],
        preview: { image: "preview/card.png", clip: "https://cdn.example/clip.mp4" },
      } as never),
    );
    const s = await r.getSummary("com.hereliesaz.card");
    expect(s!.byteSize).toBeGreaterThan(0);
    expect(s!.preview).toEqual({ image: "preview/card.png", clip: "https://cdn.example/clip.mp4" });
    expect(s!.mediaDomains.sort()).toEqual(["image", "video"]);
    expect(s!.ratingCount).toBe(0);
    expect(s!.rating).toBeUndefined();
  });

  it("filters by media domain (intersection): a video host keeps a LUT, drops a paint-only brush", async () => {
    const r = new Registry();
    await r.publish(makeAzp("com.hereliesaz.brush", "1.0.0", { assets: [{ type: "brush", path: "assets/x.bin" }] } as never));
    await r.publish(makeAzp("com.hereliesaz.lut", "1.0.0", { assets: [{ type: "lut", path: "assets/x.bin" }] } as never));
    await r.publish(makeAzp("com.hereliesaz.sfx", "1.0.0", { assets: [{ type: "audio", path: "assets/x.bin" }] } as never));
    const forVideoAudio = await r.list({ mediaDomains: ["video", "audio"] });
    expect(forVideoAudio.map((s) => s.id).sort()).toEqual(["com.hereliesaz.lut", "com.hereliesaz.sfx"]);
  });

  it("sorts by rating, unrated last", async () => {
    const store = new InMemoryStore();
    const r = new Registry(store);
    await r.publish(makeAzp("com.hereliesaz.a", "1.0.0"));
    await r.publish(makeAzp("com.hereliesaz.b", "1.0.0"));
    await r.publish(makeAzp("com.hereliesaz.c", "1.0.0")); // unrated
    store.addRating("com.hereliesaz.a", 3);
    store.addRating("com.hereliesaz.b", 5);
    const ranked = await r.list({ sort: "rating" });
    expect(ranked.map((s) => s.id)).toEqual(["com.hereliesaz.b", "com.hereliesaz.a", "com.hereliesaz.c"]);
    expect((await r.getSummary("com.hereliesaz.b"))!.rating).toBe(5);
  });

  it("records a revocation on yank and serves the feed, filtered by `since`", async () => {
    const r = new Registry();
    await r.publish(makeAzp("com.hereliesaz.bad", "1.0.0"));
    await r.publish(makeAzp("com.hereliesaz.bad", "1.1.0"));
    const cut = new Date(Date.now() - 1000).toISOString(); // safely before the yank (ms-resolution)
    await r.yank("com.hereliesaz.bad", "1.0.0", true, "security");
    const all = await r.revocations();
    expect(all).toHaveLength(1);
    expect(all[0]).toMatchObject({ id: "com.hereliesaz.bad", version: "1.0.0", reason: "security" });
    expect(typeof all[0].revokedAt).toBe("string");
    // Since a moment before the yank, it's included; since a moment after, it's not.
    expect(await r.revocations(cut)).toHaveLength(1);
    expect(await r.revocations(new Date(Date.now() + 1000).toISOString())).toHaveLength(0);
  });
});
