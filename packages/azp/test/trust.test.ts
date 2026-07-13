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
    expect(r.reason).toMatch(/reaches no trusted key/);
  });

  it("countersign refuses an unsigned package", () => {
    const registry = generateSigningKey();
    expect(() => countersign(sampleAzp(), { registryPrivateKey: registry.privateKey })).toThrow(/unsigned/);
  });

  it("follows a multi-hop counter-signature chain (author ← r1 ← r2), trusting only the top", () => {
    const author = generateSigningKey();
    const r1 = generateSigningKey();
    const r2 = generateSigningKey();
    const signed = signAzp(sampleAzp(), { privateKey: author.privateKey });
    const hop1 = countersign(signed, { registryPrivateKey: r1.privateKey, keyId: "r1" }); // r1 vouches author
    const hop2 = countersign(hop1, { registryPrivateKey: r2.privateKey, keyId: "r2" }); // r2 vouches r1

    // Trust only the top authority r2 — neither the author nor r1 directly.
    const r = verifyTrust(hop2, { keys: [{ publicKey: r2.publicKey, keyId: "r2" }] });
    expect(r.ok).toBe(true);
    expect(r.trusted).toBe(true);
    expect(r.reason).toMatch(/2-hop/);
    expect(r.viaRegistryPublicKey).toBe(r2.publicKey);

    // Trusting the middle link r1 also works (shorter path down the same chain).
    expect(verifyTrust(hop2, { keys: [{ publicKey: r1.publicKey }] }).trusted).toBe(true);
    // Trusting no one in the chain → untrusted but still valid.
    const none = verifyTrust(hop2, { keys: [{ publicKey: generateSigningKey().publicKey }] });
    expect(none.trusted).toBe(false);
    expect(none.reason).toMatch(/reaches no trusted key/);
  });

  it("severs trust when a lower hop of the chain is broken", () => {
    const author = generateSigningKey();
    const r1 = generateSigningKey();
    const r2 = generateSigningKey();
    const signed = signAzp(sampleAzp(), { privateKey: author.privateKey });
    const hop1 = countersign(signed, { registryPrivateKey: r1.privateKey });
    const hop2 = countersign(hop1, { registryPrivateKey: r2.privateKey });

    // Corrupt hop 1's signature (r1→author). Even though r2 (top) is trusted, the broken lower
    // link means the chain no longer connects to the author.
    const files = unzipSync(hop2);
    const sig = JSON.parse(strFromU8(files["signature.json"]!)) as Record<string, any>;
    sig.countersignature.signature = Buffer.from("garbage-signature-bytes-000000000000").toString("base64");
    files["signature.json"] = strToU8(JSON.stringify(sig));
    const tampered = zipSync(files, { mtime: EPOCH });

    const r = verifyTrust(tampered, { keys: [{ publicKey: r2.publicKey }] });
    expect(r.ok).toBe(true);
    expect(r.trusted).toBe(false);
    expect(r.reason).toMatch(/invalid at hop 1/);
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
