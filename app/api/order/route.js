// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/dbConnect";
// import Order from "@/models/Order";
// import UserCart from "@/models/UserCart";
// import Address from "@/models/Address";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../auth/[...nextauth]/route";

// export async function POST(request) {
//   await dbConnect();
//   const session = await getServerSession(authOptions);
  
//   if (!session) {
//     return NextResponse.json({ message: "Nicht autorisiert" }, { status: 401 });
//   }

//   const userId = session.user.id;
  
//   try {
//     // 1️⃣ Warenkorb des Nutzers abrufen
//     const cart = await UserCart.findOne({ userId }).populate("items.productId");
//     if (!cart || cart.items.length === 0) {
//       return NextResponse.json({ message: "Warenkorb ist leer" }, { status: 400 });
//     }

//     // 2️⃣ Versand- & Rechnungsadresse abrufen
//     const address = await Address.findOne({ userId });
//     if (!address) {
//       return NextResponse.json({ message: "Keine Adresse gefunden" }, { status: 400 });
//     }

//     // 3️⃣ Bestelldaten zusammenstellen
//     const orderData = {
//       userId,
//       items: cart.items.map(item => ({
//         productId: item.productId._id,
//         name: item.productId.name,
//         price: item.productId.price,
//         quantity: item.quantity,
//         imageUrl: item.productId.image
//       })),
//       shippingAddress: {
//         street: address.street,
//         city: address.city,
//         state: address.state,
//         postalCode: address.postalCode,
//         country: address.country
//       },
//       billingAddress: {
//         street: address.street,
//         city: address.city,
//         state: address.state,
//         postalCode: address.postalCode,
//         country: address.country
//       },
//       orderDate: new Date(),
//       totalAmount: cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0),
//       status: "pending",
//       paymentId: "" // Wird nach der Bezahlung ergänzt
//     };

//     // 4️⃣ Bestellung in MongoDB speichern
//     const newOrder = await Order.create(orderData);

//     // 5️⃣ Warenkorb nach Bestellung leeren
//     await UserCart.findOneAndDelete({ userId });

//     return NextResponse.json({ message: "Bestellung erfolgreich!", order: newOrder }, { status: 201 });

//   } catch (error) {
//     console.error("Fehler beim Erstellen der Bestellung:", error);
//     return NextResponse.json({ message: "Interner Serverfehler" }, { status: 500 });
//   }
// }


//app\api\order\route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import UserCart from "@/models/UserCart";
import Address from "@/models/Address";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
  
    if (!session) {
      return NextResponse.json({ message: "Nicht autorisiert" }, { status: 401 });
    }
  
    const userId = session.user.id;
  
    try {
      // 1️⃣ Warenkorb des Nutzers abrufen
      const cart = await UserCart.findOne({ userId }).populate("items.productId");
      if (!cart || cart.items.length === 0) {
        return NextResponse.json({ message: "Warenkorb ist leer" }, { status: 400 });
      }
  
      // 2️⃣ Versand- & Rechnungsadresse abrufen
      const address = await Address.findOne({ userId });
      if (!address) {
        return NextResponse.json({ message: "Keine Adresse gefunden" }, { status: 400 });
      }
  
      // 3️⃣ Bestelldaten zusammenstellen
      const orderData = {
        userId,
        items: cart.items.map(item => ({
          productId: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          quantity: item.quantity,
          imageUrl: item.productId.image
        })),
        shippingAddress: {
          street: address.street,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country
        },
        billingAddress: {
          street: address.street,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country
        },
        orderDate: new Date(),
        totalAmount: cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0),
        status: "pending",
        paymentId: "" // Wird nach der Bezahlung ergänzt
      };
  
      // 4️⃣ Bestellung in MongoDB speichern
      const newOrder = await Order.create(orderData);
  
      // 5️⃣ Warenkorb nach Bestellung leeren
      await UserCart.findOneAndDelete({ userId });
  
      // Rückgabe der neuen Bestellung mit der orderId
      return NextResponse.json({ message: "Bestellung erfolgreich!", orderId: newOrder._id.toString() }, { status: 201 });
  
    } catch (error) {
      console.error("Fehler beim Erstellen der Bestellung:", error);
      return NextResponse.json({ message: "Interner Serverfehler" }, { status: 500 });
    }
  }
  

  export async function GET(request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: "Nicht autorisiert" }, { status: 401 });
    }
    const userId = session.user.id;
    
    try {
      // Alle Bestellungen des Users abrufen, sortiert nach Datum (neueste zuerst)
      const orders = await Order.find({ userId }).sort({ orderDate: -1 });
      return NextResponse.json(orders, { status: 200 });
    } catch (error) {
      console.error("Fehler beim Abrufen der Bestellungen:", error);
      return NextResponse.json({ message: "Interner Serverfehler" }, { status: 500 });
    }
  }