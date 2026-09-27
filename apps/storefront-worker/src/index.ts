import { MAX_PUBLISH_BYTES, publish, type RepositoryTokens } from "./publish";
import { parseServiceAccount, PlayUnavailableError, verifyPlayPurchase } from "./play";

type Fetcher = { fetch(input: Request): Promise<Response> };
type DurableObjectNamespaceLike = {
  idFromName(name: string): unknown;
  get(id: unknown): { fetch(input: Request): Promise<Response> };
};
type DurableObjectStateLike = {
  storage: {
    sql: {
      exec(query: string, ...bindings: unknown[]): Iterable<Record<string, unknown>>;
    };
  };
  blockConcurrencyWhile<T>(fn: () => Promise<T>): Promise<T>;
};

interface Env {
  ASSETS: Fetcher;
  STATE: DurableObjectNamespaceLike;
  PUBLIC_ORIGIN: string;
  GITHUB_RAW_BASE: string;
  PLATFORM_FEE_BPS?: string;
  PROCESSOR_PCT_BPS?: string;
  PROCESSOR_FLAT_CENTS?: string;
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  ENTITLEMENT_PRIVATE_KEY_PKCS8_B64?: string;
  ENTITLEMENT_PUBLIC_KEY_SPKI_B64?: string;
  BUYER_SESSION_SECRET?: string;
  ADMIN_TOKEN?: string;
  /**
   * Cloudflare's rate-limiting binding (`wrangler.jsonc` § ratelimits), keyed by client IP for the
   * public write endpoints (ratings, reports). The counters live in Cloudflare's rate limiter, not in
   * this Worker's storage, so no IP address is ever written down. Absent in tests and local dev.
   */
  WRITE_LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> };
  /** The same, much tighter, for `POST /packages` — each accepted publish opens a pull request. */
  PUBLISH_LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> };
  /** The gateway's token minter, over a service binding (`src/publish.ts` § RepositoryTokens). */
  GITHUB_TOKENS?: RepositoryTokens;
  /** A fixed GitHub token instead of the binding (self-hosted). Neither set → publish answers 501. */
  GITHUB_PUBLISH_TOKEN?: string;
  /** `owner/repo` publish pull requests are opened against. */
  PUBLISH_REPOSITORY?: string;
  /** The store app's Play application id. With PLAY_SERVICE_ACCOUNT_JSON, enables `POST /entitlements/play`. */
  PLAY_PACKAGE_NAME?: string;
  /** A Google service-account key (JSON) with Play Console access to that app's orders. */
  PLAY_SERVICE_ACCOUNT_JSON?: string;
}

interface CatalogEntry {
  id: string;
  version: string;
  name: string;
  kind: string;
  file?: string;
  price?: { amountCents: number; currency: string } | null;
  priceStatus?: string;
  [key: string]: unknown;
}

interface Listing {
  packageId: string;
  sellerId: string;
  stripeAccountId?: string;
  amountCents: number;
  currency: string;
  interval?: "month" | "year";
  status?: "active" | "paused";
  /** The Play product this package is sold as in the store app. Defaults to the package id. */
  playProductId?: string;
  /** Public metadata for a paid-only package. The .azp bytes themselves must never be committed. */
  package: {
    version: string;
    name: string;
    kind: string;
    description?: string;
    author?: string;
    capabilities?: string[];
    targetApps?: string[];
    mediaDomains?: string[];
    types?: string[];
    maturity?: string;
    app?: unknown;
    pack?: unknown;
    llm?: unknown;
    manifest?: unknown;
    bytes?: number;
    integrity: string;
    updatedAt?: string;
  };
}

interface SellerAccount {
  sellerId: string;
  accountId: string;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  detailsSubmitted: boolean;
  updatedAt: string;
}

interface EntitlementClaims {
  packageId: string;
  subject: string;
  kind: "perpetual" | "subscription";
  issuedAt: string;
  expiresAt?: string;
  keyId?: string;
}

interface EntitlementToken {
  claims: EntitlementClaims;
  signature: string;
  publicKey: string;
}

interface InstallEvent {
  id: string;
  version: string;
  event: string;
  token?: string;
  receipt?: string;
}

interface Revocation {
  id: string;
  version: string;
  reason?: string;
  revokedAt: string;
}

interface EntitlementRecord {
  sessionId: string;
  subject: string;
  packageId: string;
  token: EntitlementToken;
  issuedAt: string;
}

const enc = new TextEncoder();
const dec = new TextDecoder();
const CHUNK_BYTES = 1024 * 1024;
const BUYER_COOKIE = "azphalt_buyer_session";
const BUYER_SUBJECT = /^buyer_[A-Za-z0-9_-]{20,128}$/;
const PACKAGE_ID = /^[A-Za-z0-9._-]{1,200}$/;
const VERSION = /^[A-Za-z0-9.+_-]{1,80}$/;
/** `spec/marketplace-integrity.md` § 2. */
const REPORT_REASONS = ["malware", "clone", "deceptive", "secret-leak", "broken", "ip-claim", "other"];
const MAX_REPORT_TEXT = 4000;

function json(data: unknown, status = 200, extra: HeadersInit = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extra,
    },
  });
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 32768) {
    binary += String.fromCharCode(...bytes.subarray(i, Math.min(bytes.length, i + 32768)));
  }
  return btoa(binary);
}

function base64ToBytes(value: string): Uint8Array<ArrayBuffer> {
  const binary = atob(value);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

function b64url(bytes: Uint8Array): string {
  return bytesToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromB64url(value: string): Uint8Array<ArrayBuffer> {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  return base64ToBytes(normalized + "=".repeat((4 - normalized.length % 4) % 4));
}

function constantEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function hmac(secret: string, message: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(message)));
}

function cookieValue(req: Request, name: string): string | undefined {
  const raw = req.headers.get("cookie") || "";
  for (const part of raw.split(";")) {
    const at = part.indexOf("=");
    if (at < 0) continue;
    if (part.slice(0, at).trim() === name) return part.slice(at + 1).trim();
  }
  return undefined;
}

function newBuyerSubject(): string {
  const bytes = new Uint8Array(18);
  crypto.getRandomValues(bytes);
  return "buyer_" + b64url(bytes);
}

interface RuntimeSecrets {
  buyerSessionSecret: string;
  entitlementPrivateKeyPkcs8B64: string;
  entitlementPublicKeySpkiB64: string;
}

async function runtimeSecrets(env: Env): Promise<RuntimeSecrets> {
  if (
    env.BUYER_SESSION_SECRET &&
    env.ENTITLEMENT_PRIVATE_KEY_PKCS8_B64 &&
    env.ENTITLEMENT_PUBLIC_KEY_SPKI_B64
  ) {
    return {
      buyerSessionSecret: env.BUYER_SESSION_SECRET,
      entitlementPrivateKeyPkcs8B64: env.ENTITLEMENT_PRIVATE_KEY_PKCS8_B64,
      entitlementPublicKeySpkiB64: env.ENTITLEMENT_PUBLIC_KEY_SPKI_B64,
    };
  }
  return stateJson<RuntimeSecrets>(env, "/system-secrets");
}

async function readBuyerSubjects(req: Request, env: Env): Promise<string[]> {
  const value = cookieValue(req, BUYER_COOKIE);
  if (!value) return [];
  const secret = (await runtimeSecrets(env)).buyerSessionSecret;
  const dot = value.indexOf(".");
  if (dot < 1) return [];
  const payload = value.slice(0, dot);
  const signature = value.slice(dot + 1);
  try {
    if (!constantEqual(await hmac(secret, payload), fromB64url(signature))) return [];
    const parsed = JSON.parse(dec.decode(fromB64url(payload))) as { v?: number; subjects?: unknown };
    if (parsed.v !== 1 || !Array.isArray(parsed.subjects)) return [];
    return parsed.subjects
      .filter((v): v is string => typeof v === "string" && BUYER_SUBJECT.test(v))
      .slice(0, 12);
  } catch {
    return [];
  }
}

async function makeBuyerCookie(req: Request, subject: string, env: Env): Promise<string | undefined> {
  if (!BUYER_SUBJECT.test(subject)) return undefined;
  const secret = (await runtimeSecrets(env)).buyerSessionSecret;
  const existing = await readBuyerSubjects(req, env);
  const subjects = [subject, ...existing.filter((x) => x !== subject)].slice(0, 12);
  const payload = b64url(enc.encode(JSON.stringify({ v: 1, subjects })));
  const signature = b64url(await hmac(secret, payload));
  return [
    BUYER_COOKIE + "=" + payload + "." + signature,
    "Path=/",
    "Max-Age=31536000",
    "HttpOnly",
    "SameSite=Lax",
    "Secure",
  ].join("; ");
}

function canonicalClaims(claims: EntitlementClaims): string {
  const ordered: Record<string, unknown> = {
    packageId: claims.packageId,
    subject: claims.subject,
    kind: claims.kind,
    issuedAt: claims.issuedAt,
  };
  if (claims.expiresAt !== undefined) ordered.expiresAt = claims.expiresAt;
  if (claims.keyId !== undefined) ordered.keyId = claims.keyId;
  return JSON.stringify(ordered);
}

async function issueEntitlement(env: Env, claims: EntitlementClaims): Promise<EntitlementToken> {
  const secrets = await runtimeSecrets(env);
  const key = await crypto.subtle.importKey(
    "pkcs8",
    base64ToBytes(secrets.entitlementPrivateKeyPkcs8B64),
    { name: "Ed25519" },
    false,
    ["sign"],
  );
  const sig = new Uint8Array(
    await crypto.subtle.sign("Ed25519", key, enc.encode(canonicalClaims(claims))),
  );
  return {
    claims,
    signature: bytesToBase64(sig),
    publicKey: secrets.entitlementPublicKeySpkiB64,
  };
}

async function verifyEntitlement(env: Env, token: EntitlementToken, packageId: string): Promise<boolean> {
  const publicKey = (await runtimeSecrets(env)).entitlementPublicKeySpkiB64;
  if (token.publicKey !== publicKey) return false;
  if (!token.claims || token.claims.packageId !== packageId) return false;
  if (token.claims.expiresAt && new Date(token.claims.expiresAt).getTime() <= Date.now()) return false;
  try {
    const key = await crypto.subtle.importKey(
      "spki",
      base64ToBytes(token.publicKey),
      { name: "Ed25519" },
      false,
      ["verify"],
    );
    return crypto.subtle.verify(
      "Ed25519",
      key,
      base64ToBytes(token.signature),
      enc.encode(canonicalClaims(token.claims)),
    );
  } catch {
    return false;
  }
}

function encodeToken(token: EntitlementToken): string {
  return bytesToBase64(enc.encode(JSON.stringify(token)));
}

function decodeToken(value: string): EntitlementToken | undefined {
  try {
    return JSON.parse(dec.decode(base64ToBytes(value))) as EntitlementToken;
  } catch {
    return undefined;
  }
}

// Exported so `packages/registry/test/storefront-worker-parity.test.ts` can assert this copy stays
// byte-for-byte identical to `packages/registry/src/consignment.ts`'s `periodEnd`/`quote` — this
// Worker is deliberately dependency-free (see README § Zero-fixed-cost design) and can't import a
// Node package at runtime, so the fee-split and billing-period math is a second, hand-kept-in-sync
// copy rather than a shared import. The test is what keeps the two from drifting.
export function periodEnd(iso: string, interval: "month" | "year"): string {
  const d = new Date(iso);
  const day = d.getUTCDate();
  if (interval === "year") d.setUTCFullYear(d.getUTCFullYear() + 1);
  else d.setUTCMonth(d.getUTCMonth() + 1);
  if (d.getUTCDate() !== day) d.setUTCDate(0);
  return d.toISOString();
}

