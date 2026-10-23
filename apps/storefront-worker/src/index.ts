import { MAX_PUBLISH_BYTES, publish, type RepositoryTokens } from "./publish";
import { compareSemver } from "./semver";
import { parseServiceAccount, PlayUnavailableError, verifyPlayPurchase, verifyPlaySubscription } from "./play";

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
  /**
   * Public half (base64 SPKI) of the ed25519 key `build-catalog` signs every catalog package with
   * (`AZPHALT_PACKAGE_SIGNING_KEY`). Published in `signingKeys` so a host trusts those packages
   * directly (spec/package-format.md § Trust model) instead of flagging an unknown signer.
   */
  PACKAGE_SIGNING_PUBLIC_KEY_SPKI_B64?: string;
  BUYER_SESSION_SECRET?: string;
  ADMIN_TOKEN?: string;
  /**
   * Optional key material for seller invite codes. Unset, invites are keyed by an HKDF derivation of
   * `ADMIN_TOKEN` under a distinct label, so a code never exposes a MAC made directly with the token.
   */
  CONNECT_INVITE_SECRET?: string;
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
  /**
   * `sha256-<hex>` of the exact file bytes served (`scripts/export-catalog.mjs`). Not `integrity`, which
   * is the digest of the *unsigned* container and so never matches a signed file.
   */
  fileDigest?: string;
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

/** HMAC-SHA256 with raw key bytes. */
async function hmacKeyBytes(key: Uint8Array<ArrayBuffer>, message: string): Promise<Uint8Array> {
  const k = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", k, enc.encode(message)));
}

/** HKDF-SHA256(ikm, salt "azphalt", info label) → 32 bytes: a sub-key that is independent per label. */
async function hkdf(ikm: string, label: string): Promise<Uint8Array<ArrayBuffer>> {
  const key = await crypto.subtle.importKey("raw", enc.encode(ikm), "HKDF", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "HKDF", hash: "SHA-256", salt: enc.encode("azphalt"), info: enc.encode(label) },
    key,
    256,
  );
  return new Uint8Array(bits);
}

/**
 * Read a body stream into memory, giving up as soon as it passes [max] bytes. Content-Length is only a
 * fast path for an honest client: a chunked or header-less body is counted as it arrives, so nothing
 * larger than the cap is ever buffered. `undefined` means "too large".
 */
async function readCappedStream(
  body: ReadableStream<Uint8Array> | null,
  declaredLength: string | null,
  max: number,
): Promise<Uint8Array<ArrayBuffer> | undefined> {
  if (declaredLength !== null && Number(declaredLength) > max) return undefined;
  if (!body) return new Uint8Array(0);
  const reader = body.getReader();
  const parts: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > max) {
      await reader.cancel().catch(() => undefined);
      return undefined;
    }
    parts.push(value);
  }
  const out = new Uint8Array(total);
  let at = 0;
  for (const part of parts) {
    out.set(part, at);
    at += part.byteLength;
  }
  return out;
}

function readCapped(req: Request, max: number): Promise<Uint8Array<ArrayBuffer> | undefined> {
  return readCappedStream(req.body, req.headers.get("content-length"), max);
}

/** Parse a capped JSON body: `"too-large"`, `undefined` for invalid JSON, or the value. */
async function readCappedJson(req: Request, max: number): Promise<unknown | "too-large"> {
  const bytes = await readCapped(req, max);
  if (!bytes) return "too-large";
  try {
    return JSON.parse(dec.decode(bytes));
  } catch {
    return undefined;
  }
}

/** The default cap for a small JSON request body. */
const MAX_JSON_BODY = 64 * 1024;

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

/** Store a seller only if none is stored yet; returns whichever row is stored afterwards. */
async function insertSeller(env: Env, record: SellerAccount): Promise<SellerAccount> {
  return stateJson<SellerAccount>(env, "/seller/" + encodeURIComponent(record.sellerId) + "?ifAbsent=1", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(record),
  });
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

/**
 * Whether a listing is open for NEW sales. A listing with no `status` is treated as paused: going live
 * has to be a deliberate `"active"`, never the accident of a missing field.
 */
function isActive(listing: Listing): boolean {
  return (listing.status ?? "paused") === "active";
}

function activeListing(listings: Listing[], id: string): Listing | undefined {
  return listings.find((l) => l.packageId === id && isActive(l));
}

/**
 * The listing a paid download is served under, whatever its status. Pausing a listing stops new
 * checkouts; it must never take a package away from buyers who already paid for it.
 */
function anyListing(listings: Listing[], id: string): Listing | undefined {
  return listings.find((l) => l.packageId === id);
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
      isActive(listing) &&
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
    // Kept for the logs only: Stripe's text can name accounts (`acct_…`) and is never sent to a client.
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

async function readJson(req: Request, max = MAX_JSON_BODY): Promise<Record<string, unknown> | undefined> {
  const body = await readCappedJson(req, max);
  return body && body !== "too-large" && typeof body === "object" && !Array.isArray(body)
    ? body as Record<string, unknown>
    : undefined;
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
  // A paused listing's existing owners can still rate it; only the rater's ownership matters.
  const paid = !free && !!anyListing(listings, packageId);
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
  if (!catalog.some((pkg) => pkg.id === packageId) && !anyListing(listings, packageId)) {
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
  const bytes = await readCapped(req, MAX_PUBLISH_BYTES);
  if (!bytes) return fail(413, "payload_too_large", `package exceeds ${MAX_PUBLISH_BYTES} bytes`);
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
  return catalog.find((pkg) => pkg.id === id)?.version ?? anyListing(listings, id)?.package.version;
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

  // For a yank, work out the version and write the revocation FIRST, and only then mark the report
  // resolved. The other order left a report showing "yanked" (with its buttons hidden) while the
  // package stayed downloadable whenever the version could not be determined.
  let revocation: Revocation | undefined;
  if (action === "yank") {
    const reports = await stateJson<{ id: number; reason: string; packageId: string; version?: string }[]>(env, "/reports");
    const target = reports.find((r) => String(r.id) === reportId);
    if (!target) return json({ error: "report not found" }, 404);
    const version = target.version || await servedVersion(req, env, target.packageId);
    if (!version) return json({ error: "the reported package is no longer served" }, 409);
    revocation = await yank(env, target.packageId, version, reasonOverride || target.reason);
  }

  const res = await state(env).fetch(new Request("https://state.internal/report/" + reportId + "/resolution", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ resolution: action === "yank" ? "yanked" : "dismissed", resolvedAt: new Date().toISOString() }),
  }));
  if (res.status === 404) return json({ error: "report not found" }, 404);
  const report = await res.json() as { packageId: string; version?: string };
  return json(revocation ? { report, revocation } : { report });
}

