import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServiceRoleClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('super_admin_session')?.value

    if (!sessionToken) {
      return NextResponse.json(
        { valid: false, error: 'No session token' },
        { status: 401 }
      )
    }

    // Decode and validate session token
    try {
      const decoded = Buffer.from(sessionToken, 'base64').toString('utf-8')
      const [adminId, timestamp] = decoded.split(':')

      if (!adminId || !timestamp) {
        return NextResponse.json(
          { valid: false, error: 'Invalid session format' },
          { status: 401 }
        )
      }

      // Check if session is expired (30 minutes)
      const sessionAge = Date.now() - parseInt(timestamp)
      const MAX_SESSION_AGE = 30 * 60 * 1000 // 30 minutes

      if (sessionAge > MAX_SESSION_AGE) {
        return NextResponse.json(
          { valid: false, error: 'Session expired' },
          { status: 401 }
        )
      }

      // Verify admin still exists and is active in database
      const supabase = getSupabaseServiceRoleClient()
      if (!supabase) {
        return NextResponse.json(
          { valid: false, error: 'Database connection failed' },
          { status: 500 }
        )
      }

      const { data: admin, error } = await supabase
        .from('super_admins')
        .select('id, email, is_active')
        .eq('id', adminId)
        .single()

      if (error || !admin) {
        return NextResponse.json(
          { valid: false, error: 'Admin not found' },
          { status: 401 }
        )
      }

      if (!admin.is_active) {
        return NextResponse.json(
          { valid: false, error: 'Account is inactive' },
          { status: 403 }
        )
      }

      // Session is valid
      return NextResponse.json({
        valid: true,
        admin: {
          id: admin.id,
          email: admin.email,
          role: 'super_admin'
        }
      })

    } catch (error) {
      return NextResponse.json(
        { valid: false, error: 'Invalid session token' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Session validation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
