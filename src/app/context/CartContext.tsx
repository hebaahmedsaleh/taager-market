'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/app/types/Product";

import type { CartContextType, CartItem } from "@/app/types/Cart";
import { CONFIG, MESSAGES } from "../constants";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ✅ Load cart once from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONFIG.LOCAL_STORAGE_KEY);
      if (stored) setCart(JSON.parse(stored));
    } catch (err) {
      console.error(MESSAGES.LOCAL_STORAG_FAILURE, err);
    }
  }, []);

  // ✅ Save to localStorage only when cart changes
  useEffect(() => {
    localStorage.setItem(CONFIG.LOCAL_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // ✅ Memoized Handlers
  const addToCart = useCallback((product: Product) => {
    setCart((prev) => [...prev, product]);
    setIsCartOpen(true);
  }, []);

  const removeOneFromCart = useCallback((id: number) => {
    setCart((prev) => {
      const index = prev.findIndex((p) => p.id === id);
      if (index === -1) return prev;
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  }, []);

  const clearItem = useCallback((id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const groupedCart = useMemo(() => {
    return cart.reduce((acc, product) => {
      if (!acc[product.id]) {
        acc[product.id] = { product, quantity: 1 };
      } else {
        acc[product.id].quantity += 1;
      }
      return acc;
    }, {} as Record<number, CartItem>);
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeOneFromCart,
      clearItem,
      groupedCart,
      isCartOpen,
      toggleCart,
      closeCart,
      openCart,
    }),
    [
      cart,
      addToCart,
      removeOneFromCart,
      clearItem,
      groupedCart,
      isCartOpen,
      toggleCart,
      closeCart,
      openCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
