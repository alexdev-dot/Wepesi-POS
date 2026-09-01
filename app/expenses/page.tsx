"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Receipt, TrendingDown, DollarSign, Building2, Plus, Download, Filter, Calendar, MoreVertical, ArrowDownRight, ShoppingBag, Truck, Users, Zap, Home, Utensils, Clock, X } from "lucide-react"

export default function ExpensesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)

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

  const expenseStats = [
    { title: "Total Expenses", value: "KSh 890,000", change: "+5.2%", isPositive: false, icon: DollarSign },
    { title: "This Month", value: "KSh 125,000", change: "+8.1%", isPositive: false, icon: Calendar },
    { title: "Pending", value: "KSh 45,000", change: "", isPositive: false, icon: Receipt },
    { title: "Avg Daily", value: "KSh 4,167", change: "-2.3%", isPositive: true, icon: TrendingDown },
  ]

  const expenseCategories = [
    { name: "Inventory", amount: 450000, percentage: 50.6, icon: ShoppingBag, color: "bg-blue-100 text-blue-600" },
    { name: "Operations", amount: 180000, percentage: 20.2, icon: Zap, color: "bg-yellow-100 text-yellow-600" },
    { name: "Rent", amount: 120000, percentage: 13.5, icon: Building2, color: "bg-purple-100 text-purple-600" },
    { name: "Salaries", amount: 95000, percentage: 10.7, icon: Users, color: "bg-green-100 text-green-600" },
    { name: "Utilities", amount: 45000, percentage: 5.0, icon: Home, color: "bg-orange-100 text-orange-600" },
  ]

  const expenses = [
    { id: 1, category: "Inventory", description: "Stock purchase - Brookside Dairy", amount: 125000, date: "2025-05-30", status: "Paid", vendor: "Brookside Dairy" },
    { id: 2, category: "Operations", description: "Electricity bill", amount: 25000, date: "2025-05-29", status: "Paid", vendor: "KPLC" },
    { id: 3, category: "Inventory", description: "Stock purchase - Coca Cola", amount: 89000, date: "2025-05-28", status: "Paid", vendor: "Coca Cola Ltd" },
    { id: 4, category: "Salaries", description: "Staff salaries - May", amount: 95000, date: "2025-05-25", status: "Paid", vendor: "Payroll" },
    { id: 5, category: "Utilities", description: "Water bill", amount: 15000, date: "2025-05-24", status: "Pending", vendor: "Nairobi Water" },
    { id: 6, category: "Operations", description: "Internet & phone", amount: 12000, date: "2025-05-23", status: "Paid", vendor: "Safaricom" },
    { id: 7, category: "Rent", description: "Shop rent - May", amount: 120000, date: "2025-05-01", status: "Paid", vendor: "Landlord" },
    { id: 8, category: "Inventory", description: "Stock purchase - BakeHouse", amount: 45000, date: "2025-05-15", status: "Paid", vendor: "BakeHouse" },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Inventory": return <ShoppingBag className="h-4 w-4 text-blue-600" />
      case "Operations": return <Zap className="h-4 w-4 text-yellow-600" />
      case "Rent": return <Building2 className="h-4 w-4 text-purple-600" />
      case "Salaries": return <Users className="h-4 w-4 text-green-600" />
      case "Utilities": return <Home className="h-4 w-4 text-orange-600" />
      default: return <Receipt className="h-4 w-4 text-slate-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-700 border-green-200"
      case "Pending": return "bg-orange-100 text-orange-700 border-orange-200"
      case "Overdue": return "bg-red-100 text-red-700 border-red-200"
      default: return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPath="/expenses" 
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
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600 shadow-sm">
                  <Receipt className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-slate-900">Expenses</h1>
                  <p className="text-sm text-slate-500 mt-0.5">Track and manage business expenses</p>
                </div>
              </div>

              {/* Filters Section */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Date Range */}
                <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white shadow-sm">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-700">May 2025</span>
                </div>

                {/* Category Filter */}
                <select className="px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm">
                  <option>All Categories</option>
                  <option>Inventory</option>
                  <option>Operations</option>
                  <option>Rent</option>
                  <option>Salaries</option>
                  <option>Utilities</option>
                </select>

                {/* Status Filter */}
                <select className="px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm">
                  <option>All Status</option>
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Overdue</option>
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
                    className="h-10 bg-orange-600 hover:bg-orange-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
                    onClick={() => setIsAddExpenseOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Expense
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
                {expenseStats.map((stat) => (
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
                          <ArrowDownRight className="h-3 w-3" />
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

              {/* Expense Categories */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 mb-4">Expense by Category</h3>
                <div className="space-y-4">
                  {expenseCategories.map((category) => (
                    <div key={category.name} className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${category.color} shrink-0`}>
                        <category.icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-900">{category.name}</span>
                          <span className="text-sm font-semibold text-slate-900">KSh {category.amount.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div 
                            className="bg-orange-600 h-2 rounded-full transition-all"
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm text-slate-500 w-12 text-right">{category.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expenses Table */}
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="px-4 sm:px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-900">Recent Expenses</h3>
                  <span className="text-sm text-slate-500">8 expenses this month</span>
                </div>
                
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Category</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Description</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Amount</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Date</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Vendor</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {expenses.map((expense) => (
                        <tr key={expense.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-2">
                              {getCategoryIcon(expense.category)}
                              <span className="text-sm font-medium text-slate-900">{expense.category}</span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-slate-900">{expense.description}</td>
                          <td className="px-4 sm:px-6 py-4 text-sm font-semibold text-slate-900">KSh {expense.amount.toLocaleString()}</td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-slate-700">{expense.date}</td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-slate-700">{expense.vendor}</td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(expense.status)}`}>
                              {expense.status}
                            </span>
                          </td>
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
                  {expenses.map((expense) => (
                    <div key={expense.id} className="bg-white border rounded-xl p-4 shadow-sm">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 shrink-0">
                          {getCategoryIcon(expense.category)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-900">{expense.category}</span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border shrink-0 ${getStatusColor(expense.status)}`}>
                              {expense.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 truncate">{expense.description}</p>
                        </div>
                        <span className="text-sm font-bold text-slate-900">KSh {expense.amount.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-600">
                        <div className="flex items-center gap-4">
                          <span>{expense.date}</span>
                          <span className="truncate">{expense.vendor}</span>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
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

      {/* Add Expense Modal */}
      {isAddExpenseOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsAddExpenseOpen(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 shadow-sm">
                    <Receipt className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Add Expense</h3>
                    <p className="text-xs text-slate-500">Record a new expense</p>
                  </div>
                </div>
                <button onClick={() => setIsAddExpenseOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>
              <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                  <select className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all">
                    <option>Select category</option>
                    <option>Inventory</option>
                    <option>Operations</option>
                    <option>Rent</option>
                    <option>Salaries</option>
                    <option>Utilities</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                  <Input type="text" placeholder="Enter description" className="h-10 px-3 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Amount</label>
                  <Input type="number" placeholder="Enter amount" className="h-10 px-3 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Vendor</label>
                  <Input type="text" placeholder="Enter vendor name" className="h-10 px-3 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Date</label>
                  <Input type="date" className="h-10 px-3 text-sm border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all" />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsAddExpenseOpen(false)} className="flex-1 h-10 border-slate-200 text-slate-700 hover:bg-slate-50">Cancel</Button>
                  <Button className="flex-1 h-10 bg-orange-600 hover:bg-orange-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all">Add Expense</Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
