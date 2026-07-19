# create-azphalt

Scaffold a new azphalt project. Run it with your package manager's `create` command — no install needed:

~~~sh
npm create azphalt@latest
# or
pnpm create azphalt
# or
yarn create azphalt
~~~

It asks for a project name, **your namespace**, and a template, copies the template into a new directory,
sets the project's `package.json` name, and fills in the manifest `id`. Then:

~~~sh
cd my-azphalt-project
npm install
npm run dev
~~~

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
