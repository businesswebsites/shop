// app/api/cart/[userId]/add/route.js
import UserCart from '@/models/UserCart';
import Product from '@/models/Product';

export async function POST(req, { params }) {
  const { userId } = await params;
  const { productId } = await req.json();

  try {
    // Überprüfen, ob das Produkt existiert
    const product = await Product.findById(productId);
    if (!product) {
      return new Response('Produkt nicht gefunden', { status: 404 });
    }

    // Warenkorb des Benutzers finden oder erstellen
    let userCart = await UserCart.findOne({ userId });

    if (!userCart) {
      // Wenn der Warenkorb nicht existiert, erstelle einen neuen
      userCart = new UserCart({ userId, items: [] });
    }

    // Überprüfen, ob das Produkt bereits im Warenkorb ist
    const existingItem = userCart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      // Produkt ist bereits im Warenkorb, Menge erhöhen
      existingItem.quantity += 1;
    } else {
      // Produkt ist noch nicht im Warenkorb, hinzufügen
      userCart.items.push({
        productId,
        quantity: 1,
        image: product.image, // Füge das Bildpfad des Produkts hinzu
      });
    }

    // Warenkorb speichern
    await userCart.save();

    return new Response(JSON.stringify(userCart), { status: 200 });
  } catch (error) {
    console.error('Fehler beim Hinzufügen zum Warenkorb:', error);
    return new Response('Fehler beim Hinzufügen zum Warenkorb', { status: 500 });
  }
}
