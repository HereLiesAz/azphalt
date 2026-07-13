/**
 * The azphalt trust model (`spec/package-format.md` § Signing). {@link verifyAzp} answers "is this
 * signature internally consistent?" — tamper-evidence. This answers the *identity* question: "does
 * the signer's key belong to someone this host trusts?"
 *
 * A host holds a {@link TrustStore} of trusted Ed25519 public keys. A package is **trusted** when
 * either (a) its signer key is directly in the store, or (b) its signer key was counter-signed by a
 * **registry** key that is in the store — transitive trust, so a host can trust a registry once
 * instead of every author. Key distribution is out-of-band (the host/registry decides); this module
 * only enforces the cryptography.
 */
import { createPrivateKey, createPublicKey, sign as cryptoSign, verify as cryptoVerify } from "node:crypto";
import { strToU8, strFromU8, unzipSync, zipSync } from "fflate";
import { EPOCH, verifyAzp, readAzp } from "./index.js";
import type { AzpSignature, AzpCountersignature } from "./sign.js";

/** A public key a host trusts, either as a direct author key or as a registry key. */
export interface TrustedKey {
  /** Base64 SPKI public key — the cryptographic identity. */
  publicKey: string;
  /** Optional human label / key id (informational; trust matches on `publicKey`). */
  keyId?: string;
  label?: string;
}

/** The set of keys a host trusts. */
export interface TrustStore {
  keys: TrustedKey[];
}

export interface TrustResult {
  /** Internally valid: integrity + a well-formed, cryptographically-valid signature (from {@link verifyAzp}). */
  ok: boolean;
  /** The package carries a `signature.json`. */
  signed: boolean;
  /** The signer is trusted per the store (directly, or via a trusted registry counter-signature). */
  trusted: boolean;
  /** How trust was (or wasn't) established. */
  reason: string;
  /** The signer's base64 SPKI public key, when signed. */
  signerPublicKey?: string;
  /** The signer's `keyId`, when present. */
  signerKeyId?: string;
  /** When trust came transitively, the registry key that vouched for the signer. */
  viaRegistryPublicKey?: string;
}

function parseSignature(azp: Uint8Array): AzpSignature | null {
  const { payload } = readAzp(azp);
  const raw = payload["signature.json"];
  if (!raw) return null;
  return JSON.parse(strFromU8(raw)) as AzpSignature;
}

/**
 * Verify a `.azp` against a {@link TrustStore}: first internal consistency (via {@link verifyAzp}),
 * then whether the signer's key is trusted — directly, or through a registry counter-signature by a
 * key in the store.
 */
export function verifyTrust(azp: Uint8Array, store: TrustStore): TrustResult {
  const v = verifyAzp(azp);
  if (!v.ok) {
    return { ok: false, signed: v.signed, trusted: false, reason: `invalid package: ${v.errors.join("; ")}` };
  }
  if (!v.signed) {
    return { ok: true, signed: false, trusted: false, reason: "unsigned: no signer to trust" };
  }

  let sig: AzpSignature | null;
  try {
    sig = parseSignature(azp);
  } catch (e) {
    return { ok: true, signed: true, trusted: false, reason: `signature unreadable: ${(e as Error).message}` };
  }
  if (!sig) return { ok: true, signed: false, trusted: false, reason: "unsigned: no signer to trust" };

  const base = {
    ok: true as const,
    signed: true as const,
    signerPublicKey: sig.publicKey,
    signerKeyId: sig.keyId,
  };
  // The store may come from user config; guard against null/malformed input rather than throwing.
  const keys = store?.keys;
  if (!Array.isArray(keys)) {
    return { ...base, trusted: false, reason: "invalid trust store: keys list is missing or malformed" };
  }
  const trustedKeys = new Set(keys.map((k) => k?.publicKey).filter(Boolean));

  // (a) Direct trust: the signer key is in the store.
  if (sig.publicKey && trustedKeys.has(sig.publicKey)) {
    return { ...base, trusted: true, reason: "signer key is directly trusted" };
  }

  // (b) Transitive trust: walk the counter-signature chain from the author up. Each link's key
  // vouches (signs) for the key below it — the author at the base, then each previous counter-signer.
  // Trusted as soon as a link's key is in the store, provided every hop's signature down to it
  // verifies (a broken lower link severs the chain).
  let vouchedKey = sig.publicKey; // base64 SPKI of the key this hop vouches for
  let cs = sig.countersignature;
  let hop = 0;
  while (cs) {
    hop++;
    if (typeof cs.publicKey !== "string" || typeof cs.signature !== "string") {
      return { ...base, trusted: false, reason: `counter-signature is malformed at hop ${hop}` };
    }
    let valid: boolean;
    try {
      const pub = createPublicKey({ key: Buffer.from(cs.publicKey, "base64"), format: "der", type: "spki" });
      valid =
        pub.asymmetricKeyType === "ed25519" &&
        cryptoVerify(null, Buffer.from(vouchedKey, "base64"), pub, Buffer.from(cs.signature, "base64"));
    } catch (e) {
      return { ...base, trusted: false, reason: `counter-signature error at hop ${hop}: ${(e as Error).message}` };
    }
    if (!valid) return { ...base, trusted: false, reason: `counter-signature invalid at hop ${hop}` };
    if (trustedKeys.has(cs.publicKey)) {
      return {
        ...base,
        trusted: true,
        reason: hop === 1 ? "signer counter-signed by a trusted registry" : `signer trusted via a ${hop}-hop counter-signature chain`,
        viaRegistryPublicKey: cs.publicKey,
      };
    }
    vouchedKey = cs.publicKey;
    cs = cs.countersignature;
  }

  return {
    ...base,
    trusted: false,
    reason: sig.countersignature ? "counter-signature chain reaches no trusted key" : "signer key is not in the trust store",
  };
}

