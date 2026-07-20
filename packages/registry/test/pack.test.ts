import { describe, it, expect } from "vitest";
import { writeAzp } from "@azphalt/azp";
import { Registry, InMemoryStore, RegistryError } from "../src/index";

const license = "MIT License\n";
const base = { azphalt: "0.1", version: "1.0.0", license: "MIT", compat: ">=0.1" };

function packAzp() {
  return writeAzp({
    manifest: {
      ...base,
      id: "com.acme.base-set",
      name: "Acme Base Set",
      kind: "pack" as const,
      pack: {
        entries: [
          { id: "com.foldlab.filmluts", version: "1.0.0", required: true },
          { id: "com.brushery.inkbrushes", required: false, note: "you might also like" },
        ],
      },
    },
    payload: {},
    license,
  }).azp;
}

describe("registry — pack packages", () => {
  it('publishes a kind:"pack" package and lists it by kind', async () => {
    const registry = new Registry(new InMemoryStore());
    const { package: summary } = await registry.publish(packAzp());
    expect(summary.kind).toBe("pack");
    expect(summary.id).toBe("com.acme.base-set");

    const listed = await registry.list({ kind: "pack" });
    expect(listed.map((s) => s.id)).toContain("com.acme.base-set");

    // The member references survive round-trip in the package detail's manifest.
    const detail = await registry.getPackage("com.acme.base-set");
    expect(detail?.versions[0]?.manifest.pack?.entries.map((e) => e.id)).toEqual([
      "com.foldlab.filmluts",
      "com.brushery.inkbrushes",
    ]);
  });

  it("rejects a pack with no entries", async () => {
    const bad = writeAzp({
      manifest: { ...base, id: "com.acme.empty-pack", name: "Empty", kind: "pack" as const, pack: { entries: [] } },
      payload: {},
      license,
    }).azp;
    const registry = new Registry(new InMemoryStore());
    await expect(registry.publish(bad)).rejects.toBeInstanceOf(RegistryError);
  });
});
