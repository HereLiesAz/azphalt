// Package this skill bundle into a distributable `.azp`.
//   node build.js   →   my-skill-1.0.0.azp
//
// A `kind: "skill"` package carries NO /code and NO azphalt capabilities — it bundles one or more
// Agent Skills (SKILL.md + optional scripts/references/assets, per agentskills.io/specification)
// under skills/<id>/, matching the ids declared in the manifest's `skill.skills[]` (see manifest.json).
// writeAzp() computes the integrity digests (the manifest's `files` map) for you.
import fs from "node:fs";
import path from "node:path";
import { writeAzp } from "@azphalt/azp";

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
if (fs.existsSync("skills")) collect("skills", payload);
// Optional: a still / clip for the marketplace store card, referenced from manifest.preview.
if (fs.existsSync("preview")) collect("preview", payload);

const license = fs.existsSync("LICENSE")
  ? fs.readFileSync("LICENSE", "utf-8")
  : manifest.license || "All Rights Reserved";

const { azp } = writeAzp({ manifest, payload, license });
// Sanitize the name into a safe, cross-platform filename (no path separators or special chars).
const safeName = manifest.name.toLowerCase().replace(/[^a-z0-9-_]+/g, "-").replace(/^-+|-+$/g, "");
const out = `${safeName}-${manifest.version}.azp`;
fs.writeFileSync(out, azp);
console.log(`Built ${out} (${azp.length} bytes)`);
