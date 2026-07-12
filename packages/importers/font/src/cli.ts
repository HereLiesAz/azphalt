#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, basename } from "node:path";
import { importFont } from "./index.js";

const [,, input, output] = process.argv;

if (!input || !output) {
  console.error("Usage: azphalt-import-font <input.ttf|otf|woff2> <output.azp>");
  process.exit(1);
}

try {
  const bytes = readFileSync(resolve(input));
  const azp = importFont(bytes, {
    id: "com.example.font-import",
    version: "1.0.0",
    author: "User",
    filename: basename(input)
  });
  writeFileSync(resolve(output), azp);
  console.log(`Successfully wrote ${output}`);
} catch (e) {
  console.error("Error importing font:", (e as Error).message);
  process.exit(1);
}
