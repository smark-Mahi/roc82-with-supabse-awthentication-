import { db } from "../../../lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

const userSchema = z.object({
  name: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, name, password } = userSchema.parse(body);
    //check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "user with this email already exists" },
        { status: 409 }
      );
    }

    const hashPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
