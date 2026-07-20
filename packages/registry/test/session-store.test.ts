import { describe, it, expect } from "vitest";
import {
  StubPaymentProvider,
  InMemoryPaymentSessionStore,
  InMemoryEntitlementStore,
  issueEntitlement,
  type CheckoutInput,
} from "../src/index.js";

const USD = (amountCents: number) => ({ amountCents, currency: "USD" });

function input(buyerId: string, packageId = "com.test.pkg"): CheckoutInput {
  return { packageId, sellerId: "seller_1", buyerId, amount: USD(1000), platformFee: USD(150) };
}

describe("StubPaymentProvider — durable-safe sessions", () => {
  it("remembers the originating input so fulfilment need not trust a request body", async () => {
    const provider = new StubPaymentProvider();
    const session = await provider.createCheckout(input("buyer_1", "com.test.thing"));
    expect(await provider.getInput(session.id)).toMatchObject({ packageId: "com.test.thing", buyerId: "buyer_1" });
  });

  it("generates non-colliding session ids across two provider instances sharing a store", async () => {
    const store = new InMemoryPaymentSessionStore();
    const a = new StubPaymentProvider({ sessions: store });
    const b = new StubPaymentProvider({ sessions: store });
    const ids = new Set<string>();
    for (let i = 0; i < 50; i++) {
      ids.add((await a.createCheckout(input(`a_${i}`))).id);
      ids.add((await b.createCheckout(input(`b_${i}`))).id);
    }
    expect(ids.size).toBe(100); // no counter collision would give < 100
  });

  it("fulfilment via a shared store is visible to a second provider instance", async () => {
    const store = new InMemoryPaymentSessionStore();
    const created = await new StubPaymentProvider({ sessions: store }).createCheckout(input("buyer_2"));
    // A different instance (as on another serverless invocation) resolves and completes the session.
    const other = new StubPaymentProvider({ sessions: store });
    expect((await other.getSession(created.id))?.status).toBe("pending");
    const done = await other.simulate(created.id, "completed");
    expect(done.status).toBe("completed");
  });
});

describe("InMemoryEntitlementStore", () => {
  it("is idempotent on sessionId — a webhook retry cannot mint two licenses", async () => {
    // A real Ed25519 PEM so issueEntitlement succeeds.
    const { generateKeyPairSync } = await import("node:crypto");
    const { privateKey } = generateKeyPairSync("ed25519");
    const pem = privateKey.export({ type: "pkcs8", format: "pem" }) as string;

    const store = new InMemoryEntitlementStore();
    const token = issueEntitlement(pem, {
      packageId: "com.test.pkg",
      subject: "buyer_1",
      kind: "perpetual",
      issuedAt: "2026-07-14T00:00:00.000Z",
    });
    await store.put({ sessionId: "cs_1", packageId: "com.test.pkg", subject: "buyer_1", token, issuedAt: "2026-07-14T00:00:00.000Z" });
    // A retry with a different token for the same session must not replace the first.
    const token2 = issueEntitlement(pem, {
      packageId: "com.test.pkg",
      subject: "buyer_1",
      kind: "perpetual",
      issuedAt: "2026-07-14T01:00:00.000Z",
    });
    await store.put({ sessionId: "cs_1", packageId: "com.test.pkg", subject: "buyer_1", token: token2, issuedAt: "2026-07-14T01:00:00.000Z" });

    const got = await store.getBySession("cs_1");
    expect(got?.issuedAt).toBe("2026-07-14T00:00:00.000Z"); // first write wins
    expect((await store.listBySubject("buyer_1")).length).toBe(1);
  });
});
