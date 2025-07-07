'use client';

import Link from "next/link";
import Image from "next/image";

import { useCart } from "@/app/context/CartContext";
import { useCallback } from "react";

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

  const { thumbnail, title, price, description, category } = product;

  const handleAddToCart = useCallback(
    (event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      addToCart(product);
    },
    [addToCart, product]
  );

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 overflow-hidden">
      {/* Details */}
      <Link href={`/product/${product.id}`}>
        {/* Image */}
        <div className="relative w-full h-60 bg-pink-50">
          <Image
            src={thumbnail}
            alt={title}
            fill={true}
            className="object-contain p-6"
          />
        </div>

        {/* Title */}
        <h2 className="text-base font-semibold text-gray-800 line-clamp-2 m-3">
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

        <button
          className="mt-4 bg-rose-500 hover:bg-rose-600 text-white text-sm py-2 rounded-md shadow-md transition cursor-pointer"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

