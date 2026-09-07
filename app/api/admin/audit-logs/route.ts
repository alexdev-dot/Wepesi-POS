import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServiceRoleClient } from '@/lib/supabase/server'
import { validateAdminSession, unauthorizedResponse } from '@/lib/admin-auth'
import { validateCSRF, csrfErrorResponse } from '@/lib/csrf'

export async function GET(request: NextRequest) {
  // Validate admin session
  const session = await validateAdminSession(request)
  if (!session.valid) {
    return unauthorizedResponse(session.error)
  }
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const action = searchParams.get('action')
    const success = searchParams.get('success')

    const supabase = getSupabaseServiceRoleClient()
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

    // Build query
    let query = supabase
      .from('audit_logs')
      .select(`
        *,
        super_admins:admin_id (email)
      `)
      .order('created_at', { ascending: false })

    // Apply filters
    if (action) {
      query = query.eq('action', action)
    }
    if (success !== null && success !== undefined && success !== '') {
      query = query.eq('success', success === 'true')
    }

    // Get total count
    const { count, error: countError } = await supabase
      .from('audit_logs')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      console.error('Count error:', countError)
    }

    // Get paginated data
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data: logs, error } = await query.range(from, to)

    if (error) {
      console.error('Fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch audit logs' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      logs,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })

  } catch (error) {
    console.error('Audit logs API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
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
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Log ID is required' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseServiceRoleClient()
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

    const { error } = await supabase
      .from('audit_logs')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete error:', error)
      return NextResponse.json(
        { error: 'Failed to delete audit log' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Delete audit log API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
