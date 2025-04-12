'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from "sonner";

export default function LoginComponent() {
  const router = useRouter();
  const [serverError, setServerError] = useState(null);

  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password
    });

    if (res.error) {
      setServerError(res.error);
    } else {
      toast.success("Erfolgreich eingeloggt!");
      router.push('/'); // Erfolgreich: Weiterleitung zum Dashboard
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg bg-white rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Melde dich an bei</CardTitle>
          <h1 className="text-3xl font-pacifico text-red-600">Dekolust</h1>
        </CardHeader>
        <CardContent>
          {serverError && <p className="text-red-500 text-center">{serverError}</p>}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: 'E-Mail ist erforderlich',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Ungültige E-Mail-Adresse'
                  }
                }}
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
                rules={{ required: 'Passwort ist erforderlich' }}
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
              <Button type="submit" className="w-full bg-red-500 text-white hover:bg-red-600 transition">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-600">
            Noch keinen Account?{' '}
            <Link href="/register" className="text-red-500 hover:underline">
              Registriere dich hier
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
