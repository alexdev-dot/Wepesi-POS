import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseServerClient()
    const userId = request.headers.get('x-user-id')

    if (!supabase) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
    }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { templateId, settings } = body

    if (!templateId || !settings) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if template exists for this user
    const { data: existing } = await supabase
      .from('receipt_templates')
      .select('id')
      .eq('user_id', userId)
      .eq('template_id', templateId)
      .single()

    let result

    if (existing) {
      // Update existing template
      result = await supabase
        .from('receipt_templates')
        .update({ settings, updated_at: new Date().toISOString() })
        .eq('user_id', userId)
        .eq('template_id', templateId)
        .select()
    } else {
      // Create new template
      result = await supabase
        .from('receipt_templates')
        .insert({
          user_id: userId,
          template_id: templateId,
          settings,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
    }

    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: result.data })
  } catch (error) {
    console.error('Error saving receipt template:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
