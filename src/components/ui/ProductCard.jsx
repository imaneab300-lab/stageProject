import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const ProductCard = ({ product, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card group cursor-pointer flex-shrink-0 w-[260px] md:w-auto"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square bg-aether-700/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-cyan-500/90 text-[9px] tracking-[0.15em] uppercase font-semibold text-white px-2.5 py-1 rounded-full backdrop-blur-sm">
            {product.badge}
          </span>
        )}
        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-aether-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white text-aether-900 p-3 rounded-full shadow-lg"
          >
            <ShoppingBag className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-medium text-slate-200 tracking-wide">
          {product.name}
        </h3>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-cyan-400 font-semibold text-sm tracking-wide">
            ${product.price.toLocaleString()}
          </span>
          <button className="text-slate-500 hover:text-cyan-400 transition-colors">
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