const MAX_UPDATES_BODY = 1024 * 1024;
const MAX_UPDATES_ENTRIES = 5000;

/**
 * `POST /updates` — batch update check (repository-api.md § 6). The body is the host's installed
 * `{ id, version }[]`; the answer lists only ids whose served version is strictly newer. Current,
 * ahead, unknown and yanked-out ids are omitted. Read-only despite the verb.
 */
async function batchUpdates(req: Request, env: Env): Promise<Response> {
  const parsed = await readCappedJson(req, MAX_UPDATES_BODY);
  if (parsed === "too-large") return REPO_ERROR(413, "payload_too_large", "an update check body is at most 1 MB");
  if (parsed === undefined) {
    return REPO_ERROR(400, "bad_request", "invalid JSON body: expected an array of { id, version }");
  }
  if (!Array.isArray(parsed)) return REPO_ERROR(400, "bad_request", "body must be a JSON array of { id, version }");
  if (parsed.length > MAX_UPDATES_ENTRIES) {
    return REPO_ERROR(413, "payload_too_large", `at most ${MAX_UPDATES_ENTRIES} entries per request`);
  }
  for (const item of parsed) {
    const rec = item as Record<string, unknown> | null;
    if (!rec || typeof rec !== "object" || typeof rec.id !== "string" || typeof rec.version !== "string") {
      return REPO_ERROR(400, "bad_request", "each entry must be an object with string `id` and `version`");
    }
  }
  const [catalog, listings, revoked] = await Promise.all([getCatalog(req, env), getListings(req, env), revocations(env)]);
  const yanked = new Set(revoked.map((r) => r.id + "@" + r.version));
  const served = new Map<string, string>();
  for (const pkg of marketplaceCatalog(catalog, listings)) {
    if (!yanked.has(pkg.id + "@" + pkg.version)) served.set(pkg.id, pkg.version);
  }
  const updates: { id: string; latest: string }[] = [];
  for (const { id, version } of parsed as { id: string; version: string }[]) {
    const latest = served.get(id);
    if (latest && compareSemver(latest, version) > 0) updates.push({ id, latest });
  }
  return json({ updates });
}

const INSTALL_EVENTS = ["installed", "uninstalled", "activated", "deactivated"];
const MAX_INSTALL_BODY = 256 * 1024;

