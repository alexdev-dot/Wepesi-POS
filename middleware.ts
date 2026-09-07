import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Session secret for signing tokens (in production, use a proper secret from env)
const SESSION_SECRET = process.env.JWT_SECRET || (() => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET environment variable is required in production')
  }
  // Development fallback
  return 'dev-secret-do-not-use-in-production'
})()

/**
 * Validates the super admin session from the request cookies
 * Uses Web Crypto API for Edge Runtime compatibility
 */
async function validateAdminSession(request: NextRequest): Promise<{ valid: boolean; adminId?: string }> {
  try {
    const sessionToken = request.cookies.get('super_admin_session')?.value

    if (!sessionToken) {
      return { valid: false }
    }

    // Decode and validate session token
    const parts = sessionToken.split(':')
    if (parts.length !== 3) {
      return { valid: false }
    }

    const [adminId, timestamp, hmac] = parts

    if (!adminId || !timestamp || !hmac) {
      return { valid: false }
    }

    // Verify HMAC signature using Web Crypto API
    const tokenData = `${adminId}:${timestamp}`
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(SESSION_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(tokenData)
    )
    const expectedHmac = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    if (hmac !== expectedHmac) {
      return { valid: false }
    }

    // Check if session is expired (30 minutes)
    const sessionAge = Date.now() - parseInt(timestamp)
    const MAX_SESSION_AGE = 30 * 60 * 1000 // 30 minutes

    if (sessionAge > MAX_SESSION_AGE) {
      return { valid: false }
    }

    return { valid: true, adminId }
  } catch (error) {
    return { valid: false }
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // Allow login page
    if (pathname === '/super-admin-login') {
      return NextResponse.next()
    }

    // Validate session for all other admin routes
    const session = await validateAdminSession(request)
    
    if (!session.valid) {
      // Redirect to login for page requests
      if (request.headers.get('accept')?.includes('text/html')) {
        const loginUrl = new URL('/super-admin-login', request.url)
        return NextResponse.redirect(loginUrl)
      }
      
      // Return 401 for API requests
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all admin routes
    '/admin/:path*',
    '/super-admin-login',
  ],
}
