# My Skill

An azphalt **skill bundle** package (`kind: "skill"`) — one or more [Agent Skills](https://agentskills.io/specification)
an AI-agent host loads. Like an MCP server it runs **outside** the azphalt editor sandbox: azphalt
distributes the bundle, and the host's own agent reads `SKILL.md` as instructional text. See the
[skill spec](https://azphalt.org/specs/skill).

## What's here

- **`manifest.json`** — the `skill.skills[]` list. Each entry's `id` must match a directory under
  `skills/`, e.g. `skills/example/SKILL.md`.
- **`skills/example/SKILL.md`** — the instructions an agent reads. Edit the frontmatter (`name`,
  `description`) and body, and update the matching entry in `manifest.json` to match.
  - **`scripts/`** — optional scripts a host's skill loader may let the agent invoke.
  - **`references/`** — optional background material `SKILL.md` can point at, kept out of the main file.
- **`build.js`** — bundles `skills/` (and, if present, `preview/`) into a `.azp`. No code, no azphalt
  capabilities — just the manifest, the skill files, and LICENSE.
- **`LICENSE`** — SPDX-identified license text.

To bundle more than one skill, add another `skills/<id>/SKILL.md` directory and a matching entry in
`manifest.json`'s `skill.skills[]`.

## Build

~~~sh
npm install
npm run build        # → my-skill-1.0.0.azp
~~~

Then sign it (see `SIGNING.md`) and upload it to a repository — or drop it on the storefront's
**Publish** page.
