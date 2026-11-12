// The catalog shape the Repository API's /api/packages returns (mirrors the Compose app's model).
export interface Price {
  amountCents: number;
  currency: string;
}

/** SearchA2A cards are external discovery entries, never .azp packages or purchases. */
export interface A2AAgentListing {
  id: string;
  kind: "a2a-agent";
  name: string;
  description: string;
  endpoint: string;
  source_url: string;
  discovery_url: string;
  skills: { name: string; description: string; tags: string[] }[];
  protocols: string[];
  security_schemes: string[];
  capabilities: Record<string, boolean>;
  verification: "card_read_only";
  installable: false;
  /** Publisher-supplied registry claim. Neither the Store nor SearchA2A has authenticated it. */
  ans_claim?: { name: string; agent_host: string; verification: "unverified" };
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
  /** Counted installs (the Worker merges `installs`/`uninstalls` into each entry). Preferred over `downloads`. */
  installs?: number;
  rating?: number | null;
  ratingCount?: number;
  updatedAt?: string;
  targetApps?: string[];
  /** Static store-card preview (`spec/repository-api.md` § Static previews). `strokes` are rendered brush samples. */
  preview?: { image?: string; clip?: string; strokes?: { brush: string; label: string; image: string }[]; surfaces?: { surface: string; image: string }[] };
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
  /**
   * Present only on a `kind:"llm"` listing (`spec/llm.md`). The store MUST show the tier, the data
   * handling and the setup token's permissions before install; see `LlmDisclosure` in App.tsx.
   */
  llm?: LlmBlock;
  /** Present only on a `kind:"font"` listing (`spec/font.md`): enough for a card, never the file list. */
  font?: { family: string; designer?: string; variable: boolean; axes: string[]; faces: number; scripts?: string[]; sampleText?: string };
}

/** The parts of a `kind:"llm"` block the store discloses before install. */
export interface LlmBlock {
  tier: "endpoint" | "sandbox-weights" | string;
  setup?: { sandbox?: string; requires?: { githubToken?: string[] }; fetches?: { url: string }[] };
  weights?: {
    runtime?: string;
    files?: { name: string; byteSize?: number }[];
    modelLicense?: { spdx?: string; commercialUse?: boolean; url?: string };
    requirements?: { accelerator?: string; minRamMB?: number; minDiskMB?: number; contextTokens?: number };
  };
  endpoint?: { protocols?: string[]; baseUrl?: string; defaultModel?: string; auth?: string };
  dataHandling?: { prompts?: string; modelPinned?: boolean; operator?: string; terms?: string };
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
  /** One-time value that lets this browser read the result from the success page; kept in sessionStorage. */
  claim?: string;
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
  /** `revoked`: the purchase was refunded or disputed, so no licence is issued for it. */
  status: "pending" | "ready" | "revoked";
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

/** Same-origin proxy for the automatically generated, read-only SearchA2A directory. */
export async function fetchA2AAgents(): Promise<A2AAgentListing[]> {
  const response = await fetch(`${API_BASE}/api/a2a/agents`, { cache: "no-store" });
  if (!response.ok) throw new Error(`A2A directory unavailable (${response.status})`);
  const feed: unknown = await response.json();
  if (!feed || typeof feed !== "object" || !("source" in feed) || feed.source !== "searcha2a" ||
      !("schema" in feed) || feed.schema !== 1 || !("listings" in feed) || !Array.isArray(feed.listings)) {
    throw new Error("Invalid external-agent directory");
  }
  // Treat third-party card metadata as untrusted input, including nested arrays.
  return (feed.listings as unknown[]).flatMap((item): A2AAgentListing[] => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    if (record.kind !== "a2a-agent" || record.installable !== false ||
        record.verification !== "card_read_only" || typeof record.id !== "string" ||
        typeof record.name !== "string" || typeof record.source_url !== "string" ||
        !safeHref(record.source_url)) return [];
    const strings = (data: unknown, limit = 40): string[] =>
      Array.isArray(data) ? data.filter((value): value is string => typeof value === "string").slice(0, limit) : [];
    const skills: A2AAgentListing["skills"] = Array.isArray(record.skills) ? record.skills
      .filter((skill): skill is Record<string, unknown> =>
        !!skill && typeof skill === "object" && typeof skill.name === "string")
      .slice(0, 40)
      .map((skill) => ({
        name: String(skill.name).slice(0, 160),
        description: typeof skill.description === "string" ? skill.description.slice(0, 500) : "",
        tags: strings(skill.tags, 20),
      })) : [];
    const rawAns = record.ans_claim;
    let ansClaim: A2AAgentListing["ans_claim"];
    if (rawAns && typeof rawAns === "object" && !Array.isArray(rawAns)) {
      const claim = rawAns as Record<string, unknown>;
      if (typeof claim.name === "string" && typeof claim.agent_host === "string" &&
          claim.verification === "unverified" && claim.name.length <= 259 &&
          claim.agent_host.length <= 237) {
        const host = claim.agent_host.toLowerCase();
        const labels = (claim.name.toLowerCase().startsWith("ans://") &&
          claim.name.toLowerCase().endsWith("." + host))
          ? claim.name.slice(6, -host.length - 1).split(".") : [];
        const validLabel = (label: string) => /^(?!-)[a-z0-9-]{1,63}(?<!-)$/i.test(label);
        if (host.split(".").length >= 2 && host.split(".").every(validLabel) &&
            labels.length > 0 && labels.every(validLabel) && !host.endsWith(".local") &&
            !host.endsWith(".internal") && !host.endsWith(".localhost")) {
          ansClaim = { name: claim.name, agent_host: claim.agent_host, verification: "unverified" };
        }
      }
    }
    return [{
      id: record.id.slice(0, 120), kind: "a2a-agent",
      name: record.name.slice(0, 160),
      description: typeof record.description === "string" ? record.description.slice(0, 1200) : "",
      endpoint: typeof record.endpoint === "string" && safeHref(record.endpoint) ? record.endpoint : "",
      source_url: record.source_url,
      discovery_url: typeof record.discovery_url === "string" && safeHref(record.discovery_url) ? record.discovery_url : "",
      skills,
      protocols: strings(record.protocols),
      security_schemes: strings(record.security_schemes),
      capabilities: typeof record.capabilities === "object" && record.capabilities !== null
        ? Object.fromEntries(Object.entries(record.capabilities).filter(([, value]) => typeof value === "boolean"))
        : {},
      verification: "card_read_only", installable: false,
      ...(ansClaim ? { ans_claim: ansClaim } : {}),
    }];
  }).slice(0, 200);
}

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
  const checkout = (await res.json()) as CheckoutResponse & { code?: string; origin?: string };
  // Started on a non-canonical host (www): the return page would not hold this browser's credentials.
  if (res.status === 409 && checkout.code === "wrong_origin" && checkout.origin) {
    window.location.assign(checkout.origin);
    return checkout;
  }

  // Creating a real Stripe session is only step one. Continue the purchase on the hosted checkout
  // page instead of treating session creation itself as a completed UI action.
  const checkoutUrl = checkout.session?.url;
  if (checkout.session?.claim) rememberClaim(checkout.session.id, checkout.session.claim);
  if (!checkout.stub && !checkout.error && checkoutUrl) {
    window.location.assign(checkoutUrl);
  }

  return checkout;
}

