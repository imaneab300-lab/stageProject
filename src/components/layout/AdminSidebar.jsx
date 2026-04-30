import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Package, ShoppingCart, Users, Settings,
  ChevronLeft, ChevronRight, LogOut, Plus
} from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

const AdminSidebar = ({ collapsed, setCollapsed }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.4, ease: 'circOut' }}
      className="relative flex flex-col h-screen bg-aether-700 border-r border-glass-border z-40 flex-shrink-0 transition-colors duration-500"
    >
      {/* Logo Section */}
      <div className={`flex items-center gap-4 px-6 py-8 border-b border-glass-border ${collapsed ? 'justify-center px-0' : ''}`}>
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/20">
          <span className="text-sm font-bold text-white tracking-widest">G</span>
        </div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
            <p className="text-[12px] font-bold text-text-primary tracking-[0.2em] uppercase">Control Center</p>
            <p className="text-[9px] text-text-muted tracking-[0.1em] uppercase font-bold opacity-60">Glacier Systems</p>
          </motion.div>
        )}
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 py-8 space-y-2 px-3 overflow-y-auto custom-scrollbar">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative
              ${isActive
                ? 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/10 shadow-sm'
                : 'text-text-muted hover:text-text-primary hover:bg-aether-800'
              } ${collapsed ? 'justify-center' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-500' : 'opacity-70'}`} />
                {!collapsed && (
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{label}</span>
                )}
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 w-1 h-6 bg-cyan-500 rounded-r-full"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Global Action CTA */}
      {!collapsed && (
        <div className="px-4 pb-6">
          <button
            onClick={() => navigate('/admin/products')}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-cyan-500 text-white text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20 active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" /> New Artifact
          </button>
        </div>
      )}

      {/* User Session Controller */}
      <div className={`border-t border-glass-border p-4 bg-aether-800/50 ${collapsed ? 'flex justify-center' : ''}`}>
        {!collapsed ? (
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-aether-700 border border-glass-border flex items-center justify-center text-xs font-bold text-cyan-500 flex-shrink-0 shadow-inner">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-text-primary font-bold uppercase tracking-widest truncate">{user?.name || 'Administrator'}</p>
              <p className="text-[9px] text-text-muted font-bold truncate uppercase tracking-tighter opacity-60">{user?.email || 'admin@glacier.luxe'}</p>
            </div>
            <button onClick={handleLogout} className="text-text-muted hover:text-red-500 transition-all p-2 hover:bg-red-500/5 rounded-xl">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button onClick={handleLogout} className="text-text-muted hover:text-red-500 transition-all p-3 hover:bg-red-500/5 rounded-xl">
            <LogOut className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Expansion Trigger */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-4 top-24 w-8 h-8 rounded-xl bg-aether-700 border border-glass-border flex items-center justify-center text-text-muted hover:text-cyan-500 hover:border-cyan-500/40 transition-all z-50 shadow-2xl"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </motion.aside>
  );
};

export default AdminSidebar;
