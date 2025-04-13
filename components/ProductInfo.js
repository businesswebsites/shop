"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function ProductInfo({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) {
          throw new Error("Produkt nicht gefunden");
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  if (loading) return <p>Lade Produktdaten...</p>;
  if (error) return <p>Fehler: {error}</p>;
  if (!product) return null;

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative w-full h-[400px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
          <CardDescription>
            {product.description || "Keine Beschreibung vorhanden."}
          </CardDescription>
          <div className="text-xl font-semibold text-gray-900">
            {product.price} €
          </div>
          {product.options && product.options.length > 0 && (
            <div>
              <Label className="mb-2">Optionen:</Label>
              <Select defaultValue={product.options[0]}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Bitte auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {product.options.map((option, idx) => (
                    <SelectItem key={idx} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="default" size="default">
            Zum Warenkorb hinzufügen
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
