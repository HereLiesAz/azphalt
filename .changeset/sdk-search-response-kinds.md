---
"@azphalt/azdk": patch
---

`PackageSearchResponse` from the public entry point now carries the widened `PackageSummary`, so search pages can hold `workflow` and `role` packages. Fixes the `@azphalt/repository-server` type error.
