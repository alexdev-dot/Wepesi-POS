import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=oauth_failed', request.url))
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  try {
    // Exchange the code for a session
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error || !session) {
      return NextResponse.redirect(new URL('/login?error=auth_failed', request.url))
    }

    // Get user data from the session
    const user = session.user
    const email = user.email
    const name = user.user_metadata?.full_name || user.user_metadata?.name || email?.split('@')[0]

    // Check if user exists in our users table
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, onboarded')
      .eq('email', email)
      .single()

    let userId: string
    let onboarded: boolean

    if (existingUser) {
      // User exists - redirect appropriately
      userId = existingUser.id
      onboarded = existingUser.onboarded

      const redirectUrl = onboarded ? '/dashboard' : '/onboarding'
      return NextResponse.redirect(
        new URL(`${redirectUrl}?user_id=${userId}&user_email=${encodeURIComponent(email || '')}&user_name=${encodeURIComponent(name)}&user_onboarded=${onboarded}`, request.url)
      )
    }

    // New user - defer account creation until after onboarding/subscription
    // Store OAuth data in localStorage via URL params
    if (!email) {
      return NextResponse.redirect(new URL('/login?error=no_email', request.url))
    }

    // Redirect to onboarding with OAuth data (will be stored in localStorage)
    const response = NextResponse.redirect(
      new URL(`/onboarding?oauth_name=${encodeURIComponent(name)}&oauth_email=${encodeURIComponent(email)}&oauth_provider=google`, request.url)
    )

    return response
  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.redirect(new URL('/login?error=server_error', request.url))
  }
}
