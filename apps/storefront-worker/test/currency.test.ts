import { describe, expect, it } from "vitest";
import { applicationFeePercent, quote, sellerBreakdown } from "../src/index";
import { flatFeeMinor, microsToMinorFloor, minorToMicros, minorUnitExponent } from "../src/currency";
import { minorUnitExponent as validatorExponent } from "../../../tools/validate-listings.mjs";
import { assets, baseVars, durableState } from "./harness";

function makeEnv(extra: Record<string, unknown> = {}) {
  return { ...baseVars, ASSETS: assets({}), STATE: durableState(), ...extra } as never;
}

describe("minor units", () => {
  it("knows zero, two and three decimal currencies", () => {
    expect(minorUnitExponent("jpy")).toBe(0);
    expect(minorUnitExponent("USD")).toBe(2);
    expect(minorUnitExponent("KWD")).toBe(3);
  });
  it("round-trips minor units and micros", () => {
    expect(minorToMicros(1000, "JPY")).toBe(1_000_000_000);
    expect(minorToMicros(1000, "USD")).toBe(10_000_000);
    expect(minorToMicros(1000, "KWD")).toBe(1_000_000);
    expect(microsToMinorFloor(650_000_000, "JPY")).toBe(650);
  });
  it("agrees with the listings validator", () => {
    for (const c of ["JPY", "USD", "KWD", "BHD", "CLP", "EUR", "CLF"]) expect(validatorExponent(c)).toBe(minorUnitExponent(c));
  });
  it("scales the flat fee to the currency and honours an override", () => {
    expect(flatFeeMinor(30, "USD")).toBe(30);
    expect(flatFeeMinor(30, "KWD")).toBe(300);
    expect(flatFeeMinor(30, "JPY")).toBe(0);
    expect(flatFeeMinor(30, "JPY", { JPY: 45 })).toBe(45);
  });
});

describe("quote across currencies", () => {
  const env = makeEnv();
  it("does not charge 30 yen or 30 fils as the flat fee", () => {
    expect(quote(1000, "USD", env).processorFee.amountCents).toBe(59);
    expect(quote(10_000, "KWD", env).processorFee.amountCents).toBe(Math.round(10_000 * 0.029) + 300);
    expect(quote(1000, "JPY", env).processorFee.amountCents).toBe(Math.round(1000 * 0.029));
    expect(quote(1000, "JPY", makeEnv({ PROCESSOR_FLAT_OVERRIDES: '{"JPY":45}' })).processorFee.amountCents).toBe(29 + 45);
  });
  it("a mistyped rate falls back instead of producing NaN", () => {
    const q = quote(1000, "USD", makeEnv({ PROCESSOR_PCT_BPS: "abc", PLATFORM_FEE_BPS: "-5", PROCESSOR_FLAT_CENTS: "x" }));
    expect(q.processorFee.amountCents).toBe(59);
    expect(q.platformFee.amountCents).toBe(150);
    expect(Number.isFinite(q.sellerNet.amountCents)).toBe(true);
  });
  it("sellerBreakdown prices a JPY listing in yen on the Play route", () => {
    const b = sellerBreakdown({ amountCents: 1000, currency: "JPY" }, makeEnv());
    expect(b.inAppPlay.sellerNet.amountCents).toBe(650);
    expect(b.inAppPlay.googleServiceFee.amountCents).toBe(150);
  });
  it("sellerBreakdown prices a KWD listing in fils", () => {
    const b = sellerBreakdown({ amountCents: 10_000, currency: "KWD" }, makeEnv());
    expect(b.inAppPlay.sellerNet.amountCents).toBe(6500);
  });
});

describe("applicationFeePercent", () => {
  it("never under-collects and stays within one hundredth of a percent", () => {
    for (const [fee, amount] of [[59 + 150, 1000], [29 + 150 + 50, 333], [1, 3], [17, 99], [4999, 9999]] as const) {
      const pct = Number(applicationFeePercent(fee, amount));
      expect(pct / 100 * amount).toBeGreaterThanOrEqual(fee - 1e-9);
      expect(pct / 100 * amount - fee).toBeLessThan(amount * 0.0001 + 1e-9);
    }
  });
  it("is clamped to 0..100 with two decimals", () => {
    expect(applicationFeePercent(209, 1000)).toBe("20.90");
    expect(applicationFeePercent(5000, 100)).toBe("100.00");
    expect(applicationFeePercent(0, 100)).toBe("0.00");
  });
});
