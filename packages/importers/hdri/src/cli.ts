#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { importHdri } from "./index.js";

const [,, input, output] = process.argv;

if (!input || !output) {
  console.error("Usage: azphalt-import-hdri <input.hdr|exr> <output.azp>");
  process.exit(1);
}

try {
  const bytes = readFileSync(resolve(input));
  const azp = importHdri(bytes, {
    id: "com.example.hdri-import",
    version: "1.0.0",
    author: "User"
  });
  writeFileSync(resolve(output), azp);
  console.log(`Successfully wrote ${output}`);
} catch (e) {
  console.error("Error importing HDRI:", (e as Error).message);
  process.exit(1);
}
