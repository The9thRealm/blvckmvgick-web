"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "oracle";
  content: string;
}

export default function OraclePage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "oracle", content: "I am the weaver of the void. What knowledge do you seek regarding the manifestations of BLVCKMVGICK?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history: messages }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "oracle", content: data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "oracle", content: "The connection to the abyss is unstable. Try again soon." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 pt-32 pb-40 flex flex-col">
        <header className="text-center mb-12">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block p-4 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <Sparkles size={24} className="text-white/40" />
          </motion.div>
          <h1 className="text-2xl font-black uppercase tracking-[0.5em]">The Oracle</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">AI CURATOR // VOID LOGIC v1.0</p>
        </header>

        <div 
          ref={scrollRef}
          className="flex-1 space-y-8 overflow-y-auto no-scrollbar pb-12"
        >
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] p-6 rounded-sm text-sm leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-white/5 border border-white/10 text-white" 
                    : "bg-transparent text-gray-400 italic font-light"
                }`}>
                  {msg.role === "oracle" && <span className="block text-[8px] uppercase font-bold tracking-[0.3em] mb-2 text-white/20">Oracle Response</span>}
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <div className="flex justify-start">
              <Loader2 size={16} className="animate-spin text-gray-600" />
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-black via-black to-transparent pt-20 pb-12 px-6">
        <div className="max-w-3xl mx-auto relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Speak to the void..."
            className="w-full bg-white/5 border border-white/10 p-5 pr-16 text-sm focus:border-white/40 outline-none transition-all placeholder:text-gray-700 uppercase tracking-widest"
          />
          <button 
            onClick={handleSend}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:text-white text-gray-500 transition"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </main>
  );
}
