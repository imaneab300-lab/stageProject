import React from 'react';
import { motion } from 'framer-motion';
import { adminUsers } from '../../data/adminData';

const roleConfig = {
  admin:  { label: 'Admin',  class: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20 shadow-cyan-500/5' },
  client: { label: 'Client', class: 'bg-slate-500/10 text-text-secondary border-glass-border shadow-sm' },
};

const AdminUsers = () => {
  return (
    <div className="space-y-6">
      <div className="bg-aether-700 border border-glass-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-glass-border bg-aether-800/30">
                {['User', 'Email', 'Role', 'Orders', 'Total Value', 'Joined'].map(h => (
                  <th key={h} className="text-left px-6 py-4 text-[12px] tracking-[0.15em] uppercase text-text-muted font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {adminUsers.map((user, i) => (
                <motion.tr key={user.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="hover:bg-aether-800/20 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[12px] font-semibold text-cyan-500 flex-shrink-0 shadow-inner">
                        {user.avatar}
                      </div>
                      <span className="text-[14px] text-text-primary font-semibold uppercase tracking-tight">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[13px] text-text-muted font-medium uppercase tracking-[0.1em]">{user.email}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex px-3 py-1 rounded-full border text-[10px] font-semibold uppercase tracking-[0.15em] shadow-sm ${roleConfig[user.role].class}`}>
                      {roleConfig[user.role].label}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[12px] text-text-secondary font-semibold uppercase tracking-widest">{user.orders}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-text-primary font-serif font-bold tracking-tight">{user.spent}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[11px] text-text-muted font-medium uppercase tracking-widest opacity-60">{user.joined}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-glass-border text-[10px] font-bold tracking-widest uppercase text-text-muted">
          User audit: {adminUsers.length} curated accounts found
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
