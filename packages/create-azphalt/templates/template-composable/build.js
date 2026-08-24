// Package this composable header into a distributable `.azp`.
//   node build.js   →   my-composable-1.0.0.azp
//
// A `kind: "composable"` package carries NO /code and NO /assets — it's a pure header naming a
// template library your host app already links at build time, plus one or more elements to
// instantiate from it (see the `composable` block in manifest.json). The tree is just
// manifest.json + LICENSE, plus an optional static store-card preview under preview/. writeAzp()
// computes the integrity digests (the manifest's `files` map) for you.
import fs from "node:fs";
import { writeAzp } from "@azphalt/azp";

const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf-8"));

const payload = {};
// Optional: a still / clip for the marketplace store card, referenced from manifest.preview.
if (fs.existsSync("preview")) {
  for (const name of fs.readdirSync("preview")) {
    if (name.startsWith(".")) continue; // skip .DS_Store, .gitkeep, etc.
    const rel = `preview/${name}`;
    if (fs.statSync(rel).isFile()) payload[rel] = fs.readFileSync(rel);
  }
}

const license = fs.existsSync("LICENSE")
  ? fs.readFileSync("LICENSE", "utf-8")
  : manifest.license || "All Rights Reserved";

const { azp } = writeAzp({ manifest, payload, license });
// Sanitize the name into a safe, cross-platform filename (no path separators or special chars).
const safeName = manifest.name.toLowerCase().replace(/[^a-z0-9-_]+/g, "-").replace(/^-+|-+$/g, "");
const out = `${safeName}-${manifest.version}.azp`;
fs.writeFileSync(out, azp);
console.log(`Built ${out} (${azp.length} bytes)`);
