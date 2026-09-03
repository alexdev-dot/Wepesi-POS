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

export default function InventoryPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isAddStockOpen, setIsAddStockOpen] = useState(false)
  const isMobile = useMobile()
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    { id: 1, image: "/products/Coca cola 500ml.jpg", name: "Coca Cola 500ml", sku: "CC500", category: "Beverages", currentStock: 120, reorderLevel: 50, unitCost: 60, totalValue: 7200, lastRestock: "2024-01-15" },
    { id: 2, image: "/products/bread loaf.avif", name: "Bread Loaf", sku: "BRD400", category: "Bakery", currentStock: 85, reorderLevel: 30, unitCost: 45, totalValue: 3825, lastRestock: "2024-01-14" },
    { id: 3, image: "/products/Milk 1l.avif", name: "Milk 1L", sku: "MLK1L", category: "Dairy", currentStock: 64, reorderLevel: 40, unitCost: 70, totalValue: 4480, lastRestock: "2024-01-13" },
    { id: 4, image: "/products/indomie chicken noodles.avif", name: "Lays Chips 150g", sku: "LAY150", category: "Snacks", currentStock: 45, reorderLevel: 50, unitCost: 55, totalValue: 2475, lastRestock: "2024-01-12" },
    { id: 5, image: "/products/A4 copy paper.jpg", name: "A4 Copy Paper", sku: "A4R500", category: "Stationery", currentStock: 40, reorderLevel: 20, unitCost: 450, totalValue: 18000, lastRestock: "2024-01-10" },
    { id: 6, image: "/products/colgate toothpaste.avif", name: "Colgate Toothpaste", sku: "CLG100", category: "Personal Care", currentStock: 0, reorderLevel: 25, unitCost: 85, totalValue: 0, lastRestock: "2024-01-08" },
    { id: 7, image: "/products/dettol soap 170g.jpg", name: "Dettol Soap", sku: "DTL175", category: "Personal Care", currentStock: 0, reorderLevel: 30, unitCost: 95, totalValue: 0, lastRestock: "2024-01-05" },
  ])

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
  const inventoryStats = [
    { title: "Total Items", value: "1,248", description: "All products", icon: Package, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "Low Stock", value: "32", description: "Below reorder level", icon: AlertTriangle, color: "text-orange-600", bgColor: "bg-orange-100" },
    { title: "Stock Value", value: "KSh 1,245,780", description: "Total inventory value", icon: DollarSign, color: "text-purple-600", bgColor: "bg-purple-100" },
    { title: "Stock Movement", value: "+12.5%", description: "This month", icon: TrendingUp, color: "text-green-600", bgColor: "bg-green-100" },
  ]

  const handleEditItem = (item: InventoryItem) => {
    console.log("Edit item:", item)
    // TODO: Implement edit functionality
  }

  const handleDeleteItem = (item: InventoryItem) => {
    console.log("Delete item:", item)
    // TODO: Implement delete functionality
  }

  const handleAddStock = (stockData: any) => {
    console.log("Add stock:", stockData)
    // TODO: Implement add stock functionality - update inventory
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
        onSubmit={handleAddStock}
      />
    </div>
  )
}