/** `POST /installs` — install/uninstall transitions against report tokens (repository-api.md § 8). */
async function reportInstalls(req: Request, env: Env): Promise<Response> {
  const raw = await readCappedJson(req, MAX_INSTALL_BODY);
  if (raw === "too-large") return REPO_ERROR(413, "payload_too_large", "at most 200 events per request");
  const body = raw && typeof raw === "object" && !Array.isArray(raw) ? raw as Record<string, unknown> : undefined;
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
  // Every call can cost a Google token exchange and a Play API call, so it shares the write limiter.
  if (!(await allowWrite(req, env))) return REPO_ERROR(429, "rate_limited", "too many requests");
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
  // The product must be the one this package is sold as; otherwise any cheap product would unlock it.
  // The store app derives the product id from the package id the same way (lowercase, anything outside
  // [a-z0-9_.] becomes "_" — Play SKUs allow nothing else), so a package id with "-" or capitals is
  // still purchasable without every listing needing an explicit `playProductId`.
  if (productId !== (listing.playProductId || playSkuFor(packageId))) {
    return REPO_ERROR(402, "payment_required", "that product does not entitle this package");
  }

  let grant: Awaited<ReturnType<typeof verifyPlayPurchase>>;
  try {
    // A subscription listing is sold as a Play subscription product, and is checked (and expires) as one.
    const verify = listing.interval ? verifyPlaySubscription : verifyPlayPurchase;
    grant = await verify({ packageName: env.PLAY_PACKAGE_NAME, serviceAccount }, productId, purchaseToken);
  } catch (e) {
    // Not the buyer's fault and not a refusal: the store app retries instead of saying they did not pay.
    const message = e instanceof PlayUnavailableError ? e.message : "verification failed";
    return REPO_ERROR(502, "bad_gateway", "could not verify the purchase with Google: " + message);
  }
  if (!grant) return REPO_ERROR(402, "payment_required", "that purchase does not entitle this package");

  const token = await issueEntitlement(env, {
    packageId,
    subject: grant.subject,
    kind: grant.expiresAt ? "subscription" : "perpetual",
    issuedAt: new Date().toISOString(),
    ...(grant.expiresAt ? { expiresAt: grant.expiresAt } : {}),
  });
  // Acknowledge only now that the licence exists: if issuing had failed, the purchase would stay
  // unacknowledged and Play would refund it after three days instead of the buyer paying for nothing.
  await grant.acknowledge?.();
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
  // Each checkout makes two Stripe calls and writes a session row, so it is throttled like any write.
  if (!(await allowWrite(req, env))) return json({ error: "too many requests" }, 429);

  const body = await readJson(req);
  if (!body) return json({ error: "invalid JSON body" }, 400);

  const packageId = typeof body.packageId === "string" ? body.packageId.trim() : "";
  if (!PACKAGE_ID.test(packageId)) return json({ error: "packageId is required" }, 400);
  // Optional: prefills Checkout's email field. Checkout always collects one, and the buyer's receipt
  // and any licence recovery (README § Recovering a purchase) go through it.
  const email = typeof body.email === "string" && /^[^\s@]{1,64}@[^\s@]{1,190}$/.test(body.email.trim())
    ? body.email.trim()
    : undefined;

  const [catalog, listings] = await Promise.all([getCatalog(req, env), getListings(req, env)]);
  const known = anyListing(listings, packageId);
  if (known && !isActive(known)) return json({ error: "this package is not on sale right now" }, 409);
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
  // The account in the reviewed listing (git) outranks a runtime-stored one, so a stored mapping can
  // never silently redirect payouts away from what a maintainer reviewed and merged.
  const destination = listing.stripeAccountId || knownSeller?.accountId;
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
    customer_email: email,
  };

  if (listing.interval) {
    fields.mode = "subscription";
    fields["line_items[0][price_data][recurring][interval]"] = listing.interval;
    fields["subscription_data[application_fee_percent]"] = ((applicationFee / listing.amountCents) * 100).toFixed(2);
    fields["subscription_data[transfer_data][destination]"] = destination;
  } else {
    fields.mode = "payment";
    // A Customer (with the email Checkout collects) makes the purchase findable in the dashboard by
    // email, which is how a buyer who lost the cookie and the success link gets their licence back.
    // Subscription mode always creates one.
    fields.customer_creation = "always";
    fields["payment_intent_data[application_fee_amount]"] = String(applicationFee);
    fields["payment_intent_data[transfer_data][destination]"] = destination;
  }

  try {
    const session = await stripe(env, "/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        // Stripe rejects a repeat of a key whose parameters changed (HTTP 400 "keys must be unique to the
        // request"). The key therefore has to cover everything that shapes the session — payout
        // destination, fee and currency too — or a seller's account change or a fee-rate change would
        // make every retry by the same buyer fail for 24 hours.
        "idempotency-key": await idempotencyKey(["azp", packageId, buyerId, listing.amountCents, listing.currency, applicationFee, destination, listing.interval ?? "", email ?? ""]),
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
    // Stripe's message stays in the log: it can name the seller's account, which clients never see.
    console.error("checkout failed", error);
    return json({ error: "checkout failed; please try again" }, 502);
  }
}

/** How long an invite code stays valid after it is minted. */
const INVITE_TTL_MS = 7 * 24 * 3600 * 1000;

/**
 * The invite code that lets one seller onboard themselves: `<issuedAt base36>.<mac>`, where mac is
 * `HMAC-SHA256(K, "connect-invite:v2:" + sellerId + ":" + issuedAt)` and K is `CONNECT_INVITE_SECRET`
 * or, unset, `HKDF(ADMIN_TOKEN, info "azphalt connect-invite v2")`. Bound to one sellerId, expires
 * after {@link INVITE_TTL_MS}, and never a MAC keyed by the admin token itself. Rotating either secret
 * revokes every outstanding code.
 */
async function connectInvite(env: Env, sellerId: string, issuedAt = Date.now()): Promise<string> {
  const key = await hkdf(env.CONNECT_INVITE_SECRET || env.ADMIN_TOKEN || "", "azphalt connect-invite v2");
  const stamp = Math.floor(issuedAt / 1000).toString(36);
  return stamp + "." + b64url(await hmacKeyBytes(key, "connect-invite:v2:" + sellerId + ":" + stamp));
}

async function validInvite(env: Env, sellerId: string, code: string): Promise<boolean> {
  if (!env.ADMIN_TOKEN && !env.CONNECT_INVITE_SECRET) return false;
  const dot = code.indexOf(".");
  if (dot < 1) return false;
  const issuedAt = parseInt(code.slice(0, dot), 36) * 1000;
  if (!Number.isFinite(issuedAt)) return false;
  const age = Date.now() - issuedAt;
  if (age < -60_000 || age > INVITE_TTL_MS) return false;
  return timingSafeEqual(code, await connectInvite(env, sellerId, issuedAt));
}

/** `POST /api/admin/connect/invite` `{ sellerId }` — mint the code to hand to that seller. Bearer `ADMIN_TOKEN`. */
async function adminConnectInvite(req: Request, env: Env): Promise<Response> {
  if (!adminAuthorized(req, env)) return json({ error: "unauthorized" }, 401);
  const body = await readJson(req);
  const sellerId = typeof body?.sellerId === "string" ? body.sellerId.trim() : "";
  if (!sellerId || sellerId.length > 128) return json({ error: "sellerId is required" }, 400);
  const issuedAt = Date.now();
  return json({
    sellerId,
    inviteCode: await connectInvite(env, sellerId, issuedAt),
    expiresAt: new Date(issuedAt - issuedAt % 1000 + INVITE_TTL_MS).toISOString(),
  });
}

/** A short, stable Stripe idempotency key derived from every parameter that shapes the request. */
async function idempotencyKey(parts: (string | number)[]): Promise<string> {
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(parts.join("\u0000"))));
  return "azp_" + Array.from(digest).map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 40);
}

/** The Play SKU a package id is sold under when its listing sets no `playProductId`. Mirrors the store app. */
function playSkuFor(packageId: string): string {
  return packageId.toLowerCase().replace(/[^a-z0-9_.]/g, "_");
}

