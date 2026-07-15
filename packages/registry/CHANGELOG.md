# @azphalt/registry

## 0.2.0

### Minor Changes

- c79dec0: Export the download authorizers — `DownloadAuthorizer`, `AuthDecision`, `AuthInput`,
  `InMemoryAuthorizer`, `EntitlementAuthorizer`, and `denyAllAuthorizer`.

  These previously lived inside the reference server, so nothing else could gate paid downloads
  without reimplementing them. They sit next to `issueEntitlement`/`verifyEntitlement`, which they
  already depended on, and the verdict they return (`{authenticated, licensed}`) is transport-agnostic
  — mapping it to `401`/`402` stays each server's job.

  Additive: no existing export changed. `@azphalt/repository-server` re-exports them from here, so its
  public surface is unchanged.
