import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { adminOrders } from '../../data/adminData';
import { useTheme } from '../../context/ThemeContext';

const statusConfig = {
  pending:   { label: 'Pending',   class: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
  shipped:   { label: 'Shipped',   class: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
  delivered: { label: 'Delivered', class: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' },
};

const Orders = () => {
  const [orders, setOrders] = useState(adminOrders);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const updateStatus = (id, status) =>
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));

  return (
    <div className="space-y-6">
      {/* Filter tabs */}
      <div className="flex items-center gap-3">
        {['all', 'pending', 'shipped', 'delivered'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-5 py-2.5 rounded-xl text-[10px] font-bold tracking-[0.2em] uppercase transition-all border shadow-sm
              ${filter === tab
                ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20'
                : 'bg-aether-700 text-text-muted border-glass-border hover:text-text-primary hover:border-text-muted'}`}
          >
            {tab === 'all' ? 'All Orders' : tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-aether-700 border border-glass-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-glass-border bg-aether-800/30">
                {['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="text-left px-6 py-4 text-[10px] tracking-[0.2em] uppercase text-text-muted font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {filtered.map((order) => (
                <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-aether-800/20 transition-colors group">
                  <td className="px-6 py-5">
                    <span className="text-xs font-mono text-cyan-500 font-bold">#{order.id}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-text-primary font-bold uppercase tracking-wide">{order.customer}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[11px] text-text-muted font-bold uppercase tracking-widest">{order.product}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-text-primary font-serif font-bold">{order.amount}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex px-3 py-1 rounded-full border text-[9px] font-bold uppercase tracking-[0.15em] shadow-sm ${statusConfig[order.status].class}`}>
                      {statusConfig[order.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest opacity-60">{order.date}</span>
                  </td>
                  <td className="px-6 py-5">
                    <select
                      value={order.status}
                      onChange={e => updateStatus(order.id, e.target.value)}
                      className="bg-aether-800 border border-glass-border rounded-lg px-3 py-1.5 text-[10px] text-text-secondary focus:outline-none focus:ring-1 focus:ring-cyan-500/30 font-bold uppercase tracking-widest cursor-pointer hover:border-text-muted transition-all"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-glass-border text-[10px] font-bold tracking-widest uppercase text-text-muted">
          Operational health: {filtered.length} curated orders found
        </div>
      </div>
    </div>
  );
};

export default Orders;
