"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PurchaseForm } from "@/components/purchases/purchase-form"
import { ShoppingCart, Package, DollarSign, TrendingUp, Plus, Upload, Download, Filter, Search, Calendar, MoreVertical, Eye } from "lucide-react"
import { useMobile } from "@/lib/hooks/use-mobile"

export default function PurchasesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isPurchaseFormOpen, setIsPurchaseFormOpen] = useState(false)
  const isMobile = useMobile()

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
    if (window.innerWidth < 1024) {
      toggleMobileSidebar()
    } else {
      toggleSidebar()
    }
  }

  const handleAddPurchase = (data: any) => {
    console.log("Add purchase:", data)
    // TODO: Implement add purchase logic
  }

  // Stats data
  const purchaseStats = [
    { title: "Total Purchases", value: "KSh 2.4M", description: "This month", icon: DollarSign, color: "text-blue-600", bgColor: "bg-blue-100", change: "+12%" },
    { title: "Total Orders", value: "156", description: "This month", icon: ShoppingCart, color: "text-green-600", bgColor: "bg-green-100", change: "+8%" },
    { title: "Pending Orders", value: "12", description: "Awaiting delivery", icon: Package, color: "text-orange-600", bgColor: "bg-orange-100", change: "-3%" },
    { title: "Avg Order Value", value: "KSh 15,384", description: "Per order", icon: TrendingUp, color: "text-purple-600", bgColor: "bg-purple-100", change: "+5%" },
  ]

  // Mock data for purchases
  const purchases = [
    { id: "PO-001", date: "2025-05-15", supplier: "Brookside Dairy", items: 45, total: 125000.00, status: "Completed", paymentStatus: "Paid" },
    { id: "PO-002", date: "2025-05-14", supplier: "Coca Cola Ltd", items: 32, total: 89500.00, status: "Completed", paymentStatus: "Paid" },
    { id: "PO-003", date: "2025-05-14", supplier: "BakeHouse", items: 28, total: 45000.00, status: "In Transit", paymentStatus: "Partial" },
    { id: "PO-004", date: "2025-05-13", supplier: "Double A Paper", items: 56, total: 180000.00, status: "Pending", paymentStatus: "Unpaid" },
    { id: "PO-005", date: "2025-05-13", supplier: "Colgate Palmolive", items: 67, total: 95000.00, status: "Completed", paymentStatus: "Paid" },
    { id: "PO-006", date: "2025-05-12", supplier: "Dettol Ltd", items: 23, total: 0, status: "Cancelled", paymentStatus: "Refunded" },
    { id: "PO-007", date: "2025-05-12", supplier: "Samsung Electronics", items: 41, total: 320000.00, status: "Completed", paymentStatus: "Paid" },
    { id: "PO-008", date: "2025-05-11", supplier: "Lays Snacks", items: 89, total: 67000.00, status: "In Transit", paymentStatus: "Partial" },
  ]

  return (
    <div className="flex h-screen bg-background font-sans">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPath="/purchases" 
        mobileOpen={mobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />
      <div className="flex flex-1 flex-col overflow-hidden font-sans">
        <Header onMenuClick={handleMenuClick} />
        <main className="flex-1 flex flex-col bg-muted/30 overflow-auto">
          {/* Page Header */}
          <div className="px-4 sm:px-6 py-4 sm:py-5">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600 shadow-sm">
                  <ShoppingCart className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-foreground">Purchases</h1>
                  <p className="text-sm text-muted-foreground mt-0.5">Manage supplier purchases and orders</p>
                </div>
              </div>

              {/* Filters Section */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Date Range */}
                <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-card shadow-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">01 May 2025 - 31 May 2025</span>
                </div>

                {/* Filter Dropdowns */}
                <div className="flex flex-wrap gap-2">
                  <select className="px-3 py-2 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all shadow-sm">
                    <option>All Suppliers</option>
                    <option>Brookside Dairy</option>
                    <option>Coca Cola Ltd</option>
                    <option>BakeHouse</option>
                  </select>

                  <select className="px-3 py-2 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all shadow-sm">
                    <option>All Status</option>
                    <option>Completed</option>
                    <option>In Transit</option>
                    <option>Pending</option>
                    <option>Cancelled</option>
                  </select>

                  <select className="px-3 py-2 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all shadow-sm">
                    <option>All Payment Status</option>
                    <option>Paid</option>
                    <option>Partial</option>
                    <option>Unpaid</option>
                    <option>Refunded</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 ml-auto">
                  <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-card text-sm text-foreground hover:bg-muted transition-all shadow-sm">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">More Filters</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-card text-sm text-foreground hover:bg-muted transition-all shadow-sm">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                  <Button 
                    className="h-10 bg-green-600 hover:bg-green-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
                    onClick={() => setIsPurchaseFormOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Purchase
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto px-4 sm:px-6 pb-6">
            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
              {/* Stats Cards */}
              <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                {purchaseStats.map((stat) => (
                  <div key={stat.title} className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bgColor} ${stat.color} shadow-sm`}>
                        <stat.icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600 border border-green-200">
                        <span>{stat.change}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{stat.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{stat.description}</p>
                      <p className="mt-2 text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Search Bar */}
              <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
                <div className="relative w-full">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by PO number, supplier..."
                    className="h-10 pl-9 sm:pl-10 text-sm border bg-muted focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  />
                </div>
              </div>

              {/* Purchases Table */}
              <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted border-b border-border">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          <input type="checkbox" className="rounded border-border" />
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">PO Number</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Supplier</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Items</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Amount</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Payment</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {purchases.map((purchase) => (
                        <tr key={purchase.id} className="hover:bg-muted transition-colors">
                          <td className="px-4 sm:px-6 py-4">
                            <input type="checkbox" className="rounded border-border" />
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className="text-sm font-medium text-green-600 hover:text-green-700">{purchase.id}</span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-muted-foreground">{purchase.date}</td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-muted-foreground">{purchase.supplier}</td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-muted-foreground">{purchase.items}</td>
                          <td className="px-4 sm:px-6 py-4 text-sm font-semibold text-foreground">KSh {(purchase.total || 0).toLocaleString()}</td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                              purchase.status === "Completed" ? "bg-green-100 text-green-700 border-green-200" :
                              purchase.status === "In Transit" ? "bg-blue-100 text-blue-700 border-blue-200" :
                              purchase.status === "Pending" ? "bg-orange-100 text-orange-700 border-orange-200" :
                              "bg-slate-100 text-slate-700 border-slate-200"
                            }`}>
                              {purchase.status}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                              purchase.paymentStatus === "Paid" ? "bg-green-100 text-green-700 border-green-200" :
                              purchase.paymentStatus === "Partial" ? "bg-blue-100 text-blue-700 border-blue-200" :
                              purchase.paymentStatus === "Unpaid" ? "bg-red-100 text-red-700 border-red-200" :
                              "bg-slate-100 text-slate-700 border-slate-200"
                            }`}>
                              {purchase.paymentStatus}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-1">
                              <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden px-4 sm:px-6 py-4 space-y-3">
                  {purchases.map((purchase) => (
                    <div key={purchase.id} className="bg-card border border-border rounded-xl p-4 shadow-sm">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 font-semibold text-sm shrink-0">
                          {purchase.id.slice(-2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-green-600">{purchase.id}</span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border shrink-0 ${
                              purchase.status === "Completed" ? "bg-green-100 text-green-700 border-green-200" :
                              purchase.status === "In Transit" ? "bg-blue-100 text-blue-700 border-blue-200" :
                              purchase.status === "Pending" ? "bg-orange-100 text-orange-700 border-orange-200" :
                              "bg-slate-100 text-slate-700 border-slate-200"
                            }`}>
                              {purchase.status}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{purchase.supplier}</p>
                        </div>
                        <span className="text-sm font-bold text-foreground">KSh {(purchase.total || 0).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-border text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Date</p>
                            <p className="text-sm font-semibold text-foreground">{purchase.date}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Items</p>
                            <p className="text-sm font-semibold text-foreground">{purchase.items}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                            purchase.paymentStatus === "Paid" ? "bg-green-100 text-green-700 border-green-200" :
                            purchase.paymentStatus === "Partial" ? "bg-blue-100 text-blue-700 border-blue-200" :
                            purchase.paymentStatus === "Unpaid" ? "bg-red-100 text-red-700 border-red-200" :
                            "bg-slate-100 text-slate-700 border-slate-200"
                          }`}>
                            {purchase.paymentStatus}
                          </span>
                          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Purchase Form Modal */}
      <PurchaseForm
        isOpen={isPurchaseFormOpen}
        onClose={() => setIsPurchaseFormOpen(false)}
        onSubmit={handleAddPurchase}
      />
    </div>
  )
}
