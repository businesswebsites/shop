// app/page.js
import Head from 'next/head';
import ProductCard from '@/components/ProductCard';

export default async function Home() {
  // Abrufen der Produkte von der API
  const res = await fetch(`http://127.0.0.1:3000//api/products`);
  const products = await res.json();

  return (
    <>
      <Head>
        <title>Dekolust - Homepage</title>
      </Head>

      {/* Header */}
      <header className="py-10 bg-pink-100 border-t border-b border-gray-300">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-900">
            <h1 className="text-5xl font-extrabold" style={{ fontFamily: "'Pacifico', cursive" }}>
              Dekolust
            </h1>
            <p className="mt-4 text-xl">Der Ort, wo du deine Wunschdeko findest!</p>
          </div>
        </div>
      </header>

      {/* Produktübersicht */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
     
    </>
  );
}
