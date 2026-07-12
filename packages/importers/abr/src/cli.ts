#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { importAbr } from "./index.js";

const [,, input, output] = process.argv;

if (!input || !output) {
  console.error("Usage: azphalt-import-abr <input.abr> <output.azp>");
  process.exit(1);
}

try {
  const bytes = readFileSync(resolve(input));
  const azp = importAbr(bytes, {
    id: "com.example.abr-import",
    name: "Imported ABR Brushes",
    version: "1.0.0",
    author: "User"
  });
  writeFileSync(resolve(output), azp);
  console.log(`Successfully wrote ${output}`);
} catch (e) {
  console.error("Error importing ABR:", (e as Error).message);
  process.exit(1);
}
