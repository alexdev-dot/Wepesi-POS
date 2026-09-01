"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart3, TrendingUp, Package, DollarSign, Download, Filter, Calendar, MoreVertical, ArrowUpRight, ArrowDownRight, PieChart, LineChart } from "lucide-react"

export default function ReportsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("sales")
  const [dateRange, setDateRange] = useState("This Month")
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

  const reportTypes = [
    { id: "sales", name: "Sales Reports", icon: TrendingUp, description: "Revenue and transaction analysis" },
    { id: "inventory", name: "Inventory Reports", icon: Package, description: "Stock and product performance" },
    { id: "financial", name: "Financial Reports", icon: DollarSign, description: "Expenses and cash flow" },
  ]

  const salesStats = [
    { title: "Total Revenue", value: "KSh 2.4M", change: "+12.5%", isPositive: true, icon: DollarSign },
    { title: "Total Orders", value: "1,234", change: "+8.2%", isPositive: true, icon: BarChart3 },
    { title: "Avg Order Value", value: "KSh 1,945", change: "-2.1%", isPositive: false, icon: TrendingUp },
    { title: "Conversion Rate", value: "3.2%", change: "+0.5%", isPositive: true, icon: PieChart },
  ]

  const topProducts = [
    { name: "Coca Cola 500ml", sales: 456, revenue: "KSh 54,720", growth: "+15%", image: "/products/Coca cola 500ml.jpg" },
    { name: "Bread Loaf", sales: 389, revenue: "KSh 31,120", growth: "+8%", image: "/products/bread loaf.avif" },
    { name: "Milk 1L", sales: 312, revenue: "KSh 37,440", growth: "+12%", image: "/products/Milk 1l.avif" },
    { name: "Lays Chips", sales: 245, revenue: "KSh 24,500", growth: "-3%", image: "/products/Lays crips.jpg" },
    { name: "Colgate Toothpaste", sales: 198, revenue: "KSh 29,700", growth: "+5%", image: "/products/colgate toothpaste.avif" },
  ]

  const renderReportContent = () => {
    switch (activeTab) {
      case "sales":
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
              {salesStats.map((stat) => (
                <div key={stat.title} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      stat.isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    } shadow-sm`}>
                      <stat.icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                      stat.isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}>
                      {stat.isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{stat.title}</h4>
                    <p className="mt-2 text-xl sm:text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sales Chart Placeholder */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-slate-900">Revenue Trend</h3>
                <Button variant="outline" size="sm" className="h-9 border-slate-200 text-slate-700 hover:bg-slate-50">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200">
                <div className="text-center">
                  <LineChart className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">Revenue chart visualization</p>
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900 mb-4">Top Selling Products</h3>
              
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Sales</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Revenue</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Growth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {topProducts.map((product, index) => (
                      <tr key={index} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span className="text-sm font-medium text-slate-900">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-700">{product.sales}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-slate-900">{product.revenue}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold ${product.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {product.growth}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50">
                    <div className="h-12 w-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{product.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-slate-500">{product.sales} sales</span>
                        <span className="text-xs font-semibold text-slate-900">{product.revenue}</span>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${product.growth.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {product.growth}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "inventory":
        return (
          <div className="space-y-6">
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Total Products", value: "1,248", change: "+5%", isPositive: true },
                { title: "Low Stock Items", value: "32", change: "-8%", isPositive: true },
                { title: "Out of Stock", value: "8", change: "+2", isPositive: false },
                { title: "Stock Value", value: "KSh 1.2M", change: "+10%", isPositive: true },
              ].map((stat) => (
                <div key={stat.title} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      stat.isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    } shadow-sm`}>
                      <Package className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                      stat.isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}>
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{stat.title}</h4>
                    <p className="mt-2 text-xl sm:text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900 mb-4">Stock Movement</h3>
              <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">Stock movement chart</p>
                </div>
              </div>
            </div>
          </div>
        )

      case "financial":
        return (
          <div className="space-y-6">
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Total Expenses", value: "KSh 890K", change: "+5%", isPositive: false },
                { title: "Net Profit", value: "KSh 1.5M", change: "+15%", isPositive: true },
                { title: "Cash Flow", value: "KSh 450K", change: "+8%", isPositive: true },
                { title: "Pending Payments", value: "KSh 120K", change: "-12%", isPositive: true },
              ].map((stat) => (
                <div key={stat.title} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      stat.isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    } shadow-sm`}>
                      <DollarSign className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                      stat.isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}>
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{stat.title}</h4>
                    <p className="mt-2 text-xl sm:text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900 mb-4">Expense Breakdown</h3>
              <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200">
                <div className="text-center">
                  <PieChart className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">Expense breakdown chart</p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPath="/reports" 
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
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600 shadow-sm">
                  <BarChart3 className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-slate-900">Reports</h1>
                  <p className="text-sm text-slate-500 mt-0.5">View and analyze business performance</p>
                </div>
              </div>

              {/* Filters Section */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Date Range */}
                <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white shadow-sm">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="text-sm text-slate-700 bg-transparent focus:outline-none"
                  >
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>This Quarter</option>
                    <option>This Year</option>
                    <option>Custom Range</option>
                  </select>
                </div>

                {/* Report Type Tabs */}
                <div className="flex flex-wrap gap-2">
                  {reportTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setActiveTab(type.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === type.id
                          ? "bg-rose-600 text-white shadow-sm"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm"
                      }`}
                    >
                      <type.icon className="h-4 w-4" />
                      <span>{type.name}</span>
                    </button>
                  ))}
                </div>

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
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto px-4 sm:px-6 pb-6">
            <div className="max-w-7xl mx-auto">
              {renderReportContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
