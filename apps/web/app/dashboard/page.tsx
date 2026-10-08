'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { ShieldCheck, ArrowUpRight, ArrowDownLeft, Plus, Users, Wallet, Clock, AlertCircle } from 'lucide-react';
import { Button, Card, CardTitle, CardDescription, Badge } from '@warrantx/ui';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-800/80">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 flex items-center space-x-3">
              <span>Main Organization Treasury</span>
              <Badge variant="emerald">Testnet Active</Badge>
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Contract Address: CC2W...9K1Z
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
                <h3 className="text-2xl font-bold text-slate-100 mt-1">12,500.00 USDC</h3>
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
                <h3 className="text-2xl font-bold text-slate-100 mt-1">1,450.00 USDC</h3>
              </div>
              <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-cyan-400 h-full w-[29%]" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">29% of Total Team Monthly Allowance</p>
          </Card>

          <Card className="glass-panel">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-400">Pending Approvals</p>
                <h3 className="text-2xl font-bold text-amber-400 mt-1">2 Requests</h3>
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
                <h3 className="text-2xl font-bold text-slate-100 mt-1">5 Members</h3>
              </div>
              <div className="p-2 bg-slate-800 rounded-lg text-slate-300">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">3 Spenders, 2 Approvers, 1 Admin</p>
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
                  <tbody className="divide-y divide-slate-800/60">
                    <tr>
                      <td className="py-3.5 font-mono text-xs">REQ-002</td>
                      <td className="py-3.5 text-xs text-slate-300">Dev Core Spender</td>
                      <td className="py-3.5 text-xs font-mono text-slate-400">GBX...91KA</td>
                      <td className="py-3.5 font-semibold text-slate-100">450.00 USDC</td>
                      <td className="py-3.5"><Badge variant="amber">Pending (1/2)</Badge></td>
                    </tr>
                    <tr>
                      <td className="py-3.5 font-mono text-xs">REQ-001</td>
                      <td className="py-3.5 text-xs text-slate-300">Marketing Lead</td>
                      <td className="py-3.5 text-xs font-mono text-slate-400">GCD...88MZ</td>
                      <td className="py-3.5 font-semibold text-slate-100">100.00 USDC</td>
                      <td className="py-3.5"><Badge variant="emerald">Executed</Badge></td>
                    </tr>
                  </tbody>
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
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-300">Monthly Allowance</span>
                    <span className="text-emerald-400">500.00 USDC</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Used: 100.00 USDC</span>
                    <span>Remaining: 400.00 USDC</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-300">Approval Threshold</span>
                    <span className="text-amber-400 font-mono">200.00 USDC</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Payments &gt; 200 USDC require 2 approver signatures on-chain.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
