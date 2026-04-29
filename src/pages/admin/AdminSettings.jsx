import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Bell, Lock, Globe } from 'lucide-react';

const SettingRow = ({ label, description, children }) => (
  <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
    <div>
      <p className="text-sm text-white font-medium">{label}</p>
      {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
    </div>
    {children}
  </div>
);

const AdminSettings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-6 max-w-2xl">
      {[
        {
          title: 'Appearance', icon: Sun, items: [
            { label: 'Dark Mode', description: 'Switch between dark and light interface', action: (
              <button onClick={toggleTheme} className={`relative w-12 h-6 rounded-full transition-colors ${theme === 'dark' ? 'bg-cyan-500' : 'bg-slate-600'}`}>
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            )},
          ]
        },
        {
          title: 'Notifications', icon: Bell, items: [
            { label: 'Order Alerts', description: 'Get notified for new orders', action: <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-cyan-400" /> },
            { label: 'Stock Alerts', description: 'Notify when inventory is low', action: <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-cyan-400" /> },
          ]
        },
        {
          title: 'Security', icon: Lock, items: [
            { label: 'Two-Factor Auth', description: 'Require 2FA for admin access', action: <input type="checkbox" className="w-4 h-4 rounded accent-cyan-400" /> },
          ]
        },
      ].map(section => (
        <div key={section.title} className="bg-[#0f1629]/80 border border-white/5 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
            <section.icon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">{section.title}</h3>
          </div>
          {section.items.map(item => (
            <SettingRow key={item.label} label={item.label} description={item.description}>
              {item.action}
            </SettingRow>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminSettings;
