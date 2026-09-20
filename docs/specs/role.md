# Role packages (`kind: "role"`)

*Status: **Normative**. A role package is signed declarative host-role/persona data. It contains no
downloaded executable code and receives no Azphalt sandbox capabilities.*

## Manifest shape

A `kind:"role"` manifest carries a top-level `role` block:

```json
{
  "kind": "role",
  "targetApps": ["com.example.host"],
  "role": {
    "format": "example.role.v1",
    "roles": [
      {
        "id": "researcher",
        "name": "Researcher",
        "description": "Collect and organize evidence.",
        "path": "roles/researcher.json"
      }
    ]
  },
  "files": {
    "roles/researcher.json": "sha256-…"
  }
}
```

`role.format` is a non-empty host-defined payload format/version. Azphalt transports and verifies
the package; it does not interpret the role payload.

`role.roles` contains one or more entries:

- `id` — required non-empty directory-safe identifier, unique within the package;
- `name` — optional non-empty display name;
- `description` — optional non-empty description;
- `path` — required safe relative path to the declarative role payload.

Every role path MUST appear in `manifest.files`.

## Security model

A role package MUST NOT declare:

- root `entry` or `runtime`;
- Azphalt `capabilities`;
- `assets`;
- `contributes`; or
- another mutually exclusive package block (`app`, `mcp`, `pack`, `skill`, `script`,
  `composable`, or `workflow`).

Role payload paths and all bundled non-license files MUST NOT use executable-looking suffixes such as
JavaScript, TypeScript, WASM, JVM/Android binaries, native libraries/executables, shell scripts,
PowerShell, Python, Ruby, PHP, Perl, Swift, or Kotlin.

The role payload is data for the host. Installing it does not grant authority by itself. A compatible
host decides whether the role is accepted, how it maps into the host's own role/company model, and
what permissions that host-owned role may later receive.

## Host scoping

Role packages may use ordinary `targetApps` discovery scoping. A global role package omits
`targetApps` or uses an empty list. A host-specific role package lists one or more reverse-DNS host
IDs. This is discovery filtering, not access control; see [`repository-api.md`](repository-api.md).

## Verification

A conforming verifier validates the structural rules above in addition to the normal package
integrity/signature rules. The reference validator is `validateRoleManifest` in
`@azphalt/azp`.
