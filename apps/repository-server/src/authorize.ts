/**
 * Download authorization for paid packages (`spec/repository-api.md` § Download Package).
 *
 * A paid package's bytes are gated on two independent questions, which map to two distinct statuses:
 * - **Authenticated?** Did the caller present a token this repository recognizes? No → `401`.
 * - **Licensed?** Does that identity actually hold a license for *this* package? No → `402`.
 *
 * The reference server keeps this pluggable so a real deployment can back it with its own accounts /
 * entitlements service; {@link InMemoryAuthorizer} is a working, dependency-free default for the demo
 * and tests, and {@link EntitlementAuthorizer} accepts a registry-signed buy-once token verified
 * offline. Free packages never reach the authorizer — the handler serves them unconditionally.
 */
import { verifyEntitlement, type EntitlementToken } from "@azphalt/registry";

/** The two-part verdict the download handler turns into `200` / `401` / `402`. */
export interface AuthDecision {
  /** The token is recognized (a real identity). `false` ⇒ `401 Unauthorized`. */
  authenticated: boolean;
  /** That identity holds a license for the requested package. `false` (when authenticated) ⇒ `402`. */
  licensed: boolean;
}

export interface AuthInput {
  /** The Bearer token from the `Authorization` header, if any. */
  token?: string;
  packageId: string;
  version: string;
}

/** Decides whether a caller may download a *paid* package. */
export interface DownloadAuthorizer {
  authorize(input: AuthInput): AuthDecision | Promise<AuthDecision>;
}

/**
 * A dependency-free {@link DownloadAuthorizer}: an in-memory set of known tokens and the packages each
 * is licensed for. `registerToken` makes a token *authenticated* (a real identity that lacks a
 * license yields `402`); `grantLicense` makes it *licensed* for a package (implies registration).
 */
export class InMemoryAuthorizer implements DownloadAuthorizer {
  private readonly tokens = new Set<string>();
  /** `token` → set of licensed packageIds. */
  private readonly licenses = new Map<string, Set<string>>();

  /** Recognize a token as a real identity (authenticated) without licensing any package. */
  registerToken(token: string): this {
    this.tokens.add(token);
    return this;
  }

  /** License `token` for `packageId` (and register it if new). */
  grantLicense(token: string, packageId: string): this {
    this.tokens.add(token);
    let set = this.licenses.get(token);
    if (!set) this.licenses.set(token, (set = new Set()));
    set.add(packageId);
    return this;
  }

  authorize({ token, packageId }: AuthInput): AuthDecision {
    if (!token || !this.tokens.has(token)) return { authenticated: false, licensed: false };
    return { authenticated: true, licensed: this.licenses.get(token)?.has(packageId) ?? false };
  }
}

/**
 * A {@link DownloadAuthorizer} for **buy-once** packages: the Bearer credential is a registry-signed
 * entitlement token (base64 of the {@link EntitlementToken} JSON), verified **offline** against the
 * registry's public key(s) — the same keys advertised in the `.well-known` index. No accounts
 * database and no per-download phone-home: the token itself is the proof. A validly-signed token from
 * a trusted registry is an authenticated identity (a token that doesn't match this package or has
 * expired yields `402`); anything else is `401`.
 */
export class EntitlementAuthorizer implements DownloadAuthorizer {
  constructor(private readonly trustedKeys: string[]) {}

  authorize({ token, packageId }: AuthInput): AuthDecision {
    // Cap the untrusted token before base64-decoding + JSON.parse — a real entitlement is a few
    // hundred bytes, so a large one is abuse. Bounds CPU/memory (DoS guard).
    if (!token || token.length > 4096) return { authenticated: false, licensed: false };
    let parsed: EntitlementToken;
    try {
      parsed = JSON.parse(Buffer.from(token, "base64").toString("utf8"));
    } catch {
      return { authenticated: false, licensed: false };
    }
    const r = verifyEntitlement(parsed, { trustedKeys: this.trustedKeys, packageId });
    return { authenticated: r.signatureValid && r.trustedIssuer, licensed: r.valid };
  }
}

/** An authorizer that denies every paid download — the safe default when none is configured. */
export const denyAllAuthorizer: DownloadAuthorizer = {
  authorize: () => ({ authenticated: false, licensed: false }),
};
