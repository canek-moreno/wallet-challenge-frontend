import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/mock-api/services/authService";

export function proxy(request: NextRequest) {
  if (request.cookies.has(SESSION_COOKIE)) return NextResponse.next();
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: [
    "/",
    "/products/:path*",
    "/transactions/:path*",
    "/contacts/:path*",
    "/transfer/:path*",
    "/statements/:path*",
    "/receive/:path*",
    "/bill-payments/:path*",
  ],
};
