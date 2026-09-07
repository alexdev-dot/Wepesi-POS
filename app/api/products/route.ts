import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const businessId = new URL(request.url).searchParams.get("businessId")
  const supabase = getSupabaseServerClient()

  if (!businessId) {
    return NextResponse.json({ error: "businessId is required." }, { status: 400 })
  }

  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 })
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("business_id", businessId)
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 })
  }

  return NextResponse.json({ products: data })
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
