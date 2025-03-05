import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Paths that don't require authentication
  const publicPaths = ['/login', '/register', '/verify-email', '/api/auth'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  
  // Check if the path is public
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // Get the session token
  const session = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  // If no session, redirect to login
  if (!session) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }
  
  // Check if email is verified
  if (session.emailVerified === false) {
    return NextResponse.redirect(new URL('/email-verification-required', request.url));
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};