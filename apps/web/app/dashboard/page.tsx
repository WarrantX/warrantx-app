'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { ShieldCheck, ArrowUpRight, ArrowDownLeft, Plus, Users, Wallet, Clock, AlertCircle } from 'lucide-react';
import { Button, Card, CardTitle, CardDescription, Badge } from '@warrantx/ui';

export default function DashboardPage() {
  const isConfigured = Boolean(process.env.NEXT_PUBLIC_TREASURY_CONTRACT_ID);
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-800/80">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 flex items-center space-x-3">
              <span>Main Organization Treasury</span>
              <Badge variant={isConfigured ? 'emerald' : 'amber'}>{isConfigured ? 'Configured' : 'Awaiting contract deployment'}</Badge>
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Contract Address: {process.env.NEXT_PUBLIC_TREASURY_CONTRACT_ID || 'Not configured'}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link href="/treasury/deposit">
              <Button variant="outline" size="sm">
                <ArrowDownLeft className="w-4 h-4 mr-1.5" /> Deposit Funds
              </Button>
            </Link>
            <Link href="/payments/request">
              <Button variant="primary" size="sm">
                <Plus className="w-4 h-4 mr-1.5" /> New Payment Request
              </Button>
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-panel">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-400">Total Treasury Balance</p>
                <h3 className="text-2xl font-bold text-slate-100 mt-1">—</h3>
              </div>
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">Verified On-Chain SAC Token State</p>
          </Card>

          <Card className="glass-panel">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-400">Current Period Spend</p>
                <h3 className="text-2xl font-bold text-slate-100 mt-1">—</h3>
              </div>
              <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-cyan-400 h-full w-0" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Available after indexed policy activity</p>
          </Card>

          <Card className="glass-panel">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-400">Pending Approvals</p>
                <h3 className="text-2xl font-bold text-amber-400 mt-1">—</h3>
              </div>
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">Requires Approver Signatures</p>
          </Card>

          <Card className="glass-panel">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-400">Active Members</p>
                <h3 className="text-2xl font-bold text-slate-100 mt-1">—</h3>
              </div>
              <div className="p-2 bg-slate-800 rounded-lg text-slate-300">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">Available after treasury configuration</p>
          </Card>
        </div>

        {/* Payment Requests & Approvals Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Table */}
          <div className="lg:col-span-2">
            <Card className="glass-panel">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <CardTitle>Recent Payment Activity</CardTitle>
                  <CardDescription>On-Chain verified requests & execution status</CardDescription>
                </div>
                <Link href="/history">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>

              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase font-medium">
                      <th className="pb-3">Request ID</th>
                      <th className="pb-3">Spender</th>
                      <th className="pb-3">Recipient</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody><tr><td colSpan={5} className="py-10 text-center text-sm text-slate-500">No indexed payment activity yet.</td></tr></tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Side Info */}
          <div>
            <Card className="glass-panel">
              <CardTitle className="text-slate-100">Active Policy Summary</CardTitle>
              <CardDescription>Your current allowance limit & reset rules</CardDescription>

              <div className="mt-4 space-y-4">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                  <p className="text-xs text-slate-400">No active indexed policy.</p>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                  <p className="text-xs text-slate-400">Configure a treasury contract to display enforced thresholds.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
