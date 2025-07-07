'use client';
import { useCart } from '@/app/context/CartContext';
import { ShoppingCart } from 'lucide-react'; // or any icon

export default function CartButton() {
  const { toggleCart, cart } = useCart();

  const count = cart.reduce((sum, item) => sum + (item?.quantity || 1), 0);

  return (
    <button onClick={toggleCart} className="relative">
      <ShoppingCart size={24} />
      {count > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {count}
        </span>
      )}
    </button>
  );
}