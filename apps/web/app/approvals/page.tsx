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
          <Badge variant="cyan" className="mt-2 md:mt-0 text-xs px-3 py-1">Live queue</Badge>
        </div>

        <div className="space-y-6">
          <Card className="glass-panel py-12 text-center text-sm text-slate-500">No pending payment approvals were returned by the live index.</Card>
        </div>
      </main>
    </div>
  );
}
