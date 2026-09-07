import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServiceRoleClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { 
      // Registration data from localStorage
      pendingName,
      pendingEmail,
      pendingPasswordHash,
      // Onboarding data
      businessName, 
      businessType, 
      branchName, 
      country, 
      city, 
      branchAddress, 
      currency, 
      taxEnabled, 
      taxName, 
      taxRate, 
      subscriptionPlan, 
      subscriptionPeriod 
    } = await request.json()

    // Validate required fields
    if (!pendingName || !pendingEmail || !pendingPasswordHash) {
      return NextResponse.json(
        { error: 'Missing registration data. Please complete signup first.' },
        { status: 400 }
      )
    }

    if (!businessName || !branchName || !country || !city) {
      return NextResponse.json(
        { error: 'Missing required onboarding fields' },
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

    // Check if user already exists (double-check)
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', pendingEmail.toLowerCase())
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    // Create user account now (after onboarding/subscription)
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        email: pendingEmail.toLowerCase(),
        password_hash: pendingPasswordHash,
        name: pendingName,
        onboarded: true,
        is_active: true
      })
      .select('id, email, name, onboarded')
      .single()

    if (userError) {
      console.error('User creation error:', userError)
      return NextResponse.json(
        { error: 'Failed to create user account' },
        { status: 500 }
      )
    }

    // Create tenant record
    const { error: tenantError } = await supabase
      .from('tenants')
      .insert({
        user_id: user.id,
        business_name: businessName,
        business_type: businessType,
        branch_name: branchName,
        country,
        city,
        branch_address: branchAddress || null,
        currency,
        tax_enabled: taxEnabled,
        tax_name: taxName || null,
        tax_rate: taxRate ? parseFloat(taxRate) : null,
        subscription_plan: subscriptionPlan,
        subscription_period: subscriptionPeriod,
        status: 'active'
      })

    if (tenantError) {
      console.error('Tenant creation error:', tenantError)
      // Rollback user creation if tenant creation fails
      await supabase.from('users').delete().eq('id', user.id)
      return NextResponse.json(
        { error: 'Failed to create tenant' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      user
    })

  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
