import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const businessId = new URL(request.url).searchParams.get("businessId")
  const supabase = getSupabaseServerClient()
  if (!businessId) return NextResponse.json({ error: "businessId is required." }, { status: 400 })
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 })

  const { data, error } = await supabase.from("categories").select("*").eq("business_id", businessId).order("name")
  if (error) return NextResponse.json({ error: error.message }, { status: 502 })
  return NextResponse.json({ categories: data })
}

export async function POST(request: Request) {
  const supabase = getSupabaseServerClient()
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 })
  const body = await request.json() as { businessId?: string; name?: string; description?: string; status?: string }
  if (!body.businessId || !body.name?.trim()) return NextResponse.json({ error: "businessId and name are required." }, { status: 400 })

  const { data, error } = await supabase.from("categories").insert({
    business_id: body.businessId,
    name: body.name.trim(),
    description: body.description?.trim() || null,
    status: body.status === "Inactive" ? "Inactive" : "Active",
  }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 409 })
  return NextResponse.json({ category: data }, { status: 201 })
}

export async function DELETE(request: Request) {
  const supabase = getSupabaseServerClient()
  const body = await request.json() as { businessId?: string; id?: string }
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 })
  if (!body.businessId || !body.id) return NextResponse.json({ error: "businessId and id are required." }, { status: 400 })

  const { error } = await supabase.from("categories").delete().eq("id", body.id).eq("business_id", body.businessId)
  if (error) return NextResponse.json({ error: error.message }, { status: 409 })
  return NextResponse.json({ success: true })
}
