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
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center space-y-4">
        <p className="text-slate-500">Product not found.</p>
        <Link to="/shop" className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center justify-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Back to Shop
        </Link>
      </div>
    </div>
  );

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`, {
      style: { background: '#0f1629', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.1)' },
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 pt-8 pb-10 text-xs text-slate-500">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-slate-300">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left — Images */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-4">
          {/* Badge */}
          {product.badge && (
            <span className="inline-flex px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] tracking-[0.15em] uppercase text-slate-400">
              Haute Joaillerie
            </span>
          )}
          {/* Main image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-aether-700/50">
            <motion.img key={selectedImg} initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }} src={product.images[selectedImg]} alt={product.name}
              className="w-full h-full object-cover" />
          </div>
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImg(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${i === selectedImg ? 'border-cyan-400/70' : 'border-transparent opacity-50 hover:opacity-80'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right — Info */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-6 pt-2">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-cyan-400 mb-3">{product.collection}</p>
            <h1 className="font-serif text-3xl md:text-4xl text-white leading-tight">{product.name}</h1>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">{product.description}</p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-white">${product.price.toLocaleString()}.00</span>
            {product.originalPrice && (
              <span className="text-lg text-slate-600 line-through">${product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          {/* Specs Grid */}
          {product.specs && (
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(product.specs).map(([key, val]) => {
                const Icon = specIcons[key] || Gem;
                return (
                  <div key={key} className="glass-card p-3 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-[9px] tracking-[0.15em] uppercase text-slate-500">{key}</span>
                    </div>
                    <p className="text-xs text-white font-medium">{val}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* CTAs */}
          <div className="space-y-3 pt-2">
            <button onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-aether-600/80 border border-white/10 text-sm text-white font-semibold tracking-wide hover:bg-aether-500/80 hover:border-white/20 transition-all">
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/3 border border-white/5 text-sm text-slate-400 font-medium tracking-wide hover:bg-white/5 hover:text-white transition-all">
              <Calendar className="w-4 h-4" /> Book Private Viewing
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 pt-2">
            {[['🌍', 'Insured World Delivery'], ['✦', 'Lifetime Authenticity'], ['◈', 'VIP Concierge']].map(([icon, label]) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="text-cyan-400 text-xs">{icon}</span>
                <span className="text-[10px] text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Artisanal Excellence */}
      <div className="mt-20 border-t border-white/5 pt-16">
        <h2 className="font-serif text-3xl text-white mb-10">Artisanal Excellence</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
              <span className="text-cyan-400 text-lg">✦</span>
            </div>
            <h3 className="font-serif text-lg text-white">The Setting Architecture</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Our master jewelers utilize a signature 'invisible' setting technique, allowing each stone to maximize light refraction without visible prongs. This process requires over 120 hours of meticulous hand-setting per piece.
            </p>
          </div>
          <div className="glass-card p-6 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <span className="text-cyan-400 text-lg">◈</span>
            </div>
            <h3 className="font-serif text-lg text-white">Refraction-X</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Proprietary cut geometry ensuring maximum brilliance under any lighting condition, from ballroom gala to candlelit dinner.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
