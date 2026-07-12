#!/usr/bin/env node
/** CLI for `@azphalt/importer-isf`: wrap an ISF / GLSL shader into a `.azp` package. */
import { readFileSync, writeFileSync } from "node:fs";
import { basename, extname } from "node:path";
import { importIsf } from "./index.js";

interface Args {
  input?: string;
  out?: string;
  id?: string;
  name?: string;
  version?: string;
  license?: string;
  licenseFile?: string;
  author?: string;
}

const USAGE =
  "usage: azphalt-import-isf <input.fs> --id <reverse.dns.id> " +
  "[-o out.azp] [--name N] [--version V] [--license SPDX] [--license-file PATH] [--author A]";

function parse(argv: string[]): Args {
  const a: Args = {};
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    switch (t) {
      case "-o":
      case "--out":
        a.out = argv[++i];
        break;
      case "--id":
        a.id = argv[++i];
        break;
      case "--name":
        a.name = argv[++i];
        break;
      case "--version":
        a.version = argv[++i];
        break;
      case "--license":
        a.license = argv[++i];
        break;
      case "--license-file":
        a.licenseFile = argv[++i];
        break;
      case "--author":
        a.author = argv[++i];
        break;
      default:
        if (!t.startsWith("-") && !a.input) a.input = t;
        else fail(`unknown argument: ${t}`);
    }
  }
  return a;
}

function fail(msg: string): never {
  console.error(`error: ${msg}`);
  console.error(USAGE);
  process.exit(2);
}

const args = parse(process.argv.slice(2));
if (!args.input) fail("an input .fs/.glsl shader file is required");
if (!args.id) fail("--id <reverse-DNS id> is required (e.g. com.hereliesaz.teal-grade)");

let source: string;
try {
  source = readFileSync(args.input, "utf8");
} catch (e) {
  fail(`failed to read input file: ${(e as Error).message}`);
}

let licenseText: string;
if (args.licenseFile) {
  try {
    licenseText = readFileSync(args.licenseFile, "utf8");
  } catch (e) {
    fail(`failed to read license file: ${(e as Error).message}`);
  }
} else {
  const spdx = args.license ?? "MIT";
  licenseText = `${spdx}\n\nProvide the full license text with --license-file.\n`;
  console.error(`warning: no --license-file; writing a placeholder LICENSE (SPDX: ${spdx}).`);
}

const out = args.out ?? basename(args.input, extname(args.input)) + ".azp";
const { azp, manifest, panel, parsed } = importIsf(source, licenseText, {
  id: args.id,
  name: args.name,
  version: args.version,
  license: args.license,
  author: args.author,
});

writeFileSync(out, azp);
console.error(
  `wrote ${out}  (${manifest.id} v${manifest.version}, ${parsed.hasIsfHeader ? "ISF" : "GLSL"}, ` +
    `${panel.controls.length} control(s), ${azp.length} bytes)`,
);
