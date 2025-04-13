// app/api/favorites/[userId]/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Favorite from '@/models/Favorite';
import { connectToDatabase } from '@/utils/mongo';

// GET: Favoriten eines Nutzers abrufen
export async function GET(request, { params }) {
  const { userId } = await params;
  await connectToDatabase();
  try {
    const favorite = await Favorite.findOne({ userId });
    // Falls noch kein Dokument existiert, wird ein leeres Array zurückgegeben
    return NextResponse.json(favorite ? favorite.productIds : []);
  } catch (error) {
    return NextResponse.json({ error: 'Fehler beim Abrufen der Favoriten' }, { status: 500 });
  }
}

// POST: Produkt zu den Favoriten hinzufügen
export async function POST(request, { params }) {
  const { userId } = await params;
  const { productId } = await request.json();
  await connectToDatabase();
  try {
    let favorite = await Favorite.findOne({ userId });
    if (!favorite) {
      // Falls noch kein Dokument existiert, neues erstellen
      favorite = new Favorite({ userId, productIds: [] });
    }
    // Verhindern von Duplikaten
    if (!favorite.productIds.includes(productId)) {
      favorite.productIds.push(productId);
      await favorite.save();
    }
    return NextResponse.json({ message: 'Produkt zu Favoriten hinzugefügt.' });
  } catch (error) {
    return NextResponse.json({ error: 'Fehler beim Hinzufügen zu Favoriten' }, { status: 500 });
  }
}

// DELETE: Produkt aus den Favoriten entfernen
export async function DELETE(request, { params }) {
  const { userId } = await params;
  const { productId } = await request.json();
  await connectToDatabase();
  try {
    const favorite = await Favorite.findOne({ userId });
    if (favorite) {
      favorite.productIds = favorite.productIds.filter(id => id.toString() !== productId);
      await favorite.save();
    }
    return NextResponse.json({ message: 'Produkt aus Favoriten entfernt.' });
  } catch (error) {
    return NextResponse.json({ error: 'Fehler beim Entfernen aus Favoriten' }, { status: 500 });
  }
}
