"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Truck, Building2, UserPlus, Download, Filter, Search, MoreVertical, Mail, Phone, MapPin, Calendar, X, Package, DollarSign, Star } from "lucide-react"
import { useMobile } from "@/lib/hooks/use-mobile"

export default function SuppliersPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false)
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

  const supplierStats = [
    { title: "Total Suppliers", value: "18", change: "+3", isPositive: true, icon: Building2 },
    { title: "Active", value: "16", change: "", isPositive: true, icon: Package },
    { title: "Pending Orders", value: "5", change: "", isPositive: false, icon: Truck },
    { title: "Total Spend", value: "KSh 2.4M", change: "+12%", isPositive: true, icon: DollarSign },
  ]

  const suppliers = [
    { id: 1, name: "Brookside Dairy", email: "orders@brookside.co.ke", phone: "+254 700 111 222", address: "Nairobi, Kenya", category: "Dairy", rating: 4.8, status: "Active", joinDate: "2023-01-15", totalOrders: 45 },
    { id: 2, name: "Coca Cola Ltd", email: "sales@coca-cola.co.ke", phone: "+254 700 222 333", address: "Nairobi, Kenya", category: "Beverages", rating: 4.5, status: "Active", joinDate: "2023-02-20", totalOrders: 38 },
    { id: 3, name: "BakeHouse", email: "info@bakehouse.co.ke", phone: "+254 700 333 444", address: "Mombasa, Kenya", category: "Bakery", rating: 4.9, status: "Active", joinDate: "2023-03-10", totalOrders: 52 },
    { id: 4, name: "Double A Paper", email: "orders@doublea.co.ke", phone: "+254 700 444 555", address: "Nairobi, Kenya", category: "Stationery", rating: 4.2, status: "Active", joinDate: "2023-04-05", totalOrders: 28 },
    { id: 5, name: "Colgate Palmolive", email: "sales@colgate.co.ke", phone: "+254 700 555 666", address: "Nairobi, Kenya", category: "Personal Care", rating: 4.6, status: "Active", joinDate: "2023-05-15", totalOrders: 35 },
    { id: 6, name: "Dettol Ltd", email: "orders@dettol.co.ke", phone: "+254 700 666 777", address: "Mombasa, Kenya", category: "Personal Care", rating: 4.4, status: "Inactive", joinDate: "2023-06-01", totalOrders: 22 },
    { id: 7, name: "Samsung Electronics", email: "business@samsung.co.ke", phone: "+254 700 777 888", address: "Nairobi, Kenya", category: "Electronics", rating: 4.7, status: "Active", joinDate: "2023-07-20", totalOrders: 18 },
    { id: 8, name: "Lays Snacks", email: "orders@lays.co.ke", phone: "+254 700 888 999", address: "Nairobi, Kenya", category: "Snacks", rating: 4.3, status: "Active", joinDate: "2024-01-10", totalOrders: 41 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700 border-green-200   "
      case "Inactive": return "bg-red-100 text-red-700 border-red-200   "
      case "Pending": return "bg-orange-100 text-orange-700 border-orange-200   "
      default: return "bg-slate-100 text-slate-700 border-slate-200 bg-slate-800 text-slate-300 border-slate-700"
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${star <= Math.round(rating) ? "text-yellow-500 fill-yellow-500" : "text-slate-300"}`}
            strokeWidth={2}
          />
        ))}
        <span className="text-xs text-slate-600 ml-1">{rating}</span>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background font-sans">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPath="/suppliers" 
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
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600 shadow-sm  ">
                  <Truck className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-foreground">Suppliers</h1>
                  <p className="text-sm text-muted-foreground mt-0.5">Manage your suppliers and vendors</p>
                </div>
              </div>

              {/* Filters Section */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search suppliers..."
                    className="h-10 pl-9 sm:pl-10 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                  />
                </div>

                {/* Category Filter */}
                <select className="px-3 py-2 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all shadow-sm">
                  <option>All Categories</option>
                  <option>Dairy</option>
                  <option>Beverages</option>
                  <option>Bakery</option>
                  <option>Stationery</option>
                  <option>Personal Care</option>
                  <option>Electronics</option>
                  <option>Snacks</option>
                </select>

                {/* Status Filter */}
                <select className="px-3 py-2 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all shadow-sm">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Pending</option>
                </select>

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
                    className="h-10 bg-amber-600 hover:bg-amber-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
                    onClick={() => setIsAddSupplierOpen(true)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Supplier
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto px-4 sm:px-6 pb-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Stats Cards */}
              <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                {supplierStats.map((stat) => (
                  <div key={stat.title} className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        stat.isPositive ? "bg-green-100 text-green-600  " : "bg-red-100 text-red-600  "
                      } shadow-sm`}>
                        <stat.icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                      {stat.change && (
                        <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                          stat.isPositive ? "bg-green-100 text-green-600  " : "bg-red-100 text-red-600  "
                        }`}>
                          <span>{stat.change}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{stat.title}</h4>
                      <p className="mt-2 text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Suppliers Table */}
              <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                <div className="px-4 sm:px-6 py-4 border-b border-border bg-muted flex items-center justify-between">
                  <h3 className="text-base font-semibold text-foreground">All Suppliers</h3>
                  <span className="text-sm text-muted-foreground">18 suppliers</span>
                </div>
                
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Supplier</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Contact</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Category</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Rating</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Status</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Orders</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {suppliers.map((supplier) => (
                        <tr key={supplier.id} className="hover:bg-muted transition-colors">
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600 font-semibold text-sm  ">
                                {supplier.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-foreground">{supplier.name}</div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {supplier.address}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                <span>{supplier.email}</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                <span>{supplier.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-muted-foreground">{supplier.category}</td>
                          <td className="px-4 sm:px-6 py-4">
                            {renderStars(supplier.rating)}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(supplier.status)}`}>
                              {supplier.status}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-foreground font-semibold">{supplier.totalOrders}</td>
                          <td className="px-4 sm:px-6 py-4">
                            <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden px-4 sm:px-6 py-4 space-y-3">
                  {suppliers.map((supplier) => (
                    <div key={supplier.id} className="bg-card border border-border rounded-xl p-4 shadow-sm">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600 font-semibold text-sm shrink-0  ">
                          {supplier.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground truncate">{supplier.name}</span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border shrink-0 ${getStatusColor(supplier.status)}`}>
                              {supplier.status}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {supplier.address}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-border text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Category</p>
                            <p className="text-sm font-semibold text-foreground">{supplier.category}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Orders</p>
                            <p className="text-sm font-semibold text-foreground">{supplier.totalOrders}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {renderStars(supplier.rating)}
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

      {/* Add Supplier Modal */}
      {isAddSupplierOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsAddSupplierOpen(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 shadow-sm  ">
                    <UserPlus className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Add Supplier</h3>
                    <p className="text-xs text-muted-foreground">Add a new supplier</p>
                  </div>
                </div>
                <button onClick={() => setIsAddSupplierOpen(false)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
              <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Company Name</label>
                  <Input type="text" placeholder="Enter company name" className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <Input type="email" placeholder="Enter email address" className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                  <Input type="tel" placeholder="Enter phone number" className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Address</label>
                  <Input type="text" placeholder="Enter address" className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all" />
                </div>
                <div className="grid gap-4 grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
                    <select className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all">
                      <option>Select category</option>
                      <option>Dairy</option>
                      <option>Beverages</option>
                      <option>Bakery</option>
                      <option>Stationery</option>
                      <option>Personal Care</option>
                      <option>Electronics</option>
                      <option>Snacks</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Status</label>
                    <select className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all">
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Pending</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsAddSupplierOpen(false)} className="flex-1 h-10 border-border text-foreground hover:bg-muted">Cancel</Button>
                  <Button className="flex-1 h-10 bg-amber-600 hover:bg-amber-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all">Add Supplier</Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
