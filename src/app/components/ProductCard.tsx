'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, title, price, image }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group">
      <div className="h-full bg-white rounded-xl border hover:shadow-lg transition p-4 flex flex-col">
        <div className="w-full h-40 relative mb-4">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <h2 className="text-sm font-semibold text-gray-800 group-hover:text-black line-clamp-2 flex-grow">
          {title}
        </h2>

        <div className="mt-4 text-lg font-bold text-indigo-600">${price}</div>
      </div>
    </Link>
  );
}
