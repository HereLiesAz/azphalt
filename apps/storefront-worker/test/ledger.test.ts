import { DatabaseSync } from "node:sqlite";
import { describe, expect, it } from "vitest";
import { holdbackOf, payoutCents, PlayLedger, splitPlaySale, type SaleInput } from "../src/ledger";

function sqlite() {
  const db = new DatabaseSync(":memory:");
  const sql = { exec: (q: string, ...b: unknown[]) => db.prepare(q).all(...(b.map((x) => (x === undefined ? null : x)) as never[])) as Record<string, unknown>[] };
  PlayLedger.migrate(sql);
  return new PlayLedger(sql);
}

const fees = { googleFeeBps: 1500, platformFeeBps: 1500, inAppFeeBps: 500, holdbackBps: 1000 };
const T0 = new Date("2026-10-01T00:00:00Z");
const hours = (h: number) => new Date(T0.getTime() + h * 3600_000);

function sale(orderId: string, cents = 1000, extra: Partial<SaleInput> = {}): SaleInput {
  const split = splitPlaySale(cents * 10_000, 0, fees);
  return {
    orderId, packageName: "com.hereliesaz.graffux", purchaseToken: "tok-" + orderId, packageId: "com.example.paid",
    sellerId: "seller_1", buyerCountry: "US", currency: "USD", grossMicros: cents * 10_000, taxMicros: 0, amountSource: "order",
    split, payoutCurrency: "USD", payoutCents: payoutCents(split, "USD", { amountCents: cents, currency: "USD" }),
    holdbackBps: 1000, purchasedAt: T0.toISOString(), holdHours: 96, holdbackDays: 90, ...extra,
  };
}

describe("Play split", () => {
  it("seller share = net − Google fee − (platform 15% + in-app 5%)", () => {
    const s = splitPlaySale(10_000_000, 0, fees); // $10.00
    expect(s).toEqual({ netMicros: 10_000_000, googleFeeMicros: 1_500_000, platformFeeMicros: 2_000_000, sellerShareMicros: 6_500_000 });
  });

  it("fees are taken on the pre-tax amount", () => {
    const s = splitPlaySale(12_000_000, 2_000_000, fees); // €12 incl. €2 VAT
    expect(s.netMicros).toBe(10_000_000);
    expect(s.sellerShareMicros).toBe(6_500_000);
  });

  it("other currencies pay the same fraction of the listing price", () => {
    const s = splitPlaySale(1_000_000_000, 0, fees); // ¥1000
    expect(payoutCents(s, "JPY", { amountCents: 700, currency: "USD" })).toBe(455);
    expect(payoutCents(splitPlaySale(0, 0, fees), "JPY", { amountCents: 700, currency: "USD" })).toBeUndefined();
  });

  it("holds back 10%", () => {
    expect(holdbackOf(650, 1000)).toEqual({ main: 585, holdback: 65 });
  });
});

