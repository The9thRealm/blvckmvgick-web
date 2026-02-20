"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, Cpu } from "lucide-react";

interface Message {
  id: number;
  role: "system" | "oracle" | "user";
  text: string;
}

export default function Oracle() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "system", text: "CONNECTION ESTABLISHED. PROTOCOL: LUXURY_VOID_V1" },
    { id: 2, role: "oracle", text: "I am the Oracle. I curate the shadows. Tell me what you seek, or how you wish to be perceived in the darkness." }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now(), role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    try {
      const response = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: input,
          history: messages
            .filter(m => m.role !== "system")
            .map(m => ({
              role: m.role === "oracle" ? "model" : "user",
              parts: [{ text: m.text }]
            }))
        }),
      });

      const data = await response.json();
      
      if (data.error) throw new Error(data.error);

      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        role: "oracle", 
        text: data.response 
      }]);
    } catch (err: any) {
      console.error("Oracle Error:", err);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        role: "system", 
        text: "ERROR: LINK_SEVERED. RETRY INITIATION." 
      }]);
    }
  };

  return (
    <main className="min-h-screen bg-void flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-24 px-4 pb-4 flex flex-col max-w-5xl mx-auto w-full">
        {/* Terminal Window */}
        <div className="flex-1 border border-white/10 bg-black/50 backdrop-blur-sm relative overflow-hidden flex flex-col">
          {/* Header */}
          <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4 justify-between">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-crimson">
              <Cpu size={12} className="animate-pulse" />
              <span>Oracle Mainframe</span>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
            </div>
          </div>

          {/* Chat Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-xs md:text-sm scrollbar-hide">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] p-4 border ${
                    msg.role === "user" 
                      ? "border-white/20 bg-white/5 text-white" 
                      : msg.role === "system"
                      ? "border-transparent text-crimson/50 text-[10px] tracking-widest"
                      : "border-crimson/30 bg-crimson/5 text-crimson"
                  }`}>
                    {msg.role !== "user" && <span className="block text-[8px] uppercase tracking-widest opacity-50 mb-2">[{msg.role}]</span>}
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-void flex gap-4">
            <div className="flex items-center text-crimson animate-pulse">
              <Terminal size={18} />
            </div>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-white/20"
              placeholder="ENTER COMMAND..."
              autoFocus
            />
            <button type="submit" className="text-white/40 hover:text-white transition-colors">
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}