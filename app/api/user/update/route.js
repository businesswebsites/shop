import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(request) {
  await dbConnect();

  const { id, name, email, password } = await request.json();

  if (!id) {
    return NextResponse.json({ message: "User ID fehlt" }, { status: 400 });
  }

  const updateData = { name, email };
  if (password) {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(password, salt);
  }

  try {
    // Update des Users anhand der übergebenen ID (die _id bleibt erhalten)
    await User.findByIdAndUpdate(id, updateData);
    return NextResponse.json({ message: "Profil aktualisiert" });
  } catch (error) {
    return NextResponse.json({ message: "Fehler: " + error.message }, { status: 500 });
  }
}
