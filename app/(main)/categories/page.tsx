"use client"

import { useEffect, useMemo, useState } from "react"
import { Sidebar } from "@/components/core/layout/sidebar"
import { Header } from "@/components/core/layout/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoryForm } from "@/components/domains/categories/category-form"
import { FolderTree, Plus, Search, Trash2 } from "lucide-react"
import { getBusinessId } from "@/lib/supabase/database"

interface Category {
  id: string
  name: string
  description: string | null
  productCount: number
  status: string
}

export default function CategoriesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [error, setError] = useState<string | null>(null)

  const loadCategories = async () => {
    const businessId = getBusinessId()
    if (!businessId) return
    const query = `businessId=${encodeURIComponent(businessId)}`
    const [categoryResponse, productsResponse] = await Promise.all([
      fetch(`/api/categories?${query}`),
      fetch(`/api/products?${query}`),
    ])
    const categoryResult = await categoryResponse.json() as { categories?: Category[]; error?: string }
    const productResult = await productsResponse.json() as { products?: Array<{ category: string }> }
    if (!categoryResponse.ok || !categoryResult.categories) {
      setError(categoryResult.error || "Unable to load categories.")
      return
    }
    const products = productResult.products || []
    setCategories(categoryResult.categories.map((category) => ({
      ...category,
      productCount: products.filter((product) => product.category === category.name).length,
    })))
  }

  useEffect(() => { void loadCategories() }, [])

  const visibleCategories = useMemo(() => categories.filter((category) => {
    const matchesSearch = !searchQuery || `${category.name} ${category.description || ""}`.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch && (statusFilter === "All Status" || category.status === statusFilter)
  }), [categories, searchQuery, statusFilter])

  const handleAddCategory = async (data: { name: string; description: string; status: string }) => {
    const businessId = getBusinessId()
    if (!businessId) throw new Error("You must be signed in to manage categories.")
    const response = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessId, ...data }),
    })
    if (!response.ok) throw new Error((await response.json()).error || "Unable to save category.")
    await loadCategories()
  }

  const handleDelete = async (category: Category) => {
    if (!window.confirm(`Delete ${category.name}? This cannot be undone.`)) return
    const businessId = getBusinessId()
    if (!businessId) return
    const response = await fetch("/api/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessId, id: category.id }),
    })
    if (!response.ok) {
      setError((await response.json()).error || "Unable to delete category.")
      return
    }
    setError(null)
    await loadCategories()
  }

  return (
    <div className="flex h-screen bg-background font-sans">
      <Sidebar collapsed={sidebarCollapsed} currentPath="/categories" mobileOpen={mobileSidebarOpen} onMobileClose={() => setMobileSidebarOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => window.innerWidth < 1024 ? setMobileSidebarOpen((open) => !open) : setSidebarCollapsed((collapsed) => !collapsed)} />
        <main className="flex-1 overflow-auto bg-muted/30 p-4 sm:p-6">
          <div className="mx-auto max-w-7xl space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600"><FolderTree className="h-5 w-5" /></div>
                <div><h1 className="text-xl font-semibold text-foreground">Categories</h1><p className="text-sm text-muted-foreground">Manage product categories</p></div>
              </div>
              <Button onClick={() => setIsFormOpen(true)} className="bg-purple-600 hover:bg-purple-700"><Plus className="mr-2 h-4 w-4" />Add Category</Button>
            </div>
            <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row">
              <div className="relative flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search categories..." className="pl-9" /></div>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="h-10 rounded-lg border bg-card px-3 text-sm"><option>All Status</option><option>Active</option><option>Inactive</option></select>
            </div>
            {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <table className="w-full"><thead className="border-b bg-muted"><tr><th className="px-4 py-3 text-left text-xs uppercase text-muted-foreground">Category</th><th className="px-4 py-3 text-left text-xs uppercase text-muted-foreground">Description</th><th className="px-4 py-3 text-left text-xs uppercase text-muted-foreground">Products</th><th className="px-4 py-3 text-left text-xs uppercase text-muted-foreground">Status</th><th className="px-4 py-3 text-right text-xs uppercase text-muted-foreground">Actions</th></tr></thead>
                <tbody className="divide-y divide-border">{visibleCategories.map((category) => <tr key={category.id}><td className="px-4 py-4 text-sm font-medium">{category.name}</td><td className="px-4 py-4 text-sm text-muted-foreground">{category.description || "-"}</td><td className="px-4 py-4 text-sm">{category.productCount}</td><td className="px-4 py-4 text-sm">{category.status}</td><td className="px-4 py-4 text-right"><button title="Delete category" onClick={() => void handleDelete(category)} className="rounded-lg p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></td></tr>)}</tbody>
              </table>
              {visibleCategories.length === 0 && <p className="p-8 text-center text-sm text-muted-foreground">No categories found.</p>}
            </div>
          </div>
        </main>
      </div>
      <CategoryForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleAddCategory} />
    </div>
  )
}
