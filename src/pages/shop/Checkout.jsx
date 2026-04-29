import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cart, subtotal, clearCart } = useCart();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      clearCart();
      setSuccess(true);
    }, 1500); // Simulate network request
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-slate-100">Order Confirmed!</h2>
        <p className="text-slate-400 mb-8 text-center max-w-md">Thank you for your purchase. We've sent a confirmation email with your order details.</p>
        <Link to="/">
          <Button variant="primary">Return to Shop</Button>
        </Link>
      </div>
    );
  }

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-100">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6 bg-dark-800 p-8 rounded-2xl border border-dark-700">
            <h2 className="text-xl font-semibold text-slate-200 border-b border-dark-700 pb-4 mb-4">Shipping Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="First Name" required />
              <Input label="Last Name" required />
            </div>
            <Input label="Email Address" type="email" required />
            <Input label="Phone Number" type="tel" required />
            <Input label="Shipping Address" required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="City" required />
              <Input label="Zip Code" required />
            </div>

            <h2 className="text-xl font-semibold text-slate-200 border-b border-dark-700 pb-4 mb-4 mt-8">Payment Method</h2>
            <div className="space-y-4">
              <Input label="Card Number" placeholder="**** **** **** ****" required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiry Date" placeholder="MM/YY" required />
                <Input label="CVV" placeholder="***" type="password" required />
              </div>
              <Input label="Name on Card" required />
            </div>
          </form>
        </div>

        <div>
          <div className="bg-dark-800 rounded-2xl border border-dark-700 p-8 sticky top-24">
            <h2 className="text-xl font-semibold text-slate-200 mb-6 border-b border-dark-700 pb-4">Order Summary</h2>
            
            <div className="max-h-[400px] overflow-y-auto mb-6 pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center mb-4 text-sm">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.title} className="w-12 h-12 bg-white rounded object-contain p-1" />
                    <div>
                      <p className="font-semibold text-slate-200 line-clamp-1">{item.title}</p>
                      <p className="text-slate-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-medium text-slate-200">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-dark-700 pt-6">
              <div className="flex justify-between text-slate-300"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-slate-300"><span>Taxes</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between text-slate-300"><span>Shipping</span><span className="text-green-500">Free</span></div>
              
              <div className="flex justify-between text-xl font-bold text-slate-100 border-t border-dark-700 pt-4">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button type="submit" form="checkout-form" variant="primary" className="w-full mt-8 py-4 text-lg">
              Confirm & Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
