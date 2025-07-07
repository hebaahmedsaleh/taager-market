'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

interface Props {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
}

export default function SkeletonImage({ src, alt, className, width, height }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={clsx('relative', className)} style={{ width, height }}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        onLoad={() => setIsLoading(false)}
        className={clsx(
          'object-cover rounded transition-opacity duration-500',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
      />
    </div>
  );
}
