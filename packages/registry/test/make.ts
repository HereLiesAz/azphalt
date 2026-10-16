import { writeAzp, signAzp, generateSigningKey, type SigningKey } from "@azphalt/azp";
import type { Manifest } from "@azphalt/azdk";

const LICENSE = "MIT License\n\nCopyright (c) 2026 Az\n";

// One deterministic signing key per package id, so repeated versions of the same id sign with the
// same key (publisher pinning passes) while different ids get different keys. The registry now
// requires a signature at publish, so fixtures must be signed.
const keysById = new Map<string, SigningKey>();
function keyFor(id: string): SigningKey {
  let k = keysById.get(id);
  if (!k) {
    k = generateSigningKey();
    keysById.set(id, k);
  }
  return k;
}

/** Build real signed `.azp` bytes for a package, so registry tests exercise the actual container path. */
export function makeAzp(
  id: string,
  version: string,
  extra: Partial<Omit<Manifest, "files" | "id" | "version">> = {},
): Uint8Array {
  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id,
    name: extra.name ?? id.split(".").pop()!,
    version,
    kind: extra.kind ?? "asset",
    license: extra.license ?? "MIT",
    compat: extra.compat ?? ">=0.1",
    ...extra,
  };
  const unsigned = writeAzp({
    manifest,
    payload: { "assets/x.bin": new Uint8Array([1, 2, 3]) },
    license: LICENSE,
  }).azp;
  return signAzp(unsigned, { privateKey: keyFor(id).privateKey });
}