export interface CountersignOptions {
  /** PKCS8 PEM private key of the registry (from {@link generateSigningKey}). */
  registryPrivateKey: string;
  /** Optional registry key id recorded in the counter-signature. */
  keyId?: string;
}

/**
 * Counter-sign an already-signed `.azp`: an authority vouches for the current leaf of the trust
 * chain by signing that key's SPKI public-key bytes. The first counter-signature vouches for the
 * author; a further one vouches for the previous counter-signer, extending the chain (web of trust).
 * The author's signature (over `manifest.json`) is untouched, so integrity still verifies. Returns
 * new `.azp` bytes; the input is not mutated.
 */
export function countersign(azp: Uint8Array, opts: CountersignOptions): Uint8Array {
  const files = unzipSync(azp);
  const sigRaw = files["signature.json"];
  if (!sigRaw) throw new Error("azp: cannot counter-sign an unsigned package (no signature.json)");
  const sig = JSON.parse(strFromU8(sigRaw)) as AzpSignature;
  if (sig.alg !== "ed25519" || typeof sig.publicKey !== "string") {
    throw new Error("azp: signature.json is malformed");
  }

  const key = createPrivateKey(opts.registryPrivateKey);
  if (key.asymmetricKeyType !== "ed25519") throw new Error("azp: registryPrivateKey must be an ed25519 key");

  // Find the deepest existing link; the new counter-signature vouches for its key (the author's if
  // there is no chain yet) and attaches above it.
  let parent: { publicKey: string; countersignature?: AzpCountersignature } = sig;
  while (parent.countersignature) parent = parent.countersignature;

  const vouchesFor = Buffer.from(parent.publicKey, "base64");
  const signature = cryptoSign(null, vouchesFor, key);
  const registryPublicKey = Buffer.from(createPublicKey(key).export({ type: "spki", format: "der" })).toString("base64");

  parent.countersignature = {
    publicKey: registryPublicKey,
    signature: Buffer.from(signature).toString("base64"),
    ...(opts.keyId ? { keyId: opts.keyId } : {}),
  };

  const entries: Record<string, Uint8Array> = {
    ...files,
    "signature.json": strToU8(JSON.stringify(sig, null, 2) + "\n"),
  };
  const sorted: Record<string, Uint8Array> = {};
  for (const k of Object.keys(entries).sort()) sorted[k] = entries[k];
  return zipSync(sorted, { mtime: EPOCH });
}

/** Convenience: a registry key is just an Ed25519 key. Re-exported for symmetry with signing. */
export { generateSigningKey } from "./sign.js";
export type { SigningKey } from "./sign.js";
