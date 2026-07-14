# Companion apps (`kind: "app"`) — RFC

*Status: **Proposed** (design RFC, not yet normative). Extends the package model with a third kind — a
**companion app** (an Android app or PWA) a host launches to perform a function and hand a result back.
This document settles the design; the SDK `Kind`/manifest wiring and a reference host handoff land once
it's accepted.*

## Why this exists — and why it doesn't break the moat

azphalt's core guarantee (the *moat*) is that an extension is **sandboxed and powerless**: a `code`
extension has no camera, no sensors, no network, no filesystem outside its package, and no reach into
the host engine (see `capability-model.md`). An **Android app or a PWA is the opposite** — a full
OS-level application with its own permissions. So a companion app **cannot be an azphalt-sandboxed
extension**, and this RFC does not try to make it one.

Instead it standardizes a **handoff**: the host launches the companion, the companion does its work in
**the OS's own sandbox** (with permissions the user granted *to that app*, never to azphalt), and it
returns a **declared result** the host validates and ingests. The moat holds because:

- azphalt grants the companion **nothing** — the OS governs its powers, exactly as for any app the user
  installs. No azphalt capability crosses the boundary.
- The host **never runs the companion's code**; it hands off a declared input over an OS transport and
  receives a declared output. There is no shared address space, no ambient authority.
- The host **validates the returned bytes/values** against the declared output contract before using
  them (verify type, size, and — for assets — the wire format). A malicious companion can return junk,
  never reach *into* the host.
