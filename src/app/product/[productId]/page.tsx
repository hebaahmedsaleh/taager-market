"use client";

import { useParams } from "next/navigation";

import { useCart } from "@/app/context/CartContext";
import { useEffect, useState } from "react";
import { CONFIG } from "@/app/constants";

import type { Product } from "@/app/types/Product";
import SkeletonImage from "@/app/components/SkeletonImage";

export default function ProductPage() {
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const params = useParams();

  const productId = params.productId;
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `${CONFIG.API_BASE_URL}/products/${productId}`;
      try {
        const res = await fetch(apiUrl);
        const product = await res.json();
        setProductDetails(product);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    };

    fetchData();
  }, [params.productId, productId]);

  const { title, thumbnail, description, price, category, rating } =
    productDetails || {};
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md flex flex-col md:flex-row gap-6">
      {/* Product Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <SkeletonImage
          src={thumbnail ?? "/placeholder.png"}
          alt={title ?? "Product image"}
          className="h-80 object-contain rounded-lg"
          width={400}
          height={400}
          fill
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <span className="text-sm text-gray-500 uppercase">{category}</span>
        <h2 className="text-2xl font-bold text-gray-700 m-0.5">{title}</h2>
        <p className="text-lg text-blue-600 font-semibold">${price}</p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(rating ?? 0) ? "fill-current" : "text-gray-300"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.64a1 1 0 00.95.69h3.79c.969 0 1.371 1.24.588 1.81l-3.07 2.23a1 1 0 00-.364 1.118l1.18 3.64c.3.921-.755 1.688-1.54 1.118l-3.07-2.23a1 1 0 00-1.176 0l-3.07 2.23c-.784.57-1.838-.197-1.539-1.118l1.18-3.64a1 1 0 00-.364-1.118l-3.07-2.23c-.783-.57-.38-1.81.588-1.81h3.79a1 1 0 00.95-.69l1.18-3.64z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600">({rating} reviews)</span>
        </div>

        <p className="text-gray-700 text-sm">{description}</p>

        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => productDetails && addToCart(productDetails)}
          disabled={!productDetails}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
