"use client";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 pt-40 pb-24">
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-32"
        >
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8">BLVCK<br/>MVGICK</h1>
          <p className="text-xs uppercase tracking-[1em] text-gray-500">Established 2026 // The Void Collective</p>
        </motion.section>

        <section className="space-y-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-invert max-w-none"
          >
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-6">Our Philosophy</h2>
            <p className="text-gray-400 leading-loose text-sm uppercase tracking-wider">
              BLVCKMVGICK is not just a brand; it is a manifestation of the unseen. We believe that clothing should serve as both armor and expression. Every piece is designed with the intention of blending minimalist dark aesthetics with functional utility.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-invert max-w-none"
          >
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-6">Autonomous Design</h2>
            <p className="text-gray-400 leading-loose text-sm uppercase tracking-wider">
              We leverage advanced AI "Oracle" systems to generate unique designs that resonate with the collective unconscious. This allows us to create limited runs that are truly unique to the moment of their conception.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10"
          >
            {[
              { label: "Design", value: "Oracle AI" },
              { label: "Fabric", value: "Premium" },
              { label: "Origin", value: "The Void" },
              { label: "Status", value: "Active" }
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-xs font-bold uppercase tracking-widest">{stat.value}</p>
              </div>
            ))}
          </motion.div>
        </section>
      </div>

      <footer className="py-20 border-t border-white/10 text-center text-[10px] uppercase tracking-[0.3em] text-gray-600">
        &copy; 2026 BLVCKMVGICK. All rights reserved. Designed for the abyss.
      </footer>
    </main>
  );
}
