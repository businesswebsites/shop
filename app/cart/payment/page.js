// //app\cart\payment\page.js
// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
// import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { faPaypal } from "@fortawesome/free-brands-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// export default function PaymentPage() {
//   const router = useRouter();
//   const form = useForm();

//   const onSubmit = (data) => {
//     console.log("Zahlungsdaten:", data);
//     router.push("/cart/confirmation");
//   };

//   // const handlePayment = async () => {
//   //   try {
//   //     const response = await fetch("/api/order", { method: "POST" });
  
//   //     if (response.ok) {
//   //       alert("Bestellung erfolgreich!");
//   //     } else {
//   //       const data = await response.json();
//   //       alert("Fehler: " + data.message);
//   //     }
//   //   } catch (error) {
//   //     console.error("Fehler bei der Zahlung:", error);
//   //   }
//   // };

//   // const handleSendEmail = async (orderId) => {
//   //   try {
//   //     const response = await fetch("/api/order/email", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({ orderId })
//   //     });
  
//   //     const data = await response.json();
//   //     if (response.ok) {
//   //       alert("Bestellung wurde per E-Mail gesendet!");
//   //     } else {
//   //       alert("Fehler: " + data.message);
//   //     }
//   //   } catch (error) {
//   //     console.error("Fehler beim Senden der E-Mail:", error);
//   //   }
//   // };
//   const handlePaymentAndSendEmail = async () => {
//     try {
//       // 1️⃣ Bestellung in die MongoDB speichern
//       const response = await fetch("/api/order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });
  
//       if (!response.ok) {
//         const data = await response.json();
//         alert("Fehler bei der Zahlung: " + data.message);
//         return;
//       }
  
//       // 2️⃣ Bestellung erfolgreich → ID aus der Antwort holen
//       const { orderId } = await response.json(); // Jetzt erhältst du die orderId aus der Antwort
//       console.log("Bestellung gespeichert mit ID:", orderId);
  
//       if (!orderId) {
//         alert("Bestellung nicht gefunden!");
//         return;
//       }
  
//       // 3️⃣ Bestellung in der DB suchen, um sicherzustellen, dass sie vorhanden ist
//       const checkOrderResponse = await fetch(`/api/order/${orderId}`, { method: "GET" });
  
//       if (!checkOrderResponse.ok) {
//         const checkOrderData = await checkOrderResponse.json();
//         alert("Bestellung nicht gefunden, Fehler: " + checkOrderData.message);
//         return;
//       }
  
//       // 4️⃣ Bestellung per E-Mail senden
//       const emailResponse = await fetch("/api/order/email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ orderId }),
//       });
  
//       const emailData = await emailResponse.json();
  
//       if (emailResponse.ok) {
//         alert("Bestellung erfolgreich & E-Mail gesendet!");
//       } else {
//         alert("Fehler beim Senden der E-Mail: " + emailData.message);
//       }
//     } catch (error) {
//       console.error("Fehler:", error);
//       alert("Es ist ein unerwarteter Fehler aufgetreten.");
//     }
//   };
  
  
  

//   return (
//     <section className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
//       <Card className="w-full max-w-lg p-6 shadow-md">
//         <CardHeader>
//           <CardTitle className="text-center text-xl">Zahlung</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
//               <FormField
//                 control={form.control}
//                 name="cardName"
//                 rules={{ required: "Name auf der Karte ist erforderlich." }}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Name auf Karte</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Max Mustermann" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="cardNumber"
//                 rules={{ required: "Kartennummer ist erforderlich." }}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Kartennummer</FormLabel>
//                     <FormControl>
//                       <Input placeholder="xxxx-xxxx-xxxx-xxxx" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <div className="grid grid-cols-2 gap-4">
//                 <FormField
//                   control={form.control}
//                   name="expiry"
//                   rules={{ required: "Ablaufdatum ist erforderlich." }}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Ablaufdatum</FormLabel>
//                       <FormControl>
//                         <Input placeholder="MM/YY" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="cvv"
//                   rules={{ required: "CVV ist erforderlich." }}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>CVV</FormLabel>
//                       <FormControl>
//                         <Input placeholder="•••" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <FontAwesomeIcon icon={faPaypal} />
//               <CardFooter className="flex flex-col gap-4">
//                 <div className="text-lg font-semibold">Gesamt: 79,99 €</div>
//                 <Button className="w-full">Jetzt bezahlen</Button>
                
//               </CardFooter>
//             </form>
//           </Form>
//         </CardContent>
//         <Button onClick={handlePaymentAndSendEmail}>Jetzt bezahlen & Bestätigung senden</Button>
//       </Card>
      
//     </section>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PaymentPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [totalPrice, setTotalPrice] = useState(0);

  // Hole den Warenkorb des eingeloggten Benutzers und berechne den Gesamtpreis
  useEffect(() => {
    if (session?.user) {
      fetch(`/api/cart/${session.user.id}`)
        .then(response => response.json())
        .then(data => {
          const total = data.items.reduce((sum, item) => {
            return sum + parseFloat(item.productId.price) * item.quantity;
          }, 0);
          setTotalPrice(total);
        });
    }
  }, [session]);

  const handlePayPalPayment = async () => {
    try {
      // Bestellung in die MongoDB speichern
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const data = await response.json();
        alert("Fehler bei der Zahlung: " + data.message);
        return;
      }

      const { orderId } = await response.json();
      console.log("Bestellung gespeichert mit ID:", orderId);

      if (!orderId) {
        alert("Bestellung nicht gefunden!");
        return;
      }

      // Überprüfen, ob die Bestellung in der DB existiert
      const checkOrderResponse = await fetch(`/api/order/${orderId}`, { method: "GET" });
      if (!checkOrderResponse.ok) {
        const checkOrderData = await checkOrderResponse.json();
        alert("Bestellung nicht gefunden, Fehler: " + checkOrderData.message);
        return;
      }

      // Bestätigungsemail senden
      const emailResponse = await fetch("/api/order/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const emailData = await emailResponse.json();

      if (emailResponse.ok) {
        alert("Bestellung erfolgreich & E-Mail gesendet!");
        router.push("/cart/confirmation");
      } else {
        alert("Fehler beim Senden der E-Mail: " + emailData.message);
      }
    } catch (error) {
      console.error("Fehler:", error);
      alert("Es ist ein unerwarteter Fehler aufgetreten.");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 shadow-md text-center">
        <CardHeader>
          <CardTitle className="text-xl mb-4">Mit PayPal bezahlen</CardTitle>
          {/* Zentriert das PayPal Symbol */}
          <div className="flex justify-center mb-4">
            <FontAwesomeIcon icon={faPaypal} className="text-blue-600 text-5xl" />
          </div>
        </CardHeader>
        <CardContent className="mt-6">
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Du wirst mit deinem PayPal-Konto verbunden, um die Zahlung sicher abzuschließen.
          </p>
          <div className="text-lg font-semibold mb-4">
            Gesamtbetrag: {totalPrice.toFixed(2)} €
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black"
            onClick={handlePayPalPayment}
          >
            <FontAwesomeIcon icon={faPaypal} className="mr-2" />
            Mit PayPal bezahlen
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
