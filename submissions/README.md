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
folder and publishes it to the live registry. If the `AZPHALT_PACKAGE_SIGNING_KEY` repo secret is
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
