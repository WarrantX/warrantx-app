'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { History, ExternalLink, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Card, CardTitle, CardDescription, Badge } from '@warrantx/ui';

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Transaction & Audit History</h1>
            <p className="text-xs text-slate-400 mt-1">Complete immutable record of on-chain treasury events</p>
          </div>
        </div>

        <Card className="glass-panel">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase font-medium">
                  <th className="pb-3">Transaction Hash</th>
                  <th className="pb-3">Event Type</th>
                  <th className="pb-3">Sender / Actor</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Ledger</th>
                  <th className="pb-3 text-right">Explorer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-3.5 font-mono text-xs text-slate-300">a9c8...4f1e</td>
                  <td className="py-3.5"><Badge variant="emerald">Payment Execution</Badge></td>
                  <td className="py-3.5 font-mono text-xs text-slate-400">GBX...91KA</td>
                  <td className="py-3.5 font-semibold text-slate-100">100.00 USDC</td>
                  <td className="py-3.5 font-mono text-xs text-slate-400">#492102</td>
                  <td className="py-3.5 text-right">
                    <a href="https://stellar.expert/explorer/testnet" target="_blank" rel="noreferrer" className="text-xs text-emerald-400 hover:underline inline-flex items-center">
                      View <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 font-mono text-xs text-slate-300">b12d...90a1</td>
                  <td className="py-3.5"><Badge variant="cyan">Deposit</Badge></td>
                  <td className="py-3.5 font-mono text-xs text-slate-400">GAAX...4K9Z</td>
                  <td className="py-3.5 font-semibold text-slate-100">12,500.00 USDC</td>
                  <td className="py-3.5 font-mono text-xs text-slate-400">#491880</td>
                  <td className="py-3.5 text-right">
                    <a href="https://stellar.expert/explorer/testnet" target="_blank" rel="noreferrer" className="text-xs text-emerald-400 hover:underline inline-flex items-center">
                      View <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
