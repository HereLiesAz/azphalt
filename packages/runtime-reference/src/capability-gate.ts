import type { Host, Capability } from "@azphalt/sdk";

/**
 * Builds a restricted view of the Host, exposing only the sub-APIs granted by the manifest.
 */
export function buildGrantedHost(fullHost: Host, capabilities: Capability[] = []): Partial<Host> {
  const granted: Partial<Host> = {};

  const grantSet = new Set(capabilities);

  // We map the requested capabilities to the Host keys.
  // Using a whitelist approach.
  if (grantSet.has("canvas")) granted.canvas = fullHost.canvas;
  if (grantSet.has("layers")) granted.layers = fullHost.layers;
  if (grantSet.has("bitmap")) granted.bitmap = fullHost.bitmap;
  if (grantSet.has("selection")) granted.selection = fullHost.selection;
  if (grantSet.has("color")) granted.color = fullHost.color;
  if (grantSet.has("params")) granted.params = fullHost.params;
  if (grantSet.has("assets")) granted.assets = fullHost.assets;

  return granted;
}
