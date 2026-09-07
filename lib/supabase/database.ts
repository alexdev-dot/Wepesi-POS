export interface ProductRecord {
  id: string
  business_id: string
  image_url: string | null
  name: string
  description: string | null
  sku: string
  barcode: string | null
  category: string
  cost_price: number
  selling_price: number
  reorder_level: number
  current_stock: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface InventoryMovementRecord {
  id: string
  business_id: string
  product_id: string
  movement_type: "opening_stock" | "restock" | "sale" | "adjustment"
  quantity: number
  unit_cost: number
  supplier: string | null
  notes: string | null
  created_at: string
}

export function getProductStatus(stock: number, reorderLevel: number): "In Stock" | "Low Stock" | "Out of Stock" {
  if (stock <= 0) return "Out of Stock"
  if (stock <= reorderLevel) return "Low Stock"
  return "In Stock"
}

export function getBusinessId(): string | null {
  if (typeof window === "undefined") return null

  try {
    // Try to get user_id from localStorage (set by login)
    const userId = window.localStorage.getItem("user_id")
    if (userId) return userId

    // Fallback: try old format for backward compatibility
    const storedUser = window.localStorage.getItem("pos_current_user")
    if (!storedUser) return null
    const user = JSON.parse(storedUser) as { id?: string }
    return user.id ?? null
  } catch {
    return null
  }
}

export function getStoragePath(fileName: string, businessId: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase() || "jpg"
  const safeExtension = extension.replace(/[^a-z0-9]/g, "") || "jpg"
  return `${businessId}/${crypto.randomUUID()}.${safeExtension}`
}
