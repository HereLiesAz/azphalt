/** Subscription period math: `periodEnd` must advance one interval without overshooting month-end. */
import { describe, it, expect } from "vitest";
import { periodEnd } from "../src/index";

describe("periodEnd", () => {
  it("advances a month, clamping to month-end instead of rolling forward", () => {
    // Jan 31 has no counterpart in February — the naive setUTCMonth(+1) would roll to Mar 3.
    expect(periodEnd("2026-01-31T00:00:00.000Z", "month")).toBe("2026-02-28T00:00:00.000Z");
    expect(periodEnd("2024-01-31T00:00:00.000Z", "month")).toBe("2024-02-29T00:00:00.000Z"); // leap February
    expect(periodEnd("2026-03-31T00:00:00.000Z", "month")).toBe("2026-04-30T00:00:00.000Z");
  });

  it("advances a normal mid-month date by exactly one month", () => {
    expect(periodEnd("2026-01-15T09:30:00.000Z", "month")).toBe("2026-02-15T09:30:00.000Z");
  });

  it("advances a year, clamping Feb 29 to Feb 28 in a non-leap year", () => {
    expect(periodEnd("2026-03-10T00:00:00.000Z", "year")).toBe("2027-03-10T00:00:00.000Z");
    expect(periodEnd("2024-02-29T00:00:00.000Z", "year")).toBe("2025-02-28T00:00:00.000Z");
  });
});
