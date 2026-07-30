# The store app (delegated acquisition)

*Status: **Proposed**. Defines how an app that hosts azphalt extensions can delegate **browsing and
acquiring** them to a separate, installable store app, instead of building a storefront of its own. The
transport is the Android Intent round-trip already specified in [`companion-app.md`](companion-app.md);
what differs is the direction of the favour — a companion app does **work** for the host, a store app
does **acquisition** for it.*

## Why this exists

A host app that wants to support extensions currently has to build the whole acquisition surface:
browse, search, filter by what it can actually run, package detail, purchase, download, unpack, verify
integrity, verify the signature, and enforce publisher continuity on update. Most of that is not the
thing the developer set out to build — it is the tax on having an extension model at all.

`repository-api.md` already removes the *server* half of that problem: any conforming repository serves
the same REST surface, so a host does not have to run a registry. This document removes the *client*
half. A store app installed on the device does the browsing and the acquiring, and hands the host a
package it has already fetched and checked.

The point is not to hide the registry — a host is always free to talk to it directly, and a host with
its own storefront should. The point is that **"I don't want to build a storefront" should not mean
"I can't have extensions."**

### What this is not

It is **not a trust anchor.** The store app is a convenience, not an authority, and a host MUST NOT
treat a package as trustworthy merely because a store app handed it over. The store app is just another
app on the device; a user can install a hostile one. So the contract below is deliberately shaped so
that **a lying store app gains nothing**:

- The host re-verifies integrity and signature on the bytes it receives (§ Host obligations). Those
  checks are self-contained in the `.azp` — they do not depend on who delivered it.
- The host, not the store, holds the publisher pins that enforce continuity across updates
  (`package-format.md` § Publisher continuity). A store app cannot authorise a publisher change.
- The result carries no capability grant. An acquired package is subject to exactly the same sandbox
  and consent it would be if the host had downloaded it itself.

The store app saves the host **work**, never **judgement**.

## Discovery

A host detects a store app by resolving the browse intent:

~~~kotlin
val intent = Intent("store.azphalt.action.BROWSE")
val available = context.packageManager.resolveActivity(intent, 0) != null
~~~

More than one store app MAY be installed; the host SHOULD let the OS disambiguate (a chooser) rather
than hard-coding one vendor, exactly as it would for a share target. A host MAY offer to install a
store app when none resolves, but MUST degrade gracefully — an extension-capable host with no store app
is a host with no *browse* affordance, not a broken one.

## The request

The host launches `store.azphalt.action.BROWSE` **for result** (Activity Result API). Every extra is
optional except `app`.

| Extra | Type | Meaning |
| --- | --- | --- |
| `app` | `String` | **REQUIRED.** The host's reverse-DNS id. Drives app scoping (`repository-api.md` § App scoping): the store shows global packages plus those whose `targetApps` names this host. |
| `mediaDomains` | `String[]` | Restricts to packages whose `mediaDomains` intersect these (`image`, `video`, `audio`, `3d`, `model`, `font`). A video host passing `["video","audio"]` never sees a paint-only brush. |
| `kinds` | `String[]` | Restricts by `kind` — `asset`, `code`, `mixed`, `app`, `mcp`, `pack`. A host with no code sandbox passes `["asset"]`. |
| `compat` | `String` | The host's azphalt version, so the store can hide packages whose `compat` range excludes it. |
| `repository` | `String` | Base URL of the conforming repository to browse. Defaults to the store app's own. A host pinned to its own registry passes it here. |
| `id` | `String` | Deep-link straight to one package's detail instead of the browse grid. |
| `multiple` | `Boolean` | Allow selecting more than one package in a single trip. Default `false`. |
| `azphalt.extra.INVENTORY` | `String` | What the host has already done with extensions it holds — a JSON `{"entries":[…]}` of `{id, version, state}`, so the store shows *Open* / *Enable* / *Update* instead of *Get*. Normative in [`state-reporting.md`](state-reporting.md) § 3.1. |
| `azphalt.extra.STATE_AUTHORITY` | `String` | The host's read-only state `ContentProvider`, so the store can read that same state when the user opens it directly rather than through a host ([`state-reporting.md`](state-reporting.md) § 3.2). |

A store app MUST honour `app`, and MUST NOT return a package that the declared filters exclude —
returning something the host said it cannot run is the one failure that wastes the user's time twice.
Unknown extras are ignored, so the contract can grow without breaking older stores.

`azphalt://browse?app=…&kinds=asset` is an equivalent **link** form for contexts that cannot start an
activity for result (a web page, a notification). It opens the same surface but returns nothing; it is
for discovery, not acquisition.

## The result

On selection the store returns `RESULT_OK` with the verified package bytes as a **content URI**, and
sets `FLAG_GRANT_READ_URI_PERMISSION` — without that flag the host hits a `SecurityException` opening
the URI across the app boundary.

