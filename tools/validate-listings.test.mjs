// Tests for tools/validate-listings.mjs, and the committed listings.json itself. Run with
// `node --test "tools/*.test.mjs"` (part of `pnpm test`).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LISTINGS_PATH, MIN_AMOUNT_CENTS, validateListings } from "./validate-listings.mjs";

const good = () => ({
  packageId: "com.example.paid",
  sellerId: "seller",
  amountCents: 299,
  currency: "USD",
  status: "paused",
  package: { version: "1.0.0", name: "Paid", kind: "asset", bytes: 10, integrity: "sha256-" + "a".repeat(64) },
});

test("the committed listings.json is valid", () => {
  assert.deepEqual(validateListings(JSON.parse(readFileSync(LISTINGS_PATH, "utf8"))), []);
});

test("a well-formed listing passes", () => {
  assert.deepEqual(validateListings([good()]), []);
  assert.deepEqual(validateListings([{ ...good(), interval: "month", stripeAccountId: "acct_123", status: "active" }]), []);
});

test("each bad field is reported", () => {
  const cases = [
    [{ amountCents: MIN_AMOUNT_CENTS - 1 }, /amountCents/],
    [{ amountCents: 2.5 }, /amountCents/],
    [{ currency: "usd" }, /currency/],
    [{ status: undefined }, /status/],
    [{ status: "live" }, /status/],
    [{ interval: "week" }, /interval/],
    [{ stripeAccountId: "acct-x" }, /stripeAccountId/],
    [{ package: { ...good().package, integrity: "sha256-SFyXTz9T=" } }, /integrity/],
    [{ packageId: "bad id" }, /packageId/],
    [{ sellerId: "" }, /sellerId/],
  ];
  for (const [patch, pattern] of cases) {
    const errors = validateListings([{ ...good(), ...patch }]);
    assert.equal(errors.length, 1, JSON.stringify(patch) + " → " + errors.join("; "));
    assert.match(errors[0], pattern);
  }
});

test("duplicate ids and a non-array are refused", () => {
  assert.match(validateListings([good(), good()]).join(), /twice/);
  assert.deepEqual(validateListings({}), ["listings.json must be a JSON array"]);
});

test("the amount must make sense for the currency's minor unit", () => {
  // 1000 is ¥1000 for JPY (whole units) but only 10.00 for USD: both fine, and 49 yen is not.
  assert.deepEqual(validateListings([{ ...good(), currency: "JPY", amountCents: 1000 }]), []);
  assert.match(validateListings([{ ...good(), currency: "JPY", amountCents: 49 }]).join(), /amountCents/);
  // KWD has three decimals: 5.000 KWD is 5000 fils, and the Stripe multiple-of-10 rule applies.
  assert.deepEqual(validateListings([{ ...good(), currency: "KWD", amountCents: 5000 }]), []);
  assert.match(validateListings([{ ...good(), currency: "KWD", amountCents: 5005 }]).join(), /multiple of 10/);
  assert.match(validateListings([{ ...good(), currency: "KWD", amountCents: 100 }]).join(), /minimum for KWD/);
  assert.match(validateListings([{ ...good(), currency: "USD", amountCents: 100_000_000 }]).join(), /8-digit/);
});
