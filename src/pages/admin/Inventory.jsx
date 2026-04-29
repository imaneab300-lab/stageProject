import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Pencil, Trash2, X, AlertTriangle } from 'lucide-react';
import allProducts from '../../data/products';

const categoryColors = {
  jewelry: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  accessories: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  watches: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  fragrance: 'bg-pink-500/15 text-pink-400 border-pink-500/20',
  beauty: 'bg-green-500/15 text-green-400 border-green-500/20',
};

const emptyForm = { name: '', collection: '', category: 'jewelry', price: '', stock: '', badge: '', description: '' };

const Inventory = () => {
  const [products, setProducts] = useState(allProducts);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // null | 'add' | 'edit'
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setForm(emptyForm); setModal('add'); };
  const openEdit = (p) => {
    setForm({ name: p.name, collection: p.collection, category: p.category, price: p.price, stock: p.stock, badge: p.badge || '', description: p.description });
    setEditId(p.id);
    setModal('edit');
  };
  const closeModal = () => { setModal(null); setEditId(null); };

  const handleSave = () => {
    if (modal === 'add') {
      const newP = { ...form, id: Date.now(), price: +form.price, stock: +form.stock, images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop'], originalPrice: null, featured: false };
      setProducts(prev => [newP, ...prev]);
    } else {
      setProducts(prev => prev.map(p => p.id === editId ? { ...p, ...form, price: +form.price, stock: +form.stock } : p));
    }
    closeModal();
  };

  const handleDelete = (id) => { setProducts(prev => prev.filter(p => p.id !== id)); setDeleteConfirm(null); };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 mt-1">Manage your luxury goods, track vault levels, and update pricing.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="bg-white/5 border border-white/5 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 w-44" />
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400 text-xs font-semibold hover:bg-cyan-500/20 transition-all">
            <Plus className="w-3.5 h-3.5" /> Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0f1629]/80 border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['Image', 'Name', 'Category', 'Stock', 'Price', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-[10px] tracking-[0.15em] uppercase text-slate-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(p => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-white/2 transition-colors group">
                  <td className="px-5 py-3.5">
                    <img src={p.images?.[0]} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm text-white font-medium">{p.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{p.collection}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex px-2.5 py-1 rounded-lg border text-[10px] font-medium tracking-wide ${categoryColors[p.category] || 'bg-slate-500/15 text-slate-400 border-slate-500/20'}`}>
                      {p.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-sm font-semibold ${p.stock <= 5 ? 'text-amber-400' : 'text-slate-300'}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-white font-semibold">${p.price.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeleteConfirm(p.id)} className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-white/5 text-[11px] text-slate-500">
          Showing {filtered.length} of {products.length} items
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="w-full max-w-md bg-[#0f1629] border border-white/10 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">{modal === 'add' ? 'Add Product' : 'Edit Product'}</h3>
                <button onClick={closeModal} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-3">
                {[['name', 'Product Name', 'text'], ['collection', 'Collection', 'text'], ['price', 'Price ($)', 'number'], ['stock', 'Stock Qty', 'number'], ['badge', 'Badge (optional)', 'text']].map(([key, label, type]) => (
                  <div key={key}>
                    <label className="text-[10px] tracking-[0.12em] uppercase text-slate-500 mb-1 block">{label}</label>
                    <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/30" />
                  </div>
                ))}
                <div>
                  <label className="text-[10px] tracking-[0.12em] uppercase text-slate-500 mb-1 block">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500/30">
                    {['jewelry', 'accessories', 'watches', 'fragrance', 'beauty'].map(c => <option key={c} value={c} className="bg-[#0f1629]">{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={closeModal} className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-slate-400 hover:text-white hover:border-white/20 transition-all">Cancel</button>
                <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-sm text-cyan-400 font-semibold hover:bg-cyan-500/20 transition-all">
                  {modal === 'add' ? 'Add Product' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="w-full max-w-sm bg-[#0f1629] border border-white/10 rounded-2xl p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-base font-semibold text-white">Delete Product?</h3>
              <p className="text-xs text-slate-500">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-slate-400 hover:text-white transition-all">Cancel</button>
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 font-semibold hover:bg-red-500/20 transition-all">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Inventory;
