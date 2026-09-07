/**
 * Rate limiting utility
 * 
 * For production: Use Redis or a similar distributed cache
 * For development: Uses in-memory Map (will reset on server restart)
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory store (development only)
const rateLimitMap = new Map<string, RateLimitEntry>()

// Configuration
const MAX_ATTEMPTS = 5
const LOCKOUT_TIME = 15 * 60 * 1000 // 15 minutes

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @returns true if allowed, false if rate limited
 */
export function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  if (!record) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + LOCKOUT_TIME })
    return true
  }

  // Reset if lockout period has passed
  if (now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + LOCKOUT_TIME })
    return true
  }

  // Check if limit exceeded
  if (record.count >= MAX_ATTEMPTS) {
    return false
  }

  // Increment counter
  record.count++
  return true
}

/**
 * Get remaining attempts and reset time for a rate limit entry
 * @param identifier - Unique identifier
 */
export function getRateLimitInfo(identifier: string): { remaining: number; resetTime: number } {
  const record = rateLimitMap.get(identifier)
  const now = Date.now()

  if (!record || now > record.resetTime) {
    return { remaining: MAX_ATTEMPTS, resetTime: now + LOCKOUT_TIME }
  }

  return {
    remaining: Math.max(0, MAX_ATTEMPTS - record.count),
    resetTime: record.resetTime
  }
}

/**
 * Reset rate limit for an identifier (e.g., after successful login)
 * @param identifier - Unique identifier
 */
export function resetRateLimit(identifier: string): void {
  rateLimitMap.delete(identifier)
}

/**
 * Clean up expired entries (call periodically to prevent memory leaks)
 */
export function cleanupExpiredEntries(): void {
  const now = Date.now()
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}

// Cleanup expired entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupExpiredEntries, 5 * 60 * 1000)
}
