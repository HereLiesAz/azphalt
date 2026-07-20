/**
 * Subscription renewal: a recorded subscription re-issues a fresh expiring entitlement per invoice
 * (idempotent on the invoice id), the buyer picks up each via their purchases, and a cancelled
 * subscription stops renewing. Exercised through the catalog helpers the Stripe webhook calls.
 */
import { generateKeyPairSync } from "node:crypto";
import { describe, expect, it } from "vitest";

const { privateKey } = generateKeyPairSync("ed25519");
process.env.AZPHALT_SIGNING_KEY = privateKey.export({ type: "pkcs8", format: "pem" }).toString();

const { recordSubscription, renewSubscription, cancelSubscription, listPurchases } = await import("../lib/catalog");

const PKG = "com.studioaz.cinelut"; // a subscription listing in the seeded catalog

function claimsOf(token: string): { kind: string; expiresAt?: string } {
  return JSON.parse(Buffer.from(token, "base64").toString("utf8")).claims;
}

describe("subscription renewal", () => {
  it("issues a fresh expiring entitlement per invoice, retrievable by the buyer", async () => {
    await recordSubscription({ subscriptionId: "sub_1", packageId: PKG, subject: "buyer_renew", interval: "month" });

    const t1 = await renewSubscription("sub_1", "in_1");
    expect(typeof t1).toBe("string");
    const c1 = claimsOf(t1 as string);
    expect(c1.kind).toBe("subscription");
    expect(new Date(c1.expiresAt!).getTime()).toBeGreaterThan(Date.now());

    const t2 = await renewSubscription("sub_1", "in_2");
    expect(t2).toBeTruthy();
    expect(t2).not.toBe(t1); // a distinct entitlement for the new period

    const mine = (await listPurchases("buyer_renew")).filter((p) => p.packageId === PKG);
    expect(mine.length).toBeGreaterThanOrEqual(2);
  });

  it("is idempotent on the invoice id (a re-delivered invoice.paid re-issues nothing)", async () => {
    await recordSubscription({ subscriptionId: "sub_2", packageId: PKG, subject: "buyer_idem", interval: "month" });
    const a = await renewSubscription("sub_2", "in_same");
    const b = await renewSubscription("sub_2", "in_same");
    expect(a).toBe(b);
  });

  it("stops renewing after the subscription is cancelled", async () => {
    await recordSubscription({ subscriptionId: "sub_3", packageId: PKG, subject: "buyer_cancel", interval: "month" });
    await cancelSubscription("sub_3");
    expect(await renewSubscription("sub_3", "in_x")).toBeUndefined();
  });
});