function state(env: Env) {
  return env.STATE.get(env.STATE.idFromName("marketplace-v1"));
}

async function stateJson<T>(env: Env, path: string, init: RequestInit = {}): Promise<T> {
  const response = await state(env).fetch(new Request("https://state.internal" + path, init));
  if (!response.ok) throw new Error("state " + path + " returned " + response.status);
  return response.json() as Promise<T>;
}

async function getCatalog(req: Request, env: Env): Promise<CatalogEntry[]> {
  const url = new URL("/catalog.json", req.url);
  const response = await env.ASSETS.fetch(new Request(url));
  if (!response.ok) throw new Error("catalog asset unavailable");
  return response.json() as Promise<CatalogEntry[]>;
}

async function getListings(req: Request, env: Env): Promise<Listing[]> {
  const url = new URL("/listings.json", req.url);
  const response = await env.ASSETS.fetch(new Request(url));
  if (!response.ok) return [];
  return response.json() as Promise<Listing[]>;
}

async function storedSeller(env: Env, sellerId: string): Promise<SellerAccount | undefined> {
  const response = await state(env).fetch(
    new Request("https://state.internal/seller/" + encodeURIComponent(sellerId)),
  );
  if (response.status === 404) return undefined;
  if (!response.ok) throw new Error("seller lookup failed");
  return response.json() as Promise<SellerAccount>;
}

async function storeSeller(env: Env, record: SellerAccount): Promise<SellerAccount> {
  return stateJson<SellerAccount>(env, "/seller/" + encodeURIComponent(record.sellerId), {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(record),
  });
}

function sellerFromStripe(sellerId: string, account: Record<string, unknown>): SellerAccount {
  const accountId = typeof account.id === "string" ? account.id : "";
  if (!accountId) throw new Error("Stripe response missing account id");
  return {
    sellerId,
    accountId,
    chargesEnabled: account.charges_enabled === true,
    payoutsEnabled: account.payouts_enabled === true,
    detailsSubmitted: account.details_submitted === true,
    updatedAt: new Date().toISOString(),
  };
}

async function refreshSeller(env: Env, sellerId: string, accountId: string): Promise<SellerAccount> {
  const account = await stripe(env, "/v1/accounts/" + encodeURIComponent(accountId), { method: "GET" });
  return storeSeller(env, sellerFromStripe(sellerId, account));
}

function activeListing(listings: Listing[], id: string): Listing | undefined {
  return listings.find((l) => l.packageId === id && (l.status || "active") === "active");
}

function listedPackage(listing: Listing): CatalogEntry {
  return {
    id: listing.packageId,
    ...listing.package,
    price: { amountCents: listing.amountCents, currency: listing.currency },
    priceStatus: "paid",
    downloads: 0,
    ratingCount: 0,
  };
}

function publicPackageIds(catalog: CatalogEntry[]): Set<string> {
  return new Set(catalog.map((pkg) => pkg.id));
}

function marketplaceCatalog(catalog: CatalogEntry[], listings: Listing[]): CatalogEntry[] {
  const publicIds = publicPackageIds(catalog);
  const free = catalog.map((pkg) => ({ ...pkg, price: null, priceStatus: "free" }));
  const paid = listings
    .filter((listing) =>
      (listing.status || "active") === "active" &&
      !publicIds.has(listing.packageId)
    )
    .map(listedPackage);
  return [...free, ...paid];
}

async function sha256Integrity(bytes: Uint8Array<ArrayBuffer>): Promise<string> {
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
  return "sha256-" + Array.from(digest).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function quote(amountCents: number, currency: string, env: Env) {
  const processorPctBps = Number(env.PROCESSOR_PCT_BPS || "290");
  const processorFlatCents = Number(env.PROCESSOR_FLAT_CENTS || "30");
  const platformFeeBps = Number(env.PLATFORM_FEE_BPS || "1500");
  const processor = Math.round(amountCents * processorPctBps / 10000) + processorFlatCents;
  const platform = Math.round(amountCents * platformFeeBps / 10000);
  const sellerNet = Math.max(0, amountCents - processor - platform);
  const m = (n: number) => ({ amountCents: n, currency });
  return {
    gross: m(amountCents),
    processorFee: m(processor),
    platformFee: m(platform),
    sellerNet: m(sellerNet),
  };
}

async function stripe(env: Env, path: string, init: RequestInit): Promise<Record<string, unknown>> {
  if (!env.STRIPE_SECRET_KEY) throw new Error("Stripe is not configured");
  const headers = new Headers(init.headers);
  headers.set("authorization", "Bearer " + env.STRIPE_SECRET_KEY);
  const response = await fetch("https://api.stripe.com" + path, { ...init, headers });
  const text = await response.text();
  let body: Record<string, unknown> = {};
  try {
    body = text ? JSON.parse(text) as Record<string, unknown> : {};
  } catch {
    throw new Error("Stripe returned invalid JSON");
  }
  if (!response.ok) {
    const error = body.error as { message?: string } | undefined;
    throw new Error(error?.message || "Stripe request failed");
  }
  return body;
}

function urlForm(fields: Record<string, string | undefined>): string {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) body.set(key, value);
  }
  return body.toString();
}

interface RatingAggregate {
  rating: number;
  ratingCount: number;
}

/** Every rated package's average and count, from the Durable Object (`ratings` table). */
async function ratingAggregates(env: Env): Promise<Record<string, RatingAggregate>> {
  return stateJson<Record<string, RatingAggregate>>(env, "/ratings");
}

/** Every yanked version, newest first (the `revocations` table). */
async function revocations(env: Env): Promise<Revocation[]> {
  return stateJson<Revocation[]>(env, "/revocations");
}

async function isRevoked(env: Env, id: string, version: string): Promise<Revocation | undefined> {
  return (await revocations(env)).find((r) => r.id === id && r.version === version);
}

/**
 * The marketplace catalog (free git catalog + paid listings) with live rating aggregates and install
 * tallies merged in. A package whose served version is yanked is left out: it cannot be downloaded,
 * so a store card for it would be a dead end. Its detail (§ 3) still answers, with `yanked: true`.
 */
async function ratedCatalog(req: Request, env: Env): Promise<CatalogEntry[]> {
  const [catalog, listings, ratings, installs, revoked] = await Promise.all([
    getCatalog(req, env),
    getListings(req, env),
    ratingAggregates(env),
    stateJson<Record<string, { installs: number; uninstalls: number }>>(env, "/install-counts"),
    revocations(env),
  ]);
  const yanked = new Set(revoked.map((r) => r.id + "@" + r.version));
  return marketplaceCatalog(catalog, listings)
    .filter((pkg) => !yanked.has(pkg.id + "@" + pkg.version))
    .map((pkg) => ({
      ...pkg,
      ...(ratings[pkg.id] ?? { ratingCount: 0 }),
      // Installs and uninstalls, never "active installs" (state-reporting.md § 4.3).
      ...(installs[pkg.id] ?? { installs: 0, uninstalls: 0 }),
    }));
}

async function apiPackages(req: Request, env: Env): Promise<Response> {
  return json(await ratedCatalog(req, env));
}

/** Whether this client may make one more public write. Always true where no limiter is bound. */
async function allowWrite(req: Request, env: Env): Promise<boolean> {
  if (!env.WRITE_LIMITER) return true;
  const key = req.headers.get("cf-connecting-ip") || "unknown";
  return (await env.WRITE_LIMITER.limit({ key })).success;
}

async function readJson(req: Request): Promise<Record<string, unknown> | undefined> {
  try {
    const body = await req.json();
    return body && typeof body === "object" && !Array.isArray(body) ? body as Record<string, unknown> : undefined;
  } catch {
    return undefined;
  }
}

/**
 * `POST /api/ratings` — `{ packageId, stars }`, 1–5. One rating per package per browser: the rater is
 * the opaque buyer subject in the signed recovery cookie (minted here if the browser has none), and a
 * second rating from the same subject replaces the first. A paid package can only be rated by a
 * subject holding an entitlement to it. Returns the package's new `{ rating, ratingCount }`.
 */
async function rate(req: Request, env: Env): Promise<Response> {
  if (!(await allowWrite(req, env))) return json({ error: "too many requests" }, 429);
  const body = await readJson(req);
  if (!body) return json({ error: "invalid JSON body" }, 400);
  const packageId = typeof body.packageId === "string" ? body.packageId.trim() : "";
  const stars = body.stars;
  if (!PACKAGE_ID.test(packageId)) return json({ error: "packageId is required" }, 400);
  if (typeof stars !== "number" || !Number.isInteger(stars) || stars < 1 || stars > 5) {
    return json({ error: "stars must be an integer from 1 to 5" }, 400);
  }

  const [catalog, listings] = await Promise.all([getCatalog(req, env), getListings(req, env)]);
  const free = catalog.some((pkg) => pkg.id === packageId);
  const paid = !free && !!activeListing(listings, packageId);
  if (!free && !paid) return json({ error: "unknown package: " + packageId }, 404);

  const subjects = await readBuyerSubjects(req, env);
  let subject: string | undefined = subjects[0];
  if (paid) {
    subject = undefined;
    for (const candidate of subjects) {
      const owned = await stateJson<EntitlementRecord[]>(env, "/purchases?subject=" + encodeURIComponent(candidate));
      if (owned.some((record) => record.packageId === packageId)) {
        subject = candidate;
        break;
      }
    }
    if (!subject) return json({ error: "only a buyer of this package can rate it" }, 403);
  }
  subject ||= newBuyerSubject();

  const aggregate = await stateJson<RatingAggregate>(env, "/rating", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ packageId, subject, stars }),
  });
  const cookie = await makeBuyerCookie(req, subject, env);
  return json(aggregate, 200, cookie ? { "set-cookie": cookie } : {});
}

function optionalText(value: unknown, max: number): string | undefined | null {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string" || value.length > max) return null;
  return value;
}

/**
 * `POST /reports` (and `/api/reports`) — file a report, `spec/marketplace-integrity.md` § 2. Anyone
 * may file; nothing identifying the filer is stored. Every report here is **untrusted**: this store has
 * no counter-signed hosts or verified accounts, so no report can trip auto-quarantine — each one waits
 * for a moderator. An IP claim's signature is kept for the moderator to check, not verified here.
 */
async function fileReport(req: Request, env: Env): Promise<Response> {
  if (!(await allowWrite(req, env))) return json({ error: "too many requests" }, 429);
  const body = await readJson(req);
  if (!body) return json({ error: "invalid JSON body" }, 400);

  const packageId = typeof body.packageId === "string" ? body.packageId.trim() : "";
  const reason = typeof body.reason === "string" ? body.reason : "";
  if (!PACKAGE_ID.test(packageId)) return json({ error: "packageId is required" }, 400);
  if (!REPORT_REASONS.includes(reason)) {
    return json({ error: "reason must be one of " + REPORT_REASONS.join(", ") }, 400);
  }
  const version = optionalText(body.version, 80);
  const detail = optionalText(body.detail, MAX_REPORT_TEXT);
  const originalPackageId = optionalText(body.originalPackageId, 200);
  const claimant = optionalText(body.claimant, 200);
  const signature = optionalText(body.signature, 200);
  if ([version, detail, originalPackageId, claimant, signature].includes(null)) {
    return json({ error: "a text field is too long or not a string" }, 400);
  }
  if (version && !VERSION.test(version)) return json({ error: "invalid version" }, 400);
  if (reason === "ip-claim" && !(originalPackageId && PACKAGE_ID.test(originalPackageId))) {
    return json({ error: "an ip-claim needs originalPackageId" }, 400);
  }

  const [catalog, listings] = await Promise.all([getCatalog(req, env), getListings(req, env)]);
  if (!catalog.some((pkg) => pkg.id === packageId) && !activeListing(listings, packageId)) {
    return json({ error: "unknown package: " + packageId }, 404);
  }

  const report = await stateJson<Record<string, unknown>>(env, "/report", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      packageId,
      version,
      reason,
      detail,
      originalPackageId,
      claimant,
      signature,
      trusted: false,
      reportedAt: new Date().toISOString(),
    }),
  });
  return json({ report, quarantined: false }, 201);
}

