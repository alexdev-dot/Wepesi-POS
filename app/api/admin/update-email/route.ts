import { NextRequest, NextResponse } from 'next/server'
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
    const { currentEmail, newEmail } = await request.json()

    // Validate input
    if (!currentEmail || !newEmail) {
      return NextResponse.json(
        { error: 'Current email and new email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(currentEmail) || !emailRegex.test(newEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
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

    // Check if current email exists
    const { data: admin, error: fetchError } = await supabase
      .from('super_admins')
      .select('*')
      .eq('email', currentEmail.toLowerCase())
      .single()

    if (fetchError || !admin) {
      return NextResponse.json(
        { error: 'Current email not found' },
        { status: 404 }
      )
    }

    // Check if new email already exists
    const { data: existingAdmin } = await supabase
      .from('super_admins')
      .select('email')
      .eq('email', newEmail.toLowerCase())
      .single()

    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 409 }
      )
    }

    // Update email
    const { error: updateError } = await supabase
      .from('super_admins')
      .update({ email: newEmail.toLowerCase() })
      .eq('id', admin.id)

    if (updateError) {
      console.error('Email update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to update email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Email updated successfully'
    })

  } catch (error) {
    console.error('Email update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
