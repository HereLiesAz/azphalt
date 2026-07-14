/**
 * `@azphalt/repository-server` — a reference implementation of the azphalt **Repository API**
 * (`spec/repository-api.md`), served over `@azphalt/registry`.
 *
 * The protocol logic is a transport-neutral {@link createRepositoryHandler}; {@link createRepositoryServer}
 * mounts it on Node's `http`. The free/paid split comes from the {@link Marketplace} overlay, and paid
 * downloads are gated by a pluggable {@link DownloadAuthorizer} ({@link InMemoryAuthorizer} is a
 * working default). Pair it with `@azphalt/repository-client` for the caller side.
 *
 * ```ts
 * import { Registry, Marketplace, InMemoryStore } from "@azphalt/registry";
 * import { createRepositoryServer, InMemoryAuthorizer } from "@azphalt/repository-server";
 *
 * const store = new InMemoryStore();
 * const registry = new Registry(store);
 * const marketplace = new Marketplace(registry, store);
 * const authorizer = new InMemoryAuthorizer().grantLicense("tok", "com.you.paid");
 * createRepositoryServer({ registry, marketplace, authorizer, index: { name: "My Repo", version: "0.1" } })
 *   .listen(8787);
 * ```
 */
export { createRepositoryHandler } from "./handler.js";
export type {
  RepositoryHandler,
  RepositoryHandlerOptions,
  RepoRequest,
  RepoResponse,
} from "./handler.js";
export { createRepositoryServer } from "./server.js";
export { InMemoryAuthorizer, EntitlementAuthorizer, denyAllAuthorizer } from "./authorize.js";
export type { DownloadAuthorizer, AuthDecision, AuthInput } from "./authorize.js";
