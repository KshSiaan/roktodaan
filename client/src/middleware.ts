import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token"); // Access cookies correctly

  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup")
  ) {
    if (token) {
      // Redirect to "/" if the token exists
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  // If no redirect is needed, continue to the requested route
  return NextResponse.next();
}

// Configure the matcher for the middleware
export const config = {
  matcher: ["/login", "/signup"],
};
