// components/ProductList.js
"use client";

import React, { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
// Importiere die shadcn Select-Komponenten (basierend auf deiner bisherigen Implementation)
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";

export default function ProductList({ products }) {
  // Zustand für die Sortierreihenfolge: 'asc' für aufsteigend, 'desc' für absteigend
  const [sortOrder, setSortOrder] = useState("asc");

  // Memoized sortiertes Array, um unnötige Re-Sortierungen zu vermeiden
  const sortedProducts = useMemo(() => {
    // Eine Kopie des Arrays erstellen, da .sort() das Original verändert
    return [...products].sort((a, b) => {
      // Es wird angenommen, dass "price" ein numerischer Wert ist. Andernfalls müssten z. B. parseFloat() genutzt werden.
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });
  }, [products, sortOrder]);

  return (
    <>
      {/* Sortier-Select */}
      <div className="mb-6 ">
        <Select  onValueChange={(value) => setSortOrder(value)} defaultValue="asc">
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Sortierung wählen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Preis aufsteigend</SelectItem>
            <SelectItem value="desc">Preis absteigend</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Produktgitter */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product, index) => (
          <ProductCard key={product._id || index} product={product} />
        ))}
      </div>
    </>
  );
}