async function connectOnboard(req: Request, env: Env): Promise<Response> {
  if (!env.STRIPE_SECRET_KEY) return json({ error: "Stripe Connect onboarding is not configured" }, 404);
  if (!(await allowWrite(req, env))) return json({ error: "too many requests" }, 429);

  let body: { sellerId?: unknown; email?: unknown; country?: unknown; inviteCode?: unknown };
  try {
    body = await req.json() as { sellerId?: unknown; email?: unknown; country?: unknown; inviteCode?: unknown };
  } catch {
    return json({ error: "invalid JSON body" }, 400);
  }

  const sellerId = typeof body.sellerId === "string" ? body.sellerId.trim() : "";
  if (!sellerId || sellerId.length > 128) return json({ error: "sellerId is required" }, 400);
  // Binding a Stripe account to a sellerId decides who gets paid, and sellerIds are public in
  // listings.json. So it needs authority over THAT id: the operator's token, or the invite code the
  // operator issued for it. Without this, anyone could onboard their own bank account against someone
  // else's id before the real seller does.
  const invited =
    typeof body.inviteCode === "string" && await validInvite(env, sellerId, body.inviteCode);
  if (!adminAuthorized(req, env) && !invited) return json({ error: "an invite code from the operator is required" }, 401);
  const email = typeof body.email === "string" && body.email.trim() ? body.email.trim() : undefined;
  const country = typeof body.country === "string" && body.country.trim() ? body.country.trim().toUpperCase() : undefined;

  try {
    let seller = await storedSeller(env, sellerId);
    // A reviewed listing that pins a payout account decides where this seller is paid. Onboarding may
    // only ever continue THAT account; anything else (a fresh account, or a different stored one) is
    // refused, and the operator binds the pinned account with `PUT /api/admin/connect/sellers/{id}`.
    const pinned = pinnedAccounts(await getListings(req, env), sellerId);
    if (pinned.size > 1) return json({ error: "this seller's listings pin more than one payout account" }, 409);
    const pin = [...pinned][0];
    if (pin && seller?.accountId !== pin) {
      return json({ error: "this seller's listings pin a payout account; the operator must bind it" }, 409);
    }
    if (!seller) {
      // Two onboard calls at once must not create two Stripe accounts. The claim is taken atomically
      // in the Durable Object; whoever loses it is told to retry, and the stored row is insert-only.
      const claim = await state(env).fetch(new Request(
        "https://state.internal/seller-claim/" + encodeURIComponent(sellerId),
        { method: "POST" },
      ));
      if (claim.status === 409) return json({ error: "onboarding for this seller is already in progress; retry shortly" }, 409);
      if (!claim.ok) throw new Error("seller claim failed");
      const { claimedAt } = await claim.json() as { claimedAt: string };
      try {
        seller = await storedSeller(env, sellerId);
        if (!seller) {
          const account = await stripe(env, "/v1/accounts", {
            method: "POST",
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              // A network retry of this same attempt reuses the account rather than making another.
              "idempotency-key": await idempotencyKey(["azp-connect", sellerId, claimedAt]),
            },
            body: urlForm({
              type: "express",
              "capabilities[transfers][requested]": "true",
              "capabilities[card_payments][requested]": "true",
              email,
              country,
            }),
          });
          seller = await insertSeller(env, sellerFromStripe(sellerId, account));
        }
      } finally {
        await state(env).fetch(new Request(
          "https://state.internal/seller-claim/" + encodeURIComponent(sellerId),
          { method: "DELETE" },
        ));
      }
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
    console.error("onboarding failed", error);
    return json({ error: "onboarding failed; please try again" }, 502);
  }
}

/** The `stripeAccountId`s this seller's reviewed listings pin. */
function pinnedAccounts(listings: Listing[], sellerId: string): Set<string> {
  return new Set(
    listings
      .filter((l) => l.sellerId === sellerId && typeof l.stripeAccountId === "string" && l.stripeAccountId)
      .map((l) => l.stripeAccountId as string),
  );
}

/**
 * `PUT /api/admin/connect/sellers/{sellerId}` `{ accountId }` — bind (or rebind) a seller to a Stripe
 * account, e.g. after onboarding the wrong one. `DELETE` the same path unbinds it, so the seller can
 * onboard afresh. A rebind that contradicts an account the seller's listings pin is refused: the
 * listing is what a maintainer reviewed. Bearer `ADMIN_TOKEN`.
 */
async function adminBindSeller(req: Request, env: Env, sellerId: string): Promise<Response> {
  if (!adminAuthorized(req, env)) return json({ error: "unauthorized" }, 401);
  if (!sellerId || sellerId.length > 128) return json({ error: "sellerId is required" }, 400);
  if (req.method === "DELETE") {
    const res = await state(env).fetch(new Request(
      "https://state.internal/seller/" + encodeURIComponent(sellerId),
      { method: "DELETE" },
    ));
    return res.ok ? new Response(null, { status: 204 }) : json({ error: "seller not bound" }, 404);
  }
  const body = await readJson(req);
  const accountId = typeof body?.accountId === "string" ? body.accountId.trim() : "";
  if (!/^acct_[A-Za-z0-9]{1,64}$/.test(accountId)) return json({ error: "accountId must be a Stripe acct_ id" }, 400);
  const pinned = pinnedAccounts(await getListings(req, env), sellerId);
  if (pinned.size > 0 && !(pinned.size === 1 && pinned.has(accountId))) {
    return json({ error: "this seller's listings pin a different payout account" }, 409);
  }
  if (!env.STRIPE_SECRET_KEY) return json({ error: "Stripe is not configured" }, 503);
  let account: Record<string, unknown>;
  try {
    account = await stripe(env, "/v1/accounts/" + encodeURIComponent(accountId), { method: "GET" });
  } catch (error) {
    console.error("seller bind failed", error);
    return json({ error: "could not read that account from Stripe" }, 502);
  }
  const seller = await storeSeller(env, sellerFromStripe(sellerId, account));
  return json({ seller });
}

