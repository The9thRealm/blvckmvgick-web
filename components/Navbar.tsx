"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Search, Menu, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-void/90 backdrop-blur-xl px-6 py-5">
      <div className="max-w-[1800px] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link href="/" className="group flex flex-col">
            <span className="text-xl font-black tracking-[0.4em] uppercase group-hover:text-crimson transition-colors duration-700">
              BLVCK
            </span>
            <span className="text-[10px] font-bold tracking-[0.8em] uppercase text-white/20 -mt-1 group-hover:text-white transition-colors duration-700">
              MVGICK
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-10 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            <Link href="/collections" className="hover:text-white transition-colors">Collections</Link>
            <Link href="/shop" className="hover:text-white transition-colors">Archive</Link>
            <Link href="/oracle" className="hover:text-crimson transition-colors text-crimson/60 animate-pulse-slow">The Oracle</Link>
            <Link href="https://ninjaloc.com" target="_blank" className="hover:text-white transition-colors flex items-center gap-2 border-l border-white/10 pl-10">
              NinjaLOC <ExternalLink size={10} />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-8 text-white/60">
          <button className="hover:text-white transition-colors"><Search size={18} /></button>
          <Link href="/cart" className="hover:text-white transition-colors relative">
            <ShoppingBag size={18} />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-crimson text-white text-[8px] flex items-center justify-center rounded-full font-bold">0</span>
          </Link>
          <button className="lg:hidden hover:text-white transition-colors"><Menu size={20} /></button>
        </div>
      </div>
    </nav>
  );
}