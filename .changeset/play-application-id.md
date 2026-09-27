---
"@azphalt/storefront-cmp": minor
"@azphalt/storefront-worker": patch
---

Everything that was `store.azphalt` is now `com.hereliesaz.azphalt`:

- The store app is `com.hereliesaz.azphalt.store`: its application id, namespace and Kotlin package.
- The `.azp` verifier library is `com.hereliesaz.azphalt.azp`.
- The browse intent is `com.hereliesaz.azphalt.action.BROWSE`, in the app and in `spec/store-app.md` and `spec/state-reporting.md`.

The Worker's `PLAY_PACKAGE_NAME` matches the app id.
