import { describe, it, expect } from "vitest";
import { generateSigningKey } from "@azphalt/azp";
import { issueEntitlement, verifyEntitlement, type EntitlementClaims } from "../src/entitlement.js";

const registry = generateSigningKey();
const other = generateSigningKey();

const perpetual: EntitlementClaims = {
  packageId: "com.demo.paid",
  subject: "user_42",
  kind: "perpetual",
  issuedAt: "2026-01-01T00:00:00Z",
  keyId: "reg-1",
};

describe("entitlement (buy-once, offline-verifiable)", () => {
  it("issues and verifies a perpetual token against the registry's advertised key", () => {
    const token = issueEntitlement(registry.privateKey, perpetual);
    expect(token.publicKey).toBe(registry.publicKey);
    const r = verifyEntitlement(token, { trustedKeys: [registry.publicKey], packageId: "com.demo.paid" });
    expect(r).toMatchObject({ signatureValid: true, trustedIssuer: true, live: true, packageMatch: true, valid: true });
  });

  it("rejects a token from an untrusted issuer (401-worthy)", () => {
    const token = issueEntitlement(registry.privateKey, perpetual);
    const r = verifyEntitlement(token, { trustedKeys: [other.publicKey], packageId: "com.demo.paid" });
    expect(r.signatureValid).toBe(true); // signature is fine…
    expect(r.trustedIssuer).toBe(false); // …but the issuer isn't trusted
    expect(r.valid).toBe(false);
  });

  it("rejects a tampered token (claims changed after signing)", () => {
    const token = issueEntitlement(registry.privateKey, perpetual);
    const tampered = { ...token, claims: { ...token.claims, packageId: "com.demo.other" } };
    const r = verifyEntitlement(tampered, { trustedKeys: [registry.publicKey] });
    expect(r.signatureValid).toBe(false);
    expect(r.valid).toBe(false);
  });

  it("fails package match for a different package (402-worthy: valid identity, wrong grant)", () => {
    const token = issueEntitlement(registry.privateKey, perpetual);
    const r = verifyEntitlement(token, { trustedKeys: [registry.publicKey], packageId: "com.demo.other" });
    expect(r.trustedIssuer).toBe(true);
    expect(r.packageMatch).toBe(false);
    expect(r.valid).toBe(false);
  });

  it("honors expiry for a subscription token; perpetual never expires", () => {
    const sub = issueEntitlement(registry.privateKey, { ...perpetual, kind: "subscription", expiresAt: "2026-02-01T00:00:00Z" });
    expect(verifyEntitlement(sub, { trustedKeys: [registry.publicKey], now: "2026-01-15T00:00:00Z" }).live).toBe(true);
    expect(verifyEntitlement(sub, { trustedKeys: [registry.publicKey], now: "2026-03-01T00:00:00Z" }).live).toBe(false);
    // A perpetual token is live even far in the future.
    const perp = issueEntitlement(registry.privateKey, perpetual);
    expect(verifyEntitlement(perp, { trustedKeys: [registry.publicKey], now: "2099-01-01T00:00:00Z" }).live).toBe(true);
  });

  it("rejects a malformed token without throwing", () => {
    expect(verifyEntitlement({} as never, { trustedKeys: [registry.publicKey] }).valid).toBe(false);
  });

  it("rejects structurally-bad claims with a clear reason (before crypto)", () => {
    const token = issueEntitlement(registry.privateKey, perpetual);
    const bad = { ...token, claims: { ...token.claims, kind: "lifetime" } as never };
    const r = verifyEntitlement(bad, { trustedKeys: [registry.publicKey] });
    expect(r.valid).toBe(false);
    expect(r.reason).toMatch(/malformed/);
  });

  it("tolerates a non-array trustedKeys option", () => {
    const token = issueEntitlement(registry.privateKey, perpetual);
    expect(verifyEntitlement(token, { trustedKeys: undefined as never }).trustedIssuer).toBe(false);
  });
});
