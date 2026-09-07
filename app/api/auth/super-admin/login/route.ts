import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getSupabaseServiceRoleClient } from '@/lib/supabase/server'

// Rate limiting: Store attempts in memory (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const MAX_ATTEMPTS = 5
const LOCKOUT_TIME = 15 * 60 * 1000 // 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + LOCKOUT_TIME })
    return true
  }

  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + LOCKOUT_TIME })
    return true
  }

  if (record.count >= MAX_ATTEMPTS) {
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      )
    }

    // Get Supabase service role client (required for super_admins table access)
    const supabase = getSupabaseServiceRoleClient()
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

    // Query super admin from database
    const { data: admin, error: adminError } = await supabase
      .from('super_admins')
      .select('*')
      .eq('email', email.toLowerCase())
      .single()

    if (adminError || !admin) {
      // Log failed attempt
      await logAuditLog(supabase, null, 'LOGIN_FAILED', 'super_admin', { email }, ip, request.headers.get('user-agent'), false)
      
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check if account is active
    if (!admin.is_active) {
      await logAuditLog(supabase, admin.id, 'LOGIN_FAILED', 'super_admin', { email, reason: 'account_inactive' }, ip, request.headers.get('user-agent'), false)
      
      return NextResponse.json(
        { error: 'Account is inactive. Please contact support.' },
        { status: 403 }
      )
    }

    // Check if account is locked
    if (admin.account_locked_until && new Date(admin.account_locked_until) > new Date()) {
      await logAuditLog(supabase, admin.id, 'LOGIN_FAILED', 'super_admin', { email, reason: 'account_locked' }, ip, request.headers.get('user-agent'), false)
      
      return NextResponse.json(
        { error: 'Account is temporarily locked due to multiple failed attempts. Please try again later.' },
        { status: 403 }
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash)
    
    if (!isPasswordValid) {
      // Increment failed attempts
      const newFailedAttempts = (admin.failed_login_attempts || 0) + 1
      const updateData: any = {
        failed_login_attempts: newFailedAttempts,
        last_failed_login: new Date().toISOString()
      }

      // Lock account after 5 failed attempts
      if (newFailedAttempts >= 5) {
        updateData.account_locked_until = new Date(Date.now() + LOCKOUT_TIME).toISOString()
      }

      await supabase
        .from('super_admins')
        .update(updateData)
        .eq('id', admin.id)

      await logAuditLog(supabase, admin.id, 'LOGIN_FAILED', 'super_admin', { email, failed_attempts: newFailedAttempts }, ip, request.headers.get('user-agent'), false)
      
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Reset failed attempts on successful login
    await supabase
      .from('super_admins')
      .update({
        failed_login_attempts: 0,
        last_failed_login: null,
        account_locked_until: null
      })
      .eq('id', admin.id)

    // Log successful login
    await logAuditLog(supabase, admin.id, 'LOGIN_SUCCESS', 'super_admin', { email }, ip, request.headers.get('user-agent'), true)

    // Create session token (in production, use JWT)
    const sessionToken = Buffer.from(`${admin.id}:${Date.now()}`).toString('base64')

    // Create response with httpOnly cookie
    const response = NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        role: 'super_admin'
      }
    })

    // Set httpOnly cookie
    response.cookies.set('super_admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 60, // 30 minutes
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function logAuditLog(
  supabase: any,
  adminId: string | null,
  action: string,
  resource: string,
  details: any,
  ipAddress: string | null,
  userAgent: string | null,
  success: boolean
) {
  try {
    await supabase.rpc('log_admin_action', {
      p_admin_id: adminId,
      p_action: action,
      p_resource: resource,
      p_details: details,
      p_ip_address: ipAddress,
      p_user_agent: userAgent,
      p_success: success
    })
  } catch (error) {
    console.error('Failed to log audit:', error)
  }
}
