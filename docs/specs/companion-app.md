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
        "install": "https://play.google.com/store/apps/details?id=com.acme.arstencil"
      },
      "pwa": {
        "manifestUrl": "https://arstencil.acme.com/manifest.webmanifest",
        "startUrl": "https://arstencil.acme.com/"
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
    "pwa": { "shareTarget": true, "return": { "kind": "redirect", "param": "azphalt_result" } }
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
   and launches it **for result** (`startActivityForResult` / the Activity Result API).
2. The companion (a normal Android app holding whatever runtime permissions the user granted it) does
   its work and returns via `setResult(RESULT_OK, resultIntent)` — output assets as content URIs whose
   MIME types are in `resultMimeTypes`, output params as result extras.
3. The host reads the result, **verifies** each returned asset against the declared `output` wire format
   and a size cap, and ingests it. `RESULT_CANCELED` (or a timeout) is a clean no-op.

The host must show the OS-app consent before step 1 and treat a missing target app as "install first"
(deep-link to `platforms.android.install`).

### PWA (the return-path is the hard part)
The web has clean ways to send input *in* but no synchronous "return to caller", so the return path is
designed explicitly:

- **Input** — the host invokes the PWA via a **Web Share Target** (a `POST` of the input assets as
  `multipart/form-data`, params as form fields) or a registered **protocol / file handler**. This is
  the installable-PWA analog of an Android intent.
- **Return** — the PWA hands the result back by **redirecting to a host-provided return URL** carrying
  the result (`transport.pwa.return`):
  - `redirect` — the PWA navigates to a host callback URL (a deep link / custom scheme the host
    registered) with the result as a `param` (small `params` inline; assets as a short-lived
    `blob:`/object-URL handle or an uploaded reference the host fetches over the *host's* own trusted
    channel — never a third-party URL the host would blindly fetch).
  - `fire-and-forget` — no return (the `fire-and-forget` shape).

  A host MUST treat the return strictly: only accept a result on the exact callback it initiated
  (a nonce in the return URL ties the result to the request), validate it against `output`, and apply
  the same size/format checks as Android. The **self-containment moat still applies**: the host fetches
  result bytes only from a channel *it* controls, never from an arbitrary URL the companion supplies.

*(PWA return is the least mature surface; a host MAY support Android-only and advertise so. Hardening
the PWA return handshake — nonce, origin binding, blob lifetime — is the main open work.)*

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

- **PWA return handshake** — the nonce / origin-binding / blob-lifetime details of the redirect return
  (the one genuinely under-specified surface). Android is settled; the web needs a hardened dance.
- **Conformance** — a `companion` host-conformance profile (drive a fixture handoff, assert the host
  shows consent, sends only declared input, and validates the return) — analogous to the code / asset /
  video-audio profiles in `@azphalt/conformance`.
- **Versioning** — pinning a minimum companion *app* version per handoff (the app updates out-of-band
  from the `.azp` header).
