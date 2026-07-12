import { describe, it, expect } from "vitest";
import { unzipSync, zipSync, strToU8 } from "fflate";
import { writeAzp, verifyAzp, signAzp, generateSigningKey } from "../src/index";

const license = "MIT License\n\nCopyright (c) 2026 Az\n";
const base = {
  azphalt: "0.1",
  name: "X",
  version: "1.0.0",
  kind: "asset" as const,
  license: "MIT",
  compat: ">=0.1",
};

function pkg() {
  return writeAzp({
    manifest: { ...base, id: "com.hereliesaz.signed" },
    payload: { "assets/a.bin": new Uint8Array([1, 2, 3]) },
    license,
  }).azp;
}

describe("signing", () => {
  it("an unsigned package verifies with signed=false", () => {
    const r = verifyAzp(pkg());
    expect(r.ok).toBe(true);
    expect(r.signed).toBe(false);
  });

  it("signs a package and verifies the signature", () => {
    const key = generateSigningKey();
    expect(key.privateKey).toContain("BEGIN PRIVATE KEY");
    const signed = signAzp(pkg(), { privateKey: key.privateKey, keyId: "az-1" });

    const r = verifyAzp(signed);
    expect(r.ok).toBe(true);
    expect(r.signed).toBe(true);

    // signature.json is present and carries the key id
    const sig = JSON.parse(new TextDecoder().decode(unzipSync(signed)["signature.json"]));
    expect(sig.alg).toBe("ed25519");
    expect(sig.keyId).toBe("az-1");
  });

  it("fails verification when the manifest is tampered after signing", () => {
    const key = generateSigningKey();
    const signed = signAzp(pkg(), { privateKey: key.privateKey });

    const files = unzipSync(signed);
    const manifest = JSON.parse(new TextDecoder().decode(files["manifest.json"]));
    manifest.name = "Evil"; // change the signed manifest
    files["manifest.json"] = strToU8(JSON.stringify(manifest, null, 2) + "\n");
    const tampered = zipSync(files);

    const r = verifyAzp(tampered);
    expect(r.ok).toBe(false);
    expect(r.errors.some((e) => e.includes("signature verification failed"))).toBe(true);
  });

  it("fails verification when the signature bytes are corrupted", () => {
    const key = generateSigningKey();
    const signed = signAzp(pkg(), { privateKey: key.privateKey });

    const files = unzipSync(signed);
    const sig = JSON.parse(new TextDecoder().decode(files["signature.json"]));
    sig.signature = Buffer.from(new Uint8Array(64)).toString("base64"); // all-zero signature
    files["signature.json"] = strToU8(JSON.stringify(sig, null, 2) + "\n");
    const tampered = zipSync(files);

    expect(verifyAzp(tampered).ok).toBe(false);
  });

  it("still catches payload tampering (digest) on a signed package", () => {
    const key = generateSigningKey();
    const signed = signAzp(pkg(), { privateKey: key.privateKey });

    const files = unzipSync(signed);
    files["assets/a.bin"] = new Uint8Array([9, 9, 9]); // payload changed; manifest (and its signature) intact
    const tampered = zipSync(files);

    const r = verifyAzp(tampered);
    expect(r.ok).toBe(false);
    expect(r.errors.some((e) => e.includes("digest mismatch"))).toBe(true);
  });
});
