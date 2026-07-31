# Submitting to the registry

Publish a plugin, extension, or asset by opening a **pull request** that adds one folder here. CI packages your folder into a `.azp` and validates it; a maintainer reviews the PR; on merge it's indexed.

Submitting **source** (a manifest + your files) rather than a built `.azp` keeps the PR reviewable — the diff shows exactly what ships.

## Choosing a PR template

Every submission uses a PR template whose checklist maps one-to-one to the CI compliance gate — tick the boxes and your submission is already conformant. Pick the one that matches what you're shipping by adding `?template=…&expand=1` to the compare URL (or swap the template with the picker GitHub shows once you open the PR):

| Submitting | Template |
|---|---|
| A pack of data assets (brush, LUT, pattern, shader, transition, font, audio, …) | [`submission-asset.md`](../.github/PULL_REQUEST_TEMPLATE/submission-asset.md) |
| A code extension (filter / tool / command / transition) | [`submission-code.md`](../.github/PULL_REQUEST_TEMPLATE/submission-code.md) |
| An AI model (`onnx` / `tflite` / `litert` / `sherpa-bundle`) | [`submission-model.md`](../.github/PULL_REQUEST_TEMPLATE/submission-model.md) |
| Anything else, or a `mixed` package | [`submission.md`](../.github/PULL_REQUEST_TEMPLATE/submission.md) (default) |

Example: `…/compare/main...your-branch?template=submission-code.md&expand=1`. Each template also carries a copy-paste starter `manifest.json` for that type.

## Layout

One folder per package, named for your reverse-DNS `id`:

~~~
submissions/
  com.you.my-brush-pack/
    manifest.json     # your manifest, WITHOUT the `files` field (CI computes the digests)
    LICENSE           # required — the license your manifest names
    assets/…          # or code/… , ui/… — every payload file at its in-package path
~~~

- The folder name MUST equal `manifest.id`.
- Reference each payload file from the manifest at the same relative path (`"path": "assets/x.cube"`, `"entry": "code/main.js"`, …).
- For a **heavy** asset (a large model, video, audio, HDRI, font), don't bundle it: set `"path": ""`, and give `remoteUrl` + `checksum` + `byteSize` (the remote-header pattern — see [`spec/extension-manifest.md`](../spec/extension-manifest.md)).
- To scope your entry to one host app, add `"targetApps": ["com.the.app"]` (see [App scoping](../spec/repository-api.md)).

## Listing a host app

If you have written an **app that runs azphalt extensions**, list it here too. That is what puts it in
the storefront's "get a host" fallback — the thing a user sees when they tap Install on the web and
have nothing installed to receive it ([`spec/web-handoff.md`](../spec/web-handoff.md) § Host
directory).

A host listing is a `kind: "app"` package with no payload — just a manifest and a LICENSE:

~~~jsonc
{
  "azphalt": "0.1",
  "id": "com.you.editor",              // the folder name, as always
  "name": "Your Editor",
  "version": "1.0.0",
  "kind": "app",
  "license": "LicenseRef-Proprietary", // a host app is usually not open source; that's fine
  "compat": ">=0.1",
  "app": {
    "roles": ["host"],
    "hostId": "com.you.editor.hostid",  // the id extensions name in their `targetApps`
    "platforms": {
      "android": { "packageId": "com.you.editor.android", "install": "https://…" }
    }
  }
}
~~~

- `hostId` is **required** for a host and must be the id extensions actually use in `targetApps` — it
  is not derived from anything else, and getting it wrong means your app is listed but never matched.
- `install` is where a user goes to get your app. A listing without one is dropped from the directory
  rather than shown as a dead entry.
- Omit `handoffs` — those are for a **companion** (an app a host calls to do work, see
  [`spec/companion-app.md`](../spec/companion-app.md)). An app that is both declares
  `"roles": ["host", "companion"]` and carries both `hostId` and `handoffs`.

## What CI checks

`@azphalt/submit-check` runs on every PR that touches `submissions/**` and fails the check if a submission:

