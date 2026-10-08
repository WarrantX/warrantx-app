'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '../../../components/Navbar';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button, Card, CardTitle, CardDescription } from '@warrantx/ui';

export default function CreateTreasuryPage() {
  const [name, setName] = useState('');
  const [orgId, setOrgId] = useState('ORG1');
  const [assetAddress, setAssetAddress] = useState('CC4W...USDC');
  const [isDeploying, setIsDeploying] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setSuccess(true);
    }, 1500);
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
              <p className="text-xs text-slate-300 mt-1 font-mono">Contract ID: CC2W...9K1Z</p>
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

              <div className="pt-4">
                <Button type="submit" variant="primary" className="w-full" isLoading={isDeploying}>
                  Sign & Deploy Treasury Contract
                </Button>
              </div>
            </form>
          )}
        </Card>
      </main>
    </div>
  );
}
