import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  Calendar, 
  Hash, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Tag, 
  Clock,
  ChevronLeft,
  ChevronRight,
  Package,
  Truck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Switzerland',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: ''
  });

  const [errors, setErrors] = useState({});

  // Auth & Cart Protection
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        toast.error('Identity Verification Required: Please login to continue.', {
          icon: '🔒',
          style: { background: '#0B0F1A', color: '#fff', border: '1px solid #f43f5e' }
        });
        navigate('/login');
      } else if (cartItems.length === 0 && !success) {
        toast.error('Your selection is empty', {
          icon: '🛒',
          style: { background: '#0B0F1A', color: '#fff', border: '1px solid #22d3ee' }
        });
        navigate('/cart');
      }
    }
  }, [user, cartItems, success, navigate, authLoading]);

  // Pre-fill user data if available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
      case 'cardNumber':
        return value.replace(/\s/g, '').length === 16 ? '' : 'Invalid card number';
      case 'expiry':
        return /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value) ? '' : 'Invalid expiry (MM/YY)';
      case 'cvv':
        return /^[0-9]{3,4}$/.test(value) ? '' : 'Invalid CVV';
      case 'postalCode':
        return value.length >= 4 ? '' : 'Invalid postal code';
      default:
        return value.trim() ? '' : 'This field is required';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let val = value;
    
    // Formatting logic
    if (name === 'cardNumber') {
      val = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    }
    if (name === 'expiry') {
      val = value.replace(/\D/g, '').replace(/(.{2})/, '$1/').slice(0, 5);
    }
    if (name === 'cvv') {
      val = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData(prev => ({ ...prev, [name]: val }));
    
    // Validation
    const error = validateField(name, val);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'GLACIER10') {
      setIsPromoApplied(true);
      setDiscount(cartTotal * 0.1);
      toast.success('Promotional privilege applied: 10% reduction', {
        icon: '✦',
        style: { background: '#0B0F1A', color: '#fff', border: '1px solid #22d3ee' }
      });
    } else {
      toast.error('Invalid promotional sequence', {
        style: { background: '#0B0F1A', color: '#fff', border: '1px solid #f43f5e' }
      });
    }
  };

  const isFormValid = useMemo(() => {
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'postalCode', 'cardNumber', 'expiry', 'cvv', 'cardName'];
    const hasAllFields = requiredFields.every(field => formData[field].trim() !== '');
    const hasNoErrors = Object.values(errors).every(error => !error);
    return hasAllFields && hasNoErrors;
  }, [formData, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error('Please verify your acquisition details.');
      return;
    }

    setIsSubmitting(true);
    // Luxury simulation
    setTimeout(() => {
      const id = 'GLC-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      setOrderId(id);
      clearCart();
      setSuccess(true);
      setIsSubmitting(false);
      window.scrollTo(0, 0);
      toast.success('Acquisition Finalized Successfully', {
        icon: '✦',
        style: { background: '#0B0F1A', color: '#fff', border: '1px solid #22d3ee' }
      });
    }, 3000);
  };

  const tax = cartTotal * 0.12;
  const shipping = 0; // Complimentary for luxury
  const total = cartTotal + tax + shipping - discount;

  const estimatedDelivery = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }, []);

  if (success) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center px-4 bg-aether-800 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 hero-glow opacity-20 pointer-events-none" />
        <div className="absolute inset-0 hero-lines opacity-10 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-2xl"
        >
          <div className="glass-card p-8 md:p-16 text-center border-cyan-500/30 shadow-[0_0_100px_rgba(34,211,238,0.1)] rounded-[3rem]">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-cyan-500/20 shadow-[0_0_50px_rgba(34,211,238,0.2)]"
            >
              <CheckCircle className="w-12 h-12 text-cyan-500" />
            </motion.div>

            <span className="text-[10px] tracking-[0.6em] uppercase text-cyan-500 font-bold mb-4 block">Transaction Authorized</span>
            <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-8 tracking-widest uppercase">Acquisition Secured</h2>
            
            <div className="grid grid-cols-2 gap-8 mb-12 text-left bg-aether-700/50 p-8 rounded-2xl border border-glass-border">
              <div>
                <p className="text-[9px] text-text-muted uppercase tracking-widest font-bold mb-1">Order Identifier</p>
                <p className="text-sm font-serif text-cyan-500 font-bold tracking-wider">{orderId}</p>
              </div>
              <div>
                <p className="text-[9px] text-text-muted uppercase tracking-widest font-bold mb-1">Expected Concierge</p>
                <p className="text-sm font-serif text-text-primary font-bold tracking-wider">{estimatedDelivery}</p>
              </div>
            </div>

            <p className="text-text-secondary mb-12 leading-relaxed font-bold uppercase tracking-[0.2em] text-[10px] opacity-70">
              Your curated selection has been authenticated and secured. A digital certificate of ownership and concierge tracking details have been dispatched to your secure communication channel.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/shop" className="flex-1">
                <Button variant="primary" className="w-full py-5 tracking-[0.3em] uppercase text-xs font-bold shadow-2xl shadow-cyan-500/20">
                  Continue Curating
                </Button>
              </Link>
              <Link to="/profile/orders" className="flex-1">
                <Button variant="outline" className="w-full py-5 tracking-[0.3em] uppercase text-xs font-bold border-glass-border text-text-secondary hover:text-text-primary">
                  Track Delivery
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-7xl mx-auto overflow-x-hidden">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="mb-16 text-center lg:text-left"
      >
        <Link to="/cart" className="inline-flex items-center gap-2 text-text-muted hover:text-cyan-500 transition-colors mb-6 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold">Return to Selection</span>
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-cyan-500 font-bold mb-2 block">Secure Checkout</span>
            <h1 className="text-4xl md:text-5xl font-serif text-text-primary tracking-wide uppercase font-bold">Finalize Acquisition</h1>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-4 text-[10px] text-text-muted font-bold tracking-widest uppercase">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              AES-256 Encrypted
            </span>
            <span className="w-1 h-1 bg-glass-border rounded-full" />
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-500" />
              Secure Vault
            </span>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Side: Forms */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 space-y-12"
        >
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-12">
            
            {/* Section 1: Identity */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                  <User className="w-5 h-5 text-cyan-500" />
                </div>
                <h2 className="text-sm font-bold text-text-primary tracking-[0.3em] uppercase">Client Identification</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Full Legal Name" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleInputChange} 
                  placeholder="Alexandre Glacier" 
                  error={errors.fullName}
                  required 
                />
                <Input 
                  label="Email Correspondence" 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  placeholder="alex@glacier.luxe" 
                  error={errors.email}
                  required 
                />
              </div>
              <Input 
                label="Direct Communication (Phone)" 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleInputChange} 
                placeholder="+41 22 000 00 00" 
                error={errors.phone}
                required 
              />
            </section>

            {/* Section 2: Concierge Delivery */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                  <MapPin className="w-5 h-5 text-cyan-500" />
                </div>
                <h2 className="text-sm font-bold text-text-primary tracking-[0.3em] uppercase">Concierge Delivery</h2>
              </div>
              
              <Input 
                label="Physical Address" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange} 
                placeholder="Rue de la Paix 12, Level 4" 
                error={errors.address}
                required 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <Input 
                    label="City" 
                    name="city" 
                    value={formData.city} 
                    onChange={handleInputChange} 
                    placeholder="Geneve" 
                    error={errors.city}
                    required 
                  />
                </div>
                <div className="md:col-span-1">
                  <Input 
                    label="Postal Code" 
                    name="postalCode" 
                    value={formData.postalCode} 
                    onChange={handleInputChange} 
                    placeholder="1201" 
                    error={errors.postalCode}
                    required 
                  />
                </div>
                <div className="md:col-span-1">
                  <div className="space-y-2">
                    <label className="block text-[10px] tracking-[0.2em] uppercase font-bold text-text-muted">Country</label>
                    <div className="relative">
                      <select 
                        name="country" 
                        value={formData.country} 
                        onChange={handleInputChange}
                        className="glass-input appearance-none cursor-pointer pr-10"
                      >
                        <option value="Switzerland">Switzerland</option>
                        <option value="France">France</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Japan">Japan</option>
                      </select>
                      <Globe className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Secure Asset Transfer (Payment) */}
            <section className="glass-card p-8 md:p-10 border-cyan-500/20 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                <CreditCard className="w-48 h-48 text-cyan-500" />
              </div>
              
              <div className="flex items-center gap-4 mb-10 border-b border-glass-border pb-6">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                  <Lock className="w-5 h-5 text-cyan-500" />
                </div>
                <h2 className="text-sm font-bold text-text-primary tracking-[0.3em] uppercase">Secure Asset Transfer</h2>
              </div>
              
              <div className="space-y-8 relative z-10">
                <Input 
                  label="Card Number" 
                  name="cardNumber" 
                  value={formData.cardNumber} 
                  onChange={handleInputChange}
                  placeholder="0000 0000 0000 0000" 
                  icon={<Hash className="w-4 h-4" />}
                  error={errors.cardNumber}
                  required 
                />
                
                <div className="grid grid-cols-2 gap-8">
                  <Input 
                    label="Expiry Sequence" 
                    name="expiry" 
                    value={formData.expiry} 
                    onChange={handleInputChange}
                    placeholder="MM/YY" 
                    icon={<Calendar className="w-4 h-4" />}
                    error={errors.expiry}
                    required 
                  />
                  <Input 
                    label="Security CVV" 
                    name="cvv" 
                    value={formData.cvv} 
                    onChange={handleInputChange}
                    placeholder="000" 
                    type="password" 
                    icon={<ShieldCheck className="w-4 h-4" />}
                    error={errors.cvv}
                    required 
                  />
                </div>
                
                <Input 
                  label="Authorized Signature Name" 
                  name="cardName" 
                  value={formData.cardName} 
                  onChange={handleInputChange}
                  placeholder="ALEXANDRE GLACIER" 
                  icon={<User className="w-4 h-4" />}
                  error={errors.cardName}
                  required 
                />
              </div>

              <div className="mt-10 pt-8 border-t border-glass-border flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-5 bg-white/10 border border-white/20 rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
                    <div className="w-8 h-5 bg-white/10 border border-white/20 rounded flex items-center justify-center text-[8px] font-bold">M/C</div>
                    <div className="w-8 h-5 bg-white/10 border border-white/20 rounded flex items-center justify-center text-[8px] font-bold">AMEX</div>
                  </div>
                  <span className="text-[9px] text-text-muted font-bold tracking-widest uppercase">Global Network</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-500 font-bold uppercase tracking-[0.2em] text-[10px]">
                  <ShieldCheck className="w-4 h-4" />
                  GLACIER VAULT SECURED
                </div>
              </div>
            </section>
          </form>
        </motion.div>

        {/* Right Side: Sticky Summary */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5"
        >
          <div className="glass-card p-8 sticky top-28 border-glass-border shadow-2xl bg-aether-700/30">
            <h2 className="text-xl font-serif text-text-primary mb-8 border-b border-glass-border pb-4 tracking-widest uppercase font-bold">The Collection Order</h2>
            
            {/* Products List */}
            <div className="max-h-[320px] overflow-y-auto mb-10 pr-4 custom-scrollbar space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-6 group">
                  <div className="w-20 h-20 bg-aether-700 rounded-2xl p-3 border border-glass-border relative overflow-hidden flex-shrink-0">
                    <img 
                      src={item.images?.[0] || item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain z-10 relative grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-aether-900/20 to-transparent" />
                  </div>
                  <div className="flex-1 py-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-[11px] font-bold text-text-primary tracking-widest uppercase line-clamp-1">{item.name}</h3>
                      <span className="text-xs font-serif text-cyan-400 font-bold ml-4">${(item.price * item.qty).toLocaleString()}</span>
                    </div>
                    <p className="text-[9px] text-text-muted uppercase tracking-[0.2em] font-bold mb-3">{item.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] bg-glass-border/30 px-2 py-0.5 rounded text-text-secondary font-bold tracking-widest uppercase">Qty: {item.qty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code */}
            <div className="mb-10">
              <div className="relative group">
                <input 
                  type="text" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="PROMOTIONAL SEQUENCE" 
                  className={`w-full bg-aether-900/50 border border-glass-border rounded-xl pl-10 pr-24 py-4 text-[10px] uppercase font-bold tracking-[0.2em] placeholder:text-text-muted/30 focus:outline-none focus:border-cyan-500/50 transition-all ${isPromoApplied ? 'border-cyan-500/50' : ''}`}
                  disabled={isPromoApplied}
                />
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted/50" />
                <button 
                  onClick={applyPromoCode}
                  disabled={!promoCode || isPromoApplied}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-500 text-[9px] font-bold tracking-widest uppercase rounded-lg transition-colors disabled:opacity-30"
                >
                  {isPromoApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
              {isPromoApplied && (
                <p className="text-[9px] text-cyan-500 font-bold uppercase tracking-widest mt-2 ml-1">Privilege sequence GLACIER10 authenticated</p>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-5 border-t border-glass-border pt-8">
              <div className="flex justify-between text-[10px] font-bold tracking-[0.2em] uppercase text-text-muted">
                <span className="flex items-center gap-2"><Package className="w-3 h-3" /> Collective Value</span>
                <span className="text-text-primary">${cartTotal.toLocaleString()}</span>
              </div>
              {isPromoApplied && (
                <div className="flex justify-between text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-500">
                  <span className="flex items-center gap-2"><Tag className="w-3 h-3" /> Privilege Reduction</span>
                  <span>-${discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-[10px] font-bold tracking-[0.2em] uppercase text-text-muted">
                <span className="flex items-center gap-2"><ShieldCheck className="w-3 h-3" /> Insurance & Tax</span>
                <span className="text-text-primary">${tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold tracking-[0.2em] uppercase text-text-muted">
                <span className="flex items-center gap-2"><Truck className="w-3 h-3" /> Concierge Delivery</span>
                <span className="text-green-500 font-bold tracking-[0.3em]">Complimentary</span>
              </div>
              
              <div className="flex justify-between items-end pt-8 border-t border-glass-border mt-8">
                <div>
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.4em] block mb-2 opacity-60">Final Acquisition</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-serif text-text-primary font-bold tracking-tighter">${total.toLocaleString()}</span>
                    <span className="text-[10px] text-text-muted font-bold tracking-widest uppercase">USD</span>
                  </div>
                </div>
                <div className="pb-2">
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[8px] text-cyan-500/50 font-bold uppercase tracking-widest">Est. Concierge</span>
                    <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest flex items-center gap-2">
                      <Clock className="w-3 h-3" /> 72 Hours
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              form="checkout-form" 
              variant="primary" 
              disabled={!isFormValid || isSubmitting}
              className="w-full mt-10 py-6 text-[11px] font-bold tracking-[0.5em] uppercase group disabled:opacity-40 disabled:grayscale transition-all shadow-[0_20px_50px_rgba(34,211,238,0.2)] active:scale-[0.98] relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.span 
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-4"
                  >
                    <motion.span 
                      animate={{ rotate: 360 }} 
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }} 
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" 
                    />
                    Authenticating Asset Transfer
                  </motion.span>
                ) : (
                  <motion.span 
                    key="static"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-4"
                  >
                    Authorize Acquisition <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </motion.span>
                )}
              </AnimatePresence>
              
              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </Button>
            
            <p className="text-[9px] text-text-muted text-center mt-8 uppercase tracking-[0.4em] font-bold opacity-40 leading-relaxed">
              Acquisition processed via GLACIER SECURE VAULT.<br/>
              By authorizing, you agree to our terms of authenticity.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
