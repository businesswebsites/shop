import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Address from "@/models/Address";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Nicht autorisiert" }, { status: 401 });
  }
  const userId = session.user.id;

  const { street, city, state, postalCode, country, isDefault, label, type } = await request.json();

  const updateData = { street, city, state, postalCode, country, isDefault, label, type };

  try {
    let address = await Address.findOne({ userId });
    if (address) {
      await Address.findOneAndUpdate({ userId }, updateData);
    } else {
      address = await Address.create({ userId, ...updateData });
    }
    return NextResponse.json({ message: "Adresse aktualisiert", address });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
