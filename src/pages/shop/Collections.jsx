import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import ProductCard from '../../components/ui/ProductCard';
import allProducts from '../../data/products';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

const Collections = () => {
  const { searchQuery } = useSearch();

  const [activeTab, setActiveTab] = useState('New Arrivals');
  const [sortBy, setSortBy] = useState('Featured');

  const [openFilters, setOpenFilters] = useState({ category: true, price: true, availability: false, materials: false, season: false });
  const initialFilters = { category: 'all', price: 'all', availability: 'all', material: 'all', season: 'all' };
  const [filters, setFilters] = useState({ ...initialFilters });
  const [appliedFilters, setAppliedFilters] = useState({ ...initialFilters });

  const toggleFilter = key => setOpenFilters(prev => ({ ...prev, [key]: !prev[key] }));
  const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
  const applyFilters = () => setAppliedFilters({ ...filters });
  const resetFilters = () => { setFilters(initialFilters); setAppliedFilters(initialFilters); };

  const collectionsTabs = ['New Arrivals', 'Collections', 'Limited Edition', 'Archive'];

  const collectionProducts = useMemo(() => {
    let result = [...allProducts];

    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeTab === 'New Arrivals') result = result.filter(p => p.badge === 'NEW');
    else if (activeTab === 'Limited Edition') result = result.filter(p => p.badge === 'LIMITED' || p.badge === 'EXCLUSIVE');
    else if (activeTab === 'Collections') result = result.filter(p => p.featured);
    else if (activeTab === 'Archive') result = result.filter(p => p.badge !== 'NEW' && p.badge !== 'LIMITED' && p.badge !== 'EXCLUSIVE');

    if (appliedFilters.category !== 'all') result = result.filter(p => p.category === appliedFilters.category);
    if (appliedFilters.price !== 'all') {
      if (appliedFilters.price === 'under-1000') result = result.filter(p => p.price < 1000);
      else if (appliedFilters.price === '1000-5000') result = result.filter(p => p.price >= 1000 && p.price <= 5000);
      else if (appliedFilters.price === 'over-5000') result = result.filter(p => p.price > 5000);
    }
    if (appliedFilters.availability !== 'all') result = result.filter(p => p.availability?.toLowerCase().replace(' ', '-') === appliedFilters.availability);
    if (appliedFilters.material !== 'all') result = result.filter(p => p.materials?.some(m => m.toLowerCase() === appliedFilters.material));
    if (appliedFilters.season !== 'all') result = result.filter(p => p.season?.toLowerCase().includes(appliedFilters.season));

    if (sortBy === 'Newest') result = [...result].sort((a, b) => (a.badge === 'NEW' ? -1 : 1));
    else if (sortBy === 'Price: High to Low') result = [...result].sort((a, b) => b.price - a.price);
    else if (sortBy === 'Price: Low to High') result = [...result].sort((a, b) => a.price - b.price);

    return result;
  }, [searchQuery, activeTab, appliedFilters, sortBy]);

  const FilterSection = ({ title, filterKey, options }) => (
    <div className="border-b border-glass-border pb-4">
      <div className="group cursor-pointer flex justify-between items-center text-[12px] font-medium text-text-secondary hover:text-text-primary transition-colors uppercase tracking-[0.2em]" onClick={() => toggleFilter(filterKey)}>
        <span className="flex items-center gap-3">{filterKey === 'category' && <Filter className="w-4 h-4" />} {title}</span>
        {openFilters[filterKey] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </div>
      <AnimatePresence>
        {openFilters[filterKey] && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="pt-4 space-y-2">
              {options.map(opt => (
                <label key={opt.value} className="flex items-center gap-3 cursor-pointer group/label">
                  <input type="radio" name={filterKey} value={opt.value} checked={filters[filterKey] === opt.value}
                    onChange={() => handleFilterChange(filterKey, opt.value)}
                    className="w-3.5 h-3.5 rounded-full border-glass-border text-cyan-500 focus:ring-cyan-500/30 bg-transparent" />
                  <span className={`text-[12px] font-medium uppercase tracking-wider ${filters[filterKey] === opt.value ? 'text-cyan-500' : 'text-text-muted group-hover/label:text-text-secondary'} transition-colors`}>{opt.label}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-24 flex flex-col md:flex-row max-w-7xl mx-auto px-4 gap-12 transition-colors duration-500">
      {/* Refinement Sidebar */}
      <aside className="w-full md:w-80 flex-shrink-0 mb-12 md:mb-0">
        <div className="sticky top-32 space-y-10">
          <div>
            <h2 className="text-[12px] font-semibold tracking-[0.4em] uppercase text-text-primary mb-6">Refinement</h2>
            <div className="flex justify-between items-center mb-6 border-b border-glass-border pb-5">
              <p className="text-[11px] tracking-[0.2em] uppercase text-text-muted font-medium opacity-60">Curated Parameters</p>
              <button onClick={resetFilters} className="text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-500 hover:text-cyan-400 transition-colors">Reset All</button>
            </div>
            <div className="space-y-6">
              <FilterSection title="Category" filterKey="category" options={[
                { label: 'All Artifacts', value: 'all' }, { label: 'Jewelry', value: 'jewelry' },
                { label: 'Accessories', value: 'accessories' }, { label: 'Watches', value: 'watches' },
                { label: 'Perfume', value: 'perfume' }, { label: 'Beauty', value: 'beauty' },
                { label: 'Fashion', value: 'fashion' },
              ]} />
              <FilterSection title="Valuation" filterKey="price" options={[
                { label: 'All Tiers', value: 'all' }, { label: 'Under $1,000', value: 'under-1000' },
                { label: '$1,000 – $5,000', value: '1000-5000' }, { label: 'Over $5,000', value: 'over-5000' },
              ]} />
              <FilterSection title="Vault Status" filterKey="availability" options={[
                { label: 'All States', value: 'all' }, { label: 'In Stock', value: 'in-stock' },
                { label: 'Low Stock', value: 'low-stock' }, { label: 'Pre-order', value: 'pre-order' },
              ]} />
            </div>
            <button onClick={applyFilters} className="w-full mt-10 py-4 rounded-xl bg-cyan-500 text-white text-[12px] font-medium tracking-[0.3em] uppercase hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20 active:scale-95">
              Apply Parameters
            </button>
          </div>
        </div>
      </aside>

      {/* Primary Content Archive */}
      <div className="flex-1">
        {searchQuery && (
          <div className="mb-10 p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/10 backdrop-blur-md">
            <p className="text-[11px] text-text-secondary uppercase tracking-[0.3em] font-bold">
              Archival results for <span className="text-text-primary">"{searchQuery}"</span>
            </p>
          </div>
        )}

        {/* Tactical Navigation */}
        <div className="flex gap-8 mb-10 overflow-x-auto pb-4 scrollbar-hide border-b border-glass-border">
          {collectionsTabs.map(c => (
            <button key={c} onClick={() => setActiveTab(c)}
              className={`text-[12px] font-medium uppercase tracking-[0.3em] whitespace-nowrap pb-4 transition-all relative
                ${activeTab === c ? 'text-cyan-500' : 'text-text-muted hover:text-text-primary'}`}>
              {c}
              {activeTab === c && (
                <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              )}
            </button>
          ))}
        </div>

        {/* Cinematic Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-[3rem] overflow-hidden mb-16 bg-aether-700 shadow-2xl border border-glass-border group">
          <div className="absolute inset-0 bg-gradient-to-r from-aether-900 via-aether-900/40 to-transparent z-10" />
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop&q=80" className="w-full h-72 object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]" alt="Collection hero" />
          <div className="absolute inset-0 z-20 p-10 md:p-14 flex flex-col justify-center">
            {(activeTab === 'New Arrivals' || activeTab === 'Limited Edition') && (
              <span className="inline-block px-5 py-2 bg-cyan-500/10 backdrop-blur-xl text-cyan-500 border border-cyan-500/20 rounded-full text-[10px] font-bold tracking-[0.4em] uppercase mb-6 w-max">
                {activeTab}
              </span>
            )}
            <h1 className="text-[28px] md:text-[32px] font-serif text-text-primary mb-5 uppercase tracking-tight leading-tight font-semibold">{activeTab}</h1>
            <p className="text-text-secondary text-[13px] max-w-sm leading-relaxed font-medium uppercase tracking-[0.15em] opacity-70">
              Discover pieces defined by sub-zero aesthetics and engineered archival precision.
            </p>
          </div>
        </motion.div>

        {/* Grid Meta */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-text-muted opacity-60">{collectionProducts.length} Artifacts Discovered</p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted">Sort Criteria</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="bg-aether-700 text-[10px] font-bold uppercase tracking-[0.3em] text-text-primary px-5 py-2.5 rounded-xl border border-glass-border focus:outline-none focus:ring-1 focus:ring-cyan-500/30 cursor-pointer shadow-sm hover:border-cyan-500/30 transition-all">
              <option>Featured</option>
              <option>Newest</option>
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Artifact Landscape */}
        {collectionProducts.length === 0 ? (
          <div className="py-32 text-center bg-aether-700/30 rounded-[3rem] border border-glass-border">
            <p className="text-text-muted mb-8 uppercase tracking-[0.4em] text-[11px] font-bold opacity-60">No artifacts match your current parameters.</p>
            <button onClick={resetFilters} className="px-10 py-4 bg-cyan-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20">Clear All Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {collectionProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
