const { execSync } = require('child_process');
const fs = require('fs');

const old = execSync('git show 54b1432:apps/storefront/lib/catalog.ts').toString();
const cur = fs.readFileSync('apps/storefront/lib/catalog.ts', 'utf8');

const seedInterfaceStart = old.indexOf('interface Seed {');
const ditherOldEnd = old.indexOf('];', old.indexOf('const SEEDS')) + 2;
let seedAndSeeds = old.substring(seedInterfaceStart, ditherOldEnd);
// Wait, DITHER_OLD is after SEEDS.
const ditherOldStart = old.indexOf('const DITHER_OLD');
const ditherOldStop = old.indexOf('};', ditherOldStart) + 2;
const ditherOldStr = old.substring(ditherOldStart, ditherOldStop);

const seedFuncStart = old.indexOf('async function seed(): Promise<void> {');
const seedFuncEnd = old.indexOf('export async function getCatalog()', seedFuncStart);
let seedFuncStr = old.substring(seedFuncStart, seedFuncEnd);
// remove the trailing jsdoc comment for getCatalog
seedFuncStr = seedFuncStr.replace(/\/\*\*[\s\S]*$/, '').trim();

const mitStart = old.indexOf('const MIT_LICENSE');
const mitEnd = old.indexOf(';\n', mitStart) + 2;
const mitStr = old.substring(mitStart, mitEnd);

const utf8Str = "function utf8(str: string): Uint8Array { return new TextEncoder().encode(str); }";

let next = cur.replace('import { NpmStore } from "./backend";', mitStr+'\n\n'+utf8Str+'\n\n'+seedAndSeeds+'\n\n'+ditherOldStr+'\n\nimport { NpmStore } from "./backend";');
next = next.replace(/async function seed\(\): Promise<void> \{[\s\S]*?\}/, seedFuncStr);

fs.writeFileSync('apps/storefront/lib/catalog.ts', next);
console.log('Patched');
