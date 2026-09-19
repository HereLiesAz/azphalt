// The catalog shape the Repository API's /api/packages returns (mirrors the Compose app's model).
export interface Price {
  amountCents: number;
  currency: string;
}

export interface PackageSummary {
  id: string;
  name: string;
  kind: string;
  description?: string;
  author?: string;
  version: string;
  price?: Price | null;
  priceStatus?: string;
  capabilities?: string[];
  downloads?: number;
  rating?: number | null;
  ratingCount?: number;
  updatedAt?: string;
  targetApps?: string[];
  mediaDomains?: string[];
  types?: string[];
  /** Developer content-maturity self-attestation: "general" (default) or "mature" (18+). */
  maturity?: string;
  /**
   * Present only on a `kind:"app"` listing. The host directory is built from these — see
   * `spec/web-handoff.md` § Host directory and `handoff.ts`.
   *
   * `handoffs` is deliberately not surfaced by the API: the storefront never invokes a companion.
   */
  app?: AppBlock;
}

/** The `app` block of a `kind:"app"` package, as `/api/packages` surfaces it. */
export interface AppBlock {
  /** `"companion"` and/or `"host"`. The API resolves the `["companion"]` default before serving. */
  roles?: string[];
  /** The reverse-DNS id this app answers to — what packages name in `targetApps`. Hosts only. */
  hostId?: string;
  platforms?: {
    android?: { packageId?: string; install?: string };
    pwa?: { startUrl?: string; manifestUrl?: string };
  };
}

export interface CheckoutSession {
  id: string;
  url: string;
  status: string;
  amount?: Price;
}

export interface CheckoutResponse {
  stub?: boolean;
  message?: string;
  error?: string;
  session?: CheckoutSession;
}

export interface CheckoutStatus {
  status: "pending" | "ready";
  packageId?: string;
  token?: string;
}

export interface Purchase {
  packageId: string;
  sessionId: string;
  issuedAt: string;
  token: string;
}

export interface SellerStatus {
  onboarded: boolean;
  accountId?: string;
  chargesEnabled?: boolean;
  payoutsEnabled?: boolean;
  detailsSubmitted?: boolean;
  error?: string;
}

const API_BASE = import.meta.env.VITE_API_BASE ?? "";

export async function fetchPackages(): Promise<PackageSummary[]> {
  const res = await fetch(`${API_BASE}/api/packages`);
  if (!res.ok) throw new Error(`registry ${res.status}`);
  return (await res.json()) as PackageSummary[];
}

export async function startCheckout(packageId: string): Promise<CheckoutResponse> {
  const res = await fetch(`${API_BASE}/api/checkout`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "same-origin",
    // Buyer identity is server-owned and kept in a signed HttpOnly recovery session.
    body: JSON.stringify({ packageId }),
  });
  const checkout = (await res.json()) as CheckoutResponse;

  // Creating a real Stripe session is only step one. Continue the purchase on the hosted checkout
  // page instead of treating session creation itself as a completed UI action.
  const checkoutUrl = checkout.session?.url;
  if (!checkout.stub && !checkout.error && checkoutUrl) {
    window.location.assign(checkoutUrl);
  }

  return checkout;
}

export async function fetchCheckoutStatus(sessionId: string): Promise<CheckoutStatus> {
  const res = await fetch(`${API_BASE}/api/checkout/session/${encodeURIComponent(sessionId)}`, {
    credentials: "same-origin",
    cache: "no-store",
  });
  if (res.status === 202) return { status: "pending" };
  if (!res.ok) throw new Error(`checkout status ${res.status}`);
  return (await res.json()) as CheckoutStatus;
}

export async function fetchPurchases(): Promise<Purchase[]> {
  const res = await fetch(`${API_BASE}/api/purchases`, {
    credentials: "same-origin",
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`purchases ${res.status}`);
  return (await res.json()) as Purchase[];
}

export async function downloadPurchase(packageId: string, token: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/download/${encodeURIComponent(packageId)}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`download ${res.status}: ${await res.text()}`);
  const blob = await res.blob();
  const href = URL.createObjectURL(blob);
  try {
    const a = document.createElement("a");
    a.href = href;
    a.download = packageId + ".azp";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } finally {
    window.setTimeout(() => URL.revokeObjectURL(href), 30_000);
  }
}

export async function startSellerOnboarding(input: {
  sellerId: string;
  email?: string;
  country?: string;
}): Promise<{ url?: string; accountId?: string; error?: string }> {
  const res = await fetch(`${API_BASE}/api/connect/onboard`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  const body = (await res.json()) as { url?: string; accountId?: string; error?: string };
  if (!res.ok && !body.error) body.error = `onboarding ${res.status}`;
  return body;
}

export async function fetchSellerStatus(sellerId: string, refresh = false): Promise<SellerStatus> {
  const query = new URLSearchParams({ sellerId });
  if (refresh) query.set("refresh", "1");
  const res = await fetch(`${API_BASE}/api/connect/status?${query.toString()}`, { cache: "no-store" });
  const body = (await res.json()) as SellerStatus;
  if (!res.ok && !body.error) body.error = `seller status ${res.status}`;
  return body;
}

export function priceLabel(p: PackageSummary): string {
  if (!p.price) return "FREE";
  const dollars = Math.floor(p.price.amountCents / 100);
  const cents = String(p.price.amountCents % 100).padStart(2, "0");
  return `$${dollars}.${cents}`;
}

export function isPaid(p: PackageSummary): boolean {
  return p.price != null || p.priceStatus === "paid";
}

export function isMature(p: PackageSummary): boolean {
  return p.maturity === "mature";
}

/** Group a tally with thousands separators, e.g. 8900 → "8,900". */
export function formatCount(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

/** Render a rating as "★ 4.7 (88)", or null when there are no ratings (so callers can omit it). */
export function formatRating(rating?: number | null, count?: number): string | null {
  if (rating == null || !count) return null;
  return `★ ${rating.toFixed(1)} (${formatCount(count)})`;
}
