import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, ChevronDown } from 'lucide-react';
import allProducts from '../../data/products';
import { useSearch } from '../../context/SearchContext';
import { useProtectedCartAction } from '../../hooks/useProtectedCartAction';

const categories = ['All', 'jewelry', 'accessories', 'watches', 'perfume', 'beauty', 'fashion'];
const sorts = ['Featured', 'Price: Low–High', 'Price: High–Low', 'Newest'];
const badgeColors = { NEW: 'bg-cyan-500/90', LIMITED: 'bg-purple-500/90', EXCLUSIVE: 'bg-amber-500/90' };

const Shop = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const { protectedAddToCart } = useProtectedCartAction();
  const [cat, setCat]     = useState('All');
  const [sort, setSort]   = useState('Featured');
  const [wishlist, setWishlist] = useState([]);
  const [localSearch, setLocalSearch] = useState('');

  const activeSearch = searchQuery || localSearch;

  const filtered = useMemo(() => {
    let list = [...allProducts];
    if (cat !== 'All') list = list.filter(p => p.category === cat);
    if (activeSearch) list = list.filter(p =>
      p.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
      p.description?.toLowerCase().includes(activeSearch.toLowerCase()) ||
      p.category?.toLowerCase().includes(activeSearch.toLowerCase())
    );
    if (sort === 'Price: Low–High') list.sort((a, b) => a.price - b.price);
    if (sort === 'Price: High–Low') list.sort((a, b) => b.price - a.price);
    if (sort === 'Newest') list = list.filter(p => p.badge === 'NEW').concat(list.filter(p => p.badge !== 'NEW'));
    if (sort === 'Featured') list = list.filter(p => p.featured).concat(list.filter(p => !p.featured));
    return list;
  }, [cat, sort, activeSearch]);

  const toggleWishlist = id =>
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const handleLocalSearch = (e) => {
    setLocalSearch(e.target.value);
    if (searchQuery) setSearchQuery('');
  };

  const clearAll = () => { setLocalSearch(''); setSearchQuery(''); setCat('All'); };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 max-w-7xl mx-auto transition-colors duration-500">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pb-12 border-b border-glass-border">
        <p className="text-[11px] tracking-[0.4em] uppercase text-cyan-500 mb-5 font-bold">The Glacier Archive</p>
        <h1 className="font-serif text-[24px] md:text-[28px] text-text-primary tracking-[0.05em] uppercase font-medium leading-tight italic">Master Collection</h1>
        <p className="text-text-muted text-[11px] mt-6 uppercase tracking-[0.2em] font-medium opacity-60">Curating {filtered.length} exceptional artifacts of luxury</p>
      </motion.div>

      {/* Navigation Controls */}
      <div className="sticky top-20 z-30 py-8 bg-aether-800/90 backdrop-blur-2xl border-b border-glass-border mb-12">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-cyan-500 transition-colors" />
            <input 
              value={activeSearch} 
              onChange={handleLocalSearch} 
              placeholder="Search by name, category, or essence..." 
              className="glass-input pl-14 pr-12 w-full py-4 text-[13px] font-medium uppercase tracking-[0.15em] bg-aether-700/50" 
            />
            {activeSearch && (
              <button onClick={clearAll} className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted hover:text-red-500 transition-colors p-1">
                <span className="text-[11px] uppercase font-bold tracking-tight">Clear</span>
              </button>
            )}
          </div>
          <div className="relative min-w-[240px]">
            <select 
              value={sort} 
              onChange={e => setSort(e.target.value)} 
              className="glass-input px-6 pr-12 py-4 appearance-none cursor-pointer w-full font-medium text-[12px] uppercase tracking-[0.2em] bg-aether-700/50"
            >
              {sorts.map(s => <option key={s} value={s} className="bg-aether-700 text-text-primary">{s}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          </div>
        </div>
      </div>

      {activeSearch && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="mb-12 p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-secondary">
            Displaying artifacts matching <strong className="text-cyan-500 font-black">"{activeSearch}"</strong> — {filtered.length} results
          </span>
          <button onClick={clearAll} className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.4em] hover:text-cyan-400 transition-colors">Reset</button>
        </motion.div>
      )}

      {/* Domain Selection */}
      <div className="flex gap-4 flex-wrap mb-16">
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-6 py-3.5 rounded-xl text-[12px] font-medium uppercase tracking-[0.2em] transition-all border shadow-lg active:scale-95
              ${cat === c 
                ? 'bg-cyan-500 text-white border-cyan-500 shadow-cyan-500/20' 
                : 'bg-aether-700 text-text-muted border-glass-border hover:text-text-primary hover:border-text-muted'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Artifact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {filtered.map((product, i) => (
          <motion.div key={product.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="group relative">
            <div className="relative overflow-hidden aspect-[4/5] bg-aether-700 rounded-[2.5rem] border border-glass-border shadow-2xl">
              <Link to={`/product/${product.id}`} className="absolute inset-0 z-10" />
              <img src={product.images?.[0] || product.image} alt={product.name}
                className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop&q=80'; }} />
              
              {/* Badges */}
              {product.badge && (
                <div className="absolute top-6 left-6 z-20">
                  <span className={`text-[9px] tracking-[0.3em] uppercase font-bold text-white px-4 py-2 rounded-xl shadow-2xl backdrop-blur-xl border border-white/10 ${badgeColors[product.badge] || 'bg-slate-800'}`}>
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Wishlist Toggle */}
              <button onClick={() => toggleWishlist(product.id)}
                className={`absolute top-6 right-6 p-3 rounded-2xl backdrop-blur-2xl border border-white/10 transition-all z-20 shadow-2xl 
                  ${wishlist.includes(product.id) ? 'bg-red-500 text-white border-red-500' : 'bg-black/20 text-white/80 hover:bg-black/40 hover:text-white'}`}>
                <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
              </button>

              {/* Quick Action Overlay */}
              <div className="absolute inset-x-6 bottom-6 translate-y-20 group-hover:translate-y-0 transition-transform duration-500 z-20">
                <button onClick={() => protectedAddToCart(product)} className="w-full py-4 rounded-2xl bg-white text-black text-[10px] font-bold tracking-[0.4em] uppercase flex items-center justify-center gap-3 hover:bg-cyan-500 hover:text-white transition-all shadow-2xl shadow-black/50">
                  <ShoppingBag className="w-4 h-4" /> Acquisition
                </button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            {/* Metadata */}
            <div className="mt-8 px-2">
              <div className="flex justify-between items-start gap-4">
                <Link to={`/product/${product.id}`} className="flex-1">
                  <h3 className="text-[12px] md:text-[13px] font-bold text-text-primary tracking-[0.15em] uppercase leading-tight group-hover:text-cyan-500 transition-colors">{product.name}</h3>
                </Link>
                <div className="flex flex-col items-end">
                  <span className="text-cyan-500 font-bold text-sm tracking-tighter">${product.price.toLocaleString()}</span>
                  {product.originalPrice && <span className="text-text-muted text-[10px] line-through opacity-40 font-bold tracking-tighter mt-1">${product.originalPrice.toLocaleString()}</span>}
                </div>
              </div>
              <p className="text-[10px] text-text-muted mt-3 uppercase tracking-[0.3em] font-bold opacity-60">{product.category}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-40 bg-aether-700/30 rounded-[3rem] border border-glass-border mt-16">
          <p className="text-text-muted text-[11px] font-bold uppercase tracking-[0.5em] mb-8 opacity-60">The vault is currently empty for this selection.</p>
          <button onClick={clearAll} className="px-10 py-4 bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-cyan-500 hover:text-white transition-all">Expand Search</button>
        </div>
      )}
    </div>
  );
};

export default Shop;
