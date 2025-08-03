import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define which routes are protected
const protectedRoutes = ["/home", "/profile"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // Check if the route is protected
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If protected and no token, redirect to landing page (/)
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If everything is fine, allow the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/profile/:path*"],
};