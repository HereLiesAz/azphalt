/**
 * Buy-once entitlements (`spec/repository-api.md` § Buy-once entitlements). A perpetual per-user
 * license, expressed as a **registry-signed token the host verifies offline** — no per-open
 * phone-home, so "your footage never leaves your device" holds. It reuses the same Ed25519 plumbing
 * as package signing/trust: the registry signs the claims with its key, and a host that has the
 * registry's public key (from the `.well-known` index — see {@link trustStoreFromKeys}) validates the
 * token against it locally.
 */
import { createPrivateKey, createPublicKey, sign as cryptoSign, verify as cryptoVerify } from "node:crypto";

/** What an entitlement asserts. Perpetual (buy-once) tokens omit `expiresAt`. */
export interface EntitlementClaims {
  /** The package this entitlement grants. */
  packageId: string;
  /** The licensed identity — an opaque marketplace-side user id; the registry stays identity-agnostic. */
  subject: string;
  /** `perpetual` = buy-once (no expiry). `subscription` carries an `expiresAt`. */
  kind: "perpetual" | "subscription";
  /** ISO-8601 issue instant. */
  issuedAt: string;
  /** ISO-8601 expiry, for a non-perpetual entitlement. */
  expiresAt?: string;
  /** Optional issuer key id (matches the registry's `.well-known` `signingKeys[].keyId`). */
  keyId?: string;
}

/** A signed entitlement: the claims, the Ed25519 signature over their canonical form, and the issuer key. */
export interface EntitlementToken {
  claims: EntitlementClaims;
  /** Base64 Ed25519 signature over {@link canonicalClaims}. */
  signature: string;
  /** Base64 SPKI (DER) of the issuing registry key. */
  publicKey: string;
}

export interface EntitlementResult {
  /** The signature is a valid Ed25519 signature by `token.publicKey` over the claims. */
  signatureValid: boolean;
  /** `token.publicKey` is among the trusted registry keys supplied to {@link verifyEntitlement}. */
  trustedIssuer: boolean;
  /** Not yet past `expiresAt` (always true for a perpetual token). */
  live: boolean;
  /** The requested `packageId` (when supplied) matches the claim. */
  packageMatch: boolean;
  /** All of the above hold: the token authorizes the request. */
  valid: boolean;
  reason: string;
  claims?: EntitlementClaims;
}

/**
 * Canonical bytes to sign/verify: the claims as JSON with a **fixed key order**, omitting absent
 * optional fields, so issuing and verifying serialize identically (Ed25519 is deterministic, but the
 * input must be byte-stable). Not general JCS — the claim shape is closed and flat by construction.
 */
export function canonicalClaims(claims: EntitlementClaims): string {
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

/** Issue (sign) an entitlement with the registry's PKCS8 PEM Ed25519 private key. */
export function issueEntitlement(registryPrivateKey: string, claims: EntitlementClaims): EntitlementToken {
  if (!claims || typeof claims.packageId !== "string" || typeof claims.subject !== "string") {
    throw new Error("entitlement: claims must include packageId and subject");
  }
  if (claims.kind !== "perpetual" && claims.kind !== "subscription") {
    throw new Error("entitlement: kind must be 'perpetual' or 'subscription'");
  }
  const key = createPrivateKey(registryPrivateKey);
  if (key.asymmetricKeyType !== "ed25519") throw new Error("entitlement: registryPrivateKey must be an ed25519 key");
  const signature = cryptoSign(null, Buffer.from(canonicalClaims(claims), "utf8"), key);
  const publicKey = Buffer.from(createPublicKey(key).export({ type: "spki", format: "der" })).toString("base64");
  return { claims, signature: Buffer.from(signature).toString("base64"), publicKey };
}

/**
 * Verify an entitlement **offline**: the signature is valid, the issuer key is trusted (in
 * `trustedKeys` — the registry's advertised public key(s)), the token isn't expired, and — when
 * `packageId` is given — it's for that package. All checks are local; no network.
 */
export function verifyEntitlement(
  token: EntitlementToken,
  opts: { trustedKeys: string[]; packageId?: string; now?: string | Date } = { trustedKeys: [] },
): EntitlementResult {
  const fail = (reason: string, extra: Partial<EntitlementResult> = {}): EntitlementResult => ({
    signatureValid: false, trustedIssuer: false, live: false, packageMatch: false, valid: false, reason, ...extra,
  });
  if (
    !token || typeof token !== "object" || !token.claims || typeof token.claims !== "object" ||
    typeof token.signature !== "string" || typeof token.publicKey !== "string"
  ) {
    return fail("malformed entitlement token");
  }
  // Defensive: fully validate the untrusted claims shape before touching crypto (a tampered token
  // would fail the signature check anyway, but fail fast with a clear reason).
  const c = token.claims as unknown as Record<string, unknown>;
  if (
    typeof c.packageId !== "string" || typeof c.subject !== "string" ||
    (c.kind !== "perpetual" && c.kind !== "subscription") || typeof c.issuedAt !== "string" ||
    (c.expiresAt !== undefined && typeof c.expiresAt !== "string") ||
    (c.keyId !== undefined && typeof c.keyId !== "string")
  ) {
    return fail("malformed entitlement claims");
  }

  let signatureValid = false;
  try {
    const pub = createPublicKey({ key: Buffer.from(token.publicKey, "base64"), format: "der", type: "spki" });
    signatureValid =
      pub.asymmetricKeyType === "ed25519" &&
      cryptoVerify(null, Buffer.from(canonicalClaims(token.claims), "utf8"), pub, Buffer.from(token.signature, "base64"));
  } catch (e) {
    return fail(`signature error: ${(e as Error).message}`, { claims: token.claims });
  }
  if (!signatureValid) return fail("signature does not verify", { claims: token.claims });

  const trustedIssuer = Array.isArray(opts?.trustedKeys) && opts.trustedKeys.includes(token.publicKey);
  const nowMs = opts.now ? new Date(opts.now).getTime() : Date.now();
  const live = token.claims.expiresAt === undefined || new Date(token.claims.expiresAt).getTime() > nowMs;
  const packageMatch = opts.packageId === undefined || token.claims.packageId === opts.packageId;

  const valid = signatureValid && trustedIssuer && live && packageMatch;
  const reason = !trustedIssuer
    ? "issuer key is not trusted"
    : !live
      ? "entitlement expired"
      : !packageMatch
        ? "entitlement is for a different package"
        : "entitlement valid";
  return { signatureValid, trustedIssuer, live, packageMatch, valid, reason, claims: token.claims };
}
