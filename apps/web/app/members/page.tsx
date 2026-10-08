'use client';

import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Users, UserPlus, Shield, CheckCircle2, UserX } from 'lucide-react';
import { Button, Card, CardTitle, CardDescription, Badge } from '@warrantx/ui';

export default function MembersPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('Spender');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Authorized Treasury Members</h1>
            <p className="text-xs text-slate-400 mt-1">Manage team roles & access permissions on Soroban state</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="primary" size="sm" onClick={() => setShowAddModal(!showAddModal)}>
              <UserPlus className="w-4 h-4 mr-1.5" /> Add Member
            </Button>
          </div>
        </div>

        {showAddModal && (
          <Card className="glass-panel mb-8 border-emerald-500/40">
            <CardTitle className="text-base">Register New Treasury Member</CardTitle>
            <form onSubmit={(e) => { e.preventDefault(); setShowAddModal(false); }} className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Stellar Public Key (G...)"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-100"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100"
              >
                <option value="Spender">Spender</option>
                <option value="Approver">Approver</option>
                <option value="Admin">Admin</option>
                <option value="Viewer">Viewer</option>
              </select>
              <Button type="submit" variant="primary" size="sm">Register On-Chain</Button>
            </form>
          </Card>
        )}

        <Card className="glass-panel">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase font-medium">
                  <th className="pb-3">Stellar Address</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Added Date</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-3.5 font-mono text-xs text-slate-200">GAAX...4K9Z (You)</td>
                  <td className="py-3.5"><Badge variant="emerald">Admin</Badge></td>
                  <td className="py-3.5"><Badge variant="emerald">Active</Badge></td>
                  <td className="py-3.5 text-xs text-slate-400">2026-10-01</td>
                  <td className="py-3.5 text-right"><span className="text-xs text-slate-500">Owner</span></td>
                </tr>
                <tr>
                  <td className="py-3.5 font-mono text-xs text-slate-300">GBX...91KA</td>
                  <td className="py-3.5"><Badge variant="cyan">Spender</Badge></td>
                  <td className="py-3.5"><Badge variant="emerald">Active</Badge></td>
                  <td className="py-3.5 text-xs text-slate-400">2026-10-02</td>
                  <td className="py-3.5 text-right">
                    <Button variant="ghost" size="sm" className="text-rose-400">Suspend</Button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 font-mono text-xs text-slate-300">GCD...88MZ</td>
                  <td className="py-3.5"><Badge variant="amber">Approver</Badge></td>
                  <td className="py-3.5"><Badge variant="emerald">Active</Badge></td>
                  <td className="py-3.5 text-xs text-slate-400">2026-10-03</td>
                  <td className="py-3.5 text-right">
                    <Button variant="ghost" size="sm" className="text-rose-400">Suspend</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
