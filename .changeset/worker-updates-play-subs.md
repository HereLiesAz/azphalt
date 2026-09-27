---
"@azphalt/storefront-worker": minor
---

The store Worker answers `POST /updates` (`spec/repository-api.md` § 6), the batch update check. It lists only installed ids whose served, non-yanked version is newer by semver precedence.

`POST /entitlements/play` now verifies subscription listings through `purchases.subscriptionsv2` instead of answering `501`. An active (or grace-period) subscription gets a store-signed `kind: "subscription"` entitlement that expires with the current period. It is issued to the base order id, so renewals keep one subject, and the subscription is acknowledged.
