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
      // User exists
      userId = existingUser.id
      onboarded = existingUser.onboarded
    } else {
      // New user - create user record
      if (!email) {
        return NextResponse.redirect(new URL('/login?error=no_email', request.url))
      }

      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          email,
          name,
          password_hash: '', // OAuth users don't have password
          onboarded: false,
          is_active: true,
        })
        .select('id')
        .single()

      if (createError || !newUser) {
        console.error('Error creating user:', createError)
        return NextResponse.redirect(new URL('/login?error=user_creation_failed', request.url))
      }

      userId = newUser.id
      onboarded = false
    }

    // Redirect with user data as URL params to set in localStorage on client side
    const redirectUrl = onboarded ? '/dashboard' : '/onboarding'
    const response = NextResponse.redirect(
      new URL(`${redirectUrl}?user_id=${userId}&user_email=${encodeURIComponent(email || '')}&user_name=${encodeURIComponent(name)}&user_onboarded=${onboarded}`, request.url)
    )

    return response
  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.redirect(new URL('/login?error=server_error', request.url))
  }
}
