# Azphalt Repository Server

A starting point for a hub implementing the azphalt Repository API — an Express server
(`src/index.js`) with CORS enabled and an in-memory sample package list. It serves:

| Endpoint | What it does |
|---|---|
| `GET /.well-known/azphalt-repository.json` | The repository index (name, version, description, auth). |
| `GET /packages` | Search; filters by the `types` query parameter (comma-separated). |
| `GET /packages/:id/versions/:version/download` | Checks for a bearer token on paid packages, then returns 404 — serving the `.azp` is left for you to implement. |

This is a server, not a package: it has no `manifest.json` and does not build a `.azp`.

## Install

~~~sh
npm install
~~~

## Scripts

| Script | What it does |
|---|---|
| `npm start` | Runs `node src/index.js`. |
| `npm run dev` | Runs `node --watch src/index.js`, restarting on changes. |

The server listens on `PORT`, or 3000 if unset.

## Signing files

`create-azphalt` writes `SIGNING.md`, `azp-signing-key.pem` (git-ignored — keep it out of git), and
`.github/workflows/sign-release.yml` into every project. They are for signing `.azp` packages; this
template produces none (and has no `build` script, which that workflow runs), so you can delete them
if you do not publish packages from this project.
