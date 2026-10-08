'use client';

import React, { useState } from 'react';
import { Navbar } from '../../../components/Navbar';
import { Send, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button, Card, CardTitle, CardDescription, Badge } from '@warrantx/ui';

export default function PaymentRequestPage() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const numAmount = parseFloat(amount || '0');
  const requiresApproval = numAmount > 200;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="max-w-xl mx-auto px-4 py-8 w-full">
        <Card className="glass-panel">
          <CardTitle className="text-xl flex items-center space-x-2">
            <Send className="w-5 h-5 text-emerald-400" />
            <span>Submit Treasury Payment Request</span>
          </CardTitle>
          <CardDescription>
            Request payment bound to your on-chain spending policy limits
          </CardDescription>

          {submitted ? (
            <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm text-center">
              <p className="font-semibold">Payment Request Submitted!</p>
              <p className="text-xs text-slate-300 mt-1">
                {requiresApproval ? 'Status: Pending Approver Signatures (0/2)' : 'Status: Executed Automatically'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Recipient Stellar Address</label>
                <input
                  type="text"
                  required
                  placeholder="G..."
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Payment Amount (USDC)</label>
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

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Payment Reason / Metadata</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Infrastructure Hosting & RPC Fees"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {numAmount > 0 && (
                <div className={`p-3 rounded-lg text-xs border ${requiresApproval ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
                  <span className="font-semibold">Policy Check: </span>
                  {requiresApproval
                    ? `Amount (${numAmount} USDC) exceeds auto-approval threshold (200 USDC). Request will require 2 approver signatures.`
                    : `Amount (${numAmount} USDC) is within auto-approval threshold (&le; 200 USDC). Will execute automatically.`}
                </div>
              )}

              <Button type="submit" variant="primary" className="w-full mt-4" isLoading={isSubmitting}>
                Sign & Submit Payment Request
              </Button>
            </form>
          )}
        </Card>
      </main>
    </div>
  );
}