async function connectStatus(req: Request, env: Env): Promise<Response> {
  const url = new URL(req.url);
  const sellerId = (url.searchParams.get("sellerId") || "").trim();
  if (!sellerId) return json({ error: "sellerId is required" }, 400);

  try {
    let seller = await storedSeller(env, sellerId);
    if (!seller) return json({ onboarded: false });
    const admin = adminAuthorized(req, env);
    // `refresh` makes the Worker call Stripe, so it is operator-only (it was an anonymous amplifier).
    if (admin && url.searchParams.get("refresh") === "1") {
      seller = await refreshSeller(env, sellerId, seller.accountId);
    }
    return json({
      onboarded: true,
      // The Stripe account id is only for the operator; the public needs readiness, not identity.
      ...(admin ? { accountId: seller.accountId } : {}),
      chargesEnabled: seller.chargesEnabled,
      payoutsEnabled: seller.payoutsEnabled,
      detailsSubmitted: seller.detailsSubmitted,
    });
  } catch (error) {
    console.error("seller status failed", error);
    return json({ error: "seller status failed" }, 502);
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
  let ok = false;
  // Every candidate is compared in constant time, and all of them are compared.
  for (const candidate of parsed.signatures) if (timingSafeEqual(candidate, want)) ok = true;
  return ok;
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
    if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
      // A completed session whose payment is still processing (`unpaid`) must not be fulfilled yet;
      // `async_payment_succeeded` re-delivers it once the funds settle.
      const paid = object.payment_status === "paid" || object.payment_status === "no_payment_required";
      if (!paid) return json({ received: true, fulfilled: false });
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
      await recordPaymentRefs(env, sessionId, object);

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
      await recordPaymentRefs(env, "invoice:" + invoiceId, { invoice: invoiceId, payment_intent: object.payment_intent });
      return json({ received: true, renewed: true });
    }

    // A refund or a chargeback takes away THAT purchase's licence — one entitlement, never the version
    // every other buyer paid for. A partial refund is a goodwill gesture and keeps the licence.
    if (event.type === "charge.refunded") {
      if (object.refunded !== true) return json({ received: true, revoked: false });
      const sessionId = await sessionForPayment(env, {
        paymentIntent: objectId(object.payment_intent),
        invoice: objectId(object.invoice),
        charge: objectId(object.id),
      });
      const revoked = sessionId ? await revokeEntitlement(env, sessionId, "refund") : false;
      return json({ received: true, revoked });
    }

    if (event.type === "charge.dispute.created" || event.type === "charge.dispute.closed") {
      const sessionId = await sessionForPayment(env, {
        paymentIntent: objectId(object.payment_intent),
        charge: objectId(object.charge),
      });
      if (!sessionId) return json({ received: true, revoked: false });
      if (event.type === "charge.dispute.created") {
        return json({ received: true, revoked: await revokeEntitlement(env, sessionId, "dispute") });
      }
      // Won: the money came back, so the licence does too (a refund-based revocation is left alone).
      if (object.status === "won") {
        const res = await state(env).fetch(new Request(
          "https://state.internal/entitlement-revocation/" + encodeURIComponent(sessionId) + "?reason=dispute",
          { method: "DELETE" },
        ));
        return json({ received: true, restored: res.ok });
      }
      return json({ received: true, restored: false });
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

/** Remember which Stripe payment objects paid for an entitlement, so a refund or dispute can find it. */
async function recordPaymentRefs(env: Env, sessionId: string, object: Record<string, unknown>): Promise<void> {
  const refs = [
    ["pi", objectId(object.payment_intent)],
    ["in", objectId(object.invoice)],
  ].filter((pair): pair is [string, string] => typeof pair[1] === "string" && pair[1].length > 0);
  for (const [kind, id] of refs) {
    await stateJson(env, "/payment-ref/" + encodeURIComponent(kind + ":" + id), {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sessionId }),
    });
  }
}

/**
 * The entitlement (session id) a charge paid for: from the refs recorded at fulfilment, then a renewal
 * invoice's own entitlement, and last — for purchases fulfilled before refs were recorded — Stripe's
 * own lookup of the Checkout Session by payment intent.
 */
async function sessionForPayment(
  env: Env,
  refs: { paymentIntent?: string; invoice?: string; charge?: string },
): Promise<string | undefined> {
  const candidates = [
    refs.paymentIntent && "pi:" + refs.paymentIntent,
    refs.invoice && "in:" + refs.invoice,
  ].filter((x): x is string => !!x);
  for (const ref of candidates) {
    const res = await state(env).fetch(new Request("https://state.internal/payment-ref/" + encodeURIComponent(ref)));
    if (res.ok) return ((await res.json()) as { sessionId: string }).sessionId;
  }
  if (refs.invoice) {
    const renewal = await state(env).fetch(
      new Request("https://state.internal/entitlement/" + encodeURIComponent("invoice:" + refs.invoice)),
    );
    if (renewal.ok) return "invoice:" + refs.invoice;
  }
  if (refs.paymentIntent && env.STRIPE_SECRET_KEY) {
    try {
      const list = await stripe(
        env,
        "/v1/checkout/sessions?limit=1&payment_intent=" + encodeURIComponent(refs.paymentIntent),
        { method: "GET" },
      );
      const data = Array.isArray(list.data) ? list.data as Record<string, unknown>[] : [];
      if (typeof data[0]?.id === "string") return data[0].id;
    } catch (error) {
      console.error("checkout session lookup failed", error);
    }
  }
  return undefined;
}

