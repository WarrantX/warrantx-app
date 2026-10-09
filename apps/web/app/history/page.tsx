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
              <tbody><tr><td colSpan={6} className="py-10 text-center text-sm text-slate-500">No indexed on-chain transactions yet.</td></tr></tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