- The user gives **explicit, OS-style consent** ("this opens **the app**, a separate app with its own
  permissions") before any handoff — the same trust gesture as a system share sheet.

The result: the marketplace grows from *assets + sandboxed filters* to *assets + filters + full
companion apps* — a specialized AR-capture app returns a stencil to GraffitiXR; an audio-mastering PWA
returns a processed track to Guillotine — **without** widening what a sandboxed extension can do.

## The package (`kind: "app"`)

A companion-app package is a normal signed `.azp` whose `kind` is `"app"`. It carries **no `/code`
sandbox payload** and **no host capabilities** — it is a *manifest header* describing how to install and
invoke an external app. Its manifest adds one block, `app`:

~~~jsonc
{
  "azphalt": "0.1",
  "id": "com.acme.ar-stencil-capture",
  "name": "AR Stencil Capture",
  "version": "1.0.0",
  "kind": "app",
  "license": "MIT",
  "compat": ">=0.1",
  "targetApps": ["com.hereliesaz.graffitixr"],   // usually app-scoped (see repository-api.md § App scoping)
  "app": {
    "platforms": {
      "android": {
        "packageId": "com.acme.arstencil",         // Play package id (for install + intent target)
        "minSdk": 29,
        "minVersionCode": 120,                      // version floor: installed app must be >= this (see § Versioning)
        "install": "https://play.google.com/store/apps/details?id=com.acme.arstencil"
      },
      "pwa": {
        "manifestUrl": "https://arstencil.acme.com/manifest.webmanifest",  // for install only
        "startUrl": "https://arstencil.acme.com/",
        "version": "2026-06-01T00:00:00Z",                                 // deployment-datetime floor (see § Versioning)
        "shareTargetUrl": "https://arstencil.acme.com/handoff"             // host POSTs input here — no CORS manifest fetch
      }
    },
    "handoffs": [ /* … see below … */ ]
  },
  "files": { /* only the manifest + LICENSE + any preview; no code payload */ }
}
~~~

At least one `platforms` entry is REQUIRED. A host uses the platform it runs on (an Android host reads
`android`, a web host reads `pwa`); a package MAY offer both so one listing serves both. Installation is
the platform's own (Play Store install, PWA `beforeinstallprompt` / add-to-home-screen) — azphalt does
not distribute the app binary, only the header that points to it and describes the handoff.

## The handoff contract

A **handoff** is one function the companion offers the host. Each entry declares what the host sends,
what comes back, and the transport per platform:

~~~jsonc
{
  "id": "capture-stencil",
  "action": "capture",                    // the host action this registers (open vocabulary; see below)
  "name": "Capture AR Stencil",
  "input":  { "assets": ["image"], "params": { "wallWidthMm": "number?" } },
  "output": { "assets": ["vector", "image"], "params": { "scaleMm": "number?" } },
  "transport": {
    "android": { "intentAction": "com.acme.arstencil.CAPTURE", "resultMimeTypes": ["image/svg+xml", "image/png"] },
    "pwa": { "shareTargetUrl": "https://arstencil.acme.com/handoff/capture", "return": { "kind": "postMessage" } }
  }
}
~~~

- **`action`** — the semantic hook the companion registers on the host (e.g. `capture`, `edit-image`,
  `generate`, `enhance`). Open vocabulary; a small blessed set is proposed under *Blessed actions* so a
  host can slot a companion into the right menu. A host surfaces the handoff wherever that action lives
  (a "Capture from…" entry, an "Edit in…" affordance).
- **`input`** — what the host hands off: `assets` (a list of asset `types` from `package-format.md §
  Assets`, delivered in their pinned wire format) and/or `params` (a small JSON object of typed values;
  `"number?"` marks an optional field). The host provides exactly this and nothing more — it decides
  what leaves the host.
- **`output`** — what the companion returns: `assets` (normalized azphalt assets the host ingests +
  **validates** exactly like any `.azp` asset — verify the wire format, bounds, and size) **and/or**
  `params` (typed structured data the host consumes — e.g. a detected color, coordinates, a chosen
  scale). Per the accepted design, **both assets and structured params are allowed**, together or alone.
- **`transport`** — the per-platform mechanics (below). A handoff MUST declare the transport for every
  platform its package lists.

A host reads the contract to decide, *before* launching, whether it can honor the handoff (does it
understand the input assets it must produce and the output assets it must ingest?) and to render the
right consent + result-handling.

### Return semantics
Three return shapes are supported (a handoff's `output` + `transport.*.return` selects one):

- **`result`** — a round-trip: the companion returns assets and/or params to the host. The default.
- **`params-only`** — the companion returns only structured data (no asset bytes).
- **`fire-and-forget`** — the host launches the companion with the input and expects **no** return
  (handoff `output` omitted). Useful for "open this in the app" where the user continues in the companion.

The host always treats a returned asset as **untrusted input**: verify its declared wire format and size
before ingesting, and never execute it. Returned `params` are validated against the declared shape;
unknown keys are ignored.

## Transports

### Android (clean round-trip)
Android gives a true synchronous result, so it is the reference transport:

1. The host builds an `Intent` with `transport.android.intentAction`, attaches the input assets as
   content URIs (`EXTRA_STREAM` / clip data, `image/*` etc.) and the input `params` as typed extras,
   and launches it **for result** (`startActivityForResult` / the Activity Result API). The host MUST
   set **`Intent.FLAG_GRANT_READ_URI_PERMISSION`** on the outgoing intent — without it the companion
   hits a `SecurityException` opening the input content URIs across the app boundary.
2. The companion (a normal Android app holding whatever runtime permissions the user granted it) does
   its work and returns via `setResult(RESULT_OK, resultIntent)` — output assets as content URIs whose
   MIME types are in `resultMimeTypes`, output params as result extras. The companion likewise MUST set
   **`FLAG_GRANT_READ_URI_PERMISSION`** on the result intent so the host can read the returned URIs.
3. The host reads the result, **verifies** each returned asset against the declared `output` wire format
   and a size cap, and ingests it. `RESULT_CANCELED` (or a timeout) is a clean no-op.

The host must show the OS-app consent before step 1 and treat a missing target app as "install first"
(deep-link to `platforms.android.install`).

### PWA (the return-path is the hard part)
The web has clean ways to send input *in* but no synchronous "return to caller", so the return path is
designed explicitly, around two browser realities: a companion PWA runs on **its own origin**, and
cross-origin fetch/`blob:` access is blocked.

- **Input** — the host opens the companion as a **popup** (a window it holds a handle to) at the
  handoff's declared share endpoint, and delivers the input via a **Web Share Target**-style `POST`
  (input assets as `multipart/form-data`, params as form fields). The share endpoint is declared
  **directly in the manifest** — `platforms.pwa.shareTargetUrl` (and/or per-handoff
  `transport.pwa.shareTargetUrl`) — so the host never has to fetch and parse the PWA's
  `manifest.webmanifest` cross-origin (which CORS would block). `manifestUrl`/`startUrl` remain only
  for *install*.
- **Return** — the companion posts the result back to the host with **`window.opener.postMessage`**,
  using structured clone (which transfers `Blob`/`File`/`ArrayBuffer` **by value**, sidestepping the
  Same-Origin Policy that makes a companion-origin `blob:` URL unreadable to the host):
  - `postMessage` — the companion calls `window.opener.postMessage({ nonce, params, assets }, hostOrigin, transfer)`.
    Assets travel as transferable `ArrayBuffer`s / `Blob`s — **not** as `blob:` URLs (those are bound to
    the companion's origin and would fail cross-origin).
  - `fire-and-forget` — no return (the `fire-and-forget` shape).

#### The `postMessage` handshake (normative)

The return message is the one place a hostile page could try to inject bytes, so the handshake is
pinned down. All four of these are MUSTs; a host that skips any one MUST NOT accept the return.

1. **Nonce issuance.** Before opening the popup the host generates a **single-use** nonce — ≥128 bits
   from a CSP RNG (`crypto.getRandomValues`) — and delivers it to the companion **in the input `POST`**
   (a hidden form field / part), never in the URL (which leaks via `Referer`, history, and logs). The
   host keeps the nonce in memory keyed to *this* popup handle and **consumes it on first use**: a
   second message bearing the same nonce is dropped. The nonce **expires** with the handoff (below), so
   a leaked nonce is useless after the window closes.
2. **Origin binding.** The host computes the companion's expected origin from the *declared*
   `shareTargetUrl` (its scheme + host + port) and accepts the message **only** when
   `event.origin === expectedOrigin` **and** `event.source === theOpenedPopup` (the window reference it
   holds). It never trusts an origin carried *inside* the message body. `expectedOrigin` MUST be a real
   origin (an `https:` URL); a wildcard is not permitted.
3. **Transferable lifetime.** Assets cross as transferable `ArrayBuffer`s / `Blob`s in the message's
   `transfer` list — **by value**, so ownership moves to the host and the companion's copy is neutered.
   The host **copies the bytes into its own buffers immediately** on receipt (before any `await`), then
   validates format/bounds/size; it MUST NOT hold a live reference into companion-owned memory or a
   companion-origin `blob:` URL (which the SOP makes unreadable and whose lifetime the companion
   controls). Oversize transfers are rejected against the same size cap as Android.
4. **Popup-blocked fallback.** If the popup is blocked or the platform forbids `window.opener` (e.g. a
   `noopener` navigation), the host falls back to a **same-origin** channel it controls: it hands the
   companion a one-time upload URL **on the host's own origin** (or a `BroadcastChannel` /
   Cache-Storage slot it owns) carried in the same input `POST`, and reads the result from there. Bytes
   still arrive through a channel the host owns end-to-end — **never** fetched from an arbitrary URL the
   companion supplies. The host applies the same nonce, validation, and size checks. A host MAY instead
   support **Android-only** and advertise so (omit the `pwa` platform).

A handoff has a bounded lifetime: the host starts a timer when it opens the popup and treats a
timeout, a closed popup, or a `fire-and-forget` shape as a clean no-op — releasing the nonce and any
fallback slot. The **self-containment moat still applies** throughout: bytes arrive in-process via
`postMessage` (or the host's own-origin fallback), never fetched from a companion-supplied URL.

## Versioning

The companion **app** updates out-of-band from the `.azp` header (a Play release, a PWA redeploy), so a
handoff added or changed in a newer app build could reach an older installed one. The header declares a
**version floor** and the host enforces it — a companion is submitted *as the lowest allowed version*,
never an exact pin, so a newer installed app always satisfies it.

- **Android** — the floor is `platforms.android.minVersionCode`, a Play **`versionCode`** (the app's
  monotonic integer version). A host reads the installed app's `versionCode`
  (`PackageInfo.longVersionCode`); if it is **below** the floor, the host deep-links
  `platforms.android.install` to update **before** launching, exactly like a missing app.
- **PWA** — a PWA has no native version and always serves latest, so azphalt versions it by its
  **deployment date-time**: `platforms.pwa.version` is an **ISO-8601 UTC instant** and the floor is
  "the live deployment is at or after this". A deploy stamps the running app with its own deployment
  instant (e.g. surfaced from the share endpoint or the web manifest); the host compares. Because a PWA
  auto-updates to latest, it normally satisfies any past floor — the field pins the *minimum* a host
  will transact with, catching a stale cached install.
- **Per-handoff floor** — a single handoff MAY **raise** the floor with `handoffs[].minAppVersion`
  (`{ android?: versionCode, pwa?: isoInstant }`), for a capability introduced in a later release. The
  effective floor for a handoff is the **higher** of the platform floor and its `minAppVersion`; a host
  that can't meet it hides *that* handoff (or offers "update to use this") while still offering the
  handoffs the installed version satisfies.

Version floors are advisory-to-strict discovery/gating metadata, never a substitute for the OS's own
package-signature check or the host's return validation.

## Security & trust

- **Consent, every time.** A host MUST show an OS-style "opens **the app**, a separate app with its own
  permissions; it will receive: **the declared input**" prompt before the first handoff, and MUST let
  the user see exactly what leaves the host.
- **Least input.** The host sends only the handoff's declared `input`. There is no ambient data channel.
- **Untrusted return.** Output assets and params are **validated before use** (wire format, bounds, size
  cap; params against the declared shape). A companion can return garbage — never reach into the host.
- **Signing & provenance.** The `.azp` header is signed like any package; `verifyAzp` + `verifyTrust`
  gate it, and a registry MAY counter-sign it (`package-format.md § Signing`). The OS *also* verifies
  the installed app's own package signature — two independent trust checks, neither replacing the other.
- **No capability bridge.** `kind: "app"` declares **no** `capabilities` and reaches **none** of the
  host's editor surface. The never-list is unaffected: nothing here lets a *sandboxed* extension gain
  camera / network / filesystem. The companion's powers are the OS's to grant, visible to the user.

## Discovery & registry

A companion-app package lists in the registry like any other, with two touches:

- It is almost always **app-scoped** (`targetApps`) — a `capture-stencil` companion belongs to
  GraffitiXR's store, not everyone's — surfaced via `GET /packages?app=…` (`repository-api.md §
  App scoping`).
- The discovery index MAY advertise a **`"companion"` profile** in `profiles`
  (`repository-api.md § Supported types and profiles`), and a host filters to it, so only hosts that
  implement the handoff runtime see companion packages.

## Blessed actions (proposed)

An open vocabulary, with a blessed core so a host slots a companion into the right place:
`capture` · `edit-image` · `edit-video` · `edit-audio` · `generate` · `enhance` · `measure` · `export`.
A host ignores an `action` it doesn't place, or files it under a generic "Open in…".

## Open questions

- **PWA `postMessage` handshake** — *resolved.* The nonce issuance, `event.origin` + `event.source`
  binding, transferable lifetime (copy-on-receipt), and the popup-blocked same-origin fallback are now
  normative under *Transports → PWA → The `postMessage` handshake*.
- **Conformance** — *resolved.* `@azphalt/conformance` ships a `companion` host-conformance profile,
  `runCompanionConformance(host)`: it drives a fixture handoff and asserts the host verifies the header,
  refuses a non-`kind:"app"` package (runs no code), surfaces the handoff on a supported platform, shows
  consent, sends only the declared input, and validates the return against `output` — analogous to the
  code / asset / video-audio profiles. A conforming host declares a `"companion"` profile for registry
  matching.
- **Versioning** — *resolved.* App-version floors are normative under *Versioning*: an Android
  `minVersionCode`, a PWA deployment-date-time `version`, and an optional per-handoff `minAppVersion`
  that raises the floor for one function.
