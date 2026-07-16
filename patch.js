const fs = require('fs');
const old = fs.readFileSync('scratch2.ts', 'utf8');
const cur = fs.readFileSync('apps/storefront/lib/catalog.ts', 'utf8');

const seedsMatch = old.match(/type Seed = \{[\s\S]*?const SEEDS: Seed\[\] = \[[\s\S]*?\];/);
const ditherMatch = old.match(/const DITHER_OLD: Omit<Manifest, "files"> = \{[\s\S]*?\};/);
const seedMatch = old.match(/async function seed\(\): Promise<void> \{[\s\S]*?\}/);
const mitMatch = old.match(/const MIT_LICENSE[\s\S]*?`\]\.join\("\\n"\);/);
const utf8Match = old.match(/function utf8\(str: string\): Uint8Array \{[\s\S]*?\}/);

let next = cur.replace('import { NpmStore } from "./backend";', mitMatch[0]+'\n\n'+utf8Match[0]+'\n\n'+seedsMatch[0]+'\n\n'+ditherMatch[0]+'\n\nimport { NpmStore } from "./backend";');
next = next.replace(/async function seed\(\): Promise<void> \{[\s\S]*?\}/, seedMatch[0]);

fs.writeFileSync('apps/storefront/lib/catalog.ts', next);
console.log('patched');
