import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import Button from '../../components/ui/Button';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-slate-200">Your cart is empty</h2>
        <p className="text-slate-400 mb-8 text-center max-w-md">Looks like you haven't added anything to your cart yet. Discover our premium collection and find something you love.</p>
        <Link to="/">
          <Button variant="primary">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-100">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-dark-800 rounded-2xl border border-dark-700 overflow-hidden">
            <div className="divide-y divide-dark-700">
              {cart.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-center">
                  <div className="w-24 h-24 bg-white rounded-lg p-2 flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  
                  <div className="flex-1 flex flex-col w-full">
                    <div className="flex justify-between items-start mb-2">
                      <Link to={`/product/${item.id}`} className="hover:text-primary transition-colors">
                        <h3 className="font-semibold text-slate-200 line-clamp-2">{item.title}</h3>
                      </Link>
                      <span className="font-bold text-primary ml-4">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-4">
                      <div className="flex items-center gap-3 bg-dark-900 border border-dark-700 rounded-lg p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 hover:text-primary disabled:opacity-50 text-slate-400"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium text-slate-200">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-primary text-slate-400"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-500 hover:text-red-500 transition-colors flex items-center gap-1 text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" onClick={clearCart} className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
              Clear Cart
            </Button>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-dark-800 rounded-2xl border border-dark-700 p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6 text-slate-100">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Estimated Tax (10%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Shipping</span>
                <span className="text-green-500 font-medium">Free</span>
              </div>
              
              <div className="border-t border-dark-700 pt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-slate-100">Total</span>
                <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Link to="/checkout" className="block w-full">
              <Button variant="primary" className="w-full text-lg py-3">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
