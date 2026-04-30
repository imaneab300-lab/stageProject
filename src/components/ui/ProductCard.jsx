import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useProtectedCartAction } from '../../hooks/useProtectedCartAction';

const badgeColors = {
  NEW:       'bg-cyan-500/90',
  LIMITED:   'bg-purple-500/90',
  EXCLUSIVE: 'bg-amber-500/90',
};

const ProductCard = ({ product, index = 0 }) => {
  const { protectedAddToCart } = useProtectedCartAction();
  // Support both shapes: product.images[] and product.image
  const imgSrc = product.images?.[0] || product.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card group cursor-pointer flex-shrink-0 w-[260px] md:w-auto"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/5] bg-aether-800">
        <Link to={`/product/${product.id}`}>
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop&q=80';
            }}
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-4 left-4 ${badgeColors[product.badge] || 'bg-slate-500'} text-[9px] tracking-[0.2em] uppercase font-bold text-white px-2.5 py-1 rounded-sm shadow-xl z-10`}>
            {product.badge}
          </span>
        )}

        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-aether-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => protectedAddToCart(product)}
            className="bg-cyan-500 text-white p-3.5 rounded-full shadow-2xl hover:bg-cyan-400 transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product.id}`} className="flex-1 min-w-0 pr-4">
            <h3 className="text-sm font-bold text-text-primary tracking-wide hover:text-cyan-500 transition-colors uppercase truncate">
              {product.name}
            </h3>
          </Link>
          <span className="text-cyan-500 font-bold text-sm tracking-tight flex-shrink-0">
            ${product.price.toLocaleString()}
          </span>
        </div>
        <p className="text-[10px] text-text-muted leading-relaxed line-clamp-2 uppercase tracking-widest font-bold opacity-80">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-glass-border">
          <span className="text-[9px] font-bold text-text-muted uppercase tracking-[0.2em]">
            {product.category}
          </span>
          {product.originalPrice && (
            <span className="text-text-muted text-[10px] line-through opacity-40">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
