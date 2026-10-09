'use client';

import React, { useState } from 'react';
import { Navbar } from '../../../components/Navbar';
import { Send } from 'lucide-react';
import { Button, Card, CardTitle, CardDescription } from '@warrantx/ui';
import { Address, nativeToScVal } from '@stellar/stellar-sdk';
import { useWallet } from '../../../components/WalletProvider';
import { submitContractTransaction, toStroops } from '../../../lib/contract-transaction';

export default function PaymentRequestPage() {
  const contractId = process.env.NEXT_PUBLIC_TREASURY_CONTRACT_ID;
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const { address, connect, isConnecting } = useWallet();

  const numAmount = parseFloat(amount || '0');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contractId || !address) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const metadata = new TextEncoder().encode(description);
      const metadataHash = new Uint8Array(await window.crypto.subtle.digest('SHA-256', metadata));
      const result = await submitContractTransaction(contractId, 'request_payment', [
        new Address(address).toScVal(),
        new Address(recipient).toScVal(),
        nativeToScVal(toStroops(amount), { type: 'i128' }),
        nativeToScVal(metadataHash, { type: 'bytes' }),
        nativeToScVal(86_400, { type: 'u64' }),
      ], address);
      setTransactionHash(result.hash);
      setIsSubmitting(false);
      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Payment request failed');
      setIsSubmitting(false);
    }
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

          {!contractId && (
            <div className="mt-4 p-3 rounded-lg text-xs border bg-amber-500/10 border-amber-500/30 text-amber-300">
              Transactions are disabled until NEXT_PUBLIC_TREASURY_CONTRACT_ID is configured. No wallet request will be simulated.
            </div>
          )}

          {submitted ? (
            <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm text-center">
              <p className="font-semibold">Payment Request Submitted!</p>
              <p className="text-xs text-slate-300 mt-1">
                The contract accepted the request. Check its on-chain state to determine whether approvals are required.
              </p>
              {transactionHash && <a className="block mt-2 underline" href={`https://stellar.expert/explorer/testnet/tx/${transactionHash}`} target="_blank" rel="noreferrer">View transaction</a>}
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

              {numAmount > 0 && <div className="p-3 rounded-lg text-xs border bg-slate-900 border-slate-700 text-slate-400"><span className="font-semibold">Policy check:</span> the configured Soroban contract will determine whether approvals are required when this request is submitted.</div>}

              {error && <p className="text-sm text-red-400">{error}</p>}
              {!address ? (
                <Button type="button" variant="primary" className="w-full mt-4" isLoading={isConnecting} onClick={() => void connect()}>
                  Connect Testnet Wallet
                </Button>
              ) : <Button type="submit" variant="primary" className="w-full mt-4" isLoading={isSubmitting} disabled={!contractId}>
                Sign & Submit Payment Request
              </Button>}
            </form>
          )}
        </Card>
      </main>
    </div>
  );
}
