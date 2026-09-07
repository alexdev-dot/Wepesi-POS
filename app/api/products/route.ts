import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const businessId = new URL(request.url).searchParams.get("businessId")
  const page = parseInt(new URL(request.url).searchParams.get("page") || "1")
  const limit = parseInt(new URL(request.url).searchParams.get("limit") || "50")
  const supabase = getSupabaseServerClient()

  if (!businessId) {
    return NextResponse.json({ error: "businessId is required." }, { status: 400 })
  }

  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 })
  }

  // Get total count for pagination
  const { count, error: countError } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("business_id", businessId)
    .eq("is_active", true)

  if (countError) {
    return NextResponse.json({ error: countError.message }, { status: 502 })
  }

  // Get paginated data
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("business_id", businessId)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .range(from, to)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 })
  }

  return NextResponse.json({
    products: data,
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit)
    }
  })
}

export async function DELETE(request: Request) {
  const supabase = getSupabaseServerClient()
  const body = await request.json() as { businessId?: string; id?: string }

  if (!supabase) return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 })
  if (!body.businessId || !body.id) return NextResponse.json({ error: "businessId and id are required." }, { status: 400 })

  const { data, error } = await supabase
    .from("products")
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq("id", body.id)
    .eq("business_id", body.businessId)
    .eq("is_active", true)
    .select("id")
    .maybeSingle()

  if (error) return NextResponse.json({ error: error.message }, { status: 409 })
  if (!data) return NextResponse.json({ error: "Product was not found." }, { status: 404 })
  return NextResponse.json({ success: true })
}
