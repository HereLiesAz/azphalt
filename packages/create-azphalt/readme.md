# create-azphalt

Scaffold a new azphalt project. Run it with your package manager's `create` command — no install needed:

~~~sh
npm create azphalt@latest
# or
pnpm create azphalt
# or
yarn create azphalt
~~~

It asks, in order:

| Prompt | Default | Used for |
|---|---|---|
| Project name | `my-azphalt-project` | The directory to create (it stops if the directory already exists) and `package.json` `name`. |
| Namespace | `example.com` | A domain you own; becomes the manifest `id` (see [Naming](#naming-id)). |
| Author | your git `user.name`, if set | `author` in `manifest.json` and `package.json`, and the `LICENSE` copyright line. |
| Licence | MIT | `license` in `manifest.json` and `package.json`, and the `LICENSE` file (see [Licence](#licence)). |
| Template | Code Extension | Which of the [templates](#templates) to copy. |

It then copies the template into the new directory and fills in everything a package needs to be
publishable — the manifest `id` (for templates that have a `manifest.json`), the author on both
`manifest.json` and `package.json`, a `LICENSE` file matching the licence you picked, and the
[signing scaffold](#signing). Then:

~~~sh
cd my-azphalt-project
npm install
~~~

and run the template's own scripts — see [Templates](#templates) for which each one has, and the
template's `readme.md` for details.

## Licence

**Your extension, your terms.** The scaffolder asks which licence you want and writes it; it does not
impose one. (The templates themselves carry no `LICENSE` — they are part of this Apache-2.0-licensed repo, and
a checked-in licence file there would silently become *your* project's terms.)

The prompt exists so that two things stay in agreement: `license` in `manifest.json` is an
[SPDX identifier](https://spdx.org/licenses/), and `LICENSE` is the actual text. A package declaring
`CC-BY-4.0` while shipping MIT text grants terms other than the ones it states.

MIT and a proprietary "all rights reserved" notice are written out in full. For Apache-2.0, CC-BY-4.0,
CC0-1.0, GPL-3.0-or-later, and *Other*, the scaffolder writes a short stub naming the licence and
linking to the canonical text — it does not reproduce those from memory, because an approximate licence
is worse than an obviously missing one. `build.js` refuses to package while the stub is still there.

## Attribution

`manifest.author` is what the store shows next to your package. The scaffolder defaults it to your git
`user.name` and writes it to `manifest.json`, `package.json`, and the `LICENSE` copyright line — the
line that actually names the rights holder. A licence reading `Copyright (c) 2026 Your Name` grants
nothing to anyone, which is exactly what a placeholder left unedited produces.

## Naming (`id`)

Every package needs a globally-unique reverse-DNS `id`. You don't hand-write it — the scaffolder asks
for **a namespace (a domain you own)** and builds the id for you:

~~~
<reversed-domain>.azphalt.<name>
~~~

Give any domain — `com`, `io`, `org`, `space`, whatever you own. It's reversed, an `azphalt` segment is
inserted (marking it an azphalt package and keeping all your packages in one sub-namespace), then the
project name is appended:

| You enter | Project | Generated `id` |
|---|---|---|
| `developer.space` | `my-plugin` | `space.developer.azphalt.my-plugin` |
| `hereliesaz.com` | `halftone` | `com.hereliesaz.azphalt.halftone` |
| `acme.io` | `azphalt-glow` | `io.acme.azphalt.glow` |

(A leading `azphalt-` on the project name is dropped so the segment isn't doubled.)

## Templates

| Template | For | What you get | Scripts |
|---|---|---|---|
| **Code Extension** | Developers | A sandboxed filter + transition you can test locally, build, and submit. | `test`, `build` |
| **Companion App** | Developers | A `kind:"app"` header that lets a host launch your Android app or PWA via a handoff. | `build` |
| **MCP Server** | Developers | A `kind:"mcp"` header that declares how a host reaches your MCP server (local or remote). | `build` |
| **Skill** | Developers | A `kind:"skill"` bundle of one or more Agent Skills (`SKILL.md`) for an AI-agent host. | `build` |
| **Script** | Developers | A `kind:"script"` native script (bash/Python/PowerShell) a host installs and runs like a package-manager package. | `build` |
| **Extension Pack** | Developers | A `kind:"pack"` header that bundles a recommended / base set of packages (any author) for your app. | `build` |
| **Composable** | Developers | A `kind:"composable"` header describing UI element(s) rendered from templates your host already links — no code, no new template ids. | `build` |
| **Asset Pack** | Creators | A workspace for bundling images, audio, or 3D assets into a `.azp`. | `build` |
| **Host Application** | Developers | A Vite web app that parses `.azp` files and queries repositories. | `dev`, `build`, `preview` |
| **Repository Server** | Hubs | An Express server implementing the [Repository API](../../spec/repository-api.md). | `start`, `dev` |

The `build` script of the package templates (`build.js`) writes the `.azp`. The Host Application and
Repository Server templates are apps, not packages: they have no `manifest.json`, so no `id` is set
for them.

## Signing

Every scaffolded project, whatever the template, gets a signing scaffold so its first release can be
signed (a host pins the signer's key on first install and rejects later updates signed by a different
key — spec § Publisher continuity). The scaffolder generates a fresh Ed25519 key pair and writes:

| File | What it is |
|---|---|
| `azp-signing-key.pem` | The publisher **private** key (PKCS8 PEM), written with mode `0600`. Keep it secret: anyone with it can publish updates as you. |
| `.gitignore` | Gains an `azp-signing-key.pem` entry (unless already present) so the key is never committed. Keep it out of git. |
| `SIGNING.md` | The publisher public key (base64 SPKI) and the one-time setup steps. |
| `.github/workflows/sign-release.yml` | On a `v*` tag or manual dispatch: `npm install`, `npm run build`, signs every `.azp` in the project root with the `AZP_PRIVATE_KEY` secret, and attaches them to a GitHub release. It fails if the secret is unset. |

To enable releases, store the key as a CI secret:

~~~sh
gh secret set AZP_PRIVATE_KEY < azp-signing-key.pem
~~~

Reuse the same key across all your extensions so hosts recognize one publisher identity for you.

## Related

- [`@azphalt/azdk`](../sdk) — the typed API extensions are written against.
- [`@azphalt/azp`](../azp) — build, verify, and sign the `.azp` container.
- [`docs/ADOPTION.md`](../../docs/ADOPTION.md) — becoming a conforming host.
