'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Wallet, ChevronRight, Menu, X, Bell } from 'lucide-react';
import { Button, Badge } from '@warrantx/ui';

export const Navbar: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [pubKey, setPubKey] = useState<string | null>(null);

  const handleConnectWallet = () => {
    if (walletConnected) {
      setWalletConnected(false);
      setPubKey(null);
    } else {
      setWalletConnected(true);
      setPubKey('GAAX...4K9Z');
    }
  };

  return (
    <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xl font-bold text-slate-100 tracking-tight">Warrant<span className="text-emerald-400">X</span></span>
            <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Stellar Soroban</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
          <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">Dashboard</Link>
          <Link href="/treasury" className="hover:text-emerald-400 transition-colors">Treasuries</Link>
          <Link href="/members" className="hover:text-emerald-400 transition-colors">Members</Link>
          <Link href="/policies" className="hover:text-emerald-400 transition-colors">Policies</Link>
          <Link href="/payments/request" className="hover:text-emerald-400 transition-colors">Payments</Link>
          <Link href="/approvals" className="hover:text-emerald-400 transition-colors">Approvals</Link>
          <Link href="/history" className="hover:text-emerald-400 transition-colors">History</Link>
        </div>

        <div className="flex items-center space-x-3">
          <Link href="/notifications" className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-900 transition-colors">
            <Bell className="w-5 h-5" />
          </Link>
          <Button
            variant={walletConnected ? 'outline' : 'primary'}
            size="sm"
            onClick={handleConnectWallet}
            className="flex items-center space-x-2"
          >
            <Wallet className="w-4 h-4" />
            <span>{walletConnected ? pubKey : 'Connect Wallet'}</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};
