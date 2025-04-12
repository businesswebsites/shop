// app/api/products/route.js
import Product from '@/models/Product';
import { connectToDatabase } from '@/utils/mongo';

// Verbindung zur MongoDB
async function getProducts() {
  await connectToDatabase(); // Hier wird die DB-Verbindung hergestellt
  const products = await Product.find(); // Abrufen der Produkte aus der Collection
  return products;
}

export async function GET() {
  try {
    const products = await getProducts();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response('Fehler beim Abrufen der Produkte', { status: 500 });
  }
}
