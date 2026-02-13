"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const collections = [
  {
    id: "001",
    title: "Shadow Protocol",
    season: "SS26",
    description: "Utilitarian armor for the urban phantom.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "002",
    title: "Voidwalker",
    season: "FW25",
    description: "Heavyweight fabrics woven from the abyss.",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=1000"
  }
];

export default function Collections() {
  return (
    <main className="min-h-screen bg-void">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-[1800px] mx-auto">
        <h1 className="text-[10vw] font-black uppercase leading-none tracking-tighter text-white/5 mb-24 select-none">
          Archives
        </h1>

        <div className="space-y-32">
          {collections.map((col, idx) => (
            <motion.div 
              key={col.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="flex-1 w-full aspect-[4/5] relative overflow-hidden group">
                <div className="absolute inset-0 bg-crimson/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                <img 
                  src={col.image} 
                  alt={col.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] scale-100 group-hover:scale-110"
                />
                
                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <span className="text-[10px] font-mono tracking-[0.5em] uppercase bg-black/50 backdrop-blur-md px-4 py-2 text-white">
                    Look {col.id}
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-8 p-8">
                <div className="space-y-2">
                  <span className="text-crimson font-mono text-xs tracking-[0.5em] uppercase">
                    Sequence {col.id}
                  </span>
                  <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tight text-white/90">
                    {col.title}
                  </h2>
                </div>
                <div className="w-24 h-px bg-white/20" />
                <div className="space-y-4 max-w-md">
                  <p className="text-xl font-light text-white/60">
                    {col.description}
                  </p>
                  <p className="text-xs font-mono uppercase tracking-widest text-white/30">
                    Season: {col.season} // Status: Archived
                  </p>
                </div>
                <Link href="/shop">
                  <button className="px-12 py-4 border border-white/10 hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-[0.3em] text-[10px] font-bold cursor-pointer">
                    View Drop
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}