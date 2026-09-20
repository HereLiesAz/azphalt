# Workflow + agent packages (`kind: "workflow"`)

*Status: **Normative**. Extends the package model with a tenth kind — signed orchestration data for a
workflow-aware host. A workflow package describes workflow definitions, reusable fragments, package-local
agent/role definitions, dependencies, symbolic host-permission requests, and declarative native screens.
It contains **data, never downloaded UI/runtime code**.*

## Security model

A workflow package is not an azphalt editor extension. It MUST NOT declare root `entry`, `runtime`,
`capabilities`, `assets`, or `contributes`, and it MUST NOT combine another mutually exclusive package
block (`app`, `mcp`, `pack`, `skill`, `script`, or `composable`). A conforming verifier also rejects
executable-looking payload files.

`workflow.hostPermissions` is an array of **opaque host-owned strings**. Merely requesting a recognized
string grants nothing. The target host maps names it understands, separately obtains user/host approval,
and grants only that approved subset. Unknown strings remain unsupported/denied. Host permissions are not
azphalt sandbox capabilities and MUST NOT be translated into `Manifest.capabilities`.

Workflow dependencies are package references, not privilege inheritance. Every dependency keeps its own
publisher signature, license/entitlement, version/update, permission/capability, and revocation lifecycle.
A workflow host resolves and installs dependencies through the normal repository/package path.

## Manifest

```json
{
  "azphalt": "0.1",
  "id": "com.example.azphalt.release-workflow",
  "name": "Release Workflow",
  "version": "1.0.0",
  "kind": "workflow",
  "license": "MIT",
  "compat": ">=0.1",
  "targetApps": ["com.example.workflowhost"],
  "workflow": {
    "format": "haive.workflow.v1",
    "definitions": [
      { "id": "release", "name": "Release", "path": "workflows/release.json" }
    ],
    "agents": [
      { "id": "builder", "name": "Builder", "path": "agents/builder.json" },
      { "id": "reviewer", "name": "Reviewer", "path": "agents/reviewer.json" }
    ],
    "dependencies": [
      {
        "id": "com.example.azphalt.release-notes",
        "version": ">=1.0.0",
        "required": false,
        "purpose": "skill"
      }
    ],
    "hostPermissions": ["WorkflowRegister", "WorkflowLaunch"],
    "screens": [
      {
        "id": "overview",
        "name": "Overview",
        "path": "screens/overview.json",
        "placements": ["addon", "workflow-run"]
      }
    ]
  },
  "files": {
    "LICENSE": "sha256-…",
    "workflows/release.json": "sha256-…",
    "agents/builder.json": "sha256-…",
    "agents/reviewer.json": "sha256-…",
    "screens/overview.json": "sha256-…"
  }
}
```

The ordinary `targetApps` rule applies. Absent/empty is global; a host-specific package lists the
reverse-DNS id of each compatible host. Scoping is discovery metadata, not a permission grant.

### `workflow.format`

Required non-empty string naming the host-level workflow payload format/version. Azphalt does not parse or
execute that format. The target workflow host decides whether it supports it after the `.azp` container has
passed ordinary integrity/signature/package validation.

### `workflow.definitions`

Required non-empty array. Each entry has:

- `id` — non-empty directory-safe id, unique within `definitions`.
- `path` — safe relative path present in `manifest.files`.
- optional non-empty `name` and `description`.

### `workflow.fragments`

Optional array with the same shape/rules as `definitions`, for reusable subgraphs/templates.

### `workflow.agents`

Optional array of package-local agent/role definitions. Each entry has `id`, `path`, and optional
`name`/`description`; ids are unique within `agents`, and paths must be safe and present in
`manifest.files`.

Package-local agents are inputs to the target workflow host. Installing the package MUST NOT silently add
those agents to a user's global company/role collection. A host may offer an explicit opt-in action to do
that, but it is a host operation outside azphalt.

### `workflow.dependencies`

Optional references to other packages:

- `id` — required non-empty package id; self-dependencies are invalid.
- `version` — optional version/range understood by the host/repository resolver.
- `required` — optional boolean.
- `purpose` — optional open vocabulary; blessed hints include `model`, `mcp`, `skill`, `script`,
  `workflow`, and `tool`.
- `note` — optional human explanation.

Duplicate `(id, version)` pairs are invalid.

### `workflow.hostPermissions`

Optional unique non-empty strings. They are requests only. Azphalt gives them no semantics and no grant.

### `workflow.screens`

Optional declarative screen payloads. Each entry has a directory-safe unique `id`, a safe `path`, optional
`name`, and optional unique non-empty symbolic `placements`. Screen payloads MUST be declarative JSON or
YAML. HTML, WebView content, downloaded JavaScript, Compose/SwiftUI bytecode, native libraries, shell
scripts, or any other executable UI/runtime payload are invalid.

A workflow host maps the declarative data onto its own already-compiled native renderer. Action and binding
identifiers inside that data are symbolic host-owned names; unknown names are inert.

## Verification

`@azphalt/azp` runs the ordinary container verification first: safe archive paths, complete digest coverage,
and optional Ed25519 signature verification. For `kind:"workflow"`, it additionally enforces:

1. the `workflow` block exists;
2. forbidden root execution/editor surfaces and mutually-exclusive kind blocks are absent;
3. `format` and at least one definition are present;
4. entry ids are valid/unique and all referenced payload paths are safe and listed in `manifest.files`;
5. dependencies contain no self-reference or duplicate id/version pair;
6. host permission strings are non-empty/unique but otherwise opaque;
7. screens are declarative JSON/YAML data; and
8. the package contains no executable-looking payload file.

Verification proves package/container integrity and structure. It does **not** authorize a requested host
permission, execute a workflow, resolve a dependency, or make a payload format semantically trustworthy.

## Repository and conformance profile

Browse/search summaries carry `kind:"workflow"` and the ordinary `targetApps` metadata. Package detail
carries the full `workflow` block. A repository that intentionally carries workflow packages may advertise
`"workflow"` in its `/.well-known/azphalt-repository.json` `profiles` array.

A workflow-host conformance profile verifies packages and surfaces workflow/agent/dependency/screen metadata
without executing package code. Actual workflow execution is a host concern after verification, dependency
resolution, user permission decisions, and host-format validation.