/**
 * `POST /packages` — publish a signed `.azp` by opening a review pull request (`src/publish.ts`,
 * `spec/repository-api.md` § 9). `202` with the pull request's address; nothing is served until it
 * is merged and deployed.
 */
async function publishPackage(req: Request, env: Env): Promise<Response> {
  const fail = (status: number, code: string, message: string, details?: string[]) =>
    json({ error: { code, message, ...(details ? { details } : {}) } }, status);
  if (env.PUBLISH_LIMITER) {
    const key = req.headers.get("cf-connecting-ip") || "unknown";
    if (!(await env.PUBLISH_LIMITER.limit({ key })).success) return fail(429, "rate_limited", "too many publishes");
  }
  if (Number(req.headers.get("content-length") || "0") > MAX_PUBLISH_BYTES) {
    return fail(413, "payload_too_large", `package exceeds ${MAX_PUBLISH_BYTES} bytes`);
  }
  const bytes = new Uint8Array(await req.arrayBuffer());
  const [catalog, listings] = await Promise.all([getCatalog(req, env), getListings(req, env)]);
  const result = await publish(bytes, env, {
    catalogVersion: async (id) => catalog.find((pkg) => pkg.id === id)?.version,
    isListed: async (id) => listings.some((listing) => listing.packageId === id),
  });
  if (typeof result.status === "number") return fail(result.status, result.code, result.message, result.errors);
  return json(result, 202, { location: result.review });
}

/** `GET /reports` (and `/api/reports`) — the moderation queue, newest first. Bearer `ADMIN_TOKEN`. */
async function listReports(req: Request, env: Env): Promise<Response> {
  if (!adminAuthorized(req, env)) return json({ error: "unauthorized" }, 401);
  return json({ reports: await stateJson<unknown[]>(env, "/reports") });
}

const REPO_ERROR = (status: number, code: string, message: string) => json({ error: { code, message } }, status);

/** `GET /revocations?since=` — the yanked-version feed, newest first (repository-api.md § 5). */
async function revocationFeed(req: Request, env: Env): Promise<Response> {
  const since = new URL(req.url).searchParams.get("since");
  let after = -Infinity;
  if (since !== null) {
    after = Date.parse(since);
    if (Number.isNaN(after)) return REPO_ERROR(400, "bad_request", "since must be an ISO-8601 instant");
  }
  const feed = (await revocations(env)).filter((r) => Date.parse(r.revokedAt) > after);
  return json({ revocations: feed });
}

/** The version a moderator's yank applies to: the one named, or the version the store serves now. */
async function servedVersion(req: Request, env: Env, id: string): Promise<string | undefined> {
  const [catalog, listings] = await Promise.all([getCatalog(req, env), getListings(req, env)]);
  return catalog.find((pkg) => pkg.id === id)?.version ?? activeListing(listings, id)?.package.version;
}

async function yank(env: Env, id: string, version: string, reason: string | undefined): Promise<Revocation> {
  return stateJson<Revocation>(env, "/revocation/" + encodeURIComponent(id) + "/" + encodeURIComponent(version), {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ reason, revokedAt: new Date().toISOString() }),
  });
}

/**
 * `POST /api/admin/revocations` `{ packageId, version?, reason? }` — yank a version (default: the one
 * served now). Installed hosts learn on their next `/revocations` poll. Bearer `ADMIN_TOKEN`.
 */
async function adminRevoke(req: Request, env: Env): Promise<Response> {
  if (!adminAuthorized(req, env)) return json({ error: "unauthorized" }, 401);
  const body = await readJson(req);
  const packageId = typeof body?.packageId === "string" ? body.packageId : "";
  if (!PACKAGE_ID.test(packageId)) return json({ error: "packageId is required" }, 400);
  const requested = optionalText(body?.version, 80);
  const reason = optionalText(body?.reason, 200);
  if (requested === null || reason === null || (requested && !VERSION.test(requested))) {
    return json({ error: "invalid version or reason" }, 400);
  }
  const version = requested || await servedVersion(req, env, packageId);
  if (!version) return json({ error: "unknown package: " + packageId }, 404);
  return json({ revocation: await yank(env, packageId, version, reason) }, 201);
}

/** `DELETE /api/admin/revocations/{id}/{version}` — undo a mistaken yank. Bearer `ADMIN_TOKEN`. */
async function adminUnrevoke(req: Request, env: Env, id: string, version: string): Promise<Response> {
  if (!adminAuthorized(req, env)) return json({ error: "unauthorized" }, 401);
  const res = await state(env).fetch(new Request(
    "https://state.internal/revocation/" + encodeURIComponent(id) + "/" + encodeURIComponent(version),
    { method: "DELETE" },
  ));
  return res.status === 200 ? new Response(null, { status: 204 }) : json({ error: "not revoked" }, 404);
}

/**
 * `POST /api/reports/{id}/resolve` `{ action: "dismiss" | "yank", reason? }` — a moderator's decision
 * on a report. `yank` revokes the reported version (or, if the report named none, the version served
 * now) with the report's reason unless another is given. Bearer `ADMIN_TOKEN`.
 */
async function resolveReport(req: Request, env: Env, reportId: string): Promise<Response> {
  if (!adminAuthorized(req, env)) return json({ error: "unauthorized" }, 401);
  const body = await readJson(req);
  const action = body?.action;
  if (action !== "dismiss" && action !== "yank") return json({ error: 'action must be "dismiss" or "yank"' }, 400);
  const reasonOverride = optionalText(body?.reason, 200);
  if (reasonOverride === null) return json({ error: "invalid reason" }, 400);

  const res = await state(env).fetch(new Request("https://state.internal/report/" + reportId + "/resolution", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ resolution: action === "yank" ? "yanked" : "dismissed", resolvedAt: new Date().toISOString() }),
  }));
  if (res.status === 404) return json({ error: "report not found" }, 404);
  const report = await res.json() as { packageId: string; version?: string };
  if (action === "dismiss") return json({ report });

  const reports = await stateJson<{ id: number; reason: string }[]>(env, "/reports");
  const reason = reasonOverride || reports.find((r) => String(r.id) === reportId)?.reason;
  const version = report.version || await servedVersion(req, env, report.packageId);
  if (!version) return json({ error: "the reported package is no longer served" }, 409);
  return json({ report, revocation: await yank(env, report.packageId, version, reason) });
}

const INSTALL_EVENTS = ["installed", "uninstalled", "activated", "deactivated"];
const MAX_INSTALL_BODY = 256 * 1024;

/** `POST /installs` — install/uninstall transitions against report tokens (repository-api.md § 8). */
async function reportInstalls(req: Request, env: Env): Promise<Response> {
  if (Number(req.headers.get("content-length") || "0") > MAX_INSTALL_BODY) {
    return REPO_ERROR(413, "payload_too_large", "at most 200 events per request");
  }
  const body = await readJson(req);
  const events = body?.events;
  if (!Array.isArray(events) || events.length > 200) {
    return REPO_ERROR(400, "bad_request", "body must be { events: [...] } with at most 200 events");
  }
  const clean: InstallEvent[] = [];
  for (const raw of events) {
    const e = raw as Record<string, unknown>;
    if (!e || typeof e !== "object" || typeof e.id !== "string" || typeof e.version !== "string" || typeof e.event !== "string") {
      return REPO_ERROR(400, "bad_request", "every event needs string id, version and event");
    }
    // An unrecognised event, or an over-long credential, is rejected (counted), not fatal.
    const credential = (value: unknown) => (typeof value === "string" && value.length <= 200 ? value : undefined);
    clean.push({
      id: e.id.slice(0, 200),
      version: e.version.slice(0, 80),
      event: INSTALL_EVENTS.includes(e.event) ? e.event : "unknown",
      token: credential(e.token),
      receipt: credential(e.receipt),
    });
  }
  return json(await stateJson(env, "/installs", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ events: clean }),
  }));
}

/**
 * `POST /entitlements/play` — trade a verified Google Play purchase for the same signed entitlement a
 * web purchase produces (repository-api.md § 7, `src/play.ts`). `501` until PLAY_PACKAGE_NAME and
 * PLAY_SERVICE_ACCOUNT_JSON are set.
 */
async function playEntitlement(req: Request, env: Env): Promise<Response> {
  const serviceAccount = parseServiceAccount(env.PLAY_SERVICE_ACCOUNT_JSON);
  if (!env.PLAY_PACKAGE_NAME || !serviceAccount) {
    return REPO_ERROR(501, "not_implemented", "Play purchase verification is not configured");
  }
  const body = await readJson(req);
  if (!body) return REPO_ERROR(400, "bad_request", "body must be a JSON object");
  const { packageId, productId, purchaseToken } = body;
  if (typeof packageId !== "string" || typeof productId !== "string" || typeof purchaseToken !== "string") {
    return REPO_ERROR(400, "bad_request", "packageId, productId and purchaseToken are required");
  }
  // Bounded before anything is forwarded to Google.
  if (purchaseToken.length > 4096 || packageId.length > 256 || productId.length > 256) {
    return REPO_ERROR(400, "bad_request", "request fields exceed their maximum length");
  }

  const listing = activeListing(await getListings(req, env), packageId);
  if (!listing) return REPO_ERROR(404, "not_found", "no paid listing for " + packageId);
  if (listing.interval) return REPO_ERROR(501, "not_implemented", "Play subscriptions are not supported yet");
  // The product must be the one this package is sold as; otherwise any cheap product would unlock it.
  if (productId !== (listing.playProductId || packageId)) {
    return REPO_ERROR(402, "payment_required", "that product does not entitle this package");
  }

  let grant: Awaited<ReturnType<typeof verifyPlayPurchase>>;
  try {
    grant = await verifyPlayPurchase({ packageName: env.PLAY_PACKAGE_NAME, serviceAccount }, productId, purchaseToken);
  } catch (e) {
    // Not the buyer's fault and not a refusal: the store app retries instead of saying they did not pay.
    const message = e instanceof PlayUnavailableError ? e.message : "verification failed";
    return REPO_ERROR(502, "bad_gateway", "could not verify the purchase with Google: " + message);
  }
  if (!grant) return REPO_ERROR(402, "payment_required", "that purchase does not entitle this package");

  const token = await issueEntitlement(env, {
    packageId,
    subject: grant.subject,
    kind: "perpetual",
    issuedAt: new Date().toISOString(),
  });
  return json({ entitlement: encodeToken(token) });
}


function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function sortPackages(packages: CatalogEntry[], sort: string | null): CatalogEntry[] {
  const out = [...packages];
  if (sort === "name") out.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === "recent") {
    out.sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
  } else if (sort === "rating") {
    out.sort((a, b) => Number(b.rating || -1) - Number(a.rating || -1));
  } else if (sort === "popular") {
    out.sort((a, b) => Number(b.downloads || 0) - Number(a.downloads || 0));
  }
  return out;
}

