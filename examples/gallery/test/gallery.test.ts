import { describe, it, expect } from "vitest";
import { writeAzp, verifyAzp, readAzp } from "@azphalt/azp";
import { runFilter, runTool, runCommand } from "@azphalt/runtime-wasm";
import { EXAMPLES } from "../src/index";
import { MIT_LICENSE } from "../src/shared";

/** Package one example into `.azp` bytes the same way the build does. */
function pack(ex: (typeof EXAMPLES)[number]) {
  return writeAzp({ manifest: ex.manifest, payload: ex.payload ?? {}, license: ex.license ?? MIT_LICENSE }).azp;
}

describe("example gallery", () => {
  it("has a unique slug and id per example", () => {
    const slugs = EXAMPLES.map((e) => e.slug);
    const ids = EXAMPLES.map((e) => e.manifest.id);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(ids).size).toBe(ids.length);
  });

  for (const ex of EXAMPLES) {
    it(`${ex.slug} → a valid, well-formed .azp`, () => {
      const azp = pack(ex);
      const v = verifyAzp(azp);
      expect(v.ok, v.errors.join("; ")).toBe(true);

      const { manifest } = readAzp(azp);
      expect(manifest.id).toBe(ex.manifest.id);
      expect(["asset", "code", "mixed"]).toContain(manifest.kind);

      // Bundled asset paths must exist in the payload; remote assets (empty path) must not.
      for (const a of manifest.assets ?? []) {
        if (a.path) {
          expect(manifest.files[a.path], `${a.path} missing from files`).toBeTruthy();
        } else {
          expect(a.remoteUrl, `${ex.slug}: an asset with empty path must carry a remoteUrl`).toBeTruthy();
        }
      }
    });
  }

  for (const ex of EXAMPLES.filter((e) => e.run)) {
    it(`${ex.slug} runs against the sandbox`, async () => {
      const azp = pack(ex);
      const c = ex.manifest.contributes ?? {};
      const runner = c.filters?.length ? runFilter : c.tools?.length ? runTool : runCommand;
      const result = await runner(azp, ex.run!.world);
      ex.run!.assert(result);
    });
  }
});
