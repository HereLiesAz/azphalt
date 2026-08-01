# The web handoff (`azphalt://install`)

*Status: **Proposed**. Defines how a **web** storefront hands a package to a host app on the same
device. [`store-app.md`](store-app.md) specifies the Android app-to-app round trip, in which a store
app fetches bytes and returns them to a host that asked. This document specifies the other direction
and the other medium: a page in a browser, which cannot start an activity for result, cannot return
bytes, and does not know what is installed. It names a package and gets out of the way.*

## Why this exists

A web storefront can show a package and can charge for it. It cannot install one — a browser has no
way to reach into a host app's extension library. So the last step of every web browse ends at a
sentence like *"install it from any conforming host"*, which tells the user to go back to the app they
came from and find the thing again by hand. The catalogue is on the web; the install is not; nothing
connects them.

`store-app.md` § Open questions named this gap and declined to guess at it:

> The desktop and web storefronts have no equivalent handoff. […] browser install semantics differ
> enough that it should be specified separately rather than assumed.

This is that separate specification.

## What this is not

It is **not a channel of trust**, and it carries no bytes. The link **names** a package; it does not
vouch for one. Everything `store-app.md` § What this is not says about a store app applies here with
less room for doubt, because a URL is even easier to forge than an app:

- Anyone can put `azphalt://install?id=…` in a page, a QR code, an email, or a text message. A host
  MUST treat an incoming link as **untrusted input naming a package**, and run the same integrity,
  signature and publisher-continuity checks it runs on anything else
  ([`package-format.md`](package-format.md) § Signing, § Publisher continuity).
- The link grants no capability. An extension installed through it is subject to exactly the sandbox
  and consent it would have had if the user had found it in the host's own browser.
- The link conveys no entitlement (§ Paid packages).

A host that verifies the bytes loses nothing by accepting a link from a stranger. A host that does
not was already broken.

## The link

~~~
azphalt://install?id=<packageId>&version=<version>[&repo=<baseUrl>]
~~~

Scheme `azphalt`, host `install`, parameters in the query string.

| Parameter | | Meaning |
| --- | --- | --- |
| `id` | **REQUIRED** | The package's reverse-DNS id, exactly as in its manifest. A link without a usable `id` MUST be ignored. |
| `version` | SHOULD | The exact semver to install. A storefront that knows the version — it is on the page it is linking from — MUST send it. A host MAY accept its absence and resolve the newest installable version itself via `GET /packages/{id}` ([`repository-api.md`](repository-api.md) § Get Package Details), but MUST NOT assume it is present. |
| `repo` | OPTIONAL | Base URL of the conforming repository holding the package. See § Which repository below — the rules for it are the reason it is optional rather than absent. |

Unknown parameters MUST be ignored, so the contract can grow the way `store-app.md`'s extras do.
Values are percent-encoded per RFC 3986; a host MUST decode before use and MUST NOT interpolate a
decoded `id` into a filesystem path without sanitising it.

`azphalt://browse?app=…` (`store-app.md` § The request) remains the link form for *discovery* — it
opens a store and returns nothing. `azphalt://install` is the acquisition form: it names one package
and asks whoever claims it to install that package.

### Why a custom scheme

An HTTPS App Link (`https://azphalt.store/install?…`) would be more robust in a browser — no
unhandled-scheme dead ends, a working fallback for free. It is the wrong choice here anyway, and the
reason is structural rather than technical.

