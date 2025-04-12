// app/api/cart/[userId]/update/route.js
import UserCart from '@/models/UserCart';

export async function PUT(req, { params }) {
  const { userId } = await params;
  const { productId, quantity } = await req.json();

  try {
    const userCart = await UserCart.findOne({ userId });

    if (!userCart) {
      return new Response('Warenkorb nicht gefunden', { status: 404 });
    }

    const item = userCart.items.find(item => item.productId.toString() === productId);

    if (item) {
      item.quantity = quantity;
      await userCart.save();
      return new Response(JSON.stringify(userCart), { status: 200 });
    }

    return new Response('Produkt nicht gefunden im Warenkorb', { status: 404 });
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Warenkorbs:', error);
    return new Response('Fehler beim Aktualisieren des Warenkorbs', { status: 500 });
  }
}
