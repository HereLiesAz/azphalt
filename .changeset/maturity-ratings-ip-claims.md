---
"@azphalt/azdk": minor
"@azphalt/registry": minor
---

Marketplace integrity & discovery: content-maturity age-gating, user ratings, developer IP claims, and clone detection beyond exact copies.

- **`Manifest.maturity` / `PackageSummary.maturity`** (`general` | `mature`) — a developer content-maturity self-attestation that travels in the manifest and projects onto the summary, for a store to put 18+ listings behind an age gate.
- **`Registry.rate(id, stars)`** + optional **`RegistryStore.addRating`** — record a 1–5 star user rating folded into the aggregate `getRating` returns.
- **`ip-claim` report reason** + `Report.originalPackageId` / `Report.reporter` — a developer / rights-holder IP claim lane (a claim signed by the original's publisher key is trusted).
- **`packageSimilarity` / `SimilarityEvidence`** and a new `clone-shape` publish flag — catch reimplemented clones (same shape + fuzzy name/description) that share no bytes, not just exact asset copies.
