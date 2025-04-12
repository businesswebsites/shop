// app/api/auth/register/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(request) {
  await dbConnect();
  const { name, email, password, password2 } = await request.json();

  if (!name || !email || !password || !password2) {
    return NextResponse.json(
      { errors: [{ message: "Bitte alle Felder ausfüllen" }] },
      { status: 400 }
    );
  }
  if (password !== password2) {
    return NextResponse.json(
      { errors: [{ message: "Passwörter stimmen nicht überein" }] },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { errors: [{ message: "Ein Nutzer mit dieser E-Mail existiert bereits" }] },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return NextResponse.json({ message: "Registrierung erfolgreich" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { errors: [{ message: error.message || "Ein Fehler ist aufgetreten." }] },
      { status: 500 }
    );
  }
}
