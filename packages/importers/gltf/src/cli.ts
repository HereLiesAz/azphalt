#!/usr/bin/env node
/** CLI for `@azphalt/importer-gltf`: wrap a `.glb`/`.gltf` model into a `.azp` package. */
import { readFileSync, writeFileSync } from "node:fs";
import { basename, extname } from "node:path";
import { importGltf } from "./index.js";

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
  "usage: azphalt-import-gltf <input.glb|gltf> --id <reverse.dns.id> " +
  "[-o out.azp] [--name N] [--version V] [--license SPDX] [--license-file PATH] [--author A]";

function fail(msg: string): never {
  console.error(`error: ${msg}`);
  console.error(USAGE);
  process.exit(2);
}

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

const args = parse(process.argv.slice(2));
if (!args.input) fail("an input .glb/.gltf file is required");
if (!args.id) fail("--id <reverse-DNS id> is required (e.g. com.you.model)");

const bytes = readFileSync(args.input);

let licenseText: string | undefined;
if (args.licenseFile) {
  licenseText = readFileSync(args.licenseFile, "utf8");
} else {
  console.error(`warning: no --license-file; writing a placeholder LICENSE (SPDX: ${args.license ?? "MIT"}).`);
}

const out = args.out ?? basename(args.input, extname(args.input)) + ".azp";
const azp = importGltf(bytes, {
  id: args.id,
  name: args.name,
  version: args.version ?? "1.0.0",
  author: args.author ?? "",
  license: args.license,
  licenseText,
});

writeFileSync(out, azp);
console.error(`wrote ${out}  (${args.id}, ${azp.length} bytes)`);
