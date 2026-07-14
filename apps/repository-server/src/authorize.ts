/**
 * Download authorization for paid packages (`spec/repository-api.md` § Download Package).
 *
 * A paid package's bytes are gated on two independent questions, which map to two distinct statuses:
 * - **Authenticated?** Did the caller present a token this repository recognizes? No → `401`.
 * - **Licensed?** Does that identity actually hold a license for *this* package? No → `402`.
 *
 * The reference server keeps this pluggable so a real deployment can back it with its own accounts /
 * entitlements service; {@link InMemoryAuthorizer} is a working, dependency-free default for the demo
 * and tests. Free packages never reach the authorizer — the handler serves them unconditionally.
 */

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

/** An authorizer that denies every paid download — the safe default when none is configured. */
export const denyAllAuthorizer: DownloadAuthorizer = {
  authorize: () => ({ authenticated: false, licensed: false }),
};