async function repositoryPackages(req: Request, env: Env): Promise<Response> {
  const url = new URL(req.url);
  let packages: CatalogEntry[] = (await ratedCatalog(req, env)).map((pkg) => ({
    ...pkg,
    latest: pkg.version,
  }));

  const q = (url.searchParams.get("q") || "").trim().toLowerCase();
  if (q) {
    packages = packages.filter((pkg) =>
      [pkg.id, pkg.name, String(pkg.description || ""), String(pkg.author || "")]
        .some((value) => value.toLowerCase().includes(q)),
    );
  }

  const app = (url.searchParams.get("app") || "").trim();
  if (app) {
    packages = packages.filter((pkg) => {
      const targets = strings(pkg.targetApps);
      return targets.length === 0 || targets.includes(app);
    });
  }

  const kindParam = url.searchParams.get("kind") || url.searchParams.get("kinds");
  if (kindParam) {
    const want = new Set(kindParam.split(",").map((x) => x.trim()).filter(Boolean));
    packages = packages.filter((pkg) => want.has(pkg.kind));
  }

  const typesParam = url.searchParams.get("types");
  if (typesParam) {
    const want = new Set(typesParam.split(",").map((x) => x.trim()).filter(Boolean));
    packages = packages.filter((pkg) => strings(pkg.types).some((type) => want.has(type)));
  }

  const mediaParam = url.searchParams.get("mediaDomains");
  if (mediaParam) {
    const want = new Set(mediaParam.split(",").map((x) => x.trim()).filter(Boolean));
    packages = packages.filter((pkg) => strings(pkg.mediaDomains).some((domain) => want.has(domain)));
  }

  const capabilitiesParam = url.searchParams.get("capabilities");
  if (capabilitiesParam) {
    const supported = new Set(capabilitiesParam.split(",").map((x) => x.trim()).filter(Boolean));
    packages = packages.filter((pkg) => strings(pkg.capabilities).every((cap) => supported.has(cap)));
  }

  packages = sortPackages(packages, url.searchParams.get("sort"));
  const pageSize = Math.min(100, Math.max(1, Number(url.searchParams.get("limit") || "20") || 20));
  const total = packages.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(pages, Math.max(1, Number(url.searchParams.get("page") || "1") || 1));
  const start = (page - 1) * pageSize;
  return json({ packages: packages.slice(start, start + pageSize), total, page, pages });
}

async function repositoryDetail(req: Request, env: Env, id: string): Promise<Response> {
  const [catalog, listings, ratings] = await Promise.all([
    getCatalog(req, env),
    getListings(req, env),
    ratingAggregates(env),
  ]);
  const publicPkg = catalog.find((entry) => entry.id === id);
  const listing = activeListing(listings, id);
  const pkg = publicPkg || (listing ? listedPackage(listing) : undefined);
  if (!pkg) return json({ error: { code: "not_found", message: "unknown package: " + id } }, 404);
  const paid = !publicPkg && !!listing;
  const yanked = !!(await isRevoked(env, id, pkg.version));
  return json({
    ...pkg,
    ...(ratings[id] ?? { ratingCount: 0 }),
    latest: pkg.version,
    price: paid ? { amountCents: listing!.amountCents, currency: listing!.currency } : null,
    priceStatus: paid ? "paid" : "free",
    versions: [{
      version: pkg.version,
      integrity: pkg.integrity,
      digest: pkg.integrity,
      size: pkg.bytes,
      yanked,
    }],
  });
}

async function packageProtected(env: Env, id: string, version: string): Promise<boolean> {
  const response = await state(env).fetch(
    new Request(
      "https://state.internal/package/" + encodeURIComponent(id) + "/" + encodeURIComponent(version),
      { method: "HEAD" },
    ),
  );
  return response.ok;
}

async function checkout(req: Request, env: Env): Promise<Response> {
  if (!env.STRIPE_SECRET_KEY) {
    return json({ error: "Checkout is temporarily unavailable." }, 503);
  }

  let body: { packageId?: unknown };
  try {
    body = await req.json() as { packageId?: unknown };
  } catch {
    return json({ error: "invalid JSON body" }, 400);
  }

  const packageId = typeof body.packageId === "string" ? body.packageId.trim() : "";
  if (!PACKAGE_ID.test(packageId)) return json({ error: "packageId is required" }, 400);

  const [catalog, listings] = await Promise.all([getCatalog(req, env), getListings(req, env)]);
  const listing = activeListing(listings, packageId);
  if (!listing) return json({ error: "package is not listed for sale" }, 404);
  if (catalog.some((p) => p.id === packageId)) {
    return json({ error: "this paid listing conflicts with publicly downloadable package bytes" }, 409);
  }
  const pkg = listedPackage(listing);
  if (listing.interval && !env.STRIPE_WEBHOOK_SECRET) {
    return json({ error: "subscription checkout is unavailable until Stripe webhooks are configured" }, 503);
  }
  if (!(await packageProtected(env, packageId, pkg.version))) {
    return json({ error: "paid package bytes are not available in protected storage" }, 503);
  }

  const knownSeller = await storedSeller(env, listing.sellerId);
  const destination = knownSeller?.accountId || listing.stripeAccountId;
  if (!destination) {
    return json({ error: "seller has not connected a Stripe payout account" }, 409);
  }
  const seller = await refreshSeller(env, listing.sellerId, destination);
  if (!seller.chargesEnabled || !seller.payoutsEnabled) {
    return json({ error: "seller payout account is not ready" }, 409);
  }

  const subjects = await readBuyerSubjects(req, env);
  const buyerId = subjects[0] || newBuyerSubject();
  const breakdown = quote(listing.amountCents, listing.currency, env);
  const applicationFee = breakdown.processorFee.amountCents + breakdown.platformFee.amountCents;
  const origin = env.PUBLIC_ORIGIN.replace(/\/$/, "");

  const fields: Record<string, string | undefined> = {
    success_url: origin + "/checkout/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: origin + "/?checkout=cancelled",
    client_reference_id: buyerId,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": listing.currency.toLowerCase(),
    "line_items[0][price_data][unit_amount]": String(listing.amountCents),
    "line_items[0][price_data][product_data][name]": pkg.name,
    "metadata[packageId]": packageId,
    "metadata[buyerId]": buyerId,
    "metadata[interval]": listing.interval,
  };

  if (listing.interval) {
    fields.mode = "subscription";
    fields["line_items[0][price_data][recurring][interval]"] = listing.interval;
    fields["subscription_data[application_fee_percent]"] = ((applicationFee / listing.amountCents) * 100).toFixed(2);
    fields["subscription_data[transfer_data][destination]"] = destination;
  } else {
    fields.mode = "payment";
    fields["payment_intent_data[application_fee_amount]"] = String(applicationFee);
    fields["payment_intent_data[transfer_data][destination]"] = destination;
  }

  try {
    const session = await stripe(env, "/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "idempotency-key": "azp_" + packageId + "_" + buyerId + "_" + listing.amountCents,
      },
      body: urlForm(fields),
    });

    const id = typeof session.id === "string" ? session.id : "";
    const url = typeof session.url === "string" ? session.url : "";
    if (!id || !url) throw new Error("Stripe returned no checkout URL");

    await stateJson(env, "/session/" + encodeURIComponent(id), {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id,
        packageId,
        buyerId,
        interval: listing.interval,
        status: "pending",
        createdAt: new Date().toISOString(),
      }),
    });

    const cookie = await makeBuyerCookie(req, buyerId, env);
    return json(
      {
        session: {
          id,
          url,
          status: "pending",
          amount: { amountCents: listing.amountCents, currency: listing.currency },
        },
        breakdown,
      },
      200,
      cookie ? { "set-cookie": cookie } : {},
    );
  } catch (error) {
    console.error("checkout failed", error);
    return json({ error: error instanceof Error ? error.message : "checkout failed" }, 502);
  }
}

async function connectOnboard(req: Request, env: Env): Promise<Response> {
  if (!env.STRIPE_SECRET_KEY) return json({ error: "Stripe Connect onboarding is not configured" }, 404);

  let body: { sellerId?: unknown; email?: unknown; country?: unknown };
  try {
    body = await req.json() as { sellerId?: unknown; email?: unknown; country?: unknown };
  } catch {
    return json({ error: "invalid JSON body" }, 400);
  }

  const sellerId = typeof body.sellerId === "string" ? body.sellerId.trim() : "";
  if (!sellerId || sellerId.length > 128) return json({ error: "sellerId is required" }, 400);
  const email = typeof body.email === "string" && body.email.trim() ? body.email.trim() : undefined;
  const country = typeof body.country === "string" && body.country.trim() ? body.country.trim().toUpperCase() : undefined;

  try {
    let seller = await storedSeller(env, sellerId);
    if (!seller) {
      const account = await stripe(env, "/v1/accounts", {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: urlForm({
          type: "express",
          "capabilities[transfers][requested]": "true",
          "capabilities[card_payments][requested]": "true",
          email,
          country,
        }),
      });
      seller = await storeSeller(env, sellerFromStripe(sellerId, account));
    } else {
      seller = await refreshSeller(env, sellerId, seller.accountId);
    }

    const origin = env.PUBLIC_ORIGIN.replace(/\/$/, "");
    const back = origin + "/connect/onboard?sellerId=" + encodeURIComponent(sellerId);
    const link = await stripe(env, "/v1/account_links", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: urlForm({
        account: seller.accountId,
        refresh_url: back,
        return_url: back,
        type: "account_onboarding",
      }),
    });
    if (typeof link.url !== "string" || !link.url) throw new Error("Stripe returned no onboarding URL");
    return json({ url: link.url, accountId: seller.accountId });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "onboarding failed" }, 502);
  }
}

async function connectStatus(req: Request, env: Env): Promise<Response> {
  const url = new URL(req.url);
  const sellerId = (url.searchParams.get("sellerId") || "").trim();
  if (!sellerId) return json({ error: "sellerId is required" }, 400);

  try {
    let seller = await storedSeller(env, sellerId);
    if (!seller) return json({ onboarded: false });
    if (url.searchParams.get("refresh") === "1") {
      seller = await refreshSeller(env, sellerId, seller.accountId);
    }
    return json({
      onboarded: true,
      accountId: seller.accountId,
      chargesEnabled: seller.chargesEnabled,
      payoutsEnabled: seller.payoutsEnabled,
      detailsSubmitted: seller.detailsSubmitted,
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "seller status failed" }, 502);
  }
}

function stripeSignature(header: string): { timestamp: string; signatures: string[] } | undefined {
  let timestamp = "";
  const signatures: string[] = [];
  for (const part of header.split(",")) {
    const [key, value] = part.trim().split("=", 2);
    if (key === "t") timestamp = value || "";
    if (key === "v1" && value) signatures.push(value);
  }
  return timestamp && signatures.length ? { timestamp, signatures } : undefined;
}

function bytesHex(bytes: Uint8Array): string {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function validStripeWebhook(payload: string, header: string | null, env: Env): Promise<boolean> {
  if (!header || !env.STRIPE_WEBHOOK_SECRET) return false;
  const parsed = stripeSignature(header);
  if (!parsed) return false;
  const time = Number(parsed.timestamp) * 1000;
  if (!Number.isFinite(time) || Math.abs(Date.now() - time) > 300000) return false;
  const want = bytesHex(await hmac(env.STRIPE_WEBHOOK_SECRET, parsed.timestamp + "." + payload));
  return parsed.signatures.some((candidate) => candidate.length === want.length && candidate === want);
}

function objectId(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && typeof (value as { id?: unknown }).id === "string") {
    return (value as { id: string }).id;
  }
  return undefined;
}

