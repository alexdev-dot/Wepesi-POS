"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/core/layout/sidebar"
import { Header } from "@/components/core/layout/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductTable, Product } from "@/components/domains/products/product-table"
import { AddProductForm } from "@/components/domains/products/add-product-form"
import { Package, Tag, AlertCircle, DollarSign, Plus, Upload, Download, Filter, Search, ChevronDown } from "lucide-react"
import { useMobile } from "@/lib/hooks/use-mobile"
import { getSupabaseClient } from "@/lib/supabase/client"
import { getBusinessId, getProductStatus, type ProductRecord } from "@/lib/supabase/database"

export default function ProductsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const isMobile = useMobile()
  const [products, setProducts] = useState<Product[]>([])
  const [categoryOptions, setCategoryOptions] = useState<string[]>([])

  const mapProduct = (product: ProductRecord): Product => ({
    id: product.id,
    image: product.image_url || "",
    name: product.name,
    description: product.description || "",
    sku: product.sku,
    barcode: product.barcode || "",
    category: product.category,
    costPrice: Number(product.cost_price),
    sellingPrice: Number(product.selling_price),
    stockQty: product.current_stock,
    status: getProductStatus(product.current_stock, product.reorder_level),
  })

  useEffect(() => {
    const loadProducts = async () => {
      const businessId = getBusinessId()
      if (!businessId) return

      const query = `businessId=${encodeURIComponent(businessId)}`
      const [productsResponse, categoriesResponse] = await Promise.all([
        fetch(`/api/products?${query}`),
        fetch(`/api/categories?${query}`),
      ])
      const result = await productsResponse.json() as { products?: ProductRecord[]; error?: string }
      const categoriesResult = await categoriesResponse.json() as { categories?: Array<{ name: string }> }
      if (!productsResponse.ok || !result.products) {
        console.warn("Products could not be loaded:", result.error)
        return
      }

      setProducts(result.products.map(mapProduct))
      setCategoryOptions((categoriesResult.categories || []).filter((category) => category.name).map((category) => category.name))
    }

    void loadProducts()
  }, [])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false)
  }

  const handleMenuClick = () => {
    if (isMobile) {
      toggleMobileSidebar()
    } else {
      toggleSidebar()
    }
  }

  // Stats data
  const lowStockCount = products.filter((product) => product.status === "Low Stock").length
  const outOfStockCount = products.filter((product) => product.status === "Out of Stock").length
  const totalValue = products.reduce((total, product) => total + product.costPrice * product.stockQty, 0)
  const productStats = [
    { title: "Total Products", value: products.length.toLocaleString(), description: "Saved products", icon: Package, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "Low Stock", value: lowStockCount.toLocaleString(), description: "Below reorder level", icon: Tag, color: "text-orange-600", bgColor: "bg-orange-100" },
    { title: "Out of Stock", value: outOfStockCount.toLocaleString(), description: "Unavailable", icon: AlertCircle, color: "text-red-600", bgColor: "bg-red-100" },
    { title: "Total Value", value: `KSh ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, description: "Stock value", icon: DollarSign, color: "text-purple-600", bgColor: "bg-purple-100" },
  ]

  const handleEditProduct = (product: Product) => {
    console.log("Edit product:", product)
    // TODO: Implement edit functionality
  }

  const handleDeleteProduct = async (product: Product) => {
    if (!window.confirm(`Archive ${product.name}? It will be removed from Products, Inventory, and POS.`)) return

    const businessId = getBusinessId()
    if (!businessId) return

    const response = await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessId, id: product.id }),
    })

    if (!response.ok) {
      const result = await response.json() as { error?: string }
      window.alert(result.error || "Unable to archive product.")
      return
    }

    setProducts((currentProducts) => currentProducts.filter((item) => item.id !== product.id))
  }

  const handleAddProduct = async (newProduct: {
    name: string
    barcode: string
    category: string
    costPrice: number
    sellingPrice: number
    stockQty: number
    image: File | null
  }) => {
    const supabase = getSupabaseClient()
    const businessId = getBusinessId()

    if (!supabase || !businessId) throw new Error("Database is not available. Check your Supabase configuration.")

    let uploadedPath: string | null = null
    let imageUrl: string | null = null
    if (newProduct.image) {
      const uploadForm = new FormData()
      uploadForm.append("file", newProduct.image)
      uploadForm.append("businessId", businessId)

      let uploadResponse: Response
      try {
        uploadResponse = await fetch("/api/product-image", { method: "POST", body: uploadForm })
      } catch {
        throw new Error("Image upload could not reach the server. Check that the app is running and try again.")
      }

      const uploadResult = await uploadResponse.json() as { path?: string; imageUrl?: string; error?: string }
      if (!uploadResponse.ok || !uploadResult.path || !uploadResult.imageUrl) {
        throw new Error(uploadResult.error || "Image upload failed.")
      }

      uploadedPath = uploadResult.path
      imageUrl = uploadResult.imageUrl
    }

    const { data, error } = await supabase.rpc("create_product_with_stock", {
      product_business_id: businessId,
      product_name: newProduct.name,
      product_description: "",
      product_sku: newProduct.barcode || `ITEM-${crypto.randomUUID()}`,
      product_barcode: newProduct.barcode,
      product_category: newProduct.category,
      product_cost_price: newProduct.costPrice,
      product_selling_price: newProduct.sellingPrice,
      product_reorder_level: 0,
      opening_quantity: newProduct.stockQty,
      opening_supplier: "",
      opening_notes: "",
      product_image_url: imageUrl,
    })

    if (error || !data) {
      if (uploadedPath) await supabase.storage.from("product-images").remove([uploadedPath])
      throw new Error(error?.message || "Unable to save the product.")
    }

    setProducts(prev => [mapProduct(data as ProductRecord), ...prev])
  }

  return (
    <div className="flex h-screen bg-background font-sans">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPath="/products" 
        mobileOpen={mobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />
      <div className="flex flex-1 flex-col overflow-hidden font-sans">
        <Header onMenuClick={handleMenuClick} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 font-sans">
          <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto font-sans">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Products</h1>
                <p className="text-sm text-muted-foreground mt-1">Manage your product inventory</p>
              </div>
              <Button 
                className="h-10 sm:h-11 bg-blue-600 hover:bg-blue-700 text-sm font-semibold shadow-sm hover:shadow transition-all w-full sm:w-auto"
                onClick={() => setIsAddProductOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
              {productStats.map((stat) => (
                <div key={stat.title} className="group relative rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${stat.bgColor} ${stat.color} shadow-sm group-hover:shadow transition-all`}>
                      <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="mt-1 text-lg sm:text-xl font-bold text-foreground tracking-tight">{stat.value}</p>
                    <p className="mt-0.5 text-[10px] sm:text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Search and Filter Section */}
            <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
              <div className="flex flex-col gap-4">
                {/* Search Bar */}
                <div className="relative w-full">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="h-10 pl-9 sm:pl-10 text-sm border bg-muted focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Filters and Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Filters */}
                  <div className="flex flex-wrap gap-2">
                    <select className="h-10 px-3 sm:px-4 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-w-35">
                      <option>All Categories</option>
                      {categoryOptions.map((category) => <option key={category}>{category}</option>)}
                    </select>

                    <select className="h-10 px-3 sm:px-4 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-w-35">
                      <option>All Status</option>
                      <option>In Stock</option>
                      <option>Low Stock</option>
                      <option>Out of Stock</option>
                    </select>

                    <Button variant="outline" size="sm" className="h-10 text-sm border-border text-foreground hover:bg-muted transition-all">
                      <Filter className="h-4 w-4 mr-2" />
                      More Filters
                    </Button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 sm:ml-auto">
                    <Button variant="outline" size="sm" className="h-10 text-sm border-border text-foreground hover:bg-muted transition-all">
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                    </Button>
                    <Button variant="outline" size="sm" className="h-10 text-sm border-border text-foreground hover:bg-muted transition-all">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <ProductTable 
              products={products}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          </div>
        </main>
      </div>

      {/* Add Product Form Modal */}
      <AddProductForm
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        categories={categoryOptions}
        onSubmit={handleAddProduct}
      />
    </div>
  )
}
