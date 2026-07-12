#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, basename } from "node:path";
import { importAudio } from "./index.js";

const args = process.argv.slice(2);
const tagsIndex = args.indexOf("--tags");
let input: string | undefined;
let output: string | undefined;
let tags: string[] = [];

if (tagsIndex !== -1) {
  // e.g. azphalt-import-audio in.wav out.azp --tags sfx impact
  input = args[0];
  output = args[1];
  tags = args.slice(tagsIndex + 1).filter(t => !t.startsWith("--"));
} else {
  input = args[0];
  output = args[1];
}

if (!input || !output) {
  console.error("Usage: azphalt-import-audio <input.wav|mp3> <output.azp> [--tags tag1 tag2]");
  process.exit(1);
}

try {
  const bytes = readFileSync(resolve(input));
  const azp = importAudio(bytes, {
    id: "com.example.audio-import",
    version: "1.0.0",
    author: "User",
    filename: basename(input),
    tags
  });
  writeFileSync(resolve(output), azp);
  console.log(`Successfully wrote ${output}`);
} catch (e) {
  console.error("Error importing audio:", (e as Error).message);
  process.exit(1);
}
