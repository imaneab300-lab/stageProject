import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { adminOrders } from '../../data/adminData';

const statusConfig = {
  pending:   { label: 'Pending',   class: 'bg-amber-500/15 text-amber-400 border-amber-500/20' },
  shipped:   { label: 'Shipped',   class: 'bg-blue-500/15 text-blue-400 border-blue-500/20' },
  delivered: { label: 'Delivered', class: 'bg-green-500/15 text-green-400 border-green-500/20' },
};

const Orders = () => {
  const [orders, setOrders] = useState(adminOrders);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const updateStatus = (id, status) =>
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));

  return (
    <div className="space-y-5">
      {/* Filter tabs */}
      <div className="flex items-center gap-2">
        {['all', 'pending', 'shipped', 'delivered'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide capitalize transition-all border
              ${filter === tab
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                : 'bg-white/3 text-slate-500 border-white/5 hover:text-white hover:border-white/10'}`}
          >
            {tab === 'all' ? 'All Orders' : tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#0f1629]/80 border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-[10px] tracking-[0.15em] uppercase text-slate-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((order) => (
                <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <span className="text-xs font-mono text-cyan-400">{order.id}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-200">{order.customer}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-400">{order.product}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-white font-semibold">{order.amount}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-lg border text-[10px] font-medium tracking-wide ${statusConfig[order.status].class}`}>
                      {statusConfig[order.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-slate-500">{order.date}</span>
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={order.status}
                      onChange={e => updateStatus(order.id, e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                    >
                      <option value="pending" className="bg-[#0f1629]">Pending</option>
                      <option value="shipped" className="bg-[#0f1629]">Shipped</option>
                      <option value="delivered" className="bg-[#0f1629]">Delivered</option>
                    </select>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-white/5 text-[11px] text-slate-500">
          Showing {filtered.length} orders
        </div>
      </div>
    </div>
  );
};

export default Orders;
