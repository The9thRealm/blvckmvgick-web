"use client";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { ShoppingBag, ChevronRight, Info } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id;
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState("L");
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-xl font-bold uppercase tracking-widest">Product Not Found</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, selectedSize);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 mb-12">
          <span>Home</span> <ChevronRight size={10} /> 
          <span>Shop</span> <ChevronRight size={10} /> 
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="aspect-[3/4] bg-accent overflow-hidden"
          >
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <p className="text-xs text-gray-500 uppercase tracking-[0.4em] mb-2">{product.category}</p>
              <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">{product.name}</h1>
              <p className="text-2xl font-bold">${product.price}</p>
            </div>

            <div className="prose prose-invert mb-12">
              <p className="text-gray-400 leading-relaxed text-sm">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-widest">Select Size</span>
                <button className="text-[10px] uppercase tracking-widest text-gray-500 flex items-center gap-1">
                  <Info size={12} /> Size Guide
                </button>
              </div>
              <div className="flex gap-4">
                {["S", "M", "L", "XL"].map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center text-xs font-bold border transition-all ${
                      selectedSize === size 
                        ? "bg-white text-black border-white" 
                        : "border-white/20 text-white hover:border-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full py-5 text-xs font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 ${
                isAdding ? "bg-green-500 text-white" : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              {isAdding ? "Added to Sanctuary" : <><ShoppingBag size={18} /> Add to Sanctuary</>}
            </button>

            <div className="mt-12 space-y-4 pt-12 border-t border-white/5">
              <details className="group">
                <summary className="list-none flex justify-between items-center cursor-pointer text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition">
                  Shipping & Returns
                  <span className="text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-xs text-gray-500 leading-loose uppercase tracking-wider">
                  Ships worldwide within 5-7 business days. Returns accepted within 14 days of delivery.
                </p>
              </details>
              <details className="group">
                <summary className="list-none flex justify-between items-center cursor-pointer text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition">
                  Fabric & Care
                  <span className="text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-xs text-gray-500 leading-loose uppercase tracking-wider">
                  Hand wash cold. Do not tumble dry. Iron inside out. Designed for longevity.
                </p>
              </details>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
