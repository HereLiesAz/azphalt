---
"@azphalt/azdk": minor
"@azphalt/azp": minor
"@azphalt/repository-client": minor
"@azphalt/registry-store-vercel": patch
---

**web-handoff**: the `azphalt://install` deep link, plus the manifest and validation it needs.

`spec/web-handoff.md` closes the gap `store-app.md` § Open questions named but declined to guess at: a
web storefront could show a package and charge for it, but had no way to hand one to a host, so every
web browse ended at "install it from any conforming host" — telling the user to go back to the app
they had just left. A page now emits `azphalt://install?id=&version=[&repo=]`, and any conforming host
that claims the scheme installs it. Deliberately host-agnostic: no host is named in the link, because
an HTTPS App Link would make whoever controls `assetlinks.json` the gatekeeper of which apps may
receive a package, and `GOVERNANCE.md` rules that out.

- **`@azphalt/azdk`** — `AppManifest` gains `roles` (`"companion"` / `"host"`, defaulting to
  `["companion"]` so existing listings keep their meaning) and `hostId`; `handoffs` becomes optional,
  required only of a companion. `hasAppRole` applies the default. New `MEDIA_TYPE` /
  `MEDIA_TYPE_DEPRECATED` constants give the `.azp` media type one source in code.
- **`@azphalt/azp`** — new `validateAppManifest`, wired into `verifyAzp`. `kind:"app"` was the one
  header kind with **no** structural rules, so a package could claim to be an app while carrying no
  `app` block and nothing installable. That mattered little when the block was only read by a host
  deciding whether to launch a companion; it matters now that a storefront builds a **host directory**
  out of these listings and offers them to users as places to install software.
- **`@azphalt/repository-client`** — `search({ kind })`, matching the new `kind` query parameter on
  `GET /packages`. Without it the host directory could not be fetched at all: `ListQuery.kind` existed
  as an internal type but the HTTP surface never parsed it, so `?kind=app` silently returned the
  entire catalogue.
- **`@azphalt/registry-store-vercel`** — blobs are stored as `application/vnd.azphalt.package` rather
  than `application/zip`; a blob's stored content type is what a direct blob URL serves, so the old
  value handed browsers an archive to unpack instead of a package for a host to open.

**Media type.** `application/vnd.azphalt.package` is now normative, stated once in
`spec/package-format.md` § Media type and cross-referenced everywhere else. It was previously three
different strings in three places: `application/x-azphalt` (the Repository API and its server),
`application/vnd.azphalt.package` (the store-app handoff), and `application/zip` (the storefront's own
download route). `application/x-azphalt` becomes a deprecated alias — clients SHOULD accept it,
servers MUST NOT send it. The `x-` prefix was deprecated for new types by RFC 6648; `vnd.` is the
correct tree for a format an organization defines, and RFC 6838 § 3.2 opens it without requiring
registration.
