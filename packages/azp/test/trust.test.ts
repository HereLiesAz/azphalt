import { describe, it, expect } from "vitest";
import { unzipSync, zipSync, strToU8, strFromU8 } from "fflate";
import { writeAzp, signAzp, generateSigningKey, verifyTrust, countersign, EPOCH, type TrustStore } from "../src/index";

/** A minimal asset `.azp` to sign and trust-check. */
function sampleAzp() {
  return writeAzp({
    manifest: {
      azphalt: "0.1",
      id: "com.example.thing",
      name: "Thing",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
    },
    payload: { "assets/x.cube": new TextEncoder().encode("LUT_3D_SIZE 2\n") },
    license: "MIT License",
  }).azp;
}

describe("trust model", () => {
  it("an unsigned package is valid but untrusted", () => {
    const r = verifyTrust(sampleAzp(), { keys: [] });
    expect(r.ok).toBe(true);
    expect(r.signed).toBe(false);
    expect(r.trusted).toBe(false);
  });

  it("directly trusts a signer whose key is in the store", () => {
    const author = generateSigningKey();
    const azp = signAzp(sampleAzp(), { privateKey: author.privateKey, keyId: "author-1" });
    const store: TrustStore = { keys: [{ publicKey: author.publicKey, keyId: "author-1" }] };
    const r = verifyTrust(azp, store);
    expect(r.ok).toBe(true);
    expect(r.signed).toBe(true);
    expect(r.trusted).toBe(true);
    expect(r.signerKeyId).toBe("author-1");
    expect(r.signerPublicKey).toBe(author.publicKey);
  });

  it("a valid signature from an unknown key is signed but untrusted", () => {
    const author = generateSigningKey();
    const azp = signAzp(sampleAzp(), { privateKey: author.privateKey });
    const r = verifyTrust(azp, { keys: [{ publicKey: generateSigningKey().publicKey }] });
    expect(r.ok).toBe(true);
    expect(r.signed).toBe(true);
    expect(r.trusted).toBe(false);
    expect(r.reason).toMatch(/not in the trust store/);
  });

  it("a tampered package is invalid and untrusted", () => {
    const author = generateSigningKey();
    const azp = signAzp(sampleAzp(), { privateKey: author.privateKey });
    for (let i = 50; i < 130; i++) azp[i] ^= 0xff;
    const r = verifyTrust(azp, { keys: [{ publicKey: author.publicKey }] });
    expect(r.ok).toBe(false);
    expect(r.trusted).toBe(false);
  });

  it("transitively trusts an author counter-signed by a trusted registry", () => {
    const author = generateSigningKey();
    const registry = generateSigningKey();
    const signed = signAzp(sampleAzp(), { privateKey: author.privateKey });
    const countersigned = countersign(signed, { registryPrivateKey: registry.privateKey, keyId: "registry" });

    // Host trusts only the registry, not the author directly.
    const r = verifyTrust(countersigned, { keys: [{ publicKey: registry.publicKey, keyId: "registry" }] });
    expect(r.ok).toBe(true);
    expect(r.trusted).toBe(true);
    expect(r.reason).toMatch(/registry/);
    expect(r.viaRegistryPublicKey).toBe(registry.publicKey);
    // The package still verifies (counter-signing doesn't disturb the author signature).
    expect(r.signed).toBe(true);
  });

  it("does not trust a counter-signature from an untrusted registry", () => {
    const author = generateSigningKey();
    const registry = generateSigningKey();
    const otherRegistry = generateSigningKey();
    const signed = signAzp(sampleAzp(), { privateKey: author.privateKey });
    const countersigned = countersign(signed, { registryPrivateKey: registry.privateKey });

    const r = verifyTrust(countersigned, { keys: [{ publicKey: otherRegistry.publicKey }] });
    expect(r.ok).toBe(true);
    expect(r.trusted).toBe(false);
    expect(r.reason).toMatch(/untrusted registry/);
  });

  it("countersign refuses an unsigned package", () => {
    const registry = generateSigningKey();
    expect(() => countersign(sampleAzp(), { registryPrivateKey: registry.privateKey })).toThrow(/unsigned/);
  });

  it("handles a malformed trust store gracefully (no crash)", () => {
    const author = generateSigningKey();
    const azp = signAzp(sampleAzp(), { privateKey: author.privateKey });
    // @ts-expect-error runtime robustness: a null store (e.g. from bad config)
    const r1 = verifyTrust(azp, null);
    expect(r1.ok).toBe(true);
    expect(r1.trusted).toBe(false);
    expect(r1.reason).toMatch(/invalid trust store/);
    // @ts-expect-error runtime robustness: store with no keys array
    const r2 = verifyTrust(azp, {});
    expect(r2.trusted).toBe(false);
    expect(r2.reason).toMatch(/invalid trust store/);
  });

  it("explicitly reports a malformed counter-signature", () => {
    const author = generateSigningKey();
    const signed = signAzp(sampleAzp(), { privateKey: author.privateKey });
    // Inject a counter-signature whose publicKey is not a string.
    const files = unzipSync(signed);
    const sig = JSON.parse(strFromU8(files["signature.json"]!)) as Record<string, unknown>;
    sig.countersignature = { publicKey: 123, signature: "x" };
    files["signature.json"] = strToU8(JSON.stringify(sig));
    const tampered = zipSync(files, { mtime: EPOCH });

    // Store holds an unrelated key so direct trust fails and the counter-signature branch is reached.
    const r = verifyTrust(tampered, { keys: [{ publicKey: generateSigningKey().publicKey }] });
    expect(r.ok).toBe(true);
    expect(r.trusted).toBe(false);
    expect(r.reason).toMatch(/counter-signature is malformed/);
  });
});
