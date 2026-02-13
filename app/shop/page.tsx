"use client";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { motion } from "framer-motion";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <header className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-black uppercase tracking-tighter"
          >
            All Manifestations
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-xs uppercase tracking-[0.5em] mt-2"
          >
            Browsing the complete collection
          </motion.p>
        </header>

        {/* Filters placeholder */}
        <div className="flex gap-8 mb-12 overflow-x-auto pb-4 no-scrollbar border-b border-white/5">
          {["All", "Hoodies", "T-Shirts", "Accessories", "Bottoms"].map((cat) => (
            <button key={cat} className="text-[10px] uppercase tracking-widest font-bold whitespace-nowrap hover:text-white text-gray-500 transition">
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <footer className="py-20 border-t border-white/10 text-center text-[10px] uppercase tracking-[0.3em] text-gray-600">
        &copy; 2026 BLVCKMVGICK. All rights reserved. Designed for the abyss.
      </footer>
    </main>
  );
}
