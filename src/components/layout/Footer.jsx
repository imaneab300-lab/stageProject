import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Mail } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/register';
  const brandName = isLoginPage ? 'Glacier' : 'AETHER';

  return (
    <footer className="border-t border-glass-border bg-aether-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <span className="font-serif italic text-lg text-cyan-400 tracking-wider font-semibold">
              {brandName}
            </span>
            {isLoginPage ? (
              <p className="text-[11px] text-slate-500 mt-1">
                © 2024 Glacier E-commerce. All rights reserved.
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 mt-1 tracking-wide uppercase">
                © 2024 {brandName} Premier. All rights reserved.
              </p>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {['Privacy Policy', 'Terms of Service', 'Shipping Info', 'Contact'].map((link) => (
              <Link
                key={link}
                to="#"
                className="text-[10px] tracking-[0.12em] uppercase text-slate-500 hover:text-slate-300 transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors p-2 rounded-full border border-glass-border hover:border-cyan-500/30">
              <Mail className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors p-2 rounded-full border border-glass-border hover:border-cyan-500/30">
              <Globe className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
