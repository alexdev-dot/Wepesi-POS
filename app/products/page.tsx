"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductTable, Product } from "@/components/products/product-table"
import { AddProductForm } from "@/components/products/add-product-form"
import { Package, Tag, AlertCircle, DollarSign, Plus, Upload, Download, Filter, Search, ChevronDown } from "lucide-react"
import { useMobile } from "@/lib/hooks/use-mobile"

export default function ProductsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const isMobile = useMobile()
  const [products, setProducts] = useState<Product[]>([
    { id: 1, image: "/products/Coca cola 500ml.jpg", name: "Coca Cola 500ml", description: "Bottle", sku: "CC500", barcode: "5449000012345", category: "Beverages", brand: "Coca Cola", costPrice: 60, sellingPrice: 120, stockQty: 120, status: "In Stock" },
    { id: 2, image: "/products/bread loaf.avif", name: "Bread Loaf", description: "400g", sku: "BRD400", barcode: "6161107891234", category: "Bakery", brand: "BakeHouse", costPrice: 45, sellingPrice: 80, stockQty: 85, status: "In Stock" },
    { id: 3, image: "/products/Milk 1l.avif", name: "Milk 1L", description: "1 Litre", sku: "MLK1L", barcode: "6161107895677", category: "Dairy", brand: "Brookside", costPrice: 70, sellingPrice: 120, stockQty: 64, status: "In Stock" },
    { id: 4, image: "/products/indomie chicken noodles.avif", name: "Lays Chips 150g", description: "150g", sku: "LAY150", barcode: "0284002345678", category: "Snacks", brand: "Lays", costPrice: 55, sellingPrice: 100, stockQty: 45, status: "Low Stock" },
    { id: 5, image: "/products/A4 copy paper.jpg", name: "A4 Copy Paper", description: "Ream", sku: "A4R500", barcode: "5901234123457", category: "Stationery", brand: "Double A", costPrice: 450, sellingPrice: 600, stockQty: 40, status: "Low Stock" },
    { id: 6, image: "/products/colgate toothpaste.avif", name: "Colgate Toothpaste", description: "100g", sku: "CLG100", barcode: "6161100123456", category: "Personal Care", brand: "Colgate", costPrice: 85, sellingPrice: 150, stockQty: 0, status: "Out of Stock" },
    { id: 7, image: "/products/dettol soap 170g.jpg", name: "Dettol Soap", description: "175g", sku: "DTL175", barcode: "6161100789123", category: "Personal Care", brand: "Dettol", costPrice: 95, sellingPrice: 180, stockQty: 0, status: "Out of Stock" },
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
  const productStats = [
    { title: "Total Products", value: "1,248", description: "All time", icon: Package, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "Low Stock", value: "32", description: "Below reorder level", icon: Tag, color: "text-orange-600", bgColor: "bg-orange-100" },
    { title: "Out of Stock", value: "8", description: "Unavailable", icon: AlertCircle, color: "text-red-600", bgColor: "bg-red-100" },
    { title: "Total Value", value: "KSh 1,245,780.00", description: "Stock value", icon: DollarSign, color: "text-purple-600", bgColor: "bg-purple-100" },
  ]

  const handleEditProduct = (product: Product) => {
    console.log("Edit product:", product)
    // TODO: Implement edit functionality
  }

  const handleDeleteProduct = (product: Product) => {
    console.log("Delete product:", product)
    // TODO: Implement delete functionality
  }

  const handleAddProduct = (newProduct: any) => {
    setProducts(prev => [...prev, newProduct])
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
                      <option>Beverages</option>
                      <option>Bakery</option>
                      <option>Dairy</option>
                      <option>Snacks</option>
                      <option>Stationery</option>
                      <option>Personal Care</option>
                    </select>

                    <select className="h-10 px-3 sm:px-4 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-w-35">
                      <option>All Brands</option>
                      <option>Coca Cola</option>
                      <option>BakeHouse</option>
                      <option>Brookside</option>
                      <option>Lays</option>
                      <option>Double A</option>
                      <option>Colgate</option>
                      <option>Dettol</option>
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
        onSubmit={handleAddProduct}
      />
    </div>
  )
}
