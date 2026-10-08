'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '../../../components/Navbar';
import { ArrowLeft, ArrowDownLeft } from 'lucide-react';
import { Button, Card, CardTitle, CardDescription } from '@warrantx/ui';

export default function DepositPage() {
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="max-w-xl mx-auto px-4 py-8 w-full">
        <Link href="/treasury" className="inline-flex items-center text-xs text-slate-400 hover:text-emerald-400 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Treasury
        </Link>

        <Card className="glass-panel">
          <CardTitle className="text-xl flex items-center space-x-2">
            <ArrowDownLeft className="w-5 h-5 text-emerald-400" />
            <span>Deposit Treasury Funds</span>
          </CardTitle>
          <CardDescription>
            Transfer supported Stellar assets into the Soroban contract custody
          </CardDescription>

          {success ? (
            <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm text-center">
              <p className="font-semibold">Deposit Confirmed on Stellar Ledger!</p>
              <p className="text-xs text-slate-300 mt-1">{amount} USDC deposited into Treasury Contract</p>
              <Link href="/dashboard" className="inline-block mt-4">
                <Button variant="primary" size="sm">Return to Dashboard</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleDeposit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Target Treasury Contract</label>
                <input
                  type="text"
                  disabled
                  value="Core Protocol Treasury (CC2W...9K1Z)"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Deposit Amount (USDC)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full mt-4" isLoading={isSubmitting}>
                Sign & Submit On-Chain Deposit
              </Button>
            </form>
          )}
        </Card>
      </main>
    </div>
  );
}
