// app/api/products/[id]/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/models/Product";

// GET-Handler zum Abrufen eines Produkts anhand der ID
export async function GET(request, { params }) {
  // Verbindung zur MongoDB herstellen
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  const { id } = await params;
  try {
    const product = await Product.findById(id).lean();
    if (!product) {
      return NextResponse.json(
        { error: "Produkt nicht gefunden" },
        { status: 404 }
      );
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Fehler beim Abrufen des Produkts" },
      { status: 500 }
    );
  }
}
