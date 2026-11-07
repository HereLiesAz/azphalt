---
"@azphalt/submit-check": patch
---

Accept a multi-file model bundle declared only by `files[]` (no scalar `remoteUrl`), as spec/extension-manifest.md § Multi-file model bundles allows. Each member must be bundled (path present) or remote with a `sha256-<hex>` checksum.