async function entitlementFor(
  env: Env,
  sessionId: string,
  packageId: string,
  subject: string,
  interval?: "month" | "year",
): Promise<EntitlementRecord> {
  const existing = await state(env).fetch(
    new Request("https://state.internal/entitlement/" + encodeURIComponent(sessionId)),
  );
  if (existing.ok) return existing.json() as Promise<EntitlementRecord>;

  const issuedAt = new Date().toISOString();
  const claims: EntitlementClaims = {
    packageId,
    subject,
    kind: interval ? "subscription" : "perpetual",
    issuedAt,
  };
  if (interval) claims.expiresAt = periodEnd(issuedAt, interval);

  const record: EntitlementRecord = {
    sessionId,
    subject,
    packageId,
    token: await issueEntitlement(env, claims),
    issuedAt,
  };

  return stateJson<EntitlementRecord>(env, "/entitlement/" + encodeURIComponent(sessionId), {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(record),
  });
}

async function webhook(req: Request, env: Env): Promise<Response> {
  const payload = await req.text();
  if (!(await validStripeWebhook(payload, req.headers.get("stripe-signature"), env))) {
    return json({ error: "Webhook signature verification failed" }, 400);
  }

  const event = JSON.parse(payload) as {
    type?: string;
    data?: { object?: Record<string, unknown> };
  };
  const object = event.data?.object || {};

  try {
    if (event.type === "checkout.session.completed") {
      const metadata = (object.metadata || {}) as Record<string, unknown>;
      const packageId = typeof metadata.packageId === "string" ? metadata.packageId : "";
      const buyerId = typeof metadata.buyerId === "string" ? metadata.buyerId : "";
      const interval =
        metadata.interval === "month" || metadata.interval === "year"
          ? metadata.interval
          : undefined;
      const sessionId = typeof object.id === "string" ? object.id : "";
      if (!packageId || !buyerId || !sessionId) return json({ received: true, fulfilled: false });

      await entitlementFor(env, sessionId, packageId, buyerId, interval);

      const subscriptionId = objectId(object.subscription);
      if (subscriptionId && interval) {
        await stateJson(env, "/subscription/" + encodeURIComponent(subscriptionId), {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ subscriptionId, packageId, subject: buyerId, interval }),
        });
      }
      return json({ received: true, fulfilled: true });
    }

    if (event.type === "invoice.paid") {
      if (object.billing_reason === "subscription_create") {
        return json({ received: true, renewed: false });
      }
      const parent = object.parent as { subscription_details?: { subscription?: unknown } } | undefined;
      const subscriptionId =
        objectId(object.subscription) ||
        objectId(parent?.subscription_details?.subscription);
      const invoiceId = typeof object.id === "string" ? object.id : "";
      if (!subscriptionId || !invoiceId) return json({ received: true, renewed: false });

      const subResponse = await state(env).fetch(
        new Request("https://state.internal/subscription/" + encodeURIComponent(subscriptionId)),
      );
      if (!subResponse.ok) return json({ received: true, renewed: false });
      const sub = await subResponse.json() as {
        packageId: string;
        subject: string;
        interval: "month" | "year";
      };
      await entitlementFor(env, "invoice:" + invoiceId, sub.packageId, sub.subject, sub.interval);
      return json({ received: true, renewed: true });
    }

    if (event.type === "customer.subscription.deleted") {
      const id = typeof object.id === "string" ? object.id : "";
      if (id) {
        await state(env).fetch(
          new Request("https://state.internal/subscription/" + encodeURIComponent(id), {
            method: "DELETE",
          }),
        );
      }
      return json({ received: true, cancelled: true });
    }

    if (event.type === "account.updated") {
      const accountId = typeof object.id === "string" ? object.id : "";
      if (accountId) {
        const known = await state(env).fetch(
          new Request("https://state.internal/seller-account/" + encodeURIComponent(accountId)),
        );
        if (known.ok) {
          const seller = await known.json() as SellerAccount;
          await storeSeller(env, sellerFromStripe(seller.sellerId, object));
        }
      }
      return json({ received: true, refreshed: true });
    }

    return json({ received: true });
  } catch (error) {
    console.error("webhook fulfilment failed", error);
    return json({ error: "fulfilment failed" }, 500);
  }
}

async function sessionResult(req: Request, env: Env, id: string): Promise<Response> {
  const existing = await state(env).fetch(
    new Request("https://state.internal/entitlement/" + encodeURIComponent(id)),
  );
  if (existing.ok) {
    const record = await existing.json() as EntitlementRecord;
    const cookie = await makeBuyerCookie(req, record.subject, env);
    return json(
      {
        status: "ready",
        packageId: record.packageId,
        token: encodeToken(record.token),
      },
      200,
      cookie ? { "set-cookie": cookie } : {},
    );
  }
  if (existing.status !== 404) return json({ error: "entitlement lookup failed" }, 500);
  if (!env.STRIPE_SECRET_KEY) return json({ status: "pending" }, 202);

  const stored = await state(env).fetch(
    new Request("https://state.internal/session/" + encodeURIComponent(id)),
  );
  if (!stored.ok) return json({ status: "pending" }, 202);
  const session = await stored.json() as {
    packageId: string;
    buyerId: string;
    interval?: "month" | "year";
  };

  let remote: Record<string, unknown>;
  try {
    remote = await stripe(env, "/v1/checkout/sessions/" + encodeURIComponent(id), { method: "GET" });
  } catch {
    return json({ status: "pending" }, 202);
  }

  const paymentStatus = typeof remote.payment_status === "string" ? remote.payment_status : "";
  const status = typeof remote.status === "string" ? remote.status : "";
  if (paymentStatus !== "paid" && paymentStatus !== "no_payment_required" && status !== "complete") {
    return json({ status: "pending" }, 202);
  }

  const record = await entitlementFor(
    env,
    id,
    session.packageId,
    session.buyerId,
    session.interval,
  );

  const subscriptionId = objectId(remote.subscription);
  if (subscriptionId && session.interval) {
    await stateJson(env, "/subscription/" + encodeURIComponent(subscriptionId), {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        subscriptionId,
        packageId: session.packageId,
        subject: session.buyerId,
        interval: session.interval,
      }),
    });
  }

  const cookie = await makeBuyerCookie(req, record.subject, env);
  return json(
    {
      status: "ready",
      packageId: record.packageId,
      token: encodeToken(record.token),
    },
    200,
    cookie ? { "set-cookie": cookie } : {},
  );
}

async function purchases(req: Request, env: Env): Promise<Response> {
  const subjects = await readBuyerSubjects(req, env);
  if (!subjects.length) return json([]);
  const all: Array<{ packageId: string; sessionId: string; issuedAt: string; token: string }> = [];
  for (const subject of subjects) {
    const records = await stateJson<EntitlementRecord[]>(
      env,
      "/purchases?subject=" + encodeURIComponent(subject),
    );
    for (const record of records) {
      all.push({
        packageId: record.packageId,
        sessionId: record.sessionId,
        issuedAt: record.issuedAt,
        token: encodeToken(record.token),
      });
    }
  }
  const seen = new Set<string>();
  return json(
    all
      .filter((item) => {
        if (seen.has(item.sessionId)) return false;
        seen.add(item.sessionId);
        return true;
      })
      .sort((a, b) => b.issuedAt.localeCompare(a.issuedAt)),
  );
}

function adminAuthorized(req: Request, env: Env): boolean {
  return !!env.ADMIN_TOKEN && req.headers.get("authorization") === "Bearer " + env.ADMIN_TOKEN;
}

async function adminUpload(req: Request, env: Env, id: string, version: string): Promise<Response> {
  if (!adminAuthorized(req, env)) return json({ error: "unauthorized" }, 401);
  if (!PACKAGE_ID.test(id) || !VERSION.test(version)) return json({ error: "invalid package coordinate" }, 400);

  const [catalog, listings] = await Promise.all([getCatalog(req, env), getListings(req, env)]);
  if (catalog.some((pkg) => pkg.id === id)) {
    return json({ error: "paid package id is already publicly downloadable from the git catalog" }, 409);
  }
  const listing = listings.find((entry) => entry.packageId === id);
  if (!listing) return json({ error: "paid listing metadata is missing" }, 404);
  if (listing.package.version !== version) {
    return json({ error: "uploaded version does not match the reviewed paid listing" }, 409);
  }

  const length = Number(req.headers.get("content-length") || "0");
  if (length > 100000000) return json({ error: "package exceeds the free-plan 100 MB request limit" }, 413);
  const body = new Uint8Array(await req.arrayBuffer());
  if (body.byteLength > 100000000) return json({ error: "package exceeds the free-plan 100 MB request limit" }, 413);
  if (typeof listing.package.bytes === "number" && listing.package.bytes !== body.byteLength) {
    return json({ error: "uploaded byte size does not match the reviewed paid listing" }, 409);
  }
  const integrity = await sha256Integrity(body);
  if (integrity !== listing.package.integrity) {
    return json({ error: "uploaded package digest does not match the reviewed paid listing" }, 409);
  }

  return state(env).fetch(
    new Request(
      "https://state.internal/package/" + encodeURIComponent(id) + "/" + encodeURIComponent(version),
      {
        method: "PUT",
        headers: {
          "content-type": req.headers.get("content-type") || "application/vnd.azphalt.package",
        },
        body,
      },
    ),
  );
}

/**
 * Mint the `azphalt-report-token` for one full download (repository-api.md § 8). Ranged responses get
 * none: one logical transfer is many range requests.
 */
async function withReportToken(env: Env, res: Response, id: string, version: string): Promise<Response> {
  if (res.status !== 200) return res;
  const { token } = await stateJson<{ token: string }>(env, "/report-token", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ packageId: id, version }),
  });
  const headers = new Headers(res.headers);
  headers.set("azphalt-report-token", token);
  return new Response(res.body, { status: res.status, headers });
}

async function download(req: Request, env: Env, id: string, version: string): Promise<Response> {
  const [catalog, listings, revoked] = await Promise.all([
    getCatalog(req, env),
    getListings(req, env),
    isRevoked(env, id, version),
  ]);
  // A yanked version is withdrawn, not hidden behind a flag the client may not read.
  if (revoked) {
    return json({
      error: {
        code: "not_found",
        message: "version " + version + " of " + id + " was revoked" + (revoked.reason ? ": " + revoked.reason : ""),
      },
    }, 404);
  }

  const publicPkg = catalog.find((p) => p.id === id && p.version === version);
  if (publicPkg) {
    if (!publicPkg.file) return json({ error: "package file unavailable" }, 404);
    // Served through the Worker rather than redirected, so a full download can carry its report token
    // (a redirect's headers never reach the client that follows it). The bytes still come from the
    // reviewed git catalog; Range passes through, so resumable downloads keep working.
    const upstreamHeaders = new Headers();
    const range = req.headers.get("range");
    if (range) upstreamHeaders.set("range", range);
    const upstream = await fetch(
      env.GITHUB_RAW_BASE.replace(/\/$/, "") + "/packages/" + encodeURIComponent(publicPkg.file),
      { headers: upstreamHeaders },
    );
    if (upstream.status === 404) return json({ error: "package file unavailable" }, 404);
    if (upstream.status === 416) {
      return new Response(null, { status: 416, headers: { "content-range": upstream.headers.get("content-range") || "" } });
    }
    if (upstream.status !== 200 && upstream.status !== 206) {
      return json({ error: { code: "bad_gateway", message: "the package store answered " + upstream.status } }, 502);
    }
    const out = new Headers();
    out.set("content-type", "application/vnd.azphalt.package");
    out.set("content-disposition", 'attachment; filename="' + id + "-" + version + '.azp"');
    out.set("accept-ranges", "bytes");
    out.set("cache-control", "public, max-age=300");
    for (const name of ["content-length", "content-range", "etag"]) {
      const value = upstream.headers.get(name);
      if (value) out.set(name, value);
    }
    return withReportToken(env, new Response(upstream.body, { status: upstream.status, headers: out }), id, version);
  }

  const listing = activeListing(listings, id);
  if (!listing || listing.package.version !== version) {
    return json({ error: "package version not found" }, 404);
  }

  const auth = req.headers.get("authorization") || "";
  if (!auth.startsWith("Bearer ")) return json({ error: "paid package requires an entitlement" }, 401);
  const token = decodeToken(auth.slice(7).trim());
  if (!token || !(await verifyEntitlement(env, token, id))) {
    return json({ error: "invalid or expired entitlement" }, 401);
  }

  const headers = new Headers();
  const range = req.headers.get("range");
  if (range) headers.set("range", range);
  const stored = await state(env).fetch(
    new Request(
      "https://state.internal/package/" + encodeURIComponent(id) + "/" + encodeURIComponent(version),
      { headers },
    ),
  );
  if (stored.status !== 200 && stored.status !== 206) {
    return json({ error: "protected package bytes unavailable" }, 503);
  }
  const out = new Headers(stored.headers);
  out.set("content-type", "application/vnd.azphalt.package");
  out.set("content-disposition", 'attachment; filename="' + id + "-" + version + '.azp"');
  out.set("cache-control", "private, no-store");
  return withReportToken(env, new Response(stored.body, { status: stored.status, headers: out }), id, version);
}

