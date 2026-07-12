/**
 * Root layout for the azphalt storefront. Renders the shared header (brand, nav, search) and a
 * footer around every page. No external fonts or scripts — the system font stack and inline global
 * CSS keep the app fully self-contained.
 */
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "azphalt storefront",
  description:
    "The consignment marketplace on the open azphalt extension standard — portable brushes, filters, " +
    "and asset packs that run in any conforming app.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="inner">
            <Link href="/" className="brand">
              <span>
                <span className="mark">azphalt</span> storefront
              </span>
              <span className="sub">consignment marketplace</span>
            </Link>
            <nav className="site-nav">
              <Link href="/">Browse</Link>
              <Link href="/search?q=lut">Search</Link>
            </nav>
            {/* Plain GET form → /search?q=… ; works without client JS. */}
            <form className="header-search" action="/search" method="get" role="search">
              <input
                type="search"
                name="q"
                placeholder="Search extensions…"
                aria-label="Search extensions"
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </header>

        <main>
          <div className="container">{children}</div>
        </main>

        <footer className="site-footer">
          <div className="container">
            <span>
              Built on the open <strong>azphalt</strong> standard (MIT). The registry lane is free and
              self-hostable; this storefront is the consignment lane.
            </span>
            <span>Payments here are stubbed — no real money moves.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
