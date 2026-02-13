"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Zap, Loader2, CheckCircle } from "lucide-react";

export default function AdminPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const generateDrop = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/generate-drop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-mono">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Command Center</h1>
          <p className="text-gray-500 text-xs tracking-widest uppercase">Autonomous Fashion Engine v1.0</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Controls */}
          <div className="md:col-span-2 space-y-8">
            <section className="p-8 border border-white/10 bg-white/5 rounded-sm">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <Zap size={16} className="text-yellow-500" /> Initiate New Drop
              </h2>
              <div className="space-y-4">
                <label className="block text-[10px] text-gray-500 uppercase tracking-widest">Design Prompt</label>
                <input 
                  type="text" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. CYBERPUNK GOTHIC RAVEN"
                  className="w-full bg-black border border-white/20 p-4 text-sm focus:border-white outline-none transition"
                />
                <button 
                  onClick={generateDrop}
                  disabled={loading || !prompt}
                  className="w-full bg-white text-black py-4 text-xs font-black uppercase tracking-[0.3em] hover:bg-gray-200 disabled:opacity-50 flex justify-center items-center gap-3"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : "Execute Generation"}
                </button>
              </div>
            </section>

            {result && (
              <motion.section 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 border border-green-500/30 bg-green-500/5 rounded-sm"
              >
                <div className="flex items-center gap-3 text-green-500 mb-4">
                  <CheckCircle size={20} />
                  <span className="text-xs font-bold uppercase tracking-widest">Drop Successful</span>
                </div>
                <p className="text-sm text-gray-300">
                  Product <span className="text-white font-bold">"{result.product?.name}"</span> has been generated and synced to Printful and your store.
                </p>
              </motion.section>
            )}
          </div>

          {/* Status Sidebar */}
          <div className="space-y-6">
            <div className="p-6 border border-white/10 rounded-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">System Status</h3>
              <ul className="space-y-3 text-[10px] uppercase tracking-tighter">
                <li className="flex justify-between"><span>Vertex AI</span> <span className="text-green-500">Online</span></li>
                <li className="flex justify-between"><span>Printful API</span> <span className="text-green-500">Online</span></li>
                <li className="flex justify-between"><span>Firestore</span> <span className="text-green-500">Online</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
