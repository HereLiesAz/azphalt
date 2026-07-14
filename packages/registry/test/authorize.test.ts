/**
 * The download authorizers. These gate paid packages' bytes for every surface that serves them (the
 * reference server's handler, the storefront's download route), so their verdicts are the whole of
 * the paid lane's enforcement.
 *
 * The distinction under test throughout is `authenticated` vs `licensed` — the two independent
 * questions that become `401` and `402`. Collapsing them into one boolean is the easy mistake, and it
 * is what these tests exist to prevent.
 */
import { generateKeyPairSync } from "node:crypto";
import { describe, expect, it } from "vitest";
import { EntitlementAuthorizer, InMemoryAuthorizer, denyAllAuthorizer } from "../src/authorize.js";
import { issueEntitlement } from "../src/entitlement.js";
import type { EntitlementClaims } from "../src/entitlement.js";

/** A fresh Ed25519 keypair as (PEM private, base64 SPKI DER public) — the forms the API expects. */
function keypair(): { pem: string; pub: string } {
  const { privateKey, publicKey } = generateKeyPairSync("ed25519");
  return {
    pem: privateKey.export({ type: "pkcs8", format: "pem" }).toString(),
    pub: Buffer.from(publicKey.export({ type: "spki", format: "der" })).toString("base64"),
  };
}

/** A signed entitlement, base64-encoded — exactly what arrives as a Bearer credential. */
function token(pem: string, claims: Partial<EntitlementClaims> & { packageId: string }): string {
  const full: EntitlementClaims = {
    subject: "user_1",
    kind: "perpetual",
    issuedAt: new Date().toISOString(),
    ...claims,
  };
  return Buffer.from(JSON.stringify(issueEntitlement(pem, full)), "utf8").toString("base64");
}

describe("denyAllAuthorizer", () => {
  it("refuses everything, including a well-formed token", () => {
    // The safe default when nothing is configured: no key, no licenses, no downloads.
    expect(denyAllAuthorizer.authorize({ token: "anything", packageId: "com.x.y", version: "1.0.0" })).toEqual({
      authenticated: false,
      licensed: false,
    });
  });
});

describe("InMemoryAuthorizer", () => {
  it("treats an unknown token as unauthenticated (401), not merely unlicensed", () => {
    const a = new InMemoryAuthorizer();
    expect(a.authorize({ token: "ghost", packageId: "com.x.y", version: "1.0.0" })).toEqual({
      authenticated: false,
      licensed: false,
    });
  });

  it("treats a missing token as unauthenticated", () => {
    const a = new InMemoryAuthorizer().grantLicense("t", "com.x.y");
    expect(a.authorize({ packageId: "com.x.y", version: "1.0.0" }).authenticated).toBe(false);
  });

  it("separates a known identity (402) from a licensed one (200)", () => {
    const a = new InMemoryAuthorizer().registerToken("known").grantLicense("buyer", "com.x.y");

    // Registered but unlicensed: a real identity that has not paid → 402, not 401.
    expect(a.authorize({ token: "known", packageId: "com.x.y", version: "1.0.0" })).toEqual({
      authenticated: true,
      licensed: false,
    });
    expect(a.authorize({ token: "buyer", packageId: "com.x.y", version: "1.0.0" })).toEqual({
      authenticated: true,
      licensed: true,
    });
  });

  it("scopes a license to its own package", () => {
    const a = new InMemoryAuthorizer().grantLicense("buyer", "com.x.y");
    expect(a.authorize({ token: "buyer", packageId: "com.other.z", version: "1.0.0" })).toEqual({
      authenticated: true,
      licensed: false,
    });
  });
});

describe("EntitlementAuthorizer", () => {
  it("admits a token signed by a trusted key for the requested package", () => {
    const { pem, pub } = keypair();
    const a = new EntitlementAuthorizer([pub]);
    expect(a.authorize({ token: token(pem, { packageId: "com.x.y" }), packageId: "com.x.y", version: "1.0.0" })).toEqual(
      { authenticated: true, licensed: true },
    );
  });

  it("402s a valid token aimed at a different package — authenticated, but not licensed for this", () => {
    const { pem, pub } = keypair();
    const a = new EntitlementAuthorizer([pub]);
    expect(
      a.authorize({ token: token(pem, { packageId: "com.other.z" }), packageId: "com.x.y", version: "1.0.0" }),
    ).toEqual({ authenticated: true, licensed: false });
  });

  it("401s a token signed by an untrusted key, however well-formed", () => {
    // The signature verifies against its own embedded key — trust is what it lacks. A token is only
    // an identity because a key WE trust signed it; otherwise anyone could mint their own licenses.
    const stranger = keypair();
    const a = new EntitlementAuthorizer([keypair().pub]);
    expect(
      a.authorize({ token: token(stranger.pem, { packageId: "com.x.y" }), packageId: "com.x.y", version: "1.0.0" }),
    ).toEqual({ authenticated: false, licensed: false });
  });

  it("401s missing, malformed, and non-JSON tokens", () => {
    const { pub } = keypair();
    const a = new EntitlementAuthorizer([pub]);
    for (const token of [undefined, "", "not-base64-json", Buffer.from("{}", "utf8").toString("base64")]) {
      expect(a.authorize({ token, packageId: "com.x.y", version: "1.0.0" }).authenticated).toBe(false);
    }
  });

  it("401s an oversized token without parsing it", () => {
    // A real entitlement is a few hundred bytes; a 4KB+ one is abuse, and base64-decoding then
    // JSON-parsing it is exactly the work an attacker wants to make us do.
    const { pub } = keypair();
    const a = new EntitlementAuthorizer([pub]);
    expect(a.authorize({ token: "x".repeat(4097), packageId: "com.x.y", version: "1.0.0" }).authenticated).toBe(false);
  });

  it("402s an expired subscription token — it authenticates, but no longer licenses", () => {
    const { pem, pub } = keypair();
    const a = new EntitlementAuthorizer([pub]);
    const expired = token(pem, {
      packageId: "com.x.y",
      kind: "subscription",
      issuedAt: "2020-01-01T00:00:00.000Z",
      expiresAt: "2020-02-01T00:00:00.000Z",
    });
    expect(a.authorize({ token: expired, packageId: "com.x.y", version: "1.0.0" })).toEqual({
      authenticated: true,
      licensed: false,
    });
  });
});
