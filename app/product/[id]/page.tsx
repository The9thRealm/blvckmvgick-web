"use client";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { ChevronRight, Info, Ghost } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id;
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState("L");
  const [isAdding, setIsAdding] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-void text-bone">
        <h1 className="text-xl font-bold uppercase tracking-widest">Relic Not Found</h1>
      </div>
    );
  }

  const handleAcquire = () => {
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1500);
  };

  return (
    <main className="min-h-screen bg-void selection:bg-crimson selection:text-white">
      <Navbar />
      
      <div className="max-w-[1800px] mx-auto px-6 pt-32 pb-24">
        <div className="flex items-center gap-4 text-[9px] font-mono uppercase tracking-[0.4em] text-white/20 mb-16">
          <Link href="/" className="hover:text-white transition-colors">Manifest</Link> 
          <ChevronRight size={10} /> 
          <Link href="/shop" className="hover:text-white transition-colors">Archive</Link> 
          <ChevronRight size={10} /> 
          <span className="text-crimson/60">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Cinematic Image Gallery */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[3/4] bg-shadow/40 horror-border overflow-hidden relative group"
          >
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] scale-105"
            />
            <div className="absolute inset-0 bg-void/20" />
          </motion.div>

          {/* Product Dossier */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col space-y-12"
          >
            <div className="space-y-4">
              <span className="text-xs font-mono text-crimson uppercase tracking-[0.5em] italic">
                Sequence RELIC-{product.id}
              </span>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                {product.name}
              </h1>
              <p className="text-3xl font-light text-white/40 font-mono">${product.price}</p>
            </div>

            <div className="prose prose-invert border-l border-white/10 pl-8">
              <p className="text-white/60 leading-relaxed text-lg italic">
                "{product.description}"
              </p>
            </div>

            {/* Size Selection */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold font-mono uppercase tracking-[0.3em] text-white/40">Select Tier</span>
                <button className="text-[9px] uppercase tracking-widest text-white/20 flex items-center gap-2 hover:text-white transition-colors">
                  <Info size={12} /> Dimension Guide
                </button>
              </div>
              <div className="flex gap-4">
                {["S", "M", "L", "XL"].map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 flex items-center justify-center text-xs font-mono font-bold border transition-all duration-500 ${
                      selectedSize === size 
                        ? "bg-bone text-void border-bone" 
                        : "border-white/10 text-white/40 hover:border-crimson hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleAcquire}
              disabled={isAdding}
              className={`w-full py-6 text-[10px] font-black uppercase tracking-[0.5em] transition-all duration-700 flex items-center justify-center gap-4 relative overflow-hidden group ${
                isAdding ? "bg-crimson text-white" : "bg-white text-void hover:bg-crimson hover:text-white"
              }`}
            >
              <span className="relative z-10">
                {isAdding ? "RESERVING..." : "Acquire Relic"}
              </span>
              {!isAdding && <Ghost size={16} className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity" />}
            </button>

            <div className="pt-12 border-t border-white/5 space-y-8">
               <div className="flex items-center gap-4 group cursor-help">
                  <div className="w-2 h-2 bg-crimson animate-pulse rounded-full" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 group-hover:text-white transition-colors">
                    Fulfillment Status: Operational
                  </span>
               </div>
               <p className="text-[10px] font-mono leading-loose text-white/20 uppercase tracking-widest">
                 Designed for the Abyss. Ships globally from redacted locations. <br />
                 All transactions are final. No return from the void.
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}