#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { importGltf } from "./index.js";

const [,, input, output] = process.argv;

if (!input || !output) {
  console.error("Usage: azphalt-import-gltf <input.glb|gltf> <output.azp>");
  process.exit(1);
}

try {
  const bytes = readFileSync(resolve(input));
  const azp = importGltf(bytes, {
    id: "com.example.gltf-import",
    version: "1.0.0",
    author: "User"
  });
  writeFileSync(resolve(output), azp);
  console.log(`Successfully wrote ${output}`);
} catch (e) {
  console.error("Error importing glTF:", (e as Error).message);
  process.exit(1);
}
