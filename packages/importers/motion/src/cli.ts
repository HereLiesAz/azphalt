#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { importMotion } from "./index.js";

const [,, input, output] = process.argv;

if (!input || !output) {
  console.error("Usage: azphalt-import-motion <input.json> <output.azp>");
  process.exit(1);
}

try {
  const jsonStr = readFileSync(resolve(input), "utf-8");
  const azp = importMotion(jsonStr, {
    id: "com.example.motion-import",
    version: "1.0.0",
    author: "User"
  });
  writeFileSync(resolve(output), azp);
  console.log(`Successfully wrote ${output}`);
} catch (e) {
  console.error("Error importing motion:", (e as Error).message);
  process.exit(1);
}
