// Package this companion-app header into a distributable `.azp`.
//   node build.js   →   my-companion-app-1.0.0.azp
//
// A `kind: "app"` package carries NO /code and NO /assets — it's a header that
// tells a host how to install and invoke an external Android app or PWA (see the
// `app` block in manifest.json). The tree is just manifest.json + LICENSE, plus
// an optional static store-card preview under preview/. writeAzp() computes the
// integrity digests (the manifest's `files` map) for you.
import fs from "node:fs";
import { writeAzp } from "@azphalt/azp";

const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf-8"));

const payload = {};
// Optional: a still / clip for the marketplace store card, referenced from manifest.preview.
if (fs.existsSync("preview")) {
  for (const name of fs.readdirSync("preview")) {
    const rel = `preview/${name}`;
    if (fs.statSync(rel).isFile()) payload[rel] = fs.readFileSync(rel);
  }
}

const license = fs.existsSync("LICENSE")
  ? fs.readFileSync("LICENSE", "utf-8")
  : manifest.license || "All Rights Reserved";

const { azp } = writeAzp({ manifest, payload, license });
const out = `${manifest.name.replace(/\s+/g, "-").toLowerCase()}-${manifest.version}.azp`;
fs.writeFileSync(out, azp);
console.log(`Built ${out} (${azp.length} bytes)`);
