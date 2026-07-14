/**
 * Sort + kind controls for the browse/search page. Pure server component — every option is a `<Link>`
 * that re-navigates with the updated query string, so filtering works with no client JS. Sort is hidden
 * in search mode (text results are relevance-ranked); the kind filter applies to both.
 */
import Link from "next/link";

const SORTS = [
  { value: "downloads", label: "Popular" },
  { value: "rating", label: "Top rated" },
  { value: "updated", label: "Recent" },
  { value: "name", label: "Name" },
] as const;

const KINDS = [
  { value: "", label: "All" },
  { value: "asset", label: "Assets" },
  { value: "code", label: "Code" },
  { value: "app", label: "Apps" },
  { value: "mixed", label: "Mixed" },
] as const;

function href(params: { q?: string; sort?: string; kind?: string }): string {
  const sp = new URLSearchParams();
  if (params.q) sp.set("q", params.q);
  if (params.sort) sp.set("sort", params.sort);
  if (params.kind) sp.set("kind", params.kind);
  const s = sp.toString();
  return s ? `/search?${s}` : "/search";
}

export interface FilterBarProps {
  q?: string;
  sort: string;
  kind: string;
  /** Whether to show the sort control (hidden while a text query is active). */
  showSort: boolean;
}

export function FilterBar({ q, sort, kind, showSort }: FilterBarProps) {
  return (
    <div className="filterbar">
      {showSort ? (
        <div className="filter-group">
          <span className="filter-label">Sort</span>
          {SORTS.map((o) => (
            <Link
              key={o.value}
              className={`filter-chip${sort === o.value ? " active" : ""}`}
              href={href({ q, sort: o.value, kind })}
            >
              {o.label}
            </Link>
          ))}
        </div>
      ) : null}
      <div className="filter-group">
        <span className="filter-label">Kind</span>
        {KINDS.map((o) => (
          <Link
            key={o.value || "all"}
            className={`filter-chip${kind === o.value ? " active" : ""}`}
            href={href({ q, sort, kind: o.value })}
          >
            {o.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
