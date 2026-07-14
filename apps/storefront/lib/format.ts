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

/**
 * Render a package rating as `★ 4.7 (88)` — the average to one decimal plus the count in parens.
 * Returns `null` when the repository tracks no rating for the package (so callers can omit it).
 */
export function formatRating(rating?: number, count?: number): string | null {
  if (rating == null || !count) return null;
  return `★ ${rating.toFixed(1)} (${formatCount(count)})`;
}

/**
 * Return `url` only when it is a safe `http:`/`https:` link, else `undefined`. Companion install /
 * start / manifest URLs come from an untrusted `.azp` manifest, so guard every one before it reaches
 * an `href` — a `javascript:` (or `data:`) URI there would execute on click.
 */
export function safeHttpUrl(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:" ? url : undefined;
  } catch {
    return undefined;
  }
}

/**
 * The `<img>` src for a package's preview. An external `https:` image is rendered **directly** (after
 * `safeHttpUrl` validation — a `javascript:` value yields `undefined`, no image); an in-package image is
 * served through the `/api/preview/[id]` proxy. `undefined` when there's no preview.
 */
export function previewSrc(id: string, image?: string): string | undefined {
  if (!image) return undefined;
  if (/^https?:/i.test(image)) return safeHttpUrl(image);
  return `/api/preview/${encodeURIComponent(id)}`;
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
 * Summarize a handoff's {@link import("@azphalt/azdk").HandoffIO} — asset types and/or param names —
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
