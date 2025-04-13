'use client';

import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';  // Importiere das Cart-Icon
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <span className="text-2xl font-bold text-pink-600 cursor-pointer">
            Dekolust
          </span>
        </Link>

        {/* Navigation Links */}
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className="text-gray-700 hover:text-pink-500 transition">
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/user" className="text-gray-700 hover:text-pink-500 transition">
                  Profil
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Anzeige des Warenkorbs */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/cart" className="text-gray-700 hover:text-pink-500 transition flex items-center">
                  <ShoppingCart size={24} />
                  {/* Du kannst hier auch eine Badge mit der Anzahl der Artikel anzeigen */}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/favorites" className="text-gray-700 hover:text-pink-500 transition flex items-center">
                  <Star size={24} />
                  {/* Du kannst hier auch eine Badge mit der Anzahl der Artikel anzeigen */}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {!session ? (
              <>
                {/* <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/register" className="text-gray-700 hover:text-pink-500 transition">
                      Registrieren
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem> */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/login" className="text-gray-700 hover:text-pink-500 transition">
                      Login
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            ) : (
              <>
                {/* <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/dashboard" className="text-gray-700 hover:text-pink-500 transition">
                      Dashboard
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem> */}
                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="text-gray-700 hover:text-red-500 transition"
                  >
                    Logout
                  </Button>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
