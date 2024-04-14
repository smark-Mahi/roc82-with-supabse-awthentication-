import { db } from "../../../lib/db";
import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import * as z from "zod";

const userSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = userSchema.parse(body);
    //check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (!existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "user with this email doesn't exists" },
        { status: 400 }
      );
    }

    //check if password is correct
    const existingUserByPassword = await compare(
      password,
      existingUserByEmail.password
    );
    if (!existingUserByPassword) {
      return NextResponse.json(
        { user: null, message: "password is incorrect" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        user: {
          id: existingUserByEmail.id + "",
          name: existingUserByEmail.name,
          email: existingUserByEmail.email,
        },
        message: "User loggedin successfully",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
