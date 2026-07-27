// Package this asset pack into a distributable `.azp`.
//   node build.js   →   my-custom-asset-pack-1.0.0.azp
//
// The `.azp` bundles manifest.json + LICENSE + every file under assets/.
// writeAzp() computes each file's integrity digest for you (the manifest's `files`
// map), so you never write it by hand.
import fs from "node:fs";
import path from "node:path";
import { writeAzp } from "@azphalt/azp";

const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf-8"));

// Walk assets/ recursively — a pack is free to organise its files into subfolders, and a flat
// readdir would silently drop everything below the top level while still producing a package that
// looks valid and is missing most of its content.
const payload = {};
for (const dir of ["assets"]) {
  if (!fs.existsSync(dir)) continue;
  for (const rel of walk(dir)) payload[rel] = fs.readFileSync(rel);
}

// The licence BODY, not the SPDX id. `manifest.license` is an identifier like "CC-BY-4.0" or "MIT";
// shipping that string as the licence text would publish a package whose entire licence is a single
// line naming terms it does not actually include.
if (!fs.existsSync("LICENSE")) {
  console.error("build: no LICENSE file. A package must carry its licence text, not just the SPDX id in manifest.license.");
  process.exit(1);
}
const license = fs.readFileSync("LICENSE", "utf-8");

// create-azphalt writes a stub when the licence text is one it will not reproduce approximately.
// Publishing that stub would ship a package whose licence says only "put the licence here".
if (license.includes("REPLACE THIS FILE WITH THE FULL LICENCE TEXT")) {
  console.error("build: LICENSE is still the scaffolded stub. Paste your licence text in, then build.");
  process.exit(1);
}

// A submission manifest must not carry its own `files` map (spec/package-format.md) — writeAzp
// computes the real digests, and dropping any hand-written one keeps those authoritative.
const { files: _drop, ...clean } = manifest;

const { azp } = writeAzp({ manifest: clean, payload, license });
const out = `${manifest.name.replace(/\s+/g, "-").toLowerCase()}-${manifest.version}.azp`;
fs.writeFileSync(out, azp);
console.log(`Built ${out} (${azp.length} bytes, ${Object.keys(payload).length} asset file(s))`);

/** All files under `dir`, as `/`-separated paths (the in-package layout). */
function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.posix.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(rel));
    else if (e.isFile()) out.push(rel);
  }
  return out;
}
