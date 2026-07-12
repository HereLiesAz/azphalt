#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, basename } from "node:path";
import { importImage } from "./index.js";

const [,, input, output] = process.argv;

if (!input || !output) {
  console.error("Usage: azphalt-import-image <input.png|jpg> <output.azp>");
  process.exit(1);
}

try {
  const bytes = readFileSync(resolve(input));
  const azp = importImage(bytes, {
    id: "com.example.image-import",
    version: "1.0.0",
    author: "User",
    filename: basename(input)
  });
  writeFileSync(resolve(output), azp);
  console.log(`Successfully wrote ${output}`);
} catch (e) {
  console.error("Error importing image:", (e as Error).message);
  process.exit(1);
}
