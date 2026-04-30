import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Mail } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  const brandName = 'GLACIER';

  return (
    <footer className="border-t border-glass-border bg-aether-700 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <span className="font-serif italic text-[24px] text-cyan-500 tracking-[0.15em] font-semibold">
              {brandName}
            </span>
            <p className="text-[10px] text-text-muted mt-4 tracking-[0.2em] uppercase font-bold opacity-40">
              © 2024 {brandName} LUXURY GROUP. ALL RIGHTS RESERVED.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {['Privacy Policy', 'Terms of Service', 'Shipping Info', 'Contact'].map((link) => (
              <Link
                key={link}
                to={link === 'Contact' ? '/contact' : '#'}
                className="text-[10px] tracking-[0.3em] uppercase text-text-muted hover:text-cyan-500 transition-all font-bold"
              >
                {link}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-text-muted hover:text-cyan-500 transition-all p-3.5 rounded-2xl border border-glass-border hover:border-cyan-500/30 bg-aether-800 shadow-xl group">
              <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
            </a>
            <a href="#" className="text-text-muted hover:text-cyan-500 transition-all p-3.5 rounded-2xl border border-glass-border hover:border-cyan-500/30 bg-aether-800 shadow-xl group">
              <Globe className="w-4 h-4 transition-transform group-hover:scale-110" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
