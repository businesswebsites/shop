// // app/api/paypal/capture-order/route.js
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const { orderID } = await request.json();

//     // 1. Access Token von PayPal abrufen
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
//       console.error("Fehler beim Abrufen des Tokens:", tokenData);
//       throw new Error("Token konnte nicht abgerufen werden.");
//     }

//     // 2. Bestellung erfassen (Capture)
//     const captureResponse = await fetch(
//       `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${tokenData.access_token}`
//         }
//         // Bei diesem Request wird kein Body benötigt
//       }
//     );

//     const captureData = await captureResponse.json();
//     if (!captureResponse.ok) {
//       console.error("Fehler beim Capturen der Bestellung:", captureData);
//       throw new Error("Bestellung konnte nicht erfasst werden.");
//     }

//     // 3. Erfolgreiche Antwort zurückgeben
//     return NextResponse.json(
//       { message: "Zahlung erfolgreich erfasst", capture: captureData },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error capturing PayPal order:", error);
//     return NextResponse.json(
//       { message: "Fehler beim Capturen der Bestellung" },
//       { status: 500 }
//     );
//   }
// }


// app/api/paypal/capture-order/route.js
import { NextResponse } from "next/server";

// Dynamischer Basis-URL auswählen
const baseURL =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

export async function POST(request) {
  try {
    const { orderID } = await request.json();

    // 1. Access Token abrufen
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
      console.error("Fehler beim Abrufen des Tokens:", tokenData);
      throw new Error("Token konnte nicht abgerufen werden.");
    }

    // 2. Bestellung erfassen (Capture)
    const captureResponse = await fetch(
      `${baseURL}/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenData.access_token}`
        }
        // Bei diesem Request wird kein Body benötigt
      }
    );

    const captureData = await captureResponse.json();
    if (!captureResponse.ok) {
      console.error("Fehler beim Capturen der Bestellung:", captureData);
      throw new Error("Bestellung konnte nicht erfasst werden.");
    }

    // 3. Erfolgreiche Antwort zurückgeben
    return NextResponse.json(
      { message: "Zahlung erfolgreich erfasst", capture: captureData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error capturing PayPal order:", error);
    return NextResponse.json(
      { message: "Fehler beim Capturen der Bestellung" },
      { status: 500 }
    );
  }
}
