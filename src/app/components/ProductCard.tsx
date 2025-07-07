'use client';
import { useState } from "react";
import Link from "next/link";

import Image from "next/image";

import { useCart } from "@/app/context/CartContext";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((q) => Math.min(q + 1, 99));
  const handleDecrement = () => setQuantity((q) => Math.max(q - 1, 1));

  const { id, thumbnail, title, price, description, category } = product;
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 overflow-hidden">
      {/* Details */}
      <Link href={`/product/${product.id}`}>
        {/* Image */}
        <div className="relative w-full h-60 bg-pink-50">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-contain p-6"
          />
        </div>
        <h2 className="text-base font-semibold text-gray-800 line-clamp-2">
          {title}
        </h2>
      </Link>
      <div className="p-4 flex flex-col gap-2">
        <span className="text-xs text-rose-400 uppercase tracking-wide font-medium">
          {category}
        </span>

        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-emerald-600 font-bold text-lg">
            ${price.toFixed(2)}
          </span>
        </div>

        {/* Quantity Controls */}
        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={handleDecrement}
            className="px-2 py-1 text-sm bg-blue-600 hover:bg-gray-300 rounded"
          >
            -
          </button>
          <span className="text-sm text-gray-700">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="px-2 py-1 text-sm bg-blue-600 hover:bg-gray-300 rounded"
          >
            +
          </button>
        </div>

        <button
          className="mt-4 bg-rose-500 hover:bg-rose-600 text-white text-sm py-2 rounded-md shadow-md transition cursor-pointer"
          onClick={(event) => {
            event.stopPropagation(); // no need for optional chaining here
            addToCart(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
