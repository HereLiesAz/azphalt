/**
 * Client-only presentation taxonomy. The JSON lives in Compose's multiplatform
 * resources and is imported verbatim by React, so hosts can reuse the same rules
 * without adding fields, indexes, or endpoints to the repository API.
 */
import taxonomy from "../../storefront-cmp/src/commonMain/composeResources/files/store-taxonomy.json";
import type { PackageSummary } from "./api";

export interface StoreCategory {
  id: string;
  label: string;
  parent?: string;
  idContains?: string[];
  idEquals?: string[];
  kinds?: string[];
  types?: string[];
  mediaDomains?: string[];
}

export const STORE_TAXONOMY_VERSION = taxonomy.schema;
export const STORE_CATEGORIES: StoreCategory[] = taxonomy.categories;

function explicitMatch(pkg: PackageSummary, category: StoreCategory): boolean {
  const id = pkg.id.toLowerCase();
  const types = (pkg.types ?? []).map((t) => t.toLowerCase());
  const media = (pkg.mediaDomains ?? []).map((t) => t.toLowerCase());
  return !!(
    category.idEquals?.some((s) => id === s.toLowerCase()) ||
    category.idContains?.some((s) => id.includes(s.toLowerCase())) ||
    category.kinds?.some((s) => pkg.kind.toLowerCase() === s.toLowerCase()) ||
    category.types?.some((s) => types.includes(s.toLowerCase())) ||
    category.mediaDomains?.some((s) => media.includes(s.toLowerCase()))
  );
}

/** A child category also includes its package in each of its ancestors. */
export function storeCategoryKeys(pkg: PackageSummary): string[] {
  const matched = new Set<string>();
  for (const category of STORE_CATEGORIES) {
    if (!explicitMatch(pkg, category)) continue;
    let current: StoreCategory | undefined = category;
    const visited = new Set<string>();
    while (current && !visited.has(current.id)) {
      visited.add(current.id);
      matched.add(current.id);
      current = STORE_CATEGORIES.find((candidate) => candidate.id === current?.parent);
    }
  }
  // Unknown future formats remain discoverable without updating a backend.
  if (!matched.size) matched.add("kind/" + pkg.kind.toLowerCase());
  return [...matched];
}

/** Show only categories that occur in the loaded catalog, in curated order. */
export function availableStoreCategories(packages: PackageSummary[]): StoreCategory[] {
  const keys = new Set(packages.flatMap(storeCategoryKeys));
  const known = STORE_CATEGORIES.filter((c) => keys.has(c.id));
  const extra = [...keys].filter((key) => key.startsWith("kind/"))
    .sort().map((id) => ({ id, label: id.slice(5).replace(/^./, (c) => c.toUpperCase()) }));
  return [...known, ...extra];
}

export function storeCategoryLabel(id: string): string {
  const match = STORE_CATEGORIES.find((category) => category.id === id);
  return match?.label ?? id.slice(id.indexOf("/") + 1).replace(/^./, (c) => c.toUpperCase());
}
