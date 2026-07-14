# @azphalt/mock-backend

A minimal **Express** server that implements the azphalt [Repository API](../../spec/repository-api.md) over a small hard-coded catalog. It exists to give the reference marketplace UI ([`@azphalt/marketplace`](../marketplace)) something to talk to during local development — nothing more.

It serves the standard endpoints (`/.well-known/azphalt-repository.json`, `/packages`, `/packages/{id}`, download) from an in-memory `DB`, so you can see the client flow end to end without a real backend.

## Run it

~~~sh
pnpm --filter @azphalt/mock-backend start   # listens on http://localhost:3000 (override with PORT)
~~~

> This is a **demo**, not a deployment: the data is hard-coded and there's no verification, storage, or auth. For a spec-complete, tested backend over the real registry — including the `401`/`402`-gated paid-download path — use [`@azphalt/repository-server`](../repository-server).