const CLAIM_KEY = "azphalt.checkout-claim:";
function rememberClaim(sessionId: string, claim: string): void {
  try {
    sessionStorage.setItem(CLAIM_KEY + sessionId, claim);
  } catch {
    // Storage blocked: the buyer cookie still identifies this browser.
  }
}
function recalledClaim(sessionId: string): string | null {
  try {
    return sessionStorage.getItem(CLAIM_KEY + sessionId);
  } catch {
    return null;
  }
}

export async function fetchCheckoutStatus(sessionId: string): Promise<CheckoutStatus> {
  const claim = recalledClaim(sessionId);
  const res = await fetch(`${API_BASE}/api/checkout/session/${encodeURIComponent(sessionId)}`, {
    headers: claim ? { "x-checkout-claim": claim } : {},
    credentials: "same-origin",
    cache: "no-store",
  });
  if (res.status === 202) return { status: "pending" };
  if (res.status === 403) return { status: "revoked" };
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

/**
 * A sentence a seller can act on, for a failed onboarding call. The raw status ("onboarding 401") was
 * what the page used to show; the server's own message is kept as a detail when it has one.
 */
export function onboardingError(status: number, serverMessage?: string): string {
  const detail = serverMessage ? ` (${serverMessage})` : "";
  if (status === 401 || status === 403) {
    return `That invite code doesn't match this seller ID. Check both against the invite you were sent, or request a new invite.${detail}`;
  }
  if (status === 400 || status === 422) return `Something in the form isn't valid. Check the seller ID and country.${detail}`;
  if (status === 404) return `This store isn't taking new sellers right now.${detail}`;
  if (status === 409) return `This seller ID is already connected to a Stripe account.${detail}`;
  if (status === 429) return "Too many attempts. Wait a minute and try again.";
  if (status >= 500) return "The store couldn't reach Stripe just now. Try again in a few minutes.";
  return `Couldn't start seller setup (error ${status}).${detail}`;
}

export async function startSellerOnboarding(input: {
  sellerId: string;
  /** The code the store operator issued for this seller id (`POST /api/admin/connect/invite`). */
  inviteCode?: string;
  email?: string;
  country?: string;
}): Promise<{ url?: string; accountId?: string; error?: string }> {
  const res = await fetch(`${API_BASE}/api/connect/onboard`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  const body = (await res.json().catch(() => ({}))) as { url?: string; accountId?: string; error?: string };
  if (!res.ok) body.error = onboardingError(res.status, body.error);
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

/**
 * Rate a package 1–5. One rating per browser (the signed recovery cookie names the rater); a paid
 * package can only be rated by a browser that bought it. Resolves to the package's new aggregate.
 */
export async function ratePackage(
  packageId: string,
  stars: number,
): Promise<{ rating?: number; ratingCount?: number; error?: string }> {
  const res = await fetch(`${API_BASE}/api/ratings`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ packageId, stars }),
  });
  const body = (await res.json()) as { rating?: number; ratingCount?: number; error?: string };
  if (!res.ok && !body.error) body.error = `rating ${res.status}`;
  return body;
}

