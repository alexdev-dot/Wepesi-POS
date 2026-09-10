import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServiceRoleClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { 
      // OAuth data
      oauthName,
      oauthEmail,
      oauthProvider,
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
    const isOAuth = !!(oauthName && oauthEmail && oauthProvider === 'google')
    const isRegularSignup = !!(pendingName && pendingEmail && pendingPasswordHash)

    if (!isOAuth && !isRegularSignup) {
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

    // Determine email and name based on signup method
    const email = isOAuth ? oauthEmail : pendingEmail
    const name = isOAuth ? oauthName : pendingName

    // Check if user already exists (double-check)
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
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
        email: email.toLowerCase(),
        password_hash: isOAuth ? '' : pendingPasswordHash, // OAuth users don't have password
        name,
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

    // Create tenant record - check which columns exist before inserting
    const tenantData: any = {
      user_id: user.id,
      business_name: businessName,
      business_type: businessType,
      branch_name: branchName,
      country,
      city
    }

    // Helper function to check if column exists
    const columnExists = async (columnName: string) => {
      try {
        const { data } = await supabase
          .from('tenants')
          .select(columnName)
          .limit(1)
          .single()
        return data !== null
      } catch (e) {
        return false
      }
    }

    // Add optional columns only if they exist
    if (await columnExists('branch_address')) {
      tenantData.branch_address = branchAddress || null
    }
    if (await columnExists('currency')) {
      tenantData.currency = currency
    }
    if (await columnExists('tax_enabled')) {
      tenantData.tax_enabled = taxEnabled
    }
    if (await columnExists('tax_name')) {
      tenantData.tax_name = taxName || null
    }
    if (await columnExists('tax_rate')) {
      tenantData.tax_rate = taxRate ? parseFloat(taxRate) : null
    }
    if (await columnExists('subscription_plan')) {
      tenantData.subscription_plan = subscriptionPlan
    }
    if (await columnExists('subscription_period')) {
      tenantData.subscription_period = subscriptionPeriod
    }
    if (await columnExists('status')) {
      tenantData.status = 'active'
    }

    console.log('Final tenant data:', tenantData)

    const { error: tenantError } = await supabase
      .from('tenants')
      .insert(tenantData)

    if (tenantError) {
      console.error('Tenant creation error:', tenantError)
      console.error('Tenant error details:', JSON.stringify(tenantError, null, 2))
      console.error('Insert data:', {
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
        subscription_period: subscriptionPeriod
      })
      // Rollback user creation if tenant creation fails
      await supabase.from('users').delete().eq('id', user.id)
      return NextResponse.json(
        { error: 'Failed to create tenant', details: tenantError.message },
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
