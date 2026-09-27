---
"@azphalt/storefront-cmp": minor
"@azphalt/storefront-worker": patch
---

The Android store app is `com.hereliesaz.azphalt.store`: its application id, namespace and Kotlin package all changed from `store.azphalt.storefront`. The Worker's `PLAY_PACKAGE_NAME` is set to match, so Play purchase verification asks Google about the right app.
