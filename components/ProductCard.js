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


// // components/ProductCard.js
// "use client"

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
// import { useSession } from 'next-auth/react';
// import { toast } from 'sonner';

// export default function ProductCard({ product }) {
//   const { data: session } = useSession();
//   const [cartCount, setCartCount] = useState(0);

//   // Produkt zum Warenkorb hinzufügen
//   const addToCart = async () => {
//     if (session?.user) {
//       const response = await fetch(`/api/cart/${session.user.id}/add`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           productId: product._id,
//         }),
//       });

//       if (response.ok) {
//         setCartCount(cartCount + 1); // Anpassen der Anzahl im UI
//         toast.success(`${product.name} zum warenkorb hinzugefügt.`);
//       } else {
//         // console.error('Fehler beim Hinzufügen zum Warenkorb');
//         toast.success(`Fehler beim Hinzufügen zum Warenkorb.`);
//       }
//     } else {
//       toast.success('Du musst eingeloggt sein, um Produkte hinzuzufügen.');
//     }
//   };

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle>{product.name}</CardTitle>
//       </CardHeader>
//       {/* Container mit fester Höhe für das Bild */}
//       <div className="relative w-full h-80">
//         <Image
//           src={product.image}
//           alt={product.name}
//           fill
//           className="object-cover"
//         />
//       </div>
//       <CardContent>
//         <p className="text-gray-600">{product.price} €</p>
//       </CardContent>
//       <CardFooter>
//         <Link onClick={addToCart} href={product.link || "#"} className="inline-block px-4 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-800 hover:text-white transition">
//           Zum Warenkorb hinzufügen {cartCount > 0 && `(${cartCount})`}
//         </Link>
//         <Link href={`/products/${product._id}`} className="inline-block px-4 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-800 hover:text-white transition">
//           Zum Produkt ansehen
//         </Link>

//       </CardFooter>
//     </Card>
//   );
// }



// components/ProductCard.js
"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react';

export default function ProductCard({ product }) {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);

  const addToCart = async (e) => {
    e.preventDefault(); // Verhindern, dass der Button als Link agiert.
    if (session?.user) {
      const response = await fetch(`/api/cart/${session.user.id}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product._id }),
      });
  
      if (response.ok) {
        setCartCount(cartCount + 1);
        toast.success(`${product.name} zum Warenkorb hinzugefügt.`);
      } else {
        toast.error(`Fehler beim Hinzufügen zum Warenkorb.`);
      }
    } else {
      toast.error('Du musst eingeloggt sein, um Produkte hinzuzufügen.');
    }
  };

  const addFavorite = async (e) => {
    e.preventDefault();
    if (session?.user) {
      const response = await fetch(`/api/favorites/${session.user.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product._id }),
      });
      if (response.ok) {
        toast.success(`${product.name} zu deinen Favoriten hinzugefügt.`);
      } else {
        toast.error('Fehler beim Hinzufügen zu Favoriten.');
      }
    } else {
      toast.error('Bitte logge dich ein, um Favoriten zu speichern.');
    }
  };
  const [favorites, setFavorites] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (session?.user) {
      const fetchFavorites = async () => {
        try {
          const res = await fetch(`/api/favorites/${session.user.id}`);
          const data = await res.json();
          setFavorites(data);
        } catch (error) {
          toast.error('Fehler beim Abrufen der Favoriten.');
        }
      };
      fetchFavorites();
    }
  }, [session]);

  useEffect(() => {
    setIsFavorited(favorites.includes(product._id));
  }, [favorites, product._id]);

  const toggleFavorite = async (e) => {
    e.preventDefault();
    if (session?.user) {
      // Wenn das Produkt noch nicht favorisiert ist, wird es hinzugefügt, ansonsten entfernt
      if (!isFavorited) {
        const response = await fetch(`/api/favorites/${session.user.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: product._id }),
        });
        if (response.ok) {
          setFavorites(prev => [...prev, product._id]);
          toast.success(`${product.name} zu deinen Favoriten hinzugefügt.`);
        } else {
          toast.error('Fehler beim Hinzufügen zu Favoriten.');
        }
      } else {
        const response = await fetch(`/api/favorites/${session.user.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: product._id }),
        });
        if (response.ok) {
          setFavorites(prev => prev.filter(id => id !== product._id));
          toast.success(`${product.name} wurde aus deinen Favoriten entfernt.`);
        } else {
          toast.error('Fehler beim Entfernen aus Favoriten.');
        }
      }
    } else {
      toast.error('Bitte logge dich ein, um Favoriten zu speichern.');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>

      {/* Fester Bildcontainer */}
      <div className="relative w-full h-80">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="flex  items-center">
        <p className="text-gray-600">{product.price} €</p>
        {/* <Star fill="#FFD700" onClick={addFavorite} className='cursor-pointer ml-5'/> */}
        <Star 
          onClick={toggleFavorite} 
          className="cursor-pointer ml-auto" 
          // Das Icon wird gefüllt (z. B. Gold) wenn favorisiert, ansonsten bleibt es unfilled
          fill={isFavorited ? "#FFD700" : "none"}
          stroke={isFavorited ? "none" : "currentColor"}
        />
      </CardContent>

      <CardFooter className="flex flex-col space-y-2 ">
        {/* Warenkorb-Button */}
        <Button className="cursor-pointer" variant="outline" onClick={addToCart}>
          In den Warenkorb {cartCount > 0 && `(${cartCount})`}
        </Button>
        {/* Link-Button zum Produkt */}
        <Link href={`/products/${product._id}`} passHref>
          <Button variant="default" asChild>
            <span>Produktinformation</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
