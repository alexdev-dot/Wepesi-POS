import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { templateId: string } }
) {
  try {
    const supabase = getSupabaseServerClient()
    const userId = request.headers.get('x-user-id')

    if (!supabase) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
    }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('receipt_templates')
      .select('settings')
      .eq('user_id', userId)
      .eq('template_id', params.templateId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No template found, return default settings
        return NextResponse.json({ settings: null })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching receipt template:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