function first(iter: Iterable<Record<string, unknown>>): Record<string, unknown> | undefined {
  for (const row of iter) return row;
  return undefined;
}

function rows(iter: Iterable<Record<string, unknown>>): Record<string, unknown>[] {
  return Array.from(iter);
}

function asBytes(value: unknown): Uint8Array {
  if (value instanceof Uint8Array) return value;
  if (value instanceof ArrayBuffer) return new Uint8Array(value);
  if (ArrayBuffer.isView(value)) {
    return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
  }
  throw new Error("unexpected SQLite blob");
}

export class AzphaltState {
  constructor(private readonly ctx: DurableObjectStateLike) {
    void ctx.blockConcurrencyWhile(async () => {
      const sql = ctx.storage.sql;
      sql.exec(
        "CREATE TABLE IF NOT EXISTS system_secrets (" +
        "name TEXT PRIMARY KEY, value TEXT NOT NULL)"
      );
      sql.exec(
        "CREATE TABLE IF NOT EXISTS sessions (" +
        "id TEXT PRIMARY KEY, package_id TEXT NOT NULL, buyer_id TEXT NOT NULL, interval TEXT, " +
        "status TEXT NOT NULL, created_at TEXT NOT NULL)"
      );
      sql.exec(
        "CREATE TABLE IF NOT EXISTS entitlements (" +
        "session_id TEXT PRIMARY KEY, subject TEXT NOT NULL, package_id TEXT NOT NULL, " +
        "token_json TEXT NOT NULL, issued_at TEXT NOT NULL)"
      );
      sql.exec(
        "CREATE INDEX IF NOT EXISTS entitlements_subject_idx " +
        "ON entitlements(subject, issued_at DESC)"
      );
      sql.exec(
        "CREATE TABLE IF NOT EXISTS subscriptions (" +
        "subscription_id TEXT PRIMARY KEY, package_id TEXT NOT NULL, subject TEXT NOT NULL, interval TEXT NOT NULL)"
      );
      sql.exec(
        "CREATE TABLE IF NOT EXISTS seller_accounts (" +
        "seller_id TEXT PRIMARY KEY, account_id TEXT NOT NULL UNIQUE, charges_enabled INTEGER NOT NULL, " +
        "payouts_enabled INTEGER NOT NULL, details_submitted INTEGER NOT NULL, updated_at TEXT NOT NULL)"
      );
      sql.exec(
        "CREATE TABLE IF NOT EXISTS protected_packages (" +
        "package_id TEXT NOT NULL, version TEXT NOT NULL, total_bytes INTEGER NOT NULL, " +
        "chunks INTEGER NOT NULL, content_type TEXT NOT NULL, updated_at TEXT NOT NULL, " +
        "PRIMARY KEY(package_id, version))"
      );
      sql.exec(
        "CREATE TABLE IF NOT EXISTS protected_package_chunks (" +
        "package_id TEXT NOT NULL, version TEXT NOT NULL, chunk_index INTEGER NOT NULL, bytes BLOB NOT NULL, " +
        "PRIMARY KEY(package_id, version, chunk_index))"
      );
      // One row per (package, rater). The rater is an opaque buyer subject, never a person or an IP.
      sql.exec(
        "CREATE TABLE IF NOT EXISTS ratings (" +
        "package_id TEXT NOT NULL, subject TEXT NOT NULL, stars INTEGER NOT NULL, updated_at TEXT NOT NULL, " +
        "PRIMARY KEY(package_id, subject))"
      );
      // Filed reports. Nothing here identifies the filer beyond a `claimant` they chose to type.
      sql.exec(
        "CREATE TABLE IF NOT EXISTS reports (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, package_id TEXT NOT NULL, version TEXT, reason TEXT NOT NULL, " +
        "detail TEXT, original_package_id TEXT, claimant TEXT, signature TEXT, trusted INTEGER NOT NULL, " +
        "reported_at TEXT NOT NULL)"
      );
      // A moderator's decision on a report: "dismissed" or "yanked". Added after the table shipped.
      const reportColumns = new Set(rows(sql.exec("PRAGMA table_info(reports)")).map((row) => String(row.name)));
      if (!reportColumns.has("resolution")) sql.exec("ALTER TABLE reports ADD COLUMN resolution TEXT");
      if (!reportColumns.has("resolved_at")) sql.exec("ALTER TABLE reports ADD COLUMN resolved_at TEXT");
      // Yanked versions — the `/revocations` feed (repository-api.md § 5).
      sql.exec(
        "CREATE TABLE IF NOT EXISTS revocations (" +
        "package_id TEXT NOT NULL, version TEXT NOT NULL, reason TEXT, revoked_at TEXT NOT NULL, " +
        "PRIMARY KEY(package_id, version))"
      );
      // Install reporting (repository-api.md § 8, state-reporting.md § 4). A report token is a bare
      // random string minted with a full download; nothing about who received it is stored. A receipt
      // is minted when an install is accepted and spent by the matching uninstall.
      sql.exec(
        "CREATE TABLE IF NOT EXISTS report_tokens (" +
        "token TEXT PRIMARY KEY, package_id TEXT NOT NULL, version TEXT NOT NULL, issued_at TEXT NOT NULL)"
      );
      sql.exec(
        "CREATE TABLE IF NOT EXISTS install_receipts (" +
        "receipt TEXT PRIMARY KEY, package_id TEXT NOT NULL, version TEXT NOT NULL, issued_at TEXT NOT NULL)"
      );
      sql.exec(
        "CREATE TABLE IF NOT EXISTS install_counts (" +
        "package_id TEXT PRIMARY KEY, installs INTEGER NOT NULL DEFAULT 0, uninstalls INTEGER NOT NULL DEFAULT 0)"
      );
    });
  }

  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const path = url.pathname;
    const sql = this.ctx.storage.sql;
    let match: RegExpMatchArray | null;

    if (req.method === "GET" && path === "/system-secrets") {
      const existing = Object.fromEntries(
        rows(sql.exec("SELECT name,value FROM system_secrets")).map((row) => [
          String(row.name),
          String(row.value),
        ]),
      );
      let buyerSessionSecret = existing.buyer_session;
      let entitlementPrivateKeyPkcs8B64 = existing.entitlement_private;
      let entitlementPublicKeySpkiB64 = existing.entitlement_public;

      if (!buyerSessionSecret) {
        const bytes = new Uint8Array(32);
        crypto.getRandomValues(bytes);
        buyerSessionSecret = bytesToBase64(bytes);
        sql.exec(
          "INSERT OR REPLACE INTO system_secrets(name,value) VALUES(?,?)",
          "buyer_session",
          buyerSessionSecret,
        );
      }

      if (!entitlementPrivateKeyPkcs8B64 || !entitlementPublicKeySpkiB64) {
        const pair = await crypto.subtle.generateKey(
          { name: "Ed25519" },
          true,
          ["sign", "verify"],
        ) as CryptoKeyPair;
        entitlementPrivateKeyPkcs8B64 = bytesToBase64(
          new Uint8Array(await crypto.subtle.exportKey("pkcs8", pair.privateKey)),
        );
        entitlementPublicKeySpkiB64 = bytesToBase64(
          new Uint8Array(await crypto.subtle.exportKey("spki", pair.publicKey)),
        );
        sql.exec(
          "INSERT OR REPLACE INTO system_secrets(name,value) VALUES(?,?)",
          "entitlement_private",
          entitlementPrivateKeyPkcs8B64,
        );
        sql.exec(
          "INSERT OR REPLACE INTO system_secrets(name,value) VALUES(?,?)",
          "entitlement_public",
          entitlementPublicKeySpkiB64,
        );
      }

      return json({
        buyerSessionSecret,
        entitlementPrivateKeyPkcs8B64,
        entitlementPublicKeySpkiB64,
      });
    }

    match = path.match(/^\/session\/([^/]+)$/);
    if (match) {
      const id = decodeURIComponent(match[1]);
      if (req.method === "GET") {
        const row = first(sql.exec(
          "SELECT id,package_id,buyer_id,interval,status,created_at FROM sessions WHERE id=?",
          id,
        ));
        if (!row) return json({ error: "not found" }, 404);
        return json({
          id: String(row.id),
          packageId: String(row.package_id),
          buyerId: String(row.buyer_id),
          interval: row.interval === null || row.interval === undefined ? undefined : String(row.interval),
          status: String(row.status),
          createdAt: String(row.created_at),
        });
      }
      if (req.method === "PUT") {
        const session = await req.json() as {
          id: string;
          packageId: string;
          buyerId: string;
          interval?: string;
          status: string;
          createdAt: string;
        };
        sql.exec(
          "INSERT INTO sessions(id,package_id,buyer_id,interval,status,created_at) VALUES(?,?,?,?,?,?) " +
          "ON CONFLICT(id) DO UPDATE SET status=excluded.status",
          session.id,
          session.packageId,
          session.buyerId,
          session.interval || null,
          session.status,
          session.createdAt,
        );
        return json(session);
      }
    }

    match = path.match(/^\/entitlement\/([^/]+)$/);
    if (match) {
      const sessionId = decodeURIComponent(match[1]);
      if (req.method === "GET") {
        const row = first(sql.exec(
          "SELECT session_id,subject,package_id,token_json,issued_at FROM entitlements WHERE session_id=?",
          sessionId,
        ));
        if (!row) return json({ error: "not found" }, 404);
        return json({
          sessionId: String(row.session_id),
          subject: String(row.subject),
          packageId: String(row.package_id),
          token: JSON.parse(String(row.token_json)),
          issuedAt: String(row.issued_at),
        });
      }
      if (req.method === "PUT") {
        const record = await req.json() as EntitlementRecord;
        sql.exec(
          "INSERT OR IGNORE INTO entitlements(session_id,subject,package_id,token_json,issued_at) VALUES(?,?,?,?,?)",
          record.sessionId,
          record.subject,
          record.packageId,
          JSON.stringify(record.token),
          record.issuedAt,
        );
        const row = first(sql.exec(
          "SELECT session_id,subject,package_id,token_json,issued_at FROM entitlements WHERE session_id=?",
          sessionId,
        ));
        if (!row) return json({ error: "write failed" }, 500);
        return json({
          sessionId: String(row.session_id),
          subject: String(row.subject),
          packageId: String(row.package_id),
          token: JSON.parse(String(row.token_json)),
          issuedAt: String(row.issued_at),
        });
      }
    }

