import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { adminStats, revenueData, topCollections, systemActivity } from '../../data/adminData';

const StatCard = ({ stat, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-[#0f1629]/80 border border-white/5 rounded-2xl p-5 space-y-3"
  >
    <p className="text-[10px] tracking-[0.15em] uppercase text-slate-500">{stat.label}</p>
    <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
    <div className={`flex items-center gap-1 text-xs font-medium ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
      {stat.positive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
      <span>{stat.change}</span>
      <span className="text-slate-600 font-normal ml-1">vs last month</span>
    </div>
  </motion.div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0f1629] border border-white/10 rounded-xl px-4 py-3">
      <p className="text-[10px] text-slate-400 mb-1">{label}</p>
      <p className="text-sm font-bold text-cyan-400">${payload[0].value.toLocaleString()}</p>
    </div>
  );
};

const activityColor = { order: 'bg-cyan-400', user: 'bg-green-400', stock: 'bg-amber-400', payout: 'bg-blue-400' };

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Performance Dashboard</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-md">
            Real-time analytical overview of your luxury e-commerce ecosystem. Monitor sales trajectories, user engagement, and operational health.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-xl border border-white/10 text-xs text-slate-400 hover:text-white hover:border-white/20 transition-all">
            Export Report
          </button>
          <button className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400 hover:bg-cyan-500/20 transition-all">
            Generate Invoice
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.values(adminStats).map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} />
        ))}
      </div>

      {/* Charts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-[#0f1629]/80 border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-white">Revenue Trajectory</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Monthly sales volume across all categories</p>
            </div>
            <span className="text-[10px] text-slate-500 tracking-wide">Last 6 Months</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData} barSize={28}>
              <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(6,182,212,0.05)' }} />
              <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                {revenueData.map((entry, i) => (
                  <Cell key={i} fill={i === revenueData.length - 1 ? '#06b6d4' : '#1e293b'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* System Activity */}
        <div className="bg-[#0f1629]/80 border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">System Activity</h3>
          </div>
          <div className="space-y-4">
            {systemActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${activityColor[item.type]}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-white truncate">{item.title}</p>
                  <p className="text-[11px] text-slate-500">{item.body}</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-center text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center justify-center gap-1 transition-colors">
            View All Activity <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Top Collections */}
      <div className="bg-[#0f1629]/80 border border-white/5 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-white">Top Performing Collections</h3>
          <button className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors">
            View All Collections <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {topCollections.map((col) => (
            <div key={col.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-all">
              <img src={col.image} alt={col.name} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <p className="text-xs font-medium text-white">{col.name}</p>
                <p className="text-sm font-bold text-cyan-400 mt-0.5">{col.revenue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
