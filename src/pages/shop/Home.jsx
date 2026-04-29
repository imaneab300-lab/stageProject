import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import ProductCard from '../../components/product/ProductCard';
import Spinner from '../../components/ui/Spinner';
import Button from '../../components/ui/Button';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get('/products?limit=4'); 
        setFeaturedProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden bg-dark-900 py-24 sm:py-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-800/80 to-transparent z-10" />
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80" alt="Hero background" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="container relative z-20 mx-auto px-4 max-w-7xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Elevate Your Style. <br />
            <span className="text-primary">Discover Luxe.</span>
          </h1>
          <p className="max-w-xl text-lg md:text-xl text-slate-300 mb-10">
            Experience premium quality with our exclusive collection of handpicked goods. Redefining modern elegance.
          </p>
          <div className="flex gap-4">
            <Link to="/shop">
              <Button variant="primary" className="text-lg px-8 py-3">Shop Now</Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary" className="text-lg px-8 py-3">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-900 container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-end mb-12 border-b border-dark-700 pb-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Featured Collection</h2>
            <p className="text-slate-400">Our currently trending premium items.</p>
          </div>
          <Link to="/shop" className="text-primary hover:text-primary-light font-medium transition-colors hidden sm:block">
            View All Products &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20 min-h-[300px]">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <div className="mt-8 text-center sm:hidden">
          <Link to="/shop">
            <Button variant="secondary" className="w-full">View All Products</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
