// app/api/cart/[userId]/route.js
import UserCart from '@/models/UserCart';
import Product from '@/models/Product';

export async function GET(req, { params }) {
  // params sollte direkt aus der Anfrage entnommen werden und nicht synchron verwendet werden
  const { userId } = await params; // params sind jetzt direkt zugänglich ohne await

  try {
    // Überprüfen, ob der Warenkorb des Benutzers existiert
    const cart = await UserCart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      return new Response('Warenkorb nicht gefunden', { status: 404 });
    }

    return new Response(JSON.stringify(cart), { status: 200 });
  } catch (error) {
    console.error('Fehler beim Abrufen des Warenkorbs:', error);
    return new Response('Fehler beim Abrufen des Warenkorbs', { status: 500 });
  }
}

export async function POST(req, { params }) {
    const { userId } = params;
    const { productId, quantity } = await req.json();
  
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return new Response('Produkt nicht gefunden', { status: 404 });
      }
  
      const cart = await UserCart.findOne({ userId });
  
      // Wenn der Warenkorb noch nicht existiert, erstellen wir einen neuen
      if (!cart) {
        const newCart = new UserCart({
          userId,
          items: [{ productId, quantity, image: product.image }],
        });
        await newCart.save();
        return new Response('Produkt zum Warenkorb hinzugefügt', { status: 201 });
      }
  
      // Wenn der Warenkorb existiert, fügen wir das Produkt hinzu oder aktualisieren die Menge
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId.toString());
      if (itemIndex !== -1) {
        cart.items[itemIndex].quantity += quantity; // Erhöhe die Menge
      } else {
        cart.items.push({ productId, quantity, image: product.image }); // Füge ein neues Produkt hinzu
      }
  
      await cart.save();
      return new Response('Produkt zum Warenkorb hinzugefügt', { status: 200 });
    } catch (error) {
      console.error('Fehler beim Hinzufügen zum Warenkorb:', error);
      return new Response('Fehler beim Hinzufügen zum Warenkorb', { status: 500 });
    }
  }