Android verifies an App Link by fetching `/.well-known/assetlinks.json` from the linked domain and
matching the signing fingerprints it lists. Whoever controls that file controls **which apps are
allowed to receive the link**. Pointing the install link at a registry's domain would therefore make
that registry the gatekeeper of every host's ability to be handed a package — a permission the
flagship registry would grant to itself by default and to everyone else by request.
[`GOVERNANCE.md`](https://github.com/HereLiesAz/azphalt/tree/main/docs/GOVERNANCE.md) rules that out in its first line: *no host is privileged*,
and there is no back channel that gives one host what the spec denies another.

A custom scheme has no such owner. Any app may claim `azphalt://`, no file on anyone's server decides
who, and when several are installed the OS shows a chooser — the same disambiguation a share sheet
does. A host MUST NOT be named in the link, and a storefront MUST NOT emit a link targeting a
specific host's package name. Host-agnosticism is the feature; the browser ergonomics are what it
costs.

### Transport

The link above is the contract. **How** a page navigates to it is not, and a storefront MAY use a
platform-specific encoding of the *same* link where one behaves better:

- **Chrome on Android** understands `intent://`, which carries a fallback URL the browser opens when
  nothing claims the scheme:

  ~~~
  intent://install?id=<packageId>&version=<version>#Intent;scheme=azphalt;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;S.browser_fallback_url=<encoded fallback>;end
  ~~~

  This resolves against the **same** `azphalt` intent filter — a host implements one filter, not two —
  and replaces the timing heuristic in § When no host is installed with a deterministic answer.
- **Everywhere else**, the storefront navigates to the `azphalt://` URI directly.

A host MUST NOT care which was used. The two are the same request.

### Which repository

`repo` exists because a conforming storefront is not necessarily the flagship one. Without it, a link
emitted by a self-hosted store resolves against whatever registry the host happens to be pinned to,
which does not have the package — a silent `404` presented to the user as a broken install.

With it, the parameter names a URL that arrived from outside the host's trust boundary, which is a
different problem. So:

- A host **MUST NOT** fetch from a `repo` it does not already trust. "Already trust" means configured
  by the user or shipped by the host — never merely "named in the link that got us here".
- A host **MAY** offer the user an explicit choice to add an unknown repository, provided the prompt
  names the origin and is refusable. A host that does not implement this simply ignores `repo`.
- When `repo` is absent, untrusted, or malformed, a host resolves against its own configured
  repository, and MUST surface a plain not-found if the package is not there.

Ignoring `repo` entirely is **conforming**. A host may add it later without the link shape changing.

## Host obligations

On receiving `azphalt://install`, a host MUST:

1. **Parse defensively.** Missing or malformed `id` → ignore the link. Never construct a request, a
   path, or a filename from an unvalidated `id`.
2. **Resolve and download** via `GET /packages/{id}/versions/{version}/download`
   (`repository-api.md` § Download Package), against the repository chosen per § Which repository.
   With no `version`, resolve the newest installable version first.
3. **Verify integrity** against `manifest.files`, and **verify the signature** when `signature.json`
   is present, treating an unsigned package as having integrity but no established provenance.
4. **Enforce publisher continuity** against its own pins when this updates a package it already
   holds. A link cannot authorise a publisher change; nothing outside the host can.
5. **Confirm the package is one it can run** — `kind`, `compat`, `mediaDomains`, and in particular
   `targetApps`: a host whose id is absent from a **non-empty** `targetApps` MUST refuse the install
   and say so. An empty or absent `targetApps` is global and imposes nothing.
6. **Ask the user before installing.** A link is an arrival from outside the app; the install is not
   implied by the tap that opened it.

A host that supports this document MUST register the `azphalt` scheme with `install` as its host, and
SHOULD accept the `.azp` media type (`package-format.md` § Media type) for the download-and-open path,
which works with no link at all.

## Storefront obligations

A conforming web storefront:

- MUST send `version` when it knows it.
- MUST NOT name a host in the link.
- SHOULD use `targetApps` to decide **what to offer**. A package scoped to one host should be
  presented as installable into that host, and a storefront SHOULD say which host that is rather than
  emitting a link the user's installed hosts will all refuse at step 5 above.
- MUST provide the fallback in § When no host is installed. A link that silently does nothing is the
  dead end this document exists to remove, reached by a different route.
- MUST NOT put credentials, tokens or personal data in the link (§ Paid packages).

## When no host is installed

Navigating to an unclaimed custom scheme fails **silently** in most browsers, and there is no API that
answers "is this scheme registered". A storefront therefore cannot ask; it can only attempt and infer.

A conforming storefront attempts the link and then falls back:

1. **Attempt.** Navigate to the link (or the `intent://` form where available).
2. **Detect.** With `browser_fallback_url`, the browser answers definitively and no inference is
   needed. Otherwise, treat the page **remaining visible** shortly after navigation as *nothing
   claimed it*: start a timer, and cancel it on `visibilitychange`, `pagehide` or `blur`, any of which
   mean the user left for a host. The timer's length is an implementation detail — long enough not to
   race a slow app launch, short enough not to feel broken.
3. **Fall back**, offering in this order:
   - **Download the `.azp`** — served as the media type in [`package-format.md`](package-format.md)
     § Media type. This path needs no link support at all: a host registered for that type opens the
     downloaded file directly.
   - **Get a host** — from the directory in § Host directory, filtered by the package's `targetApps`.
   - **Retry** the link, for the case where the user installed a host and came back.

A storefront MUST NOT treat the fallback as an error state. On a device with no host, downloading the
package is a *successful* outcome of tapping Install.

Attempting the link on a platform where no host exists costs an unhandled-scheme message in some
browsers. That is the accepted cost of not maintaining a list of which platforms are worth trying —
such a list is wrong the moment a host ships somewhere new, and it fails closed against exactly the
hosts it does not yet know about.

## Host directory

To offer "get a host", a storefront needs to know which apps host azphalt extensions and where to get
them. That is the same problem the registry already solves for extensions, so it uses the same
mechanism rather than a new one.

A host lists itself as a `kind: "app"` package whose `app` block declares `roles` including `"host"`
and a `hostId` ([`extension-manifest.md`](extension-manifest.md) § `app`):

~~~jsonc
{
  "kind": "app",
  "app": {
    "roles": ["host"],
    "hostId": "com.example.editor",        // the id packages name in `targetApps`
    "platforms": { "android": { "packageId": "com.example.editor.android", "install": "https://…" } }
  }
}
~~~

`hostId` is declared rather than derived because nothing in a listing implies it. A host's package id,
its OS-level package name, and the id packages use in `targetApps` are three independent strings, and
in practice they differ.

**Nothing about this is advertised in `/.well-known/azphalt-repository.json`, deliberately.** The
obvious-looking addition — a repository declaring "install links work here" — would describe nothing.
A repository's only role in this exchange is serving a download the host asks for, which every
conforming repository already does; whether links get *emitted* is a property of a storefront, and
whether they get *claimed* is a property of the device. A host reading the index would learn nothing
it could act on, so there is no field for it, and a reader looking for one should stop here rather
than assume it was forgotten.

A storefront discovers hosts with `GET /packages?kind=app` (`repository-api.md` § Search Packages),
keeps those whose `roles` include `"host"`, and matches `hostId` against the package's `targetApps` —
offering every listed host when `targetApps` is empty. A listing is submitted through the registry's
ordinary submission path; being in the directory is not an endorsement, and a storefront MAY show only
hosts it chooses to.

## Packs

A `kind: "pack"` package needs no separate link shape. A pack **is** a package with an id, so
`azphalt://install?id=<packId>&version=<v>` is already correct: the host downloads the pack, reads
`pack.entries[]`, and resolves each member individually, which [`pack.md`](pack.md) already requires
of it. Members are free/paid-gated on their own, so a free pack may contain a member the user must
still buy.

Enumerating members in the URL was considered and rejected: it duplicates resolution the host must
perform anyway, and a large pack exceeds practical URI length.

## Paid packages

**The link carries no entitlement, and MUST NOT.** An entitlement token is a bearer credential
(`repository-api.md` § Buy-once entitlements), and a URL is written to browser history, sent in
referrers, recorded in OS logs, and displayed in the chooser when more than one host is installed.
A credential placed there is disclosed by the transport itself.

So a paid package resolves as it does anywhere else: the host requests the download, has no
entitlement, and the repository answers `401` or `402`. A host MUST treat that as **"this must be
acquired"** and say so plainly — pointing at the store app (`store-app.md` § Paid packages) or the
storefront the link came from — rather than reporting a download failure. A storefront SHOULD prefer
its own checkout for a paid package and emit an install link only for a package the user can actually
get.

Carrying a purchase across the web-to-app boundary is a real gap; § Open questions records the shape
it should take when it is closed.

## Security considerations

- **Untrusted origin.** A link is attacker-supplied. The bytes it leads to are verified; the link
  itself is never evidence of anything (§ What this is not).
- **No credentials in URLs.** § Paid packages. This applies to session tokens and user identifiers
  equally, not only entitlements.
- **Repository pinning.** § Which repository. An unpinned `repo` would let a link redirect a host to
  an attacker's registry, where a package with a legitimate id serves attacker bytes — which the
  signature check catches only if the host holds a pin for that id already. Refusing untrusted
  repositories is what makes that unreachable rather than merely detectable.
- **Path construction.** A package `id` is attacker-controlled until verified against the manifest of
  the bytes actually received. Sanitise before it reaches a filesystem path.
- **Chooser disclosure.** When several hosts claim the scheme, the OS chooser shows the URI. That is
  another reason nothing sensitive belongs in it.
- **No silent install.** Host obligation 6. A link that installs without consent turns any web page
  into an installer.

## Open questions

- **Carrying a purchase.** A user who buys on the web and has never opened the store app has no path
  to their entitlement. The right shape is likely a **short-lived, single-use claim code** in the
  link, exchanged over TLS for the entitlement token — a code that is useless without the exchange is
  categorically different from a bearer token in a URL. It needs an endpoint, an expiry policy, and a
  binding to the buyer, none of which are specified here.
- **Trusting a new repository.** § Which repository lets a host ignore `repo` and says nothing about
  how a host should decide to *start* trusting one. That decision — a prompt, a pinned key, a
  registry-of-registries — is unspecified, and until it is, ignoring `repo` is the conforming
  behaviour.
- **Desktop.** Desktop hosts can register URI schemes on every major OS, and this document is written
  so they need nothing new. No desktop host implements it yet, so the ergonomics are untested.
- **Return path.** The link is one-way: the storefront never learns whether the install happened.
  [`state-reporting.md`](state-reporting.md) § 4 counts installs from the host's side, which covers
  the statistic but not this.

  A storefront SHOULD keep its own record of what it handed over, so it can show and filter on what
  the user already has rather than offering every package as though it were new. That record is a
  **guess** and must be treated as one: it says a host claimed the link, which is the last thing a
  web page can observe. Where a real host report exists — the on-device channel of
  `state-reporting.md` § 3 — it MUST take precedence over the store's own record wherever the two
  disagree, because one of them knows.

  What is still unspecified is the confirmation: a way for a host to tell the storefront that the
  install did or did not complete, which would let the guess be corrected rather than merely
  overridden when a host happens to be present. That needs a return channel from an app to a web
  origin, and the shape of it — a link back, an origin allowlist, what stops a page claiming
  installs it never received — is not settled here.
