"use client";

import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "@/components/ui/table";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function OrderOverview() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/order", { method: "GET" })
        .then(response => response.json())
        .then(data => {
          setOrders(data);
        })
        .catch(err => console.error("Fehler beim Laden der Bestellungen:", err));
    }
  }, [session]);

  if (status === "loading") return <p>Lade...</p>;
  if (!session) return <p>Bitte logge dich ein.</p>;

  return (
    <Table className="rounded-sm p-2 cursor-pointer bg-white">
      {/* <TableCaption>Bestellübersicht</TableCaption> */}
      <TableHeader>
        <TableRow className="p-2">
          <TableHead>Bestell-ID</TableHead>
          <TableHead>Datum</TableHead>
          <TableHead>Gesamt</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="p-2">
        {orders.map(order => (
          
            <TableRow >
              
              <TableCell>
  <Link key={order._id} href={`/order/${order._id}`}>
    {order._id}
  </Link>
</TableCell>
<TableCell>
  <Link key={`${order._id}-date`} href={`/order/${order._id}`}>
    {new Date(order.orderDate).toLocaleDateString()}
  </Link>
</TableCell>
<TableCell>
  <Link key={`${order._id}-total`} href={`/order/${order._id}`}>
    {order.totalAmount.toFixed(2)} €
  </Link>
</TableCell>
<TableCell>
  <Link key={`${order._id}-status`} href={`/order/${order._id}`}>
    {order.status}
  </Link>
</TableCell>
           
            </TableRow>
         
        ))}
      </TableBody>
    </Table>
  );
}
