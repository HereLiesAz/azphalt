/**
 * Store sort orders, as pure comparators so every option can be tested without rendering.
 *
 * Every order is a total order: ties fall through to name, then id, so the same catalogue always
 * produces the same list regardless of the engine's sort stability or the input order.
 *
 * Only fields the catalogue really carries are used: install count, rating, `updatedAt`, name.
 * There is no "first published" field on a catalogue entry, so there is no "Newest" option.
 */
export type Sort = "popular" | "rating" | "recent" | "name" | "name-desc" | "not-installed" | "installed";

/** Orders that depend on the viewer's own install record, not on the catalogue. */
export const INSTALL_SORTS: ReadonlySet<Sort> = new Set<Sort>(["not-installed", "installed"]);

export const SORTS: Array<[Sort, string]> = [
  ["popular", "Popular"],
  ["rating", "Top rated"],
  ["recent", "Recently updated"],
  ["name", "Name A–Z"],
  ["name-desc", "Name Z–A"],
  ["not-installed", "Not installed first"],
  ["installed", "Installed first"],
];

export interface Sortable {
  id: string;
  name: string;
  rating?: number | null;
  updatedAt?: string;
  installs?: number;
  downloads?: number;
}

const installs = (p: Sortable) => p.installs ?? p.downloads ?? 0;
const byName = (a: Sortable, b: Sortable) =>
  a.name.localeCompare(b.name, undefined, { sensitivity: "base" }) || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
const byPopular = (a: Sortable, b: Sortable) => installs(b) - installs(a) || byName(a, b);

/**
 * Sort a copy of `items`. `isHeld` says whether the viewer has the package; it is only consulted by
 * the two install orders, which group on it and then order each group by popularity.
 */
export function sortPackages<T extends Sortable>(items: readonly T[], sort: Sort, isHeld: (id: string) => boolean = () => false): T[] {
  const cmp: (a: T, b: T) => number = {
    popular: byPopular,
    rating: (a: T, b: T) => (b.rating ?? -1) - (a.rating ?? -1) || byPopular(a, b),
    recent: (a: T, b: T) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? "") || byName(a, b),
    name: byName,
    "name-desc": (a: T, b: T) => byName(b, a),
    "not-installed": (a: T, b: T) => Number(isHeld(a.id)) - Number(isHeld(b.id)) || byPopular(a, b),
    installed: (a: T, b: T) => Number(isHeld(b.id)) - Number(isHeld(a.id)) || byPopular(a, b),
  }[sort];
  return [...items].sort(cmp);
}
