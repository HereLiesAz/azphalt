import { describe, it, expect } from "vitest";
import { InMemorySubscriptionStore, type SubscriptionRecord } from "../src/index";

const rec: SubscriptionRecord = {
  subscriptionId: "sub_1",
  packageId: "com.you.thing",
  subject: "buyer_1",
  interval: "month",
};

describe("InMemorySubscriptionStore", () => {
  it("stores, reads, and deletes a subscription by processor id", async () => {
    const store = new InMemorySubscriptionStore();
    await store.put(rec);
    expect((await store.get("sub_1"))?.packageId).toBe("com.you.thing");
    expect(await store.get("sub_unknown")).toBeUndefined();
    await store.delete("sub_1");
    expect(await store.get("sub_1")).toBeUndefined();
  });

  it("replaces a record on re-put", async () => {
    const store = new InMemorySubscriptionStore();
    await store.put(rec);
    await store.put({ ...rec, interval: "year" });
    expect((await store.get("sub_1"))?.interval).toBe("year");
  });
});
