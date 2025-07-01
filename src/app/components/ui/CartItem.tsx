'use client';

import Image from 'next/image';

interface CartItemProps {
  item: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
  };
}

export default function CartItem({ item }: CartItemProps) {
  return (
    <div className="flex gap-4 py-3 border-b">
      <div className="relative w-16 h-16">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-semibold line-clamp-1">{item.title}</h3>
        <p className="text-sm text-gray-600">
          ${item.price} × {item.quantity}
        </p>
        <p className="text-sm font-medium text-indigo-600">
          ${item.price * item.quantity}
        </p>
      </div>
    </div>
  );
}
