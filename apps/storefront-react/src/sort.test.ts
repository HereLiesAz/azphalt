import { describe, expect, it } from "vitest";
import { SORTS, sortPackages, type Sort, type Sortable } from "./sort";

const P = (id: string, name: string, o: Partial<Sortable> = {}): Sortable => ({ id, name, ...o });
const items = [
  P("c", "charlie", { installs: 5, rating: 4, updatedAt: "2026-01-02" }),
  P("a", "Alpha", { installs: 50, rating: 4.5, updatedAt: "2026-03-01" }),
  P("b", "bravo", { downloads: 5, updatedAt: "2026-02-01" }),
  P("d", "Delta", { installs: 50 }),
];
const held = new Set(["a", "b"]);
const ids = (s: Sort, list = items) => sortPackages(list, s, (id) => held.has(id)).map((p) => p.id);

describe("sortPackages", () => {
  it("popular: installs (fallback downloads) desc, ties by name", () => expect(ids("popular")).toEqual(["a", "d", "b", "c"]));
  it("rating: unrated last, ties by popularity", () => expect(ids("rating")).toEqual(["a", "c", "d", "b"]));
  it("recent: updatedAt desc, missing last", () => expect(ids("recent")).toEqual(["a", "b", "c", "d"]));
  it("name A-Z is case-insensitive", () => expect(ids("name")).toEqual(["a", "b", "c", "d"]));
  it("name Z-A is the exact reverse", () => expect(ids("name-desc")).toEqual(["d", "c", "b", "a"]));
  it("not-installed first, each group by popularity", () => expect(ids("not-installed")).toEqual(["d", "c", "a", "b"]));
  it("installed first, each group by popularity", () => expect(ids("installed")).toEqual(["a", "b", "d", "c"]));
  it("install orders treat everything as not held when nothing is held", () => {
    expect(sortPackages(items, "not-installed").map((p) => p.id)).toEqual(ids("popular"));
  });
  it.each(SORTS.map(([k]) => k))("%s is deterministic for any input order and does not mutate", (s) => {
    const copy = [...items];
    expect(ids(s, [...items].reverse())).toEqual(ids(s));
    expect(items).toEqual(copy);
  });
  it("breaks full ties on id", () => {
    const t = [P("z", "Same"), P("y", "Same")];
    expect(sortPackages(t, "name").map((p) => p.id)).toEqual(["y", "z"]);
  });
});
