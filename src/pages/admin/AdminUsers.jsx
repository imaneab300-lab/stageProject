import React from 'react';
import { motion } from 'framer-motion';
import { adminUsers } from '../../data/adminData';

const roleConfig = {
  admin:  { label: 'Admin',  class: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20' },
  client: { label: 'Client', class: 'bg-slate-500/15 text-slate-400 border-slate-500/20' },
};

const AdminUsers = () => {
  return (
    <div className="space-y-5">
      <div className="bg-[#0f1629]/80 border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['User', 'Email', 'Role', 'Orders', 'Total Spent', 'Joined'].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-[10px] tracking-[0.15em] uppercase text-slate-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {adminUsers.map((user, i) => (
                <motion.tr key={user.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                        {user.avatar}
                      </div>
                      <span className="text-sm text-white font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className="text-sm text-slate-400">{user.email}</span></td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-lg border text-[10px] font-medium tracking-wide ${roleConfig[user.role].class}`}>
                      {roleConfig[user.role].label}
                    </span>
                  </td>
                  <td className="px-5 py-4"><span className="text-sm text-slate-300">{user.orders}</span></td>
                  <td className="px-5 py-4"><span className="text-sm text-white font-semibold">{user.spent}</span></td>
                  <td className="px-5 py-4"><span className="text-xs text-slate-500">{user.joined}</span></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
