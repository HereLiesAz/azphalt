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
    // 10.000 KWD: 2.9% = 0.290 KWD = 290 fils, plus a flat 0.300 KWD = 300 fils.
    expect(quote(10_000, "KWD", env).processorFee.amountCents).toBe(590);
    // 1000 yen: 2.9% = 29 yen, and 30 hundredths of a yen is no yen.
    expect(quote(1000, "JPY", env).processorFee.amountCents).toBe(29);
    expect(quote(1000, "JPY", makeEnv({ PROCESSOR_FLAT_OVERRIDES: '{"JPY":45}' })).processorFee.amountCents).toBe(74);
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
  // Hand-computed: fee/amount to hundredths of a percent, rounded up so the platform never under-collects.
  it.each([
    [209, 1000, "20.90"], // 20.9 exactly
    [1, 3, "33.34"], // 33.3333...
    [17, 99, "17.18"], // 17.1717...
    [229, 333, "68.77"], // 68.7687...
    [4999, 9999, "50.00"], // 49.995 rounds up
  ])("fee %i of %i is %s", (fee, amount, expected) => {
    expect(applicationFeePercent(fee, amount)).toBe(expected);
  });
  it("is clamped to 0..100 with two decimals", () => {
    expect(applicationFeePercent(5000, 100)).toBe("100.00");
    expect(applicationFeePercent(0, 100)).toBe("0.00");
  });
});
