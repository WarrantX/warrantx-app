'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Settings, Shield, Key } from 'lucide-react';
import { Card, CardTitle, CardDescription, Button } from '@warrantx/ui';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8 w-full">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Account & Treasury Settings</h1>
            <p className="text-xs text-slate-400 mt-1">Manage wallet bindings, RPC network nodes, and preferences</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="glass-panel">
            <CardTitle className="text-base">Stellar Network Configuration</CardTitle>
            <CardDescription>Target network RPC and Horizon RPC gateway</CardDescription>

            <div className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Selected Network</label>
                <input type="text" disabled value="Stellar Testnet" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Soroban RPC URL</label>
                <input type="text" disabled value="https://soroban-testnet.stellar.org:443" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 font-mono" />
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
