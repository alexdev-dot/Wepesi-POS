import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServiceRoleClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { userId, businessName, businessType, branchName, country, city, branchAddress, currency, taxEnabled, taxName, taxRate, subscriptionPlan, subscriptionPeriod } = await request.json()

    // Validate required fields
    if (!userId || !businessName || !branchName || !country || !city) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // Check if user exists
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single()

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Create tenant record
    const { error: tenantError } = await supabase
      .from('tenants')
      .insert({
        user_id: userId,
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
      return NextResponse.json(
        { error: 'Failed to create tenant' },
        { status: 500 }
      )
    }

    // Mark user as onboarded
    const { error: updateError } = await supabase
      .from('users')
      .update({ onboarded: true })
      .eq('id', userId)

    if (updateError) {
      console.error('User update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to complete onboarding' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true
    })

  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
