# @azphalt/azp

Read, write, verify, and sign `.azp` packages — the container every azphalt importer and the reference runtime sit on. See [`spec/package-format.md`](../../spec/package-format.md).

~~~ts
import { writeAzp, readAzp, verifyAzp } from "@azphalt/azp";

const { azp, manifest } = writeAzp({
  manifest: { azphalt: "0.1", id: "com.you.thing", name: "Thing", version: "1.0.0", kind: "asset", license: "MIT", compat: ">=0.1" },
  payload: { "assets/x.cube": bytes },
  license: mitText,
});

verifyAzp(azp).ok;        // integrity check (+ signature, if present)
readAzp(azp).manifest;    // parse without verifying
~~~

## Signing

`writeAzp` produces an **unsigned** package. `signAzp` adds a detached Ed25519 `signature.json` over
the `manifest.json` (which covers the payload through its digests); `verifyAzp` validates it when
present and reports `signed`. Per the spec, a signature is **tamper-evidence, not identity**, until
the trust model is settled.

~~~ts
import { generateSigningKey, signAzp, verifyAzp } from "@azphalt/azp";

const key = generateSigningKey();          // { privateKey (PEM), publicKey (base64) }
const signed = signAzp(azp, { privateKey: key.privateKey, keyId: "you-1" });

const v = verifyAzp(signed);
v.ok;      // integrity + signature valid
v.signed;  // true
~~~
