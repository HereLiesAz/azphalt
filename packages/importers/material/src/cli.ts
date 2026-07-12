#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { importMaterial } from "./index.js";

// Basic CLI argument parsing: azphalt-import-material <output.azp> --albedo a.png --normal n.png
const args = process.argv.slice(2);
const output = args[0];

if (!output || output.startsWith("--")) {
  console.error("Usage: azphalt-import-material <output.azp> --albedo <file> [--normal <file>] ...");
  process.exit(1);
}

const maps: Record<string, Uint8Array> = {};

try {
  for (let i = 1; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const role = args[i].slice(2);
      const file = args[i + 1];
      if (file && !file.startsWith("--")) {
        maps[role] = readFileSync(resolve(file));
        i++;
      }
    }
  }

  if (Object.keys(maps).length === 0) {
    throw new Error("No texture maps provided. Use --albedo, --normal, etc.");
  }

  const azp = importMaterial({
    id: "com.example.material-import",
    version: "1.0.0",
    author: "User",
    maps
  });
  
  writeFileSync(resolve(output), azp);
  console.log(`Successfully wrote ${output}`);
} catch (e) {
  console.error("Error importing material:", (e as Error).message);
  process.exit(1);
}
