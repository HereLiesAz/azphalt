import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  AUTHOR_KEY,
  REGISTRY_KEY,
  TRUST_STORE,
  conformanceFixtures,
  countersigned1hopAzp,
  evaluateFixture,
  signedValidAzp,
} from "../src/fixtures";

/**
 * Guards the language-neutral conformance fixtures (issue #32): the committed `conformance/fixtures/`
 * artifacts must equal what the generator produces right now, and the generator must be deterministic.
 * This is the local mirror of the `conformance-fixtures` CI diff-check — if it fails, run `pnpm fixtures`.
 */

function repoRoot(): string {
  let dir = dirname(fileURLToPath(import.meta.url));
  for (let i = 0; i < 10; i++) {
    if (existsSync(join(dir, "pnpm-workspace.yaml"))) return dir;
    const up = dirname(dir);
    if (up === dir) break;
    dir = up;
  }
  throw new Error("could not locate the workspace root");
}

const FIXTURES_DIR = join(repoRoot(), "conformance", "fixtures");

describe("conformance fixtures (issue #32)", () => {
  it("uses fixed keys and signs deterministically (no random keys, EPOCH archives)", () => {
    expect(AUTHOR_KEY.seedHex).toBe("01".repeat(32));
    expect(REGISTRY_KEY.seedHex).toBe("02".repeat(32));
    // Re-building the signed/counter-signed packages yields byte-identical output.
    expect(Buffer.from(signedValidAzp())).toEqual(Buffer.from(signedValidAzp()));
    expect(Buffer.from(countersigned1hopAzp())).toEqual(Buffer.from(countersigned1hopAzp()));
  });

  it("committed .azp bytes match the generator (run `pnpm fixtures` if this fails)", () => {
    for (const fx of conformanceFixtures()) {
      const path = join(FIXTURES_DIR, `${fx.name}.azp`);
      expect(existsSync(path), `missing ${fx.name}.azp — run \`pnpm fixtures\``).toBe(true);
      expect(new Uint8Array(readFileSync(path)), `${fx.name}.azp is stale`).toEqual(fx.bytes);
    }
  });

  it("committed expectations.json matches a fresh reference evaluation", () => {
    const doc = JSON.parse(readFileSync(join(FIXTURES_DIR, "expectations.json"), "utf8"));
    expect(doc.trustStore).toEqual(TRUST_STORE);
    for (const fx of conformanceFixtures()) {
      const expected = { description: fx.description, ...evaluateFixture(fx.bytes) };
      expect(doc.fixtures[`${fx.name}.azp`], `${fx.name} expectation is stale`).toEqual(expected);
    }
  });

  it("trust-keys.json publishes the fixed keys and a registry-only trust store", () => {
    const tk = JSON.parse(readFileSync(join(FIXTURES_DIR, "trust-keys.json"), "utf8"));
    expect(tk.author.publicKey).toBe(AUTHOR_KEY.publicKey);
    expect(tk.registry.publicKey).toBe(REGISTRY_KEY.publicKey);
    expect(tk.trustStore.keys.map((k: { publicKey: string }) => k.publicKey)).toEqual([REGISTRY_KEY.publicKey]);
  });

  it("the fixture set exercises both trust branches", () => {
    const byName = Object.fromEntries(conformanceFixtures().map((f) => [f.name, evaluateFixture(f.bytes)]));
    // signed but author untrusted; counter-signed → trusted via registry.
    expect(byName["signed-valid"].trust.trusted).toBe(false);
    expect(byName["countersigned-1hop"].trust.trusted).toBe(true);
    expect(byName["countersigned-1hop"].trust.viaRegistryPublicKey).toBe(REGISTRY_KEY.publicKey);
    // every adversarial fixture is rejected.
    for (const n of ["signed-tampered-manifest", "unsafe-path", "unlisted-payload", "digest-mismatch", "duplicate-entry"]) {
      expect(byName[n].verify.ok, `${n} should be rejected`).toBe(false);
    }
  });
});
