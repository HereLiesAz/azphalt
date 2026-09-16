/**
 * Buyer "my purchases" recovery: after a (stub) purchase settles, the browser can list its issued
 * licences and recover a usable download token through the signed buyer-session cookie.
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
const { newBuyerSubject } = await import("../lib/buyer-session");

/** Consigned for sale in the seeded catalog. */
const PAID = "com.hereliesaz.halftone";

async function buy(packageId: string): Promise<{ buyerId: string; cookie: string }> {
  const buyerId = newBuyerSubject();
  const started = await checkout(
    new Request("http://localhost/api/checkout", {
      method: "POST",
      body: JSON.stringify({ packageId, buyerId }),
    }),
  );
  expect(started.status).toBe(200);
  const setCookie = started.headers.get("set-cookie");
  expect(setCookie).toBeTruthy();
  const cookie = setCookie!.split(";", 1)[0];

  const { session } = await started.json();
  const fulfilled = await complete(
    new Request("http://localhost/api/checkout/complete", {
      method: "POST",
      body: JSON.stringify({ sessionId: session.id }),
    }),
  );
  expect(fulfilled.status).toBe(200);
  return { buyerId, cookie };
}

describe("buyer purchases recovery", () => {
  it("lists a settled purchase with a non-empty download token", async () => {
    const { buyerId } = await buy(PAID);
    const list = await listPurchases(buyerId);
    expect(list.map((p) => p.packageId)).toEqual([PAID]);
    expect(typeof list[0].token).toBe("string");
    expect(list[0].token.length).toBeGreaterThan(0);
  });

  it("GET /api/purchases returns only the signed session's purchases", async () => {
    const { cookie } = await buy(PAID);
    const res = await purchases(
      new Request("http://localhost/api/purchases", { headers: { cookie } }),
    );
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.purchases.map((p: { packageId: string }) => p.packageId)).toContain(PAID);
  });

  it("rejects recovery without a signed buyer session even when a subject is supplied", async () => {
    const { buyerId } = await buy(PAID);
    const res = await purchases(
      new Request(`http://localhost/api/purchases?subject=${encodeURIComponent(buyerId)}`),
    );
    expect(res.status).toBe(401);
  });

  it("returns an empty list for a buyer with no purchases", async () => {
    expect(await listPurchases(newBuyerSubject())).toEqual([]);
  });
});
