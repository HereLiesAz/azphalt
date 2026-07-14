/**
 * Small presentation helpers shared across the storefront's server components. Pure formatting —
 * no state, no I/O.
 */
import type { Money } from "@azphalt/registry";

/** Render a {@link Money} amount (minor units + ISO-4217) as e.g. `$6.00`. */
export function formatMoney(money: Money): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: money.currency,
    }).format(money.amountCents / 100);
  } catch {
    // Fall back gracefully for any currency Intl doesn't recognize.
    return `${(money.amountCents / 100).toFixed(2)} ${money.currency}`;
  }
}

/** Group a download tally with thousands separators, e.g. `2,140`. */
export function formatCount(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

/** Format an ISO-8601 instant as a plain `YYYY-MM-DD` date (stable across server renders). */
export function formatDate(iso: string): string {
  return iso.slice(0, 10);
}

/** Human label for a package `kind`. */
export function kindLabel(kind: string): string {
  if (kind === "code") return "Code extension";
  if (kind === "asset") return "Asset pack";
  if (kind === "mixed") return "Code + assets";
  if (kind === "app") return "Companion app";
  return kind;
}

/**
 * Summarize a handoff's {@link import("@azphalt/sdk").HandoffIO} — asset types and/or param names —
 * for a one-line "image, wallWidthMm?" display. Returns `"—"` for an empty/absent side.
 */
export function formatHandoffIO(io?: { assets?: string[]; params?: Record<string, string> }): string {
  if (!io) return "—";
  const assets = io.assets ?? [];
  // A param value ending in "?" marks the field optional; surface that on the name.
  const params = Object.entries(io.params ?? {}).map(([k, v]) => (String(v).endsWith("?") ? `${k}?` : k));
  const parts = [...assets, ...params];
  return parts.length ? parts.join(", ") : "—";
}
