import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../../..");
const registryDir = resolve(root, "apps/storefront/registry");
const outDir = resolve(root, "apps/storefront-react/public");

const { readAzp } = await import("@azphalt/azp");

/** The browse card of a `kind:"font"` package — the same shape as the SDK's `toFontSummary`. */
function fontSummary(font) {
  const faces = font.faces ?? [];
  const axes = [];
  for (const face of faces) for (const axis of face.axes ?? []) if (!axes.includes(axis.tag)) axes.push(axis.tag);
  return { family: font.family, ...(font.designer ? { designer: font.designer } : {}), variable: faces.some((f) => f.variable === true), axes, faces: faces.length, ...(font.scripts?.length ? { scripts: font.scripts } : {}), ...(font.sampleText ? { sampleText: font.sampleText } : {}) };
}
const generated = JSON.parse(await readFile(resolve(registryDir, "catalog.json"), "utf8"));
const previewsDoc = JSON.parse(await readFile(resolve(registryDir, "previews.json"), "utf8").catch(() => '{"previews":{}}'));
const previews = previewsDoc.previews ?? {};

const packages = [];
for (const item of generated.packages ?? []) {
  const file = resolve(registryDir, "packages", item.file);
  const fileBytes = new Uint8Array(await readFile(file));
  const { manifest } = readAzp(fileBytes);
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
    llm: manifest.llm,
    ...(manifest.kind === "font" && manifest.font ? { font: fontSummary(manifest.font) } : {}),
    manifest,
    preview: previews[manifest.id] ?? manifest.preview,
    integrity: item.integrity,
    // The digest of the exact file the Worker streams (signed, so unlike `integrity`); the Worker
    // refuses a full download whose bytes do not hash to it.
    fileDigest: "sha256-" + createHash("sha256").update(fileBytes).digest("hex"),
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
