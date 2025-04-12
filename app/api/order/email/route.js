//app\api\order\email\route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import User from "@/models/User";
import nodemailer from "nodemailer";

export async function POST(request) {
  await dbConnect();
  const { orderId } = await request.json(); // Order-ID vom Frontend empfangen

  try {
    // 1️⃣ Bestellung abrufen
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ message: "Bestellung nicht gefunden" }, { status: 404 });
    }

    // 2️⃣ Kundendaten abrufen
    const user = await User.findById(order.userId);
    if (!user) {
      return NextResponse.json({ message: "Benutzer nicht gefunden" }, { status: 404 });
    }

    // 3️⃣ E-Mail-Text erstellen
    const orderItems = order.items
      .map(item => `${item.name} (x${item.quantity}) - ${item.price.toFixed(2)}€`)
      .join("\n");

    const emailContent = `
      Neue Bestellung erhalten!
      
      🛍️ Bestellnummer: ${order._id}
      📅 Bestelldatum: ${order.orderDate.toLocaleString()}
      
      👤 Kunde: ${user.name}
      ✉️ E-Mail: ${user.email}

      📦 Bestellte Artikel:
      ${orderItems}

      💰 Gesamtbetrag: ${order.totalAmount.toFixed(2)}€

      🚚 Versandadresse:
      ${order.shippingAddress.street}, ${order.shippingAddress.postalCode} ${order.shippingAddress.city}, ${order.shippingAddress.country}

      🧾 Rechnungsadresse:
      ${order.billingAddress.street}, ${order.billingAddress.postalCode} ${order.billingAddress.city}, ${order.billingAddress.country}

      Status: ${order.status}
    `;

    // 4️⃣ Nodemailer-Transporter konfigurieren
    const transporter = nodemailer.createTransport({
      service: "gmail", // Alternativ: SMTP eines anderen Anbieters
      auth: {
        user: process.env.EMAIL_USER, // Deine E-Mail-Adresse (z. B. GMAIL)
        pass: process.env.EMAIL_PASS // Dein App-Passwort oder SMTP-Passwort
      }
    });

    // 5️⃣ E-Mail versenden
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "adi.droesi@gmail.com", // Hier die Ziel-E-Mail eintragen
      subject: `Neue Bestellung von ${user.name} (${order._id})`,
      text: emailContent
    });

    return NextResponse.json({ message: "E-Mail erfolgreich versendet!" }, { status: 200 });

  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error);
    return NextResponse.json({ message: "E-Mail konnte nicht gesendet werden" }, { status: 500 });
  }
}
