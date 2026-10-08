'use client';

import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { ShieldCheck, Plus, Sliders, RefreshCw, AlertCircle } from 'lucide-react';
import { Button, Card, CardTitle, CardDescription, Badge } from '@warrantx/ui';

export default function PoliciesPage() {
  const [showConfig, setShowConfig] = useState(false);
  const [spender, setSpender] = useState('GBX...91KA');
  const [limit, setLimit] = useState('500');
  const [period, setPeriod] = useState('Monthly');
  const [threshold, setThreshold] = useState('200');
  const [requiredApprovals, setRequiredApprovals] = useState(2);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Spending Policies Engine</h1>
            <p className="text-xs text-slate-400 mt-1">Configure per-member allowances & contract approval rules</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="primary" size="sm" onClick={() => setShowConfig(!showConfig)}>
              <Plus className="w-4 h-4 mr-1.5" /> Create Spending Policy
            </Button>
          </div>
        </div>

        {showConfig && (
          <Card className="glass-panel mb-8 border-emerald-500/40">
            <CardTitle className="text-base">Configure Member Spending Policy</CardTitle>
            <form onSubmit={(e) => { e.preventDefault(); setShowConfig(false); }} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target Spender Member</label>
                  <input
                    type="text"
                    required
                    value={spender}
                    onChange={(e) => setSpender(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Allowance Period</label>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100"
                  >
                    <option value="Daily">Daily (UTC 24h reset)</option>
                    <option value="Weekly">Weekly (UTC Sunday reset)</option>
                    <option value="Monthly">Monthly (UTC 1st day reset)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Maximum Allowance (USDC)</label>
                  <input
                    type="number"
                    required
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Approval Threshold (USDC)</label>
                  <input
                    type="number"
                    required
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Required Approvers for Amount &gt; Threshold</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={requiredApprovals}
                  onChange={(e) => setRequiredApprovals(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100"
                />
              </div>

              <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800">
                <span className="font-semibold text-emerald-400">Policy Implications:</span> Payments &le; {threshold} USDC execute automatically under individual allowance. Payments &gt; {threshold} USDC up to {limit} USDC require {requiredApprovals} approver signatures.
              </div>

              <Button type="submit" variant="primary" size="sm" className="w-full">
                Sign & Update Policy On-Chain
              </Button>
            </form>
          </Card>
        )}

        {/* Existing Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-panel">
            <div className="flex justify-between items-start">
              <div>
                <Badge variant="cyan" className="mb-2">Version 1 Active</Badge>
                <CardTitle className="text-lg font-mono text-slate-200">GBX...91KA</CardTitle>
                <CardDescription>Dev Core Spender Policy</CardDescription>
              </div>
              <Badge variant="emerald">Active</Badge>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Spending Period:</span>
                <span className="font-medium text-slate-200">Monthly</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Monthly Cap:</span>
                <span className="font-semibold text-emerald-400">500.00 USDC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Approval Threshold:</span>
                <span className="font-mono text-amber-400">200.00 USDC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Required Approvers:</span>
                <span className="font-medium text-slate-200">2 Approvers</span>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
