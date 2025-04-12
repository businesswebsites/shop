//app\api\order\[orderId]\route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function GET(request, { params }) {
  const { orderId } = await params;  // Dynamisch die orderId aus der URL extrahieren
  await dbConnect();

  try {
    // 1️⃣ Bestellung anhand der orderId abrufen
    const order = await Order.findById(orderId);
    
    if (!order) {
      return NextResponse.json({ message: "Bestellung nicht gefunden" }, { status: 404 });
    }

    // 2️⃣ Bestellung zurückgeben
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Fehler beim Abrufen der Bestellung:", error);
    return NextResponse.json({ message: "Interner Serverfehler" }, { status: 500 });
  }
}
