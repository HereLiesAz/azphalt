/**
 * ISO 4217 minor-unit exponents. Every amount in this Worker that is called "cents" is really the
 * currency's minor unit: 1 for none (JPY), 100 per major unit for USD, 1000 for KWD. Treating it as
 * hundredths everywhere pays a JPY seller 100x too much and a KWD seller 10x too little, so every
 * conversion between minor units and micros (Google's 1e-6 major units) goes through here.
 *
 * Stripe's API uses the same exponents for the currencies below. (Stripe documents ISK and UGX as
 * two-decimal in the API for historical reasons; neither is on sale here, and a listing in one of them
 * fails `tools/validate-listings.mjs`'s whole-unit check rather than silently mispricing.)
 */
const ZERO_DECIMAL = new Set([
  "BIF", "CLP", "DJF", "GNF", "ISK", "JPY", "KMF", "KRW", "PYG", "RWF", "UGX", "UYI", "VND", "VUV", "XAF", "XOF", "XPF",
]);
const THREE_DECIMAL = new Set(["BHD", "IQD", "JOD", "KWD", "LYD", "OMR", "TND"]);
const FOUR_DECIMAL = new Set(["CLF", "UYW"]);

export function minorUnitExponent(currency: string): number {
  const c = currency.trim().toUpperCase();
  if (ZERO_DECIMAL.has(c)) return 0;
  if (THREE_DECIMAL.has(c)) return 3;
  if (FOUR_DECIMAL.has(c)) return 4;
  return 2;
}

/** Micros per one minor unit of the currency: 1e6 / 10^exponent. */
export function microsPerMinor(currency: string): number {
  return 10 ** (6 - minorUnitExponent(currency));
}

export function minorToMicros(minor: number, currency: string): number {
  return minor * microsPerMinor(currency);
}

/** Whole minor units, rounded down (a payout never pays more than the share). */
export function microsToMinorFloor(micros: number, currency: string): number {
  return Math.floor(micros / microsPerMinor(currency));
}

export function microsToMinorRound(micros: number, currency: string): number {
  return Math.round(micros / microsPerMinor(currency));
}

/**
 * A flat fee written in hundredths of a major unit (the 30 in "30 cents") expressed in the currency's
 * own minor unit. 30 -> 30 for USD, 0.3 -> 0 for JPY (rounded, so use an override for yen), 300 for KWD.
 * `overrides` ({"JPY": 50}) wins where a real fixed fee in that currency is known.
 */
export function flatFeeMinor(flatHundredths: number, currency: string, overrides: Record<string, number> = {}): number {
  const own = overrides[currency.toUpperCase()];
  if (typeof own === "number" && Number.isFinite(own) && own >= 0) return Math.round(own);
  return Math.round(flatHundredths * 10 ** (minorUnitExponent(currency) - 2));
}
