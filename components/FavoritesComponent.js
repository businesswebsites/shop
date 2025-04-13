// components/FavoritesComponent.js
"use client"

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import ProductCard from './ProductCard';

export default function FavoritesComponent() {
  const { data: session } = useSession();
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  // Favoriten-IDs des Nutzers abrufen
  useEffect(() => {
    if (session?.user) {
      const fetchFavorites = async () => {
        const res = await fetch(`/api/favorites/${session.user.id}`);
        const data = await res.json();
        setFavoriteIds(data);
      };
      fetchFavorites();
    }
  }, [session]);

  // Produkte anhand der Favoriten-IDs laden
  useEffect(() => {
    if (favoriteIds.length) {
      const fetchProducts = async () => {
        const promises = favoriteIds.map(id =>
          fetch(`/api/products/${id}`).then(res => res.json())
        );
        const products = await Promise.all(promises);
        setFavoriteProducts(products);
      };
      fetchProducts();
    }
  }, [favoriteIds]);

  // Favorit entfernen
  const removeFavorite = async (productId) => {
    const res = await fetch(`/api/favorites/${session.user.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId }),
    });
    if (res.ok) {
      toast.success("Produkt aus Favoriten entfernt.");
      // Lokale Aktualisierung: Filtere das entfernte Produkt aus der Liste
      setFavoriteProducts(favoriteProducts.filter(product => product._id !== productId));
      setFavoriteIds(favoriteIds.filter(id => id !== productId));
    } else {
      toast.error("Fehler beim Entfernen aus Favoriten.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 py-2 px-4 rounded-md mb-5">Deine Favoriten</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {favoriteProducts.map(product => (
          <div key={product._id} className="relative">
            <ProductCard product={product} />
            <button 
              onClick={() => removeFavorite(product._id)} 
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
