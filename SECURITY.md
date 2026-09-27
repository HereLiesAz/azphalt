# Security Policy

## Supported versions

Security fixes land on `main` and ship in the next release. Only the latest release is supported:

| What | Supported |
|---|---|
| npm packages (`@azphalt/*`, `create-azphalt`) | The latest published version of each package. Versions are independent, managed by Changesets. |
| The apps (store, Android, desktop) | The latest release, versioned from [`version.properties`](version.properties) (see [RELEASING.md](RELEASING.md)). |
| Older versions | Not patched. Upgrade to the latest. |

## Reporting a vulnerability

Open an issue at [github.com/HereLiesAz/azphalt/issues](https://github.com/HereLiesAz/azphalt/issues) and put `[security]` at the start of the title.

Include the affected package or app and its version, what an attacker can do, and the steps to reproduce. Issues are public: describe the impact and the affected code, and leave out a working exploit. The maintainer will ask for the details needed to reproduce it.

## What is in scope

The security model is described in [spec/capability-model.md](spec/capability-model.md) (the sandbox and the never-list) and [spec/package-format.md § Signing](spec/package-format.md) (integrity, signatures and publisher pinning). Reports of a way around either are the most important kind.
