import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getSupabaseServiceRoleClient } from '@/lib/supabase/server'
import { validateAdminSession, unauthorizedResponse } from '@/lib/admin-auth'
import { validateCSRF, csrfErrorResponse } from '@/lib/csrf'

export async function POST(request: NextRequest) {
  // Validate admin session
  const session = await validateAdminSession(request)
  if (!session.valid) {
    return unauthorizedResponse(session.error)
  }

  // Validate CSRF token for state-changing operation
  const csrfValidation = validateCSRF(request)
  if (!csrfValidation.valid) {
    return csrfErrorResponse(csrfValidation.error)
  }

  try {
    const { currentPassword, newPassword } = await request.json()

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Get Supabase service role client
    const supabase = getSupabaseServiceRoleClient()
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

    // Fetch admin from database using session adminId
    const { data: admin, error: fetchError } = await supabase
      .from('super_admins')
      .select('*')
      .eq('id', session.adminId)
      .single()

    if (fetchError || !admin) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      )
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, admin.password_hash)
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      )
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10)

    // Update password
    const { error: updateError } = await supabase
      .from('super_admins')
      .update({ 
        password_hash: newPasswordHash,
        updated_at: new Date().toISOString()
      })
      .eq('id', admin.id)

    if (updateError) {
      console.error('Password update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to update password' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully'
    })

  } catch (error) {
    console.error('Password update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
