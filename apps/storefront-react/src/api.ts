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
  updatedAt?: string;
  targetApps?: string[];
  mediaDomains?: string[];
  types?: string[];
}

export interface CheckoutResponse {
  stub?: boolean;
  message?: string;
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
    body: JSON.stringify({ packageId, buyerId: "buyer_web" }),
  });
  return (await res.json()) as CheckoutResponse;
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
