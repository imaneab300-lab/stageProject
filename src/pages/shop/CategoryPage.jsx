import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, LayoutGrid, List } from 'lucide-react';
import allProducts from '../../data/products';
import ProductCard from '../../components/ui/ProductCard';

const CategoryPage = () => {
  const { slug } = useParams();
  const [viewMode, setViewMode] = useState('grid');

  const categoryData = useMemo(() => {
    const categories = {
      jewelry: { name: 'Haute Joaillerie', description: 'Exceptional diamonds and precious metals.' },
      accessories: { name: 'Artisan Accessories', description: 'Handcrafted leather and silk goods.' },
      watches: { name: 'Heritage Timepieces', description: 'Precision horology and timeless design.' },
      perfume: { name: 'Maison Fragrances', description: 'Rare scents and crystal vessels.' },
      beauty: { name: 'Luminous Beauty', description: 'Exclusive elixirs for perfection.' },
      fashion: { name: 'Maison Couture', description: 'Structured silhouettes and rare textiles.' }
    };
    return categories[slug] || { name: slug.charAt(0).toUpperCase() + slug.slice(1), description: 'Explore our curated selection.' };
  }, [slug]);

  const products = useMemo(() => {
    return allProducts.filter(p => p.category === slug);
  }, [slug]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 max-w-7xl mx-auto transition-colors duration-500">
      {/* Tactical Pathing */}
      <nav className="flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase text-text-muted mb-12 font-bold">
        <Link to="/" className="hover:text-cyan-500 transition-colors">Origins</Link>
        <span className="opacity-20">/</span>
        <Link to="/categories" className="hover:text-cyan-500 transition-colors">Domains</Link>
        <span className="opacity-20">/</span>
        <span className="text-text-primary font-black">{categoryData.name}</span>
      </nav>

      {/* Cinematic Header */}
      <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-12 border-b border-glass-border pb-12">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-3xl"
        >
          <span className="text-[11px] tracking-[0.5em] uppercase text-cyan-500 font-bold mb-6 block">Archival Domain</span>
          <h1 className="font-serif text-5xl md:text-7xl text-text-primary mb-8 uppercase tracking-tighter font-bold leading-tight">
            {categoryData.name}
          </h1>
          <p className="text-text-secondary text-xs md:text-sm font-bold leading-relaxed uppercase tracking-[0.3em] opacity-80">
            {categoryData.description}
          </p>
        </motion.div>

        <div className="flex items-center gap-10">
          <div className="text-right">
            <p className="text-[10px] tracking-[0.4em] text-text-muted uppercase mb-2 font-bold opacity-60">Inventory Size</p>
            <p className="text-5xl font-serif text-text-primary font-bold tracking-tighter shadow-text-glow">{products.length}</p>
          </div>
          <div className="flex gap-4 p-1.5 bg-aether-700/50 rounded-2xl border border-glass-border shadow-xl">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-all active:scale-95 ${viewMode === 'grid' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-text-muted hover:text-text-primary'}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition-all active:scale-95 ${viewMode === 'list' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-text-muted hover:text-text-primary'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Domain Collection Grid */}
      {products.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
          : "flex flex-col gap-10"
        }>
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      ) : (
        <div className="py-40 text-center border border-glass-border rounded-[3rem] bg-aether-700/30 backdrop-blur-md">
          <p className="text-text-muted text-[11px] font-bold uppercase tracking-[0.5em] mb-10 opacity-60">The domain's vault is currently inaccessible or empty.</p>
          <Link to="/shop">
            <button className="px-12 py-5 bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-cyan-500 hover:text-white transition-all shadow-xl active:scale-95">
              Explore Collection
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
