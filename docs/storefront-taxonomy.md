# Storefront presentation taxonomy

The Azphalt storefront does **not** need a catalog schema or database migration to add browse categories. Categories are a local presentation concern. Both the React site and the Kotlin Multiplatform store consume the same versioned JSON.

## Single source of truth

`apps/storefront-cmp/src/commonMain/composeResources/files/store-taxonomy.json` (schema `1`).

Each category has a stable `id`, a display `label`, optionally a `parent` ID, and any combination of `idContains`, `idEquals`, `kinds`, `types`, and `mediaDomains`. The rules are OR-combined for membership. Child membership implies membership in each parent. A package can belong to several categories, as it should: a watercolor brush is both a brush and an image asset.

Brushes include Acrylic, Oil Painting, Watercolor, Ink & Markers, Spray & Graffiti, Dry Media, and Kinetic Brushes. To add another browse category or refine membership, edit the JSON, not a Worker endpoint. IDs are stable keys; labels may change without breaking saved selections.

If a future package kind matches no rule, both frontends expose it as `kind/<kind>` rather than hiding it. Categories with no matching packages are omitted. Popular may show a limited featured subset, but **category grids do not truncate** their contents.

## Platform consumers

- **React:** `apps/storefront-react/src/taxonomy.ts` imports the canonical JSON and provides `storeCategoryKeys`, `availableStoreCategories`, and `storeCategoryLabel`. `App.tsx` uses them for both filtering and grouping.
- **Compose Android, desktop, and Wasm:** `apps/storefront-cmp/src/commonMain/kotlin/models/StoreTaxonomy.kt` reads `Res.readBytes("files/store-taxonomy.json")`, then applies the identical rules through `StoreTaxonomy.keys` and `available`. The store loads the resource once. Existing browse rules are a startup fallback if the resource cannot load.
- **Other in-app hosts:** bundle this JSON with the app, or read `/store-taxonomy.json` from the storefront's static assets and cache it. `apps/storefront-react/scripts/export-catalog.mjs` copies the canonical JSON to that static path at build time. It is not a new backend API, and a host should retain a bundled or cached copy if offline browsing matters.

Never infer entitlements, trust, permissions, prices, or moderation from these categories. They organize display only; package metadata and the existing server-side authorization remain authoritative.

## Azrienoch font

Both web and Compose stores use Azrienoch **1.1** from `HereLiesAz/azrienoch`. `tools/sync-store-font.mjs` downloads the variable WOFF2 and TTF release assets to locally served/packaged build resources, checking each against the pinned SHA-256 digest. The downloaded binary files are ignored by Git and must not be edited or replaced with an unverified URL. React runs the sync on `dev`/`build`; Compose runs it before resource copying and accessor generation. Font assets require a network connection on an uncached first build.

Keep the upstream SIL Open Font License and its attribution when redistributing the binaries. The store's existing Jost font and compatibility function names remain until all consumers and preview paths have migrated.
