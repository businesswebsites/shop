// app/api/cart/[userId]/remove/route.js
import UserCart from '@/models/UserCart';

export async function DELETE(req, { params }) {
  const { userId } = await params;
  const { productId } = await req.json();

  try {
    const userCart = await UserCart.findOne({ userId });

    if (!userCart) {
      return new Response('Warenkorb nicht gefunden', { status: 404 });
    }

    userCart.items = userCart.items.filter(item => item.productId.toString() !== productId);

    await userCart.save();

    return new Response(JSON.stringify(userCart), { status: 200 });
  } catch (error) {
    console.error('Fehler beim Entfernen des Produkts:', error);
    return new Response('Fehler beim Entfernen des Produkts', { status: 500 });
  }
}
