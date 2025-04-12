'use client';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

export default function DashboardComponent({ articles, user, article_sum }) {
  return (
    <>
      <Head>
        <title>Dekolust Dashboard</title>
      </Head>
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">
            Hallo {user && user.charAt(0).toUpperCase() + user.slice(1)}
          </h1>
          <p className="mb-8">Dein Einkaufswagen enthält {article_sum} Artikel.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {articles && articles.map((article, idx) => (
              <Card key={idx} className="w-full">
                <CardHeader>
                  <CardTitle>{article.name}</CardTitle>
                </CardHeader>
                {/* Einheitlicher Bild-Container */}
                <div className="relative w-full h-48">
                  <Image
                    src={article.url}
                    alt={article.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <CardContent>
                  <p className="text-gray-600">{article.preis} €</p>
                </CardContent>
                <CardFooter>
                  <form action="/api/cart/update" method="POST" className="w-full">
                    <input type="hidden" name="user_id" value={user.id} />
                    <input type="hidden" name="product_id" value={article.id} />
                    <button type="submit" className="w-full px-4 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-800 hover:text-white transition">
                      Zum Warenkorb hinzufügen
                    </button>
                  </form>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <Link href="/dashboard">
              <span className="px-4 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-800 hover:text-white transition cursor-pointer">
                Weiter stöbern
              </span>
            </Link>
            <Link href="/address">
              <span className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer">
                Bezahlen
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
