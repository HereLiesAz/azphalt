/**
 * Package detail page. Shows the full aggregate summary — name, author, description, kind,
 * capabilities, asset types, contribution counts, downloads — plus the version history and a
 * download link (the free registry lane). When the package is consigned on the paid lane, it also
 * shows the honest money split (gross → processor fee, platform fee → seller net) and a Buy button.
 */
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatalog } from "../../../lib/catalog";
import { BuyButton } from "../../../components/BuyButton";
import { formatCount, formatDate, formatMoney, kindLabel } from "../../../lib/format";

export const dynamic = "force-dynamic";

interface DetailPageProps {
  // Next 15: dynamic route params are delivered as a Promise.
  params: Promise<{ id: string }>;
}

export default async function PackageDetailPage({ params }: DetailPageProps) {
  const id = decodeURIComponent((await params).id);
  const { registry, market } = await getCatalog();

  const pkg = await registry.getPackage(id);
  if (!pkg) notFound();

  const { summary, versions } = pkg;
  const listing = await market.getListing(id);
  const forSale = listing?.status === "active";
  const breakdown = forSale ? await market.quote(id) : null;

  const contributionTotal =
    summary.contributes.filters + summary.contributes.tools + summary.contributes.commands;

  return (
    <>
      <p className="detail-sub">
        <Link href="/">← Browse</Link>
      </p>

      <div className="detail-head">
        <div>
          <h1>{summary.name}</h1>
          <div className="detail-sub">
            <span className="id">{summary.id}</span>
            {summary.author ? <> · by {summary.author}</> : null}
            {summary.homepage ? (
              <>
                {" "}
                ·{" "}
                <a href={summary.homepage} rel="noreferrer noopener nofollow">
                  homepage
                </a>
              </>
            ) : null}
          </div>
        </div>
        <div>
          {forSale && listing ? (
            <span className="price-badge">{formatMoney(listing.price)}</span>
          ) : (
            <span className="free-badge">Free · registry lane</span>
          )}
        </div>
      </div>

      {summary.description ? <p className="lede" style={{ marginTop: 16 }}>{summary.description}</p> : null}

      <div className="btn-row">
        {/* Download is the free lane: GET the .azp bytes straight from the registry. */}
        <a className="btn primary" href={`/api/download/${encodeURIComponent(summary.id)}`}>
          Download .azp (v{summary.version})
        </a>
      </div>

      <div className="detail-grid">
        <div>
          <div className="panel">
            <h3>Details</h3>
            <dl className="facts">
              <dt>Kind</dt>
              <dd>{kindLabel(summary.kind)}</dd>
              <dt>Latest version</dt>
              <dd>{summary.version}</dd>
              <dt>License</dt>
              <dd>{summary.license}</dd>
              <dt>Downloads</dt>
              <dd>{formatCount(summary.downloads)}</dd>
              <dt>First published</dt>
              <dd>{formatDate(summary.publishedAt)}</dd>
              <dt>Last updated</dt>
              <dd>{formatDate(summary.updatedAt)}</dd>
              <dt>Asset types</dt>
              <dd>{summary.assetTypes.length ? summary.assetTypes.join(", ") : "—"}</dd>
              <dt>Capabilities</dt>
              <dd>{summary.capabilities.length ? summary.capabilities.join(", ") : "—"}</dd>
              <dt>Contributions</dt>
              <dd>
                {contributionTotal === 0
                  ? "—"
                  : [
                      summary.contributes.filters ? `${summary.contributes.filters} filter(s)` : null,
                      summary.contributes.tools ? `${summary.contributes.tools} tool(s)` : null,
                      summary.contributes.commands ? `${summary.contributes.commands} command(s)` : null,
                    ]
                      .filter(Boolean)
                      .join(", ")}
              </dd>
            </dl>
          </div>

          <div className="panel" style={{ marginTop: 20 }}>
            <h3>Version history</h3>
            <ul className="versions">
              {versions.map((v) => (
                <li key={v.version}>
                  <span className={v.yanked ? "v yanked" : "v"}>v{v.version}</span>
                  <span className="muted">{formatDate(v.publishedAt)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          {forSale && listing && breakdown ? (
            <div className="panel">
              <h3>Consignment</h3>
              <p className="detail-sub" style={{ marginBottom: 12 }}>
                Sold on consignment by <strong>{listing.sellerId}</strong>. Here is exactly where the
                money goes on each sale — nothing hand-waved.
              </p>
              <table className="breakdown">
                <tbody>
                  <tr>
                    <td>Buyer pays (gross)</td>
                    <td>{formatMoney(breakdown.gross)}</td>
                  </tr>
                  <tr>
                    <td className="muted">Payment processor fee</td>
                    <td className="muted">−{formatMoney(breakdown.processorFee)}</td>
                  </tr>
                  <tr>
                    <td className="muted">Platform consignment fee</td>
                    <td className="muted">−{formatMoney(breakdown.platformFee)}</td>
                  </tr>
                  <tr className="net">
                    <td>Seller receives</td>
                    <td>{formatMoney(breakdown.sellerNet)}</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ marginTop: 16 }}>
                <BuyButton packageId={summary.id} />
              </div>

              <p className="note">
                Payments are stubbed in this dev storefront — the demo payment provider moves no real
                money. A production deployment plugs in a marketplace-capable, split-payout
                merchant-of-record.
              </p>
            </div>
          ) : (
            <div className="panel">
              <h3>Free on the open lane</h3>
              <p className="detail-sub">
                This package is published to the free registry — no fee, no listing. Download it above
                and run it in any conforming host.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
