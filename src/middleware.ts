import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth
    const { pathname } = req.nextUrl

    // Admin area requires an admin role
    if (pathname.startsWith('/admin') && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    // Host area requires a host (or admin) role
    if (
      (pathname.startsWith('/host') || pathname.startsWith('/dashboard')) &&
      token?.role !== 'host' &&
      token?.role !== 'admin'
    ) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  },
  {
    // Must match the secret used to sign the JWT in src/lib/auth.ts.
    secret:
      process.env.NEXTAUTH_SECRET ||
      'roammate-demo-secret-change-me-in-production',
    callbacks: {
      // Returning false (no token) sends the user to the signIn page below.
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/auth/login',
    },
  }
)

// Any route a user can take an ACTION on must be authenticated.
// Browsing (home, search, viewing a property) stays public.
export const config = {
  matcher: [
    '/host/:path*',
    '/dashboard/:path*',
    '/admin/:path*',
    '/booking/:path*',
  ],
}
