/**
 * Buyer "my purchases" recovery: after a (stub) purchase settles, the buyer can list their issued
 * licenses and recover a usable download token — closing the loop with `EntitlementStore.listBySubject`.
 *
 * Mirrors `download-gate.test.ts`: the signing key + stub-fulfilment opt-in are set before the dynamic
 * import, since `lib/catalog.ts` reads them at module load.
 */
import { generateKeyPairSync } from "node:crypto";
import { describe, expect, it } from "vitest";

const { privateKey } = generateKeyPairSync("ed25519");
process.env.AZPHALT_SIGNING_KEY = privateKey.export({ type: "pkcs8", format: "pem" }).toString();
process.env.AZPHALT_ALLOW_STUB_FULFILMENT = "1";

const { POST: checkout } = await import("../app/api/checkout/route");
const { POST: complete } = await import("../app/api/checkout/complete/route");
const { GET: purchases } = await import("../app/api/purchases/route");
const { listPurchases } = await import("../lib/catalog");

/** Consigned for sale in the seeded catalog. */
const PAID = "com.hereliesaz.halftone";

async function buy(packageId: string, buyerId: string): Promise<void> {
  const started = await checkout(
    new Request("http://localhost/api/checkout", { method: "POST", body: JSON.stringify({ packageId, buyerId }) }),
  );
  const { session } = await started.json();
  await complete(
    new Request("http://localhost/api/checkout/complete", { method: "POST", body: JSON.stringify({ sessionId: session.id }) }),
  );
}

describe("buyer purchases recovery", () => {
  it("lists a settled purchase with a non-empty download token", async () => {
    await buy(PAID, "buyer_alice");
    const list = await listPurchases("buyer_alice");
    expect(list.map((p) => p.packageId)).toEqual([PAID]);
    expect(typeof list[0].token).toBe("string");
    expect(list[0].token.length).toBeGreaterThan(0);
  });

  it("GET /api/purchases returns the buyer's purchases, and 400s without a subject", async () => {
    await buy(PAID, "buyer_bob");
    const res = await purchases(new Request("http://localhost/api/purchases?subject=buyer_bob"));
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.purchases.map((p: { packageId: string }) => p.packageId)).toContain(PAID);

    const bad = await purchases(new Request("http://localhost/api/purchases"));
    expect(bad.status).toBe(400);
  });

  it("returns an empty list for a buyer with no purchases", async () => {
    expect(await listPurchases("buyer_nobody")).toEqual([]);
  });
});
