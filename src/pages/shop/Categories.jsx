import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'jewelry',
    name: 'Haute Joaillerie',
    description: 'Exquisite diamonds, sapphires, and precious metals crafted by master artisans.',
    image: 'https://images.unsplash.com/photo-1515562141589-67f0d569b986?w=800&auto=format&fit=crop&q=80',
    count: '4 Pieces',
  },
  {
    id: 'accessories',
    name: 'Artisan Accessories',
    description: 'Handcrafted leather goods, silk scarves, and sculptural hardware.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80',
    count: '4 Pieces',
  },
  {
    id: 'watches',
    name: 'Heritage Timepieces',
    description: 'Precision horology and timeless aesthetics for the modern era.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&auto=format&fit=crop&q=80',
    count: '4 Pieces',
  },
  {
    id: 'perfume',
    name: 'Maison Fragrances',
    description: 'Rare floral extracts, oud, and hand-blown crystal vessels.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80',
    count: '4 Pieces',
  },
  {
    id: 'beauty',
    name: 'Luminous Beauty',
    description: 'Exclusive elixirs and cosmetics formulated for absolute perfection.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
    count: '4 Pieces',
  },
  {
    id: 'fashion',
    name: 'Maison Couture',
    description: 'Structured silhouettes in rare textiles, handcrafted by master tailors.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    count: '4 Pieces',
  },
];

const Categories = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 max-w-7xl mx-auto px-4 transition-colors duration-500">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-24">
        <span className="text-[11px] tracking-[0.5em] uppercase text-cyan-500 font-bold mb-6 block">Refined Domains</span>
        <h1 className="font-serif text-5xl md:text-7xl text-text-primary mb-8 uppercase tracking-tighter font-bold leading-tight">The Glacier Archive</h1>
        <p className="text-text-secondary text-xs md:text-sm mt-8 max-w-3xl mx-auto leading-relaxed font-bold uppercase tracking-[0.3em] opacity-80">
          Discover our curated collections across all domains. Each category represents the absolute pinnacle of luxury, structural integrity, and contemporary design.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/5] bg-aether-700 border border-glass-border shadow-2xl hover:border-cyan-500/30 transition-all duration-700"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-[2000ms] grayscale group-hover:grayscale-0"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=600&fit=crop&q=80'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />

            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <span className="text-[10px] tracking-[0.4em] uppercase text-cyan-500 mb-4 font-black">{cat.count} Artifacts</span>
              <h2 className="text-3xl font-serif text-white mb-6 group-hover:text-cyan-400 transition-colors uppercase tracking-widest font-bold leading-tight">{cat.name}</h2>
              <p className="text-[11px] text-white/70 max-w-xs mb-8 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 leading-relaxed font-bold uppercase tracking-[0.2em]">
                {cat.description}
              </p>
              <Link
                to={`/categories/${cat.id}`}
                className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-white w-max hover:text-cyan-400 transition-all active:scale-95 group/link"
              >
                Access Domain <ArrowRight className="w-5 h-5 group-hover/link:translate-x-3 transition-transform" />
              </Link>
            </div>

            {/* Kinetic glow effect */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
