import crypto from 'crypto'

const CSRF_TOKEN_COOKIE = 'csrf_token'
const CSRF_TOKEN_HEADER = 'x-csrf-token'

/**
 * Get CSRF secret (runtime check only)
 */
function getCSRFSecret(): string {
  const secret = process.env.CSRF_SECRET
  if (secret) return secret
  
  // Only throw at runtime in production without CI
  if (process.env.NODE_ENV === 'production' && !process.env.CI) {
    throw new Error('CSRF_SECRET environment variable is required in production')
  }
  
  // Development/CI fallback
  return 'dev-csrf-secret-do-not-use-in-production'
}

/**
 * Generate a CSRF token
 * @returns CSRF token
 */
export function generateCSRFToken(): string {
  const timestamp = Date.now()
  const random = crypto.randomBytes(32).toString('hex')
  const data = `${timestamp}:${random}`
  const hmac = crypto.createHmac('sha256', getCSRFSecret()).update(data).digest('hex')
  return `${data}:${hmac}`
}

/**
 * Validate a CSRF token
 * @param token - The CSRF token to validate
 * @returns true if valid, false otherwise
 */
export function validateCSRFToken(token: string): boolean {
  try {
    const parts = token.split(':')
    if (parts.length !== 3) {
      return false
    }

    const [timestamp, random, hmac] = parts

    // Check if token is expired (1 hour)
    const tokenAge = Date.now() - parseInt(timestamp)
    const MAX_TOKEN_AGE = 60 * 60 * 1000 // 1 hour

    if (tokenAge > MAX_TOKEN_AGE) {
      return false
    }

    // Verify HMAC signature
    const data = `${timestamp}:${random}`
    const expectedHmac = crypto.createHmac('sha256', getCSRFSecret()).update(data).digest('hex')
    
    return hmac === expectedHmac
  } catch (error) {
    return false
  }
}

/**
 * Get CSRF token from request
 * Checks both header and cookie
 */
export function getCSRFTokenFromRequest(request: Request): string | null {
  // Check header first
  const headerToken = request.headers.get(CSRF_TOKEN_HEADER)
  if (headerToken) {
    return headerToken
  }

  // Check cookie (for form submissions)
  const cookieHeader = request.headers.get('cookie')
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map(c => c.trim())
    const csrfCookie = cookies.find(c => c.startsWith(`${CSRF_TOKEN_COOKIE}=`))
    if (csrfCookie) {
      return csrfCookie.split('=')[1]
    }
  }

  return null
}

/**
 * Middleware to validate CSRF token for state-changing requests
 * Use this in API routes for POST, PUT, DELETE, PATCH requests
 */
export function validateCSRF(request: Request): { valid: boolean; error?: string } {
  // Skip validation for GET, HEAD, OPTIONS
  const method = request.method.toUpperCase()
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    return { valid: true }
  }

  const token = getCSRFTokenFromRequest(request)
  
  if (!token) {
    return { valid: false, error: 'CSRF token missing' }
  }

  if (!validateCSRFToken(token)) {
    return { valid: false, error: 'Invalid CSRF token' }
  }

  return { valid: true }
}

/**
 * Create a CSRF error response
 */
export function csrfErrorResponse(message: string = 'Invalid CSRF token') {
  return new Response(JSON.stringify({ error: message }), {
    status: 403,
    headers: { 'Content-Type': 'application/json' }
  })
}
