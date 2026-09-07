import { NextRequest } from 'next/server'
import crypto from 'crypto'

export interface AdminSession {
  adminId: string
  timestamp: number
}

/**
 * Get session secret (runtime check only)
 */
function getSessionSecret(): string {
  const secret = process.env.JWT_SECRET
  if (secret) return secret
  
  // Only throw at runtime in production without CI
  if (process.env.NODE_ENV === 'production' && !process.env.CI) {
    throw new Error('JWT_SECRET environment variable is required in production')
  }
  
  // Development/CI fallback
  return 'dev-secret-do-not-use-in-production'
}

/**
 * Validates the super admin session from the request cookies
 * @returns { valid: boolean, adminId?: string, error?: string }
 */
export async function validateAdminSession(request: NextRequest): Promise<{ valid: boolean; adminId?: string; error?: string }> {
  try {
    const sessionToken = request.cookies.get('super_admin_session')?.value

    if (!sessionToken) {
      return { valid: false, error: 'No session token' }
    }

    // Decode and validate session token
    const parts = sessionToken.split(':')
    if (parts.length !== 3) {
      return { valid: false, error: 'Invalid session format' }
    }

    const [adminId, timestamp, hmac] = parts

    if (!adminId || !timestamp || !hmac) {
      return { valid: false, error: 'Invalid session format' }
    }

    // Verify HMAC signature
    const tokenData = `${adminId}:${timestamp}`
    const expectedHmac = crypto.createHmac('sha256', getSessionSecret()).update(tokenData).digest('hex')
    if (hmac !== expectedHmac) {
      return { valid: false, error: 'Invalid session signature' }
    }

    // Check if session is expired (30 minutes)
    const sessionAge = Date.now() - parseInt(timestamp)
    const MAX_SESSION_AGE = 30 * 60 * 1000 // 30 minutes

    if (sessionAge > MAX_SESSION_AGE) {
      return { valid: false, error: 'Session expired' }
    }

    return { valid: true, adminId }
  } catch (error) {
    return { valid: false, error: 'Invalid session token' }
  }
}

/**
 * Creates an unauthorized response
 */
export function unauthorizedResponse(message: string = 'Unauthorized') {
  return new Response(JSON.stringify({ error: message }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' }
  })
}
