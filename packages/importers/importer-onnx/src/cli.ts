#!/usr/bin/env node
import fs from "fs";
import { importOnnx } from "./index.js";

const args = process.argv.slice(2);
if (args.length < 3) {
  console.error("Usage: azphalt-import-onnx <id> <version> <author> [filepath] [--url <remoteUrl>] [--checksum <sha256>] [--size <bytes>] [--role <role>]");
  process.exit(1);
}

const [id, version, author] = args;
let filepath = "";
let remoteUrl = "";
let checksum = "";
let byteSize = 0;
let role = "";

for (let i = 3; i < args.length; i++) {
  if (args[i] === "--url") remoteUrl = args[++i];
  else if (args[i] === "--checksum") checksum = args[++i];
  else if (args[i] === "--size") byteSize = parseInt(args[++i], 10);
  else if (args[i] === "--role") role = args[++i];
  else filepath = args[i];
}

const filename = filepath ? filepath.split("/").pop()!.split("\\").pop()! : "model.bin";
const bytes = filepath ? fs.readFileSync(filepath) : null;

const azp = importOnnx(bytes, { id, version, author, filename, remoteUrl, checksum, byteSize, role });
fs.writeFileSync(`${id}.azp`, azp);
console.log(`Successfully wrote ${id}.azp`);
