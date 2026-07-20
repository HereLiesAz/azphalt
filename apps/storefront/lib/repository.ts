/**
 * The **normative Repository API** surface, so `azphalt.store` is a conforming repository any app can
 * consume via `@azphalt/repository-client` — not just the storefront's own UI.
 *
 * Rather than re-implement the protocol, this mounts the reference `@azphalt/repository-server`'s
 * transport-neutral {@link createRepositoryHandler} on the storefront's own `registry` + `market` +
 * paid-download `authorizer` (from `lib/catalog`). The endpoints are therefore the exact same code the
 * reference server and its conformance tests exercise — the store can't drift from the spec. The
 * public paths (`/.well-known/azphalt-repository.json`, `/packages`, …) are routed here by
 * `beforeFiles` rewrites in `next.config.mjs`; the Next route handler passes their path segments in.
 *
 * @see spec/repository-api.md   the normative contract
 * @see apps/repository-server/  the shared handler this reuses
 */
import { createRepositoryHandler, type RepoRequest, type RepositoryHandler } from "@azphalt/repository-server";
import { authorizer, buildRepositoryIndex, getCatalog } from "./catalog";

/**
 * Build the handler once per process. `getCatalog()` returns the one shared, seeded registry/market
 * (stable for the life of the process), so capturing them here is correct; the index is computed from
 * that same catalog. Memoized so concurrent requests await one build rather than racing several.
 */
let handler: Promise<RepositoryHandler> | undefined;
function getHandler(): Promise<RepositoryHandler> {
  if (!handler) {
    handler = (async () => {
      try {
        const { registry, market } = await getCatalog();
        return createRepositoryHandler({
          registry,
          marketplace: market,
          // The same authorizer the storefront's own download route gates on, so a Bearer entitlement
          // this store issued unlocks the same bytes on either surface (401 unauth, 402 unlicensed).
          authorizer,
          index: buildRepositoryIndex(),
        });
      } catch (err) {
        // Don't cache a rejected promise: a transient failure (e.g. a cold durable store timing out in
        // getCatalog) would otherwise poison every later request. Clear it so the next call retries.
        handler = undefined;
        throw err;
      }
    })();
  }
  return handler;
}

/** Lower-cased header map the handler expects (it reads `authorization` for the paid gate). */
function headerMap(req: Request): Record<string, string | undefined> {
  const out: Record<string, string | undefined> = {};
  req.headers.forEach((value, key) => {
    out[key.toLowerCase()] = value;
  });
  return out;
}

/**
 * Run the shared Repository API handler for a request whose normative path is `slug` (the segments a
 * rewrite peeled off `/packages/…`, `/.well-known/…`, etc.). Encoding each segment lets the handler's
 * own `decodeURIComponent` round-trip it back to the original id/version. Maps the handler's
 * transport-neutral response — JSON string **or** raw `.azp` bytes — onto a `fetch` `Response`.
 */
export async function serveRepository(req: Request, slug: string[] = []): Promise<Response> {
  const handle = await getHandler();
  // `slug` is `undefined` for the bare `/api/repository` match on an optional catch-all; default it.
  const path = "/" + slug.map(encodeURIComponent).join("/");
  const repoReq: RepoRequest = {
    method: req.method,
    path,
    query: new URL(req.url).searchParams,
    headers: headerMap(req),
    // Only POST /updates carries a body; reading it for a GET is harmless (empty).
    body: req.method === "GET" || req.method === "HEAD" ? undefined : await req.text(),
  };
  const out = await handle(repoReq);
  const body: BodyInit = typeof out.body === "string" ? out.body : new Uint8Array(out.body);
  return new Response(body, { status: out.status, headers: { ...out.headers, "cache-control": "no-store" } });
}
