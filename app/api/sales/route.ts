import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const businessId = new URL(request.url).searchParams.get("businessId")
  const page = parseInt(new URL(request.url).searchParams.get("page") || "1")
  const limit = parseInt(new URL(request.url).searchParams.get("limit") || "50")
  const supabase = getSupabaseServerClient()

  if (!businessId) return NextResponse.json({ error: "businessId is required." }, { status: 400 })
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 })

  // Get total count for pagination
  const { count, error: countError } = await supabase
    .from("sales")
    .select("*", { count: "exact", head: true })
    .eq("business_id", businessId)

  if (countError) return NextResponse.json({ error: countError.message }, { status: 502 })

  // Get paginated data
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error } = await supabase
    .from("sales")
    .select("id, receipt_number, cashier, customer, subtotal, discount, tax, total, payment_method, amount_paid, change_amount, status, created_at, sale_items(*)")
    .eq("business_id", businessId)
    .order("created_at", { ascending: false })
    .range(from, to)

  if (error) return NextResponse.json({ error: error.message }, { status: 502 })
  return NextResponse.json({
    sales: data,
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit)
    }
  })
}

export async function POST(request: Request) {
  const supabase = getSupabaseServerClient()
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 })

  const body = await request.json() as {
    businessId?: string
    cashier?: string
    customer?: string
    subtotal?: number
    discount?: number
    tax?: number
    total?: number
    paymentMethod?: string
    amountPaid?: number
    changeAmount?: number
    items?: Array<{ productId: string; quantity: number; unitPrice: number }>
  }

  if (!body.businessId || !body.items?.length) {
    return NextResponse.json({ error: "businessId and at least one item are required." }, { status: 400 })
  }

  const { data, error } = await supabase.rpc("complete_sale", {
    sale_business_id: body.businessId,
    sale_cashier: body.cashier || "Cashier",
    sale_customer: body.customer || "Walk-in Customer",
    sale_subtotal: body.subtotal || 0,
    sale_discount: body.discount || 0,
    sale_tax: body.tax || 0,
    sale_total: body.total || 0,
    sale_payment_method: body.paymentMethod || "cash",
    sale_amount_paid: body.amountPaid || 0,
    sale_change_amount: body.changeAmount || 0,
    sale_items: body.items,
  })

  if (error || !data) return NextResponse.json({ error: error?.message || "Unable to complete sale." }, { status: 502 })
  return NextResponse.json({ sale: data }, { status: 201 })
}

export async function DELETE(request: Request) {
  const supabase = getSupabaseServerClient()
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 })

  const { searchParams } = new URL(request.url)
  const saleId = searchParams.get("saleId")
  const receiptNumber = searchParams.get("receiptNumber")
  const businessId = searchParams.get("businessId")

  if (!businessId) {
    return NextResponse.json({ error: "businessId is required." }, { status: 400 })
  }

  if (!saleId && !receiptNumber) {
    return NextResponse.json({ error: "saleId or receiptNumber is required." }, { status: 400 })
  }

  // Get the sale record first to find the UUID if only receipt number is provided
  let actualSaleId = saleId
  if (receiptNumber && !saleId) {
    const { data: saleData, error: fetchError } = await supabase
      .from("sales")
      .select("id")
      .eq("receipt_number", receiptNumber)
      .eq("business_id", businessId)
      .single()

    if (fetchError || !saleData) {
      return NextResponse.json({ error: `Failed to find sale: ${fetchError?.message || 'Sale not found'}` }, { status: 404 })
    }
    actualSaleId = saleData.id
  }

  // First, delete the sale_items associated with this sale
  const { error: itemsError } = await supabase
    .from("sale_items")
    .delete()
    .eq("sale_id", actualSaleId)

  if (itemsError) {
    return NextResponse.json({ error: `Failed to delete sale items: ${itemsError.message}` }, { status: 502 })
  }

  // Then delete the sale
  const { error: saleError } = await supabase
    .from("sales")
    .delete()
    .eq("id", actualSaleId)
    .eq("business_id", businessId)

  if (saleError) {
    return NextResponse.json({ error: `Failed to delete sale: ${saleError.message}` }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
