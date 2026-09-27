---
"@azphalt/storefront-cmp": minor
"@azphalt/storefront-worker": patch
---

The Android store app's application id is now `com.hereliesaz.azphalt.store`, its Play package name, and the Worker's `PLAY_PACKAGE_NAME` var is set to match, so Play purchase verification asks Google about the right app. The Kotlin namespace is unchanged.
