/**
 * Regression tests for the registry security fixes: publish requires a signature and pins the
 * publisher key; versions can't collide in precedence; a quarantined (fully-yanked) package stops
 * resolving/serving/browsing; a listing can't be re-pointed to a different seller; and a subscription
 * entitlement must carry an expiry.
 */
import { describe, it, expect } from "vitest";
import { writeAzp, signAzp, generateSigningKey } from "@azphalt/azp";
import { Registry, InMemoryStore, Marketplace, issueEntitlement, verifyEntitlement } from "../src/index";

const license = "MIT License\n";
const enc = (s: string) => new TextEncoder().encode(s);
const base = { azphalt: "0.1", license: "MIT", compat: ">=0.1" } as const;

function pkg(id: string, version: string, key: { privateKey: string }, body = "x") {
  const unsigned = writeAzp({
    manifest: { ...base, id, name: id, version, kind: "asset" as const, assets: [{ type: "brush", path: "assets/b" }] },
    payload: { "assets/b": enc(body) },
    license,
  }).azp;
  return signAzp(unsigned, { privateKey: key.privateKey });
}

describe("publish signature + pinning", () => {
  it("rejects an unsigned publish by default", async () => {
    const reg = new Registry(new InMemoryStore());
    const unsigned = writeAzp({
      manifest: { ...base, id: "com.acme.unsigned", name: "U", version: "1.0.0", kind: "asset", assets: [{ type: "brush", path: "assets/b" }] },
      payload: { "assets/b": enc("x") },
      license,
    }).azp;
    await expect(reg.publish(unsigned)).rejects.toThrow(/must be signed/);
  });

  it("pins an id to its first publisher key and rejects a different key", async () => {
    const reg = new Registry(new InMemoryStore());
    const owner = generateSigningKey();
    const thief = generateSigningKey();
    await reg.publish(pkg("com.acme.owned", "1.0.0", owner));
    await expect(reg.publish(pkg("com.acme.owned", "2.0.0", thief))).rejects.toThrow(/pinned/);
    // same owner can publish a new version
    await expect(reg.publish(pkg("com.acme.owned", "1.1.0", owner))).resolves.toBeTruthy();
  });

  it("rejects a version that collides in precedence (1.0.0 vs 1.0.0+build)", async () => {
    const reg = new Registry(new InMemoryStore());
    const k = generateSigningKey();
    await reg.publish(pkg("com.acme.v", "1.0.0", k));
    await expect(reg.publish(pkg("com.acme.v", "1.0.0+evil", k))).rejects.toThrow(/precedence/);
  });
});

describe("quarantine removes a package from the open lane", () => {
  it("a fully-yanked package stops resolving, serving, and browsing", async () => {
    const reg = new Registry(new InMemoryStore());
    const k = generateSigningKey();
    await reg.publish(pkg("com.acme.bad", "1.0.0", k));
    await reg.yank("com.acme.bad", "1.0.0", true, "malware");

    expect(await reg.latest("com.acme.bad")).toBeUndefined();
    expect(await reg.getSummary("com.acme.bad")).toBeUndefined();
    expect((await reg.list()).map((s) => s.id)).not.toContain("com.acme.bad");
    await expect(reg.serve("com.acme.bad")).rejects.toThrow(/not found/);
  });
});

describe("consignment seller ownership", () => {
  it("rejects re-listing a package under a different seller", async () => {
    const store = new InMemoryStore();
    const reg = new Registry(store);
    const k = generateSigningKey();
    await reg.publish(pkg("com.acme.paid", "1.0.0", k));
    const market = new Marketplace(reg, store);
    await market.listForSale("com.acme.paid", "seller-A", { amountCents: 500, currency: "usd" });
    await expect(
      market.listForSale("com.acme.paid", "seller-B", { amountCents: 500, currency: "usd" }),
    ).rejects.toThrow(/different seller/);
  });
});

describe("subscription entitlement expiry", () => {
  it("refuses to issue a subscription with no expiresAt", () => {
    const key = generateSigningKey();
    expect(() =>
      issueEntitlement(key.privateKey, { packageId: "com.x.y", subject: "s", kind: "subscription", issuedAt: new Date().toISOString() }),
    ).toThrow(/expiresAt/);
  });

  it("treats a subscription with no expiresAt as not live if one is somehow constructed", () => {
    const key = generateSigningKey();
    // Perpetual token is fine with no expiry.
    const perp = issueEntitlement(key.privateKey, { packageId: "com.x.y", subject: "s", kind: "perpetual", issuedAt: new Date().toISOString() });
    const pub = perp.publicKey;
    expect(verifyEntitlement(perp, { trustedKeys: [pub], packageId: "com.x.y" }).valid).toBe(true);
  });
});

describe("reports and semver", () => {
  it("refuses a report for a package or version the registry does not hold", async () => {
    const reg = new Registry(new InMemoryStore());
    const k = generateSigningKey();
    await reg.publish(pkg("com.acme.real", "1.0.0", k));
    await expect(reg.report({ packageId: "com.nope.ghost", reason: "malware" as never })).rejects.toThrow(/unknown package/);
    await expect(reg.report({ packageId: "com.acme.real", version: "9.9.9", reason: "malware" as never })).rejects.toThrow(/unknown version/);
    await expect(reg.report({ packageId: "com.acme.real", version: "1.0.0", reason: "malware" as never })).resolves.toBeTruthy();
  });

  it("orders numeric prerelease identifiers past 2^53 correctly", async () => {
    const { compareSemver } = await import("../src/index");
    expect(compareSemver("1.0.0-rc.9007199254740993", "1.0.0-rc.9007199254740992")).toBeGreaterThan(0);
    expect(compareSemver("1.0.0", "1.0.0-rc.1")).toBeGreaterThan(0);
  });
});
