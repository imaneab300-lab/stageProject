import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/ui/ProductCard';
import Button from '../../components/ui/Button';

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-6"
        >
          <Heart className="w-3.5 h-3.5 fill-cyan-500" />
          The Curated Vault
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-serif text-text-primary mb-6 italic"
        >
          Your Favorites
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-text-muted uppercase tracking-[0.2em] text-[11px] font-bold max-w-xl mx-auto opacity-60"
        >
          Explore the artifacts you've handpicked for your private collection. 
          Ready to be yours at a moment's notice.
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {wishlist.length > 0 ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
          >
            {wishlist.map((product, i) => (
              <div key={product.id} className="relative group/item">
                <ProductCard product={product} index={i} />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleWishlist(product)}
                  className="absolute -top-3 -right-3 z-40 bg-red-500 text-white p-2.5 rounded-xl shadow-2xl opacity-0 group-hover/item:opacity-100 transition-all hover:bg-red-600 border border-red-400/50"
                  title="Remove from vault"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-24 h-24 rounded-3xl bg-aether-700 border border-glass-border flex items-center justify-center mb-8 shadow-2xl">
              <Heart className="w-10 h-10 text-text-muted opacity-20" />
            </div>
            <h2 className="text-2xl font-serif text-text-primary mb-4 uppercase tracking-widest">
              Your wishlist is empty
            </h2>
            <p className="text-text-muted text-[13px] uppercase tracking-[0.2em] font-bold mb-12 opacity-50">
              Start exploring our collection to find pieces that resonate.
            </p>
            <Link to="/shop">
              <Button variant="primary" className="px-12 py-5">
                Explore Collection
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recommended Section (Optional but premium touch) */}
      {wishlist.length > 0 && (
        <div className="mt-32 pt-20 border-t border-glass-border">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-xl font-serif text-text-primary uppercase tracking-[0.1em]">Complementary Artifacts</h3>
            <Link to="/shop" className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.3em] flex items-center gap-2 hover:gap-4 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {/* We could show some products here, for now just a placeholder of intent */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 opacity-40 grayscale pointer-events-none">
             {/* Placeholders if needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
