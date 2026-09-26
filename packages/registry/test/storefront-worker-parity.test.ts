/**
 * `apps/storefront-worker` is deliberately dependency-free (see its README § Zero-fixed-cost
 * design) and can't import `@azphalt/registry` at runtime, so it carries its own copies of the
 * fee-split (`quote`) and billing-period (`periodEnd`) math. This test is the drift guard: it runs
 * both copies against the same inputs, including the Jan-31 month-end overshoot this repo has
 * already had to fix once (see `period-end.test.ts`), and fails the moment they disagree.
 */
import { describe, it, expect } from "vitest";
import { periodEnd as registryPeriodEnd, quote as registryQuote } from "../src/consignment";
import { periodEnd as workerPeriodEnd, quote as workerQuote } from "../../../apps/storefront-worker/src/index";

const env = { PROCESSOR_PCT_BPS: "290", PROCESSOR_FLAT_CENTS: "30", PLATFORM_FEE_BPS: "1500" } as Parameters<typeof workerQuote>[2];

describe("storefront-worker fee/period math stays in sync with packages/registry", () => {
  it("quote agrees with the registry's consignment.quote for a range of amounts", () => {
    for (const amountCents of [0, 1, 99, 100, 499, 999, 1000, 4999, 12345, 999_999]) {
      const registry = registryQuote({ amountCents, currency: "usd" });
      const worker = workerQuote(amountCents, "usd", env);
      expect(worker).toEqual(registry);
    }
  });

  it("periodEnd agrees with the registry's consignment.periodEnd, including month-end overshoot", () => {
    const cases: Array<[string, "month" | "year"]> = [
      ["2026-01-31T00:00:00.000Z", "month"],
      ["2024-01-31T00:00:00.000Z", "month"],
      ["2026-03-31T00:00:00.000Z", "month"],
      ["2026-01-15T09:30:00.000Z", "month"],
      ["2026-03-10T00:00:00.000Z", "year"],
      ["2024-02-29T00:00:00.000Z", "year"],
    ];
    for (const [iso, interval] of cases) {
      expect(workerPeriodEnd(iso, interval)).toBe(registryPeriodEnd(iso, interval));
    }
  });
});
