'use client';
import React from 'react';
import { useCart } from '@/app/context/CartContext';

export default function CartDrawer() {
  const { cart, isCartOpen, removeFromCart, closeCart } = useCart();

  if (!isCartOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <aside className="fixed right-0 top-0 w-80 h-full bg-white shadow-lg p-4 z-50 overflow-auto">
      <button
        onClick={closeCart}
        className="mb-4 text-red-600 font-bold hover:underline"
        aria-label="Close Cart"
      >
        Close
      </button>
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map(({ id, title, price, quantity, image }) => (
              <li key={id} className="flex items-center mb-4">
                <img
                  src={image}
                  alt={title}
                  className="w-16 h-16 object-cover mr-4 rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{title}</h3>
                  <p>
                    ${price.toFixed(2)} x {quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(id)}
                  className="text-red-500 font-bold hover:underline"
                  aria-label={`Remove ${title} from cart`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="font-bold mt-4">Total: ${total.toFixed(2)}</p>
        </>
      )}
    </aside>
  );
}
