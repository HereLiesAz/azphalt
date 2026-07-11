# @azphalt/azp

Read, write, and verify `.azp` packages — the container every azphalt importer and the reference runtime sit on. See [`spec/package-format.md`](../../spec/package-format.md).

~~~ts
import { writeAzp, readAzp, verifyAzp } from "@azphalt/azp";

const { azp, manifest } = writeAzp({
  manifest: { azphalt: "0.1", id: "com.you.thing", name: "Thing", version: "1.0.0", kind: "asset", license: "MIT", compat: ">=0.1" },
  payload: { "assets/x.cube": bytes },
  license: mitText,
});

verifyAzp(azp).ok;        // integrity check
readAzp(azp).manifest;    // parse without verifying
~~~

Packages are written **unsigned** for now; signing (Ed25519 over the manifest) lands once the trust model in the package-format spec is settled.
