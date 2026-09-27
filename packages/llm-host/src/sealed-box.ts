/**
 * libsodium `crypto_box_seal`, which is how GitHub requires Actions secrets to be encrypted: an
 * ephemeral X25519 key pair, nonce = BLAKE2b-192(ephemeralPk ‖ recipientPk), and the output
 * ephemeralPk ‖ crypto_box(message). tweetnacl supplies crypto_box; blakejs the nonce hash.
 */
import nacl from "tweetnacl";
import blake from "blakejs";

function concat(a: Uint8Array, b: Uint8Array): Uint8Array {
  const out = new Uint8Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
}

export function sealedBox(message: Uint8Array, recipientPublicKey: Uint8Array): Uint8Array {
  if (recipientPublicKey.length !== nacl.box.publicKeyLength) throw new Error("recipient key must be 32 bytes");
  const ephemeral = nacl.box.keyPair();
  const nonce = blake.blake2b(concat(ephemeral.publicKey, recipientPublicKey), undefined, nacl.box.nonceLength);
  return concat(ephemeral.publicKey, nacl.box(message, nonce, recipientPublicKey, ephemeral.secretKey));
}