describe("PlayLedger", () => {
  it("records idempotently on order id and purchase token", () => {
    const l = sqlite();
    expect(l.record(sale("GPA.1")).created).toBe(true);
    expect(l.record(sale("GPA.1")).created).toBe(false);
    expect(l.record({ ...sale("GPA.other"), purchaseToken: "tok-GPA.1" }).created).toBe(false);
    const row = l.get("GPA.1")!;
    expect(row).toMatchObject({ mainCents: 585, holdbackCents: 65, mainStatus: "pending", holdbackStatus: "pending" });
    expect(row.mainDueAt).toBe(hours(96).toISOString());
    expect(row.holdbackDueAt).toBe(hours(90 * 24).toISOString());
  });

  it("pays the main part after the hold, the holdback after 90 days, each once", () => {
    const l = sqlite();
    l.record(sale("GPA.1"));
    expect(l.claimDue(hours(95))).toEqual([]);
    const [c] = l.claimDue(hours(97));
    expect(c).toMatchObject({ part: "main", cents: 585, idempotencyKey: "azp_payout_main_GPA.1" });
    expect(l.claimDue(hours(97))).toEqual([]); // processing, not stale
    l.markPaid("GPA.1", "main", "tr_1");
    expect(l.claimDue(hours(24 * 89))).toEqual([]);
    const [h] = l.claimDue(hours(24 * 90 + 1));
    expect(h).toMatchObject({ part: "holdback", cents: 65 });
    l.markPaid("GPA.1", "holdback", "tr_2");
    expect(l.get("GPA.1")).toMatchObject({ mainStatus: "paid", holdbackStatus: "paid", mainTransferId: "tr_1" });
  });

  it("a crashed run reclaims the same amount under the same key", () => {
    const l = sqlite();
    l.record(sale("GPA.1"));
    const [first] = l.claimDue(hours(97));
    const [again] = l.claimDue(new Date(hours(97).getTime() + 11 * 60_000));
    expect(again).toEqual(first);
  });

  it("insufficient balance backs off and retries", () => {
    const l = sqlite();
    l.record(sale("GPA.1"));
    l.claimDue(hours(97));
    l.markRetry("GPA.1", "main", "balance_insufficient", hours(97));
    expect(l.claimDue(hours(97.1))).toEqual([]);
    expect(l.claimDue(hours(97.3))[0]).toMatchObject({ part: "main", cents: 585 });
  });

  it("a void before payout cancels both parts and pays nothing", () => {
    const l = sqlite();
    l.record(sale("GPA.1"));
    expect(l.applyVoid("GPA.1", hours(10))).toEqual({ found: true, newly: true, reversals: [] });
    expect(l.get("GPA.1")).toMatchObject({ mainStatus: "cancelled", holdbackStatus: "cancelled" });
    expect(l.claimDue(hours(24 * 100))).toEqual([]);
    expect(l.applyVoid("GPA.1").reversals).toEqual([]); // idempotent
  });

  it("a void after payout is taken from holdback first, then reversed", () => {
    const l = sqlite();
    l.record(sale("GPA.1"));
    l.record({ ...sale("GPA.2", 2000), purchasedAt: hours(1).toISOString() }); // holdback 130
    for (const c of l.claimDue(hours(98))) l.markPaid(c.orderId, c.part, "tr_" + c.orderId);
    // GPA.1 owed 650: its own holdback 65, then GPA.2's holdback 130, then 455 reversed from tr_GPA.1.
    const { reversals } = l.applyVoid("GPA.1", hours(120));
    expect(reversals).toEqual([{ orderId: "GPA.1", part: "main", transferId: "tr_GPA.1", cents: 455 }]);
    expect(l.get("GPA.2")!.holdbackCents).toBe(0);
    expect(l.get("GPA.1")!.holdbackStatus).toBe("cancelled");
    expect(l.events("GPA.1").map((e) => e.event)).toContain("recovered_from_holdback");
  });

  it("debits net against the next payout", () => {
    const l = sqlite();
    l.record(sale("GPA.1"));
    l.addDebit("seller_1", "USD", 100, "GPA.0", "reversal_failed");
    const [c] = l.claimDue(hours(97));
    expect(c).toMatchObject({ grossCents: 585, debitCents: 100, cents: 485 });
    l.markPaid("GPA.1", "main", "tr_1");
    expect(l.debit("seller_1", "USD")).toBe(0);
  });

  it("lists by status with a summary for the admin view", () => {
    const l = sqlite();
    l.record(sale("GPA.1"));
    l.record(sale("GPA.2"));
    l.applyVoid("GPA.2");
    expect(l.list({ status: "pending" }).map((s) => s.orderId)).toEqual(["GPA.1"]);
    expect(l.list({ status: "voided" }).map((s) => s.orderId)).toEqual(["GPA.2"]);
    expect(l.summary()["main:pending"]).toEqual({ count: 1, cents: { USD: 585 } });
  });

  it("an uncomputable amount goes to review until released", () => {
    const l = sqlite();
    l.record({ ...sale("GPA.1"), payoutCents: undefined });
    expect(l.get("GPA.1")!.mainStatus).toBe("review");
    expect(l.claimDue(hours(24 * 100))).toEqual([]);
    expect(l.release("GPA.1", "main")).toBe(true);
  });
});
