'use client';
import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "@/app/types/Product";

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeOneFromCart: (id: number) => void;
  clearItem: (id: number) => void;
  groupedCart: Record<number, { product: Product; quantity: number }>;
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    setIsCartOpen(true);
  };

  const removeOneFromCart = (id: number) => {
    setCart((prev) => {
      const index = prev.findIndex((p) => p.id === id);
      if (index === -1) return prev;
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const closeCart = () => setIsCartOpen(false);
  const openCart = () => setIsCartOpen(true);

  const clearItem = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const groupedCart = cart.reduce((acc, product) => {
    if (!acc[product.id]) {
      acc[product.id] = { product, quantity: 1 };
    } else {
      acc[product.id].quantity += 1;
    }
    return acc;
  }, {} as Record<number, { product: Product; quantity: number }>);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeOneFromCart,
        clearItem,
        groupedCart,
        isCartOpen,
        toggleCart,
        closeCart,
        openCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
