/**
 * Pack resolution on the client: `getPack` returns a pack's member list, and `resolvePack` fills in a
 * concrete version for each member (the pinned one, or the member's latest) plus display metadata — the
 * ready-to-install form a host loops over.
 */
import { describe, it, expect, afterEach } from "vitest";
import { RepositoryClient } from "../src/index.js";

const realFetch = global.fetch;
afterEach(() => {
  global.fetch = realFetch;
});

const detail: Record<string, unknown> = {
  "/packages/com.acme.base-set": {
    id: "com.acme.base-set",
    kind: "pack",
    name: "Base Set",
    manifest: {
      kind: "pack",
      pack: {
        entries: [
          { id: "com.foldlab.filmluts", version: "1.0.0", required: true },
          { id: "com.brushery.inkbrushes", required: false, note: "optional" },
        ],
      },
    },
  },
  "/packages/com.brushery.inkbrushes": {
    id: "com.brushery.inkbrushes",
    kind: "asset",
    name: "Ink Brushes",
    latest: "1.4.2",
    version: "1.4.2",
    priceStatus: "free",
  },
  "/packages/com.acme.not-a-pack": { id: "com.acme.not-a-pack", kind: "asset", name: "Nope" },
};

function server() {
  return (url: string) => {
    const path = new URL(url, "http://x").pathname;
    const body = detail[path];
    return Promise.resolve(body ? { ok: true, json: () => Promise.resolve(body) } : { ok: false, status: 404 });
  };
}

describe("RepositoryClient — packs", () => {
  it("getPack returns the member list", async () => {
    global.fetch = server() as unknown as typeof fetch;
    const pack = await new RepositoryClient({ url: "https://r" }).getPack("com.acme.base-set");
    expect(pack.entries.map((e) => e.id)).toEqual(["com.foldlab.filmluts", "com.brushery.inkbrushes"]);
  });

  it("resolvePack pins each member's version (pinned kept, unpinned → latest) with metadata", async () => {
    global.fetch = server() as unknown as typeof fetch;
    const { entries } = await new RepositoryClient({ url: "https://r" }).resolvePack("com.acme.base-set");
    const pinned = entries.find((e) => e.id === "com.foldlab.filmluts")!;
    const resolved = entries.find((e) => e.id === "com.brushery.inkbrushes")!;
    expect(pinned.version).toBe("1.0.0"); // pin kept, no extra fetch needed
    expect(resolved.version).toBe("1.4.2"); // filled from the member's latest
    expect(resolved.name).toBe("Ink Brushes");
    expect(resolved.priceStatus).toBe("free");
    expect(resolved.required).toBe(false);
  });

  it("throws when the id is not a pack", async () => {
    global.fetch = server() as unknown as typeof fetch;
    await expect(new RepositoryClient({ url: "https://r" }).getPack("com.acme.not-a-pack")).rejects.toThrowError(/not an extension pack/);
  });
});
