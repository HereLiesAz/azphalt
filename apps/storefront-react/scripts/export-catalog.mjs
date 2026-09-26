import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../../..");
const registryDir = resolve(root, "apps/storefront/registry");
const outDir = resolve(root, "apps/storefront-react/public");

const { readAzp } = await import("@azphalt/azp");
const generated = JSON.parse(await readFile(resolve(registryDir, "catalog.json"), "utf8"));
const previewsDoc = JSON.parse(await readFile(resolve(registryDir, "previews.json"), "utf8").catch(() => '{"previews":{}}'));
const previews = previewsDoc.previews ?? {};

const packages = [];
for (const item of generated.packages ?? []) {
  const file = resolve(registryDir, "packages", item.file);
  const { manifest } = readAzp(new Uint8Array(await readFile(file)));
  packages.push({
    id: manifest.id,
    name: manifest.name,
    kind: manifest.kind,
    description: manifest.description,
    author: manifest.author,
    version: manifest.version,
    capabilities: manifest.capabilities ?? [],
    targetApps: manifest.targetApps ?? [],
    mediaDomains: manifest.mediaDomains ?? [],
    types: manifest.types ?? [],
    maturity: manifest.maturity ?? "general",
    app: manifest.app,
    pack: manifest.pack,
    manifest,
    preview: previews[manifest.id] ?? manifest.preview,
    integrity: item.integrity,
    file: item.file,
    bytes: item.bytes,
    downloads: 0,
    ratingCount: 0,
    price: null,
    priceStatus: "free"
  });
}

packages.sort((a, b) => a.name.localeCompare(b.name));
await mkdir(outDir, { recursive: true });
await writeFile(resolve(outDir, "catalog.json"), JSON.stringify(packages) + "\n");
console.log("export-catalog: wrote " + packages.length + " package summaries");
