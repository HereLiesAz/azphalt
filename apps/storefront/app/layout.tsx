import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Azphalt Storefront',
  description: 'Azphalt plugin and asset marketplace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
