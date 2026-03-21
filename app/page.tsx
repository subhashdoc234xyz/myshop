"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight, Star, Menu } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from our Backend API
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-800 selection:bg-primary-200">
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent"
          >
            myshop.
          </motion.div>
          <div className="flex gap-6 items-center">
            <button className="hidden md:block text-gray-600 hover:text-primary-600 transition-colors">Shop</button>
            <button className="hidden md:block text-gray-600 hover:text-primary-600 transition-colors">About</button>
            <button className="relative p-2 hover:bg-primary-50 rounded-full transition-colors">
              <ShoppingBag className="w-6 h-6 text-gray-800" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-primary-600 rounded-full border-2 border-white"></span>
            </button>
            <button className="md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm">New Collection</span>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mt-4 mb-6">
              Elegance in <br />
              <span className="text-primary-600">Every Detail</span>
            </h1>
            <p className="text-lg text-gray-500 mb-8 max-w-md">
              Discover our exclusive collection of premium items designed to elevate your lifestyle with a touch of purple.
            </p>
            <button className="bg-primary-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 flex items-center gap-2 group">
              Shop Now 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-96 bg-primary-50 rounded-3xl flex items-center justify-center overflow-hidden border border-primary-100"
          >
             <div className="absolute w-64 h-64 bg-primary-200 rounded-full blur-3xl opacity-50 -top-10 -right-10"></div>
             <div className="text-primary-300 font-bold text-9xl opacity-20 rotate-12 select-none">SALE</div>
             <img 
               src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80" 
               alt="Hero" 
               className="relative z-10 w-full h-full object-cover rounded-3xl mix-blend-multiply opacity-80"
             />
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Latest Arrivals</h2>
            <div className="w-20 h-1 bg-primary-400 mx-auto rounded-full"></div>
          </motion.div>
          
          {loading ? (
            <div className="text-center text-primary-500 animate-pulse">Loading products from database...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl hover:shadow-primary-100 transition-all duration-300 border border-gray-100 group"
                >
                  <div className="h-64 bg-gray-100 rounded-xl mb-4 overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> 5.0
                    </div>
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
                    <span className="text-primary-600 font-bold text-lg">${product.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <button className="w-full py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-primary-600 transition-colors">
                    Add to Cart
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm">
          <p>&copy; 2024 myshop. Built with Next.js & Neon SQL.</p>
        </div>
      </footer>
    </main>
  );
}