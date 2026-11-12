/**
 * Vendored-at-build font: Azrienoch 1.1, upstream HereLiesAz/azrienoch.
 *
 * Cache the verified release locally for React and Compose builds without
 * embedding an unreviewed CDN URL in production CSS. The exact bytes are
 * pinned by SHA-256; upstream replacement with the same tag fails closed.
 *
 * Run from any working directory: node tools/sync-store-font.mjs
 */
import { createHash } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const tag = "1.1";
const files = [
  {
    name: "Azrienoch-VF.woff2",
    sha256: "beba32f4f9a5b8c2ec9833d480a83a7434ab1514dab9d8f1603919ef503acbef",
    dest: "apps/storefront-react/public/fonts/azrienoch-v1.1.woff2",
  },
  {
    name: "Azrienoch-VF.ttf",
    sha256: "1495ea0032ac99995fa4790b190ac06dd314e6c23ab5fb9a94e97b94ee9ff2e5",
    dest: "apps/storefront-cmp/src/commonMain/composeResources/font/azrienoch_vf.ttf",
  },
];

for (const file of files) {
  const target = resolve(root, file.dest);
  const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
  const existing = await readFile(target).catch(() => undefined);
  if (existing && digest(existing) === file.sha256) continue;
  const url = `https://github.com/HereLiesAz/azrienoch/releases/download/${tag}/${file.name}`;
  const response = await fetch(url, { signal: AbortSignal.timeout(60_000) });
  if (!response.ok) throw new Error(`Azrienoch ${tag}: HTTP ${response.status} for ${file.name}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (digest(bytes) !== file.sha256) throw new Error(`Azrienoch ${tag}: SHA-256 mismatch for ${file.name}`);
  await mkdir(dirname(target), { recursive: true });
  const temp = target + ".download";
  try {
    await writeFile(temp, bytes);
    await rename(temp, target);
  } finally {
    await rm(temp, { force: true });
  }
  console.log(`Pinned Azrienoch ${tag}: ${file.dest}`);
}
