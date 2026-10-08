'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Bell, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardTitle, CardDescription, Badge } from '@warrantx/ui';

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8 w-full">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Notifications & Alerts</h1>
            <p className="text-xs text-slate-400 mt-1">Real-time alerts for approvals, policy updates, and payments</p>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="glass-panel">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">New Payment Approval Required</p>
                <p className="text-xs text-slate-400 mt-0.5">REQ-002 (450.00 USDC) submitted by Dev Core Spender requires your signature.</p>
                <span className="text-[10px] text-slate-500 mt-2 block">10 minutes ago</span>
              </div>
            </div>
          </Card>

          <Card className="glass-panel">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">Payment Request Executed</p>
                <p className="text-xs text-slate-400 mt-0.5">REQ-001 (100.00 USDC) transferred successfully to recipient.</p>
                <span className="text-[10px] text-slate-500 mt-2 block">2 hours ago</span>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
