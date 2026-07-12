/**
 * `@azphalt/runtime-reference` — a reference host that loads a `.azp`, verifies it, builds the
 * host-function table from the granted capabilities, and dispatches a contribution against an
 * in-memory {@link World}. It is the executable form of the contract in `spec/`.
 *
 * **Honest scope.** This first cut exercises the *contract* — capability gating (an ungranted
 * capability is absent, not erroring), the RGBA8 image-buffer ABI, and contribution dispatch —
 * by running a *trusted* extension module in-process. The WASM isolation substrate
 * (QuickJS-in-WASM for `runtime: js`, raw WASM for `runtime: wasm`) that sandboxes untrusted
 * code is the conformance target a production host adds on top; it is intentionally out of scope
 * here. Because there is no sandbox, callers supply the already-imported extension module.
 */
import { readAzp, verifyAzp } from "@azphalt/azp";
import type {
  CommandFn,
  FilterContext,
  FilterFn,
  Manifest,
  ToolFn,
} from "@azphalt/sdk";
import { createHost } from "./host.js";
import type { World } from "./world.js";

export * from "./world.js";
export { createHost } from "./host.js";
export type { RuntimeHost } from "./host.js";

/** Matches the brand `defineFilter`/`defineTool`/`defineCommand` attach to a contribution. */
const KIND = Symbol.for("azphalt.contribution");

/** A verified, parsed `.azp` ready to run. */
export interface LoadedExtension {
  manifest: Manifest;
  /** Every entry except `manifest.json`, by in-package path. */
  payload: Record<string, Uint8Array>;
}

/** The extension's module namespace — its exported contributions, keyed by export name. */
export type ExtensionModule = Record<string, unknown>;

/** Thrown when a `.azp` fails verification or a contribution cannot be dispatched. */
export class AzpError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AzpError";
  }
}

/** Verify a `.azp` and parse its manifest + payload. Throws {@link AzpError} if verification fails. */
export function open(azp: Uint8Array): LoadedExtension {
  const v = verifyAzp(azp);
  if (!v.ok) throw new AzpError(`azp verification failed: ${v.errors.join("; ")}`);
  return readAzp(azp);
}

function brandOf(x: unknown): "filter" | "tool" | "command" | undefined {
  if (typeof x !== "function") return undefined;
  return (x as unknown as Record<symbol, unknown>)[KIND] as "filter" | "tool" | "command" | undefined;
}

function resolve(module: ExtensionModule, entry: string, kind: "filter" | "tool" | "command"): unknown {
  const fn = module[entry];
  if (brandOf(fn) !== kind) {
    throw new AzpError(`export '${entry}' is not a ${kind} contribution (use define${kind[0].toUpperCase()}${kind.slice(1)})`);
  }
  return fn;
}

/**
 * Dispatch a filter from `manifest.contributes.filters` against `world`. Runs the first filter,
 * or the one whose `id` matches `filterId`. The host is built from the granted capabilities only.
 */
export async function runFilter(
  manifest: Manifest,
  module: ExtensionModule,
  world: World,
  filterId?: string,
): Promise<void> {
  const filters = manifest.contributes?.filters ?? [];
  const f = filterId ? filters.find((x) => x.id === filterId) : filters[0];
  if (!f) throw new AzpError(`no filter${filterId ? ` '${filterId}'` : ""} in manifest.contributes`);
  const fn = resolve(module, f.entry, "filter") as FilterFn;
  const host = createHost(manifest, world);
  const active = world.layers.find((l) => l.id === world.activeLayerId);
  if (!active) throw new AzpError("world has no active layer");
  // The context is the granted host plus the target layer. Ungranted sub-APIs are absent at
  // runtime (the capability contract); the cast reflects that this is a partial host by design.
  const ctx = { ...host, target: { id: active.id } } as unknown as FilterContext;
  await fn(ctx);
}

/** Dispatch a tool from `manifest.contributes.tools`. */
export async function runTool(
  manifest: Manifest,
  module: ExtensionModule,
  world: World,
  toolId?: string,
): Promise<void> {
  const tools = manifest.contributes?.tools ?? [];
  const t = toolId ? tools.find((x) => x.id === toolId) : tools[0];
  if (!t) throw new AzpError(`no tool${toolId ? ` '${toolId}'` : ""} in manifest.contributes`);
  const fn = resolve(module, t.entry, "tool") as ToolFn;
  await fn(createHost(manifest, world) as never);
}

/** Dispatch a command from `manifest.contributes.commands`. */
export async function runCommand(
  manifest: Manifest,
  module: ExtensionModule,
  world: World,
  commandId?: string,
): Promise<void> {
  const commands = manifest.contributes?.commands ?? [];
  const c = commandId ? commands.find((x) => x.id === commandId) : commands[0];
  if (!c) throw new AzpError(`no command${commandId ? ` '${commandId}'` : ""} in manifest.contributes`);
  const fn = resolve(module, c.entry, "command") as CommandFn;
  await fn(createHost(manifest, world) as never);
}
