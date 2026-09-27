# Azphalt Host App

A starting point for an azphalt **host** — a Vite + TypeScript web app that depends on
`@azphalt/azp` (read and verify `.azp` files), `@azphalt/repository-client` (query a Repository API),
and `@azphalt/azdk` (the extension API types). `src/main.ts` imports `readAzp` and
`RepositoryClient`; the repository calls are commented out until you point the client at a real
server.

This is an app, not a package: it has no `manifest.json` and does not build a `.azp`.

## Install

~~~sh
npm install
~~~

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Starts the Vite dev server. |
| `npm run build` | Type-checks with `tsc`, then builds with `vite build` into `dist/`. |
| `npm run preview` | Serves the production build locally with `vite preview`. |

## Signing files

`create-azphalt` writes `SIGNING.md`, `azp-signing-key.pem` (git-ignored — keep it out of git), and
`.github/workflows/sign-release.yml` into every project. They are for signing `.azp` packages; this
template produces none, so you can delete them if you do not publish packages from this project.
