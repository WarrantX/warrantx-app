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
          <Card className="glass-panel py-12 text-center text-sm text-slate-500">No live notifications yet.</Card>
        </div>
      </main>
    </div>
  );
}
