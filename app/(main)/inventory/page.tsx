"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/core/layout/sidebar"
import { Header } from "@/components/core/layout/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InventoryTable, InventoryItem } from "@/components/domains/inventory/inventory-table"
import { AddStockForm } from "@/components/domains/inventory/add-stock-form"
import { Package, AlertTriangle, TrendingUp, DollarSign, Plus, Upload, Download, Filter, Search, FileText } from "lucide-react"
import { useMobile } from "@/lib/hooks/use-mobile"
import { getSupabaseClient } from "@/lib/supabase/client"
import { getBusinessId, type ProductRecord } from "@/lib/supabase/database"

export default function InventoryPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isAddStockOpen, setIsAddStockOpen] = useState(false)
  const isMobile = useMobile()
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [stockProducts, setStockProducts] = useState<Array<{ id: string | number; name: string; sku: string }>>([])

  const mapInventoryItem = (product: ProductRecord): InventoryItem => ({
    id: product.id,
    image: product.image_url || "",
    name: product.name,
    sku: product.sku,
    category: product.category,
    currentStock: product.current_stock,
    reorderLevel: product.reorder_level,
    unitCost: Number(product.cost_price),
    totalValue: product.current_stock * Number(product.cost_price),
    lastRestock: new Date(product.updated_at).toISOString().slice(0, 10),
  })

  useEffect(() => {
    const loadInventory = async () => {
      const businessId = getBusinessId()
      if (!businessId) return

      const response = await fetch(`/api/inventory?businessId=${encodeURIComponent(businessId)}`)
      const result = await response.json() as { inventory?: ProductRecord[]; error?: string }
      if (!response.ok || !result.inventory) {
        console.warn("Inventory could not be loaded:", result.error)
        return
      }

      const products = result.inventory
      setInventoryItems(products.map(mapInventoryItem))
      setStockProducts(products.map((product) => ({ id: product.id, name: product.name, sku: product.sku })))
    }

    void loadInventory()
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
  const lowStockCount = inventoryItems.filter((item) => item.currentStock > 0 && item.currentStock <= item.reorderLevel).length
  const stockValue = inventoryItems.reduce((total, item) => total + item.totalValue, 0)
  const inventoryStats = [
    { title: "Total Items", value: inventoryItems.length.toLocaleString(), description: "Saved products", icon: Package, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "Low Stock", value: lowStockCount.toLocaleString(), description: "Below reorder level", icon: AlertTriangle, color: "text-orange-600", bgColor: "bg-orange-100" },
    { title: "Stock Value", value: `KSh ${stockValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, description: "Total inventory value", icon: DollarSign, color: "text-purple-600", bgColor: "bg-purple-100" },
    { title: "Stock Movement", value: "-", description: "Movement history", icon: TrendingUp, color: "text-green-600", bgColor: "bg-green-100" },
  ]

  const handleEditItem = (item: InventoryItem) => {
    console.log("Edit item:", item)
    // TODO: Implement edit functionality
  }

  const handleDeleteItem = async (item: InventoryItem) => {
    if (!window.confirm(`Archive ${item.name}? It will be removed from Inventory, Products, and POS.`)) return

    const businessId = getBusinessId()
    if (!businessId) return

    const response = await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessId, id: item.id }),
    })

    if (!response.ok) {
      const result = await response.json() as { error?: string }
      window.alert(result.error || "Unable to archive inventory item.")
      return
    }

    setInventoryItems((currentItems) => currentItems.filter((currentItem) => currentItem.id !== item.id))
    setStockProducts((currentProducts) => currentProducts.filter((product) => product.id !== item.id))
  }

  const handleAddStock = async (stockData: {
    productId: string
    productName: string
    quantity: number
    unitCost: number
    supplier: string
    notes: string
  }) => {
    const supabase = getSupabaseClient()
    const businessId = getBusinessId()

    if (!supabase || !businessId) throw new Error("Database is not available. Check your Supabase configuration.")

    const { data, error } = await supabase.rpc("receive_stock", {
      movement_business_id: businessId,
      movement_product_id: stockData.productId,
      movement_quantity: stockData.quantity,
      movement_unit_cost: stockData.unitCost,
      movement_supplier: stockData.supplier,
      movement_notes: stockData.notes,
    })

    if (error || !data) throw new Error(error?.message || "Unable to add stock.")

    const updatedItem = mapInventoryItem(data as ProductRecord)
    setInventoryItems(prev => prev.map((item) => item.id === updatedItem.id ? updatedItem : item))
    setStockProducts(prev => prev.map((product) => product.id === updatedItem.id ? { ...product, name: updatedItem.name, sku: updatedItem.sku } : product))
  }

  return (
    <div className="flex h-screen bg-background font-sans">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPath="/inventory" 
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
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Inventory</h1>
                <p className="text-sm text-muted-foreground mt-1">Manage your stock levels and movements</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  className="h-10 sm:h-11 bg-muted hover:bg-muted/80 text-foreground text-sm font-semibold shadow-sm hover:shadow transition-all flex-1 sm:flex-none"
                  variant="outline"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Inventory Report
                </Button>
                <Button 
                  className="h-10 sm:h-11 bg-blue-600 hover:bg-blue-700 text-sm font-semibold shadow-sm hover:shadow transition-all flex-1 sm:flex-none"
                  onClick={() => setIsAddStockOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Stock
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
              {inventoryStats.map((stat) => (
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
                    placeholder="Search inventory..."
                    className="h-10 pl-9 sm:pl-10 text-sm border bg-muted focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Filters and Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Filters */}
                  <div className="flex flex-wrap gap-2">
                    <select className="h-10 px-3 sm:px-4 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-w-35">
                      <option>All Categories</option>
                      <option>Beverages</option>
                      <option>Bakery</option>
                      <option>Dairy</option>
                      <option>Snacks</option>
                      <option>Stationery</option>
                      <option>Personal Care</option>
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

            {/* Inventory Table */}
            <InventoryTable 
              inventoryItems={inventoryItems}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
            />
          </div>
        </main>
      </div>

      {/* Add Stock Form Modal */}
      <AddStockForm
        isOpen={isAddStockOpen}
        onClose={() => setIsAddStockOpen(false)}
        products={stockProducts.length > 0 ? stockProducts : inventoryItems.map((item) => ({ id: item.id, name: item.name, sku: item.sku }))}
        onSubmit={handleAddStock}
      />
    </div>
  )
}
