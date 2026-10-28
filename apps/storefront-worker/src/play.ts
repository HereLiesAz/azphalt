/**
 * Google Play purchase verification for `POST /entitlements/play` (`spec/repository-api.md` § 7).
 *
 * Only the repository can check a purchase token with Google: it holds a service account with the
 * Play Console's "View financial data" permission, signs a JWT with its key (RS256 over WebCrypto, so
 * no dependency), trades it for an OAuth access token, and asks the Android Publisher API about the
 * token. A store app that verified its own purchase would be defeated by anyone willing to patch it.
 *
 * One-time products go through `purchases.products` ([verifyPlayPurchase]); subscriptions through
 * `purchases.subscriptionsv2` ([verifyPlaySubscription]), which yields an entitlement that expires
 * with the subscription's current period.
 */

const SCOPE = "https://www.googleapis.com/auth/androidpublisher";
const DEFAULT_TOKEN_URI = "https://oauth2.googleapis.com/token";
const API = "https://androidpublisher.googleapis.com/androidpublisher/v3/applications";

export interface ServiceAccount {
  client_email: string;
  private_key: string;
  token_uri?: string;
}

export interface PlayConfig {
  /** The store app's application id — the Play listing the products belong to. */
  packageName: string;
  serviceAccount: ServiceAccount;
}

/** Who a verified purchase entitles, and until when (subscriptions only). */
export interface PlayGrant {
  subject: string;
  expiresAt?: string;
  /**
   * Acknowledges the purchase with Google, when it is still unacknowledged. The caller runs it only
   * AFTER issuing the licence, so a purchase that never became a licence stays unacknowledged and Play
   * refunds it. Best effort: a failure is swallowed (the store app acknowledges too).
   */
  acknowledge?: () => Promise<void>;
}

function bestEffort(run: () => Promise<unknown>): () => Promise<void> {
  return async () => {
    try {
      await run();
    } catch {
      // Best effort; see PlayGrant.acknowledge.
    }
  };
}

/** Google could not be asked (network, 5xx, or our own credentials refused): a 502, never a 402. */
export class PlayUnavailableError extends Error {}

type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;

/** Parse `PLAY_SERVICE_ACCOUNT_JSON`, or undefined when it is not a usable service-account key. */
export function parseServiceAccount(raw: string | undefined): ServiceAccount | undefined {
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw) as Partial<ServiceAccount>;
    if (typeof parsed.client_email !== "string" || typeof parsed.private_key !== "string") return undefined;
    return { client_email: parsed.client_email, private_key: parsed.private_key, token_uri: parsed.token_uri };
  } catch {
    return undefined;
  }
}

function b64url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function pemBody(pem: string): Uint8Array<ArrayBuffer> {
  const base64 = pem.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "");
  const binary = atob(base64);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

// An access token lives an hour; reuse it across requests on the same isolate.
const tokenCache = new Map<string, { token: string; expiresAt: number }>();

async function accessToken(account: ServiceAccount, fetchImpl: FetchLike): Promise<string> {
  const cached = tokenCache.get(account.client_email);
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token;

  const tokenUri = account.token_uri || DEFAULT_TOKEN_URI;
  const now = Math.floor(Date.now() / 1000);
  const enc = new TextEncoder();
  const header = b64url(enc.encode(JSON.stringify({ alg: "RS256", typ: "JWT" })));
  const claims = b64url(enc.encode(JSON.stringify({
    iss: account.client_email,
    scope: SCOPE,
    aud: tokenUri,
    iat: now,
    exp: now + 3600,
  })));
  let key: CryptoKey;
  try {
    key = await crypto.subtle.importKey(
      "pkcs8",
      pemBody(account.private_key),
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["sign"],
    );
  } catch {
    throw new PlayUnavailableError("the Play service-account key is not a valid RSA private key");
  }
  const signature = new Uint8Array(await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, enc.encode(header + "." + claims)));
  const assertion = header + "." + claims + "." + b64url(signature);

  let res: Response;
  try {
    res = await fetchImpl(tokenUri, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }).toString(),
    });
  } catch (e) {
    throw new PlayUnavailableError("could not reach Google OAuth: " + (e as Error).message);
  }
  if (!res.ok) throw new PlayUnavailableError("Google OAuth refused the service account: HTTP " + res.status);
  const body = await res.json() as { access_token?: string; expires_in?: number };
  if (!body.access_token) throw new PlayUnavailableError("Google OAuth returned no access token");
  tokenCache.set(account.client_email, {
    token: body.access_token,
    expiresAt: Date.now() + (body.expires_in ?? 3600) * 1000,
  });
  return body.access_token;
}

