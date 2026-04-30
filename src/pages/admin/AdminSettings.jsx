import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Bell, Lock, Globe } from 'lucide-react';

const SettingRow = ({ label, description, children }) => (
  <div className="flex items-center justify-between py-6 border-b border-glass-border last:border-0">
    <div>
      <p className="text-sm text-text-primary font-bold uppercase tracking-wider">{label}</p>
      {description && <p className="text-[10px] text-text-muted mt-1 uppercase tracking-widest font-bold opacity-60">{description}</p>}
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
          title: 'System Appearance', icon: Sun, items: [
            { label: 'Ambient Mode', description: 'Switch between dark and light ecosystem', action: (
              <button onClick={toggleTheme} className={`relative w-12 h-6 rounded-full transition-all duration-500 shadow-inner ${theme === 'dark' ? 'bg-cyan-500' : 'bg-slate-300'}`}>
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-lg transition-transform duration-500 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            )},
          ]
        },
        {
          title: 'Operational Alerts', icon: Bell, items: [
            { label: 'Order Dispatch', description: 'Real-time acquisition notifications', action: <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-cyan-500 cursor-pointer" /> },
            { label: 'Vault Levels', description: 'Inventory depletion warnings', action: <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-cyan-500 cursor-pointer" /> },
          ]
        },
        {
          title: 'Secure Access', icon: Lock, items: [
            { label: 'Multi-Factor Auth', description: 'Bespoke identity verification', action: <input type="checkbox" className="w-4 h-4 rounded accent-cyan-500 cursor-pointer" /> },
          ]
        },
      ].map(section => (
        <div key={section.title} className="bg-aether-700 border border-glass-border rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-glass-border">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <section.icon className="w-4 h-4 text-cyan-500" />
            </div>
            <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest">{section.title}</h3>
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
