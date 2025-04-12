//app\api\address\route.js

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Address from "@/models/Address";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Nicht autorisiert" }, { status: 401 });
  }
  const userId = session.user.id;

  try {
    const address = await Address.findOne({ userId });
    return NextResponse.json({ address });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