/** Revoke one entitlement. False when there is no such entitlement. */
async function revokeEntitlement(env: Env, sessionId: string, reason: "refund" | "dispute"): Promise<boolean> {
  const res = await state(env).fetch(new Request(
    "https://state.internal/entitlement-revocation/" + encodeURIComponent(sessionId),
    {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ reason, revokedAt: new Date().toISOString() }),
    },
  ));
  return res.ok;
}

async function tokenRevoked(env: Env, token: EntitlementToken): Promise<boolean> {
  const { revoked } = await stateJson<{ revoked: boolean }>(
    env,
    "/token-revoked?signature=" + encodeURIComponent(token.signature),
  );
  return revoked;
}

async function entitlementRevoked(env: Env, sessionId: string): Promise<boolean> {
  const res = await state(env).fetch(new Request(
    "https://state.internal/entitlement-revocation/" + encodeURIComponent(sessionId),
  ));
  return res.ok;
}

/**
 * `GET /api/admin/entitlements/{sessionId}` — recover a buyer's licence. A buyer who lost both the
 * cookie and the success link is found in the Stripe dashboard by the email Checkout collected; the
 * Checkout Session id there returns their token here, to send back to them. Bearer `ADMIN_TOKEN`.
 */
async function adminEntitlement(req: Request, env: Env, sessionId: string): Promise<Response> {
  if (!adminAuthorized(req, env)) return json({ error: "unauthorized" }, 401);
  const res = await state(env).fetch(new Request("https://state.internal/entitlement/" + encodeURIComponent(sessionId)));
  if (!res.ok) return json({ error: "no entitlement for that session" }, 404);
  const record = await res.json() as EntitlementRecord;
  return json({
    sessionId: record.sessionId,
    packageId: record.packageId,
    issuedAt: record.issuedAt,
    revoked: await entitlementRevoked(env, sessionId),
    token: encodeToken(record.token),
  });
}

