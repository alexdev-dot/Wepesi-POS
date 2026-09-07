import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 })
  }

  const formData = await request.formData()
  const file = formData.get("file")
  const businessId = formData.get("businessId")

  if (!(file instanceof File) || typeof businessId !== "string" || !businessId) {
    return NextResponse.json({ error: "A product image and business ID are required." }, { status: 400 })
  }

  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/avif', 'image/heic', 'image/heif']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Only PNG, JPG, WebP, AVIF, or HEIC images can be uploaded." }, { status: 400 })
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Images must be 5MB or smaller." }, { status: 400 })
  }

  const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg"
  const path = `${businessId}/${crypto.randomUUID()}.${extension}`
  const supabase = createClient(url, anonKey)
  
  console.log('Uploading image to Supabase:', { path, fileType: file.type, fileSize: file.size })
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(path, file, { contentType: file.type, upsert: false })

  if (uploadError) {
    console.error('Supabase upload error:', uploadError)
    return NextResponse.json({ error: `Image upload failed: ${uploadError.message}` }, { status: 502 })
  }

  console.log('Upload successful:', uploadData)

  const imageUrl = supabase.storage.from("product-images").getPublicUrl(path).data.publicUrl
  return NextResponse.json({ path, imageUrl })
}
