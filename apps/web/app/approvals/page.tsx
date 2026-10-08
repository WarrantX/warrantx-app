'use client';

import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { CheckCircle2, XCircle, Clock, ShieldCheck, Play } from 'lucide-react';
import { Button, Card, CardTitle, CardDescription, Badge } from '@warrantx/ui';

export default function ApprovalsPage() {
  const [approvedList, setApprovedList] = useState<number[]>([]);
  const [executingId, setExecutingId] = useState<number | null>(null);

  const handleApprove = (id: number) => {
    setApprovedList((prev) => [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Payment Approval Queue</h1>
            <p className="text-xs text-slate-400 mt-1">Review & sign payment authorization requests on Stellar Soroban</p>
          </div>
          <Badge variant="amber" className="mt-2 md:mt-0 text-xs px-3 py-1">2 Pending Approvals</Badge>
        </div>

        <div className="space-y-6">
          <Card className="glass-panel border-amber-500/30">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <Badge variant="amber">Pending Approval</Badge>
                  <span className="text-xs font-mono text-slate-400">Request ID: #2</span>
                </div>
                <h3 className="text-xl font-bold text-slate-100 mt-1">450.00 USDC</h3>
                <p className="text-xs text-slate-300 mt-1">Spender: Dev Core Spender (GBX...91KA)</p>
                <p className="text-xs text-slate-400">Recipient: GBX...91KA</p>
                <p className="text-xs text-slate-400 italic mt-2">"Q4 Core Protocol Hosting & Node Infrastructure"</p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
                {approvedList.includes(2) ? (
                  <Button variant="outline" disabled size="sm">
                    <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-400" /> Signed (1/2 Approvals)
                  </Button>
                ) : (
                  <Button variant="primary" size="sm" onClick={() => handleApprove(2)}>
                    <CheckCircle2 className="w-4 h-4 mr-1.5" /> Sign & Approve Request
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="text-rose-400 hover:bg-rose-500/10">
                  Reject
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
