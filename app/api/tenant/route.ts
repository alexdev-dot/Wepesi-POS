import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServiceRoleClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get('businessId')
    const userId = request.headers.get('x-user-id')

    const supabase = getSupabaseServiceRoleClient()
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

    let tenant
    let error

    // Support fetching by businessId (for POS) or userId (for dashboard)
    if (businessId) {
      const result = await supabase
        .from('tenants')
        .select('*')
        .eq('id', businessId)
        .single()
      tenant = result.data
      error = result.error
    } else if (userId) {
      const result = await supabase
        .from('tenants')
        .select('*')
        .eq('user_id', userId)
        .single()
      tenant = result.data
      error = result.error
    } else {
      return NextResponse.json(
        { error: 'User ID or Business ID is required' },
        { status: 400 }
      )
    }

    if (error || !tenant) {
      return NextResponse.json(
        { error: 'Tenant not found' },
        { status: 404 }
      )
    }

    // If fetching by userId, also fetch user data
    if (userId) {
      const { data: user } = await supabase
        .from('users')
        .select('id, email, name, onboarded')
        .eq('id', userId)
        .single()

      return NextResponse.json({
        tenant,
        user
      })
    }

    // For businessId queries, return just tenant info
    return NextResponse.json({ tenant })

  } catch (error) {
    console.error('Tenant fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
