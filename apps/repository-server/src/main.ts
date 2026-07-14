#!/usr/bin/env node
/**
 * A runnable reference Repository API server, seeded with a couple of real `.azp` packages so the
 * endpoints have something to return. One package is free (open lane); one is consigned for sale
 * (paid lane) with a demo license token, so the `401`/`402`/`200` download path is exercisable.
 *
 *   pnpm --filter @azphalt/repository-server build
 *   PORT=8787 node apps/repository-server/dist/main.js
 *   curl localhost:8787/.well-known/azphalt-repository.json
 *   curl localhost:8787/packages
 *   curl -H "Authorization: Bearer demo-license" \
 *     localhost:8787/packages/com.demo.paidlut/versions/1.0.0/download -o pack.azp
 *
 * This is a demo seed, not a deployment: it keeps everything in memory and grants a hard-coded token.
 * A real repository backs the registry with a database + object store and the authorizer with its own
 * accounts/entitlements service.
 */
import { writeAzp } from "@azphalt/azp";
import { InMemoryStore, Marketplace, Registry } from "@azphalt/registry";
import type { Manifest } from "@azphalt/sdk";
import { InMemoryAuthorizer } from "./authorize.js";
import { createRepositoryServer } from "./server.js";

const LICENSE = "MIT License\n\nProvided AS IS, without warranty of any kind.\n";
const utf8 = (s: string) => new TextEncoder().encode(s);
const lut = utf8("LUT_3D_SIZE 2\n0 0 0\n1 0 0\n0 1 0\n1 1 0\n0 0 1\n1 0 1\n0 1 1\n1 1 1\n");

async function seed(): Promise<{ registry: Registry; marketplace: Marketplace; authorizer: InMemoryAuthorizer }> {
  const store = new InMemoryStore();
  const registry = new Registry(store);
  const marketplace = new Marketplace(registry, store);

  const packages: Array<{ manifest: Omit<Manifest, "files">; payload: Record<string, Uint8Array> }> = [
    {
      manifest: {
        azphalt: "0.1",
        id: "com.demo.freeluts",
        name: "Free Film LUTs",
        version: "1.0.0",
        kind: "asset",
        license: "MIT",
        compat: ">=0.1",
        author: "Demo",
        description: "A free LUT pack on the open lane.",
        capabilities: ["assets", "bitmap"],
        assets: [{ type: "lut", path: "assets/film.cube" }],
      },
      payload: { "assets/film.cube": lut },
    },
    {
      manifest: {
        azphalt: "0.1",
        id: "com.demo.paidlut",
        name: "Premium Cine LUT",
        version: "1.0.0",
        kind: "asset",
        license: "MIT",
        compat: ">=0.1",
        author: "Demo",
        description: "A consigned LUT — download requires a license.",
        capabilities: ["assets", "bitmap"],
        assets: [{ type: "lut", path: "assets/cine.cube" }],
      },
      payload: { "assets/cine.cube": lut },
    },
  ];

  for (const p of packages) {
    await registry.publish(writeAzp({ manifest: p.manifest, payload: p.payload, license: LICENSE }).azp);
  }
  await marketplace.listForSale("com.demo.paidlut", "seller_demo", { amountCents: 900, currency: "USD" });

  // A demo entitlement so the paid download path returns 200 with the right token.
  const authorizer = new InMemoryAuthorizer().grantLicense("demo-license", "com.demo.paidlut");
  return { registry, marketplace, authorizer };
}

async function main(): Promise<void> {
  const { registry, marketplace, authorizer } = await seed();
  const server = createRepositoryServer({
    registry,
    marketplace,
    authorizer,
    index: {
      name: "azphalt Reference Repository",
      version: "0.1",
      description: "A reference implementation of the azphalt Repository API.",
    },
  });
  const port = Number.parseInt(process.env.PORT ?? "8787", 10);
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`azphalt repository server listening on http://localhost:${port}`);
  });
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
