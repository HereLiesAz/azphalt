#!/usr/bin/env node
/**
 * Validate `apps/storefront-react/public/listings.json` — the reviewed paid listings the store Worker
 * sells from. Nothing else checks these fields before they reach Stripe, so a typo here is a failed (or
 * mispriced) checkout in production. Run by `tools/validate-listings.test.mjs` (part of `pnpm test`).
 *
 *   node tools/validate-listings.mjs [path]   → prints each problem, exits 1 if there are any
 *
 * The minimum price is the one the Worker's fee split can honour: the application fee (processor
 * 2.9% + 30c plus the 15% platform fee) must stay below the amount, and Stripe's own floor for USD is
 * 50 cents, so nothing under 50 minor units is accepted.
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const MIN_AMOUNT_CENTS = 50;
// ISO 4217 minor-unit exponents, kept in step with apps/storefront-worker/src/currency.ts (a Worker test
// asserts they agree). `amountCents` is in the currency's minor unit, so 1000 is ¥1000 but $10.00 / 1.000 KWD.
const ZERO_DECIMAL = new Set(["BIF", "CLP", "DJF", "GNF", "ISK", "JPY", "KMF", "KRW", "PYG", "RWF", "UGX", "UYI", "VND", "VUV", "XAF", "XOF", "XPF"]);
const THREE_DECIMAL = new Set(["BHD", "IQD", "JOD", "KWD", "LYD", "OMR", "TND"]);
const FOUR_DECIMAL = new Set(["CLF", "UYW"]);
export function minorUnitExponent(currency) {
  if (ZERO_DECIMAL.has(currency)) return 0;
  if (THREE_DECIMAL.has(currency)) return 3;
  if (FOUR_DECIMAL.has(currency)) return 4;
  return 2;
}
/** Stripe accepts at most 8 digits of minor units. */
export const MAX_AMOUNT_MINOR = 99_999_999;
/** Smallest sensible price per exponent: about 50 US cents, and the application fee must stay below it. */
const MIN_BY_EXPONENT = { 0: 50, 2: MIN_AMOUNT_CENTS, 3: 500, 4: 5000 };
const CURRENCY = /^[A-Z]{3}$/;
const PACKAGE_ID = /^[A-Za-z0-9._-]{1,200}$/;
const INTEGRITY = /^sha256-[0-9a-f]{64}$/;
const STATUSES = ["active", "paused"];
const INTERVALS = ["month", "year"];

/** Every problem with a parsed listings document, as human-readable strings. Empty means valid. */
export function validateListings(listings) {
  const errors = [];
  if (!Array.isArray(listings)) return ["listings.json must be a JSON array"];
  const seen = new Set();
  listings.forEach((l, i) => {
    const at = `listing ${i}${l && typeof l.packageId === "string" ? ` (${l.packageId})` : ""}`;
    const fail = (msg) => errors.push(`${at}: ${msg}`);
    if (!l || typeof l !== "object" || Array.isArray(l)) return fail("must be an object");
    if (typeof l.packageId !== "string" || !PACKAGE_ID.test(l.packageId)) fail("packageId is missing or malformed");
    else if (seen.has(l.packageId)) fail("packageId is listed twice");
    else seen.add(l.packageId);
    if (typeof l.sellerId !== "string" || !l.sellerId || l.sellerId.length > 128) fail("sellerId is required (at most 128 characters)");
    if (!Number.isInteger(l.amountCents) || l.amountCents < MIN_AMOUNT_CENTS) {
      fail(`amountCents must be an integer of at least ${MIN_AMOUNT_CENTS}`);
    }
    if (typeof l.currency !== "string" || !CURRENCY.test(l.currency)) fail("currency must be an ISO 4217 code in capitals (e.g. USD)");
    else if (Number.isInteger(l.amountCents)) {
      const exp = minorUnitExponent(l.currency);
      const min = MIN_BY_EXPONENT[exp] ?? MIN_AMOUNT_CENTS;
      // (Below the universal floor the check above already reported it.)
      if (l.amountCents >= MIN_AMOUNT_CENTS && l.amountCents < min) fail(`amountCents ${l.amountCents} is below the ${min} minimum for ${l.currency} (minor units, ${exp} decimals)`);
      if (l.amountCents > MAX_AMOUNT_MINOR) fail(`amountCents must be at most ${MAX_AMOUNT_MINOR} (Stripe's 8-digit limit)`);
      // Stripe requires three-decimal amounts to be a multiple of 10 (its API only takes two significant decimals).
      if (exp === 3 && l.amountCents % 10 !== 0) fail(`${l.currency} amounts must be a multiple of 10 minor units (Stripe)`);
    }
    // Required, not defaulted: the Worker treats a missing status as paused, but going live (or not)
    // should be written down in the reviewed file.
    if (!STATUSES.includes(l.status)) fail(`status must be one of ${STATUSES.join(", ")}`);
    if (l.interval !== undefined && !INTERVALS.includes(l.interval)) fail(`interval, when set, must be one of ${INTERVALS.join(", ")}`);
    if (l.stripeAccountId !== undefined && !/^acct_[A-Za-z0-9]{1,64}$/.test(String(l.stripeAccountId))) {
      fail("stripeAccountId, when set, must be a Stripe acct_ id");
    }
    if (l.playProductId !== undefined && !/^[a-z0-9][a-z0-9_.]{0,139}$/.test(String(l.playProductId))) {
      fail("playProductId, when set, must be a valid Play product id");
    }
    const p = l.package;
    if (!p || typeof p !== "object") return fail("package metadata is required");
    if (typeof p.version !== "string" || !p.version) fail("package.version is required");
    if (typeof p.name !== "string" || !p.name) fail("package.name is required");
    if (typeof p.kind !== "string" || !p.kind) fail("package.kind is required");
    if (typeof p.integrity !== "string" || !INTEGRITY.test(p.integrity)) fail("package.integrity must be sha256-<64 lowercase hex>");
    if (p.bytes !== undefined && (!Number.isInteger(p.bytes) || p.bytes <= 0 || p.bytes > 100_000_000)) {
      fail("package.bytes, when set, must be a positive integer of at most 100 MB");
    }
  });
  return errors;
}

export const LISTINGS_PATH = resolve(dirname(fileURLToPath(import.meta.url)), "../apps/storefront-react/public/listings.json");

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const path = resolve(process.argv[2] ?? LISTINGS_PATH);
  const errors = validateListings(JSON.parse(readFileSync(path, "utf8")));
  for (const e of errors) console.error(e);
  if (errors.length) process.exit(1);
  console.log(`${path}: ok`);
}