/**
 * Verify a one-time product purchase. Resolves to the grant, or null when Google does not recognise
 * the purchase as completed (unknown, pending, cancelled or refunded token) — the caller's 402. Throws
 * {@link PlayUnavailableError} when Google cannot be asked — the caller's 502.
 *
 * The subject is the purchase's order id, so the same purchase always maps to the same subject:
 * Play restores a purchase on a reinstall or a new device with the same token, which re-verifies to
 * the same subject. A purchase that carries the app's `obfuscatedExternalAccountId` uses that instead,
 * which also ties separate purchases to one buyer.
 *
 * An unacknowledged purchase comes back with {@link PlayGrant.acknowledge}, for the caller to run once
 * the licence is issued: Play refunds a purchase left unacknowledged for three days, which is the right
 * outcome only when no licence came of it.
 */
export async function verifyPlayPurchase(
  config: PlayConfig,
  productId: string,
  purchaseToken: string,
  fetchImpl: FetchLike = (input, init) => fetch(input, init),
): Promise<PlayGrant | null> {
  const token = await accessToken(config.serviceAccount, fetchImpl);
  const url = API + "/" + encodeURIComponent(config.packageName) + "/purchases/products/" +
    encodeURIComponent(productId) + "/tokens/" + encodeURIComponent(purchaseToken);
  let res: Response;
  try {
    res = await fetchImpl(url, { headers: { authorization: "Bearer " + token } });
  } catch (e) {
    throw new PlayUnavailableError("could not reach Google Play: " + (e as Error).message);
  }
  // 400/404/410: Google does not know this token for this product. Anything else non-2xx is Google
  // (or our credentials) failing, not the buyer.
  if (res.status === 400 || res.status === 404 || res.status === 410) return null;
  if (res.status === 401) tokenCache.delete(config.serviceAccount.client_email);
  if (!res.ok) throw new PlayUnavailableError("Google Play answered HTTP " + res.status);

  const purchase = await res.json() as {
    purchaseState?: number;
    acknowledgementState?: number;
    orderId?: string;
    obfuscatedExternalAccountId?: string;
  };
  // 0 purchased, 1 cancelled, 2 pending.
  if (purchase.purchaseState !== 0) return null;

  const acknowledge = purchase.acknowledgementState === 0
    ? bestEffort(() => fetchImpl(url + ":acknowledge", {
        method: "POST",
        headers: { authorization: "Bearer " + token, "content-type": "application/json" },
        body: "{}",
      }))
    : undefined;

  if (purchase.obfuscatedExternalAccountId) {
    return { subject: "play-account:" + purchase.obfuscatedExternalAccountId, acknowledge };
  }
  if (purchase.orderId) return { subject: "play-order:" + purchase.orderId, acknowledge };
  // A completed purchase with neither is not something Play produces; refuse rather than invent one.
  return null;
}

/** Subscription states that still entitle the buyer (grace period: payment is being retried). */
const ENTITLING_STATES = new Set(["SUBSCRIPTION_STATE_ACTIVE", "SUBSCRIPTION_STATE_IN_GRACE_PERIOD"]);

/**
 * Verify a subscription purchase. Resolves to the grant, expiring when the subscribed product's
 * current period does, or null when the token is unknown, the subscription is not active (pending,
 * on hold, paused, cancelled past its period, expired) or does not include [productId]. Throws
 * {@link PlayUnavailableError} when Google cannot be asked.
 *
 * The subject is the purchase's base order id: Play appends `..0`, `..1`, … to the order id of each
 * renewal, so stripping that suffix keeps one buyer one subject across renewals and restores. An
 * `obfuscatedExternalAccountId`, when the app set one, is used instead.
 *
 * An unacknowledged subscription comes back with {@link PlayGrant.acknowledge}, as for a one-time purchase.
 */
