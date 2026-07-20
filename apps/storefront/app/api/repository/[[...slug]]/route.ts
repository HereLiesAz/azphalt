/**
 * The normative Repository API endpoints, mounted as a catch-all. The public paths a host actually
 * calls — `/.well-known/azphalt-repository.json`, `/packages`, `/packages/{id}`,
 * `/packages/{id}/versions/{version}/download`, `/revocations`, `/updates` — are routed here by the
 * `beforeFiles` rewrites in `next.config.mjs`, which peel the path into `slug`. All protocol logic
 * lives in the shared `@azphalt/repository-server` handler (see `lib/repository.ts`); this file only
 * adapts Next's `Request`/`params` to it.
 */
import { serveRepository } from "../../../../lib/repository";

export const dynamic = "force-dynamic";

async function handle(req: Request, ctx: { params: Promise<{ slug?: string[] }> }): Promise<Response> {
  const { slug = [] } = await ctx.params;
  return serveRepository(req, slug);
}

// GET covers browse/detail/download/index/revocations; POST is only the batch `/updates` check.
export const GET = handle;
export const POST = handle;