    if (req.method === "GET" && path === "/purchases") {
      const subject = url.searchParams.get("subject") || "";
      return json(rows(sql.exec(
        "SELECT session_id,subject,package_id,token_json,issued_at FROM entitlements " +
        "WHERE subject=? ORDER BY issued_at DESC",
        subject,
      )).map((row) => ({
        sessionId: String(row.session_id),
        subject: String(row.subject),
        packageId: String(row.package_id),
        token: JSON.parse(String(row.token_json)),
        issuedAt: String(row.issued_at),
      })));
    }

    match = path.match(/^\/seller\/([^/]+)$/);
    if (match) {
      const sellerId = decodeURIComponent(match[1]);
      if (req.method === "GET") {
        const row = first(sql.exec(
          "SELECT seller_id,account_id,charges_enabled,payouts_enabled,details_submitted,updated_at " +
          "FROM seller_accounts WHERE seller_id=?",
          sellerId,
        ));
        if (!row) return json({ error: "not found" }, 404);
        return json({
          sellerId: String(row.seller_id),
          accountId: String(row.account_id),
          chargesEnabled: Number(row.charges_enabled) === 1,
          payoutsEnabled: Number(row.payouts_enabled) === 1,
          detailsSubmitted: Number(row.details_submitted) === 1,
          updatedAt: String(row.updated_at),
        });
      }
      if (req.method === "PUT") {
        const seller = await req.json() as SellerAccount;
        sql.exec(
          "INSERT INTO seller_accounts(seller_id,account_id,charges_enabled,payouts_enabled,details_submitted,updated_at) " +
          "VALUES(?,?,?,?,?,?) ON CONFLICT(seller_id) DO UPDATE SET account_id=excluded.account_id, " +
          "charges_enabled=excluded.charges_enabled,payouts_enabled=excluded.payouts_enabled, " +
          "details_submitted=excluded.details_submitted,updated_at=excluded.updated_at",
          seller.sellerId,
          seller.accountId,
          seller.chargesEnabled ? 1 : 0,
          seller.payoutsEnabled ? 1 : 0,
          seller.detailsSubmitted ? 1 : 0,
          seller.updatedAt,
        );
        return json(seller);
      }
    }

    match = path.match(/^\/seller-account\/([^/]+)$/);
    if (match && req.method === "GET") {
      const accountId = decodeURIComponent(match[1]);
      const row = first(sql.exec(
        "SELECT seller_id,account_id,charges_enabled,payouts_enabled,details_submitted,updated_at " +
        "FROM seller_accounts WHERE account_id=?",
        accountId,
      ));
      if (!row) return json({ error: "not found" }, 404);
      return json({
        sellerId: String(row.seller_id),
        accountId: String(row.account_id),
        chargesEnabled: Number(row.charges_enabled) === 1,
        payoutsEnabled: Number(row.payouts_enabled) === 1,
        detailsSubmitted: Number(row.details_submitted) === 1,
        updatedAt: String(row.updated_at),
      });
    }

    match = path.match(/^\/subscription\/([^/]+)$/);
    if (match) {
      const id = decodeURIComponent(match[1]);
      if (req.method === "PUT") {
        const sub = await req.json() as {
          subscriptionId: string;
          packageId: string;
          subject: string;
          interval: string;
        };
        sql.exec(
          "INSERT INTO subscriptions(subscription_id,package_id,subject,interval) VALUES(?,?,?,?) " +
          "ON CONFLICT(subscription_id) DO UPDATE SET package_id=excluded.package_id, " +
          "subject=excluded.subject, interval=excluded.interval",
          sub.subscriptionId,
          sub.packageId,
          sub.subject,
          sub.interval,
        );
        return json(sub);
      }
      if (req.method === "GET") {
        const row = first(sql.exec(
          "SELECT subscription_id,package_id,subject,interval FROM subscriptions WHERE subscription_id=?",
          id,
        ));
        if (!row) return json({ error: "not found" }, 404);
        return json({
          subscriptionId: String(row.subscription_id),
          packageId: String(row.package_id),
          subject: String(row.subject),
          interval: String(row.interval),
        });
      }
      if (req.method === "DELETE") {
        sql.exec("DELETE FROM subscriptions WHERE subscription_id=?", id);
        return json({ deleted: true });
      }
    }

    match = path.match(/^\/package\/([^/]+)\/([^/]+)$/);
    if (match) {
      const packageId = decodeURIComponent(match[1]);
      const version = decodeURIComponent(match[2]);

      if (req.method === "HEAD") {
        const meta = first(sql.exec(
          "SELECT total_bytes,content_type FROM protected_packages WHERE package_id=? AND version=?",
          packageId,
          version,
        ));
        return meta
          ? new Response(null, {
              status: 200,
              headers: {
                "content-length": String(meta.total_bytes),
                "content-type": String(meta.content_type),
              },
            })
          : new Response(null, { status: 404 });
      }

      if (req.method === "PUT") {
        const bytes = new Uint8Array(await req.arrayBuffer());
        if (bytes.byteLength > 100000000) return json({ error: "package exceeds 100 MB" }, 413);
        sql.exec(
          "DELETE FROM protected_package_chunks WHERE package_id=? AND version=?",
          packageId,
          version,
        );
        sql.exec(
          "DELETE FROM protected_packages WHERE package_id=? AND version=?",
          packageId,
          version,
        );
        const chunks = Math.ceil(bytes.byteLength / CHUNK_BYTES);
        for (let i = 0; i < chunks; i++) {
          const chunk = bytes.subarray(
            i * CHUNK_BYTES,
            Math.min(bytes.byteLength, (i + 1) * CHUNK_BYTES),
          );
          sql.exec(
            "INSERT INTO protected_package_chunks(package_id,version,chunk_index,bytes) VALUES(?,?,?,?)",
            packageId,
            version,
            i,
            chunk,
          );
        }
        sql.exec(
          "INSERT INTO protected_packages(package_id,version,total_bytes,chunks,content_type,updated_at) " +
          "VALUES(?,?,?,?,?,?)",
          packageId,
          version,
          bytes.byteLength,
          chunks,
          req.headers.get("content-type") || "application/vnd.azphalt.package",
          new Date().toISOString(),
        );
        return json({ packageId, version, bytes: bytes.byteLength, chunks });
      }

      if (req.method === "GET") {
        const meta = first(sql.exec(
          "SELECT total_bytes,content_type FROM protected_packages WHERE package_id=? AND version=?",
          packageId,
          version,
        ));
        if (!meta) return json({ error: "not found" }, 404);

        const total = Number(meta.total_bytes);
        let start = 0;
        let end = total - 1;
        let status = 200;
        const range = req.headers.get("range")?.match(/^bytes=(\d+)-(\d*)$/);
        if (range) {
          start = Number(range[1]);
          end = range[2] ? Number(range[2]) : total - 1;
          if (start >= total || end < start) {
            return new Response(null, {
              status: 416,
              headers: { "content-range": "bytes */" + total },
            });
          }
          end = Math.min(end, total - 1);
          status = 206;
        }

        const firstChunk = Math.floor(start / CHUNK_BYTES);
        const lastChunk = Math.floor(end / CHUNK_BYTES);
        const chunkRows = rows(sql.exec(
          "SELECT chunk_index,bytes FROM protected_package_chunks " +
          "WHERE package_id=? AND version=? AND chunk_index>=? AND chunk_index<=? ORDER BY chunk_index",
          packageId,
          version,
          firstChunk,
          lastChunk,
        ));
        const parts = chunkRows.map((row) => asBytes(row.bytes));
        const merged = new Uint8Array(parts.reduce((sum, part) => sum + part.byteLength, 0));
        let at = 0;
        for (const part of parts) {
          merged.set(part, at);
          at += part.byteLength;
        }
        const offset = start - firstChunk * CHUNK_BYTES;
        const body = merged.slice(offset, offset + end - start + 1);
        const headers: Record<string, string> = {
          "content-type": String(meta.content_type),
          "content-length": String(body.byteLength),
          "accept-ranges": "bytes",
        };
        if (status === 206) headers["content-range"] = "bytes " + start + "-" + end + "/" + total;
        return new Response(body, { status, headers });
      }
    }

    if (req.method === "GET" && path === "/ratings") {
      const out: Record<string, { rating: number; ratingCount: number }> = {};
      for (const row of sql.exec(
        "SELECT package_id, AVG(stars) AS rating, COUNT(*) AS n FROM ratings GROUP BY package_id",
      )) {
        out[String(row.package_id)] = {
          rating: Math.round(Number(row.rating) * 100) / 100,
          ratingCount: Number(row.n),
        };
      }
      return json(out);
    }

    if (req.method === "PUT" && path === "/rating") {
      const { packageId, subject, stars } = await req.json() as {
        packageId: string;
        subject: string;
        stars: number;
      };
      sql.exec(
        "INSERT INTO ratings(package_id,subject,stars,updated_at) VALUES(?,?,?,?) " +
        "ON CONFLICT(package_id,subject) DO UPDATE SET stars=excluded.stars, updated_at=excluded.updated_at",
        packageId,
        subject,
        stars,
        new Date().toISOString(),
      );
      const row = first(sql.exec(
        "SELECT AVG(stars) AS rating, COUNT(*) AS n FROM ratings WHERE package_id=?",
        packageId,
      ));
      return json({
        rating: Math.round(Number(row?.rating) * 100) / 100,
        ratingCount: Number(row?.n ?? 0),
      });
    }

    if (req.method === "POST" && path === "/report") {
      const r = await req.json() as {
        packageId: string;
        version?: string;
        reason: string;
        detail?: string;
        originalPackageId?: string;
        claimant?: string;
        signature?: string;
        trusted: boolean;
        reportedAt: string;
      };
      const row = first(sql.exec(
        "INSERT INTO reports(package_id,version,reason,detail,original_package_id,claimant,signature,trusted,reported_at) " +
        "VALUES(?,?,?,?,?,?,?,?,?) RETURNING id",
        r.packageId,
        r.version ?? null,
        r.reason,
        r.detail ?? null,
        r.originalPackageId ?? null,
        r.claimant ?? null,
        r.signature ?? null,
        r.trusted ? 1 : 0,
        r.reportedAt,
      ));
      return json({ id: Number(row?.id), ...r });
    }

    if (req.method === "GET" && path === "/reports") {
      const optional = (value: unknown) => (value === null || value === undefined ? undefined : String(value));
      return json(rows(sql.exec(
        "SELECT id,package_id,version,reason,detail,original_package_id,claimant,signature,trusted,reported_at," +
        "resolution,resolved_at FROM reports ORDER BY reported_at DESC, id DESC LIMIT 500",
      )).map((row) => ({
        id: Number(row.id),
        packageId: String(row.package_id),
        version: optional(row.version),
        reason: String(row.reason),
        detail: optional(row.detail),
        originalPackageId: optional(row.original_package_id),
        claimant: optional(row.claimant),
        signature: optional(row.signature),
        trusted: Number(row.trusted) === 1,
        reportedAt: String(row.reported_at),
        resolution: optional(row.resolution),
        resolvedAt: optional(row.resolved_at),
      })));
    }

    match = path.match(/^\/report\/(\d+)\/resolution$/);
    if (match && req.method === "PUT") {
      const { resolution, resolvedAt } = await req.json() as { resolution: string; resolvedAt: string };
      const row = first(sql.exec(
        "UPDATE reports SET resolution=?, resolved_at=? WHERE id=? RETURNING package_id, version",
        resolution,
        resolvedAt,
        Number(match[1]),
      ));
      if (!row) return json({ error: "report not found" }, 404);
      return json({
        id: Number(match[1]),
        packageId: String(row.package_id),
        version: row.version === null || row.version === undefined ? undefined : String(row.version),
        resolution,
        resolvedAt,
      });
    }