export async function verifyPlaySubscription(
  config: PlayConfig,
  productId: string,
  purchaseToken: string,
  fetchImpl: FetchLike = (input, init) => fetch(input, init),
): Promise<PlayGrant | null> {
  const token = await accessToken(config.serviceAccount, fetchImpl);
  const base = API + "/" + encodeURIComponent(config.packageName) + "/purchases";
  const url = base + "/subscriptionsv2/tokens/" + encodeURIComponent(purchaseToken);
  let res: Response;
  try {
    res = await fetchImpl(url, { headers: { authorization: "Bearer " + token } });
  } catch (e) {
    throw new PlayUnavailableError("could not reach Google Play: " + (e as Error).message);
  }
  if (res.status === 400 || res.status === 404 || res.status === 410) return null;
  if (res.status === 401) tokenCache.delete(config.serviceAccount.client_email);
  if (!res.ok) throw new PlayUnavailableError("Google Play answered HTTP " + res.status);

  const sub = await res.json() as {
    subscriptionState?: string;
    acknowledgementState?: string;
    latestOrderId?: string;
    externalAccountIdentifiers?: { obfuscatedExternalAccountId?: string };
    lineItems?: { productId?: string; expiryTime?: string; latestSuccessfulOrderId?: string }[];
  };
  if (!ENTITLING_STATES.has(sub.subscriptionState ?? "")) return null;
  const item = (sub.lineItems ?? []).find((l) => l.productId === productId);
  const expiry = item?.expiryTime ? new Date(item.expiryTime) : undefined;
  if (!item || !expiry || Number.isNaN(expiry.getTime()) || expiry.getTime() <= Date.now()) return null;

  const acknowledge = sub.acknowledgementState === "ACKNOWLEDGEMENT_STATE_PENDING"
    ? bestEffort(() => fetchImpl(
        base + "/subscriptions/" + encodeURIComponent(productId) + "/tokens/" + encodeURIComponent(purchaseToken) + ":acknowledge",
        { method: "POST", headers: { authorization: "Bearer " + token, "content-type": "application/json" }, body: "{}" },
      ))
    : undefined;

  const expiresAt = expiry.toISOString();
  const account = sub.externalAccountIdentifiers?.obfuscatedExternalAccountId;
  if (account) return { subject: "play-account:" + account, expiresAt, acknowledge };
  const order = (item.latestSuccessfulOrderId || sub.latestOrderId || "").replace(/\.\.\d+$/, "");
  if (order) return { subject: "play-order:" + order, expiresAt, acknowledge };
  return null;
}

// ── Beyond verification: order details, voids, alternative-billing reports ───────────────────────

/** An authorised Android Publisher call. Non-2xx other than [okStatuses] throws {@link PlayApiError}. */
export class PlayApiError extends PlayUnavailableError {
  constructor(readonly status: number, message: string) {
    super(message);
  }
}