- has a folder name that doesn't match `manifest.id`, or an `id` that isn't reverse-DNS;
- is missing a required manifest field (`azphalt`, `name`, `version`, `kind`, `license`, `compat`) or a `LICENSE` file;
- references a payload `path` that isn't in the folder (or an empty `path` without a `remoteUrl`);
- fails to package into a valid `.azp` (`verifyAzp`) — bad shape, unsafe path, digest mismatch.

Run the same checks locally before opening the PR:

~~~sh
pnpm --filter @azphalt/submit-check build
pnpm --filter @azphalt/submit-check validate    # validates every folder under submissions/
~~~

See [`com.azphalt.example.hello-lut/`](com.azphalt.example.hello-lut) for a minimal working submission to copy.

## Signing

On merge, [`publish-submissions.yml`](../.github/workflows/publish-submissions.yml) packages each
folder and publishes it over `POST /api/publish`.

> **This lane is not the same as the store's own catalog.** The extensions the store serves are built
> from commit-pinned sources into committed `.azp` bytes (see
> [`apps/storefront/registry/`](../apps/storefront/registry) and the storefront README), so they
> survive any restart. `POST /api/publish` is a *runtime* write, and a deployment without
> `DATABASE_URL` + `BLOB_READ_WRITE_TOKEN` answers `503` rather than accepting one it cannot keep.
> Until submissions are folded into the baked catalog, a merged submission reaches a live store only
> where that durable store is configured.

If the `AZPHALT_PACKAGE_SIGNING_KEY` repo secret is
set (a PKCS#8 PEM Ed25519 private key), each `.azp` is signed with it first; the optional
`AZPHALT_PACKAGE_SIGNING_KEY_ID` repo variable records a key id in the signature.

Signing is optional — without the secret, packages publish unsigned and still verify for integrity.
What is lost is *provenance*: per [`spec/package-format.md`](../spec/package-format.md) § Publisher
continuity, a host pins the signer's key on first install and rejects a later same-`id` package
signed by a different key, so an unsigned first release pins nothing and leaves the `id` open to a
third party. Registry versions are immutable, so a version published unsigned stays unsigned — only
a new semver gets a signature.

To enable it:

~~~sh
openssl genpkey -algorithm ed25519          # store the PEM as the AZPHALT_PACKAGE_SIGNING_KEY secret
~~~

This is a *different* key from `AZPHALT_SIGNING_KEY`, which the storefront uses to issue entitlement
tokens — they are separate trust roles and must not be shared.

## Licensing

Submit only content you have the right to distribute, under the SPDX license your manifest names. Importers ([`packages/importers`](../packages/importers)) can normalize `.abr` / `.cube` / ISF / glTF / … into the `.azp` layout for you.

**`manifest.license` and the `LICENSE` file must agree.** The manifest field is an
[SPDX identifier](https://spdx.org/licenses/); `LICENSE` is the actual terms. A package declaring
`CC-BY-4.0` while shipping MIT text grants terms other than the ones it states, and CI cannot catch
that for you. `LicenseRef-…` is legal SPDX for anything without a standard identifier — the store's
own catalog uses `LicenseRef-Proprietary` for all-rights-reserved packages.

### If your package carries someone else's work

A model, a font, a sample library, or a LUT derived from someone else's profile is **their** work,
and bundling or re-hosting it is redistribution — which is what triggers their licence's obligations.
Apache-2.0, BSD-3-Clause, MIT and CC-BY all require attribution to survive redistribution, so:

- Set `modelLicense` (or note the source in the description) naming the upstream terms.
- Ship a `NOTICE` file alongside `LICENSE` carrying the upstream attribution and where you got it.
- Do not assert your own licence over content you did not make. If the upstream states no licence at
  all, you have nothing to pass on — say so plainly rather than picking terms you cannot grant.

Using the **remote-header** pattern (`"path": ""` plus `remoteUrl`) pointing at the *original* source
avoids the problem entirely: the host fetches from upstream, you redistribute nothing, and only your
own manifest is yours to license. Re-hosting the file on your own releases is the case that needs the
NOTICE.

### Non-commercial and gated upstreams

Some models are CC-BY-NC or require accepting conditions before download. Those cannot be consigned
to the paid lane, and re-hosting them may breach the terms regardless of the SPDX id. Check before
submitting.
