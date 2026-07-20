/**
 * The full **extension-pack** lifecycle, end-to-end across `@azphalt/azp` (validation), the registry,
 * the reference server, and `@azphalt/repository-client`: publish a pack that references two members
 * (one free, one consigned), then have a host resolve the pack and install its members. Proves the
 * load-bearing property — a pack is free to publish and resolve, but each member is still free/paid-
 * gated on its own (the paid member needs its own entitlement even though the pack is free).
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import { verifyAzp, writeAzp } from "@azphalt/azp";
import { InMemoryStore, Marketplace, Registry } from "@azphalt/registry";
import type { Manifest } from "@azphalt/azdk";
import { RepositoryClient } from "@azphalt/repository-client";
import { createRepositoryServer, InMemoryAuthorizer } from "../src/index";

const LICENSE = "MIT License\n";
const utf8 = (s: string) => new TextEncoder().encode(s);
const lut = utf8("LUT_3D_SIZE 2\n0 0 0\n1 1 1\n");

/** A plain free/consignable asset package. */
function assetAzp(id: string): Uint8Array {
  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id,
    name: id.split(".").pop()!,
    version: "1.0.0",
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    capabilities: ["assets"],
    assets: [{ type: "lut", path: "assets/x.cube" }],
  };
  return writeAzp({ manifest, payload: { "assets/x.cube": lut }, license: LICENSE }).azp;
}

/** A pack referencing the two members above (versions unpinned → resolve to latest). */
function packAzp(): Uint8Array {
  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: "com.demo.starter",
    name: "Starter Pack",
    version: "1.0.0",
    kind: "pack",
    license: "MIT",
    compat: ">=0.1",
    pack: {
      entries: [
        { id: "com.demo.free-lut", required: true, note: "core (free)" },
        { id: "com.demo.paid-lut", required: false, note: "premium add-on (paid)" },
      ],
    },
  };
  return writeAzp({ manifest, payload: {}, license: LICENSE }).azp;
}

describe("pack lifecycle — end-to-end over @azphalt/repository-client", () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    const store = new InMemoryStore();
    const registry = new Registry(store);
    const marketplace = new Marketplace(registry, store);
    await registry.publish(assetAzp("com.demo.free-lut"));
    await registry.publish(assetAzp("com.demo.paid-lut"));
    await marketplace.listForSale("com.demo.paid-lut", "seller_1", { amountCents: 500, currency: "USD" });
    await registry.publish(packAzp());
    // Only the paid member is licensed by this token; the pack itself needs no license.
    const authorizer = new InMemoryAuthorizer().grantLicense("license-paid", "com.demo.paid-lut");
    server = createRepositoryServer({ registry, marketplace, authorizer, index: { name: "Test Repo", version: "0.1" } });
    await new Promise<void>((resolve) => server.listen(0, resolve));
    baseUrl = `http://localhost:${(server.address() as AddressInfo).port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => server.close((e) => (e ? reject(e) : resolve())));
  });

  it("resolves the pack's members with concrete versions and free/paid status", async () => {
    const client = new RepositoryClient({ url: baseUrl });
    const { entries } = await client.resolvePack("com.demo.starter");
    expect(entries.map((e) => e.id).sort()).toEqual(["com.demo.free-lut", "com.demo.paid-lut"]);

    const free = entries.find((e) => e.id === "com.demo.free-lut")!;
    const paid = entries.find((e) => e.id === "com.demo.paid-lut")!;
    expect(free.version).toBe("1.0.0"); // unpinned → resolved to latest
    expect(free.required).toBe(true); // base set
    expect(free.priceStatus).toBe("free");
    expect(paid.required).toBe(false); // recommended
    expect(paid.priceStatus).toBe("paid");
  });

  it("installs the pack: the free base member downloads; the paid member needs its own license", async () => {
    const anon = new RepositoryClient({ url: baseUrl });
    const { entries } = await anon.resolvePack("com.demo.starter");

    // The required (base-set) free member installs unconditionally.
    const free = entries.find((e) => e.required)!;
    expect(verifyAzp(await anon.download(free.id, free.version)).ok).toBe(true);

    // The paid member is gated on ITS OWN entitlement, even though the pack is free.
    const paid = entries.find((e) => e.priceStatus === "paid")!;
    await expect(anon.download(paid.id, paid.version)).rejects.toThrow(/401 Unauthorized/);

    const licensed = new RepositoryClient({ url: baseUrl, token: "license-paid" });
    expect(verifyAzp(await licensed.download(paid.id, paid.version)).ok).toBe(true);
  });

  it("getPack returns the raw member list, and rejects a non-pack id", async () => {
    const client = new RepositoryClient({ url: baseUrl });
    const pack = await client.getPack("com.demo.starter");
    expect(pack.entries.map((e) => e.id)).toEqual(["com.demo.free-lut", "com.demo.paid-lut"]);
    await expect(client.getPack("com.demo.free-lut")).rejects.toThrow(/not an extension pack/);
  });
});