export async function playApi<T = Record<string, unknown>>(
  account: ServiceAccount,
  method: string,
  path: string,
  body?: unknown,
  fetchImpl: FetchLike = (input, init) => fetch(input, init),
): Promise<T> {
  const token = await accessToken(account, fetchImpl);
  let res: Response;
  try {
    res = await fetchImpl(API + path, {
      method,
      headers: { authorization: "Bearer " + token, "content-type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (e) {
    throw new PlayUnavailableError("could not reach Google Play: " + (e as Error).message);
  }
  if (res.status === 401) tokenCache.delete(account.client_email);
  const text = await res.text();
  if (!res.ok) throw new PlayApiError(res.status, "Google Play answered HTTP " + res.status + " for " + method + " " + path.split("?")[0]);
  return (text ? JSON.parse(text) : {}) as T;
}

export type PlayPurchaseInspection =
  | { status: "purchased"; orderId?: string; regionCode?: string; purchaseTimeMillis?: number; grant: PlayGrant }
  | { status: "pending" }
  | { status: "invalid" };

/**
 * {@link verifyPlayPurchase}, but saying WHY a purchase does not entitle: a pending purchase (slow
 * payment method, cash) is not a refusal, and the app keeps waiting for it instead of telling the
 * buyer they did not pay.
 */
export async function inspectPlayPurchase(
  config: PlayConfig,
  productId: string,
  purchaseToken: string,
  fetchImpl: FetchLike = (input, init) => fetch(input, init),
): Promise<PlayPurchaseInspection> {
  const token = await accessToken(config.serviceAccount, fetchImpl);
  const url = API + "/" + encodeURIComponent(config.packageName) + "/purchases/products/" +
    encodeURIComponent(productId) + "/tokens/" + encodeURIComponent(purchaseToken);
  let res: Response;
  try {
    res = await fetchImpl(url, { headers: { authorization: "Bearer " + token } });
  } catch (e) {
    throw new PlayUnavailableError("could not reach Google Play: " + (e as Error).message);
  }
  if (res.status === 400 || res.status === 404 || res.status === 410) return { status: "invalid" };
  if (res.status === 401) tokenCache.delete(config.serviceAccount.client_email);
  if (!res.ok) throw new PlayUnavailableError("Google Play answered HTTP " + res.status);
  const purchase = await res.json() as {
    purchaseState?: number;
    acknowledgementState?: number;
    orderId?: string;
    regionCode?: string;
    purchaseTimeMillis?: string;
    obfuscatedExternalAccountId?: string;
  };
  if (purchase.purchaseState === 2) return { status: "pending" };
  if (purchase.purchaseState !== 0) return { status: "invalid" };
  const acknowledge = purchase.acknowledgementState === 0
    ? bestEffort(() => fetchImpl(url + ":acknowledge", {
        method: "POST",
        headers: { authorization: "Bearer " + token, "content-type": "application/json" },
        body: "{}",
      }))
    : undefined;
  const subject = purchase.obfuscatedExternalAccountId
    ? "play-account:" + purchase.obfuscatedExternalAccountId
    : purchase.orderId ? "play-order:" + purchase.orderId : undefined;
  if (!subject) return { status: "invalid" };
  return {
    status: "purchased",
    orderId: purchase.orderId,
    regionCode: purchase.regionCode,
    purchaseTimeMillis: purchase.purchaseTimeMillis ? Number(purchase.purchaseTimeMillis) : undefined,
    grant: { subject, acknowledge },
  };
}

export interface Money { currencyCode?: string; units?: string; nanos?: number }

/** Money as integer micros (1e-6 of the unit), the unit every ledger amount is kept in. */
export function moneyMicros(m: Money | undefined): number | undefined {
  if (!m || m.units === undefined && m.nanos === undefined) return undefined;
  return Number(m.units ?? "0") * 1_000_000 + Math.round((m.nanos ?? 0) / 1000);
}

export interface PlayOrder {
  orderId: string;
  state?: string;
  total?: Money;
  tax?: Money;
  developerRevenueInBuyerCurrency?: Money;
  buyerAddress?: { buyerCountry?: string; buyerState?: string };
}

/** `orders.get`: what the buyer paid, the tax in it, and Google's net to us. */
export function getPlayOrder(account: ServiceAccount, packageName: string, orderId: string, fetchImpl?: FetchLike): Promise<PlayOrder> {
  return playApi<PlayOrder>(account, "GET", "/" + encodeURIComponent(packageName) + "/orders/" + encodeURIComponent(orderId), undefined, fetchImpl);
}

export interface VoidedPurchase {
  purchaseToken: string;
  orderId?: string;
  voidedTimeMillis?: string;
  voidedReason?: number;
  voidedSource?: number;
}

/** `purchases.voidedpurchases.list` from [startTimeMillis], every page. */
export async function listVoidedPurchases(
  account: ServiceAccount,
  packageName: string,
  startTimeMillis: number,
  fetchImpl?: FetchLike,
): Promise<VoidedPurchase[]> {
  const out: VoidedPurchase[] = [];
  let pageToken: string | undefined;
  for (let page = 0; page < 50; page++) {
    const q = new URLSearchParams({ startTime: String(startTimeMillis), type: "0", maxResults: "1000" });
    if (pageToken) q.set("token", pageToken);
    const res = await playApi<{ voidedPurchases?: VoidedPurchase[]; tokenPagination?: { nextPageToken?: string } }>(
      account, "GET", "/" + encodeURIComponent(packageName) + "/purchases/voidedpurchases?" + q, undefined, fetchImpl,
    );
    out.push(...(res.voidedPurchases ?? []));
    pageToken = res.tokenPagination?.nextPageToken;
    if (!pageToken) break;
  }
  return out;
}

/**
 * Report a one-time alternative-billing sale (`externaltransactions.createexternaltransaction`).
 * Idempotent on [externalTransactionId]: a 409 (already reported) counts as success.
 */
export async function reportExternalTransaction(
  account: ServiceAccount,
  packageName: string,
  report: {
    externalTransactionId: string;
    externalTransactionToken: string;
    preTaxMicros: number;
    taxMicros: number;
    currency: string;
    transactionTime: string;
    regionCode: string;
    administrativeArea?: string;
  },
  fetchImpl?: FetchLike,
): Promise<void> {
  const body = {
    originalPreTaxAmount: { priceMicros: String(report.preTaxMicros), currency: report.currency.toUpperCase() },
    originalTaxAmount: { priceMicros: String(report.taxMicros), currency: report.currency.toUpperCase() },
    transactionTime: report.transactionTime,
    oneTimeTransaction: { externalTransactionToken: report.externalTransactionToken },
    userTaxAddress: {
      regionCode: report.regionCode.toUpperCase(),
      ...(report.administrativeArea ? { administrativeArea: report.administrativeArea } : {}),
    },
  };
  try {
    await playApi(account, "POST", "/" + encodeURIComponent(packageName) + "/externalTransactions?externalTransactionId=" +
      encodeURIComponent(report.externalTransactionId), body, fetchImpl);
  } catch (e) {
    if (e instanceof PlayApiError && e.status === 409) return;
    throw e;
  }
}

/** Report a full refund of a reported alternative-billing sale (`externaltransactions.refundexternaltransaction`). */
export async function refundExternalTransaction(
  account: ServiceAccount,
  packageName: string,
  externalTransactionId: string,
  refundTime: string,
  fetchImpl?: FetchLike,
): Promise<void> {
  await playApi(account, "POST", "/" + encodeURIComponent(packageName) + "/externalTransactions/" +
    encodeURIComponent(externalTransactionId) + ":refund", { refundTime, fullRefund: {} }, fetchImpl);
}