| Field | Type | Meaning |
| --- | --- | --- |
| `data` (or `ClipData`) | content URI | The `.azp` bytes. With `multiple`, one `ClipData` item per package. |
| `azphalt.extra.ID` | `String` | Package id, matching the manifest. |
| `azphalt.extra.VERSION` | `String` | The exact version delivered. |
| `azphalt.extra.INTEGRITY` | `String` | `sha256-…` over the **unsigned** package, as in `repository-api.md`. |
| `azphalt.extra.SIGNED` | `Boolean` | Whether the package carried a `signature.json` that verified. |
| `azphalt.extra.SIGNER_KEY` | `String` | Base64 SPKI of the signer's public key, when signed. The host pins this for continuity. |
| `azphalt.extra.ENTITLEMENT` | `String` | For a paid package, the registry-signed entitlement token (`repository-api.md` § Buy-once entitlements) so the host can verify the licence offline. |
| `azphalt.extra.REPORT_TOKEN` | `String` | The `azphalt-report-token` from the download that produced these bytes, when the repository issued one. It travels with the package because the store app *downloaded* and the host *installs* — the token authorises one install report, and only the host knows whether an install happened ([`state-reporting.md`](state-reporting.md) § 4.2). |

`RESULT_CANCELED` is a clean no-op — the user backed out, and the host does nothing. A store app MUST
NOT return `RESULT_OK` with no package.

### MIME type

The content URI SHOULD be served as `application/vnd.azphalt.package`. A host SHOULD NOT rely on the
MIME type for validation; it is a hint for the OS, not a guarantee.

## Host obligations

A host MUST, on receiving a result:

1. **Read the bytes and verify integrity** against `manifest.files`, rejecting any mismatch. The store
   app's own check is not evidence — repeat it.
2. **Verify the signature** when `signature.json` is present, and treat an unsigned package as having
   integrity but no established provenance (`package-format.md` § Signing status).
3. **Enforce publisher continuity** against its own pins when the package updates one already
   installed, using `azphalt.extra.SIGNER_KEY` or the key in the package itself. A store app has no
   say in this.
4. **Confirm the package matches what it asked for** — `kind`, `compat`, and, where the host filtered
   on them, `mediaDomains`. A store app that ignores the filters is misbehaving, and the host is the
   one that pays for it.
5. **Treat the bytes as untrusted input** throughout — the same posture as a package downloaded
   directly, because that is exactly what it is.

Steps 1–3 are the same checks a host performs on any `.azp`; a host that already consumes packages has
them. That is the point: delegating acquisition does not add a new trust surface, it removes an
implementation burden.

## Store app obligations

A conforming store app MUST:

- Verify integrity, and the signature when present, **before** returning a package. Returning bytes it
  has not checked pushes work back onto the host that the host delegated precisely to avoid.
- Apply the request's filters honestly (§ The request).
- Return `RESULT_CANCELED` rather than a partial or substitute result when it cannot honour the request.
- Grant read permission on the returned URI, and scope that grant to the calling package.
- Never require the host to hold registry credentials. Any authentication for a paid package is between
  the user, the store app, and the registry.

A store app SHOULD show the user which app is asking (`app`), because a browse request is initiated by
another application and the user should be able to see who it is acting for.

## Paid packages

A store app distributed through Google Play sells digital goods, so purchase MUST go through Google
Play Billing rather than a web checkout — a Play-distributed app that sends the user to an external
payment flow for in-app content violates Play policy.

The registry therefore accepts a **Play purchase token** in exchange for the entitlement it would
otherwise issue against a web payment (`repository-api.md` § Buy-once entitlements). The store app
completes the Play purchase, presents the purchase token to the registry, and the registry — after
verifying it with Google — returns the signed entitlement token that goes back to the host in
`azphalt.extra.ENTITLEMENT`. The host verifies that token offline, exactly as it would one obtained
through any other purchase path; it never learns how the purchase was made.

This keeps the host out of billing entirely, which is the second half of "I don't want to build a
storefront."

## Open questions

- **Update notification.** A host currently learns about a new version by asking the registry. Should a
  store app be able to tell a host that something it installed has an update, and if so over what —
  a broadcast, or a query the host initiates? A push channel is more useful and a larger surface.
  [`state-reporting.md`](state-reporting.md) § 3.2 now supplies the missing half — a store app that has
  been given `azphalt.extra.STATE_AUTHORITY` knows the host's library — without deciding the transport.
- **Shared library.** Several hosts installing the same extension each hold their own copy. A store app
  could instead expose an installed-extension library over a `ContentProvider`, so one acquisition
  serves every host and updates land once. That is a strictly larger contract (cross-app read
  permissions, per-host entitlement scoping) and is deliberately deferred until this one is proven.
- **Non-Android parity.** The desktop and web storefronts have no equivalent handoff. A PWA store using
  the `postMessage` return from `companion-app.md` would mirror this closely, but browser install
  semantics differ enough that it should be specified separately rather than assumed.
