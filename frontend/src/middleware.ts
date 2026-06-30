import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_PATHS = ["/login", "/register"];
const PROTECTED_PREFIXES = ["/", "/projects", "/members", "/purchase-orders", "/invoices"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  const isAuthPage = AUTH_PATHS.includes(pathname);
  const isProtected =
    pathname === "/" ||
    PROTECTED_PREFIXES.some(
      (p) => p !== "/" && (pathname === p || pathname.startsWith(`${p}/`))
    );

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/projects/:path*", "/members/:path*", "/purchase-orders/:path*", "/invoices/:path*"],
};
