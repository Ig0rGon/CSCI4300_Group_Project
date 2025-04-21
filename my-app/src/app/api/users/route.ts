import connectMongoDB from "../../../../config/mongodb";
import User from "@/app/models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already in use" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User has been created" }, { status: 201 });

  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
