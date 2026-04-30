import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Pencil, Trash2, X, AlertTriangle, Upload, Image as ImageIcon } from 'lucide-react';
import allProducts from '../../data/products';
import { useTheme } from '../../context/ThemeContext';

const categoryColors = {
  jewelry: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 shadow-purple-500/5',
  accessories: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 shadow-amber-500/5',
  watches: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 shadow-blue-500/5',
  perfume: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20 shadow-pink-500/5',
  beauty: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 shadow-green-500/5',
  fashion: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 shadow-cyan-500/5',
};

const emptyForm = { 
  name: '', 
  collection: '', 
  category: 'jewelry', 
  price: '', 
  stock: '', 
  badge: '', 
  description: '',
  availability: 'In Stock',
  materials: '',
  season: 'All Season',
  image: null 
};

const Inventory = () => {
  const { theme } = useTheme();
  const [products, setProducts] = useState(allProducts);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // null | 'add' | 'edit'
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setForm(emptyForm); setPreviewUrl(null); setModal('add'); };
  const openEdit = (p) => {
    setForm({ 
      name: p.name, 
      collection: p.collection || '', 
      category: p.category, 
      price: p.price, 
      stock: p.stock, 
      badge: p.badge || '', 
      description: p.description || '',
      availability: p.availability || 'In Stock',
      materials: Array.isArray(p.materials) ? p.materials.join(', ') : (p.materials || ''),
      season: p.season || 'All Season',
      image: p.images?.[0] || null
    });
    setPreviewUrl(p.images?.[0] || null);
    setEditId(p.id);
    setModal('edit');
  };

  const closeModal = () => { setModal(null); setEditId(null); setPreviewUrl(null); };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setForm(f => ({ ...f, image: url }));
    }
  };

  const handleSave = () => {
    const formattedProduct = {
      ...form,
      price: +form.price,
      stock: +form.stock,
      materials: form.materials.split(',').map(m => m.trim()).filter(Boolean),
      images: [form.image || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop'],
      featured: false
    };

    if (modal === 'add') {
      setProducts(prev => [{ ...formattedProduct, id: Date.now() }, ...prev]);
    } else {
      setProducts(prev => prev.map(p => p.id === editId ? { ...p, ...formattedProduct } : p));
    }
    closeModal();
  };

  const handleDelete = (id) => { setProducts(prev => prev.filter(p => p.id !== id)); setDeleteConfirm(null); };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-[20px] md:text-[24px] font-serif text-text-primary uppercase tracking-tight font-semibold">Vault Inventory</h1>
          <p className="text-[12px] text-text-muted mt-1.5 uppercase tracking-[0.1em] font-medium opacity-70">Manage your luxury goods, track vault levels, and update pricing.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="bg-aether-700 border border-glass-border rounded-xl pl-9 pr-4 py-2 text-xs text-text-secondary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-cyan-500/30 w-48" />
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-white rounded-xl text-[13px] font-medium hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 uppercase tracking-[0.2em]">
            <Plus className="w-4 h-4" /> Add New Piece
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-aether-700 border border-glass-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-glass-border bg-aether-800/30">
                {['Image', 'Product details', 'Domain', 'Vault Status', 'Value', 'Actions'].map(h => (
                  <th key={h} className="text-left px-6 py-4 text-[12px] tracking-[0.15em] uppercase text-text-muted font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {filtered.map(p => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-aether-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-aether-800 border border-glass-border p-1">
                      <img src={p.images?.[0] || p.image} alt={p.name} className="w-full h-full object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[14px] text-text-primary font-semibold tracking-tight uppercase">{p.name}</p>
                    <p className="text-[12px] text-text-muted mt-1 uppercase tracking-widest font-medium opacity-60">{p.collection}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest ${categoryColors[p.category] || 'bg-slate-500/15 text-slate-400 border-slate-500/20'}`}>
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <span className={`text-[12px] font-semibold uppercase tracking-wider ${p.stock <= 5 ? 'text-amber-500' : 'text-text-secondary'}`}>
                        {p.stock} units
                      </span>
                      <div className="w-20 h-1 bg-aether-600 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${p.stock <= 5 ? 'bg-amber-500' : 'bg-cyan-500'}`} style={{ width: `${Math.min(p.stock * 5, 100)}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-cyan-500 font-bold font-serif">${p.price.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => openEdit(p)} className="p-2 rounded-lg text-text-muted hover:text-cyan-500 hover:bg-cyan-500/10 transition-all border border-transparent hover:border-cyan-500/20">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteConfirm(p.id)} className="p-2 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-glass-border text-[10px] tracking-widest uppercase text-text-muted font-bold">
          Inventory Audit: {filtered.length} products found
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="w-full max-w-4xl bg-aether-700 border border-glass-border rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
              {/* Left Side: Image Upload */}
              <div className="w-full md:w-2/5 bg-aether-800 p-8 border-b md:border-b-0 md:border-r border-glass-border flex flex-col items-center justify-center space-y-6">
                <div className="relative group w-full aspect-square max-w-[280px]">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-2xl border border-glass-border shadow-2xl" />
                  ) : (
                    <div className="w-full h-full bg-aether-900/50 border-2 border-dashed border-glass-border rounded-2xl flex flex-col items-center justify-center text-text-muted gap-3">
                      <ImageIcon className="w-12 h-12" />
                      <p className="text-[10px] font-bold uppercase tracking-widest">No image selected</p>
                    </div>
                  )}
                  <button 
                    onClick={() => fileInputRef.current.click()}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl text-white gap-2"
                  >
                    <Upload className="w-8 h-8" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Upload Image</span>
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                </div>
                <p className="text-[10px] text-text-muted text-center uppercase tracking-widest font-bold opacity-60">Recommended: 800x800px JPG/PNG</p>
              </div>

              {/* Right Side: Form */}
              <div className="flex-1 p-8 overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[20px] font-serif text-text-primary tracking-tight uppercase font-semibold">{modal === 'add' ? 'Curate New Piece' : 'Update Artifact'}</h3>
                  <button onClick={closeModal} className="p-2 rounded-full text-text-muted hover:text-text-primary hover:bg-aether-800 transition-all"><X className="w-5 h-5" /></button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] tracking-[0.2em] uppercase text-text-muted mb-2 block font-bold">Product Name</label>
                    <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="glass-input" placeholder="e.g. Star-Dust Sapphire Collier" />
                  </div>
                  
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-text-muted mb-2 block font-bold">Collection / Tags</label>
                    <input type="text" value={form.collection} onChange={e => setForm(f => ({ ...f, collection: e.target.value }))}
                      className="glass-input" placeholder="e.g. Celestial Collection" />
                  </div>
                  
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-text-muted mb-2 block font-bold">Category</label>
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      className="glass-input appearance-none">
                      {['jewelry', 'accessories', 'watches', 'perfume', 'beauty', 'fashion'].map(c => <option key={c} value={c} className="bg-aether-700 capitalize">{c}</option>)}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-text-muted mb-2 block font-bold">Price ($)</label>
                    <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                      className="glass-input" placeholder="0.00" />
                  </div>
                  
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-text-muted mb-2 block font-bold">Stock Quantity</label>
                    <input type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                      className="glass-input" placeholder="0" />
                  </div>
                  
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-text-muted mb-2 block font-bold">Availability</label>
                    <select value={form.availability} onChange={e => setForm(f => ({ ...f, availability: e.target.value }))}
                      className="glass-input appearance-none">
                      {['In Stock', 'Low Stock', 'Out of Stock', 'Pre-order'].map(a => <option key={a} value={a} className="bg-aether-700">{a}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-text-muted mb-2 block font-bold">Season</label>
                    <input type="text" value={form.season} onChange={e => setForm(f => ({ ...f, season: e.target.value }))}
                      className="glass-input" placeholder="e.g. Winter 2024" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] tracking-[0.2em] uppercase text-text-muted mb-2 block font-bold">Materials (comma separated)</label>
                    <input type="text" value={form.materials} onChange={e => setForm(f => ({ ...f, materials: e.target.value }))}
                      className="glass-input" placeholder="Gold, Diamonds, Silk..." />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] tracking-[0.2em] uppercase text-text-muted mb-2 block font-bold">Description</label>
                    <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
                      className="glass-input resize-none" placeholder="Crafted with precision..." />
                  </div>
                </div>

                <div className="flex gap-4 mt-10">
                  <button onClick={closeModal} className="flex-1 py-3.5 rounded-xl border border-glass-border text-[13px] font-medium uppercase tracking-[0.2em] text-text-muted hover:text-text-primary hover:border-text-muted transition-all">Discard</button>
                  <button onClick={handleSave} className="flex-1 py-3.5 rounded-xl bg-cyan-500 text-white text-[13px] font-medium uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20">
                    {modal === 'add' ? 'Confirm Addition' : 'Save Transformations'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="w-full max-w-sm bg-aether-700 border border-glass-border rounded-2xl p-8 text-center space-y-6 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-serif text-text-primary uppercase tracking-widest font-bold">Permanently Remove?</h3>
                <p className="text-xs text-text-muted mt-2 font-bold uppercase tracking-wider">This artifact will be lost from the vault forever.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 rounded-xl border border-glass-border text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-text-primary hover:border-text-muted transition-all">Abeyance</button>
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-3 rounded-xl bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-red-400 transition-all shadow-lg shadow-red-500/20">Eliminate</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Inventory;
