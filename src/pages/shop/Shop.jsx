import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Heart, ShoppingBag, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import allProducts from '../../data/products';
import { toast } from 'react-hot-toast';

const categories = ['All', 'jewelry', 'accessories', 'watches', 'fragrance', 'beauty'];
const sorts = ['Featured', 'Price: Low–High', 'Price: High–Low', 'Newest'];

const badgeColors = {
  NEW:       'bg-cyan-500/90',
  LIMITED:   'bg-purple-500/90',
  EXCLUSIVE: 'bg-amber-500/90',
};

const Shop = () => {
  const { addToCart } = useCart();
  const [search, setSearch]   = useState('');
  const [cat, setCat]         = useState('All');
  const [sort, setSort]       = useState('Featured');
  const [wishlist, setWishlist] = useState([]);

  const filtered = useMemo(() => {
    let list = [...allProducts];
    if (cat !== 'All') list = list.filter(p => p.category === cat);
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'Price: Low–High')  list.sort((a, b) => a.price - b.price);
    if (sort === 'Price: High–Low')  list.sort((a, b) => b.price - a.price);
    if (sort === 'Featured')         list = list.filter(p => p.featured).concat(list.filter(p => !p.featured));
    return list;
  }, [cat, sort, search]);

  const toggleWishlist = (id) =>
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`, {
      style: { background: '#0f1629', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.1)' },
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-8 pb-10">
        <p className="text-[10px] tracking-[0.25em] uppercase text-cyan-400 mb-2">GLACIER PREMIER</p>
        <h1 className="font-serif text-4xl md:text-5xl text-white tracking-wide">The Collection</h1>
        <p className="text-slate-500 text-sm mt-3">Showing {filtered.length} premium pieces</p>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search collection..."
            className="glass-input pl-11 w-full" />
        </div>
        {/* Sort */}
        <div className="relative">
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="glass-input pr-10 appearance-none cursor-pointer min-w-[160px]">
            {sorts.map(s => <option key={s} value={s} className="bg-aether-700">{s}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-10">
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-xl text-xs font-medium capitalize tracking-wide transition-all border
              ${cat === c
                ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20'
                : 'bg-white/3 text-slate-500 border-white/5 hover:text-white hover:border-white/10'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product, i) => (
          <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }} className="glass-card group cursor-pointer">
            {/* Image */}
            <div className="relative overflow-hidden aspect-square bg-aether-700/50">
              <Link to={`/product/${product.id}`}>
                <img src={product.images[0]} alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </Link>
              {product.badge && (
                <span className={`absolute top-3 left-3 text-[9px] tracking-[0.12em] uppercase font-semibold text-white px-2.5 py-1 rounded-full ${badgeColors[product.badge] || 'bg-slate-500/90'}`}>
                  {product.badge}
                </span>
              )}
              <button onClick={() => toggleWishlist(product.id)}
                className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${wishlist.includes(product.id) ? 'bg-red-500/80 text-white' : 'bg-black/30 text-slate-400 hover:text-white'}`}>
                <Heart className={`w-3.5 h-3.5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
              </button>
              {/* Quick Add */}
              <div className="absolute inset-0 bg-aether-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <button onClick={() => handleAddToCart(product)}
                  className="w-full py-2 rounded-xl bg-cyan-500/90 text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 hover:bg-cyan-400 transition-colors">
                  <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
                </button>
              </div>
            </div>
            {/* Info */}
            <div className="p-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="text-sm font-medium text-slate-200 tracking-wide hover:text-white transition-colors">{product.name}</h3>
              </Link>
              <p className="text-[11px] text-slate-500 mt-1 truncate">{product.description}</p>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <span className="text-cyan-400 font-semibold text-sm">${product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-slate-600 text-xs line-through ml-2">${product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <button onClick={() => handleAddToCart(product)}
                  className="text-slate-500 hover:text-cyan-400 transition-colors p-1">
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24">
          <p className="text-slate-500 text-sm">No products match your search.</p>
        </div>
      )}
    </div>
  );
};

export default Shop;
