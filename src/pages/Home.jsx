import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import DomainCard from '../components/ui/DomainCard';
import products from '../data/products';
import domains from '../data/domains';

/* ─── Fade-in wrapper ─── */
const FadeIn = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-aether-900 via-aether-800 to-aether-800" />
        <div className="absolute inset-0 hero-lines" />
        <div className="absolute inset-0 hero-glow" />

        {/* Decorative top gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight tracking-wide"
          >
            THE ART OF{' '}
            <span className="italic text-cyan-400">REFINED</span>{' '}
            LIVING
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 md:mt-8 text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed tracking-wide"
          >
            Curating an exclusive selection of timeless pieces for the discerning collector.
            <br className="hidden sm:block" />
            Experience craftsmanship that transcends eras.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="primary">Explore Collection</Button>
            <Button variant="outline">The Bespoke Journey</Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator">
          <span className="text-[10px] tracking-[0.25em] uppercase text-slate-500">Scroll</span>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </div>

        {/* Bottom shadow ellipse */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[60px] bg-gradient-to-t from-aether-800 to-transparent rounded-[50%] blur-sm" />
      </section>

      {/* ═══════════════ DOMAINS SECTION ═══════════════ */}
      <section className="py-20 md:py-28 px-4 max-w-7xl mx-auto">
        <FadeIn className="text-center mb-14">
          <h2 className="section-title tracking-[0.15em] uppercase">
            Our Domains
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {domains.map((domain, i) => (
            <DomainCard key={domain.id} domain={domain} index={i} />
          ))}
        </div>
      </section>

      {/* ═══════════════ PRODUCTS SECTION ═══════════════ */}
      <section className="py-20 md:py-28 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <FadeIn>
            <h2 className="section-title tracking-[0.08em] uppercase">
              Seasonal Highlights
            </h2>
            <p className="mt-3 text-sm text-slate-500 max-w-md">
              Handpicked masterpieces from our latest arrivals
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              to="/vault"
              className="text-cyan-400 text-[11px] tracking-[0.15em] uppercase font-medium hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              View All Products <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </FadeIn>
        </div>

        {/* Product grid — horizontal scroll on mobile, grid on desktop */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {products.slice(0, 4).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ═══════════════ TAILORED SECTION ═══════════════ */}
      <section className="py-20 md:py-28 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight tracking-wide uppercase">
              Tailored to<br />
              <span className="italic text-cyan-400">Perfection</span>
            </h2>
            <p className="mt-6 text-sm text-slate-400 leading-relaxed max-w-lg">
              Our Bespoke service offers an unparalleled journey into personalized luxury.
              From selecting the rarest materials to the final masterstrokes of our artisans,
              your vision becomes reality.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                'Private Consultation',
                'Rare Material Sourcing',
                'Global Concierge Delivery',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-sm text-slate-300 tracking-wide uppercase">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                to="/vault"
                className="text-cyan-400 text-[11px] tracking-[0.15em] uppercase font-semibold hover:text-cyan-300 transition-colors flex items-center gap-2"
              >
                Start Your Journey <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>

          {/* Right — Images */}
          <FadeIn delay={0.2} className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=530&fit=crop&q=80"
                  alt="Bespoke tailoring"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&h=400&fit=crop&q=80"
                  alt="Craftsmanship detail"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="pt-8 space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop&q=80"
                  alt="Material selection"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=530&fit=crop&q=80"
                  alt="Luxury atelier"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Home;
