# create-azphalt

Scaffold a new azphalt project. Run it with your package manager's `create` command — no install needed:

~~~sh
npm create azphalt@latest
# or
pnpm create azphalt
# or
yarn create azphalt
~~~

It asks for a project name, **your namespace**, an **author**, a **licence**, and a template; copies the
template into a new directory; and fills in everything a package needs to be publishable — the manifest
`id`, the author on both `manifest.json` and `package.json`, and a `LICENSE` file matching the licence
you picked. Then:

~~~sh
cd my-azphalt-project
npm install
npm run dev
~~~

## Licence

**Your extension, your terms.** The scaffolder asks which licence you want and writes it; it does not
impose one. (The templates themselves carry no `LICENSE` — they are part of this MIT-licensed repo, and
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

| Template | For | What you get |
|---|---|---|
| **Asset Pack** | Creators | A workspace for bundling images, audio, or 3D assets into a `.azp`. |
| **Host Application** | Developers | A Vite web app that parses `.azp` files and queries repositories. |
| **Repository Server** | Hubs | An Express server implementing the [Repository API](../../spec/repository-api.md). |

## Related

- [`@azphalt/azdk`](../sdk) — the typed API extensions are written against.
- [`@azphalt/azp`](../azp) — build, verify, and sign the `.azp` container.
- [`docs/ADOPTION.md`](../../docs/ADOPTION.md) — becoming a conforming host.
