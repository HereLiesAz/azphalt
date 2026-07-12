#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { importIsf } from "./index.js";

const [,, input, output] = process.argv;

if (!input || !output) {
  console.error("Usage: azphalt-import-isf <input.isf> <output.azp>");
  process.exit(1);
}

try {
  const text = readFileSync(resolve(input), "utf-8");
  const azp = importIsf(text, {
    id: "com.example.isf-import",
    version: "1.0.0",
    author: "User"
  });
  writeFileSync(resolve(output), azp);
  console.log(`Successfully wrote ${output}`);
} catch (e) {
  console.error("Error importing ISF:", (e as Error).message);
  process.exit(1);
}