async function sessionResult(req: Request, env: Env, id: string): Promise<Response> {
  if (await entitlementRevoked(env, id)) {
    return json({ status: "revoked", error: "this purchase was refunded or disputed" }, 403);
  }
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
  // `status === "complete"` only means the buyer finished the form; a delayed-notification method
  // (bank debit) is complete but still `unpaid`. Fulfil only on settled funds.
  void status;
  if (paymentStatus !== "paid" && paymentStatus !== "no_payment_required") {
    return json({ status: "pending" }, 202);
  }

  const record = await entitlementFor(
    env,
    id,
    session.packageId,
    session.buyerId,
    session.interval,
  );
  await recordPaymentRefs(env, id, remote);

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

/** Constant-time string compare (no early exit on the first differing byte, length folded in). */
function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  const n = Math.max(x.length, y.length);
  for (let i = 0; i < n; i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

function adminAuthorized(req: Request, env: Env): boolean {
  if (!env.ADMIN_TOKEN) return false;
  return timingSafeEqual(req.headers.get("authorization") ?? "", "Bearer " + env.ADMIN_TOKEN);
}

const MAX_PROTECTED_BYTES = 100_000_000;

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

  const body = await readCapped(req, MAX_PROTECTED_BYTES);
  if (!body) return json({ error: "package exceeds the free-plan 100 MB request limit" }, 413);
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
async function withReportToken(req: Request, env: Env, res: Response, id: string, version: string): Promise<Response> {
  if (res.status !== 200) return res;
  // Each token is a Durable Object write. Past the write limit the download still goes through; it just
  // carries no token, so that install is not counted.
  if (!(await allowWrite(req, env))) return res;
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
    // The catalog was exported at deploy time, but these bytes come from the git branch, which moves the
    // moment a PR merges. If the store's file is not the size the catalog recorded, the two are out of
    // step (or the file was swapped) — refuse rather than hand out bytes the catalog never described.
    // (`integrity` is the digest of the UNSIGNED container and cannot be checked against signed bytes;
    // `fileDigest`, the digest of the served file, is checked below for a full download.)
    if (typeof publicPkg.bytes === "number") {
      const total =
        upstream.status === 206
          ? Number(/\/(\d+)\s*$/.exec(upstream.headers.get("content-range") || "")?.[1])
          : Number(upstream.headers.get("content-length"));
      if (Number.isFinite(total) && total !== publicPkg.bytes) {
        return json({ error: { code: "bad_gateway", message: "the package store and the catalog disagree about " + id + "@" + version } }, 502);
      }
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
    let served: BodyInit | null = upstream.body;
    // A full download is checked byte-for-byte against the digest the catalog recorded for this file, so
    // a same-size swap on the moving branch is refused rather than served as the catalogued package.
    if (upstream.status === 200 && typeof publicPkg.fileDigest === "string" && /^sha256-[0-9a-f]{64}$/.test(publicPkg.fileDigest)) {
      const cap = typeof publicPkg.bytes === "number" ? publicPkg.bytes : MAX_PUBLISH_BYTES * 4;
      const bytes = await readCappedStream(upstream.body, upstream.headers.get("content-length"), cap);
      if (!bytes || (await sha256Integrity(bytes)) !== publicPkg.fileDigest) {
        return json({ error: { code: "bad_gateway", message: "the package store and the catalog disagree about " + id + "@" + version } }, 502);
      }
      served = bytes;
      out.set("content-length", String(bytes.byteLength));
    }
    return withReportToken(req, env, new Response(served, { status: upstream.status, headers: out }), id, version);
  }

  // Any listing, paused or not: pausing stops new checkouts, never an owner's downloads.
  const listing = anyListing(listings, id);
  if (!listing || listing.package.version !== version) {
    return json({ error: "package version not found" }, 404);
  }

  const auth = req.headers.get("authorization") || "";
  if (!auth.startsWith("Bearer ")) return json({ error: "paid package requires an entitlement" }, 401);
  const token = decodeToken(auth.slice(7).trim());
  if (!token || !(await verifyEntitlement(env, token, id))) {
    return json({ error: "invalid or expired entitlement" }, 401);
  }
  if (await tokenRevoked(env, token)) {
    return json({ error: "this entitlement was revoked after a refund or dispute" }, 403);
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
  return withReportToken(req, env, new Response(stored.body, { status: stored.status, headers: out }), id, version);
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
      // Per-purchase revocations (refund, chargeback). Keyed by the entitlement's session id; the token
      // signature is what a download presents, so it is indexed too.
      sql.exec(
        "CREATE TABLE IF NOT EXISTS entitlement_revocations (" +
        "session_id TEXT PRIMARY KEY, signature TEXT NOT NULL, reason TEXT NOT NULL, revoked_at TEXT NOT NULL)"
      );
      sql.exec(
        "CREATE INDEX IF NOT EXISTS entitlement_revocations_sig_idx ON entitlement_revocations(signature)"
      );
      // Stripe payment objects (`pi:<payment_intent>`, `in:<invoice>`) → the entitlement they paid for.
      sql.exec(
        "CREATE TABLE IF NOT EXISTS payment_refs (ref TEXT PRIMARY KEY, session_id TEXT NOT NULL)"
      );
      // An in-flight onboarding, so two at once cannot create two Stripe accounts for one seller.
      sql.exec(
        "CREATE TABLE IF NOT EXISTS seller_claims (seller_id TEXT PRIMARY KEY, claimed_at TEXT NOT NULL)"
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
        // A Checkout Session expires after 24 hours and fulfilment stores its own entitlement, so a
        // session row older than 30 days is never read again: drop those rather than grow forever.
        sql.exec(
          "DELETE FROM sessions WHERE created_at < ?",
          new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
        );
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
        "WHERE subject=? AND session_id NOT IN (SELECT session_id FROM entitlement_revocations) " +
        "ORDER BY issued_at DESC",
        subject,
      )).map((row) => ({
        sessionId: String(row.session_id),
        subject: String(row.subject),
        packageId: String(row.package_id),
        token: JSON.parse(String(row.token_json)),
        issuedAt: String(row.issued_at),
      })));
    }

    match = path.match(/^\/entitlement-revocation\/([^/]+)$/);
    if (match) {
      const sessionId = decodeURIComponent(match[1]);
      if (req.method === "GET") {
        const row = first(sql.exec("SELECT reason,revoked_at FROM entitlement_revocations WHERE session_id=?", sessionId));
        return row
          ? json({ sessionId, reason: String(row.reason), revokedAt: String(row.revoked_at) })
          : json({ error: "not found" }, 404);
      }
      if (req.method === "PUT") {
        const { reason, revokedAt } = await req.json() as { reason: string; revokedAt: string };
        const ent = first(sql.exec("SELECT token_json FROM entitlements WHERE session_id=?", sessionId));
        if (!ent) return json({ error: "no such entitlement" }, 404);
        const signature = String((JSON.parse(String(ent.token_json)) as EntitlementToken).signature);
        // A refund outranks a dispute: once refunded, a later "dispute won" must not restore it.
        sql.exec(
          "INSERT INTO entitlement_revocations(session_id,signature,reason,revoked_at) VALUES(?,?,?,?) " +
          "ON CONFLICT(session_id) DO UPDATE SET reason=CASE WHEN excluded.reason='refund' THEN 'refund' ELSE reason END",
          sessionId,
          signature,
          reason,
          revokedAt,
        );
        return json({ sessionId, revoked: true });
      }
      if (req.method === "DELETE") {
        const only = url.searchParams.get("reason");
        const removed = rows(only
          ? sql.exec("DELETE FROM entitlement_revocations WHERE session_id=? AND reason=? RETURNING session_id", sessionId, only)
          : sql.exec("DELETE FROM entitlement_revocations WHERE session_id=? RETURNING session_id", sessionId));
        return json({ removed: removed.length > 0 }, removed.length > 0 ? 200 : 404);
      }
    }

    if (req.method === "GET" && path === "/token-revoked") {
      const signature = url.searchParams.get("signature") || "";
      const row = first(sql.exec("SELECT 1 AS hit FROM entitlement_revocations WHERE signature=? LIMIT 1", signature));
      return json({ revoked: !!row });
    }

    match = path.match(/^\/payment-ref\/([^/]+)$/);
    if (match) {
      const ref = decodeURIComponent(match[1]);
      if (req.method === "PUT") {
        const { sessionId } = await req.json() as { sessionId: string };
        sql.exec("INSERT OR IGNORE INTO payment_refs(ref,session_id) VALUES(?,?)", ref, sessionId);
        return json({ ref, sessionId });
      }
      if (req.method === "GET") {
        const row = first(sql.exec("SELECT session_id FROM payment_refs WHERE ref=?", ref));
        return row ? json({ ref, sessionId: String(row.session_id) }) : json({ error: "not found" }, 404);
      }
    }

    match = path.match(/^\/seller-claim\/([^/]+)$/);
    if (match) {
      const sellerId = decodeURIComponent(match[1]);
      if (req.method === "POST") {
        // One Durable Object, one thread: this check-and-insert is atomic. A claim older than two
        // minutes belongs to a request that died, and is taken over.
        const now = new Date();
        const stale = new Date(now.getTime() - 120_000).toISOString();
        const held = first(sql.exec("SELECT claimed_at FROM seller_claims WHERE seller_id=? AND claimed_at >= ?", sellerId, stale));
        if (held) return json({ error: "claimed" }, 409);
        const claimedAt = now.toISOString();
        sql.exec("INSERT OR REPLACE INTO seller_claims(seller_id,claimed_at) VALUES(?,?)", sellerId, claimedAt);
        return json({ sellerId, claimedAt });
      }
      if (req.method === "DELETE") {
        sql.exec("DELETE FROM seller_claims WHERE seller_id=?", sellerId);
        return json({ released: true });
      }
    }

    match = path.match(/^\/seller\/([^/]+)$/);
    if (match) {
      const sellerId = decodeURIComponent(match[1]);
      if (req.method === "DELETE") {
        const removed = rows(sql.exec("DELETE FROM seller_accounts WHERE seller_id=? RETURNING seller_id", sellerId));
        return json({ removed: removed.length > 0 }, removed.length > 0 ? 200 : 404);
      }
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
        if (url.searchParams.get("ifAbsent") === "1") {
          const existing = first(sql.exec(
            "SELECT seller_id,account_id,charges_enabled,payouts_enabled,details_submitted,updated_at " +
            "FROM seller_accounts WHERE seller_id=?",
            sellerId,
          ));
          if (existing) {
            return json({
              sellerId: String(existing.seller_id),
              accountId: String(existing.account_id),
              chargesEnabled: Number(existing.charges_enabled) === 1,
              payoutsEnabled: Number(existing.payouts_enabled) === 1,
              detailsSubmitted: Number(existing.details_submitted) === 1,
              updatedAt: String(existing.updated_at),
            });
          }
        }
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

/**
 * Baseline hardening headers for every response (API, assets, docs). No blanket CSP here — the store
 * and docs ship inline bootstrap scripts a strict policy would break — but clickjacking (the store's
 * moderation page takes an admin token), MIME sniffing, referrer leakage and downgrade are closed.
 */
const SECURITY_HEADERS: Record<string, string> = {
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "content-security-policy": "frame-ancestors 'none'",
  "referrer-policy": "strict-origin-when-cross-origin",
  "strict-transport-security": "max-age=31536000; includeSubDomains",
};

function withSecurityHeaders(res: Response): Response {
  if (res.status === 101) return res;
  const headers = new Headers(res.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) if (!headers.has(name)) headers.set(name, value);
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}

/**
 * The read-only Repository API paths (`spec/repository-api.md` § 1–5) other origins may call: a web host
 * (Morphont's browser build, say) browses and installs from here. Public, unauthenticated data, so `*` —
 * no credentials are ever honoured cross-origin. Writes, admin and payments stay same-origin.
 */
const PUBLIC_READ = /^\/(?:packages(?:\/[^/]+(?:\/versions\/[^/]+\/download)?)?|revocations|\.well-known\/azphalt(?:-repository)?\.json)$/;

const CORS_HEADERS: Record<string, string> = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, OPTIONS",
  "access-control-allow-headers": "range",
  "access-control-expose-headers": "content-length, content-range, accept-ranges",
  "access-control-max-age": "86400",
};

function withCors(req: Request, res: Response): Response {
  if (!PUBLIC_READ.test(new URL(req.url).pathname) || (req.method !== "GET" && req.method !== "OPTIONS")) return res;
  const headers = new Headers(res.headers);
  for (const [name, value] of Object.entries(CORS_HEADERS)) headers.set(name, value);
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    if (req.method === "OPTIONS" && PUBLIC_READ.test(new URL(req.url).pathname)) {
      return withSecurityHeaders(withCors(req, new Response(null, { status: 204 })));
    }
    return withSecurityHeaders(withCors(req, await handle(req, env)));
  },
};

