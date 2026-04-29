import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); console.log('Login:', form); };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="glass-card p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl md:text-3xl text-white tracking-wide">Welcome Back</h1>
            <p className="mt-2 text-xs text-slate-500 tracking-wide">Access your GLACIER premier account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label="Email Address" type="email" name="email" placeholder="name@example.com" icon={Mail} value={form.email} onChange={handleChange} required />
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] tracking-[0.15em] uppercase text-slate-400 font-medium">Password</label>
                <Link to="#" className="text-[10px] text-cyan-400 hover:text-cyan-300 transition-colors">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required className="glass-input pl-11" />
              </div>
            </div>
            <Button type="submit" variant="primary" className="w-full mt-2">Sign In</Button>
          </form>
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-glass-border" />
            <span className="text-[10px] text-slate-600 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-glass-border" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-glass-border bg-aether-700/30 hover:bg-aether-600/40 text-sm text-slate-300 transition-all">
              <span className="text-red-400">G</span> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-glass-border bg-aether-700/30 hover:bg-aether-600/40 text-sm text-slate-300 transition-all">
              <span>🍎</span> Apple
            </button>
          </div>
          <p className="mt-6 text-center text-xs text-slate-500">
            New to Glacier? <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">Create an account</Link>
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="hidden lg:block space-y-6">
          <div className="glass-card p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <User className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="font-serif text-xl text-white">Exclusive Access</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Login to explore our limited Winter '24 drop before the general public.</p>
          </div>
          <div className="glass-card overflow-hidden">
            <div className="relative aspect-[16/9]">
              <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=340&fit=crop&q=80" alt="Eternal Permafrost" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-aether-900/90 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-[9px] tracking-[0.2em] uppercase text-cyan-400 font-medium">Featured Collection</span>
                <h4 className="font-serif text-lg text-white mt-1">Eternal Permafrost</h4>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
