import { describe, it, expect } from "vitest";
import { Registry } from "../src/registry.js";
import { InMemoryStore } from "../src/store.js";
import { Marketplace, StubPaymentProvider, quote, DEFAULT_TERMS } from "../src/consignment.js";
import { makeAzp } from "./make.js";

const USD = (amountCents: number) => ({ amountCents, currency: "USD" });

function setup() {
  const store = new InMemoryStore();
  const registry = new Registry(store);
  const payments = new StubPaymentProvider();
  const market = new Marketplace(registry, store, { payments });
  return { store, registry, market, payments };
}

describe("quote", () => {
  it("splits price into processor, platform, and seller net", () => {
    const b = quote(USD(499), DEFAULT_TERMS);
    // processor: round(499 * 290/10000)=14, +30 flat = 44; platform: round(499*1500/10000)=75.
    expect(b.processorFee.amountCents).toBe(44);
    expect(b.platformFee.amountCents).toBe(75);
    expect(b.sellerNet.amountCents).toBe(499 - 44 - 75);
    expect(b.gross.amountCents).toBe(499);
    expect(b.sellerNet.currency).toBe("USD");
  });

  it("never returns a negative seller net", () => {
    expect(quote(USD(10), DEFAULT_TERMS).sellerNet.amountCents).toBe(0);
  });
});

describe("Marketplace", () => {
  it("refuses to list a package that is not in the registry", async () => {
    const { market } = setup();
    await expect(market.listForSale("com.nope.nope", "seller_1", USD(499))).rejects.toThrow(/unknown package/);
  });

  it("lists a published package and quotes its split", async () => {
    const { registry, market } = setup();
    await registry.publish(makeAzp("com.hereliesaz.paid", "1.0.0"));
    const listing = await market.listForSale("com.hereliesaz.paid", "seller_1", USD(499));
    expect(listing.status).toBe("active");
    expect(listing.price.amountCents).toBe(499);
    expect((await market.getListing("com.hereliesaz.paid"))?.sellerId).toBe("seller_1");
    expect((await market.quote("com.hereliesaz.paid")).sellerNet.amountCents).toBe(380);
    expect(await market.activeListings()).toHaveLength(1);
  });

  it("rejects a non-positive price", async () => {
    const { registry, market } = setup();
    await registry.publish(makeAzp("com.hereliesaz.free", "1.0.0"));
    await expect(market.listForSale("com.hereliesaz.free", "s", USD(0))).rejects.toThrow(/positive/);
  });

  it("opens a checkout session and applies the split", async () => {
    const { registry, market, payments } = setup();
    await registry.publish(makeAzp("com.hereliesaz.buy", "1.0.0"));
    await market.listForSale("com.hereliesaz.buy", "seller_1", USD(1000));

    const { session, breakdown } = await market.checkout("com.hereliesaz.buy", "buyer_1");
    expect(session.status).toBe("pending");
    expect(session.url).toContain("stub://checkout/");
    expect(breakdown.platformFee.amountCents).toBe(150);

    const done = await payments.simulate(session.id, "completed");
    expect(done.status).toBe("completed");
  });

  it("stops selling once unlisted", async () => {
    const { registry, market } = setup();
    await registry.publish(makeAzp("com.hereliesaz.gone", "1.0.0"));
    await market.listForSale("com.hereliesaz.gone", "seller_1", USD(499));
    await market.unlist("com.hereliesaz.gone");
    expect((await market.getListing("com.hereliesaz.gone"))?.status).toBe("unlisted");
    await expect(market.checkout("com.hereliesaz.gone", "buyer_1")).rejects.toThrow(/not for sale/);
    expect(await market.activeListings()).toHaveLength(0);
  });
});
