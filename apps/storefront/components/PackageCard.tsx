/**
 * A compact package card for browse/search grids. Shows the package's name, id, description, a few
 * at-a-glance facts, and — when the package is consigned on the paid lane — its list price. Pure
 * presentation: it takes a {@link PackageSummary} and an optional price, and links to the detail page.
 */
import Link from "next/link";
import type { Money, PackageSummary } from "@azphalt/registry";
import { formatCount, formatMoney, formatRating, kindLabel } from "../lib/format";

export interface PackageCardProps {
  pkg: PackageSummary;
  /** The active listing price, if this package is for sale. `undefined` → free (registry lane). */
  price?: Money;
}

export function PackageCard({ pkg, price }: PackageCardProps) {
  const contributionTotal =
    pkg.contributes.filters + pkg.contributes.tools + pkg.contributes.commands;
  const isApp = pkg.kind === "app";

  return (
    <article className="card">
      <div className="card-title">
        <Link href={`/p/${pkg.id}`}>{pkg.name}</Link>
        {isApp ? (
          <span className="kind-badge app">App</span>
        ) : price ? (
          <span className="price-badge">{formatMoney(price)}</span>
        ) : (
          <span className="free-badge">Free</span>
        )}
      </div>
      <div className="id">{pkg.id}</div>
      {pkg.description ? <p className="desc">{pkg.description}</p> : null}

      <div className="chips">
        <span className="chip">{kindLabel(pkg.kind)}</span>
        {pkg.assetTypes.map((t) => (
          <span className="chip" key={t}>
            {t}
          </span>
        ))}
        {contributionTotal > 0 ? (
          <span className="chip">
            {contributionTotal} contribution{contributionTotal === 1 ? "" : "s"}
          </span>
        ) : null}
      </div>

      <div className="meta">
        <span>v{pkg.version}</span>
        {pkg.author ? <span>by {pkg.author}</span> : null}
        <span>{formatCount(pkg.downloads)} downloads</span>
        {formatRating(pkg.rating, pkg.ratingCount) ? (
          <span className="rating">{formatRating(pkg.rating, pkg.ratingCount)}</span>
        ) : null}
      </div>
    </article>
  );
}
