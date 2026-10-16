/**
 * `build-catalog --check` must look at the .azp files a deployment serves, not just the catalog index.
 * These run the same per-file check over the committed registry, and prove it notices a swapped file.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readAzp, writeAzp } from "@azphalt/azp";
import { committedFileProblem } from "../scripts/build-catalog";

const registry = join(dirname(fileURLToPath(import.meta.url)), "..", "registry");
const catalog = JSON.parse(readFileSync(join(registry, "catalog.json"), "utf8")) as {
  signed: boolean;
  packages: { id: string; integrity: string; file: string; bytes: number }[];
};

describe("committedFileProblem", () => {
  it("accepts every committed package against its catalog entry", () => {
    const problems = catalog.packages
      .map((p) => [p.id, committedFileProblem(join(registry, "packages", p.file), p, catalog.signed)] as const)
      .filter(([, problem]) => problem);
    expect(problems).toEqual([]);
  });

  it("notices a package swapped for a different but self-consistent one", () => {
    // The nastier case: not corruption, a well-formed replacement. It verifies on its own, so only the
    // comparison against the pinned unsigned digest can catch it.
    const entry = catalog.packages[0];
    const { manifest, payload } = readAzp(new Uint8Array(readFileSync(join(registry, "packages", entry.file))));
    const { files: _f, ...clean } = manifest;
    const { LICENSE, "signature.json": _s, ...rest } = payload;
    const target = Object.keys(rest)[0];
    const swapped = writeAzp({
      manifest: clean,
      payload: { ...rest, ...(target ? { [target]: new TextEncoder().encode("TROJAN") } : {}) },
      license: new TextDecoder().decode(LICENSE),
    }).azp;
    const tmp = join(dirname(fileURLToPath(import.meta.url)), ".swapped.azp");
    writeFileSync(tmp, swapped);
    try {
      expect(committedFileProblem(tmp, { integrity: entry.integrity }, false)).toMatch(/re-packs to/);
    } finally {
      rmSync(tmp, { force: true });
    }
  });

  it("notices a size that disagrees with the catalog", () => {
    const entry = catalog.packages[0];
    expect(committedFileProblem(join(registry, "packages", entry.file), { integrity: entry.integrity, bytes: entry.bytes + 1 }, false)).toMatch(/bytes/);
  });
});
