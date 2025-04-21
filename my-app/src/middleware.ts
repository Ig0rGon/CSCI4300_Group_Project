import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

  if (!token) {
    console.log("Not logged in. Redirecting...");
    return NextResponse.redirect(new URL("/main", request.url));
  }

  console.log("User is logged in:", token.email);
  return NextResponse.next();
}

export const config = {
  matcher: ["/post-item", "/edit/:id*"],
};
