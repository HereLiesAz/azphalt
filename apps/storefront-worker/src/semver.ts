/**
 * Semver precedence for `POST /updates` — the same ordering as `compareSemver` in
 * `packages/registry/src/registry.ts`, which the Worker cannot import (that package needs
 * `node:crypto`). Keep the two in step.
 *
 * Returns >0 if [a] is newer, <0 if older, 0 if equal precedence. A release outranks a prerelease of
 * the same `x.y.z`; prerelease identifiers compare numerically when both are numeric, numeric below
 * alphanumeric, otherwise lexically. Build metadata is ignored. Non-semver strings sort oldest.
 */
const SEMVER_RE =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

export function compareSemver(a: string, b: string): number {
  const pa = SEMVER_RE.exec(a);
  const pb = SEMVER_RE.exec(b);
  if (!pa && !pb) return a === b ? 0 : a < b ? -1 : 1;
  if (!pa) return -1;
  if (!pb) return 1;
  for (let i = 1; i <= 3; i++) {
    const d = Number(pa[i]) - Number(pb[i]);
    if (d !== 0) return d < 0 ? -1 : 1;
  }
  const preA = pa[4];
  const preB = pb[4];
  if (!preA && !preB) return 0;
  if (!preA) return 1;
  if (!preB) return -1;
  const idsA = preA.split(".");
  const idsB = preB.split(".");
  for (let i = 0; i < Math.max(idsA.length, idsB.length); i++) {
    const x = idsA[i];
    const y = idsB[i];
    if (x === undefined) return -1;
    if (y === undefined) return 1;
    if (x === y) continue;
    const nx = /^(0|[1-9]\d*)$/.test(x);
    const ny = /^(0|[1-9]\d*)$/.test(y);
    if (nx && ny) return Number(x) < Number(y) ? -1 : 1;
    if (nx) return -1;
    if (ny) return 1;
    return x < y ? -1 : 1;
  }
  return 0;
}
