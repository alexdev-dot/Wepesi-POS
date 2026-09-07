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
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const supabase = getSupabaseServiceRoleClient()
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

    // Build query
    let query = supabase
      .from('tenants')
      .select(`
        *,
        users:user_id (email, name)
      `)
      .order('created_at', { ascending: false })

    // Apply filters
    if (status) {
      query = query.eq('status', status)
    }
    if (search) {
      query = query.or(`business_name.ilike.%${search}%,users.email.ilike.%${search}%`)
    }

    // Get total count
    const { count, error: countError } = await supabase
      .from('tenants')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      console.error('Count error:', countError)
    }

    // Get paginated data
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data: tenants, error } = await query.range(from, to)

    if (error) {
      console.error('Fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch tenants' },
        { status: 500 }
      )
    }

    // Get stats
    const { count: totalCount } = await supabase
      .from('tenants')
      .select('*', { count: 'exact', head: true })

    const { count: activeCount } = await supabase
      .from('tenants')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    const { count: pendingCount } = await supabase
      .from('tenants')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')

    const { count: suspendedCount } = await supabase
      .from('tenants')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'suspended')

    return NextResponse.json({
      tenants,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      },
      stats: {
        total: totalCount || 0,
        active: activeCount || 0,
        pending: pendingCount || 0,
        suspended: suspendedCount || 0
      }
    })

  } catch (error) {
    console.error('Tenants API error:', error)
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
        { error: 'Tenant ID is required' },
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
      .from('tenants')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete error:', error)
      return NextResponse.json(
        { error: 'Failed to delete tenant' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Delete tenant API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
