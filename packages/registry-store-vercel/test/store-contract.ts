/**
 * A reusable {@link RegistryStore} contract. It is what actually proves a durable store is a faithful
 * substitute for `InMemoryStore` rather than merely type-compatible — so it is run against both (the
 * durable one only when a database is configured; see `store-contract.test.ts`).
 *
 * The cases go past the interface's happy path to the properties a naive port loses: the atomic
 * download counter under concurrency, `putVersion` overwrite semantics, empty results for unknown ids,
 * and the no-ratings shape.
 */
import { describe, it, expect } from "vitest";
import type { PackageVersion, RegistryStore } from "@azphalt/registry";

/** A minimal valid PackageVersion for `(id, version)`. */
function version(id: string, v: string): PackageVersion {
  return {
    id,
    version: v,
    manifest: {
      azphalt: "0.1",
      id,
      name: id,
      version: v,
      kind: "code",
      license: "MIT",
      compat: ">=0.1",
    } as PackageVersion["manifest"],
    size: 8,
    digest: "sha256-test",
    publishedAt: "2026-07-14T00:00:00.000Z",
  };
}

const bytes = (s: string) => new TextEncoder().encode(s);

/**
 * Run the contract against a freshly-provisioned, empty store. `makeStore` must return a store with
 * no rows for the ids used here (a clean in-memory instance, or a migrated test database).
 */
export function runStoreContract(name: string, makeStore: () => Promise<RegistryStore> | RegistryStore): void {
  describe(`RegistryStore contract — ${name}`, () => {
    it("stores and reads back a version + its bytes", async () => {
      const store = await makeStore();
      await store.putVersion(version("com.test.a", "1.0.0"), bytes("payload-a"));
      expect((await store.getVersion("com.test.a", "1.0.0"))?.version).toBe("1.0.0");
      expect(await store.getBytes("com.test.a", "1.0.0")).toEqual(bytes("payload-a"));
      expect(await store.allPackageIds()).toContain("com.test.a");
    });

    it("putVersion twice for one (id, version) overwrites rather than duplicating", async () => {
      const store = await makeStore();
      await store.putVersion(version("com.test.dup", "1.0.0"), bytes("first"));
      await store.putVersion(version("com.test.dup", "1.0.0"), bytes("second"));
      expect(await store.getVersions("com.test.dup")).toHaveLength(1);
      expect(await store.getBytes("com.test.dup", "1.0.0")).toEqual(bytes("second"));
    });

    it("preserves the download tally across a re-publish of the same version", async () => {
      const store = await makeStore();
      await store.putVersion(version("com.test.keep", "1.0.0"), bytes("v"));
      await store.incrementDownloads("com.test.keep", "1.0.0", 5);
      await store.putVersion(version("com.test.keep", "1.0.0"), bytes("v2"));
      expect(await store.getDownloads("com.test.keep")).toBe(5);
    });

    it("totals concurrent incrementDownloads without losing any", async () => {
      const store = await makeStore();
      await store.putVersion(version("com.test.race", "1.0.0"), bytes("v"));
      await Promise.all(Array.from({ length: 20 }, () => store.incrementDownloads("com.test.race", "1.0.0", 1)));
      expect(await store.getDownloads("com.test.race")).toBe(20);
    });

    it("sums downloads across a package's versions", async () => {
      const store = await makeStore();
      await store.putVersion(version("com.test.multi", "1.0.0"), bytes("a"));
      await store.putVersion(version("com.test.multi", "2.0.0"), bytes("b"));
      await store.incrementDownloads("com.test.multi", "1.0.0", 3);
      await store.incrementDownloads("com.test.multi", "2.0.0", 4);
      expect(await store.getDownloads("com.test.multi")).toBe(7);
    });

    it("returns empty / undefined for unknown ids instead of throwing", async () => {
      const store = await makeStore();
      expect(await store.getVersions("com.test.nope")).toEqual([]);
      expect(await store.getVersion("com.test.nope", "1.0.0")).toBeUndefined();
      expect(await store.getBytes("com.test.nope", "1.0.0")).toBeUndefined();
      expect(await store.getDownloads("com.test.nope")).toBe(0);
      expect(await store.getListing("com.test.nope")).toBeUndefined();
    });

    it("reports no rating when none recorded", async () => {
      const store = await makeStore();
      expect(await store.getRating("com.test.unrated")).toEqual({ ratingCount: 0 });
    });

    it("stores, reads, and lists a consignment listing", async () => {
      const store = await makeStore();
      await store.putListing({
        packageId: "com.test.sell",
        sellerId: "seller_1",
        price: { amountCents: 500, currency: "USD" },
        status: "active",
        createdAt: "2026-07-14T00:00:00.000Z",
        updatedAt: "2026-07-14T00:00:00.000Z",
      });
      expect((await store.getListing("com.test.sell"))?.sellerId).toBe("seller_1");
      expect((await store.allListings()).map((l) => l.packageId)).toContain("com.test.sell");
    });

    it("serves revocations newest-first and filters by `since`", async () => {
      const store = await makeStore();
      await store.putRevocation({ id: "com.test.rev", version: "1.0.0", revokedAt: "2026-07-14T00:00:00.000Z" });
      await store.putRevocation({ id: "com.test.rev", version: "2.0.0", revokedAt: "2026-07-15T00:00:00.000Z" });
      const all = await store.getRevocations();
      expect(all[0].version).toBe("2.0.0");
      const since = await store.getRevocations("2026-07-14T12:00:00.000Z");
      expect(since.map((r) => r.version)).toEqual(["2.0.0"]);
    });
  });
}
