# @azphalt/marketplace

A small **reference storefront UI** — a Vite + React app that browses and views packages over the azphalt [Repository API](../../spec/repository-api.md) using [`@azphalt/repository-client`](../../packages/repository-client). It's a demo of the *client* side of the standard.

By default it points at a repository running on `http://localhost:3000` — the bundled [`@azphalt/mock-backend`](../mock-backend) serves exactly that. For a spec-complete backend over the real registry, use [`@azphalt/repository-server`](../repository-server) instead.

> Not to be confused with [`apps/storefront`](../storefront), the Next.js **consignment** storefront that sits directly on [`@azphalt/registry`](../../packages/registry). This app is the lighter, client-only browse UI.

## Run it

~~~sh
# terminal 1 — the API the UI reads from
pnpm --filter @azphalt/mock-backend start

# terminal 2 — the UI
pnpm --filter @azphalt/marketplace dev
~~~

Then open the printed Vite URL. Point it at a different repository by changing the `RepositoryClient` `url` in `src/App.tsx`.
