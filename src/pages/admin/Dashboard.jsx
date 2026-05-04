import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { adminStats, revenueData, topCollections, systemActivity, adminOrders } from '../../data/adminData';
import { useTheme } from '../../context/ThemeContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import allProducts from '../../data/products';
import { toast } from 'react-hot-toast';

const StatCard = ({ stat, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-aether-700 border border-glass-border rounded-2xl p-5 space-y-3 shadow-sm"
  >
    <p className="text-[11px] tracking-[0.2em] uppercase text-text-muted font-semibold">{stat.label}</p>
    <p className="text-[24px] font-semibold text-text-primary tracking-tight">{stat.value}</p>
    <div className={`flex items-center gap-1.5 text-[12px] font-medium ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
      {stat.positive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
      <span>{stat.change}</span>
      <span className="text-text-muted font-normal ml-1">vs last month</span>
    </div>
  </motion.div>
);

const CustomTooltip = ({ active, payload, label, theme }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-aether-700 border border-glass-border rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-[10px] text-text-muted mb-1 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-bold text-cyan-500">${payload[0].value.toLocaleString()}</p>
    </div>
  );
};

const activityColor = { order: 'bg-cyan-500', user: 'bg-green-500', stock: 'bg-amber-500', payout: 'bg-blue-500' };

const Dashboard = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const tickColor = theme === 'dark' ? '#64748b' : '#94a3b8';

  const handleExport = () => {
    try {
      const doc = new jsPDF();
      const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });

      // Set Luxury Theme Colors
      const aether900 = [5, 8, 16];
      const cyan500 = [6, 182, 212];
      const textMuted = [148, 163, 184];

      // Header Design
      doc.setFillColor(...aether900);
      doc.rect(0, 0, 210, 50, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFont('times', 'italic');
      doc.setFontSize(28);
      doc.text('GLACIER', 20, 28);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...cyan500);
      doc.text('INTELLIGENCE & PERFORMANCE ANALYTICS', 20, 36);
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text(`REPORT ID: GL-${Math.floor(Math.random() * 1000000)}`, 160, 20);
      doc.text(`TIMESTAMP: ${timestamp}`, 160, 26);

      // 1. Executive Metrics
      doc.setTextColor(...aether900);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('EXECUTIVE OVERVIEW', 20, 65);

      const statsData = Object.values(adminStats).map(s => [s.label, s.value, s.change]);
      autoTable(doc, {
        startY: 70,
        head: [['Strategic Metric', 'Current Value', 'Growth Trajectory']],
        body: statsData,
        theme: 'grid',
        headStyles: { fillColor: aether900, textColor: [255, 255, 255], fontSize: 9, fontStyle: 'bold', halign: 'center' },
        bodyStyles: { fontSize: 8, halign: 'center' },
        styles: { cellPadding: 4 }
      });

      // 2. Recent Transactions
      doc.setFontSize(14);
      doc.text('RECENT ACQUISITIONS', 20, doc.lastAutoTable.finalY + 15);
      const orderData = adminOrders.map(o => [o.id, o.customer, o.product, o.amount, o.status.toUpperCase()]);
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 20,
        head: [['Reference', 'Client', 'Artifact', 'Investment', 'Status']],
        body: orderData,
        theme: 'striped',
        headStyles: { fillColor: cyan500, textColor: [255, 255, 255], fontSize: 9 },
        bodyStyles: { fontSize: 8 },
        styles: { cellPadding: 3 }
      });

      // 3. Products Summary
      if (doc.lastAutoTable.finalY > 220) doc.addPage();
      doc.setFontSize(14);
      doc.text('COLLECTION & PRODUCT SUMMARY', 20, (doc.lastAutoTable.finalY > 220 ? 25 : doc.lastAutoTable.finalY + 15));
      const productData = allProducts.slice(0, 8).map(p => [p.name, p.category, `$${p.price.toLocaleString()}`, p.stock > 0 ? 'AVAILABLE' : 'PRE-ORDER']);
      autoTable(doc, {
        startY: (doc.lastAutoTable.finalY > 220 ? 30 : doc.lastAutoTable.finalY + 20),
        head: [['Product Name', 'Category', 'Price', 'Inventory State']],
        body: productData,
        theme: 'grid',
        headStyles: { fillColor: aether900, textColor: [255, 255, 255], fontSize: 9 },
        bodyStyles: { fontSize: 8 },
        styles: { cellPadding: 3 }
      });

      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setTextColor(...textMuted);
        doc.text('CONFIDENTIAL INTELLECTUAL PROPERTY — GLACIER LUXURY GROUP', 105, 285, { align: 'center' });
        doc.text(`Page ${i} of ${pageCount}`, 190, 285);
      }

      doc.save(`GLACIER_ANALYTICS_${new Date().getTime()}.pdf`);
      toast.success('Intelligence Report Exported');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to generate report');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div>
          <h2 className="text-[28px] md:text-[32px] font-light text-text-primary tracking-tight">Intelligence Dashboard</h2>
          <p className="text-[14px] text-text-muted mt-2 max-w-xl leading-relaxed font-light">
            Real-time analytical overview of your luxury e-commerce ecosystem. Monitor performance trajectories, user engagement, and operational health.
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleExport}
            className="px-6 py-3 rounded-xl border border-glass-border text-[11px] text-text-muted hover:text-text-primary hover:bg-aether-700 transition-all font-bold uppercase tracking-[0.2em]"
          >
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {Object.values(adminStats).map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} />
        ))}
      </div>

      {/* Charts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-aether-700 border border-glass-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-[16px] font-medium text-text-primary uppercase tracking-wider">Revenue Trajectory</h3>
              <p className="text-[13px] text-text-muted mt-1 font-light">Monthly sales volume across all categories</p>
            </div>
            <span className="text-[11px] text-text-muted tracking-[0.2em] uppercase font-bold opacity-60">Last 6 Months</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData} barSize={32}>
              <XAxis dataKey="month" tick={{ fill: tickColor, fontSize: 10, fontWeight: 300 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip theme={theme} />} cursor={{ fill: 'rgba(6,182,212,0.03)' }} />
              <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                {revenueData.map((entry, i) => (
                  <Cell key={i} fill={i === revenueData.length - 1 ? '#06b6d4' : theme === 'dark' ? '#1e293b' : '#e2e8f0'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* System Activity */}
        <div className="bg-aether-700 border border-glass-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[14px] font-medium text-text-primary uppercase tracking-widest">System Activity</h3>
          </div>
          <div className="space-y-6">
            {systemActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-4">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${activityColor[item.type]}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-text-primary truncate uppercase tracking-tight">{item.title}</p>
                  <p className="text-[12px] text-text-muted mt-1 leading-relaxed font-light">{item.body}</p>
                  <p className="text-[10px] text-text-muted font-bold mt-2 opacity-50 uppercase tracking-tighter">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Link 
            to="/admin/activity"
            className="mt-8 w-full text-center text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-500 hover:text-cyan-400 flex items-center justify-center gap-2 transition-colors border-t border-glass-border pt-4"
          >
            View All Activity <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Top Collections */}
      <div className="bg-aether-700 border border-glass-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[14px] font-medium text-text-primary uppercase tracking-widest">Top Performing Collections</h3>
          <Link to="/admin/top-collections" className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-500 hover:text-cyan-400 flex items-center gap-2 transition-colors">
            View All Collections <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {topCollections.map((col) => (
            <div key={col.id} className="flex items-center gap-5 p-4 rounded-xl bg-aether-800/30 border border-glass-border hover:border-cyan-500/30 transition-all group">
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-glass-border shadow-sm">
                <img src={col.image} alt={col.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted group-hover:text-text-primary transition-colors">{col.name}</p>
                <p className="text-[16px] font-medium text-cyan-500 mt-1 tracking-tight">{col.revenue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
