# My Custom Asset Pack

An azphalt **asset pack** — a portable `.azp` bundling images, LUTs, brushes, audio, motion presets,
or 3D assets that any conforming host can install and use. No code runs; the host reads the assets.

## Build it

```sh
npm install
npm run build      # → my-custom-asset-pack-1.0.0.azp
```

`build.js` walks `assets/` (recursively), reads the `LICENSE` text, and calls `writeAzp`, which
computes the integrity digest of every file into the manifest's `files` map. You never write those
digests by hand — and per `spec/package-format.md` a submission manifest must not carry a `files`
field at all.

## Fill in before you publish

| Field | Where | Why it matters |
| --- | --- | --- |
| `id` | `manifest.json` | Set by `create-azphalt` from your namespace. It is the package's permanent identity — a host keys installs and updates on it. |
| `author` | `manifest.json` | Shown next to your package in the store. Set by `create-azphalt`; if you scaffolded without answering, set it. |
| `license` | `manifest.json` | The SPDX id (`MIT`, `CC-BY-4.0`, …). It must match the terms in `LICENSE`. |
| copyright | `LICENSE` | The line naming the rights holder. A licence reading `Copyright (c) 2026 Your Name` grants nothing to anyone. |
| `assets[]` | `manifest.json` | One entry per asset, with its `type` and in-package `path`. The paths must exist under `assets/`. |

## Signing

`create-azphalt` generated a publisher key for you and wrote `SIGNING.md`. Sign your **first**
release: a host pins the signer's key on first install and rejects a later same-`id` package signed
by a different key (`spec/package-format.md` § Publisher continuity). An unsigned first release pins
nothing, which leaves the `id` open to someone else shipping an "update" over an installed pack.

Packages still verify for integrity when unsigned — what is missing is provenance, i.e. proof of who
published them.

## Submit it

Open a PR adding your folder to `submissions/<your-package-id>/` in the azphalt repo, or publish it
to any conforming Repository API. See `submissions/README.md`.
