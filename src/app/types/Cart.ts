import { Product } from "./Product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeOneFromCart: (id: number) => void;
  clearItem: (id: number) => void;
  groupedCart: Record<number, CartItem>;
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
}
 