    if (req.method === "GET" && path === "/revocations") {
      return json(rows(sql.exec(
        "SELECT package_id, version, reason, revoked_at FROM revocations ORDER BY revoked_at DESC, package_id",
      )).map((row) => ({
        id: String(row.package_id),
        version: String(row.version),
        ...(row.reason === null || row.reason === undefined ? {} : { reason: String(row.reason) }),
        revokedAt: String(row.revoked_at),
      })));
    }

    match = path.match(/^\/revocation\/([^/]+)\/([^/]+)$/);
    if (match && req.method === "PUT") {
      const { reason, revokedAt } = await req.json() as { reason?: string; revokedAt: string };
      const id = decodeURIComponent(match[1]);
      const version = decodeURIComponent(match[2]);
      // Re-yanking keeps the original instant: hosts polling with `since` have already seen it.
      sql.exec(
        "INSERT INTO revocations(package_id,version,reason,revoked_at) VALUES(?,?,?,?) " +
        "ON CONFLICT(package_id,version) DO UPDATE SET reason=excluded.reason",
        id,
        version,
        reason ?? null,
        revokedAt,
      );
      const row = first(sql.exec("SELECT revoked_at FROM revocations WHERE package_id=? AND version=?", id, version));
      return json({ id, version, ...(reason ? { reason } : {}), revokedAt: String(row?.revoked_at) });
    }
    if (match && req.method === "DELETE") {
      const removed = rows(sql.exec(
        "DELETE FROM revocations WHERE package_id=? AND version=? RETURNING package_id",
        decodeURIComponent(match[1]),
        decodeURIComponent(match[2]),
      ));
      return json({ removed: removed.length > 0 }, removed.length > 0 ? 200 : 404);
    }

    if (req.method === "POST" && path === "/report-token") {
      const { packageId, version } = await req.json() as { packageId: string; version: string };
      const bytes = new Uint8Array(32);
      crypto.getRandomValues(bytes);
      const token = b64url(bytes);
      const now = new Date();
      // Unspent tokens are kept 30 days: long enough for any real install, short enough that a table
      // of abandoned downloads does not grow forever.
      sql.exec(
        "DELETE FROM report_tokens WHERE issued_at < ?",
        new Date(now.getTime() - 30 * 24 * 3600 * 1000).toISOString(),
      );
      sql.exec(
        "INSERT INTO report_tokens(token,package_id,version,issued_at) VALUES(?,?,?,?)",
        token,
        packageId,
        version,
        now.toISOString(),
      );
      return json({ token });
    }

    if (req.method === "POST" && path === "/installs") {
      // One Durable Object, one thread: each redeem-and-count below is atomic without a transaction.
      const { events } = await req.json() as { events: InstallEvent[] };
      let accepted = 0;
      let rejected = 0;
      const receipts: { id: string; receipt: string }[] = [];
      const now = new Date().toISOString();
      for (const event of events) {
        if (event.event === "installed") {
          // The token must exist, be unspent, and have been minted for this package: a token proves
          // *a* download happened, so it must also say which.
          const minted = event.token
            ? first(sql.exec("DELETE FROM report_tokens WHERE token=? RETURNING package_id, version", event.token))
            : undefined;
          if (!minted || String(minted.package_id) !== event.id) {
            rejected++;
            continue;
          }
          sql.exec(
            "INSERT INTO install_counts(package_id,installs,uninstalls) VALUES(?,1,0) " +
            "ON CONFLICT(package_id) DO UPDATE SET installs=installs+1",
            event.id,
          );
          const bytes = new Uint8Array(32);
          crypto.getRandomValues(bytes);
          const receipt = b64url(bytes);
          sql.exec(
            "INSERT INTO install_receipts(receipt,package_id,version,issued_at) VALUES(?,?,?,?)",
            receipt,
            event.id,
            String(minted.version),
            now,
          );
          receipts.push({ id: event.id, receipt });
          accepted++;
        } else if (event.event === "uninstalled") {
          const minted = event.receipt
            ? first(sql.exec("DELETE FROM install_receipts WHERE receipt=? RETURNING package_id", event.receipt))
            : undefined;
          if (!minted || String(minted.package_id) !== event.id) {
            rejected++;
            continue;
          }
          sql.exec("UPDATE install_counts SET uninstalls=uninstalls+1 WHERE package_id=?", event.id);
          accepted++;
        } else if (event.event === "activated" || event.event === "deactivated") {
          // Accepted and not counted: unbounded by nature, so a count would mean nothing.
          accepted++;
        } else {
          rejected++;
        }
      }
      return json({ accepted, rejected, receipts });
    }

    if (req.method === "GET" && path === "/install-counts") {
      const out: Record<string, { installs: number; uninstalls: number }> = {};
      for (const row of sql.exec("SELECT package_id, installs, uninstalls FROM install_counts")) {
        out[String(row.package_id)] = { installs: Number(row.installs), uninstalls: Number(row.uninstalls) };
      }
      return json(out);
    }

    return json({ error: "state route not found" }, 404);
  }
}

/** azphalt.org and www.azphalt.org: the docs site, served from the same assets under `/_docs`. */
const DOCS_HOST = /(^|\.)azphalt\.org$/i;
const DOCS_PREFIX = "/_docs";

/**
 * Serve the docs for a request on the docs host. Paths map 1:1 under `/_docs` (built with VitePress
 * `cleanUrls`, so `/specs/llm` resolves to `specs/llm.html`). The asset layer answers `/x.html` with a
 * redirect to `/_docs/x`; that prefix is stripped so the address bar never shows it. A miss gets the
 * docs' own 404 page, not the storefront's shell.
 */
async function serveDocs(req: Request, env: Env): Promise<Response> {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return new Response("method not allowed", { status: 405, headers: { allow: "GET, HEAD" } });
  }
  const url = new URL(req.url);
  const inner = new URL(url);
  inner.pathname = url.pathname.startsWith(DOCS_PREFIX + "/") ? url.pathname : DOCS_PREFIX + url.pathname;
  const response = await env.ASSETS.fetch(new Request(inner, req));

  const location = response.headers.get("location");
  if (response.status >= 300 && response.status < 400 && location) {
    const target = new URL(location, inner);
    if (target.origin === inner.origin && target.pathname.startsWith(DOCS_PREFIX + "/")) {
      target.pathname = target.pathname.slice(DOCS_PREFIX.length);
      const headers = new Headers(response.headers);
      headers.set("location", target.pathname + target.search + target.hash);
      return new Response(null, { status: response.status, headers });
    }
  }
  if (response.status !== 404) return response;

  const notFound = await env.ASSETS.fetch(new Request(new URL(DOCS_PREFIX + "/404", url), req));
  if (!notFound.ok) return response;
  return new Response(notFound.body, { status: 404, headers: notFound.headers });
}

/**
 * Serve a storefront file, falling back to the SPA shell for a page navigation the asset layer has
 * no file for (`/purchases`, `/app/<id>`, …). Other misses stay 404 so a broken asset link is visible.
 */
async function serveStorefront(req: Request, env: Env): Promise<Response> {
  const response = await env.ASSETS.fetch(req);
  if (response.status !== 404) return response;
  if (req.method !== "GET" && req.method !== "HEAD") return response;
  if (!(req.headers.get("accept") || "").includes("text/html")) return response;
  const shell = await env.ASSETS.fetch(new Request(new URL("/", req.url), req));
  return shell.ok ? shell : response;
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    const path = url.pathname;

    if (DOCS_HOST.test(url.hostname)) return serveDocs(req, env);

    try {
      if (req.method === "GET" && path === "/api/health") {
        return json({
          ok: true,
          backend: "cloudflare-worker",
          storage: "durable-object-sqlite",
          billingModel: "free-tier-hard-stop",
        });
      }

      if (req.method === "GET" && path === "/api/packages") return apiPackages(req, env);
      if (req.method === "POST" && path === "/api/checkout") return checkout(req, env);
      if (req.method === "POST" && path === "/api/webhooks/stripe") return webhook(req, env);
      if (req.method === "GET" && path === "/api/purchases") return purchases(req, env);
      if (req.method === "POST" && path === "/api/connect/onboard") return connectOnboard(req, env);
      if (req.method === "GET" && path === "/api/connect/status") return connectStatus(req, env);
      if (req.method === "POST" && path === "/api/ratings") return rate(req, env);
      if (path === "/reports" || path === "/api/reports") {
        if (req.method === "POST") return fileReport(req, env);
        if (req.method === "GET") return listReports(req, env);
      }

      if (req.method === "GET" && path === "/packages") return repositoryPackages(req, env);
      if (req.method === "POST" && path === "/packages") return publishPackage(req, env);
      if (req.method === "GET" && path === "/revocations") return revocationFeed(req, env);
      if (req.method === "POST" && path === "/installs") return reportInstalls(req, env);
      if (req.method === "POST" && path === "/entitlements/play") return playEntitlement(req, env);
      if (req.method === "POST" && path === "/api/admin/revocations") return adminRevoke(req, env);

      let match = path.match(/^\/packages\/([^/]+)$/);
      if (match && req.method === "GET") {
        return repositoryDetail(req, env, decodeURIComponent(match[1]));
      }

      match = path.match(/^\/api\/checkout\/session\/([^/]+)$/);
      if (match && req.method === "GET") {
        return sessionResult(req, env, decodeURIComponent(match[1]));
      }

      match = path.match(/^\/api\/admin\/revocations\/([^/]+)\/([^/]+)$/);
      if (match && req.method === "DELETE") {
        return adminUnrevoke(req, env, decodeURIComponent(match[1]), decodeURIComponent(match[2]));
      }

      match = path.match(/^\/(?:api\/)?reports\/(\d+)\/resolve$/);
      if (match && req.method === "POST") return resolveReport(req, env, match[1]);

      match = path.match(/^\/api\/admin\/packages\/([^/]+)\/([^/]+)$/);
      if (match && req.method === "PUT") {
        return adminUpload(
          req,
          env,
          decodeURIComponent(match[1]),
          decodeURIComponent(match[2]),
        );
      }

      match = path.match(/^\/packages\/([^/]+)\/versions\/([^/]+)\/download$/);
      if (match && req.method === "GET") {
        return download(
          req,
          env,
          decodeURIComponent(match[1]),
          decodeURIComponent(match[2]),
        );
      }

      match = path.match(/^\/api\/download\/([^/]+)$/);
      if (match && req.method === "GET") {
        const id = decodeURIComponent(match[1]);
        const [catalog, listings] = await Promise.all([getCatalog(req, env), getListings(req, env)]);
        const publicPkg = catalog.find((p) => p.id === id);
        const listing = activeListing(listings, id);
        const version = publicPkg?.version || listing?.package.version;
        if (!version) return json({ error: "package not found" }, 404);
        return download(req, env, id, version);
      }

      if (
        req.method === "GET" &&
        (path === "/.well-known/azphalt.json" || path === "/.well-known/azphalt-repository.json")
      ) {
        const publicKey = (await runtimeSecrets(env)).entitlementPublicKeySpkiB64;
        return json({
          name: "Azphalt",
          version: "0.1",
          repository: env.PUBLIC_ORIGIN,
          baseUrl: env.PUBLIC_ORIGIN,
          signingKeys: [{
            keyId: "store-v1",
            algorithm: "ed25519",
            publicKey,
          }],
        });
      }

      return serveStorefront(req, env);
    } catch (error) {
      console.error("worker request failed", error);
      return json({ error: "internal error" }, 500);
    }
  },
};
