'use client';

import React from "react";
import { useCart } from "@/app/context/CartContext";
import CartItem from "./ui/CartItem";

export default function CartDrawer() {
  const {
    groupedCart,
    addToCart,
    removeOneFromCart,
    clearItem,
    cart,
    isCartOpen,
    closeCart,
  } = useCart();

  if (!isCartOpen) return null;

  const total = Object.values(groupedCart).reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );

  return (
    <aside className="fixed right-0 top-0 w-80 h-full bg-white shadow-lg p-4 z-50 overflow-auto">
      <button
        onClick={closeCart}
        className="mb-4 text-red-600 font-bold hover:underline"
        aria-label="Close Cart"
      >
        Close
      </button>
      <h2 className="text-xl font-semibold mb-4 text-gray-600">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <>
          <ul>
            {Object.values(groupedCart).map(({ product, quantity }) => (
              <CartItem
                key={product.id}
                item={product}
                quantity={quantity}
                onIncrement={() => addToCart(product)}
                onDecrement={() => removeOneFromCart(product.id)}
                onRemove={() => clearItem(product.id)}
              />
            ))}
          </ul>

          <p className="font-bold text-lg mt-4 border-t pt-4">
            Total: ${total.toFixed(2)}
          </p>
        </>
      )}
    </aside>
  );
}
