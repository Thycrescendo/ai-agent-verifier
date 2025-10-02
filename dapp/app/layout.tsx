import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Filecoin-Bim',
  description: 'Decentralized storage and on-chain cloud services',
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