"use client";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import { Eye, Ghost, Terminal } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-crimson selection:text-white">
      <Navbar />
      
      {/* Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-void">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 3 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover grayscale"
            alt="The Void background"
          />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="space-y-4"
          >
            <span className="text-crimson font-mono text-[10px] tracking-[0.8em] uppercase">
              Underground Utility
            </span>
            <h1 className="text-[15vw] md:text-[10vw] font-black leading-none tracking-tight text-bone uppercase flex flex-col items-center">
              <span className="text-white">BLVCK</span>
              <span className="text-outline">MVGICK</span>
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="mt-12 flex flex-col md:flex-row items-center justify-center gap-12"
          >
            <Link href="/shop">
              <button className="px-16 py-5 bg-bone text-void text-[10px] font-black uppercase tracking-[0.4em] hover:bg-crimson hover:text-white transition-all duration-700">
                Explore the Void
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Ambient bottom gradient */}
        <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-void to-transparent z-10" />
      </section>

      {/* Rarity Section */}
      <section className="max-w-[1800px] mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center border-b border-white/5">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
            Woven in the <br />
            <span className="text-crimson">Shadows</span>
          </h2>
          <p className="text-white/40 text-lg font-light leading-relaxed max-w-xl italic">
            "Each piece is a relic of the underground. Limited runs, technical precision, and absolute darkness. We don't make clothes; we manufacture armor for the manifest."
          </p>
          <div className="flex gap-12 pt-8">
            <div className="space-y-2">
              <span className="block text-2xl font-black font-mono">001</span>
              <span className="text-[10px] text-white/20 uppercase tracking-[0.3em]">Drop Sequence</span>
            </div>
            <div className="space-y-2">
              <span className="block text-2xl font-black font-mono text-crimson">LIM</span>
              <span className="text-[10px] text-white/20 uppercase tracking-[0.3em]">Quantity Index</span>
            </div>
          </div>
        </div>
        <div className="aspect-square bg-white/5 horror-border flex items-center justify-center relative group">
           <Ghost size={120} className="text-white/5 group-hover:text-crimson/20 transition-colors duration-1000" />
           <div className="absolute inset-0 border border-crimson/0 group-hover:border-crimson/20 m-12 transition-all duration-1000" />
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-[1800px] mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-20">
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-crimson" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.5em] text-white/30 italic">Available Relics</h3>
          </div>
          <Link href="/shop" className="text-[10px] uppercase tracking-[0.4em] text-bone/40 hover:text-crimson transition-colors border-b border-white/5 pb-2">View Archive</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1px bg-white/5 border border-white/5">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* The Oracle - Specialized Section */}
      <section className="bg-shadow/40 py-40 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10 space-y-12">
          <Terminal size={40} className="mx-auto text-crimson animate-pulse-slow" />
          <div className="space-y-4">
            <h2 className="text-[10px] font-mono font-bold uppercase tracking-[0.8em] text-white/20">The AI Curator</h2>
            <p className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[1.1]">
              Consult the Oracle for <br />your next manifestation.
            </p>
          </div>
          <Link href="/oracle">
            <button className="px-12 py-4 bg-transparent border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-void transition-all duration-500">
              Initiate Link
            </button>
          </Link>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-crimson)_0%,transparent_100%)] opacity-[0.03]" />
      </section>

      {/* Unified Brand Footer */}
      <footer className="py-32 px-6 border-t border-white/5 bg-void">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-24">
          <div className="space-y-8">
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-[0.4em] uppercase">BLVCK</span>
              <span className="text-xs font-bold tracking-[0.8em] uppercase text-white/20 -mt-1">MVGICK</span>
            </div>
            <p className="text-[10px] leading-relaxed text-white/30 uppercase tracking-widest">
              High-End Underground Utility. <br />Designed for those who walk the abyss.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
            <div className="space-y-4 flex flex-col">
              <span className="text-white/60 mb-2 font-bold">Protocol</span>
              <Link href="/shop" className="hover:text-crimson transition-colors">Catalog</Link>
              <Link href="/collections" className="hover:text-crimson transition-colors">Drops</Link>
              <Link href="/oracle" className="hover:text-crimson transition-colors">Oracle</Link>
            </div>
            <div className="space-y-4 flex flex-col">
              <span className="text-white/60 mb-2 font-bold">Social</span>
              <Link href="#" target="_blank" className="hover:text-crimson transition-colors">Instagram</Link>
              <Link href="#" target="_blank" className="hover:text-crimson transition-colors">X / Twitter</Link>
            </div>
          </div>

          <div className="text-right space-y-4">
             <div className="flex justify-end gap-2 text-crimson opacity-20">
                <Eye size={20} />
                <Eye size={20} />
             </div>
             <p className="text-[9px] uppercase tracking-[0.5em] text-white/10 italic">
               &copy; 2026 BLVCKMVGICK SYNDICATE
             </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
