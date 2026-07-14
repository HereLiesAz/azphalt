/**
 * Package every {@link EXAMPLES} entry into a real `.azp` under `out/`. Run via `pnpm build`
 * (after `tsc`). Each `.azp` is verified as it's written, so a broken example fails the build.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { writeAzp, verifyAzp } from "@azphalt/azp";
import { EXAMPLES } from "./index.js";
import { MIT_LICENSE } from "./shared.js";

const OUT = new URL("../out/", import.meta.url);

function main(): void {
  mkdirSync(OUT, { recursive: true });
  let ok = 0;
  for (const ex of EXAMPLES) {
    const { azp } = writeAzp({ manifest: ex.manifest, payload: ex.payload ?? {}, license: ex.license ?? MIT_LICENSE });
    const v = verifyAzp(azp);
    if (!v.ok) throw new Error(`example '${ex.slug}' produced an invalid .azp: ${v.errors.join("; ")}`);
    writeFileSync(new URL(`${ex.slug}.azp`, OUT), azp);
    ok++;
  }
  // eslint-disable-next-line no-console
  console.log(`built ${ok} example .azp package(s) → out/`);
}

main();
