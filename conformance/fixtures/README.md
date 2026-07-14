# azphalt conformance fixtures

**Generated — do not edit by hand.** Produced by `@azphalt/conformance` (`src/emit-fixtures.ts`);
regenerate with `pnpm fixtures` (root) or `pnpm --filter @azphalt/conformance emit`. The
`conformance-fixtures` CI job re-runs the generator and fails on any diff, so these bytes stay honest.

## What this is

A language-neutral set of binary `.azp` fixtures plus the expected `verifyAzp` / `verifyTrust`
outcomes, so a host in **any** language (Kotlin, Swift, Rust, …) can assert byte-for-byte conformance
with the `@azphalt/azp` reference — no JavaScript toolchain required. See azphalt issue #32.

## Files

- `*.azp` — the fixtures:
  - `valid-asset.azp`
  - `valid-code-unsigned.azp`
  - `signed-valid.azp`
  - `signed-tampered-manifest.azp`
  - `countersigned-1hop.azp`
  - `unsafe-path.azp`
  - `unlisted-payload.azp`
  - `digest-mismatch.azp`
  - `duplicate-entry.azp`
- `expectations.json` — per fixture: the reference `verify` result (`ok`, `signed`, `errors`), the
  derived `signatureValid`, and the `trust` result (`trusted`, `reason`, …) against `trustStore`.
- `trust-keys.json` — the fixed author/registry public keys (with their constant seeds) and the
  `trustStore` a host loads to reproduce `expectations.json`.

## Determinism

Every fixture is reproducible: signing uses fixed Ed25519 keys derived from constant seeds (never
random keys), and archives ride `@azphalt/azp`'s `EPOCH` timestamp (or a zeroed STORED-zip). Identical
inputs ⇒ identical bytes in every environment — which is what lets CI diff-check them.

## How a non-JS host uses these

1. Load `trust-keys.json` → build a trust store from `trustStore.keys[].publicKey`.
2. For each `*.azp`, run your own verify + trust.
3. Assert your result matches the **semantic** fields of `expectations.json[<file>]`:
   `verify.ok`, `verify.signed`, `signatureValid`, and `trust.trusted` (plus `viaRegistryPublicKey`
   when trusted).

The `errors` and `reason` **strings are the JS reference's diagnostics** — a host in another language
will phrase them differently, and may reject a bad package at a different (earlier) stage. Match on the
booleans, not on the error text.

Note on `duplicate-entry.azp`: it packs two ZIP entries with the same name but different content — a
ZIP-confusion vector. Every conforming host must reject it (`verify.ok === false`). The reference keeps
the last copy and reports a digest mismatch; a hardened host that rejects on the duplicate name itself
is equally conforming. A host that silently keeps the *first* copy and accepts the package is **not**.
