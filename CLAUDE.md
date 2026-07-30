# Notes for agents working in this repository

## Versioning

`version.properties` at the root is the single source of truth for the version of the **apps** — the
Android store app, the desktop builds, and the web store. Format `a.b.c.d`. Full details in
[RELEASING.md § Versioning the apps](RELEASING.md#versioning-the-apps).

Two rules that apply to you:

1. **Bump the minor when you add a feature or a function.** In the same change that adds it, run
   `node tools/version.mjs bump --minor` and commit the result. `c` and `d` are automatic — a
   compile moves them, so never bump those by hand. `a` is the owner's alone: do not touch it, and
   do not run `bump --major` unless asked to in so many words.
2. **Never hand-edit `version.properties`, and never hardcode a version anywhere else.** Read it
   from that file. `tools/version.mjs` is its only writer.

The npm packages (`@azphalt/*`) are a separate scheme owned by Changesets — a package release does
not move `version.properties`, and a build does not move a package version.
