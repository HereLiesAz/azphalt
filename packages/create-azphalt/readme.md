# create-azphalt

Scaffold a new azphalt project. Run it with your package manager's `create` command — no install needed:

~~~sh
npm create azphalt@latest
# or
pnpm create azphalt
# or
yarn create azphalt
~~~

It asks for a project name and a template, copies the template into a new directory, and sets the project's `package.json` name. Then:

~~~sh
cd my-azphalt-project
npm install
npm run dev
~~~

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
