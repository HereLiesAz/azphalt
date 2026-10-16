# Security Policy

## Supported versions

Security fixes land on `main` and ship in the next release. Only the latest release is supported:

| What | Supported |
|---|---|
| npm packages (`@azphalt/*`, `create-azphalt`) | The latest published version of each package. Versions are independent, managed by Changesets. |
| The apps (store, Android, desktop) | The latest release, versioned from [`version.properties`](version.properties) (see [RELEASING.md](RELEASING.md)). |
| Older versions | Not patched. Upgrade to the latest. |

## Reporting a vulnerability

**Report privately.** Use GitHub's private vulnerability reporting:
[github.com/HereLiesAz/azphalt/security/advisories/new](https://github.com/HereLiesAz/azphalt/security/advisories/new).
Include the affected package or app and its version, what an attacker can do, and the steps to reproduce.

If that page is unavailable, open a public issue titled `[security] private report requested` with **no
details** — not the affected code, not the impact — and the maintainer will arrange a private channel.
A public issue is never the place for the vulnerability itself: it is readable by everyone, including
the people you are reporting it against, from the moment it is filed.

## What is in scope

The security model is described in [spec/capability-model.md](spec/capability-model.md) (the sandbox and the never-list) and [spec/package-format.md § Signing](spec/package-format.md) (integrity, signatures and publisher pinning). Reports of a way around either are the most important kind.
