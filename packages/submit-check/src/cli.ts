#!/usr/bin/env node
/**
 * `azphalt-submit-check [dir]` — validate every submission under `dir` (default `submissions`) and
 * exit non-zero if any fails. Run in the submission PR workflow and locally before opening a PR.
 */
import { validateSubmissions } from "./index.js";

const root = process.argv[2] ?? "submissions";
const results = validateSubmissions(root);

let invalid = 0;
for (const r of results) {
  if (r.ok) {
    // eslint-disable-next-line no-console
    console.log(`✓ ${r.id}`);
  } else {
    invalid++;
    // eslint-disable-next-line no-console
    console.error(`✗ ${r.id}\n    - ${r.errors.join("\n    - ")}`);
  }
}

// eslint-disable-next-line no-console
console.log(`\n${results.length} submission(s) checked in ${root}/, ${invalid} invalid`);
process.exit(invalid > 0 ? 1 : 0);
