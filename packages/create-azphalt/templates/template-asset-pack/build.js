import fs from "fs";
import path from "path";
import { writeAzp } from "@azphalt/azp";

// Read the manifest
const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf-8"));

// Read all files in the assets directory
const payload = {};
const assetsDir = "assets";

if (fs.existsSync(assetsDir)) {
  for (const file of fs.readdirSync(assetsDir)) {
    const filePath = path.join(assetsDir, file);
    if (fs.statSync(filePath).isFile()) {
      payload[`assets/${file}`] = fs.readFileSync(filePath);
    }
  }
}

// Build the package
const { azp } = writeAzp({ 
  manifest, 
  payload, 
  license: manifest.license || "All Rights Reserved" 
});

// Save it
const outName = `${manifest.name.replace(/\s+/g, '-').toLowerCase()}-${manifest.version}.azp`;
fs.writeFileSync(outName, azp);
console.log(`Successfully built ${outName} (${azp.length} bytes)`);
