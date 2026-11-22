---
"@azphalt/web-handoff": patch
"@azphalt/storefront-react": patch
"@azphalt/marketplace": patch
---

Every "not installed" state now offers the button that resolves it. `@azphalt/web-handoff` gains a pure
`requiredActionsFor` / `notInstalledStateFor` / `buttonStateFor` mapping (mirrored in the Compose
storefront), the "no host installed" fallback gets an Install button per host (and, with no listed host, says so
and offers only Download and Retry), a failed install is always retried as an install (never sent back
through checkout), and `isHeld` no longer counts `downloaded` or `failed` as installed.
