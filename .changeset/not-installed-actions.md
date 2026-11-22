---
"@azphalt/web-handoff": patch
"@azphalt/storefront-react": patch
"@azphalt/marketplace": patch
---

Every "not installed" state now offers the button that resolves it. `@azphalt/web-handoff` gains a pure
`requiredActionsFor` / `notInstalledStateFor` / `buttonStateFor` mapping (mirrored in the Compose
storefront), the "no host installed" fallback gets an Install button per host (or a "Find an app" link
when the directory has none), and `isHeld` no longer counts `downloaded` or `failed` as installed.
