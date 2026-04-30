import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Calendar, Shield, Globe, ChevronLeft, Gem, Watch, Wrench, Award } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import allProducts from '../../data/products';
import { toast } from 'react-hot-toast';

const specIcons = { gems: Gem, metal: Award, craft: Wrench, certification: Shield, material: Gem, hardware: Award, movement: Watch, case: Shield, waterResistance: Globe };

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = allProducts.find(p => p.id === Number(id));
  const [selectedImg, setSelectedImg] = useState(0);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center pt-32 transition-colors duration-500">
      <div className="text-center space-y-8">
        <p className="text-text-muted text-[11px] font-bold uppercase tracking-[0.5em] opacity-60">The artifact has vanished from the vault.</p>
        <Link to="/shop">
          <button className="px-12 py-5 bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-cyan-500 hover:text-white transition-all">
            Return to Gallery
          </button>
        </Link>
      </div>
    </div>
  );

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`${product.name} SECURED`, {
      style: { 
        background: 'rgba(15, 23, 42, 0.9)', 
        backdropFilter: 'blur(10px)',
        color: '#f8fafc', 
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        fontSize: '10px',
        fontWeight: 'bold',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        padding: '16px 24px'
      },
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 max-w-7xl mx-auto transition-colors duration-500">
      {/* Tactical Pathing */}
      <div className="flex items-center gap-4 py-12 text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted">
        <Link to="/" className="hover:text-cyan-500 transition-colors">Origins</Link>
        <span className="opacity-20">/</span>
        <Link to="/shop" className="hover:text-cyan-500 transition-colors">Archive</Link>
        <span className="opacity-20">/</span>
        <span className="text-text-primary font-black">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
        {/* Visual Documentation */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-10">
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-aether-700 border border-glass-border shadow-2xl group">
            <motion.img key={selectedImg} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }} src={product.images[selectedImg]} alt={product.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2000ms] opacity-90 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>
          
          {/* Dimensional Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-6">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImg(i)}
                  className={`w-28 h-28 rounded-3xl overflow-hidden border-2 transition-all shadow-2xl active:scale-95
                    ${i === selectedImg ? 'border-cyan-500 scale-105 shadow-cyan-500/20' : 'border-glass-border opacity-40 hover:opacity-100 hover:border-cyan-500/30'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Technical Specifications */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-12">
          <div>
            <span className="inline-block px-5 py-2 bg-cyan-500/10 backdrop-blur-xl border border-cyan-500/20 rounded-full text-[10px] text-cyan-500 tracking-[0.5em] uppercase font-black shadow-2xl mb-10">
              Artisan Certified — GLACIER PRO
            </span>
            <p className="text-[11px] tracking-[0.6em] uppercase text-cyan-500 mb-6 font-bold opacity-60">{product.collection}</p>
            <h1 className="font-serif text-[28px] md:text-[32px] text-text-primary leading-[1.2] uppercase tracking-tight font-semibold">{product.name}</h1>
            <p className="mt-8 text-text-secondary text-[14px] md:text-[15px] font-medium leading-relaxed uppercase tracking-[0.15em] opacity-70 max-w-xl">{product.description}</p>
          </div>

          {/* Valuation */}
          <div className="flex items-center gap-10">
            <span className="text-[28px] md:text-[32px] font-serif text-text-primary font-semibold tracking-tight">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-[18px] text-text-muted line-through opacity-30 font-medium tracking-tight">${product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          {/* Blueprint Grid */}
          {product.specs && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Object.entries(product.specs).map(([key, val]) => {
                const Icon = specIcons[key] || Gem;
                return (
                  <div key={key} className="bg-aether-700/50 border border-glass-border p-6 rounded-[2rem] space-y-4 hover:border-cyan-500/30 transition-all shadow-xl group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-cyan-500/5 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/10 transition-all">
                        <Icon className="w-5 h-5 text-cyan-500" />
                      </div>
                      <span className="text-[10px] tracking-[0.4em] uppercase text-text-muted font-black opacity-60">{key}</span>
                    </div>
                    <p className="text-[11px] text-text-primary font-black uppercase tracking-[0.2em] leading-tight">{val}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Strategic Actions */}
          <div className="space-y-6 pt-10">
            <button onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-5 py-6 rounded-[2rem] bg-cyan-500 text-white text-[11px] font-black uppercase tracking-[0.5em] hover:bg-cyan-400 transition-all shadow-[0_20px_50px_rgba(6,182,212,0.3)] active:scale-95">
              <ShoppingBag className="w-5 h-5" /> Secure Acquisition
            </button>
            <button className="w-full flex items-center justify-center gap-5 py-6 rounded-[2rem] bg-aether-700 border border-glass-border text-[11px] text-text-secondary font-black uppercase tracking-[0.5em] hover:bg-text-primary hover:text-aether-900 transition-all shadow-xl active:scale-95">
              <Calendar className="w-5 h-5" /> Bespoke Consultation
            </button>
          </div>

          {/* Operational Trust */}
          <div className="flex items-center justify-between pt-16 border-t border-glass-border">
            {[['🌍', 'Global Access'], ['✦', 'Purity Check'], ['◈', 'Concierge Elite']].map(([icon, label]) => (
              <div key={label} className="flex flex-col items-center gap-4">
                <span className="text-cyan-500 text-2xl drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">{icon}</span>
                <span className="text-[9px] text-text-muted uppercase font-black tracking-[0.4em] opacity-60">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Artisanal Narrative */}
      <div className="mt-48 border-t border-glass-border pt-32">
        <div className="max-w-4xl mb-24">
          <span className="text-[11px] tracking-[0.6em] uppercase text-cyan-500 font-bold mb-6 block opacity-60">The Craft</span>
          <h2 className="font-serif text-5xl md:text-7xl text-text-primary uppercase tracking-tighter font-bold leading-tight">Structural Integrity & Artisanal Mastery</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-aether-700/50 border border-glass-border p-12 rounded-[3rem] space-y-8 shadow-2xl hover:shadow-cyan-500/5 transition-all duration-700 group">
            <div className="w-20 h-20 rounded-[2rem] bg-cyan-500/5 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/10 transition-all">
              <span className="text-cyan-500 text-4xl font-bold">✦</span>
            </div>
            <h3 className="font-serif text-3xl text-text-primary uppercase tracking-widest font-bold">The Setting Architecture</h3>
            <p className="text-[11px] text-text-secondary leading-relaxed font-bold uppercase tracking-[0.2em] opacity-70">
              Our master jewelers utilize a signature 'invisible' setting technique, allowing each stone to maximize light refraction without visible prongs. This structural process requires over 120 hours of meticulous hand-setting per artifact.
            </p>
          </div>
          <div className="bg-aether-700/50 border border-glass-border p-12 rounded-[3rem] space-y-8 shadow-2xl hover:shadow-cyan-500/5 transition-all duration-700 group">
            <div className="w-20 h-20 rounded-[2rem] bg-cyan-500/5 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/10 transition-all">
              <span className="text-cyan-500 text-4xl font-bold">◈</span>
            </div>
            <h3 className="font-serif text-3xl text-text-primary uppercase tracking-widest font-bold">Refraction-X System</h3>
            <p className="text-[11px] text-text-secondary leading-relaxed font-bold uppercase tracking-[0.2em] opacity-70">
              Proprietary cut geometry ensuring maximum brilliance under any atmospheric condition, from grand gala illumination to cinematic low-light. Every facet is polished to near-atomic precision by our Swiss masters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
