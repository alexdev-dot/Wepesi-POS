import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServiceRoleClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('super_admin_session')?.value

    if (sessionToken) {
      // Decode session to get admin ID for audit logging
      try {
        const decoded = Buffer.from(sessionToken, 'base64').toString('utf-8')
        const [adminId] = decoded.split(':')

        if (adminId) {
          const supabase = getSupabaseServiceRoleClient()
          if (supabase) {
            // Log logout action
            await supabase.rpc('log_admin_action', {
              p_admin_id: adminId,
              p_action: 'LOGOUT',
              p_resource: 'super_admin',
              p_details: {},
              p_ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
              p_user_agent: request.headers.get('user-agent'),
              p_success: true
            })
          }
        }
      } catch (error) {
        console.error('Error decoding session for logout:', error)
      }
    }

    // Create response and clear cookie
    const response = NextResponse.json({ success: true })
    response.cookies.delete('super_admin_session')

    return response

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
