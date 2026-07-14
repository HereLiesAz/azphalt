# Submitting to the registry

Publish a plugin, extension, or asset by opening a **pull request** that adds one folder here. CI packages your folder into a `.azp` and validates it; a maintainer reviews the PR; on merge it's indexed.

Submitting **source** (a manifest + your files) rather than a built `.azp` keeps the PR reviewable — the diff shows exactly what ships.

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

## Licensing

Submit only content you have the right to distribute, under the SPDX license your manifest names. Importers ([`packages/importers`](../packages/importers)) can normalize `.abr` / `.cube` / ISF / glTF / … into the `.azp` layout for you.
