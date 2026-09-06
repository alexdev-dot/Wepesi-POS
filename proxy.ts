import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const sessionToken = request.cookies.get('super_admin_session')?.value

    if (!sessionToken) {
      // Redirect to login if no session
      const loginUrl = new URL('/super-admin-login', request.url)
      return NextResponse.redirect(loginUrl)
    }

    // Basic validation of session token format
    // In production, validate against database or verify JWT
    try {
      const decoded = Buffer.from(sessionToken, 'base64').toString('utf-8')
      const [adminId, timestamp] = decoded.split(':')

      if (!adminId || !timestamp) {
        const loginUrl = new URL('/super-admin-login', request.url)
        return NextResponse.redirect(loginUrl)
      }

      // Check if session is expired (30 minutes)
      const sessionAge = Date.now() - parseInt(timestamp)
      const MAX_SESSION_AGE = 30 * 60 * 1000 // 30 minutes

      if (sessionAge > MAX_SESSION_AGE) {
        const loginUrl = new URL('/super-admin-login', request.url)
        const response = NextResponse.redirect(loginUrl)
        response.cookies.delete('super_admin_session')
        return response
      }
    } catch (error) {
      const loginUrl = new URL('/super-admin-login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}
