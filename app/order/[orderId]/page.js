"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function OrderDetails() {
  const params = useParams(); // Erhalte orderId aus der URL
  const { orderId } = params;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetch(`/api/order/${orderId}`, { method: "GET" })
        .then(response => response.json())
        .then(data => {
          setOrder(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Fehler beim Laden der Bestellung:", err);
          setLoading(false);
        });
    }
  }, [orderId]);

  if (loading) return <p>Lade Bestellung...</p>;
  if (!order) return <p>Keine Bestellung gefunden.</p>;

  return (
    <div className="container mx-auto p-4 max-w-6xl">
    <h1 className="text-2xl font-bold mb-4">Bestellung Details</h1>
    {/* Auf größeren Bildschirmen nebeneinander */}
    <div className="flex flex-col md:flex-row gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Bestellung Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <strong>Bestell-ID:</strong> {order._id}
          </div>
          <div>
            <strong>Bestelldatum:</strong> {new Date(order.orderDate).toLocaleString()}
          </div>
          <div>
            <strong>Status:</strong> {order.status}
          </div>
          <div>
            <strong>Gesamtbetrag:</strong> {order.totalAmount.toFixed(2)} €
          </div>
          <div>
            <strong>Versandadresse:</strong>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.postalCode} {order.shippingAddress.city}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
          <div>
            <strong>Rechnungsadresse:</strong>
            <p>{order.billingAddress.street}</p>
            <p>{order.billingAddress.postalCode} {order.billingAddress.city}</p>
            <p>{order.billingAddress.country}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bestellte Artikel</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="bg-white">
            {/* <TableCaption>Artikel in dieser Bestellung</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead>Produktbild</TableHead>
                <TableHead>Produktname</TableHead>
                <TableHead>Menge</TableHead>
                <TableHead>Einzelpreis</TableHead>
                <TableHead>Gesamt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map(item => (
                <TableRow key={item.productId}>
                  <TableCell>
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price.toFixed(2)} €</TableCell>
                  <TableCell>{(item.quantity * item.price).toFixed(2)} €</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button onClick={() => window.history.back()}>Zurück</Button>
        </CardFooter>
      </Card>
    </div>
    </div>
  );
}
