import { NextResponse, type NextRequest } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

/**
 * Runs before every page. Sends anyone not signed in to the login page.
 *
 * This only checks that a sign-in cookie exists - the real check happens on
 * each page via `requireUser()`. That's deliberate: this keeps navigation
 * fast, and the page does the security.
 */
export function proxy(request: NextRequest) {
  const isSignedIn = getSessionCookie(request)
  if (!isSignedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|login|_next/static|_next/image|favicon.ico).*)'],
}