export const REPORT_REASONS = [
  ["broken", "It doesn't work"],
  ["deceptive", "Misleading listing"],
  ["malware", "Malicious or harmful"],
  ["secret-leak", "Leaks secrets or credentials"],
  ["clone", "Copy of another package"],
  ["ip-claim", "Infringes my own package"],
  ["other", "Something else"],
] as const;

export interface ReportInput {
  packageId: string;
  version?: string;
  reason: string;
  detail?: string;
  originalPackageId?: string;
  claimant?: string;
  signature?: string;
}

export interface Report extends ReportInput {
  id: number;
  trusted: boolean;
  reportedAt: string;
  /** A moderator's decision, once made. */
  resolution?: "dismissed" | "yanked";
  resolvedAt?: string;
}

/** File a report (`spec/marketplace-integrity.md` § 2). Web reports are untrusted and wait for a moderator. */
export async function fileReport(input: ReportInput): Promise<{ error?: string }> {
  const res = await fetch(`${API_BASE}/api/reports`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  if (res.ok) return {};
  const body = (await res.json().catch(() => ({}))) as { error?: string };
  return { error: body.error ?? `report ${res.status}` };
}

export interface PublishTicket {
  status: "pending-review";
  id: string;
  version: string;
  review: string;
  pullRequest: number;
  publisher: { publicKey: string; pin: "new" | "matches" };
}

/**
 * Publish a signed `.azp` (`POST /packages`, `spec/repository-api.md` § 9). The store answers with a
 * review ticket: the package becomes a pull request, and is served once it is merged.
 */
export async function publishPackage(bytes: ArrayBuffer): Promise<PublishTicket | { error: string; details?: string[] }> {
  const res = await fetch(`${API_BASE}/packages`, {
    method: "POST",
    headers: { "content-type": "application/vnd.azphalt.package" },
    body: bytes,
  });
  const body = (await res.json().catch(() => ({}))) as PublishTicket & { error?: { message?: string; details?: string[] } };
  if (res.status === 202) return body;
  return { error: body.error?.message ?? `publish ${res.status}`, details: body.error?.details };
}

/** The moderation queue. The token is the store's `ADMIN_TOKEN`; the caller keeps it in memory only. */
export async function fetchReports(token: string): Promise<Report[]> {
  const res = await fetch(`${API_BASE}/api/reports`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (res.status === 401) throw new Error("That token was not accepted.");
  if (!res.ok) throw new Error(`reports ${res.status}`);
  return ((await res.json()) as { reports: Report[] }).reports;
}

/**
 * A moderator's decision on a report. `yank` revokes the reported version (or the one served now) and
 * publishes it on `/revocations`, so installed hosts learn on their next poll.
 */
export async function resolveReport(token: string, id: number, action: "dismiss" | "yank"): Promise<void> {
  const res = await fetch(`${API_BASE}/api/reports/${id}/resolve`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ action }),
  });
  if (res.status === 401) throw new Error("That token was not accepted.");
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error || `resolve ${res.status}`);
  }
}

export function priceLabel(p: PackageSummary): string {
  if (!p.price) return "FREE";
  // Format in the listing's own currency (checkout charges `listing.currency`; a hardcoded "$" showed
  // a EUR or JPY price as dollars) and honour that currency's minor-unit exponent.
  const currency = (p.price.currency || "USD").toUpperCase();
  try {
    const fmt = new Intl.NumberFormat("en", { style: "currency", currency });
    const digits = fmt.resolvedOptions().maximumFractionDigits ?? 2;
    return fmt.format(p.price.amountCents / 10 ** digits);
  } catch {
    return `${(p.price.amountCents / 100).toFixed(2)} ${currency}`; // unknown currency code
  }
}

/** How many installs to show: the counted figure when the Worker supplies one, else downloads. */
export function installCount(p: PackageSummary): number {
  return p.installs ?? p.downloads ?? 0;
}

/**
 * A URL that is safe to put in an `href` or `window.open`: `https:` only. Listing URLs are third-party
 * data (a manifest's `terms`, a model licence `url`), so `javascript:` / `data:` / `file:` / cleartext
 * `http:` must never reach the page.
 */
export function safeHref(url: unknown): string | undefined {
  if (typeof url !== "string") return undefined;
  try {
    return new URL(url).protocol === "https:" ? url : undefined;
  } catch {
    return undefined;
  }
}

/** The host of a URL, or undefined when it is not a valid URL (never throws into a render). */
export function hostOf(url: unknown): string | undefined {
  if (typeof url !== "string") return undefined;
  try {
    return new URL(url).host;
  } catch {
    return undefined;
  }
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
