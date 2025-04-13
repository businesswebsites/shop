// // app/api/paypal/create-order/route.js
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const { totalAmount } = await request.json();
    
//     const auth = Buffer.from(
//       `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
//     ).toString("base64");
    
//     const tokenResponse = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         "Authorization": `Basic ${auth}`
//       },
//       body: "grant_type=client_credentials"
//     });
    
//     const tokenData = await tokenResponse.json();
//     if (!tokenResponse.ok) {
//       throw new Error("Token konnte nicht abgerufen werden.");
//     }
    
//     const orderResponse = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${tokenData.access_token}`
//       },
//       body: JSON.stringify({
//         intent: "CAPTURE",
//         purchase_units: [{
//           amount: {
//             currency_code: "EUR",
//             value: totalAmount
//           }
//         }]
//       })
//     });
    
//     const orderData = await orderResponse.json();
    
//     if (!orderResponse.ok) {
//       throw new Error("Bestellung konnte nicht erstellt werden.");
//     }
    
//     return NextResponse.json({ paypalOrderID: orderData.id }, { status: 201 });
//   } catch (error) {
//     console.error("Error creating PayPal order:", error);
//     return NextResponse.json({ message: "Fehler beim Erstellen der Bestellung" }, { status: 500 });
//   }
// }


// // app/api/paypal/create-order/route.js
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const { totalAmount } = await request.json();
    
//     const auth = Buffer.from(
//       `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
//     ).toString("base64");
    
//     const tokenResponse = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         "Authorization": `Basic ${auth}`
//       },
//       body: "grant_type=client_credentials"
//     });
    
//     const tokenData = await tokenResponse.json();
//     if (!tokenResponse.ok) {
//       throw new Error("Token konnte nicht abgerufen werden.");
//     }
    
//     const orderResponse = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${tokenData.access_token}`
//       },
//       body: JSON.stringify({
//         intent: "CAPTURE",
//         purchase_units: [{
//           amount: {
//             currency_code: "EUR",
//             value: totalAmount
//           }
//         }]
//       })
//     });
    
//     const orderData = await orderResponse.json();
    
//     if (!orderResponse.ok) {
//       throw new Error("Bestellung konnte nicht erstellt werden.");
//     }
    
//     return NextResponse.json({ paypalOrderID: orderData.id }, { status: 201 });
//   } catch (error) {
//     console.error("Error creating PayPal order:", error);
//     return NextResponse.json({ message: "Fehler beim Erstellen der Bestellung" }, { status: 500 });
//   }
// }



// app/api/paypal/create-order/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { totalAmount } = await request.json();
    
    // Dynamischer Basis-URL, analog zum Capture-Endpunkt
    const baseURL =
      process.env.PAYPAL_MODE === "live"
        ? "https://api-m.paypal.com"
        : "https://api-m.sandbox.paypal.com";

    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");
    
    const tokenResponse = await fetch(`${baseURL}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${auth}`
      },
      body: "grant_type=client_credentials"
    });
    
    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok) {
      throw new Error("Token konnte nicht abgerufen werden.");
    }
    
    const orderResponse = await fetch(`${baseURL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokenData.access_token}`
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          amount: {
            currency_code: "EUR",
            value: totalAmount
          }
        }]
      })
    });
    
    const orderData = await orderResponse.json();
    
    if (!orderResponse.ok) {
      throw new Error("Bestellung konnte nicht erstellt werden.");
    }
    
    return NextResponse.json({ paypalOrderID: orderData.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    return NextResponse.json({ message: "Fehler beim Erstellen der Bestellung" }, { status: 500 });
  }
}
