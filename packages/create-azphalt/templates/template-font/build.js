// Package this font into a distributable `.azp`.
//   node build.js   →   my-font-1.0.0.azp
//
// A `kind: "font"` package carries NO /code and NO azphalt capabilities — only compiled font files under
// fonts/, each declared in manifest.json's `font.faces[]`. A variable font lists its `axes` there too;
// `azphalt verify` cross-checks them against the font's own fvar table.
// writeAzp() computes the integrity digests (the manifest's `files` map) for you.
import fs from "node:fs";
import path from "node:path";
import { verifyAzp, writeAzp } from "@azphalt/azp";

const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf-8"));

/** Recursively collect every file under `dir` into `payload`, keyed by its path relative to cwd. */
function collect(dir, payload) {
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith(".")) continue; // skip .DS_Store, .gitkeep, etc.
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      collect(full, payload);
    } else {
      payload[full.split(path.sep).join("/")] = fs.readFileSync(full);
    }
  }
}

const payload = {};
if (fs.existsSync("fonts")) collect("fonts", payload);
// Optional: a still / clip for the marketplace store card, referenced from manifest.preview.
if (fs.existsSync("preview")) collect("preview", payload);

const license = fs.existsSync("LICENSE")
  ? fs.readFileSync("LICENSE", "utf-8")
  : manifest.license || "All Rights Reserved";

const { azp } = writeAzp({ manifest, payload, license });
// Check it the way the store will, so a package that would be rejected is never written.
const { errors } = verifyAzp(azp);
if (errors.length > 0) {
  console.error("This package wouldn't be accepted:\n" + errors.map((e) => "  - " + e).join("\n"));
  console.error("Put each face in fonts/ and list it in manifest.json font.faces[] (see readme.md).");
  process.exit(1);
}
// Sanitize the name into a safe, cross-platform filename (no path separators or special chars).
const safeName = manifest.name.toLowerCase().replace(/[^a-z0-9-_]+/g, "-").replace(/^-+|-+$/g, "");
const out = `${safeName}-${manifest.version}.azp`;
fs.writeFileSync(out, azp);
console.log(`Built ${out} (${azp.length} bytes)`);
