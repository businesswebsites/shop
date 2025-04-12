// app/cart/confirmation/page.js
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function ConfirmationPage() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 shadow-md text-center">
        <CardHeader>
          <CardTitle className="text-xl mb-4">Bestellbestätigung</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Vielen Dank für deine Bestellung!
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Eine Bestätigungs-E-Mail wurde an deine E-Mail-Adresse gesendet.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            className="w-full bg-blue-500 hover:bg-blue-400 text-white"
            onClick={handleBackToHome}
          >
            Zurück zur Startseite
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
