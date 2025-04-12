//components\CartComponent.js
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Plus, Minus, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function CartComponent() {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (session?.user) {
      fetch(`/api/cart/${session.user.id}`)
        .then(response => response.json())
        .then(data => {
          setCartItems(data.items);
          const total = data.items.reduce((sum, item) => {
            return sum + parseFloat(item.productId.price) * item.quantity;
          }, 0);
          setTotalPrice(total);
        });
    }
  }, [session]);

  const handleChangeQuantity = async (productId, action) => {
    const updatedItems = [...cartItems];
    const itemIndex = updatedItems.findIndex(item => item.productId._id === productId);

    if (itemIndex !== -1) {
      const item = updatedItems[itemIndex];
      if (action === 'increase') {
        item.quantity += 1;
      } else if (action === 'decrease' && item.quantity > 1) {
        item.quantity -= 1;
      }

      await fetch(`/api/cart/${session.user.id}/update`, {
        method: 'PUT',
        body: JSON.stringify({ productId, quantity: item.quantity }),
        headers: { 'Content-Type': 'application/json' }
      });

      setCartItems(updatedItems);
      setTotalPrice(updatedItems.reduce((sum, item) => sum + parseFloat(item.productId.price) * item.quantity, 0));
    }
  };

  const handleRemoveItem = async (productId) => {
    const updatedItems = cartItems.filter(item => item.productId._id !== productId);

    await fetch(`/api/cart/${session.user.id}/remove`, {
      method: 'DELETE',
      body: JSON.stringify({ productId }),
      headers: { 'Content-Type': 'application/json' }
    });

    setCartItems(updatedItems);
    setTotalPrice(updatedItems.reduce((sum, item) => sum + parseFloat(item.productId.price) * item.quantity, 0));
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Warenkorb</h2>

      <div className="overflow-x-auto p-2 rounded-sm bg-white">
        <Table className="min-w-full border border-gray-300 rounded-lg">
          <TableHeader>
            <tr className="bg-gray-100 text-gray-700 text-sm sm:text-base">
              <TableHead>Produktbild</TableHead>
              <TableHead>Produktname</TableHead>
              <TableHead>Menge</TableHead>
              <TableHead>Preis</TableHead>
              <TableHead>Gesamt</TableHead>
              <TableHead>Aktionen</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {cartItems.map(item => (
              <TableRow key={item.productId._id} className="text-center">
                <TableCell>
                  <img
                    src={item.image}
                    alt={item.productId.name}
                    className="w-20 h-20 object-cover rounded-md mx-auto"
                  />
                </TableCell>
                <TableCell className="text-sm sm:text-base">{item.productId.name}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleChangeQuantity(item.productId._id, 'decrease')}
                      disabled={item.quantity <= 1}
                      className="p-2 bg-gray-200 rounded-full cursor-pointer disabled:opacity-50"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => handleChangeQuantity(item.productId._id, 'increase')}
                      className="p-2 bg-gray-200 rounded-full cursor-pointer"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </TableCell>
                <TableCell className="text-sm sm:text-base">{item.productId.price} €</TableCell>
                <TableCell className="text-sm sm:text-base">
                  {(item.quantity * parseFloat(item.productId.price)).toFixed(2)} €
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleRemoveItem(item.productId._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={24} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 text-right text-lg font-bold">
        Gesamtpreis: {totalPrice.toFixed(2)} €
      </div>
      <Button
      className="mt-4 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg"      
    >
      <Link href="/cart/payment" className="bg-white p-2 rounded-sm text-gray-700 hover:text-pink-500 transition">
                  Zahlung
                </Link>
    </Button>
    </div>
  );
}
