import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Paths that require authentication
const protectedPaths = ['/dashboard', '/profile', '/bookings', '/wishlist', '/admin'];

// Paths that should redirect authenticated users
const authPaths = ['/login', '/signup'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const nextAuthSecret = process.env.NEXTAUTH_SECRET;

  if (!nextAuthSecret) {
    return new NextResponse('Authentication is not configured.', { status: 500 });
  }

  // Get NextAuth session token with production-ready configuration
  const token = await getToken({
    req,
    secret: nextAuthSecret,
    cookieName: process.env.NODE_ENV === 'production'
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token',
  });

  // Check if path requires authentication
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  const isAuthPath = authPaths.some(path => pathname.startsWith(path));

  // Redirect to login if trying to access protected route without token
  if (isProtectedPath && !token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if trying to access auth route while authenticated
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (handled by NextAuth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
