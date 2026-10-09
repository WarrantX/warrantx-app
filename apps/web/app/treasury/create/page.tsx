'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '../../../components/Navbar';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button, Card, CardTitle, CardDescription } from '@warrantx/ui';
import { Address, nativeToScVal, scValToNative } from '@stellar/stellar-sdk';
import { useWallet } from '../../../components/WalletProvider';
import { submitContractTransaction } from '../../../lib/contract-transaction';

export default function CreateTreasuryPage() {
  const [name, setName] = useState('');
  const [orgId, setOrgId] = useState('ORG1');
  const [assetAddress, setAssetAddress] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [treasuryId, setTreasuryId] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const { address, connect, isConnecting } = useWallet();
  const factoryId = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ID;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !factoryId) return;
    setIsDeploying(true);
    setError(null);
    try {
      const salt = window.crypto.getRandomValues(new Uint8Array(32));
      const result = await submitContractTransaction(factoryId, 'deploy_treasury', [
        new Address(address).toScVal(),
        nativeToScVal(salt, { type: 'bytes' }),
        new Address(address).toScVal(),
        new Address(assetAddress).toScVal(),
        nativeToScVal(orgId, { type: 'symbol' }),
      ], address);
      setTreasuryId(result.result ? String(scValToNative(result.result)) : null);
      setTransactionHash(result.hash);
      setIsDeploying(false);
      setSuccess(true);
    } catch (deploymentError) {
      setError(deploymentError instanceof Error ? deploymentError.message : 'Treasury deployment failed');
      setIsDeploying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-8 w-full">
        <Link href="/treasury" className="inline-flex items-center text-xs text-slate-400 hover:text-emerald-400 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Treasuries
        </Link>

        <Card className="glass-panel">
          <CardTitle className="text-xl">Deploy Soroban Treasury Contract</CardTitle>
          <CardDescription>
            Deploys a new Soroban smart contract instance with state isolation and policy control
          </CardDescription>

          {success ? (
            <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm text-center">
              <p className="font-semibold">Treasury Successfully Deployed!</p>
              <p className="text-xs text-slate-300 mt-1 font-mono">Contract ID: {treasuryId || 'See transaction result'}</p>
              {transactionHash && <a className="block mt-2 underline" href={`https://stellar.expert/explorer/testnet/tx/${transactionHash}`} target="_blank" rel="noreferrer">View transaction</a>}
              <Link href="/treasury" className="inline-block mt-4">
                <Button variant="primary" size="sm">Go to Treasury</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Organization / Treasury Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Core Engineering Treasury"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Organization Code</label>
                <input
                  type="text"
                  required
                  value={orgId}
                  onChange={(e) => setOrgId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Accepted Stellar Asset Address (SEP-41 / SAC)</label>
                <input
                  type="text"
                  required
                  value={assetAddress}
                  onChange={(e) => setAssetAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              {!factoryId && <p className="text-sm text-amber-300">Treasury creation is unavailable until NEXT_PUBLIC_FACTORY_CONTRACT_ID is configured.</p>}
              {error && <p className="text-sm text-red-400">{error}</p>}
              <div className="pt-4">
                {!address ? <Button type="button" variant="primary" className="w-full" isLoading={isConnecting} onClick={() => void connect()}>
                  Connect Testnet Wallet
                </Button> : <Button type="submit" variant="primary" className="w-full" isLoading={isDeploying} disabled={!factoryId}>
                  Sign & Deploy Treasury Contract
                </Button>}
              </div>
            </form>
          )}
        </Card>
      </main>
    </div>
  );
}
