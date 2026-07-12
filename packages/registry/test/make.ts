import { writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/sdk";

const LICENSE = "MIT License\n\nCopyright (c) 2026 Az\n";

/** Build real `.azp` bytes for a package, so registry tests exercise the actual container path. */
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
  return writeAzp({
    manifest,
    payload: { "assets/x.bin": new Uint8Array([1, 2, 3]) },
    license: LICENSE,
  }).azp;
}
