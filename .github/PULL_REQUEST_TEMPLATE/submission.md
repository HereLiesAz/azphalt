<!-- Use this template for a registry submission. See submissions/README.md. -->
# Registry submission

Adding a package under `submissions/<id>/`.

## Package

- **id (reverse-DNS):** `com.you.example`
- **kind:** asset / code / mixed
- **what it is:**

## Checklist

- [ ] The folder is named exactly `<manifest.id>`.
- [ ] `manifest.json` is present **without** a `files` field, and a `LICENSE` file is included.
- [ ] Every payload path the manifest references is in the folder — or a heavy asset uses the remote header (`"path": ""` + `remoteUrl` + `checksum` + `byteSize`).
- [ ] I have the right to distribute this content under the SPDX license the manifest names.
- [ ] `pnpm --filter @azphalt/submit-check validate` passes locally (the same check CI runs).
