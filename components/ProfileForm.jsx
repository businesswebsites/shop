"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfileForm() {
  const { data: session, status } = useSession();

  // User-Info States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [userLoading, setUserLoading] = useState(false);

  // Address-Info States
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateAddr, setStateAddr] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [label, setLabel] = useState("");
  const [shipping, setShipping] = useState(false);
  const [billing, setBilling] = useState(false);
  const [addressMessage, setAddressMessage] = useState("");
  const [addressLoading, setAddressLoading] = useState(false);

  // Bei Session-Ladung: User-Daten in den State übernehmen
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
    }
  }, [session]);

  // Lade vorhandene Adressdaten, wenn Session vorhanden ist
  useEffect(() => {
    if (session?.user) {
      fetch("/api/address", { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          if (data.address) {
            setStreet(data.address.street || "");
            setCity(data.address.city || "");
            setStateAddr(data.address.state || "");
            setPostalCode(data.address.postalCode || "");
            setCountry(data.address.country || "");
            setIsDefault(data.address.isDefault || false);
            setLabel(data.address.label || "");
            setShipping(data.address.type?.shipping || false);
            setBilling(data.address.type?.billing || false);
          }
        })
        .catch((err) => console.error("Fehler beim Laden der Adresse:", err));
    }
  }, [session]);

  if (status === "loading") return <p>Lade...</p>;
  if (!session) return <p>Bitte logge dich ein.</p>;

  // User-Formular absenden
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setUserLoading(true);
    setUserMessage("");

    if (password && password !== passwordConfirm) {
      setUserMessage("Die Passwörter stimmen nicht überein!");
      setUserLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: session.user.id,
          name,
          email,
          password: password || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Fehler beim Aktualisieren des Profils");

      setUserMessage("Profil erfolgreich aktualisiert!");
      setPassword("");
      setPasswordConfirm("");
    } catch (error) {
      setUserMessage(error.message);
    } finally {
      setUserLoading(false);
    }
  };

  // Address-Formular absenden
  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setAddressLoading(true);
    setAddressMessage("");

    try {
      const res = await fetch("/api/address/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          street,
          city,
          state: stateAddr,
          postalCode,
          country,
          isDefault,
          label,
          type: {
            shipping,
            billing,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Fehler beim Aktualisieren der Adresse");

      setAddressMessage("Adresse erfolgreich aktualisiert!");
    } catch (error) {
      setAddressMessage(error.message);
    } finally {
      setAddressLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      {/* User Profil Formular */}
      <Card className="flex-1">
        <form onSubmit={handleUserSubmit}>
          <CardHeader>
            <CardTitle>Profil bearbeiten</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Dein Name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">E-Mail</label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Deine E-Mail" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">Neues Passwort (optional)</label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Neues Passwort" />
            </div>
            <div>
              <label htmlFor="passwordConfirm" className="block text-sm font-medium">Neues Passwort wiederholen</label>
              <Input id="passwordConfirm" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="Neues Passwort wiederholen" />
            </div>
            {userMessage && <p className="text-sm text-center text-green-600">{userMessage}</p>}
          </CardContent>
          <CardFooter className="mt-5">
            <Button type="submit" disabled={userLoading}>
              {userLoading ? "Speichern..." : "Speichern"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Adress Formular */}
      <Card className="flex-1">
        <form onSubmit={handleAddressSubmit}>
          <CardHeader>
            <CardTitle>Adresse bearbeiten</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="street" className="block text-sm font-medium">Straße</label>
              <Input id="street" type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Straße" />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium">Stadt</label>
              <Input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Stadt" />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium">Bundesland (optional)</label>
              <Input id="state" type="text" value={stateAddr} onChange={(e) => setStateAddr(e.target.value)} placeholder="Bundesland" />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium">Postleitzahl</label>
              <Input id="postalCode" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Postleitzahl" />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium">Land</label>
              <Input id="country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Land" />
            </div>
            <div>
              <label htmlFor="label" className="block text-sm font-medium">Bezeichnung (z. B. Zuhause, Büro)</label>
              <Input id="label" type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Bezeichnung" />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="isDefault" className="text-sm">Standardadresse</label>
              <input id="isDefault" type="checkbox" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="shipping" className="text-sm">Lieferadresse</label>
              <input id="shipping" type="checkbox" checked={shipping} onChange={(e) => setShipping(e.target.checked)} />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="billing" className="text-sm">Rechnungsadresse</label>
              <input id="billing" type="checkbox" checked={billing} onChange={(e) => setBilling(e.target.checked)} />
            </div>
            {addressMessage && <p className="text-sm text-center text-green-600">{addressMessage}</p>}
          </CardContent>
          <CardFooter className="mt-5">
            <Button type="submit" disabled={addressLoading}>
              {addressLoading ? "Speichern..." : "Speichern"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
