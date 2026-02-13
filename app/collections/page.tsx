"use client";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";

const collections = [
  {
    title: "V01D // RITUAL",
    description: "The foundation of our existence. Heavyweight essentials for the modern mystic.",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1200",
    slug: "void-ritual"
  },
  {
    title: "NEO-STITCH",
    description: "Technical utility meets occult aesthetics. Functional armor for urban environments.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200",
    slug: "neo-stitch"
  }
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <header className="mb-20">
          <h1 className="text-5xl font-black uppercase tracking-tighter">Collections</h1>
          <p className="text-gray-500 text-xs uppercase tracking-[0.5em] mt-2">Chapter by chapter, we define the void</p>
        </header>

        <div className="space-y-32">
          {collections.map((col, i) => (
            <motion.section 
              key={col.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-24 items-center`}
            >
              <div className="flex-1 aspect-[16/9] w-full overflow-hidden bg-accent">
                <img 
                  src={col.image} 
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
              <div className="flex-1 max-w-md">
                <h2 className="text-4xl font-bold uppercase tracking-tighter mb-6">{col.title}</h2>
                <p className="text-gray-400 leading-relaxed mb-8 uppercase text-xs tracking-widest font-light">
                  {col.description}
                </p>
                <Link href={`/shop?collection=${col.slug}`}>
                  <button className="px-10 py-4 border border-white/20 hover:bg-white hover:text-black transition-all text-[10px] font-bold uppercase tracking-widest">
                    Explore Chapter
                  </button>
                </Link>
              </div>
            </motion.section>
          ))}
        </div>
      </div>

      <footer className="py-20 border-t border-white/10 text-center text-[10px] uppercase tracking-[0.3em] text-gray-600">
        &copy; 2026 BLVCKMVGICK. All rights reserved. Designed for the abyss.
      </footer>
    </main>
  );
}
