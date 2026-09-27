---
"@azphalt/storefront-worker": minor
"@azphalt/storefront-react": minor
---

The Worker's remaining Repository API gaps are filled:

- **Revocations.** Moderators can yank a version, directly or by resolving a report, from the `/moderation` page. It goes on `/revocations`, drops out of listings, shows `yanked: true` in its detail, and its download answers `404`.
- **Install counts.** Every full download carries an `azphalt-report-token`, and `POST /installs` counts installs and uninstalls against those tokens and their receipts. Free downloads are now streamed from the git catalog so the token can ride along.
- **Play purchases.** `POST /entitlements/play` verifies one-time purchases with the Android Publisher API through a service account (RS256 JWT over WebCrypto) and issues the store-signed entitlement. It answers `501` until `PLAY_PACKAGE_NAME` and `PLAY_SERVICE_ACCOUNT_JSON` are set.

The privacy policy now describes install counts and Play verification as they are.
