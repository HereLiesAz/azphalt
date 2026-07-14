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
const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };
/** Emit the normative `{ error: { code, message } }` envelope for adapter-level failures. */
const errorBody = (code: string, message: string) => JSON.stringify({ error: { code, message } });

/** Cap a buffered request body (only `POST /updates` has one) so one client can't exhaust memory. */
const MAX_BODY_BYTES = 1 << 20; // 1 MiB

export function createRepositoryServer(opts: RepositoryHandlerOptions): Server {
  const handle = createRepositoryHandler(opts);
  return createServer((req: IncomingMessage, res: ServerResponse) => {
    let repoReq: RepoRequest;
    try {
      // A dummy origin lets URL parse a path-only request-target; only pathname + search are read.
      // `new URL` throws synchronously on a malformed request-target — catch it so one bad client
      // can't crash the process (DoS); answer 400 instead.
      const url = new URL(req.url ?? "/", "http://repository.local");
      repoReq = {
        method: req.method ?? "GET",
        path: url.pathname,
        query: url.searchParams,
        headers: normalizeHeaders(req.headers),
      };
    } catch {
      res.writeHead(400, JSON_HEADERS);
      res.end(errorBody("bad_request", "bad request: malformed URL"));
      return;
    }

    const run = () =>
      handle(repoReq)
        .then((out) => {
          res.writeHead(out.status, out.headers);
          res.end(typeof out.body === "string" ? out.body : Buffer.from(out.body));
        })
        .catch((e: unknown) => {
          res.writeHead(500, JSON_HEADERS);
          res.end(errorBody("server_error", `internal error: ${e instanceof Error ? e.message : String(e)}`));
        });

    // GET/HEAD carry no body; anything else may (the handler only reads it for POST /updates). Buffer
    // it with a hard cap, then dispatch.
    if (req.method === "GET" || req.method === "HEAD") {
      void run();
      return;
    }
    const chunks: Buffer[] = [];
    let size = 0;
    let tooLarge = false;
    req.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        tooLarge = true;
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      if (tooLarge) {
        res.writeHead(413, JSON_HEADERS);
        res.end(errorBody("bad_request", "request body too large"));
        return;
      }
      repoReq.body = Buffer.concat(chunks).toString("utf8");
      void run();
    });
    req.on("error", () => {
      res.writeHead(400, JSON_HEADERS);
      res.end(errorBody("bad_request", "error reading request body"));
    });
  });
}
