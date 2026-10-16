---
"@azphalt/storefront": minor
---

Make the catalog gate check what is actually served:

- `build-catalog --check` now reads every committed `registry/packages/*.azp` and requires it to verify, to carry a signature when the catalog says it is signed, to match the recorded size, and — with its signature set aside — to re-pack to exactly the pinned unsigned digest. Before, it compared only the index and the lockfile, so swapping any `.azp` for different bytes left it green.
- A full build validates every output filename **before** deleting `registry/packages/` (a bad version string used to leave the directory empty while `catalog.json` still listed everything).
- Each package is run through the real `.azp` verifier before it is signed with the store key; tarball member names are checked for traversal and the extracted tree is size-bounded; `--only` with no value is an error instead of silently building everything; the catalog's `signed` flag now reflects whether every package is actually signed.
- `build-previews` uses a fresh scratch directory per run (cleaned afterwards) instead of a shared predictable `/tmp` path, refuses unsafe payload paths, reports unrenderable packages as CI warnings (`--strict` makes them fatal), and no longer swallows motion-preset parse errors.
