'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

export default function RegisterComponent() {
  const router = useRouter();
  const [serverError, setServerError] = useState(null);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password2: ''
    }
  });

  const onSubmit = async (data) => {
    if (data.password !== data.password2) {
      setServerError('Die Passwörter stimmen nicht überein.');
      return;
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (!res.ok) {
      setServerError(result.errors?.[0]?.message || 'Ein Fehler ist aufgetreten.');
    } else {
      router.push('/login'); // Nach erfolgreicher Registrierung weiterleiten
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg bg-white rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Registriere dich bei</CardTitle>
          <h1 className="text-3xl font-pacifico text-red-600">Dekolust</h1>
        </CardHeader>
        <CardContent>
          {serverError && <p className="text-red-500 text-center">{serverError}</p>}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: 'Name ist erforderlich' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Max Mustermann" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                rules={{ required: 'E-Mail ist erforderlich', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Ungültige E-Mail-Adresse' } }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-Mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="max@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                rules={{ required: 'Passwort ist erforderlich', minLength: { value: 6, message: 'Mindestens 6 Zeichen' } }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passwort</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password2"
                rules={{ required: 'Passwort bestätigen ist erforderlich' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passwort bestätigen</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-red-500 text-white hover:bg-red-600 transition">
                Registrieren
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-600">
            Hast du schon ein Konto?{' '}
            <Link href="/login" className="text-red-500 hover:underline">
              Hier einloggen
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
