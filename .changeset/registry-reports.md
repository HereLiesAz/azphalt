---
"@azphalt/registry": patch
---

`Registry.report` now refuses a report for a package or version it does not hold (unknown ids used to pile up in storage), the revocation feed uses the registry's injected clock, and prerelease/major/minor/patch comparison uses `BigInt` so identifiers beyond 2^53 no longer compare equal.
