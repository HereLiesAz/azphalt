import { describe, expect, it } from "vitest";
import nacl from "tweetnacl";
import blake from "blakejs";
import { sealedBox } from "../src/index.js";

describe("sealedBox", () => {
  it("opens with the recipient key, as libsodium's crypto_box_seal_open would", () => {
    const recipient = nacl.box.keyPair();
    const sealed = sealedBox(new TextEncoder().encode("sk-secret"), recipient.publicKey);
    const epk = sealed.subarray(0, 32);
    const nonce = blake.blake2b(new Uint8Array([...epk, ...recipient.publicKey]), undefined, 24);
    const opened = nacl.box.open(sealed.subarray(32), nonce, epk, recipient.secretKey);
    expect(opened && new TextDecoder().decode(opened)).toBe("sk-secret");
  });

  it("rejects a malformed key", () => {
    expect(() => sealedBox(new Uint8Array(1), new Uint8Array(31))).toThrow(/32 bytes/);
  });
});
