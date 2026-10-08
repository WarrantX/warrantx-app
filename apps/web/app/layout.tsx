import type { Metadata } from 'next';
import './globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'WarrantX | Programmable On-Chain Treasury Spending Controls',
  description: 'Manage organization treasuries on Stellar with contract-enforced spending limits, recurring allowances, and policy-based approval thresholds.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
