'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Wallet, Bell } from 'lucide-react';
import { Button } from '@warrantx/ui';
import { useWallet } from './WalletProvider';

export const Navbar: React.FC = () => {
  const { address, connect, disconnect, error, isConnecting, network } = useWallet();
  const shortAddress = address ? `${address.slice(0, 5)}…${address.slice(-5)}` : null;

  return (
    <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <Image src="/warrantx-mark.png" alt="WarrantX" width={44} height={44} className="h-11 w-11 object-contain group-hover:scale-105 transition-transform" priority />
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

        <div className="relative flex items-center space-x-3">
          <Link href="/notifications" className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-900 transition-colors">
            <Bell className="w-5 h-5" />
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
            isLoading={isConnecting}
            onClick={address ? disconnect : () => void connect()}
            title={address ? `Connected on ${network || 'Stellar'}. Click to disconnect.` : 'Connect Freighter wallet'}
          >
            <Wallet className="w-4 h-4" />
            <span>{shortAddress || 'Connect wallet'}</span>
          </Button>
          {error && (
            <div role="alert" className="absolute right-0 top-11 z-50 w-80 rounded-lg border border-rose-500/30 bg-slate-950 p-3 text-xs text-rose-300 shadow-xl">
              {error}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
