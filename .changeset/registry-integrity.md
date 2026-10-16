---
"@azphalt/registry": minor
"@azphalt/submit-check": minor
"@azphalt/repository-server": patch
"@azphalt/azp": patch
---

Close the registry's package-takeover and payout holes (spec/repository-api.md § 9):

- **Publish requires a signature and pins the publisher key.** `Registry.publish` rejects an unsigned package (new `requireSignature`, default `true`), rejects a version signed by a key other than the one that first published the id (`enforcePublisherPinning`, default `true`), rejects a revoked key up front, and rejects a version that collides in precedence with an existing one (`1.0.0+evil` next to `1.0.0`). Package ids are lowercase-only so case variants can't squat.
- **Quarantine actually removes a package.** `latest()` no longer falls back to a yanked version, so a fully-yanked (auto-quarantined) package stops resolving, serving, browsing, and searching.
- **A listing can't be re-pointed at another seller.** `listForSale` rejects a different `sellerId` on an already-listed package, which closes the payout hijack.
- **Subscription entitlements must expire.** A `subscription` without `expiresAt` can no longer be issued, and verifies as not live if one is presented.
- **Sweep.** The secret scan strips every `${input:…}` placeholder and judges what's left (so `sk-live-abc${input:x}` is blocked while `Bearer ${input:x}` passes), no longer skips every nested object named `files`, and `storage` (deferred in 0.1) is no longer an accepted capability.
- **submit-check matches the registry gate**: official SemVer grammar, lowercase ids, and it now runs the same security sweep so a bad submission fails at the PR, not at publish.
- The reference server signs its demo seed. The unsafe-path error text stays byte-stable (`unsafe path: <path>`) because the conformance fixtures other hosts vendor pin it.
