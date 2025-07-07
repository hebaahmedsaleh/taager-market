'use client';

import Image from 'next/image';
import { X } from "lucide-react";
import React from "react";

interface ProductType {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface CartItemProps {
  item: ProductType;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export default function CartItem({
  item,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) {
  return (
    <li className="flex items-start justify-between gap-4 border-b py-4">
      {/* Image */}
      <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          className="object-contain"
        />
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold line-clamp-1 text-gray-700">
          {item.title}
        </h3>
        <p className="text-sm text-indigo-600 font-medium">
          ${item.price} × {quantity}
        </p>
        <p className="text-sm font-bold text-rose-600">
          ${(item.price * quantity).toFixed(2)}
        </p>

        {/* Quantity Controls */}
        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={onDecrement}
            className="px-2 py-1 text-sm bg-blue-600 hover:bg-gray-300 rounded"
          >
            -
          </button>
          <span className="text-sm text-gray-700">{quantity}</span>
          <button
            onClick={onIncrement}
            className="px-2 py-1 text-sm bg-blue-600 hover:bg-gray-300 rounded"
          >
            +
          </button>
        </div>
      </div>

      {/* Remove Icon */}
      <button
        onClick={onRemove}
        title="Delete this item from cart"
        aria-label="Remove item"
        className="text-gray-500 hover:text-red-500 transition"
      >
        <X size={18} />
      </button>
    </li>
  );
}
