import Link from "next/link";
import type { Money } from "@azphalt/registry";

export function PackageCard({ pkg, price }: { pkg: any; price?: Money }) {
  return (
    <Link href={`/pkg/${pkg.id}`} className="card package-card">
      <div className="card-header">
        <h3>{pkg.name || pkg.id}</h3>
        {price && (
          <span className="price">
            {(price.amountCents / 100).toFixed(2)} {price.currency}
          </span>
        )}
      </div>
      <p className="card-desc">{pkg.description}</p>
      <div className="card-meta">
        <span className="author">by {pkg.author || 'Unknown'}</span>
        <span className="version">v{pkg.version}</span>
      </div>
    </Link>
  );
}
