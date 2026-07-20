/**
 * The payout-hijack guard: an operator-configured seller (in `AZPHALT_STRIPE_CONNECTED_ACCOUNTS`)
 * must never be self-onboardable, or an unauthenticated caller could insert a store record that
 * overrides the operator's payout destination.
 *
 * `lib/catalog.ts` reads the Stripe env at module load, so the env is set before the dynamic import.
 * The guard throws before any Stripe API call, so no network/keys are needed.
 */
import { describe, expect, it } from "vitest";

process.env.AZPHALT_STRIPE_SECRET_KEY = "sk_test_guard";
process.env.AZPHALT_STRIPE_SUCCESS_URL = "https://shop.example/ok?session_id={CHECKOUT_SESSION_ID}";
process.env.AZPHALT_STRIPE_CANCEL_URL = "https://shop.example/no";
process.env.AZPHALT_STRIPE_CONNECTED_ACCOUNTS = JSON.stringify({ seller_operator: "acct_operator" });

const { onboardSeller } = await import("../lib/catalog");

describe("onboardSeller — payout-hijack guard", () => {
  it("refuses to self-onboard a seller that is operator-configured in the env map", async () => {
    await expect(
      onboardSeller("seller_operator", { returnUrl: "https://shop.example/connect", refreshUrl: "https://shop.example/connect" }),
    ).rejects.toThrow(/operator-configured/);
  });
});
