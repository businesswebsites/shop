// // components/ProductCard.js
// "use client"

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState } from 'react';
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from '@/components/ui/card';

// export default function ProductCard({ product }) {

//   const [cartCount, setCartCount] = useState(0);

//   const addToCart = () => {
//     setCartCount(cartCount + 1); // Erhöhe die Anzahl im Warenkorb
//     // Speichere das Produkt im Zustand oder API
//   };

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle>{product.name}</CardTitle>
//       </CardHeader>
//       {/* Container mit fester Höhe für das Bild */}
//       <div className="relative w-full h-100">
//         <Image
//           src={product.image}
//           alt={product.name}
//           fill
//           className="object-cover"
//         />
//       </div>
//       <CardContent>
//         <p className="text-gray-600">{product.price}</p>
//       </CardContent>
//       <CardFooter>
//         <Link onClick={addToCart} href={product.link || "#"} className="inline-block px-4 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-800 hover:text-white transition">
//         Zum Warenkorb hinzufügen {cartCount > 0 && `(${cartCount})`}
//         </Link>
//       </CardFooter>
//     </Card>
//   );
// }


// components/ProductCard.js
"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export default function ProductCard({ product }) {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);

  // Produkt zum Warenkorb hinzufügen
  const addToCart = async () => {
    if (session?.user) {
      const response = await fetch(`/api/cart/${session.user.id}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      });

      if (response.ok) {
        setCartCount(cartCount + 1); // Anpassen der Anzahl im UI
        toast.success(`${product.name} zum warenkorb hinzugefügt.`);
      } else {
        // console.error('Fehler beim Hinzufügen zum Warenkorb');
        toast.success(`Fehler beim Hinzufügen zum Warenkorb.`);
      }
    } else {
      toast.success('Du musst eingeloggt sein, um Produkte hinzuzufügen.');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      {/* Container mit fester Höhe für das Bild */}
      <div className="relative w-full h-80">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent>
        <p className="text-gray-600">{product.price} €</p>
      </CardContent>
      <CardFooter>
        <Link onClick={addToCart} href={product.link || "#"} className="inline-block px-4 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-800 hover:text-white transition">
          Zum Warenkorb hinzufügen {cartCount > 0 && `(${cartCount})`}
        </Link>
      </CardFooter>
    </Card>
  );
}
