import Link from "next/link";

const MUTED = "#A29CAD";
const ON = "#E7E1EE";

/**
 * A minimal shared top-nav for the storefront's standalone React pages (`/publish`, `/purchases`,
 * `/connect/onboard`, `/checkout/success`). Those pages are reached directly or via Stripe redirects,
 * so without cross-links each one dead-ends. The main browse UI is the Compose/Wasm canvas at `/`,
 * linked here as "Store". `current` dims the active entry.
 */
export function PageNav({ current }: { current?: "store" | "publish" | "sell" | "purchases" }) {
  const items: Array<{ key: NonNullable<Parameters<typeof PageNav>[0]["current"]>; href: string; label: string }> = [
    { key: "store", href: "/", label: "Store" },
    { key: "publish", href: "/publish", label: "Publish" },
    { key: "sell", href: "/connect/onboard", label: "Sell" },
    { key: "purchases", href: "/purchases", label: "My purchases" },
  ];
  return (
    <nav style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: 14, marginBottom: 8 }}>
      {items.map((it) => (
        <Link
          key={it.key}
          href={it.href}
          style={{ color: it.key === current ? ON : MUTED, textDecoration: "none", fontWeight: it.key === current ? 600 : 400 }}
        >
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
