"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("blvckmvgick-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("blvckmvgick-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, size: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.selectedSize === size
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1, selectedSize: size }];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prevCart) => 
      prevCart.filter((item) => !(item.id === productId && item.selectedSize === size))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
