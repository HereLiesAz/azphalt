import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createPrivateKey, createPublicKey, sign, verify } from "node:crypto";

/**
 * The signed-package **test vector** (spec/package-format.md § Signing). It pins the two things a
 * second implementation (e.g. GraffitiXR's Kotlin verifier) must match: the signature is Ed25519 over
 * the **exact `manifest.json` bytes, verbatim** — no re-canonicalization — and it is deterministic.
 */
const vector = JSON.parse(
  readFileSync(fileURLToPath(new URL("./vectors/signature-vector.json", import.meta.url)), "utf8"),
) as {
  privateKeyPkcs8Pem: string;
  publicKeySpkiBase64: string;
  manifestJsonUtf8: string;
  signatureBase64: string;
};

describe("signature test vector", () => {
  const manifestBytes = Buffer.from(vector.manifestJsonUtf8, "utf8");

  it("the recorded signature verifies against the public key over the verbatim manifest bytes", () => {
    const pub = createPublicKey({ key: Buffer.from(vector.publicKeySpkiBase64, "base64"), format: "der", type: "spki" });
    expect(verify(null, manifestBytes, pub, Buffer.from(vector.signatureBase64, "base64"))).toBe(true);
  });

  it("is deterministic — re-signing the same bytes reproduces the exact signature", () => {
    const priv = createPrivateKey(vector.privateKeyPkcs8Pem);
    expect(Buffer.from(sign(null, manifestBytes, priv)).toString("base64")).toBe(vector.signatureBase64);
  });

  it("breaks if the manifest bytes are re-serialized — proving there is NO re-canonicalization", () => {
    const pub = createPublicKey({ key: Buffer.from(vector.publicKeySpkiBase64, "base64"), format: "der", type: "spki" });
    // Same JSON *value*, different bytes (whitespace collapsed). A JCS/canonicalizing scheme would
    // still verify; ours signs bytes, so this MUST fail.
    const reserialized = Buffer.from(JSON.stringify(JSON.parse(vector.manifestJsonUtf8)), "utf8");
    expect(verify(null, reserialized, pub, Buffer.from(vector.signatureBase64, "base64"))).toBe(false);
  });
});
