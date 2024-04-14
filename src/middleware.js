import { NextResponse } from "next/server";

export function middleware(request) {
  const authToken = request.cookies.get("username")?.value;
  if (!authToken) {
    const response = NextResponse.rewrite(new URL("/login", request.url), {
      status: 303,
    });
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