async function handle(req: Request, env: Env): Promise<Response> {
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

      // The admin surface is bearer-token gated; throttle it per client so the token can't be guessed
      // online. (Where no limiter is bound this is a no-op, as for every public write.)
      const adminSurface =
        path.startsWith("/api/admin/") ||
        /^\/(?:api\/)?reports\/\d+\/resolve$/.test(path) ||
        (req.method === "GET" && (path === "/reports" || path === "/api/reports"));
      if (adminSurface && !(await allowWrite(req, env))) return json({ error: "too many requests" }, 429);

      if (req.method === "GET" && path === "/api/packages") return apiPackages(req, env);
      if (req.method === "POST" && path === "/api/checkout") return checkout(req, env);
      if (req.method === "POST" && path === "/api/webhooks/stripe") return webhook(req, env);
      if (req.method === "GET" && path === "/api/purchases") return purchases(req, env);
      if (req.method === "POST" && path === "/api/connect/onboard") return connectOnboard(req, env);
      if (req.method === "POST" && path === "/api/admin/connect/invite") return adminConnectInvite(req, env);
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
      if (req.method === "POST" && path === "/updates") return batchUpdates(req, env);
      if (req.method === "POST" && path === "/entitlements/play") return playEntitlement(req, env);
      if (req.method === "POST" && path === "/api/admin/revocations") return adminRevoke(req, env);

      let adminMatch = path.match(/^\/api\/admin\/connect\/sellers\/([^/]+)$/);
      if (adminMatch && (req.method === "PUT" || req.method === "DELETE")) {
        return adminBindSeller(req, env, decodeURIComponent(adminMatch[1]));
      }
      adminMatch = path.match(/^\/api\/admin\/entitlements\/([^/]+)$/);
      if (adminMatch && req.method === "GET") return adminEntitlement(req, env, decodeURIComponent(adminMatch[1]));

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
        const listing = anyListing(listings, id);
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
          // The entitlement key stays first: buy-once tokens are verified against it.
          signingKeys: [
            { keyId: "store-v1", algorithm: "ed25519", publicKey },
            ...(env.PACKAGE_SIGNING_PUBLIC_KEY_SPKI_B64
              ? [{ keyId: "packages-v1", algorithm: "ed25519", publicKey: env.PACKAGE_SIGNING_PUBLIC_KEY_SPKI_B64 }]
              : []),
          ],
        });
      }

      return serveStorefront(req, env);
    } catch (error) {
      console.error("worker request failed", error);
      return json({ error: "internal error" }, 500);
    }
}
