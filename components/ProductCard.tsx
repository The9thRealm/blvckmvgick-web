"use client";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`}>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="group cursor-pointer horror-border bg-void/40"
      >
        <div className="relative aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
          <img 
            src={product.image} 
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-[2s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-void/40 group-hover:bg-void/0 transition-colors duration-700" />
          
          <div className="absolute bottom-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <button className="w-full bg-bone text-void text-[10px] font-black py-4 uppercase tracking-[0.3em] hover:bg-crimson hover:text-white transition-colors">
              Acquire
            </button>
          </div>
        </div>
        
        <div className="p-6 flex justify-between items-end border-t border-white/5">
          <div className="space-y-1">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase group-hover:text-crimson transition-colors">
              {product.name}
            </h3>
            <p className="text-[9px] text-white/30 uppercase tracking-[0.4em] font-mono">
              {product.category}
            </p>
          </div>
          <p className="text-xs font-mono text-white/60 group-hover:text-white transition-colors">
            ${product.price}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}