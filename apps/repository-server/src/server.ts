/**
 * A Node `http` adapter over the transport-neutral {@link RepositoryHandler}. It translates an
 * `IncomingMessage` into a {@link RepoRequest}, runs the handler, and writes the {@link RepoResponse}
 * back — handling both JSON string bodies and binary `.azp` byte bodies. Nothing here has protocol
 * logic; that all lives in `handler.ts`.
 */
import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { createRepositoryHandler, type RepoRequest, type RepositoryHandlerOptions } from "./handler.js";

/** Normalize Node's header bag (values can be `string | string[]`) to a lower-cased string map. */
function normalizeHeaders(raw: IncomingMessage["headers"]): Record<string, string | undefined> {
  const out: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(raw)) out[k.toLowerCase()] = Array.isArray(v) ? v.join(", ") : v;
  return out;
}

/**
 * Build (but do not start) a Node HTTP server implementing the Repository API. Call `.listen(port)`
 * to serve. The `host` in incoming URLs is irrelevant — only the path and query are used.
 */
export function createRepositoryServer(opts: RepositoryHandlerOptions): Server {
  const handle = createRepositoryHandler(opts);
  return createServer((req: IncomingMessage, res: ServerResponse) => {
    // A dummy origin lets URL parse a path-only request-target; only pathname + search are read.
    const url = new URL(req.url ?? "/", "http://repository.local");
    const repoReq: RepoRequest = {
      method: req.method ?? "GET",
      path: url.pathname,
      query: url.searchParams,
      headers: normalizeHeaders(req.headers),
    };
    handle(repoReq)
      .then((out) => {
        res.writeHead(out.status, out.headers);
        res.end(typeof out.body === "string" ? out.body : Buffer.from(out.body));
      })
      .catch((e: unknown) => {
        res.writeHead(500, { "content-type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ error: `internal error: ${e instanceof Error ? e.message : String(e)}` }));
      });
  });
}
