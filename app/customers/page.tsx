"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, UserPlus, Download, Filter, Search, MoreVertical, Mail, Phone, MapPin, Calendar, X, ShoppingBag, DollarSign, Star, Crown } from "lucide-react"

export default function CustomersPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
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

  const customerStats = [
    { title: "Total Customers", value: "1,248", change: "+45", isPositive: true, icon: Users },
    { title: "Active", value: "1,180", change: "", isPositive: true, icon: ShoppingBag },
    { title: "VIP Members", value: "85", change: "+12", isPositive: true, icon: Crown },
    { title: "Total Revenue", value: "KSh 4.8M", change: "+18%", isPositive: true, icon: DollarSign },
  ]

  const customers = [
    { id: 1, name: "John Doe", email: "john.doe@email.com", phone: "+254 700 123 456", address: "Nairobi, Kenya", totalSpent: "KSh 125,000", totalOrders: 28, status: "Active", joinDate: "2023-01-15", isVip: true },
    { id: 2, name: "Jane Smith", email: "jane.smith@email.com", phone: "+254 700 234 567", address: "Mombasa, Kenya", totalSpent: "KSh 89,500", totalOrders: 22, status: "Active", joinDate: "2023-02-20", isVip: true },
    { id: 3, name: "Michael Johnson", email: "michael.j@email.com", phone: "+254 700 345 678", address: "Nairobi, Kenya", totalSpent: "KSh 45,200", totalOrders: 15, status: "Active", joinDate: "2023-03-10", isVip: false },
    { id: 4, name: "Emily Brown", email: "emily.brown@email.com", phone: "+254 700 456 789", address: "Kisumu, Kenya", totalSpent: "KSh 156,800", totalOrders: 35, status: "Active", joinDate: "2023-04-05", isVip: true },
    { id: 5, name: "David Wilson", email: "david.wilson@email.com", phone: "+254 700 567 890", address: "Nairobi, Kenya", totalSpent: "KSh 23,400", totalOrders: 8, status: "Inactive", joinDate: "2023-05-15", isVip: false },
    { id: 6, name: "Sarah Davis", email: "sarah.davis@email.com", phone: "+254 700 678 901", address: "Nakuru, Kenya", totalSpent: "KSh 78,900", totalOrders: 19, status: "Active", joinDate: "2023-06-01", isVip: false },
    { id: 7, name: "Robert Miller", email: "robert.miller@email.com", phone: "+254 700 789 012", address: "Nairobi, Kenya", totalSpent: "KSh 342,500", totalOrders: 52, status: "Active", joinDate: "2023-07-20", isVip: true },
    { id: 8, name: "Lisa Anderson", email: "lisa.anderson@email.com", phone: "+254 700 890 123", address: "Eldoret, Kenya", totalSpent: "KSh 56,700", totalOrders: 14, status: "Active", joinDate: "2024-01-10", isVip: false },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700 border-green-200"
      case "Inactive": return "bg-red-100 text-red-700 border-red-200"
      case "Pending": return "bg-orange-100 text-orange-700 border-orange-200"
      default: return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPath="/customers" 
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
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-100 text-pink-600 shadow-sm">
                  <Users className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-slate-900">Customers</h1>
                  <p className="text-sm text-slate-500 mt-0.5">Manage your customer base</p>
                </div>
              </div>

              {/* Filters Section */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search customers..."
                    className="h-10 pl-9 sm:pl-10 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
                  />
                </div>

                {/* Status Filter */}
                <select className="px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all shadow-sm">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>VIP Only</option>
                </select>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 ml-auto">
                  <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">More Filters</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                  <Button 
                    className="h-10 bg-pink-600 hover:bg-pink-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
                    onClick={() => setIsAddCustomerOpen(true)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Customer
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
                {customerStats.map((stat) => (
                  <div key={stat.title} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        stat.isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      } shadow-sm`}>
                        <stat.icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                      {stat.change && (
                        <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                          stat.isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}>
                          <span>{stat.change}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{stat.title}</h4>
                      <p className="mt-2 text-xl sm:text-2xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customers Table */}
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="px-4 sm:px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-900">All Customers</h3>
                  <span className="text-sm text-slate-500">1,248 customers</span>
                </div>
                
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Customer</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Contact</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Total Spent</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Orders</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Joined</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {customers.map((customer) => (
                        <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-600 font-semibold text-sm">
                                {customer.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-slate-900">{customer.name}</span>
                                  {customer.isVip && (
                                    <Crown className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                  )}
                                </div>
                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {customer.address}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-xs text-slate-600">
                                <Mail className="h-3 w-3" />
                                <span>{customer.email}</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-slate-600">
                                <Phone className="h-3 w-3" />
                                <span>{customer.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm font-semibold text-slate-900">{customer.totalSpent}</td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-slate-900 font-semibold">{customer.totalOrders}</td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(customer.status)}`}>
                              {customer.status}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-slate-700">{customer.joinDate}</td>
                          <td className="px-4 sm:px-6 py-4">
                            <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
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
                  {customers.map((customer) => (
                    <div key={customer.id} className="bg-white border rounded-xl p-4 shadow-sm">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-600 font-semibold text-sm shrink-0">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-900 truncate">{customer.name}</span>
                            {customer.isVip && (
                              <Crown className="h-4 w-4 text-yellow-500 fill-yellow-500 shrink-0" />
                            )}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{customer.address}</span>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border shrink-0 ${getStatusColor(customer.status)}`}>
                          {customer.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <p className="text-xs text-slate-500">Email</p>
                          <p className="text-xs text-slate-700 truncate">{customer.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Phone</p>
                          <p className="text-xs text-slate-700 truncate">{customer.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-xs text-slate-500">Total Spent</p>
                            <p className="text-sm font-bold text-slate-900">{customer.totalSpent}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Orders</p>
                            <p className="text-sm font-semibold text-slate-900">{customer.totalOrders}</p>
                          </div>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all" aria-label="More options">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Customer Modal */}
      {isAddCustomerOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsAddCustomerOpen(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-600 shadow-sm">
                    <UserPlus className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Add Customer</h3>
                    <p className="text-xs text-slate-500">Add a new customer</p>
                  </div>
                </div>
                <button onClick={() => setIsAddCustomerOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid gap-4 grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name</label>
                    <Input type="text" placeholder="Enter first name" className="h-10 px-3 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
                    <Input type="text" placeholder="Enter last name" className="h-10 px-3 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <Input type="email" placeholder="Enter email address" className="h-10 px-3 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                  <Input type="tel" placeholder="Enter phone number" className="h-10 px-3 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Address</label>
                  <Input type="text" placeholder="Enter address" className="h-10 px-3 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all" />
                </div>
                <div className="grid gap-4 grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                    <select className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all">
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Pending</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">VIP Status</label>
                    <select className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all">
                      <option>Regular</option>
                      <option>VIP</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsAddCustomerOpen(false)} className="flex-1 h-10 border-slate-200 text-slate-700 hover:bg-slate-50">Cancel</Button>
                  <Button className="flex-1 h-10 bg-pink-600 hover:bg-pink-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all">Add Customer</Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
