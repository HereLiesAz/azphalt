const { execSync } = require('child_process');
const fs = require('fs');

const old = execSync('git show 54b1432:apps/storefront/lib/catalog.ts').toString();
const cur = fs.readFileSync('apps/storefront/lib/catalog.ts', 'utf8');

const mitMatch = old.match(/const MIT_LICENSE[\s\S]*?;\n/);
const utf8Str = "function utf8(str: string): Uint8Array { return new TextEncoder().encode(str); }";
const seedsMatch = old.match(/type Seed = \{[\s\S]*?const SEEDS: Seed\[\] = \[[\s\S]*?\];/);
const ditherMatch = old.match(/const DITHER_OLD: Omit<Manifest, "files"> = \{[\s\S]*?\};/);
const seedMatch = old.match(/async function seed\(\): Promise<void> \{[\s\S]*?\}/);

let next = cur.replace('import { NpmStore } from "./backend";', mitMatch[0]+'\n\n'+utf8Str+'\n\n'+seedsMatch[0]+'\n\n'+ditherMatch[0]+'\n\nimport { NpmStore } from "./backend";');
next = next.replace(/async function seed\(\): Promise<void> \{[\s\S]*?\}/, seedMatch[0]);

fs.writeFileSync('apps/storefront/lib/catalog.ts', next);
console.log('Patched');
