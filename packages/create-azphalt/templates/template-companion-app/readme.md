# My Companion App

An azphalt **companion-app** package (`kind: "app"`) — a header that lets a host (e.g. GraffitiXR,
Guillotine) launch your **Android app or PWA** to perform a function and hand a result back. Your app
runs in the OS's own sandbox with its own permissions; azphalt only standardizes the *handoff*. See the
[Companion Apps spec](https://azphalt.org/specs/companion-app) and the
[companion-host adoption guide](https://azphalt.org/ADOPTION_COMPANION_HOST).

## What's here

- **`manifest.json`** — the only real content. Edit the `app` block:
  - `platforms` — point `android.packageId` / `pwa.shareTargetUrl` at your real app.
  - `handoffs[]` — the functions you offer: the `action`, the `input` you accept, the `output` you
    return (azphalt **assets** and/or structured **params**), and the per-platform `transport`.
- **`build.js`** — packages the header into a `.azp` (no code, no assets — just the manifest + LICENSE).
- **`LICENSE`** — SPDX-identified license text.

## Build

~~~sh
npm install
npm run build      # → my-companion-app-1.0.0.azp
~~~

## Implement the host side

A companion package is inert until a host invokes it. On the host:

- **Android** — launch `transport.android.intentAction` for result with `FLAG_GRANT_READ_URI_PERMISSION`
  on the input; read the result back from the returned content URIs.
- **PWA** — `POST` the input to `transport.pwa.shareTargetUrl`; receive the result via
  `window.opener.postMessage`, accepting it only from the popup you opened, with your issued nonce, from
  the expected origin.

Always show the user OS-style consent before a handoff, and **validate** the returned assets/params
against your declared `output` before using them. The full contract is normative in the spec above.
