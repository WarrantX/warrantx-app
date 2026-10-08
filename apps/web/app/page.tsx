'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { ShieldCheck, ArrowRight, CheckCircle2, Lock, Cpu, Layers, FileCode, Users, RefreshCw } from 'lucide-react';
import { Button, Card, CardTitle, CardDescription, Badge } from '@warrantx/ui';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]" />
        
        <Badge variant="emerald" className="mb-6 py-1 px-3 text-xs tracking-wide uppercase">
          Programmable Soroban Treasury Controls
        </Badge>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight max-w-4xl leading-tight">
          Control how your treasury gets spent.
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
          Create programmable spending policies, assign team allowances, and approve payments with rules enforced directly on Stellar smart contracts.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="w-full sm:w-auto text-base">
              Launch Dashboard <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <a href="https://github.com/warrantx/warrantx-contracts" target="_blank" rel="noreferrer">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-base">
              Explore Contracts & Documentation
            </Button>
          </a>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full">
          <Card className="glass-panel hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400">
              <Cpu className="w-6 h-6" />
            </div>
            <CardTitle>On-Chain Policy Engine</CardTitle>
            <CardDescription className="mt-2 text-slate-400 text-sm">
              Soroban smart contracts evaluate spend limits, periods, and authorization before treasury funds can move. Backend API cannot bypass policies.
            </CardDescription>
          </Card>

          <Card className="glass-panel hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4 text-cyan-400">
              <RefreshCw className="w-6 h-6" />
            </div>
            <CardTitle>Recurring Allowances</CardTitle>
            <CardDescription className="mt-2 text-slate-400 text-sm">
              Assign team members recurring daily, weekly, or monthly allowances derived deterministically from Stellar ledger timestamps.
            </CardDescription>
          </Card>

          <Card className="glass-panel hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            <CardTitle>Tiered Approval Thresholds</CardTitle>
            <CardDescription className="mt-2 text-slate-400 text-sm">
              Payments below individual threshold execute instantly. Larger payments require designated multi-approver signatures directly on-chain.
            </CardDescription>
          </Card>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-slate-900/50 border-t border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-100">How WarrantX Enforces Spending Policies</h2>
            <p className="text-slate-400 mt-2">Financial rules executed deterministically in WebAssembly on Soroban</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold mx-auto flex items-center justify-center mb-3">1</div>
              <h4 className="font-semibold text-slate-200">Create Treasury</h4>
              <p className="text-xs text-slate-400 mt-2">Deploy contract treasury custody for USDC or Stellar assets</p>
            </div>
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold mx-auto flex items-center justify-center mb-3">2</div>
              <h4 className="font-semibold text-slate-200">Set Member Policies</h4>
              <p className="text-xs text-slate-400 mt-2">Configure per-member monthly caps, approval limits & period rules</p>
            </div>
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold mx-auto flex items-center justify-center mb-3">3</div>
              <h4 className="font-semibold text-slate-200">Submit Request</h4>
              <p className="text-xs text-slate-400 mt-2">Spender requests payment bound to active policy version</p>
            </div>
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold mx-auto flex items-center justify-center mb-3">4</div>
              <h4 className="font-semibold text-slate-200">Contract Execution</h4>
              <p className="text-xs text-slate-400 mt-2">Soroban validates limits & approvals before atomic asset transfer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 py-8 px-4 text-center text-xs text-slate-500">
        <p>WarrantX — Open Source Stellar Treasury Spending Control Platform.</p>
        <p className="mt-1">Soroban Smart Contracts & Open-Source Engineering.</p>
      </footer>
    </div>
  );
}
