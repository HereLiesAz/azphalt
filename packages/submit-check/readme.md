# @azphalt/submit-check

Validates registry **submissions** — the folders developers add under [`submissions/`](../../submissions) in a pull request. It packages each `submissions/<id>/` into a `.azp` and checks it, so a bad submission fails the PR instead of reaching the registry.

## What it checks

For each `submissions/<id>/` folder:

- the folder name equals `manifest.id`, and the id is reverse-DNS;
- required manifest fields are present (`azphalt`, `name`, `version`, `kind`, `license`, `compat`), `kind`/`version` are well-formed, and a `LICENSE` file exists;
- `targetApps`, if present, is an array of strings;
- every payload `path` the manifest references exists in the folder (or a heavy asset uses `path: ""` + `remoteUrl`);
- the folder packages into a **valid `.azp`** — `writeAzp` + `verifyAzp` (catches unsafe paths, digest mismatches, malformed containers).

## Use

~~~sh
pnpm --filter @azphalt/submit-check build
pnpm --filter @azphalt/submit-check validate       # validates ../../submissions
# or point it anywhere:
node packages/submit-check/dist/cli.js path/to/submissions
~~~

The library entry is testable directly:

~~~ts
import { validateSubmissions, validateSubmission } from "@azphalt/submit-check";

for (const r of validateSubmissions("submissions")) {
  if (!r.ok) console.error(r.id, r.errors);
}
~~~

Run automatically by [`.github/workflows/submissions.yml`](../../.github/workflows/submissions.yml) on any PR touching `submissions/**`.
