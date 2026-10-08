'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { ShieldCheck, Plus, ArrowDownLeft, Wallet, Building2, ExternalLink } from 'lucide-react';
import { Button, Card, CardTitle, CardDescription, Badge } from '@warrantx/ui';

export default function TreasuryPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Treasury Management</h1>
            <p className="text-xs text-slate-400 mt-1">Manage Soroban treasury custody instances & assets</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link href="/treasury/create">
              <Button variant="primary" size="sm">
                <Plus className="w-4 h-4 mr-1.5" /> Deploy New Treasury
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-panel border-emerald-500/30">
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="emerald" className="mb-2">Active Contract Treasury</Badge>
                <CardTitle className="text-xl">Core Protocol Treasury</CardTitle>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  CC2W...9K1Z
                </p>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                <Building2 className="w-6 h-6" />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center text-sm">
              <div>
                <span className="text-xs text-slate-400 block">Accepted Asset</span>
                <span className="font-semibold text-slate-200">USDC (Stellar Asset)</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Balance</span>
                <span className="font-bold text-emerald-400 text-lg">12,500.00 USDC</span>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <Link href="/treasury/deposit" className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  <ArrowDownLeft className="w-4 h-4 mr-1.5" /> Deposit Assets
                </Button>
              </Link>
              <a
                href="https://stellar.expert/explorer/testnet"
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <Button variant="secondary" size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-1.5" /> Explorer
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
