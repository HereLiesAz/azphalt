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
 * An unacknowledged purchase is acknowledged here, because Play refunds one left unacknowledged for
 * three days; a failed acknowledgement does not fail the exchange (the store app acknowledges too).
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

  if (purchase.acknowledgementState === 0) {
    try {
      await fetchImpl(url + ":acknowledge", {
        method: "POST",
        headers: { authorization: "Bearer " + token, "content-type": "application/json" },
        body: "{}",
      });
    } catch {
      // Best effort; see above.
    }
  }

  if (purchase.obfuscatedExternalAccountId) return { subject: "play-account:" + purchase.obfuscatedExternalAccountId };
  if (purchase.orderId) return { subject: "play-order:" + purchase.orderId };
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
 * An unacknowledged subscription is acknowledged here, for the same reason as a one-time purchase.
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

  if (sub.acknowledgementState === "ACKNOWLEDGEMENT_STATE_PENDING") {
    try {
      await fetchImpl(
        base + "/subscriptions/" + encodeURIComponent(productId) + "/tokens/" + encodeURIComponent(purchaseToken) + ":acknowledge",
        { method: "POST", headers: { authorization: "Bearer " + token, "content-type": "application/json" }, body: "{}" },
      );
    } catch {
      // Best effort, as for one-time purchases.
    }
  }

  const expiresAt = expiry.toISOString();
  const account = sub.externalAccountIdentifiers?.obfuscatedExternalAccountId;
  if (account) return { subject: "play-account:" + account, expiresAt };
  const order = (item.latestSuccessfulOrderId || sub.latestOrderId || "").replace(/\.\.\d+$/, "");
  if (order) return { subject: "play-order:" + order, expiresAt };
  return null;
}
