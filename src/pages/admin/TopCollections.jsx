import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, TrendingUp, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { topCollections } from '../../data/adminData';
import products from '../../data/products';

const TopCollections = () => {
  // Simulate top sellers by taking the first 6 products
  const topSellers = products.slice(0, 6);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link 
          to="/admin/dashboard" 
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted hover:text-cyan-500 transition-colors w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Intelligence
        </Link>
        <div>
          <h2 className="text-[28px] font-serif text-text-primary tracking-wide uppercase italic">Curated Collections</h2>
          <p className="text-[13px] text-text-muted mt-2 max-w-2xl leading-relaxed font-medium">
            Performance analysis of our most coveted pieces. These selections represent the pinnacle of current luxury demand and acquisition trends.
          </p>
        </div>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topCollections.map((col, i) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card overflow-hidden group border-glass-border hover:border-cyan-500/30 transition-all shadow-xl"
          >
            <div className="h-48 relative overflow-hidden">
              <img 
                src={col.image} 
                alt={col.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aether-900 via-aether-900/20 to-transparent opacity-60" />
              <div className="absolute bottom-4 left-6">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-cyan-400 mb-1 block">Premier Collection</span>
                <h3 className="text-xl font-serif text-white tracking-widest uppercase">{col.name}</h3>
              </div>
            </div>
            <div className="p-6 flex justify-between items-center bg-aether-800/50">
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Revenue Generated</p>
                <p className="text-lg font-bold text-text-primary mt-1">{col.revenue}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                <TrendingUp className="w-5 h-5 text-cyan-500" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Top Sellers Section */}
      <div className="pt-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] flex-1 bg-glass-border" />
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-[0.4em] px-4">Individual Top Sellers</h3>
          <div className="h-[1px] flex-1 bg-glass-border" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topSellers.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="glass-card p-5 flex gap-5 items-center hover:bg-aether-700/50 transition-colors border-glass-border group"
            >
              <div className="w-20 h-20 rounded-xl bg-aether-800 border border-glass-border overflow-hidden p-2 flex-shrink-0 relative">
                <img 
                  src={product.images?.[0] || product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-1 right-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[8px] font-bold text-cyan-500 uppercase tracking-widest block mb-1">{product.category}</span>
                <h4 className="text-[13px] font-bold text-text-primary uppercase tracking-tight truncate group-hover:text-cyan-400 transition-colors">{product.name}</h4>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-sm font-bold text-text-secondary">${product.price.toLocaleString()}</p>
                  <span className="text-[9px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full uppercase tracking-tighter">High Demand</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCollections;
