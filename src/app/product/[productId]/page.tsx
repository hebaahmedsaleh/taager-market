import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: { productid: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const apiUrl = `https://fakestoreapi.com/products/${params.productId}`;
    console.log({ apiUrl});
    
  const res = await fetch(apiUrl, {
    cache: 'no-store',
  });

  if (!res.ok) {
    notFound(); // or throw new Error('Failed to load product');
  }

  let product;
  console.log({ product });
  
  try {
    product = await res.json();
  } catch (err) {
    console.error('❌ Failed to parse JSON:', err);
    notFound(); // fallback if JSON is broken
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-gray-600">{product.description}</p>
      <img src={product.image} alt={product.title} className="w-48 mt-4" />
      <p className="text-lg font-semibold mt-2">${product.price}</p>
    </div>
  );
}
