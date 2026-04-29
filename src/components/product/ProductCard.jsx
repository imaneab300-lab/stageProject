import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import Button from '../ui/Button';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card group flex flex-col justify-between h-full hover:-translate-y-1 transition-transform duration-300">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-white p-6">
        <img 
          src={product.image} 
          alt={product.title} 
          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300" 
        />
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="mb-3">
          <h3 className="text-slate-200 font-semibold text-lg line-clamp-2 hover:text-primary transition-colors">{product.title}</h3>
        </Link>
        <p className="text-slate-400 text-sm mb-4 capitalize">{product.category}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-primary">${product.price?.toFixed(2)}</span>
          <Button variant="primary" onClick={() => addToCart(product)} className="!px-3 !py-2 shadow-none" aria-label="Add to cart">
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
