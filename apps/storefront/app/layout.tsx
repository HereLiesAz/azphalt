import type { Metadata } from "next";
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
        {children}
      </body>
    </html>
  );
}
