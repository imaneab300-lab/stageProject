import React, { useState, useRef, useEffect, useContext } from 'react';
import { Search, Bell, Sun, Moon, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../context/NotificationContext';
import { AuthContext } from '../../context/AuthContext';

const typeColor = { order: 'text-cyan-400', user: 'text-green-400', stock: 'text-amber-400', payout: 'text-blue-400' };

const AdminTopbar = ({ pageTitle }) => {
  const { theme, toggleTheme } = useTheme();
  const { notifications, unreadCount, markAllRead } = useNotifications();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-white/5 bg-[#090d18]/80 backdrop-blur-sm flex-shrink-0">
      {/* Page title */}
      <div>
        <h1 className="text-sm font-semibold text-white tracking-wide">{pageTitle || 'Overview'}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-white/5 border border-white/5 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 w-44"
          />
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setNotifOpen(!notifOpen); if (!notifOpen) markAllRead(); }}
            className="relative p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-[#0f1629] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-xs font-semibold text-white tracking-wide">System Activity</span>
                <span className="text-[10px] text-cyan-400 cursor-pointer hover:text-cyan-300">View All</span>
              </div>
              <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className={`px-4 py-3 hover:bg-white/3 transition-colors ${!n.read ? 'bg-cyan-500/3' : ''}`}>
                    <p className={`text-xs font-medium ${typeColor[n.type] || 'text-slate-300'}`}>{n.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{n.body}</p>
                    <p className="text-[10px] text-slate-600 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-[11px] font-bold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <span className="text-xs text-slate-300 hidden md:block">Administrator</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-[#0f1629] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
              <button onClick={() => { logout(); navigate('/login'); }} className="w-full text-left px-4 py-3 text-xs text-red-400 hover:bg-white/5 transition-colors">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
