---
"@azphalt/repository-client": minor
---

`RepositoryClient.download` can verify against the version's `fileDigest` (`{ verify: true }`, or pass it as `expectedDigest`). `integrity` is the digest of the unsigned container and never matches a signed download; the docs for `expectedDigest` said to use `digest`, which the store served as `integrity`. The store's detail now publishes `fileDigest` (and `digest` as its alias, absent when unknown). New `RepositoryClient.fileDigest(id, version)`.
