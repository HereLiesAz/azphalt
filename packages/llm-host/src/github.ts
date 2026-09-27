/** The few GitHub REST calls a sandbox needs, over `fetch`, with no client library. */

export interface GitHubClient {
  /** A token for the sandbox repository: the one-time setup token for install, any token that can
   *  dispatch workflows and read runs for a run. It is sent only to [apiBase]. */
  token: string;
  /** Default `https://api.github.com`; set for GitHub Enterprise. */
  apiBase?: string;
  fetch?: typeof fetch;
}

export class GitHubError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "GitHubError";
  }
}

function headers(client: GitHubClient, json: boolean): Record<string, string> {
  return {
    authorization: `Bearer ${client.token}`,
    accept: "application/vnd.github+json",
    "x-github-api-version": "2022-11-28",
    ...(json ? { "content-type": "application/json" } : {}),
  };
}

/** One JSON call. Throws {@link GitHubError} on any non-2xx answer. */
export async function gh<T = unknown>(client: GitHubClient, method: string, path: string, body?: unknown): Promise<T> {
  const res = await (client.fetch ?? fetch)((client.apiBase ?? "https://api.github.com") + path, {
    method,
    headers: headers(client, body !== undefined),
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) throw new GitHubError(res.status, `${method} ${path}: HTTP ${res.status}`);
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

/**
 * A binary download (an artifact archive), refusing anything over [maxBytes] before reading it all.
 * GitHub answers with a redirect to signed storage; `fetch` follows it and drops the Authorization
 * header on the cross-origin hop, which is what the signed URL expects.
 */
export async function ghBytes(client: GitHubClient, path: string, maxBytes: number): Promise<Uint8Array> {
  const res = await (client.fetch ?? fetch)((client.apiBase ?? "https://api.github.com") + path, {
    headers: headers(client, false),
  });
  if (!res.ok) throw new GitHubError(res.status, `GET ${path}: HTTP ${res.status}`);
  const declared = Number(res.headers.get("content-length") ?? "0");
  if (declared > maxBytes) throw new Error(`download is ${declared} bytes; the limit is ${maxBytes}`);
  const bytes = new Uint8Array(await res.arrayBuffer());
  if (bytes.length > maxBytes) throw new Error(`download is ${bytes.length} bytes; the limit is ${maxBytes}`);
  return bytes;
}

export const sleep = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason);
    const t = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(t);
      reject(signal.reason);
    }, { once: true });
  });
